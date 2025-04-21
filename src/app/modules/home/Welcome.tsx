import Heading from "@/app/components/Heading";
import Image from "next/image";
import { PhoneIcon, DollarTicketIcon, PythonIcon, AppleIcon, PointerIcon, DashCircle } from "@/utils/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Rate } from "antd";
import { ProgramsProp, headingDataType } from "@/utils/interface/interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Welcome = () => {

  const phone = useSelector((state: RootState) => state?.contact?.contactData.find(item => item.name == "phone")?.label)

  const headingData = useSelector((state: RootState) => state?.headings?.headingData?.find((item: headingDataType) => item.type == "welcome"))

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) setIsVisible(true)
    else setIsVisible(false)
  }, [inView])

  return (
    <div ref={ref} className=" flex flex-col lg:pb-0 lg:flex-row justify-between w-full lg:min-h-[630px] xl:min-h-[700px] bg-[#F8FAFB] overflow-hidden">

      {/* Content Section */}
      <div className="flex justify-center flex-col w-full px-5 pt-8 md:px-14 md:pt-14 md:py-14 xl:px-[120px] gap-[40px] z-10">
        <div>
          <Heading headingData={headingData} />
        </div>
        <div className="flex lg:flex-col flex-col xl:flex-row justify-center items-center custom540:flex-row gap-[12px]">
          <button className="text-white bg-[#FE5200] w-full md:w-[50%] h-[56px] rounded-[10px] hover:bg-[#FE5200]/90 transition-colors">
            Request a call
          </button>

          <a href="tel:01724184200" className="border-black border md:w-[50%] w-full h-[56px] rounded-[10px] flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors">
            <PhoneIcon color="black" />
            {phone}
          </a>
        </div>
      </div>

      <div className="w-full flex justify-center h-[470px] custom540:h-[560px] sm:h-[610px] lg:h-[680px] relative" >
        <AnimationPoster isVisible={isVisible} />
      </div>

    </div>
  );
}

const AnimationPoster: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {

  const [girlPic, setGirlPic] = useState<ProgramsProp>()

  const fetchGirlPic = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/girl-pic?populate=*`);
    const data = await response.json();
    setGirlPic(data?.data?.girlPic)
  }

  useEffect(() => {
    fetchGirlPic();
  }, [])

  return (
    <div className=" flex justify-center scale-[0.55] custom540:scale-[0.65] sm:scale-75 md:scale-100 lg:scale-90 xl:scale-100 w-full">

      {/* Background Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.7, delay: 0 }}
        className="absolute top-48 lg:right-2 w-[660px] h-[660px] bg-[#FF962B] rounded-full z-10 flex items-center justify-center"
      >
        <motion.div initial={{ rotate: 0 }}
          animate={isVisible ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            duration: 30,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}><DashCircle />
        </motion.div>

      </motion.div>

      {/* Rotating Icons Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: isVisible ? 1 : 0 }}
        className="absolute xl:top-56 top-48 lg:right-[350px] z-10">
        {[PythonIcon, AppleIcon, DollarTicketIcon].map((Icon, index) => (
          <div
            key={index}
            className="absolute w-16 h-16"
            style={{
              animation: `orbit 10s linear infinite`,
              animationDelay: `${index * -7}s`,
            }}
          >
            <div
              className="relative w-16 h-16 rounded-[16px] bg-white shadow-lg flex items-center justify-center"
              style={{
                animation: `counter-orbit 10s linear infinite`,
                animationDelay: `${-index * 2}s`,
              }}
            >
              <Icon />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7, delay: isVisible ? 0.7 : 0 }}
        className="absolute top-6 xl:top-2 lg:top-12 lg:right-28 z-10 w-[480px]"
      >
        {girlPic &&
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${girlPic?.url}`}
            alt="Student"
            width={girlPic?.width}
            height={girlPic?.height}
          />
        }
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-[500px] xl:top-[550px] -left-24 sm:-left-20 md:left-4 lg:-left-28  z-[35] w-[250px] animate-float">
        <div className="p-[2px] bg-gradient-to-r from-[#FE5200]/70 to-white/10 rounded-[14px]">
          <div className="flex items-center gap-[8px] bg-white/70 p-[12px] rounded-[14px] shadow-md backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white">
              {girlPic &&
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${girlPic?.url}`}
                  alt="Profile picture"
                  className="object-cover"
                  width={girlPic?.width}
                  height={girlPic?.height}
                />
              }
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-2xl">Wade Warren</p>
              <p className="text-xs text-gray-500">Frontend Developer</p>
              <Rate defaultValue={5} className="text-sm" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: isVisible ? 1 : 0 }}
        className="absolute top-64 -right-24  sm:right-0 md:right-[40px] z-[35] w-[180px] animate-float-delayed">
        <div className="p-[2px] bg-gradient-to-r from-white/10 to-[#FE5200]/60 rounded-[14px]">
          <div className="flex flex-col items-center gap-[8px] bg-white/70 p-[12px] rounded-[14px] shadow-md backdrop-blur-sm">
            <p className="font-semibold text-gray-800 text-2xl">500+</p>
            <p className="text-xs text-gray-500 text-center">Students Who Achieved Great Success</p>
          </div>
        </div>
      </motion.div>

      {/* PointerIcon */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: isVisible ? 1 : 0 }} className="absolute top-48 hidden xl:block lg:right-[600px] z-[25]">
        <PointerIcon />
      </motion.div>
    </div>
  )
}

export default Welcome