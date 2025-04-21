import Heading from '@/app/components/Heading'
import React, { useEffect, useState } from 'react'
import { PhoneIcon } from '@/utils/icons';
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import { headingDataType } from '@/utils/interface/interface';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ProgramCard from '@/app/components/ProgramCard';

const ExplorePrograms = () => {

    const phone = useSelector((state: RootState) => state?.contact?.contactData.find(item => item.name == "phone")?.label)
    const headingData = useSelector((state: RootState) => state?.headings?.headingData?.find((item: headingDataType) => item.type == "explorePrograms"))
    const programData = useSelector((state: RootState) => state?.programs?.programsData)
   
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.05 })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (inView) setIsVisible(true)
        else setIsVisible(false)
    }, [inView])

    return (
        <div ref={ref} className='p-[20px] md:px-[120px] md:py-[70px] bg-[#F8FAFB] h-full'>

            <Heading headingData={headingData} />

            <motion.div
                initial={{ y: 20 }}
                animate={isVisible ? { y: 0 } : { y: 50 }}
                transition={{ duration: 0.7 }}
                className='grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 w-fit mx-auto gap-[20px] py-[20px]'>
                {programData?.map((item, index) => (
                    <div key={index}>
                        <ProgramCard program={item} />
                    </div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.7 }}
                className="flex justify-center flex-col sm:flex-row gap-[12px]">
                <button className="text-white bg-[#FE5200] w-full sm:w-[250px] h-[56px] rounded-[10px] hover:bg-[#FE5200]/90 transition-colors">
                    Request a call
                </button>

                <a href="tel:01724184200" className="border-black hover:bg-gray-200 border w-full sm:w-[250px] h-[56px] rounded-[10px] flex items-center justify-center gap-1 transition-colors">
                    <PhoneIcon color="black" />
                    {phone}
                </a>
            </motion.div>
        </div>
    )
}

export default ExplorePrograms