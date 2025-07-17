'use client'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectCartSummary } from '@/store/features/cartSlice'
import { toggleDrawer } from '@/store/features/cartSlice'

export default function ViewCartButton() {
  const dispatch = useAppDispatch()
  const { totalItems, totalPrice } = useAppSelector(selectCartSummary)

  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
      <button
        onClick={() => dispatch(toggleDrawer(true))}
        className="w-full flex justify-between items-center bg-[#fe000c] text-white px-6 py-3 text-lg font-semibold rounded-t-xl shadow-md"
      >
        <span>({totalItems})</span>
        <span>View Cart</span>
        <span>Rs. {totalPrice}</span>
      </button>
    </div>
  )
}
