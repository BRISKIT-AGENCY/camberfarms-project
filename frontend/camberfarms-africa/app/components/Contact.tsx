'use client'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'

type ContactProps = {
  heading: string
  description: string
  button: string
  placeholder: string
}

type ContactFormValues = {
  name: string
  email: string
  phone: string
  message: string
}

const Contact = ({ heading, description, button, placeholder }: ContactProps) => {
  const { t } = useTranslation('contact')

  /* ------------------ Validation Schema ------------------ */
  const validationSchema = Yup.object({
    name: Yup.string().required(t('errors.name')),
    email: Yup.string()
      .email(t('errors.emailInvalid'))
      .required(t('errors.email')),
    phone: Yup.string().required(t('errors.phone')),
    message: Yup.string().required(t('errors.message'))
  })

  /* ------------------ Formik ------------------ */
  const formik = useFormik<ContactFormValues>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/contact',
          values,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )

        if (data.success) {
          alert(t('success'))
          resetForm()
        } else {
          alert(data.message)
        }
      } catch (error: any) {
        alert(error?.response?.data?.message || t('error'))
      }
    }
  })

  return (
    <div className="h-fit py-24.5 px-3 md:h-190.75 lg:py-38 lg:px-25">
      <div className="w-full h-full">
        <h1 className="md:text-[46px] text-[24px] font-bold">
          {heading}
        </h1>

        <p className="md:text-[18px] text-[12px] md:mt-2">
          {description}
        </p>

        <form className="mt-12.5" onSubmit={formik.handleSubmit}>
          {/* ROW */}
          <div className="flex gap-4.5 flex-col md:flex-row">
            {/* NAME */}
            <div className="flex-1">
              <input
                type="text"
                placeholder={t('placeholders.name')}
                {...formik.getFieldProps('name')}
                className="w-full px-3 py-2 border border-[#808080] rounded-[100px]"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="flex-1">
              <input
                type="email"
                placeholder={t('placeholders.email')}
                {...formik.getFieldProps('email')}
                className="w-full px-3 py-2 border border-[#808080] rounded-[100px]"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div className="flex-1">
              <input
                type="tel"
                placeholder={t('placeholders.phone')}
                {...formik.getFieldProps('phone')}
                className="w-full px-3 py-2 border border-[#808080] rounded-[100px]"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* MESSAGE */}
          <div className="mt-6">
            <textarea
              placeholder={placeholder}
              {...formik.getFieldProps('message')}
              className="w-full px-3 py-2 border border-[#808080] rounded-xl h-25 md:h-35"
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="h-11 mt-8 px-6 bg-[#1AD329] text-white rounded-[100px] disabled:opacity-60"
            >
              {button}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
