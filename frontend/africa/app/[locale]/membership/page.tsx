import React from 'react'
import MembershipForm from '../components/MembershipForm'
import Navbar from '../components/Navbar'

const page = () => {
    return (
        <div>
            <div className='hidden xl:block'>
                <Navbar logoSrc="/images/logo2.png" linkTextColor="text-black" buttonBgColor="bg-[#1AD329]" buttonTextColor='text-white' />
            </div>
            <MembershipForm />
        </div>
    )
}

export default page