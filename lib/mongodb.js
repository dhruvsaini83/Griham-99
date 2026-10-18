import mongoose from "mongoose";
import dns from "dns";

// Fix for 'querySrv ECONNREFUSED' when resolving MongoDB Atlas SRV records
// on local network ISPs (Jio, Airtel, etc.) that fail to resolve SRV UDP queries.
// On Vercel / AWS Lambda, external UDP port 53 is restricted, so we only set custom DNS locally.
if (!process.env.VERCEL && typeof dns.setServers === "function") {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
  } catch (err) {
    // Ignore in restricted environments
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Converts mongodb+srv:// to direct replica set URI to bypass querySrv DNS lookups
 * which often fail on Windows ISPs or serverless containers.
 */
function getDirectUri(uri) {
  if (!uri || !uri.startsWith("mongodb+srv://")) return uri;
  try {
    const match = uri.match(/mongodb\+srv:\/\/([^@]+)@([^/?]+)(?:\/([^?]*))?(?:\?(.*))?/);
    if (!match) return uri;
    const [, userPass, host, db = "", query = ""] = match;
    if (host.includes("griham-cluster.kuv3gdq.mongodb.net")) {
      const nodes = [
        "ac-bk9yn5p-shard-00-00.kuv3gdq.mongodb.net:27017",
        "ac-bk9yn5p-shard-00-01.kuv3gdq.mongodb.net:27017",
        "ac-bk9yn5p-shard-00-02.kuv3gdq.mongodb.net:27017",
      ].join(",");
      let params = new URLSearchParams(query);
      params.set("ssl", "true");
      params.set("replicaSet", "atlas-wzut7q-shard-0");
      params.set("authSource", "admin");
      params.set("retryWrites", "true");
      params.set("w", "majority");
      return `mongodb://${userPass}@${nodes}/${db}?${params.toString()}`;
    }
  } catch (e) {
    return uri;
  }
  return uri;
}

/**
 * Global is used here to maintain a cached connection across hot-reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  // Security Check: Prevent local database connection leak in production (e.g. Vercel)
  if (
    process.env.NODE_ENV === "production" &&
    (MONGODB_URI.includes("127.0.0.1") || MONGODB_URI.includes("localhost"))
  ) {
    throw new Error(
      "Security Alert: Local MongoDB URI (127.0.0.1 / localhost) is strictly forbidden in production. MongoDB Atlas URI required."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .catch(async (initialErr) => {
        // If DNS SRV query failed, automatically retry with direct replica set URI
        if (
          initialErr.message?.includes("querySrv") ||
          initialErr.message?.includes("ECONNREFUSED") ||
          initialErr.code === "ECONNREFUSED"
        ) {
          const directUri = getDirectUri(MONGODB_URI);
          if (directUri !== MONGODB_URI) {
            console.warn("SRV resolution failed; retrying with direct replica set URI...");
            return mongoose.connect(directUri, opts);
          }
        }
        throw initialErr;
      })
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
