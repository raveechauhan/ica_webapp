"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { Drawer, Dropdown, Space } from 'antd';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AppLogo, DownArrowIcon, HamburgerIcon, PhoneIcon } from '@/utils/icons'
import { useRouter } from 'next/navigation';
import { updateSelectedProgram } from '@/store/slices/selectedProgramSlice';

type NavProp = {
    label: string,
    name: string,
    link: string
}

const navArr: NavProp[] = [
    {
        label: "Home",
        name: "home",
        link: "/home"
    },
    {
        label: "About",
        name: "about",
        link: "/about"
    },
    {
        label: "Programs",
        name: "program",
        link: "/program"
    },
    {
        label: "Contact",
        name: "contact",
        link: "/contact"
    }
];

export default function Header() {

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const pathname = usePathname();

    const dispatch = useDispatch();

    const phone = useSelector((state: RootState) => state?.contact?.contactData.find(item => item.name == "phone")?.label)
    const programs = useSelector((state: RootState) => state?.availablePrograms?.availablePrograms)

    const handleItemClick = (program: string) => {
        dispatch(updateSelectedProgram({ program: program }))
        setOpen(false);
        router.push("/program")
    }

    return (
        <div className='h-[100px] flex justify-between items-center px-2 md:px-20'>

            <div className='md:scale-100 scale-90 flex gap-1 items-center cursor-pointer' onClick={() => router.push("/home")}>

                <AppLogo color={"#FF962B"} />
            </div>
            <div className='flex justify-center items-center gap-2 md:gap-10'>
                <div className='hidden md:flex gap-8 items-center'>
                    {navArr?.map((item, index) =>
                        item.name !== "program" ?
                            <Link key={index} href={item.link} className={`hover:text-[#FE5200] transition flex items-center gap-2 ${pathname.includes(item.name) ? " border-b-2 text-[#FE5200] border-[#FE5200]" : ""}`}>
                                {item.label}
                            </Link>
                            :
                            <Dropdown prefixCls='custom-dropdown' key="program-dropdown" menu={{ items: programs, onClick: (e) => handleItemClick(e.key) }}>
                                <div>
                                    <Space>
                                        <div className={`flex items-center gap-1 cursor-pointer ${pathname.includes("program") ? "border-b-2 text-[#FE5200] border-[#FE5200]" : ""}`}>
                                            Programs <DownArrowIcon color={pathname.includes("program") ? "#FE5200" : "black"} />
                                        </div>
                                    </Space>
                                </div>
                            </Dropdown>
                    )}
                </div>

                <a href="tel:01724184200" className='bg-black rounded-[10px] md:p-[10px] p-2 sm:flex items-center justify-center gap-2 hidden '>
                    <div>
                        <PhoneIcon />
                    </div>
                    <div className='text-white text-[14px] flex flex-col items-end'>
                        <p>Admission Helpline</p>
                        <p className='whitespace-nowrap'>{phone}</p>
                    </div>
                </a>
                <button name='hamburger' className='md:hidden' onClick={() => setOpen(true)}>
                    <HamburgerIcon />
                </button>

                <Drawer title=""
                    placement="right"
                    onClose={() => setOpen(false)}
                    open={open}>
                    <div className='flex flex-col gap-4'>
                        {navArr.map((item, index) => (
                            item.name !== "program" ?
                                <Link onClick={() => setOpen(false)} key={index} href={item.link} className={`w-fit hover:text-[#FE5200] text-xl font-semibold transition flex items-center gap-2 ${pathname.includes(item.name) ? " border-b-2 text-[#FE5200] border-[#FE5200]" : ""}`}>
                                    {item.label}
                                </Link>
                                :
                                <div key={index}>
                                    <div className='text-xl font-semibold'>Programs </div>
                                    <div>
                                        {programs?.map((item, index) => (
                                            <div className='ml-4 my-2 cursor-pointer' key={index} onClick={() => handleItemClick(item.key)}>{item.label} </div>
                                        ))}
                                    </div>
                                </div>
                        ))}
                        <a href="tel:01724184200" className='bg-black rounded-[10px] md:p-[10px] p-2 flex items-center justify-center gap-4 w-full mt-4'>
                            <div>
                                <PhoneIcon />
                            </div>
                            <div className='text-white text-[14px] flex flex-col items-end'>
                                <p>Admission Helpline</p>
                                <p className='whitespace-nowrap'>{phone}</p>
                            </div>
                        </a>
                    </div>
                </Drawer>
            </div>
        </div>
    );
}
