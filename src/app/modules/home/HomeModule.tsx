import React from 'react'
import Welcome from './Welcome'
import WhyChooseUs from './WhyChooseUs'
import ExplorePrograms from './ExplorePrograms'
import SuccessCount from './SuccessCount'
import OurApproach from './OurApproach'
import Testimonial from './Testimonial'
import Contact from './Contact'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Loader from '@/app/components/Loader'

export default function HomeModule() {

  const testimonials = useSelector((state: RootState) => state?.testimonials?.testimonials)
  const headings = useSelector((state: RootState) => state?.headings?.headingData)
  const headingsError = useSelector((state: RootState) => state?.headings?.error)

  return ( headings ?
    <div>

      <Welcome />

      <WhyChooseUs />

      <ExplorePrograms />

      <SuccessCount />

      <OurApproach />

      <Testimonial testimonials={testimonials} />

      <Contact />

    </div> 
    : headingsError ? 
    <div className='h-[calc(100vh-100px)] flex items-center justify-center font-semibold text-xl text-center'>{headingsError}</div>
     : <Loader />
  )
}
