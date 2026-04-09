/**
 * Supported block types for the email builder.
 */
export type BlockType = 'title' | 'text' | 'image';

/**
 * Represents a title block in the email.
 */
export interface TitleBlock {
  /** The type identifier for the block */
  type: 'title';
  /** The text content of the title */
  content: string;
}

/**
 * Represents a rich text block supporting Markdown.
 */
export interface TextBlock {
  /** The type identifier for the block */
  type: 'text';
  /** The Markdown content of the block */
  markdown: string;
}

/**
 * Represents an image block that can contain up to 3 images.
 */
export interface ImageBlock {
  /** The type identifier for the block */
  type: 'image';
  /** The layout configuration for the images */
  layout: 'single' | 'duo' | 'trio';
  /** The list of images to display in this block */
  images: {
    /** The absolute URL of the image */
    url: string;
    /** Optional alternative text for accessibility */
    alt?: string;
    /** Optional maximum height of the image in pixels */
    maxHeight?: number;
    /** Optional caption text displayed below the image */
    caption?: string;
  }[];
}

/**
 * Union type representing any possible email block.
 */
export type EmailBlock = TitleBlock | TextBlock | ImageBlock;

/**
 * The complete data structure for an email campaign.
 */
export interface EmailPayload {
  /** The email subject line */
  subject: string;
  /** An ordered array of blocks composing the email body */
  blocks: EmailBlock[];
}
