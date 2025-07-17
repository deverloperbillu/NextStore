'use client'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { clearCart } from '@/store/features/cartSlice'
import { useState } from 'react'

export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.05)
  const deliveryFee = 100
  const grandTotal = subtotal + tax + deliveryFee

  const [form, setForm] = useState({
    title: 'Mr.',
    fullName: '',
    phone: '',
    alternatePhone: '',
    address: '',
    landmark: '',
    email: '',
    deliveryInstruction: '',
    payment: 'cod',
    changeRequested: '',
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = () => {
    if (!form.title || !form.fullName || !form.phone || !form.address || !form.alternatePhone || !form.landmark || !form.address || !form.email || !form.deliveryInstruction || !form.payment || !form.changeRequested ) {
      alert('Please fill all fields')
      return
    }

    dispatch(clearCart())
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600">🎉 Order Placed Successfully!</h1>
        <p className="mt-4">Thank you, {form.fullName}. Your food is on the way!</p>
      </div>
    )
  }

  return (
    <>
    <div className='checkout-page-content '>
            <div className='max-w-7xl my-14 mx-auto'>
                <div className='flex flex-wrap md:flex-nowrap gap-8'>
                    <div className='w-full h-full md:w-2/3'>
                        <div className='p-4 p-md-5 customer-info-form mx-md-2'>
                            <div className='box-grey rounded mt-31'>
                                <div>
          <label className="block font-semibold mb-1">Title</label>
          <select
            name="title"
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={handleChange}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss.</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="fullName"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        {/* Phone Numbers */}
        <div>
          <label className="block font-semibold mb-1">Mobile Number *</label>
          <input
            name="phone"
            type="tel"
            placeholder="03xx-xxxxxxx"
            className="w-full border p-2 rounded"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Alternate Mobile Number</label>
          <input
            name="alternatePhone"
            type="tel"
            placeholder="03xx-xxxxxxx"
            className="w-full border p-2 rounded"
            value={form.alternatePhone}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">
            Delivery Address <span className="text-red-500">*</span>
          </label>
          <input
            name="address"
            placeholder="Enter your complete address"
            className="w-full border p-2 rounded"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* Landmark & Email */}
        <div>
          <label className="block font-semibold mb-1">Nearest Landmark</label>
          <input
            name="landmark"
            placeholder="Any famous place nearby"
            className="w-full border p-2 rounded"
            value={form.landmark}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Delivery Instructions */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Delivery Instructions</label>
          <input
            name="deliveryInstruction"
            placeholder="e.g. ring the bell twice"
            className="w-full border p-2 rounded"
            value={form.deliveryInstruction}
            onChange={handleChange}
          />
        </div>

        {/* Payment Options */}
        <div className="md:col-span-2 mt-4">
          <h4 className="font-semibold mb-2">Payment Information</h4>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={form.payment === 'cod'}
                onChange={handleChange}
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={form.payment === 'card'}
                onChange={handleChange}
              />
              <span>Online Payment</span>
            </label>
          </div>
        </div>

        {/* Change Request */}
        <div className="md:col-span-2 mt-2">
          <label className="block font-semibold mb-1">Change Request</label>
          <div className="flex items-center">
            <span className="bg-gray-200 px-3 py-2 border rounded-l">Rs.</span>
            <input
              name="changeRequested"
              type="number"
              placeholder="500"
              className="w-full border-t border-b border-r p-2 rounded-r"
              value={form.changeRequested}
              onChange={handleChange}
            />
          </div>
        </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-1/3'>
                        <div className='ck-cartItem px-2  d-none d-md-block mt-md-3 mt-lg-0'>
                            <div className='overflow-y-auto'>
                                <div className='cart-item'>
                                    <div className='cart-item-title-wrapper'>
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between mb-2">
                                                <span>{item.name} × {item.quantity}</span>
                                                <span>Rs. {item.price * item.quantity}</span>
                                            </div>
                                         ))}
                                    </div>
                                </div>
                                <div className='cart-item'>
                                    <div className='cart-item-title-wrapper'>
                                        <div className="flex justify-between">
                                                <span>Total</span>
                                                <span>Rs. {subtotal}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Tax (5%)</span>
                                                <span>Rs. {tax}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Delivery Fee</span>
                                                <span>Rs. {deliveryFee}</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Grand Total</span>
                                                <span>Rs. {grandTotal}</span>
                                            </div>
                                            <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          🛒 Place Order
        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
