'use client'
import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className='h-fit py-24.5 px-3 md:h-190.75 lg:py-38 lg:px-25'>
      <div className='w-full h-full '>
        <h1 className='md:text-[46px] text-[24px] font-bold'>Contact Us</h1>
        <p className='md:text-[18px] text-[12px] md:mt-2'>
          Kindly send us a message for Partnership or for Enquiry about CamberFarm Africa
        </p>

        <form className='mt-12.5' onSubmit={handleSubmit}>
          <div className='flex gap-4.5 flex-col md:flex-row'>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#808080] placeholder:text-[#808080] outline-none rounded-[100px] md:placeholder:text-[16px] placeholder:text-[14px] h-12.5 md:h-11"
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#808080] placeholder:text-[#808080] outline-none rounded-[100px] md:placeholder:text-[16px] placeholder:text-[14px] h-12.5 md:h-11"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#808080] placeholder:text-[#808080] md:placeholder:text-[16px] placeholder:text-[14px] outline-none rounded-[100px] h-12.5 md:h-11"
            />
          </div>

          <textarea
            name="message"
            placeholder="Type your message here"
            value={formData.message}
            onChange={handleChange}
            className="mt-6 md:mt-8 w-full px-3 py-2 rounded-xl border border-[#808080] placeholder:text-[#808080] resize-y outline-none md:placeholder:text-[16px] placeholder:text-[14px] h-25 md:h-35"
          />

          <div className='flex justify-end'>
            <button
              type="submit"
              className="h-11 md:h-12.5 mt-8 px-6 py-3 bg-[#1AD329] text-white rounded-[100px]"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
