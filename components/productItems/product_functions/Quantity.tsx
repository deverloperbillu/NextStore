import React, { useEffect, useState } from 'react'
interface QuantityProps {
    basePrice: number;
    onPriceChange: (total: number) => void;
}
const Quantity:React.FC<QuantityProps> = ({basePrice, onPriceChange}) => {
const min = 1;
const max = 999;
const [quantity, setQuantity] = useState(min);
const [totalPrice, setTotalPrice] = useState(basePrice)

useEffect(() => {
    setTotalPrice(quantity * basePrice);
    onPriceChange(quantity * basePrice);
}, [quantity, basePrice, onPriceChange]);

const updateQuantity = (newQuantity: number) => {
    if(newQuantity >= min && newQuantity <= max) {
        setQuantity(newQuantity);
    }    
};

  return (
        <div className="counte flex items-center gap-1">
            <div className="relative flex items-center max-w-[8rem]">
                <div className='quantity_btnsec flex'>
                    <button onClick={() => updateQuantity(quantity - 1)} className='inline-flex items-center justify-center w-[40px] h-[40px] rounded-[5px] text-[28px] text-[#fff] bg-[#bfbfbf]'>-</button>
                    <input type='tel' value={quantity} onChange={(e) => {
                        const val = parseInt(e.target.value) || min;
                        updateQuantity(val)
                    }} className="rounded-0 border-0 text-[#000] bg-transparent w-[30%] text-center" />
                    <button onClick={() => updateQuantity(quantity + 1)} className='inline-flex items-center justify-center w-[40px] h-[40px] rounded-[5px] text-[28px] text-[#fff] bg-[#bfbfbf]'>+</button>
                </div>
            </div>
            <div className='addtocart_btn'>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 min-w-[370px] justify-center">
                    <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                    </svg>
                    Add to Cart: Rs{totalPrice}
                </button>
            </div>
        </div>
  )
}

export default Quantity