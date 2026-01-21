'use client'
import Image from 'next/image'
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslations } from 'next-intl';

import { useState, ChangeEvent, FormEvent } from "react";

type FarmFundFormData = {
  name: string;
  email: string;
  phone: string;
  category: string;
  country: string;
  residence: string;
};

const farmFundValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  category: Yup.string().required("Category is required"),
  country: Yup.string().required("Country is required"),
  residence: Yup.string().required("State of residence is required")
});

const API_URL = process.env.NEXT_PUBLIC_API_URL
const FarmFundForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      country: "",
      residence: ""
    },
    validationSchema: farmFundValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting, setStatus }) => {
      try {
        await axios.post(`${API_URL}/api/farm-fund`, values);
        resetForm();
        setStatus({ success: "Form submitted successfully" });
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setStatus({
            error: error.response?.data?.message || "Something went wrong"
          });
        }
      } finally {
        setSubmitting(false);
      }
    }
  });

  const t = useTranslations('FarmFund');

  return (
    <div className="h-fit py-24.5 px-3 lg:py-27.5 lg:px-25 bg-[#F9FAFB]">
      <div className="w-full h-full">
        <h1 className="md:text-[46px] text-[24px] font-bold">
          {t('title')}
        </h1>

        <form className="mt-12.5" onSubmit={formik.handleSubmit}>
          <div>
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder={t('name')}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-[#808080] rounded-[100px] h-12.5 md:h-11"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder={t('phone')}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-6 md:mt-4.5 w-full px-3 py-2 border border-[#808080] rounded-[100px] h-12.5 md:h-11"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
            )}

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder={t('email')}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-6 md:mt-4.5 w-full px-3 py-2 border border-[#808080] rounded-[100px] h-12.5 md:h-11"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}

            {/* Country */}
            <input
              type="text"
              name="country"
              placeholder={t('country')}
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-6 md:mt-4.5 w-full px-3 py-2 border border-[#808080] rounded-[100px] h-12.5 md:h-11"
            />
            {formik.touched.country && formik.errors.country && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.country}</p>
            )}

            {/* Residence */}
            <input
              type="text"
              name="residence"
              placeholder={t('state')}
              value={formik.values.residence}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-6 md:mt-4.5 w-full px-3 py-2 border border-[#808080] rounded-[100px] h-12.5 md:h-11"
            />
            {formik.touched.residence && formik.errors.residence && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.residence}
              </p>
            )}

            {/* Category */}
            <div className="mt-6 md:mt-4.5 relative w-full">
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-[#808080] text-[#808080] rounded-[100px] h-12.5 md:h-11 bg-white appearance-none"
              >
                <option value="" disabled>
                  {t('selectResponse')}
                </option>
                <option value="option1">{t('responseOption1')}</option>
                <option value="option2">{t('responseOption2')}</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pr-3.5">
                <Image
                  src="/images/arrowdown.png"
                  alt="Dropdown arrow"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            {formik.touched.category && formik.errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.category}
              </p>
            )}
          </div>

          {/* Status messages */}
          {formik.status?.error && (
            <p className="mt-4 text-sm text-red-500">{formik.status.error}</p>
          )}
          {formik.status?.success && (
            <p className="mt-4 text-sm text-green-600">
              {formik.status.success}
            </p>
          )}

          <div className="flex justify-start mt-12.5">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="h-11 md:h-12.5 px-6 py-3 bg-[#1AD329] text-white rounded-[100px] disabled:opacity-50"
            >
              {formik.isSubmitting ? t('submitting') : t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmFundForm;