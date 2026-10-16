import mongoose from "mongoose";
import dns from "dns";

// Fix for 'querySrv ECONNREFUSED' when resolving MongoDB Atlas SRV records
// on Windows or local network ISPs that fail to resolve SRV UDP queries.
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (err) {
  // Ignore in restricted environments
}

const MONGODB_URI = process.env.MONGODB_URI;

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

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
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
