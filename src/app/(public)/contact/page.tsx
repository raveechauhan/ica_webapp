"use client"

import TopImg from '@/app/modules/innerpages/TopImg'
import { RootState } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ColouredIconsMap } from '@/utils/constants'
import { ContactForm } from '@/app/modules/home/Contact'
import Heading from '@/app/components/Heading'
import { Collapse } from "antd";
import { ContactPageProp } from '@/utils/interface/interface'
import Loader from '@/app/components/Loader'

export default function Contact() {

    const [fetchedData, setFetchedData] = useState<ContactPageProp | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)

    const faq = fetchedData?.faq || undefined

    const faqsHalf = faq && Math.round((faq.length) / 2)

    const contactData = useSelector((state: RootState) => state?.contact?.contactData)

    const renderIcon = (iconName: string) => ColouredIconsMap[iconName] || null;

    const [activeKey, setActiveKey] = useState<string | string[] | undefined>(undefined);

    const handleChange = (key: string | string[]) => {
        setActiveKey(prevKey => (prevKey === key ? undefined : key));
    };

    const fetchFaq = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact-and-faq`);

            if (!response.ok) {
                throw new Error(`Failed to fetch faq`);
            }

            const data = await response.json();
            setFetchedData(data?.data)
        } catch (error) {
            console.error("Error fetching faq", error);
            setError("Failed to fetch please try again.")
        }
    };

    useEffect(() => {
        fetchFaq();
    }, [])

    return (fetchedData ?
        <div>
            <TopImg data={fetchedData?.topImg} />

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 my-10 sm:my-20 gap-4 sm:gap-8 w-[80%] mx-auto'>
                {contactData.map((item, index) => (
                    <div className='border rounded-lg flex flex-col gap-2 font-medium justify-center px-5 py-5 hover:bg-[#FE5200]/10 hover:border-[#FE5200]' key={index}>
                        {renderIcon(item.name)}
                        {item.label}
                    </div>
                ))}
            </div>


            <Heading headingData={{ head: "Contact Us", title: "Send us a Message" }} alingCenter />
            <div className='mx-auto w-full flex justify-center px-5'>
                <ContactForm />
            </div>

            <div className="p-[20px] md:px-[120px] md:py-[70px] bg-[#F8FAFB] h-full">

                <Heading headingData={{ head: "FAQ", title: "Frequently Asked Question" }} alingCenter />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                        {faq?.slice(0, faqsHalf).map((faq, index) => (
                            <Collapse
                                activeKey={activeKey}
                                key={index}
                                accordion
                                onChange={handleChange}
                                expandIconPosition="end"
                                prefixCls="custom-collapse"
                                items={[
                                    {
                                        key: index,
                                        label: (
                                            <span className="text-[18px] font-semibold">
                                                {index + 1}. {faq.question}
                                            </span>
                                        ),
                                        children: <div>
                                            <ul style={faq?.answer?.length > 1 ? { listStyleType: "disc", paddingLeft: "20px" } : {}}>
                                                {faq?.answer?.map((item, index) => (
                                                    <div key={index} className='flex flex-col'>
                                                        <li className="text-[14px] my-1 leading-[150%]">{item}</li>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                    },
                                ]}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        {faq?.slice(faqsHalf, faq.length).map((faq, index) => (
                            <Collapse
                                activeKey={activeKey}
                                key={index}
                                onChange={handleChange}
                                accordion
                                expandIconPosition="end"
                                prefixCls="custom-collapse"
                                items={[
                                    {
                                        key: index + (faqsHalf ?? 0) + 1,
                                        label: (
                                            <span className="text-[18px] font-semibold">
                                                {index + 1 + (faqsHalf ?? 0)}. {faq.question}
                                            </span>
                                        ),
                                        children: <div>
                                            <ul style={faq?.answer.length > 1 ? { listStyleType: "disc", paddingLeft: "20px" } : {}}>
                                                {faq?.answer.map((item, index) => (
                                                    <div key={index} className='flex flex-col'>
                                                        <li className="text-[14px] text-gray-600 leading-[150%]">{item}</li>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                    },
                                ]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        :
        error ? <div className='h-[calc(100vh-100px)] flex items-center justify-center font-semibold text-xl text-center'>{error}</div> 
        : <Loader />
    )
}
