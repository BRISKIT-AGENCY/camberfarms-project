'use client'
import { useState } from 'react'
import Image from 'next/image'

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    country: '',
    state: '',
    region: '',
  })

  const [files, setFiles] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFilesSelect = (selectedFiles) => {
    setFiles(prev => [...prev, ...Array.from(selectedFiles)])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Form Data:', formData)
    console.log('Files:', files)
  }

  return (
    <div className='h-fit py-24.5 px-3 md:h-299.5 lg:pt-38 lg:px-25 bg-[#F9FAFB]'>
      <div className='w-full h-full'>
        <h1 className='md:text-[46px] text-[24px] font-bold'>
          Membership Form
        </h1>

        <form className='mt-12.5' onSubmit={handleSubmit}>
          {/* ROW 1 */}
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

          {/* ROW 2 */}
          <div className='flex gap-4.5 flex-col md:flex-row mt-8'>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#808080] outline-none rounded-[100px] md:placeholder:text-[16px] placeholder:text-[14px] h-12.5 md:h-11"
            />

            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#808080] placeholder:text-[#808080] outline-none rounded-[100px] md:placeholder:text-[16px] placeholder:text-[14px] h-12.5 md:h-11"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#808080] placeholder:text-[#808080] outline-none rounded-[100px] h-12.5 md:h-11"
            />
          </div>

          {/* ROW 3 */}
          <div className='flex gap-4.5 flex-col md:flex-row mt-8'>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#808080] placeholder:text-[#808080] outline-none rounded-[100px] h-12.5 md:h-11"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#808080] placeholder:text-[#808080] outline-none rounded-[100px] h-12.5 md:h-11"
            />

            <input
              type="text"
              name="region"
              placeholder="Region"
              value={formData.region}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#808080] placeholder:text-[#808080] outline-none rounded-[100px] h-12.5 md:h-11"
            />
          </div>

          {/* DRAG & DROP (Textarea replacement) */}
          <div className='mt-6 md:mt-8 w-full p-4 rounded-xl h-49.5 md:h-71  bg-white'>
            <div className='w-full h-full flex flex-col'>
                <p className='text-[16px] text-[#808080]'>Upload a valid ID Card</p>
                <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              handleFilesSelect(e.dataTransfer.files)
            }}
            className=" w-full flex-1 px-3 py-2 rounded-xl
                       placeholder:text-[#808080] outline-none
                       md:placeholder:text-[16px] placeholder:text-[14px]
                        flex flex-col items-center justify-center
                       text-[#808080] cursor-pointer bg-[#FAFAFA]"
          >
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) =>
                e.target.files && handleFilesSelect(e.target.files)
              }
            />
            <Image
              src="/images/upload.png"
              alt="Upload Icon"
              width={24}
              height={24}
            />

            <p className="text-[12px] md:text-[24px] text-[#333333] font-medium mt-3">
              Drop image here or browse
            </p>
            <p className="text-[12px] md:text-[18px] text-[#ADADAD] mt-1">
              File type (Pdf, Png, Jpeg)
            </p>
          </label>
            </div>
          </div>

          {/* OPTIONAL: FILE LIST */}
          {files.length > 0 && (
            <ul className="mt-3 text-sm text-gray-600">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}

          <div className='flex justify-end mt-12.5'>
            <button
              type="submit"
              className="h-11 md:h-12.5  px-6 py-3 bg-[#1AD329] text-white rounded-[100px]"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MembershipForm
