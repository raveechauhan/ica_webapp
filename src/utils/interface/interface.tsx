
export type HeadingTypes = {
  id?: number;
  documentId?: string;
  head?: string;
  title?: string;
  type?: string;
  text?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  alingCenter?: boolean;
  text2?: string,
  text3?: string,
}

export type headingDataType = {
  headingData?: HeadingTypes[],
  type?: string
  error?: string
}

export type HeadingProp = {
  headingData?: HeadingTypes,
  contacts?: ContactProp,
  titleWhite?: boolean,
  alingCenter?: boolean,
  type?: string
}

export type ImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
};

export type ProgramsProp = {
  id: number;
  documentId: string;
  key: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  image: {
    url: string;
    width: number;
    height: number;
    formats: {
      thumbnail: ImageFormat;
      small: ImageFormat;
      medium: ImageFormat;
      large: ImageFormat;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  duration: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  description: string;
}

export type ProgramsSliceProp = {
  programsData?: ProgramsProp[];
}

export type WhyChooseUsDataProp = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ContactProp = {
  id: number;
  documentId: string;
  email: string;
  phone: string;
  whatsApp: string;
  location: string;
  facebook: string;
  instagram: string;
  linkedIn: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type SocialLink = {
  href: string;
  name: string;
};

export type ContactItem = {
  label: string;
  name: string;
};

export type programProp = {
  label: string;
  key: string;
  title?:string;
  className?: string;
}

export type ProgramDataProp = {
  availablePrograms?: programProp[];
}

export type InnerDataProp = {
  name: string;
  title: string;
  description: string;
}

export type ProgramDetailsTopProp = {
  label: string;
  value: string;
}

export type Topic = string;

export type Week = {
  title: string;
  topics: Topic[];
};

export type Module = {
  title: string;
  data: Week[];
};

export type Month = {
  title: string;
  data: Module[];
};

export type ProgramStructure = Month[];

export type ProgramDetailsProp = {
  createdAt: string;
  details: ProgramDetailsTopProp[];
  duration: number;
  id: number;
  publishedAt: string;
  type: string;
  updatedAt: string;
  modules: ProgramStructuredData[] ;
}

export type BestTrainingProp = {
    headingData: HeadingTypes;
    image: string;
}

export type ProgramDescriptionProp = {
  headingData: HeadingTypes;
  image: string;
  innerData: InnerDataProp[];
}

export type ProgramViewProp = {
  bestTraining: BestTrainingProp;
  programBrief: HeadingTypes;
  programDescription: ProgramDescriptionProp;
  topImg: {
    headingData: HeadingTypes;
    image: string;
  };
  program: ProgramDetailsProp[];
  duration: number[];
  documentId: string;
  type: string;
  createdAt: string;
  relatedPrograms: ProgramsProp[];
}

export type ProgramStructuredData = {
  title: string;
  weeks?: WeekData[]; 
  topics?: string[];
  data?: NestedData[];
};

type WeekData = {
  title: string;
  topics?: string[];
  data?: NestedData[];
};

type NestedData = {
  title: string;
  topics?: string[];
  data?: NestedData[]; 
};

export type AboutUsProp = {
  aboutImg1: ProgramsProp;
  aboutImg2: ProgramsProp;
  aboutImg3: ProgramsProp;
  aboutUs: HeadingTypes;
  galleryImg1: ProgramsProp;
  galleryImg2: ProgramsProp;
  galleryImg3: ProgramsProp;
  galleryImg4: ProgramsProp;
  updatedAt:string;
  topImg: {
    headingData: HeadingTypes;
    image: string;
  };
}

export type ImageDataProp = {
  galleryImg1: ProgramsProp;
  galleryImg2: ProgramsProp;
  galleryImg3: ProgramsProp;
  galleryImg4: ProgramsProp;
  galleryImg5: ProgramsProp;
}

export type FaqProp = {
  key: string;
  question: string[];
  answer: string[];
}

export type ContactPageProp = {
  faq: FaqProp[];
  topImg: {
    headingData: HeadingTypes;
    image: string;
  };
}

export type TestimonialProp = {
  image: ProgramsProp;
  name: string;
  programType: string;
  rating: number;
  review: string;
  role:  string;
  video: ProgramsProp;
}