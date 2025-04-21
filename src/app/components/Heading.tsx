import { HeadingProp } from '@/utils/interface/interface';
import React from 'react';

const Dots: React.FC<{ reverse?: boolean; }> = ({ reverse }) => {

    const dotSizes = ["w-[2px] h-[2px]", "w-[4px] h-[4px]", "w-[6px] h-[6px]", "w-[8px] h-[8px]"]
    const orderedDots = reverse ? [...dotSizes].reverse() : dotSizes

    return (
        <div className="flex justify-center items-center gap-[2px] px-2">
            {orderedDots.map((size, index) => (
                <div key={index} className={`${size} bg-[#FE5200] rounded-full`}></div>
            ))}
        </div>
    );
};

const Heading: React.FC<HeadingProp> = ({ headingData, titleWhite, alingCenter }) => {
    return (
        <div
            className={`flex flex-col gap-[10px] ${headingData?.alingCenter || alingCenter ? "items-center" : "items-start"}`}>
            <div className="flex items-center justify-center gap-[2px]">
                <Dots />

                <div className="text-[#FE5200] text-center font-semibold text-[18px] mx-[4px] leading-[21px]">
                    {headingData?.head}
                </div>

                <div className='flex flex-row-reverse items-center justify-center gap-[2px]'><Dots reverse /></div>
            </div>

            <div className={`font-semibold md:text-[56px] text-[32px] leading-10 md:leading-[57px] ${headingData?.alingCenter || alingCenter ? "text-center" : ""}  ${titleWhite ? "text-white" : "text-black"}`}>{headingData?.title}</div>
            <div className={`leading-[24px] mt-4 ${headingData?.alingCenter || alingCenter ? "text-center" : "text-left"}  `}>{headingData?.text}</div>
            <div className={`leading-[24px] ${headingData?.alingCenter || alingCenter ? "text-center" : "text-left"}  `}>{headingData?.text2}</div>
            <div className={`leading-[24px] ${headingData?.alingCenter || alingCenter ? "text-center" : "text-left"}  `}>{headingData?.text3}</div>
        </div>
    );
};

export default Heading;
