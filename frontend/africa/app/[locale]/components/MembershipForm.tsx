'use client'

import { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslations } from 'next-intl'
type MembershipFormData = {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  country: string
  state: string
  region: string
}

const initialValues: MembershipFormData = {
  name: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  country: '',
  state: '',
  region: '',
}

const MembershipForm = () => {
  const t = useTranslations('Membership')

  const [files, setFiles] = useState<File[]>([])
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  const validationSchema = Yup.object({
    name: Yup.string().required(t('errors.name')),
    email: Yup.string().email(t('errors.invalidEmail')).required(t('errors.email')),
    phone: Yup.string().required(t('errors.phone')),
    dateOfBirth: Yup.string().required(t('errors.dateOfBirth')),
    gender: Yup.string().required(t('errors.gender')),
    address: Yup.string().required(t('errors.address')),
    country: Yup.string().required(t('errors.country')),
    state: Yup.string().required(t('errors.state')),
    region: Yup.string().required(t('errors.region')),
  })

  const formik = useFormik<MembershipFormData>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (files.length === 0) {
        setSubmitMessage(t('errors.fileRequired'))
        return
      }

      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value)
      )
      files.forEach(file => formData.append('idFiles', file))

      try {
        const response = await axios.post(
          'http://localhost:5000/api/membership',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        if (response.data.success) {
          setSubmitMessage(t('success'))
          resetForm()
          setFiles([])
        } else {
          setSubmitMessage(t('errors.generic'))
        }
      } catch {
        setSubmitMessage(t('errors.generic'))
      }
    },
  })

  const handleFilesSelect = (selectedFiles: FileList) => {
    setFiles(prev => [...prev, ...Array.from(selectedFiles)])
  }

  return (
    <div className="h-fit py-24.5 px-3  lg:py-38 lg:px-25 bg-[#F9FAFB]">
      <h1 className="md:text-[46px] text-[24px] font-bold">
        {t('title')}
      </h1>

      <form className="mt-12.5" onSubmit={formik.handleSubmit}>
        {(
          [
            'name',
            'email',
            'phone',
            'dateOfBirth',
            'gender',
            'address',
            'country',
            'state',
            'region',
          ] as (keyof MembershipFormData)[]
        ).map(field => (
          <div key={field} className="mt-6">
            {field === 'dateOfBirth' && (
              <label className="block mb-2 text-sm text-[#808080]">
                {t(`fields.${field}`)}
              </label>
            )}

            <input
              type={field === 'dateOfBirth' ? 'date' : 'text'}
              placeholder={field !== 'dateOfBirth' ? t(`fields.${field}`) : ''}
              {...formik.getFieldProps(field)}
              className="
        w-full 
        max-w-full 
        box-border
        px-3 py-2 
        border border-[#808080] 
        rounded-[100px]
        appearance-none
        [-webkit-appearance:none]
      "
            />

            {formik.touched[field] && formik.errors[field] && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors[field]}
              </p>
            )}
          </div>
        ))}


        {/* FILE UPLOAD */}
        <div className="mt-8 p-4 bg-white rounded-xl">
          <p className="text-[#808080]">{t('upload.label')}</p>

          <label
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault()
              handleFilesSelect(e.dataTransfer.files)
            }}
            className="mt-3 h-40 flex flex-col items-center justify-center bg-[#FAFAFA] rounded-xl cursor-pointer"
          >
            <input
              type="file"
              multiple
              hidden
              onChange={e =>
                e.target.files && handleFilesSelect(e.target.files)
              }
            />

            <Image src="/images/upload.png" alt="Upload" width={24} height={24} />
            <p className="mt-2 font-medium">
              {t('upload.action')}
            </p>
            <p className="text-[#ADADAD] text-sm">
              {t('upload.types')}
            </p>
          </label>

          {submitMessage && (
            <p className="mt-3 text-sm text-red-600">
              {submitMessage}
            </p>
          )}
        </div>

        <div className='flex justify-end'>
          <button
            type="submit"
            className="mt-10 px-6 py-3 bg-[#1AD329] text-white rounded-[100px]"
          >
            {t('submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MembershipForm