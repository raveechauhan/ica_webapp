import Heading from '@/app/components/Heading'
import { BestTrainingProp } from '@/utils/interface/interface'
import Image from 'next/image'
import React from 'react'

const BestTraining: React.FC<{ data: BestTrainingProp | undefined }> = ({ data }) => {
    return (
        <div className='flex flex-col lg:flex-row items-center px-5 pt-[30px] pb-[50px] md:px-[120px] md:py-[70px] gap-[80px]'>

            <div className='w-full lg:w-1/2'>
                <Heading
                    headingData={data?.headingData}
                />
            </div>

            {data?.image &&
                <div className='w-full h-full lg:w-1/2 flex gap-4'>
                    <Image 
                    src={`${process.env.NEXT_PUBLIC_API_URL}${data?.image}`} 
                    width={590}
                    height={590}
                    layout=''
                    alt='image'
                    className='mx-auto rounded-xl object-cover h-full' />
                </div>
            }
        </div>
    )
}

export default BestTraining