'use client'

import { useState, useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { setLocation } from '@/store/features/locationSlice'
import Image from 'next/image'
import Logo from '../app/assets/images/logo.webp'
const cityLocations = {
  Karachi: ['Agha Khan Hospital', 'Clifton', 'DHA' ,'Do Darya',
    'North Nazimabad',
    'Highway',
    'Shahrah-e-Faisal',
    'Shaheed-e-Millat',
    'Gulshan-e-Iqbal',
    'Bahadurabad'],
  Hyderabad: ['Latifabad', 'Qasimabad', 'City Center', 'Autobhan Road', 'Boulevard Mall'],
}

type LocationSelectorModalProps = {
  onClose: (ev?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>) => void
}

export default function LocationSelectorModal({ onClose }: LocationSelectorModalProps) {
  const dispatch = useAppDispatch()

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery')
  const [selectedCity, setSelectedCity] = useState<'Karachi' | 'Hyderabad' | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const handleSelect = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedCity && selectedArea) {
      const fullLocation = `${selectedCity} - ${selectedArea}`
      localStorage.setItem('userLocation', fullLocation)
      dispatch(setLocation(fullLocation))
      onClose(ev)
    }
  }
useEffect(() => {
  const savedLocation = localStorage.getItem('userLocation')
  if (savedLocation) {
    const [city, area] = savedLocation.split(' - ')
    if (cityLocations[city as keyof typeof cityLocations]?.includes(area)) {
      setSelectedCity(city as 'Karachi' | 'Hyderabad')
      setSelectedArea(area)
      dispatch(setLocation(savedLocation))
    }
  }
}, [dispatch])


  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md text-center shadow-lg relative">
        <Image src={Logo} alt="Logo" className="mx-auto mb-4 border-[#c4c4c4] border-solid border-[1px] rounded-full" width={100} height={100} />

        <h2 className="text-lg font-medium mb-2 text-[#000] capitalize">Select your order type</h2>

        {/* Order Type Toggle */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setOrderType('delivery')}
            className={`px-4 py-2 rounded-full ${
              orderType === 'delivery'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            DELIVERY
          </button>
          <button
            onClick={() => setOrderType('pickup')}
            className={`px-4 py-2 rounded-full ${
              orderType === 'pickup'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            PICKUP
          </button>
        </div>

        <p className="text-sm mb-2 text-gray-700">Please select your location</p>

        {/* Cities */}
        <div className="flex justify-center gap-3 mb-4">
          {(['Karachi', 'Hyderabad'] as const).map((city) => (
            <div
              key={city}
              className={`cursor-pointer p-2 border rounded-full flex items-center justify-center w-20 ${
                selectedCity === city
                  ? 'border-red-600 text-red-600'
                  : 'border-gray-300 text-gray-700'
              }`}
              onClick={() => {
                setSelectedCity(city)
                setSelectedArea(null)
              }}
            >
              <div className=" bg-gray-100 rounded mb-1" />
              
              <span className="text-xs">{city}</span>
            </div>
          ))}
        </div>

        {/* Area Dropdown */}
        {selectedCity && (
          <select
            value={selectedArea ?? ''}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm text-black"
          >
            <option value="" disabled>
              Select Area
            </option>
            {cityLocations[selectedCity].map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={handleSelect}
          disabled={!selectedCity || !selectedArea}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded text-sm font-semibold transition"
        >
          Select
        </button>
      </div>
    </div>
  )
}
