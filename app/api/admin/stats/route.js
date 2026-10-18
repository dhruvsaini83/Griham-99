import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { isValidAdminSecret } from "@/lib/security";

export const dynamic = "force-dynamic";

// GET /api/admin/stats
// Retrieves live operational metrics: product counts, category breakdown, stock health, and recent activities.
export async function GET(request) {
  try {
    const adminKey = request.headers.get("x-admin-secret-key");
    const sessionToken = request.cookies.get("admin_session_token")?.value;
    const isAuthorized = isValidAdminSecret(adminKey) || isValidAdminSecret(sessionToken);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required." },
        { status: 401 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: false, error: "MongoDB URI not configured." },
        { status: 500 }
      );
    }

    await connectToDatabase();

    const [
      totalProducts,
      categories,
      outOfStock,
      lowStock,
      categoryCounts,
      recentProducts,
      totalOrders,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.distinct("category"),
      Product.countDocuments({ stock: 0 }),
      Product.countDocuments({ stock: { $gt: 0, $lte: 10 } }),
      Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Product.find()
        .sort({ productId: -1, createdAt: -1 })
        .limit(6)
        .select("productId name price originalPrice category stock image bestseller createdAt")
        .lean(),
      Order.countDocuments().catch(() => 0),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalCategories: categories.length,
        categories,
        categoryCounts: categoryCounts.map((c) => ({
          name: c._id || "uncategorized",
          count: c.count,
        })),
        outOfStock,
        lowStock,
        inStock: totalProducts - outOfStock,
        totalOrders,
      },
      recentProducts,
    });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
