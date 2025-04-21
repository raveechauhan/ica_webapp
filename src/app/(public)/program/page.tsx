"use client"

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import TopImg from '@/app/modules/innerpages/TopImg'
import BestTraining from '@/app/modules/innerpages/BestTraining'
import ProgramBrief from '@/app/modules/innerpages/ProgramBrief'
import ProgramDescription from '@/app/modules/innerpages/ProgramDescription'
import Testimonial from '@/app/modules/home/Testimonial'
import Contact from '@/app/modules/home/Contact'
import RelatedPrograms from '@/app/modules/innerpages/RelatedPrograms'
import { useRouter } from 'next/navigation'
import { updateCourseData } from '@/store/slices/courseDataSlice'
import { ProgramViewProp, TestimonialProp } from '@/utils/interface/interface'
import { updateProgramDetails } from '@/store/slices/programDetailsSlice'
import Loader from '@/app/components/Loader'

export default function Program() {

  const dispatch = useDispatch();

  const router = useRouter();

  const program: string | null = useSelector((state: RootState) => state.programType.program)
  const testimonials = useSelector((state: RootState) => state?.testimonials?.testimonials)
  const programs = useSelector((state: RootState) => state?.programDetails?.allProgramDetails)

  const filteredTestimonials:TestimonialProp[] | undefined = testimonials?.filter(item => item.programType == program)

  useEffect(() => {
    if (!programs?.length) {
      const fetchprograms = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/programs?populate=program`);
  
          if (!response.ok) {
            throw new Error(`Failed to fetch programs`);
          }
  
          const data = await response.json();
          dispatch(updateProgramDetails(data?.data));
        } catch (error) {
          console.error("Error fetching programs", error);
        }
      };
  
      fetchprograms();
    }
  }, [dispatch, programs?.length]);
  

  const findProgram: ProgramViewProp | undefined = programs?.find(item => item.type === program)

  const durationClick = (duration: number) => {
    router.push("/program/program-details")
    dispatch(updateCourseData({ duration: duration, courseData: findProgram?.program?.find(item => item.duration == duration) || undefined }))
  }

  return ( findProgram ?
    <div>

      <TopImg data={findProgram?.topImg} />

      <BestTraining data={findProgram?.bestTraining} />

      <ProgramBrief data={findProgram?.programBrief} />

      <ProgramDescription data={findProgram?.programDescription} durationClick={durationClick} duration={findProgram?.duration} />

      <Testimonial testimonials={filteredTestimonials} />

      <Contact />

      <RelatedPrograms />

    </div>
    : <Loader />
  )
}
