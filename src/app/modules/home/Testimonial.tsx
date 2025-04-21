import Heading from '@/app/components/Heading';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Carousel, Rate } from 'antd';
import { headingDataType, TestimonialProp } from '@/utils/interface/interface';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { CarouselRef } from 'antd/es/carousel';
import { NoProfilePic } from '@/utils/icons';

const Testimonial: React.FC<{ testimonials: TestimonialProp[] | undefined }> = ({ testimonials }) => {
    const carouselRef = useRef<CarouselRef | null>(null);

    const [currentSlide, setCurrentSlide] = useState(0);

    const headingData = useSelector((state: RootState) => state?.headings?.headingData?.find((item: headingDataType) => item.type == "testimonial"))

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '40px',
        rtl: false,
        initialSlide: 0,
        autoplay: true,
        draggable: true,
        swipeToSlide: true,
        afterChange: (current: number) => setCurrentSlide(current),
        responsive: [
            {
                breakpoint: 1230,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '20px',
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '0px',
                },
            },
        ],
    };

    const isPrevDisabled = currentSlide === 0;
    const isNextDisabled = currentSlide >= (testimonials?.length || 1) - settings.slidesToShow + 2;

    return (
        (testimonials?.length ?? 0) > 0 &&
        <div className="overflow-hidden w-full h-full bg-[#fffaf1] px-5 pt-[30px] pb-[50px] md:px-[120px] md:py-[70px]">

            <div className='flex flex-col items-center justify-center w-full'>

                <div className=" flex flex-col gap-2 sm:gap-0 sm:flex-row w-full justify-between sm:items-center">
                    <Heading
                        headingData={headingData}
                    />

                    <div className="xl:flex justify-center gap-2 flex-end hidden ">
                        <button
                            disabled={isPrevDisabled}
                            onClick={() => carouselRef.current?.prev()}
                            className={`flex items-center gap-2 border-2 font-medium border-black py-[6px] px-[12px] rounded-[4px] ${isPrevDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                            <span className="text-[#FE5200]">{" < "}</span>Previous
                        </button>
                        <button
                            disabled={isNextDisabled}
                            onClick={() => carouselRef.current?.next()}
                            className={`flex items-center gap-2 border-2 font-medium border-black py-[6px] px-[12px] rounded-[4px] ${isNextDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                            Next<span className="text-[#FE5200]">{" > "}</span>
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div className="md:mt-16 mt-4 w-full mx-auto">
                    <Carousel ref={carouselRef} prefixCls='custom-dots' {...settings}>
                        {testimonials?.map((testimonial, index) => (
                            <div key={index} className="flex justify-center px-2">
                                <div className="bg-white p-4 flex flex-col gap-3 rounded-2xl min-h-[330px]">
                                    <div className="flex gap-3 items-center">
                                        <div className="rounded-full w-[60px] h-[60px] overflow-hidden">

                                            {testimonial?.image?.url ?
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_API_URL}${testimonial?.image?.url}`}
                                                    width={testimonial?.image?.width}
                                                    height={testimonial?.image?.height}
                                                    alt={testimonial.name}
                                                    className='w-full h-full object-cover' />
                                                : <NoProfilePic />
                                                }

                                        </div>
                                        <div className='flex flex-col'>
                                            <h3 className="text-2xl font-semibold">{testimonial.name}</h3>
                                            <p className="text-[#767676]">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <Rate defaultValue={testimonial.rating} disabled />
                                    <p className="text-gray-700">{testimonial.review}</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>

            </div>
        </div>
    );
};

export default Testimonial;
