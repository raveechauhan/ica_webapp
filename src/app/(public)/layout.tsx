"use client"

import React, { useEffect } from 'react'
import SubHeader from '../components/SubHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { updatePrograms } from '@/store/slices/programsSlice';
import { updateHeadings, updateHeadingsError } from '@/store/slices/headingSlice';
import { updateContactList } from '@/store/slices/contactSlice';
import { updateTestimonials } from '@/store/slices/testimonialsSlice';
import { updateAvailablePrograms } from '@/store/slices/availableProgramsSlice';
import { programProp, ProgramsProp } from '@/utils/interface/interface';

interface PublicLayoutProps {
    children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {

    const dispatch = useDispatch()

    const fetchPrograms = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/explore-programs-datas?populate=*`);

            if (!response.ok) {
                throw new Error(`Failed to fetch explore data`);
            }

            const data = await response.json();
            dispatch(updatePrograms({ programsData: data?.data }))

            const availaiblePrograms: programProp[] = data?.data?.map((item: ProgramsProp) => ({ label: item?.title, key: item?.key }));
            dispatch(updateAvailablePrograms(availaiblePrograms))

        }
        catch (error) {
            console.error("Error fetching Programs", error);
        }
    }

    const fetchHeaders = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/headings`);

            if (!response.ok) {
                throw new Error(`Failed to fetch headers: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            dispatch(updateHeadings({ headingData: data?.data }))
        } catch (error) {
            console.error("Error fetching headers:", error);
            dispatch(updateHeadingsError({ error: "Failed to fetch please try again." }))
        }
    };

    const fetchContacts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`);

            if (!response.ok) {
                throw new Error(`Failed to fetch contacts ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            const socialData = [
                { name: "facebook", href: data.data[0].facebook },
                { name: "instagram", href: data?.data[0].instagram },
                { name: "linkedIn", href: data?.data[0].linkedIn }
            ]

            const contactData = [
                { name: "phone", label: data?.data[0].phone },
                { name: "whatsApp", label: data?.data[0].whatsApp },
                { name: "email", label: data?.data[0].email },
                { name: "location", label: data?.data[0].location }
            ]

            dispatch(updateContactList({ socialLinks: socialData, contactData: contactData }))
        }
        catch (error) {
            console.error("Error fetching headers:", error);
        }
    }

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials?populate=*`);

            if (!response.ok) {
                throw new Error(`Failed to fetch headers: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            dispatch(updateTestimonials({ testimonials: data?.data }))
        }
        catch (error) {
            console.error("Error fetching testimonials", error);
        }
    }

    useEffect(() => {
        fetchPrograms();
        fetchHeaders();
        fetchContacts();
        fetchTestimonials();
    }, [])

    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <SubHeader />
            </div>

            <div>
                {children}
            </div>

            <div>
                <Footer />
            </div>

        </div>
    )
}

export default PublicLayout
