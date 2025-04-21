import Heading from '@/app/components/Heading'
import ProgramCard from '@/app/components/ProgramCard'
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

export default function RelatedPrograms() {

    const programData = useSelector((state: RootState) => state?.programs?.programsData)
    const program = useSelector((state: RootState) => state?.programType?.program)

    const filteredPrograms = programData?.filter(item => item.key !== program)

    const headingData = {
        head: "Programs",
        title: "Related Programs ",
        text: "We offer a range of comprehensive training programs designed to help individuals and organizations thrive in the fast paced world of technology. ",
    }

    return (
        <div className=' px-5 pt-[30px] pb-[50px] md:px-[120px] md:py-[70px]'>

            <Heading headingData={headingData} alingCenter />

            <div
                className='grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 w-fit mx-auto gap-[20px] py-[20px]'>
                {filteredPrograms?.slice(0, 3).map((item, index) => (
                    <div key={index}>
                        <ProgramCard program={item} />
                    </div>
                ))}
            </div>

        </div>
    )
}
