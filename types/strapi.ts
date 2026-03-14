export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiImage;
    small?: StrapiImage;
    medium?: StrapiImage;
    large?: StrapiImage;
  };
}

export interface HeroImage {
  id: number;
  documentId: string;
  heroImage?: StrapiImage | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface RecentUpdate {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  data: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Leadership {
  id: number;
  documentId: string;
  designation: string;
  name: string;
  image?: StrapiImage | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Gallery {
  id: number;
  documentId: string;
  event: string;
  images?: StrapiImage[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface UnionAndTownMember {
  id: number;
  documentId: string;
  name: string;
  representative?: string | null;
  type?: string | null;
  bio?: string | null;
  image?: StrapiImage | null;
  locale?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface TestUnionAchievement {
  id: number;
  documentId: string;
  title?: string;
  description?: string;
  serviceType?: string;
  slogans?: string;
  data?: string;
  photos?: StrapiImage[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Page {
  id: number;
  documentId: string;
  slug: string;
  title_en?: string;
  title_ta?: string;
  blocks?: PageBlock[];
}

export type PageBlock =
  | BlockHero
  | BlockNews
  | BlockLeader
  | BlockMedia
  | BlockAnnouncement
  | BlockStats
  | BlockCTA;

export interface BlockHero {
  __component: "blocks.hero";
  headline_en?: string;
  headline_ta?: string;
  subheadline?: string;
  ctaUrl?: string;
  ctaLabel?: string;
  image?: StrapiImage;
}

export interface BlockNews {
  __component: "blocks.news";
  category?: string;
  items?: NewsItem[];
}

export interface BlockLeader {
  __component: "blocks.leader";
  title?: string;
  excerpt?: string;
  image?: StrapiImage;
  link?: string;
}

export interface BlockMedia {
  __component: "blocks.media";
  images?: StrapiImage[];
}

export interface BlockAnnouncement {
  __component: "blocks.announcement";
  title?: string;
  body?: string;
  type?: "banner" | "card";
}

export interface BlockStats {
  __component: "blocks.stats";
  stats?: { label: string; value: string }[];
}

export interface BlockCTA {
  __component: "blocks.cta";
  headline?: string;
  subheadline?: string;
  ctaUrl?: string;
  ctaLabel?: string;
}

export interface NewsItem {
  id: number;
  documentId: string;
  title?: string;
  excerpt?: string;
  date?: string;
  link?: string;
  category?: string;
}

export interface OfficeBearer {
  id: number;
  documentId: string;
  name: string;
  designation?: string;
  district?: string;
  image?: StrapiImage;
  order?: number;
}

export interface Committee {
  id: number;
  documentId: string;
  name_en?: string;
  name_ta?: string;
  members?: CommitteeMember[];
  order?: number;
}

export interface CommitteeMember {
  id: number;
  person?: string;
  role: string;
}

export interface ElectedRepresentative {
  id: number;
  documentId: string;
  name: string;
  constituency?: string;
  house?: "Assembly" | "Lok Sabha" | "Rajya Sabha";
  designation?: string;
  image?: StrapiImage;
  order?: number;
}

export interface Frontal {
  id: number;
  documentId: string;
  name_en?: string;
  name_ta?: string;
  description?: string;
  link?: string;
  image?: StrapiImage;
  order?: number;
}

export interface OrganizationContentItem {
  id: number;
  title_en?: string;
  title_ta?: string;
  description_en?: string;
  description_ta?: string;
  image?: StrapiImage;
}

export interface OrganizationRepresentative {
  id: number;
  name?: string;
  designation?: string;
  place?: string;
  image?: StrapiImage;
}

export interface OrganizationUnit {
  id: number;
  documentId: string;
  slug: string;
  name_en?: string;
  name_ta?: string;
  type?: "union" | "town";
  coverImage?: StrapiImage;
  representatives?: OrganizationRepresentative[];
  events?: OrganizationContentItem[];
  achievements?: OrganizationContentItem[];
  order?: number;
}
