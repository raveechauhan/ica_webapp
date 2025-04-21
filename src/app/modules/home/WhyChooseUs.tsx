import Heading from "@/app/components/Heading";
import {
  CertificationsIcon,
  ExpertTrainersIcon,
  FlexibleDeliveryIcon,
  HandsOnLearningIcon,
  CurvedLine,
} from "@/utils/icons";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { headingDataType, WhyChooseUsDataProp } from "@/utils/interface/interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type FeatureProps = {
  title?: string;
  description?: string;
  bgColor: string;
  position: string;
  icon: React.ReactNode;
};

let features: FeatureProps[] = [
  {
    bgColor: "bg-[#FFE9FF]",
    icon: <ExpertTrainersIcon />,
    position: "-top-5 -left-28",
  },
  {
    bgColor: "bg-[#DCDCFF]",
    icon: <FlexibleDeliveryIcon />,
    position: "top-[55px] left-[140px]",
  },
  {
    bgColor: "bg-[#FFD1CE]",
    icon: <HandsOnLearningIcon />,
    position: "-top-5 left-96",
  },
  {
    bgColor: "bg-[#DFFFE0]",
    icon: <CertificationsIcon />,
    position: "top-[55px] -right-28",
  },
];

const WhyChooseUs = () => {

  const [data, setData] = useState<WhyChooseUsDataProp[]>([]);

  const headingData = useSelector((state: RootState) => state?.headings?.headingData?.find((item: headingDataType) => item.type == "whyChooseUs"));

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/why-choose-us-datas`);

      if (!response.ok) {
        throw new Error(`Failed to fetch choose is${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setData(data?.data);
    }
    catch (error) {
      console.error("Error fetching headers:", error);
    }
  }

  features = features?.map((item, index) => {
    return {
      ...item, title: data[index]?.title, description: data[index]?.description
    }
  });

  useEffect(() => {
    fetchData();
  }, [])

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(inView);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="md:p-[70px] p-[20px] h-full flex flex-col gap-6 lg:gap-[70px] items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1 }}
    >
      <Heading
        headingData={headingData}
      />

      {/* large */}
      <motion.div
        className="relative hidden lg:block h-[260px] transform xl:!scale-110"
        initial={{ scale: 0.9 }}
        animate={isVisible ? { scale: 1 } : { scale: 0.9 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CurvedLine />
        {features?.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute gap-[20px] w-[260px] flex flex-col justify-center items-center ${item.position}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
          >
            <motion.div
              className={`flex items-center justify-center w-[70px] h-[70px] rounded-full ${item.bgColor}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
            >
              {/* {item.icon} */}
              {item.icon}
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.7 + index * 0.2 }}
            >
              <div className="text-[24px] font-semibold">{item.title}</div>
              <div className="text-[14px]">{item.description}</div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* small*/}
      <motion.div
        className="flex flex-col items-center gap-6 lg:hidden w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {features?.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
          >
            <motion.div
              className={`flex items-center justify-center w-[70px] h-[70px] rounded-full ${item.bgColor}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.icon}

            </motion.div>
            <div>
              <div className="text-[24px] font-semibold">{item.title}</div>
              <div className="text-[14px]">{item.description}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default WhyChooseUs