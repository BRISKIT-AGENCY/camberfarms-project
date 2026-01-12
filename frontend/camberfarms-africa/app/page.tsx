"use client"
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

export default function Home() {
  return (
    <div>
      <Hero />
      <Products
        title="Membership"
        description="Join the Camberfarm Farmers Network and access the tools, support, and market opportunities you need to grow. Our membership connects you to improved farming practices, reliable off-take channels, training programs and resources that help you increase productivity and earn more from every harvest."
        buttonText="Sign Up"
        imageSrc="/images/membership.png"
        imageAlt="image of members"
        onButtonClick={() => console.log('Sign up clicked')}
        buttonClassName="md:w-40"
      />
      <Products
        title="Farm Fund"
        description="Join us in building scalable agriculture across Africa. Through Camberfarm, investors can support real agricultural growth, empower farmers, and participate in a transparent system built for impact and you earn in return. If you are interested in learning more, send us a message and our team will reach out with investment details"
        buttonText="Invest Now"
        imageSrc="/images/farm-fund.png"
        imageAlt="image of funds"
        onButtonClick={() => console.log('Sign up clicked')}
        buttonClassName="md:w-40"
      />
      <Products
        title="Exportation"
        description="Through our specialized subsidiary, Camberfarm Export, we manage all sourcing, quality control, packaging, and logistics, ensuring that every product leaving Africa meets international standards."
        buttonText="Visit Camberfarm Export"
        imageSrc="/images/exportation.png"
        imageAlt="image of cargo ship"
        onButtonClick={() => console.log('Sign up clicked')}
        buttonClassName="md:w-50"
      />
      <Process/>
      <WhoWeAre/>
      <WhatWeDo/>
      <Impact/>
      <Review/>
      <Partnership/>
      <Blogs/>
      <News/>
      <Contact/>
      <MembershipForm/>
    </div>
  );
}
