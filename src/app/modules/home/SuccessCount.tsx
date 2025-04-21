import React, { useEffect, useState } from 'react'

type SuccessType = {
    count: number,
    label: string
}

export default function SuccessCount() {

    const [successData, setSuccessData] = useState<SuccessType[] | undefined>(undefined)

        const fetchSuccess = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/success-datas`);
    
                if (!response.ok) {
                    throw new Error(`Failed to fetch explore data`);
                }
    
                const data = await response.json();
                setSuccessData(data?.data);
            }
            catch (error) {
                console.error("Error fetching successCount", error);
            }
        }

        useEffect(()=>{
            fetchSuccess();
        },[])

    return (
        <div className='bg-black py-8 text-white flex gap-[15px] flex-col sm:flex-row items-center justify-evenly'>
            {successData?.map((item, index) => (
                <div key={index} className='flex-1 flex sm:flex-col flex-row gap-2 justify-center items-center relative'>
                    <div className='md:text-5xl text-3xl font-bold'>
                        <span>{item.count}</span>
                        </div>
                    <span className='text-xs text-center'>{item.label}</span>
                    {index !== successData?.length - 1 && (
                        <div className="absolute right-0 top-0 h-full border-l-2 border hidden md:block"></div>
                    )}
                </div>
            ))}
        </div>
    )
}
