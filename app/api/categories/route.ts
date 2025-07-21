// import { NextResponse } from 'next/server';
// import { WooCommerce } from '@/lib/woocommerce';

// export async function GET() {
//   try {
//     const response = await WooCommerce.get("products/categories");
//     const categories = response.data;

//     return NextResponse.json({ categories });
//   } catch (err) {
//     console.error("❌ Error fetching categories:", err);
//     return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
//   }
// }
