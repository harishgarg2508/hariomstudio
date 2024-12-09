export interface GalleryItem {
    id: number;
    type: 'image' | 'video';
    url: string;
    title: string;
    description: string;
    category: string;
  }