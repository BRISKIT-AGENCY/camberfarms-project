import React from 'react'
import Process from './Process'

const TechnologyText = () => {
  return (
    <div className='mt-25 pb-33.75 md:px-25 px-6'>
      <h1 className='md:text-[46px] text-[24px] font-bold'>Our Technology</h1>
      <p className='mt-2 md:text-[18px] text-[14px]'>We explore a full range of Agricultural technology solutions that ensure maximum value at the least possible cost to smallholder farmers and other relevant stakeholders, ultimately leading to food security for Africans and the World.</p>
      <div >
        <Process px='px-3' mdPx='md:px-12.5' py='py-6' mdPy='md:py-12.5' showHeader={false} mdMt='md:mt-12.5' mt='mt-6' showGreenH1={false}/>
      </div>
    </div>
  )
}

export default TechnologyText