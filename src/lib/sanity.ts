import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'rblhtcgx',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});

export type SanityGalleryImage = {
  _id: string;
  src: string;
  alt: string;
  category: string;
  order: number;
};
