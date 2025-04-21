'use client'

import Heading from '@/app/components/Heading'
import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Row, Col, message } from "antd"
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { headingDataType } from '@/utils/interface/interface'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { iconsMap } from '@/utils/constants'
import axios from 'axios'

type FormProps = {
  name: string,
  label: string,
  placeholder: string,
  type?: string
}

type FormValues = {
  city?: string
  description?: string
  email?: string
  fullName?: string
  phone?: string
  program?: string
}

const formFields: FormProps[] = [
  {
    name: "fullName",
    label: "Your Name",
    placeholder: "Enter full name",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter city",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter phone number",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter email address",
  },
  {
    name: "program",
    label: "Select Program",
    placeholder: "--Select Option--",
    type: "select"
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Write a text here....",
    type: "textarea"
  },
];

export const ContactForm = ({ span = 12 }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [submissionState, setSubmissionState] = useState<string>("Send Message")

  const [form] = Form.useForm();

  const availablePrograms = useSelector((state:RootState) => state.availablePrograms.availablePrograms)

  const formattedPrograms = availablePrograms?.map(item => ({...item, value: item.label}))

  const handleSubmit = async (values: FormValues) => {
    setLoading(true)
    setSubmissionState("Sending...")
    try {
      await axios.post("/api/contacts", values);
      // message.success("Form submitted successfully!");
      setLoading(false)
    setSubmissionState("Sent")
      console.log("submitted")
    } catch (error) {
      setLoading(false)
    setSubmissionState("Try Again")
      message.error("Submission failed. Please try again.");
      console.error("Brevo Error:", error);
    }
  };
  
  const getRules = (name: string, label: string) => {
    const baseRule = { required: true, message: `Please enter ${label}` };
    if (name === 'fullName') {
      return [
        baseRule,
        { pattern: /^[A-Za-z\s]+$/, message: 'Name should only contain letters and spaces' }
      ];
    }
    if (name === 'city') {
      return [
        baseRule,
        { pattern: /^[A-Za-z\s]+$/, message: 'City should only contain letters and spaces' }
      ];
    }
    if (name === 'phone') {
      return [
        baseRule,
        { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }
      ];
    }
    if (name === 'email') {
      return [
        baseRule,
        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' }
      ];
    }
    return [baseRule];
  };

  return (
    <div className={`${span == 24 ? "" : "md:w-3/5 lg:px-16 md:px-5"} w-full flex items-center justify-center`}>
      <Form colon={false} requiredMark={false} form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[16, 0]}>
          {formFields.map(({ name, label, placeholder, type }, index) => (
            <Col key={index} xs={24} sm={index < 4 ? span : 24}>
              <Form.Item
                name={name}
                label={<div className='text-[16px]'>{label}</div>}
                className='font-medium'
                rules={getRules(name, label)}
                help={undefined}
              >
                {type === "select" ? (
                  <Select 
                  maxTagCount={1} 
                  options={formattedPrograms}
                  className='h-12' 
                  placeholder={placeholder}>
                  </Select>
                ) : type === "textarea" ? (
                  <Input.TextArea placeholder={placeholder} rows={5} className='font-normal' />
                ) : (
                  <Input className='h-12 font-normal' placeholder={placeholder} />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item className='flex w-full justify-end'>
          <button type='submit' className='flex items-center justify-center w-40 py-2 bg-[#FE5200] hover:bg-[#FE5200]/90 text-white rounded-lg whitespace-nowrap' disabled={loading}>
           {submissionState}
          </button>
        </Form.Item>
      </Form>
    </div>
  )
}

const Contact = () => {

  const socialLinks = useSelector((state: RootState) => state?.contact?.socialLinks)
  const contactData = useSelector((state: RootState) => state?.contact?.contactData)

  const headingData = useSelector((state: RootState) => state?.headings?.headingData?.find((item: headingDataType) => item.type == "contact"))

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) setIsVisible(true)
    else setIsVisible(false)
  }, [inView])

  const renderIcon = (iconName: string) => iconsMap[iconName] || null;

  return (
    <div className=' p-5  md:px-[120px] md:py-[70px] flex flex-col gap-[30px] md:gap-[50px] bg-[#f1efefd8] '>

      <Heading headingData={headingData} />

      <div className='bg-white w-full rounded-[8px] md:p-4 p-2 flex flex-col md:flex-row gap-6'>
        <div className='md:w-2/5 w-full md:h-[620px] h-[520px] bg-[#FE5200] rounded-[10px] rounded-br-none relative overflow-hidden text-white p-[16px]'>
          <div className='flex h-full flex-col justify-between'>

            <div className='flex flex-col gap-4 sm:gap-10'>

              <div>
                <div className='font-semibold text-[32px]'>Contact Information</div>
                <p>Contact us for any inquiries—we&apos;re here to help!</p>
              </div>

              <div className='flex flex-col gap-3 sm:gap-6 z-20 overflow-x-clip'>
                {contactData.map((item, index) => (
                  <div key={index} className=' flex gap-[12px] items-center'>
                    <div className='w-[24px] h-[24px]'>{renderIcon(item.name)}</div>
                    <span className={`${item.name == "email" && "break-all" }`}>{item.label}</span> 
                  </div>
                ))}
              </div>

            </div>

            <div ref={ref} className='flex gap-3 z-20'>
              {socialLinks.map((item, index) => (
                <Link href={item?.href + ""} target='_blank' key={index} className='w-12 h-12 flex items-center justify-center rounded-full bg-white hover:invert transform duration-300'>
                  {renderIcon(item.name)}
                </Link>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ y: 50, x: 50 }}
            animate={isVisible ? { y: 0, x: 0 } : { y: 50, x: 50 }}
            transition={{ duration: 0.7 }}
            className='z-10 absolute -bottom-[100px] -right-[100px] h-[270px] w-[270px] bg-[#FF962B] rounded-full'>
          </motion.div>
          <motion.div
            initial={{ y: 110, x: 110 }}
            animate={isVisible ? { y: 0, x: 0 } : { y: 110, x: 110 }}
            transition={{ duration: 0.7 }}
            className='z-0 absolute bottom-[50px] right-[50px] h-[160px] w-[160px] bg-[#FF7415] rounded-full'>
          </motion.div>
        </div>

        <ContactForm />

      </div>
    </div>
  )
}

export default Contact