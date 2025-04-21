import { FacebookIcon, InstaIcon, LinkedInIcon, LocationIcon, MailIcon, PhoneIcon, WhatsappIcon } from '@/utils/icons'
import { ReactNode } from 'react';

export const iconsMap: Record<string, ReactNode> = {
    "facebook": <FacebookIcon />,
    "linkedIn": <LinkedInIcon />,
    "instagram": <InstaIcon />,
    "phone": <PhoneIcon />,
    "whatsApp": <WhatsappIcon />,
    "email": <MailIcon />,
    "location": <LocationIcon />,
};

export const ColouredIconsMap: Record<string, ReactNode> = {
    "facebook": <FacebookIcon color='#FE5200' />,
    "linkedIn": <LinkedInIcon color='#FE5200' />,
    "instagram": <InstaIcon color='#FE5200' />,
    "phone": <PhoneIcon color='#FE5200' />,
    "whatsApp": <WhatsappIcon color='#FE5200' />,
    "email": <MailIcon color='#FE5200' />,
    "location": <LocationIcon color='#FE5200' />,
};