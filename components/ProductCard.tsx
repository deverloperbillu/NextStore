'use client'

import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/features/cartSlice'
import Image from 'next/image'

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  // Add other fields as needed
}

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <Image src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2 rounded" width={500} height={500} />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">Rs {product.price}</p>
      <button
        onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
        className="mt-2 bg-orange-600 text-white px-4 py-1 rounded"
      >
        Add
      </button>
    </div>
  )
}
