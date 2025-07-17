'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { CiMenuBurger } from 'react-icons/ci'
import Logo from '../app/assets/images/logo.webp'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import ChangeLocationModal from './ChangeLocationModal'
import { useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { toggleDrawer } from '@/store/features/cartSlice'

export const Header: React.FC = () => {
  const location = useAppSelector((state) => state.location.selected)
  const [modalOpen, setModalOpen] = useState(false)
  const cartItems = useAppSelector((state) => state.cart.items)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const dispatch = useAppDispatch()

  return (
    <>
      <header className="header bg-[red] px-[15px] py-[5px]">
        <div className="grid grid-cols-3">
          <div className="head_info flex items-center gap-[10px]">
            <button
              className="text-[#fff] bg-black text-[14px] rounded-[.4rem] cursor-pointer py-[.23rem] px-[.75rem] min-w-[170px] max-w-[170px] items-center inline-flex"
              onClick={() => setModalOpen(true)}
            >
              <IoLocationSharp />
              <div className='loaction_data inline-flex flex-col'> 
              <span className='mx-1 change-branch-btn block text-[.75rem] font-bold text-left'>Change Location</span>
              <span className='mx-1 text-[.5rem] text-left'>{location || 'Select Location'}</span>  
              </div> 
            </button>
            <a
              href="tel:021111666111"
              className="text-[#fff] bg-black text-[.8rem] rounded-[.4rem] cursor-pointer py-[10px] px-[15px] font-bold"
            >
              021111666111
            </a>
            <button className="text-[#fff] bg-black text-[.8rem] rounded-[.4rem] cursor-pointer py-[10px] px-[15px] font-bold capitalize">
              Submit your complaint
            </button>
          </div>
          <div className="site_logo bg-white relative inline-flex items-center m-auto w-[110px] h-[110px] mb-[-60px] rounded-[50%]">
            <Link href="/">
              <Image
                src={Logo}
                className="rounded-[50%] w-full"
                alt={'Logo'}
              />
            </Link>
          </div>
          <div className="cart_menu flex gap-[10px] justify-end items-center">
            <div className="cart_icon relative">
              <button onClick={() => dispatch(toggleDrawer(true))} className="text-[#fff] w-[50px] h-[50px]  flex items-center justify-center text-[20px] rounded-[.4rem] cursor-pointer">
                <MdOutlineShoppingCart />
                    <span className="absolute top-[2px] right-[5px] bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {totalItems}
                    </span>
              </button>
            </div>
            <div className="side_menu block relative">
              <button className="text-[#fff] w-[50px] h-[50px] bg-black flex items-center justify-center text-[20px] rounded-[.4rem] cursor-pointer">
                <CiMenuBurger />
              </button>
            </div>
          </div>
        </div>
      </header>

      {modalOpen && (
        <ChangeLocationModal onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}

export default Header
