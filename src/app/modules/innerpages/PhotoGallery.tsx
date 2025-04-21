import Heading from "@/app/components/Heading";
import { HeadingTypes, ImageDataProp } from "@/utils/interface/interface";
import Image from "next/image";

const PhotoGallery: React.FC<{headingData: HeadingTypes, imageData: ImageDataProp}> = ({ headingData, imageData }) => {
    return (
        <div className="pb-[50px] md:px-[120px] md:py-[70px] gap-[65px] w-fit">

            <Heading headingData={headingData} />

            <div className="flex flex-col items-center lg:flex-row gap-4 h-[490px]">
                <div className="w-[90%] lg:w-2/5">
                    <Image src={`${process.env.NEXT_PUBLIC_API_URL}${imageData?.galleryImg1?.url}`} width={imageData?.galleryImg1?.width} height={imageData?.galleryImg1?.height} alt="image" className="object-cover h-full rounded-[22px]" />
                </div>
                <div className="flex flex-col w-[90%] lg:w-3/5 h-full gap-4">
                    <div className="flex gap-4 h-1/2">
                        <Image src={`${process.env.NEXT_PUBLIC_API_URL}${imageData?.galleryImg2?.url}`} width={imageData?.galleryImg2?.width} height={imageData?.galleryImg2?.height} alt="image" className="object-cover w-1/2 rounded-[22px] overflow-hidden" />
                        <Image src={`${process.env.NEXT_PUBLIC_API_URL}${imageData?.galleryImg3?.url}`} width={imageData?.galleryImg3?.width} height={imageData?.galleryImg3?.height} alt="image" className="object-cover w-1/2 rounded-[22px] overflow-hidden" />
                    </div>
                    <div className="flex gap-4 h-1/2">
                        <Image src={`${process.env.NEXT_PUBLIC_API_URL}${imageData?.galleryImg4?.url}`} width={imageData?.galleryImg4?.width} height={imageData?.galleryImg4?.height} alt="image" className="object-cover w-1/2 rounded-[22px] overflow-hidden" />
                        <Image src={`${process.env.NEXT_PUBLIC_API_URL}${imageData?.galleryImg5?.url}`} width={imageData?.galleryImg5?.width} height={imageData?.galleryImg5?.height} alt="image" className="object-cover w-1/2 rounded-[22px] overflow-hidden" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PhotoGallery