import { ProgramStructuredData } from '@/utils/interface/interface'
import React from 'react'

const TwoHeading: React.FC<{ data: ProgramStructuredData[] | undefined }> = ({ data }) => {
    return (
        <div className='flex  flex-col gap-6'>
            {data?.map((item, index) => {

                return (
                    <div key={index} className='flex flex-col gap-4'>
                        <div className='text-2xl font-semibold'>{item.title}</div>
                        {item?.weeks?.map((item, index) => (
                            <div key={index}>
                                <div className='text-xl font-semibold mb-4'>{item?.title}</div>
                                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
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
                )
            }
            )}
        </div>
    )
}

export default TwoHeading