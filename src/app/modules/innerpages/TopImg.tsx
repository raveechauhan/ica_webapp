import Image from 'next/image'
import React from 'react'
import Heading from '../../components/Heading'
import { BestTrainingProp } from '@/utils/interface/interface'

const TopImg: React.FC<{data: BestTrainingProp | undefined}> = ({ data }) => {
  return (
    <div className='relative bg-black z-20 h-[270px] w-full'>

      {data?.image &&
        <Image 
        src={`${process.env.NEXT_PUBLIC_API_URL}${data?.image}`} 
        width={590} 
        height={590} 
        alt="about" 
        className='w-full h-[270px] object-cover z-10 opacity-50' />
      }

      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <Heading headingData={data?.headingData} titleWhite={true} alingCenter />
      </div>
    </div>
  )
}

export default TopImg