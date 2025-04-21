import { ProgramStructuredData } from '@/utils/interface/interface'
import React from 'react'

const ThreeHeading: React.FC<{ data: ProgramStructuredData[] | undefined }> = ({ data }) => {
    return (
        <div className='flex  flex-col gap-6'>
            {data?.map((item, index) => {

                return (
                    <div key={index} className='flex flex-col gap-4'>
                        <div className='text-2xl font-semibold'>{item.title}</div>
                        {item?.data?.map((item, index) => (
                            <div key={index}>
                                <div className='text-xl font-semibold mb-4'>{item?.title}</div>

                                {item?.data?.map((item, index) => (
                                    <div key={index}>
                                        <div className='text-lg font-semibold '>{item?.title}</div>
                                        <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginBottom: "10px" }}>
                                            {item?.topics?.map((item, index) => {
                                                return (
                                                    <li className='ml-2' key={index}>{item}</li>
                                                )
                                            }
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )
            }
            )}
        </div>
    )
}

export default ThreeHeading