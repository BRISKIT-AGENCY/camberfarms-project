import React from 'react'

const MembershipText = () => {
    return (
        <div className='mt-25 pb-33.75 md:px-25 px-6'>
            <h1 className='md:text-[46px] text-[24px] font-bold'>Membership</h1>
            <img src="/images/membership-hero.png" alt="image of members" className='w-full h-108 object-center hidden md:block mt-6' />
            <img src="/images/membership-hero-sm.png" alt="image of members" className='w-full h-75  md:hidden block mt-2' />
            <p className='mt-12.5 md:text-[18px] text-[14px]'>The Camberfarm Membership is open to everyone who wants to be part of Africa’s growing agricultural ecosystem. Farmers, investors, partners, agripreneurs, or individuals who believe in agricultural development.
                By joining our membership community, you gain access to valuable opportunities based on your interest:</p>
            <ul className='list-disc mt-6 md:text-[18px] text-[14px]'>
                <li>Farmers receive support through inputs, training, and market access.</li>
                <li>Investors connect with transparent agricultural opportunities and real impact.</li>
                <li>Partners and individuals become part of a network driving sustainable growth across Africa.</li>
            </ul>
            <p className='mt-6 md:text-[18px] text-[14px]'>Membership gives you a direct connection to the Camberfarm network, keeping you informed, engaged, and empowered. Whether you're looking to grow your farm, explore investment options, or simply stay connected to our work, Camberfarm provides the platform and support to help you thrive.</p>
            <button className='mt-12.5'>
                <p className='bg-[#1AD329] text-white py-2.75 px-11.25 rounded-[100px] text-[18px]'>sign up</p>
            </button>
        </div>
    )
}

export default MembershipText