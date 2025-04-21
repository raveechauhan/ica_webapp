"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Heading from '@/app/components/Heading'
import WhyChooseUs from '@/app/modules/home/WhyChooseUs'
import SuccessCount from '@/app/modules/home/SuccessCount'
import Testimonial from '@/app/modules/home/Testimonial'
import OurApproach from '@/app/modules/home/OurApproach'
import PhotoGallery from '@/app/modules/innerpages/PhotoGallery'
import TopImg from '@/app/modules/innerpages/TopImg'
import { AboutUsProp } from '@/utils/interface/interface'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Loader from '@/app/components/Loader'

function About() {

    const [about, setAbout] = useState<AboutUsProp | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)

    const testimonials = useSelector((state: RootState) => state?.testimonials?.testimonials)

    const fetchAbout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about?populate=*`);

            if (!response.ok) {
                throw new Error(`Failed to fetch programs`);
            }

            const data = await response.json();
            setAbout(data?.data)
        } catch (error) {
            console.error("Error fetching programs", error);
            setError("Failed to fetch please try again.")
        }
    };

    useEffect(() => {
        fetchAbout();
    }, [])

    return ( about ? 
        <div>
            {about?.topImg &&
                <TopImg
                    data={about?.topImg}
                />
            }
            <div className='flex flex-col lg:flex-row px-5 pt-[30px] pb-[50px] md:px-[120px] md:py-[70px] gap-[65px]'>
                <div className='w-full lg:w-1/2 flex gap-2 sm:gap-4'>
                    {about?.aboutImg1 && about?.aboutImg2 && about?.aboutImg3 &&
                        <>
                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${about?.aboutImg1?.url}`} width={about?.aboutImg1?.width} height={about?.aboutImg1?.height} alt='img1' className='w-[30%] rounded-[22px] mt-6 object-cover' />
                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${about?.aboutImg2?.url}`} width={about?.aboutImg2?.width} height={about?.aboutImg2?.height} alt='img2' className='w-[40%] rounded-[22px] object-cover mb-8' />
                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${about?.aboutImg3?.url}`} width={about?.aboutImg3?.width} height={about?.aboutImg3?.height} alt='img3' className='w-[30%] rounded-[22px] mt-6 object-cover' />
                        </>
                    }
                </div>
                <div className='w-full lg:w-1/2'>
                    <Heading
                        headingData={about?.aboutUs}
                    />
                </div>
            </div>

            <WhyChooseUs />

            <SuccessCount />

            <Testimonial testimonials={testimonials} />

            {about?.galleryImg1 && about?.galleryImg2 && about?.galleryImg3 && about?.galleryImg4 &&
                <PhotoGallery
                    imageData={{ galleryImg1: about?.galleryImg1, galleryImg2: about?.galleryImg2, galleryImg3: about?.galleryImg3, galleryImg4: about?.galleryImg4, galleryImg5: about?.aboutImg2 }}
                    headingData={{
                        head: "Gallery",
                        title: "Photo Gallery",
                        alingCenter: true
                    }} />
            }

            <div className='mt-0 sm:mt-96 md:mt-56 lg:mt-0'>
                <OurApproach />
            </div>
        </div>
        : 
        error ? <div className='h-[calc(100vh-100px)] flex items-center justify-center font-semibold text-xl text-center'>{error}</div> 
        : <Loader />
    )
}

export default About