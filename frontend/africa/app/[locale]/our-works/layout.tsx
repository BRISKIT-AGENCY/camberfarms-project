'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useTranslations, useLocale } from 'next-intl';

export default function OurWorksLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t= useTranslations('OurWorks');
  const locale=useLocale()
const defaultLocale = 'en'; // replace with your actual defaultLocale

const links = [
  { label: t('tabs.membership'), path: '/our-works/membership' },
  { label: t('tabs.farmFund'), path: '/our-works/farm-fund' },
  { label: t('tabs.exportation'), path: '/our-works/exportation' },
  { label: t('tabs.technology'), path: '/our-works/technology' },
  { label: t('tabs.process'), path: '/our-works/process' },
];

// Add locale prefix only if it's not the default
const linksWithHref = links.map(link => ({
  ...link,
  href: locale === defaultLocale ? link.path : `/${locale}${link.path}`
}));

  return (
    <div className="w-full">
      <div className="hidden xl:block">
        <Navbar
          logoSrc="/images/logo2.png"
          linkTextColor="text-black"
          buttonBgColor="bg-[#1AD329]"
          buttonTextColor="text-white"
        />
      </div>

      {/* HERO */}
      <div className="relative w-full md:h-177.5 h-128">
        <img
          src="/images/our-work-hero.png"
          alt={t('hero.imageAlt')}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/70" />

        <div className="absolute left-10 md:left-25 top-66.75 text-white pr-10 lg:pr-90">
          <h1 className="md:text-[56px] text-[24px] font-bold">
            {t('hero.title')}
          </h1>

          <p className="md:text-[22px] text-[14px] mt-6">
            {t('hero.description')}
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="md:px-25 px-6 mt-12.5 overflow-x-hidden">
        <div
          className="
            flex gap-12.5
            max-w-full
            overflow-x-auto
            whitespace-nowrap
            lg:overflow-visible
            lg:whitespace-normal
            lg:text-[24px]
            text-[16px]
          "
        >
          {linksWithHref.map(link => {
  const isActive = pathname === link.href;

  return (
    <Link key={link.href} href={link.href} className="relative pb-2 font-medium shrink-0">
      {link.label}
      {isActive && <span className="absolute left-0 bottom-0 w-full h-0.75 bg-[#1AD329]" />}
    </Link>
  );
})}

        </div>
      </div>

      {/* PAGE CONTENT */}
      <div>{children}</div>
    </div>
  );
}