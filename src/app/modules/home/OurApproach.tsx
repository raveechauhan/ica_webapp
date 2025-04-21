import Heading from '@/app/components/Heading'
import { RootState } from '@/store/store'
import { AndroidIcon, AppleIcon, ColaborateIcon, CssIcon, FigmaIcon, FlutterIcon, HtmlIcon, NodeIcon, PhpIcon, PythonIcon, SessionIcon, SettingIcon } from '@/utils/icons'
import { headingDataType } from '@/utils/interface/interface'
import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'

type ContentProp = {
    title: string,
    description: string,
    icon: ReactNode,
    color: string,
}

const content: ContentProp[] = [
    {
        "title": "Interactive Sessions",
        "description": "Engaging, real-time learning experiences that ensure retention and application.",
        "icon": <SessionIcon />,
        "color": "bg-[#F04037]"
    },
    {
        "title": "Cutting-Edge Tools",
        "description": "Access to the latest tools, software, and platforms used in the IT industry.",
        "icon": <SettingIcon />,
        "color": "bg-[#5454D4]"
    },
    {
        "title": "Collaborative Environment",
        "description": "Learn in a collaborative setting, network with other professionals, and share knowledge.",
        "icon": <ColaborateIcon />,
        "color": "bg-[#00A006]"
    }
]

type IconsProp = {
    icon: ReactNode
}

const icons: IconsProp[] = [
    {
        icon: <AppleIcon width='80' height='80' />
    },
    {
        icon: <PhpIcon />
    },
    {
        icon: <CssIcon />
    },
    {
        icon: <PythonIcon width='80' height='80' />
    },
    {
        icon: <FigmaIcon />
    },
    {
        icon: <FlutterIcon />
    },
    {
        icon: <HtmlIcon />
    },
    {
        icon: <NodeIcon />
    },
    {
        icon: <AndroidIcon />
    },
]

type ShowIconsProps = {
    data: IconsProp[]
}

const ShowIcons: React.FC<ShowIconsProps> = ({ data }) => {
    return (
        <div className='flex flex-col gap-3'>
            {data.map((item, index) => (
                <div key={index} className='w-[160px] h-[160px] rounded-full shadow-2xl flex items-center justify-center'>
                    {item.icon}
                </div>
            ))}
        </div>
    )
}

const OurApproach = () => {

      const headingData = useSelector((state:RootState) => state?.headings?.headingData?.find((item:headingDataType) => item.type=="ourApproach"))
    
    return (
        <div className='h-full flex flex-col sm:gap-20 lg:flex-row p-[20px] pt-0 lg:px-28 lg:py-20 md:px-[120px] md:py-[70px] lg:gap-0 xl:gap-16 w-full items-center justify-center'>
            <div className=' flex justify-center items-center gap-6 scale-[0.60] sm:scale-[0.80] md:scale-100 lg:scale-90 xl:scale-100'>
                <motion.div
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}  >
                    <ShowIcons data={icons.slice(0, 3)} />
                </motion.div>

                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 50 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }} >
                    <ShowIcons data={icons.slice(3, 6)} />
                </motion.div>

                <motion.div
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }} >
                    <ShowIcons data={icons.slice(6, 9)} />
                </motion.div>
                
            </div>

            <div className='flex flex-col gap-6 w-full  '>
                <Heading headingData={headingData} />

                <div className='flex flex-col gap-6 '>
                    {
                        content.map((item, index) => (
                            <div className='flex items-center md:gap-4 gap-2' key={index}>
                                <div className={`${item.color} min-w-[34px] h-[34px] rounded-lg flex items-center justify-center`}>{item?.icon}</div>
                                <div className='flex flex-col md:gap-1'>
                                    <div className='font-bold'>{item?.title}</div>
                                    <div>{item?.description}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>
        </div>
    )
}

export default OurApproach