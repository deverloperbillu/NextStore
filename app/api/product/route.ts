// // app/api/products/route.ts
// import { NextResponse } from 'next/server'
// import { WooCommerce } from '@/lib/woocommerce'

// export async function GET() {
//   try {
//     const { data } = await WooCommerce.get('/products')
//     return NextResponse.json({ products: data })
//   } catch (err: unknown) {
//     const errorMessage = typeof err === 'object' && err !== null && 'message' in err ? (err as { message: string }).message : 'An unknown error occurred';
//     return NextResponse.json({ error: errorMessage }, { status: 500 })
//   }
// }
