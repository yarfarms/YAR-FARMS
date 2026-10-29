
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'rblhtcgx',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});

export type SanityGalleryImage = {
  _id: string;
  title: string;
  src: string;
  alt: string;
  category: string;
  order: number;
};

export async function fetchGalleryImages(): Promise<SanityGalleryImage[]> {
  return sanityClient.fetch(`
    *[_type == "galleryImage" && defined(image.asset)] | order(order asc) {
      _id,
      title,
      "src": image.asset->url,
      "alt": coalesce(alt, title),
      "category": coalesce(category, "Farm Views"),
      "order": coalesce(order, 0)
    }
  `);
}
