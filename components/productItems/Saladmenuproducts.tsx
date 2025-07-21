'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HiOutlinePlus } from 'react-icons/hi2'
import productbaner from '@/app/assets/images/saladbanner.webp'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/features/cartSlice'
import { woocommerceapi } from '@/lib/woocommerce'
import sanitizeHtml from 'sanitize-html'

export default function ProductCard() {
  const dispatch = useAppDispatch()
  const [products, setProducts] = useState<Product[]>([])
  const [selectCategory, setSelectCategory] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [instructions, setInstructions] = useState('')

  type Product = {
    slug: string
    id: number;
    name: string;
    price: number | string;
    images?: { src: string }[];
    description?: string;
    categories: ProductCategory[];
  }

  interface ProductCategory {
    id: number;
    name: string;
    slug: string;
  }

   useEffect(() => {
        const fetchProducts = async () => {
          try {
            console.log('Fetching Products')
            const productsRes = await woocommerceapi.get('products', {
                per_page: 100,
                status: 'publish',
                stock_status: 'instock',
            });
            const allProducts: Product[] = productsRes.data;
            const saladProducts = allProducts.filter((product) =>
              product.categories.some(cat => cat.slug === 'salad')
            );
            // Debug logs
            console.log("Fetched products count:", productsRes.data.length)
            console.log('All products:', allProducts.map(p => p.name));
            // console.log('Salad products:', saladProducts.map(p => p.name));
            // console.log('Salad categories:', saladProducts.map(p => 
            //   p.categories.map(c => `${c.id} (${c.slug})`).join(', ')
            // ));
            setProducts(saladProducts);
          } catch (err) {
            console.error('Error fetching products:', err);
          }
        };
        fetchProducts();
      }, []);

  const handleAddToCart = () => {
    if (!selectCategory) return

    dispatch(
      addToCart({
        id: String(selectCategory.id),
        name: selectCategory.name,
        price: Number(selectCategory.price),
        quantity,
        image: selectCategory.images?.[0]?.src || '/no-image.png',
        instructions,
      })
    )

    setSelectCategory(null)
  }
  return (
    <div className="Menus_display">
      <div className="max-w-7xl mx-auto mt-14">
        <div className="product_banner mb-6">
          <Image src={productbaner} className='rounded-[16px]' alt="Products Banner" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {products.map((product) => (
            <div className="menu_items flex bg-white rounded-[2rem] p-2" key={product.slug}>
              <div className="w-full md:w-1/3">
                <div className="menu_thumb relative block h-[150px]">
                  <Image
                    src={product.images?.[0]?.src || '/no-image.png'}
                    width={300}
                    height={300}
                    className="w-full h-auto object-cover rounded-[1.5rem]"
                    alt="Menu Item"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="menu_content flex flex-col h-full p-[15px] justify-between">
                  <h4 className="text-[#000] text-[15px] font-semibold m-0">
                    {product.name}
                  </h4>
                  <div className="text-[#000] text-[13px] my-[5px]">
                    {sanitizeHtml(product.description ?? '', { allowedTags: [], allowedAttributes: {} })}
                  </div>
                  <span className="text-[#fe000c] text-[16px] font-bold">Rs {product.price}</span>
                  <div className="item_details_btn relative block">
                    <button
                      className="w-[1.4rem] h-[1.4rem] absolute right-0 bottom-0 bg-[#fe000c] rounded-[50%]"
                      onClick={() => {
                        setSelectCategory(product)
                        setQuantity(1)
                        setInstructions('')
                      }}
                    >
                      <HiOutlinePlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🛒 Add to Cart Popup */}
        {selectCategory && (
          <div className="our_menu_items">
            <div className="cart_popup fixed top-0 left-0 w-full h-full bg-[#17161a]/70 z-[99]">
              <div className="cart_body flex justify-center items-center w-full h-full">
                <div className="cart_show bg-white w-full max-w-[900px] px-5 py-5 flex items-center rounded-lg relative">
                  <button
                    className="absolute top-4 right-4 text-black text-xl"
                    onClick={() => setSelectCategory(null)}
                  >
                    ×
                  </button>

                  <div className="cartmain_items flex gap-2.5 items-center">
                    <div className="w-full md:w-1/3 h-full">
                    <div className="cart_thumb block">
                      <Image
                        src={selectCategory.images?.[0]?.src || '/no-image.png'}
                        width={300}
                        height={300}
                        className="rounded-[30px]"
                        alt="Menu Item"
                      />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 main_contents">
                      <div className="cart_content px-[20px]">
                        <div className="cartmenu_info flex flex-col p-0 overflow-y-auto">
                        <h4 className="text-[23px] text-[#000] font-semibold">
                          {selectCategory.name}
                        </h4>
                        <span className="text-[#fe000c] text-[20px] font-semibold">
                          Rs{Number(selectCategory.price) * quantity}
                        </span>
                        <p className="text-[#000] text-[15px]">
                          {sanitizeHtml(selectCategory.description ?? '', { allowedTags: [], allowedAttributes: {} })}
                        </p>
                        </div>
                        <div className="instruction-msg-content">
                          <h6 className="text-[18px] text-[#000] my-[10px] font-medium">
                            Special Instructions
                          </h6>
                          <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="Special instructions..."
                            className="w-full h-[100px] p-[10px] text-[#000] capitalize text-[15px] rounded-[.4rem] border-[#ced4da] border-solid border-[1px]"
                          />
                        </div>

                        <div className="cart_bottom py-[10px] px-0">
                          <div className="counte flex items-center justify-between">
                            <div className="relative flex">
                              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[5px] text-[28px] text-[#fff] bg-[#bfbfbf]">−</button>
                              <div className="rounded-0 border-0 text-[#000] bg-transparent w-[40px] h-[40px] flex items-center justify-center">{quantity}</div>
                              <button onClick={() => setQuantity(q => q + 1)} className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[5px] text-[28px] text-[#fff] bg-[#bfbfbf]">+</button>
                            </div>
                            <div className="addtocart_btn">
                              <button
                                onClick={handleAddToCart}
                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center min-w-[370px] justify-center"
                              >
                                🛒 Add to Cart: Rs{Number(selectCategory.price) * quantity}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


