import Heading from '@/app/components/Heading'
import { RootState } from '@/store/store'
import { PhoneIcon } from '@/utils/icons'
import { HeadingTypes } from '@/utils/interface/interface'
import React from 'react'
import { useSelector } from 'react-redux'

const ProgramBrief: React.FC<{data: HeadingTypes | undefined}> = ({ data }) => {
    const phone = useSelector((state: RootState) => state?.contact?.contactData.find(item => item.name == "phone")?.label)

    return (
        <div className='px-5 pt-[30px] pb-[50px] md:px-[200px] md:py-[70px]'>

            <Heading headingData={data} alingCenter />

            <div className="flex lg:flex-col flex-col xl:flex-row justify-center items-center custom540:flex-row gap-[12px] mt-4">
                <button className="text-white bg-[#FE5200] w-[230px] h-[56px] rounded-[10px] hover:bg-[#FE5200]/90 transition-colors">
                    Request a call
                </button>

                <a href="tel:01724184200" className="border-black border w-[230px] h-[56px] rounded-[10px] flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors">
                   <PhoneIcon color="black" />
                    {phone}
                </a>
            </div>
        </div>
    )
}

export default ProgramBrief