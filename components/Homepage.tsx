'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProducts } from '@/store/features/productSlice'

export default function Homepage() {
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector(state => state.products)
  const cart = useAppSelector(state => state.cart.items)
  console.log('Cart:', cart) 

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) return <div>Loading...</div>

  return (
    <>
      {items.map(product => (
        <div key={product.id} className="border p-4 rounded flex flex-col">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <Link href={`/product/${product.id}`} className="bg-blue-500 text-white px-4 py-2 mt-2">
            View Product
          </Link>
        </div>
      ))}
    </>
  )
}
