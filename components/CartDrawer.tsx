'use client'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeFromCart, toggleDrawer, updateQuantity } from '@/store/features/cartSlice'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { FaCircleArrowRight } from "react-icons/fa6";
import emptycart from '../app/assets/images/emptycart.svg'
export default function CartDrawer() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { items, drawerOpen } = useAppSelector((state) => state.cart)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.05)
  const deliveryFee = 100
  const grandTotal = subtotal + tax + deliveryFee

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(toggleDrawer(false))
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [dispatch])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => dispatch(toggleDrawer(false))}
      />

      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-lg
          transform transition-transform duration-300 ease-in-out rounded-l-[1rem] overflow-x-hidden overflow-y-auto
          ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-normal text-black">Your Cart</h2>
          <button
            className="text-[30px] font-bold text-red-500 absolute top-[5px] right-[20px] z-[9999]"
            onClick={() => dispatch(toggleDrawer(false))}
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-[15px]">
          {items.length === 0 ? (
            <div className='empty-cart-wrapper flex items-center justify-center h-[90vh] flex-col'>
              <Image src={emptycart} alt='Empty Cart' width={150} height={150} />
              <p className='text-[1.5rem] font-bold text-[#000]'>Your Cart is Empty</p>
              <p className='mb-0 px-5 text-[#000] text-center text-[14px]'>Looks like you haven’t added anything to your cart yet. Start exploring and shop your favorite items!</p>
              <button className='mt-3 bg-[#000] text-[#fff] py-[8px] px-[15px] rounded-[8px]'>Browse Product</button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b py-[15px] mt-2">
                  <Image src={item.image} alt={item.name} width={70} height={70} className="rounded" />

                  <div className="flex-1">
                    <p className="font-medium text-black">{item.name}</p>
                    <p className="text-sm text-black font-bold">Rs. {item.price * item.quantity}</p>
                  </div>
                  <div className='main_removeitems'>
                    <div className=" flex items-center gap-1 cart-item-counter w-full h-[30px] text-[#fe000c] border-[#fe000c] px-[10px] border-solid border-[1px] rounded-[20px]">
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                      }
                      className="inline-flex items-center justify-center"
                    >
                      <FiMinus />
                    </button>
                    <span className="flex items-center justify-center w-[30px] h-[30px]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                      }
                      className="inline-flex items-center justify-center"
                    >
                      <GoPlus />
                    </button>
                  </div>
                  <div className='remove_items text-center'>
                    <button
                    className="text-xs text-red-600"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                  </div>
                  </div>
                </div>
              ))}
                <button className='px-3 py-3 w-full pointer text-[#7f7e7e] inline-flex items-center gap-[10px] cursor-pointer' onClick={() => dispatch(toggleDrawer(false))}><GoPlus /> Add More Items</button>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="cst_checkout px-[16px]">
            <div className="text-sm space-y-1 border-t pt-[10px]">
              <div className="flex justify-between">
                <span className='text-black'>Subtotal</span>
                <span className='text-black'>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className='text-black'>Tax 5%</span>
                <span className='text-black'>Rs. {tax}</span>
              </div>
              <div className="flex justify-between">
                <span className='text-black'>Delivery Fee</span>
                <span className='text-black'>Rs. {deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span className='text-black'>Grand Total</span>
                <span className='text-black'>Rs. {grandTotal}</span>
              </div>
            </div>
            <div className="check_outbtn">
              <button
                onClick={() => {
                  dispatch(toggleDrawer(false))
                  router.push('/checkout')
                }}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded font-semibold relative"
              >
                Proceed to Checkout <FaCircleArrowRight className='absolute right-[50px] top-[12px]' />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
