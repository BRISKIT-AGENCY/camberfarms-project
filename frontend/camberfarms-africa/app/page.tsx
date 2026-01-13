"use client"
import { useTranslation } from 'react-i18next'
import Hero from "./components/Hero";
import Process from "./components/Process";
import Products from "./components/Products";
import WhatWeDo from "./components/WhatWeDo";
import Partnership from "./components/Partnership";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import WhoWeAre from "./components/WhoWeAre";
import News from "./components/News";
import Review from "./components/Review";
import Impact from "./components/Impact";
import MembershipForm from "./components/MembershipForm";
import FarmFundForm from "./components/FarmFundForm";
import OurWorks from "./components/OurWorks";
import MembershipText from "./components/MembershipText";

export default function Home() {
  const { t } = useTranslation('contact')
  return (
    <div>
      <Hero />
      <Products
        link='/membership'
        titleKey="membership_title"
        descriptionKey="membership_description"
        buttonTextKey="membership_button"
        imageSrc="/images/membership.png"
        imageAlt="image of members"
        onButtonClick={() => console.log('Sign up clicked')}
        buttonClassName="md:w-40"
      />

      <Products
        link='/farm-fund'
        titleKey="farmFund_title"
        descriptionKey="farmFund_description"
        buttonTextKey="farmFund_button"
        imageSrc="/images/farm-fund.png"
        imageAlt="image of funds"
        onButtonClick={() => console.log('Invest clicked')}
        buttonClassName="md:w-40"
      />

      <Products
        link='/export'
        titleKey="export_title"
        descriptionKey="export_description"
        buttonTextKey="export_button"
        imageSrc="/images/exportation.png"
        imageAlt="image of cargo ship"
        onButtonClick={() => console.log('Visit Export clicked')}
        buttonClassName="md:w-50"
      />

      <Process showImage={false}/>
      <WhoWeAre />
      <WhatWeDo />
      <Impact hColor="#1AD329" pColor="#808080" />
      <Review />
      <Partnership />
      <Blogs />
      <News />
      <Contact heading={t('heading1')} description={t('description1')} button={t('sendButton1')} placeholder={t('placeholders.message1')} />
    </div>
  );
}

