"use client"

import { ContactForm } from '@/app/modules/home/Contact'
import { RootState } from '@/store/store'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GreaterThanIcon } from '@/utils/icons'
import { ProgramDetailsProp, ProgramsProp } from '@/utils/interface/interface'
import OneHeading from '@/app/modules/detailsView/OneHeading'
import ThreeHeading from '@/app/modules/detailsView/ThreeHeading'
import TwoHeading from '@/app/modules/detailsView/TwoHeading'

const techs = ["iOS", "Android", "Flutter"];

export default function ProgramDetails() {

    const router = useRouter();

    const program = useSelector((state: RootState) => state.programType.program);
    const duration = useSelector((state: RootState) => state.courseData.duration);
    const courseData: ProgramDetailsProp | undefined = useSelector((state: RootState) => state.courseData.courseData);
    const programData = useSelector((state: RootState) => state?.programs?.programsData)

    const filteredProgramData: ProgramsProp | undefined = programData?.find(item => item.key == program);

    const courseTopDetails = courseData && [...courseData?.details, { label: "Duration", value: `${duration} ${duration == 45 ? "days" : "months"}` }];

    const [tech, setTech] = useState<string>("iOS");

    // const program = courseData?.type
    const modules = courseData?.modules

    return (
        <div className='px-5 pt-3 pb-[50px] md:px-[100px] md:pb-[70px]'>

            <div className='flex items-center gap-2'>
                <span className='capitalize cursor-pointer' onClick={() => router.back()}>{filteredProgramData?.title}</span>
                <GreaterThanIcon />
                <span className='text-[#FE5200]'> {duration == 45 ? `${duration} days` : `${duration} months`} </span>
            </div>

            <div className='flex flex-col lg:flex-row gap-[65px] pt-5 '>

                <div className='w-full lg:w-2/3 space-y-6 h-full lg:max-h-[830px] lg:overflow-y-auto hide-scrollbar'>

                    {
                        program == "app-development" &&
                        <div className='flex gap-2'>
                            {techs.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setTech(item)}
                                    className={` ${tech == item ? "text-white bg-[#FE5200]" : "text-[#696969] border border-[#696969]"} cursor-pointer px-3 py-1 sm:px-5 sm:py-2 rounded-full `}>{item}</div>
                            ))}
                        </div>
                    }

                    <div className='font-bold text-4xl leading-[120%]'>
                        {program == "app-development" && tech} {filteredProgramData?.title} Training Program –  {duration == 45 ? `${duration} days` : `${duration} months`}
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        {courseTopDetails?.map((item, index) => (
                            <div key={index} className='px-3 py-1 rounded-md border border-[#D9D9D9] whitespace-nowrap'>
                                {item.label} : {item.value}
                            </div>
                        ))}
                    </div>
                    {filteredProgramData?.image &&
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${filteredProgramData?.image.formats.large.url}`}
                            alt="image"
                            width={filteredProgramData?.image.formats.large.width}
                            height={filteredProgramData?.image.formats.large.height}
                            className='rounded-[15px]' />
                    }
                    <div className='text-2xl font-semibold'>Course Structure</div>

                    <div>
                        {/* {program !== "business-analyst" ?
                            (duration == 3 ? <Months3 data={courseData} tech={tech} /> : <Months6 data={courseData} tech={tech} />) :
                            (duration == 45 ? <Days45 data={courseData} tech="" /> : <Months3 data={courseData} tech="" />)} */}

                        {((modules?.[0]?.title && modules?.[0]?.topics) || program == "app-development") ?
                            <OneHeading data={program == "app-development"
                                ?
                                (courseData?.modules[0] as Record<string, unknown>)?.[tech] : modules} /> :
                            (modules?.[0]?.data) ?
                                <ThreeHeading data={modules} />
                                :
                                <TwoHeading data={modules} />
                        }

                    </div>

                </div>

                <div className='w-full  lg:w-1/3 bg-[#FFFAF4] border border-[#FE5200] rounded-xl h-fit flex flex-col items-center px-4 sm:px-7'>
                    <div className='font-bold text-2xl my-3'>Training Application Form</div>
                    <div className='border  w-full mb-2'></div>
                    <ContactForm span={24} />
                </div>
            </div>

        </div>
    )
}
