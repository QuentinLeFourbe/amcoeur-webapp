export type BlockType = 'title' | 'text' | 'image';

export interface TitleBlock {
  type: 'title';
  content: string;
}

export interface TextBlock {
  type: 'text';
  markdown: string;
}

export interface ImageBlock {
  type: 'image';
  layout: 'single' | 'duo' | 'trio';
  images: {
    url: string;
    alt?: string;
  }[];
}

export type EmailBlock = TitleBlock | TextBlock | ImageBlock;

export interface EmailPayload {
  subject: string;
  blocks: EmailBlock[];
}
