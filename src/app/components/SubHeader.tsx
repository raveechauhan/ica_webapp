"use client"

import { updateSelectedProgram } from '@/store/slices/selectedProgramSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, usePathname } from 'next/navigation'
import { RootState } from '@/store/store'

export default function SubHeader() {

    const dispatch = useDispatch();

    const pathname = usePathname();

    const router = useRouter();

    const programs = useSelector((state: RootState) => state?.availablePrograms?.availablePrograms)

    const handleNavClick = (program: string) => {
        if (pathname !== "program") {
            router.push("/program")
            setTimeout(() => {
                dispatch(updateSelectedProgram({ program: program }))
            }, 330);
        }
        else {
            dispatch(updateSelectedProgram({ program: program }))
        }
    }

    return programs ?
        <>
            <div className="h-10 sm:h-[50px] bg-[#FE5200] w-full text-white font-medium flex overflow-y-auto hide-scrollbar">
                {programs?.map((item, index) => (
                    <div
                        onClick={() => handleNavClick(item.key || "")}
                        key={index}
                        className="flex-1 flex justify-center items-center relative whitespace-nowrap px-3 cursor-pointer"
                    >
                        <span>{item.label}</span>

                        {index !== programs.length - 1 && (
                            <div className="absolute right-0 top-0 h-full border-l-2 border-[#FF8D56]"></div>
                        )}
                    </div>
                ))}
            </div>

        </>
        : null
}