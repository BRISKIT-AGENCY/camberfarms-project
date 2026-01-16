import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Hero from "./components/Hero";
import Products from "./components/Product";
import WhatWeDo from "./components/WhatWeDo";
import Process from "./components/Process";
import WhoWeAre from "./components/WhoWeAre";
import Impact from "./components/Impact";
import Review from "./components/Review";
import Partnership from "./components/Partnership";
import Blogs from "./components/Blogs";
import News from "./components/News";
import Contact from "./components/Contact";

export default async function Home({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  const t = await getTranslations("Contact")
  return (
    <div>
      <Hero/>
      <Products
        link='/membership'
        titleKey="membership_title"
        descriptionKey="membership_description"
        buttonTextKey="membership_button"
        imageSrc="/images/membership.png"
        imageAlt="image of members"
       
      />

      <Products
        link='/farm-fund'
        titleKey="farmFund_title"
        descriptionKey="farmFund_description"
        buttonTextKey="farmFund_button"
        imageSrc="/images/farm-fund.png"
        imageAlt="image of funds"
       
      />

      <Products
        link='/export'
        titleKey="export_title"
        descriptionKey="export_description"
        buttonTextKey="export_button"
        imageSrc="/images/exportation.png"
        imageAlt="image of cargo ship"
     
      />
      <Process showImage={false}/>
      <WhoWeAre />
      <WhatWeDo />
      <div id='impact'>
        <Impact hColor="#1AD329" pColor="#808080" />
      </div>
      <Review/>
      <Partnership />
      <Blogs />
      <News />
      <Contact heading={t('heading1')} description={t('description1')} button={t('sendButton1')} placeholder={t('placeholders.message1')} />
    </div>
  );
}
