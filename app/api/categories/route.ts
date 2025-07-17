import { NextResponse } from 'next/server'
import { WooCommerce } from '@/lib/woocommerce'

export async function GET() {
  try {
    const { res } = await WooCommerce.get("products/categories")
    return NextResponse.json({ categories: res.data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
