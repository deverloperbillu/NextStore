'use client'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeFromCart } from '@/store/features/cartSlice'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const items = useAppSelector(state => state.cart.items)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          {items.map(item => (
            <div key={item.id} className="border p-4 mb-2 flex justify-between">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold">Total: ${total}</div>
          <button
            onClick={() => router.push('/checkout')}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}
