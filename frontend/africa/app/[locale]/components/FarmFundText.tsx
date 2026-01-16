import React from 'react'

const FarmFundText = () => {
  return (
    <div className='mt-25 pb-33.75 md:px-25 px-6'>
      <h1 className='md:text-[46px] text-[24px] font-bold'>Farm Fund</h1>
      <img src="/images/farmfund-hero.png" alt="image of members" className='w-full h-108 object-center hidden md:block mt-6' />
      <img src="/images/farmfund-hero-bg.png" alt="image of members" className='w-full h-75  md:hidden block mt-2' />
      <p className='mt-12.5 md:text-[18px] text-[14px]'>The Camberfarm Farm Fund gives investors an opportunity to support real agricultural growth while contributing to a more sustainable food system across Africa.</p>
      <p className='md:text-[18px] text-[14px]'>Through the Farm Fund, investors can express interest in structured agricultural projects that impact farmers, strengthen local production, and create long-term value across the supply chain.</p>
      <p className='md:text-[18px] text-[14px]'> We work with trusted farmer networks, verified farm clusters, and proven production systems to ensure transparency, responsible management, and measurable results.</p>
      <p className='md:text-[18px] text-[14px]'>By joining the Farm Fund, you become part of a system that:</p>
      <ul className='list-disc mt-6 md:text-[18px] text-[14px]'>
        <li>empowers farmers with resources and training,</li>
        <li>scales agricultural production sustainably,</li>
        <li>reduces post-harvest losses,</li>
        <li>and drives shared growth for both communities and investors.</li>
      </ul>
      <p className='mt-6 md:text-[18px] text-[14px]'>If you're exploring agricultural investment opportunities and want clarity, structure, and impact, complete the expression-of-interest form below. Our team will reach out with available projects, requirements, and next steps.</p>
      <button className='mt-12.5'>
        <p className='bg-[#1AD329] text-white py-2.75 px-11.25 rounded-[100px] text-[18px]'>Invest Now</p>
      </button>
    </div>
  )
}

export default FarmFundText