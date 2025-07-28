/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { clearCart } from '@/store/features/cartSlice'
import { useState } from 'react'
import Image from 'next/image'
import cod from '@/app/assets/images/Cash.webp';
import card from '@/app/assets/images/Card.webp';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.05)
  const deliveryFee = 100
  const grandTotal = subtotal + tax + deliveryFee
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | null>(null)
  const userLocation = useSelector((state: RootState) => state.location.selected)
  const areaOnly = userLocation?.split('-')[1]?.trim() || '' 
  console.log(userLocation ? userLocation.split('-')[1]?.trim() : '');

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
                        <div className="max-w-3xl mx-auto p-6 bg-[#f7f7f7] rounded-[15px]">
      <h2 className="text-2xl font-semibold text-[#000]">Checkout</h2>
      <p className="text-sm text-gray-500 mb-4">
        This is a <span className="font-semibold text-[#000]">Delivery Order 🚚</span><br />
        Just a last step, please enter your details:
      </p>

      <form className="space-y-4">
        {/* Title & Full Name */}
        <div className="flex gap-4 items-end">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-[#212529] pb-[5px]">Title</label>
      <select
        id="title"
        name="title"
        className="border p-2 rounded w-24 text-[#000] border-[#c3c3c3]"
      >
        <option>Mr.</option>
        <option>Mrs.</option>
        <option>Ms.</option>
      </select>
    </div>

    <div className="flex-1">
      <label htmlFor="fullName" className="block text-sm font-medium text-[#212529] pb-[5px]">Full Name</label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        placeholder="Full Name"
        className="w-full border p-2 rounded text-[#000] border-[#c3c3c3]"
        required
        value={form.fullName}
        onChange={handleChange}
      />
    </div>
  </div>

  {/* Mobile Numbers */}
  <div className="space-y-2">
    
    <div className="flex gap-4">
      <div className="flex-1">
        <label htmlFor="phone" className="block text-sm font-medium text-[#212529] pb-[5px]">Mobile Number</label>
      <input
        id="phone"
        name="phone"
        type="text"
        placeholder="03xx-xxxxxxx"
        className="flex-1 border p-2 rounded text-[#000] border-[#c3c3c3] w-full"
        required
        value={form.phone}
        onChange={handleChange}
      />
      </div>
      <div className="flex-1">
        <label htmlFor="alternatePhone" className="block text-sm font-medium text-[#212529] pb-[5px]">Alternate Mobile Number</label>
        <input
          id="alternatePhone"
          name="alternatePhone"
          type="text"
          placeholder="03xx-xxxxxxx"
          className="w-full border p-2 rounded text-[#000] border-[#c3c3c3] "
          value={form.alternatePhone}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>

  {/* Delivery Address */}
  <div>
    <label htmlFor="address" className="block text-sm font-medium text-[#212529] pb-[5px]">Delivery Address</label>
    <div className='delivery-address-group flex '>
    <input
      id="address"
      name="address"
      type="text"
      placeholder="Enter your complete address"
      className="w-full border p-2 rounded text-[#000] border-[#c3c3c3] border-r-0 rounded-tr-none rounded-br-none"
      required
      value={form.address}
      onChange={handleChange}
    />
    { userLocation && (
      <div className="bg-[#ced4da] text-sm text-black font-semibold px-3 py-2 whitespace-nowrap border p-2 rounded  border-[#c3c3c3] rounded-tl-none rounded-bl-none">
         {userLocation.split('-')[1]?.split('')}
      </div>
    )}
    </div>
    </div>
  

  {/* Landmark & Email */}
  <div className="flex gap-4">
    <div className="flex-1">
      <label htmlFor="landmark" className="block text-sm font-medium text-[#212529] pb-[5px]">Nearest Landmark</label>
      <input
        id="landmark"
        name="landmark"
        type="text"
        placeholder="Any famous place nearby"
        className="w-full border p-2 rounded text-[#000] border-[#c3c3c3]"
        value={form.landmark}
        onChange={handleChange}
      />
    </div>

    <div className="flex-1">
      <label htmlFor="email" className="block text-sm font-medium text-[#212529] pb-[5px]">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        className="w-full border p-2 rounded text-[#000] border-[#c3c3c3]"
        value={form.email}
        onChange={handleChange}
      />
    </div>
  </div>

  {/* Delivery Instructions */}
  <div>
    <label htmlFor="deliveryInstruction" className="block text-sm font-medium text-[#212529] pb-[5px]">Delivery Instructions</label>
    <textarea
      id="deliveryInstruction"
      name="deliveryInstruction"
      placeholder="Delivery Instructions"
      className="w-full border p-2 rounded text-[#000] border-[#c3c3c3]"
      value={form.deliveryInstruction}
      onChange={handleChange}
    />
  </div>

        {/* Payment Info */}
        <div className='w-full md:w-2/3'>
  <label htmlFor="payment" className="block text-sm font-medium text-[#212529] pb-[5px]">Payment Information</label>

  <div className="flex gap-4 mt-2">
    
    {/* Cash on Delivery */}
    <label
      onClick={() => setPaymentMethod('cod')}
      className={`cursor-pointer border p-3 flex-1 rounded text-[#525252] transition 
        ${paymentMethod === 'cod' ? 'border-blue-500 ring-2 ring-blue-300' : 'border-[#d5d9dc]'}`}
    >
      <div className='ck-payment flex items-center justify-center flex-col'>
        <Image src={cod} alt='Cash on Delivery' className='w-full h-[30px] max-w-[30px] object-contain' />
        <span>Cash on Delivery</span>
      </div>
    </label>

    {/* Card Payment */}
    <label
      onClick={() => setPaymentMethod('card')}
      className={`cursor-pointer border p-3 flex-1 rounded text-[#525252] transition 
        ${paymentMethod === 'card' ? 'border-blue-500 ring-2 ring-blue-300' : 'border-[#d5d9dc]'}`}
    >
      <div className='ck-payment flex items-center justify-center flex-col'>
        <Image src={card} alt='Card Payment' className='w-full h-[40px] max-w-[100px] object-contain' />
        <span>Online Payment</span>
      </div>
    </label>

  </div>
</div>

        {/* Change Request */}
        {paymentMethod === 'cod' && (
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Rs.</span>
          <input
            type="number"
            placeholder="500"
            className="border p-2 rounded flex-1 text-[#000] border-[#c3c3c3]"
            value={form.changeRequested}
            onChange={handleChange}
          />
        </div>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Place Order
        </button>
      </form>
    </div>
                    </div>
                    <div className='w-full md:w-1/3'>
                        <div className='ck-cartItem p-6 d-none d-md-block mt-md-3 mt-lg-0 bg-[#f7f7f7] rounded-[15px]'>
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
