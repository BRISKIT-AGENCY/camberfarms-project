import React from 'react'
import FarmFundForm from '../components/FarmFundForm'
import Navbar from '../components/Navbar'

const page = () => {
    return (
        <div>
            <div className='hidden xl:block'>
                <Navbar logoSrc="/images/logo2.png" linkTextColor="text-black" buttonBgColor="bg-[#1AD329]" buttonTextColor='text-white' />
            </div>
            <FarmFundForm />
        </div>
    )
}

export default page