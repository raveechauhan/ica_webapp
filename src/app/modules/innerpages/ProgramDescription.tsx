import Heading from '@/app/components/Heading'
import { ClockIcon, ColaborateIcon, SettingIcon } from '@/utils/icons'
import { ProgramDescriptionProp } from '@/utils/interface/interface'
import Image from 'next/image'
import React from 'react'

const ProgramDescription: React.FC<{duration: number[] | undefined, durationClick: (duration: number) => void, data: ProgramDescriptionProp | undefined }> = ({ data, durationClick, duration }) => {
    return (
        <div className='flex flex-col-reverse lg:flex-row gap-20 px-5 pt-[30px] pb-[50px] md:px-[120px] md:py-[70px] items-center'>
            <div className='w-full lg:w-1/2'>
                {data?.image &&
                    <Image 
                    src={`${process.env.NEXT_PUBLIC_API_URL}${data?.image}`} 
                    width={590} 
                    height={400} 
                    alt='image' 
                    className='mx-auto max-h-[560px] lg:h-[560px] rounded-[15px]  object-cover' />
                }
            </div>
            <div className='w-full lg:w-1/2 flex flex-col gap-4'>
                <div className='flex h-full flex-col justify-center'>
                    <Heading headingData={data?.headingData} />
                    {
                        data?.innerData?.map((item, index: number) => (
                            <div className='flex items-center md:gap-4 gap-2' key={index}>

                                <div className={` min-w-[34px] h-[34px] rounded-lg flex items-center justify-center ${item.name == "tools" ? "bg-[#5454D4]" : item.name == "audience" ? "bg-[#00A006]" : "bg-[#F04037]"}`}>
                                    {item.name == "tools" ? <SettingIcon /> : item.name == "audience" ? <ColaborateIcon /> : <ClockIcon color='white' />}
                                </div>

                                <div className='flex flex-col md:gap-1'>
                                    <div className='font-bold mt-4'>{item?.title}</div>
                                    <div>{item?.description}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='flex gap-4 ml-12'>
                    {duration?.map((item, index) => (

                        <button 
                        key={index} 
                        className="hover:bg-[#FE5200] rounded-[4px] px-3 py-[6px] hover:text-white border border-[#FE5200] text-[#FE5200]"
                        onClick={() => durationClick(item)}>
                            {item} {item == 3 || item == 6 ? 'months' : 'days'}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ProgramDescription