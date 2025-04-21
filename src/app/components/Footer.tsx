import { AppLogo } from '@/utils/icons'
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { iconsMap } from '@/utils/constants'
import { updateSelectedProgram } from '@/store/slices/selectedProgramSlice';
import { useRouter } from 'next/navigation';

type MenuItem = {
  label: string;
  link: string;
};

const menuItems: MenuItem[] = [
  { label: "Home", link: "/home" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
];

export default function Footer() {

  const dispatch = useDispatch();
  const router = useRouter();

  const programs = useSelector((state: RootState) => state?.availablePrograms?.availablePrograms)
  const socialLinks = useSelector((state: RootState) => state?.contact?.socialLinks)
  const contactData = useSelector((state: RootState) => state?.contact?.contactData)

  const handleProgramClick = (program: string) => {
    dispatch(updateSelectedProgram({ program: program }))
    router.push("/program")
  }

  const renderIcon = (iconName: string) => iconsMap[iconName] || null;

  return (
    <div className='w-full h-auto md:px-[120px] px-5 flex flex-col items-center justify-center  text-white bg-black'>

      <div className='grid grid-cols-7 gap-[30px]  md:gap-20 py-10 md:py-16 w-full'>

        <div className='col-span-7 lg:col-span-2 flex flex-col md:gap-10 gap-3 '>
          <AppLogo color='white' />
          <div className='flex flex-col gap-[6px]'>
            <p>With over 12 years of experience, Ignited Code Art Infotech, headquartered in India...</p>
            <Link href={"/about"} className='text-[#FE5200] font-semibold border-b-2 border-[#FE5200] w-fit cursor-pointer'>Read More</Link>
          </div>
        </div>

        <div className='flex flex-col col-span-3 md:col-span-3 lg:col-span-1 gap-5'>
          <div className='font-semibold text-[18px] whitespace-nowrap'>Site Map</div>
          <div className='flex flex-col gap-3'>
            {menuItems.map((item, index) => (
              <Link href={item.link} key={index} className='hover:text-[#FE5200]'>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-5 col-span-4 lg:col-span-2  '>
          <div className='font-semibold text-[18px]'>Programs</div>
          <div className='flex flex-col gap-3'>
            {programs?.map((item, index) => (
              <div onClick={() => handleProgramClick(item.key)} key={index} className='cursor-pointer hover:text-[#FE5200]'>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col col-span-7 md:col-span-3 lg:col-span-2 gap-5 '>
          <div className='font-semibold text-[18px]'>Contact Info</div>
          <div className='flex flex-col gap-3'>
            {contactData.map((item, index) => (
              <div key={index} className=' flex gap-[12px] items-center'>
                <div className='scale-90'>{renderIcon(item.name)}</div> {item.label}
              </div>
            ))}
          </div>

          <div className='flex gap-3'>
            {socialLinks.map((item, index) => (
              <Link href={item.href || ""} target='_blank' key={index} className='w-10 h-10 flex items-center justify-center rounded-full bg-white hover:invert transform duration-300'>
                {renderIcon(item.name)}
              </Link>
            ))}
          </div>

        </div>

      </div>

      <div className='w-full border border-[#9F9F9F]'></div>

      <div className='flex flex-col sm:flex-row gap-2 justify-between w-full py-8 text-[#9F9F9F] text-[14px]'>
        <div>© 2025 Ignited code art infotech. All Rights Reserved. </div>

        <div className='flex gap-2 md:gap-6'>
          <button>Privacy Policy</button>
          <button>Terms of Service</button>
        </div>
      </div>

    </div>

  )
}
