import { ProgramsProp } from '@/utils/interface/interface'
import React from 'react'
import { ClockIcon, NextArrow } from '@/utils/icons';
import { motion } from 'framer-motion'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { updateSelectedProgram } from '@/store/slices/selectedProgramSlice';
import { useRouter } from 'next/navigation';

const ProgramCard: React.FC<{ program: ProgramsProp }> = ({ program }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const handleMoreClick = (program: string) => {
        dispatch(updateSelectedProgram({ program: program }));
        router.push("/program");
    }

    return (
        <motion.div
            className='flex flex-col bg-white p-4 w-full rounded-[15px] gap-3'
            whileHover={{ scale: 1.01, y: -10, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.20)" }}
        >
            <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${program.image.formats.large.url}`}
                width={program.image.formats.large.width}
                height={program.image.formats.large.height}
                className='w-full h-[300px] rounded-[12px]'
                alt="image" />
            <div>
                <div className='font-semibold text-[20px]'>{program.title}</div>
                <div className='flex items-center gap-[6px] font-medium text-[14px] text-[#FF962B]'> <ClockIcon /> {program.duration}</div>
            </div>
            <div>{program.description}</div>
            <div onClick={() => handleMoreClick(program.key)} className='text-[#FE5200] flex items-center gap-[6px] font-bold cursor-pointer'>Know More<NextArrow /></div>
        </motion.div>
    )
}

export default ProgramCard