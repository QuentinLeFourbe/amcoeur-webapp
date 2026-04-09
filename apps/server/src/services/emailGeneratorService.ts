import { EmailPayload, renderEmailHtml, renderEmailText } from "@amcoeur/email-builder";
import { EmailBlock, EmailBlockType } from "@amcoeur/types";

/**
 * Service responsible for generating HTML and Text versions of emails 
 * using the shared @amcoeur/email-builder library.
 */

/**
 * Generates the HTML content for an email campaign.
 * 
 * @param blocks - The array of email blocks to render
 * @param subject - The subject of the email (used for preview text)
 * @param baseUrl - Optional base URL for images and assets
 * @param unsubscriptionUrl - Optional custom unsubscription URL
 * @param contactEmail - Optional custom contact email
 * @returns A promise resolving to the final HTML string
 */
export const generateEmailHtml = async (
  blocks: EmailBlock[], 
  subject: string,
  baseUrl?: string,
  unsubscriptionUrl?: string,
  contactEmail?: string
): Promise<string> => {
  // Map @amcoeur/types blocks to @amcoeur/email-builder blocks if necessary
  const payload: EmailPayload = {
    subject,
    blocks: blocks.map((block) => {
      switch (block.type) {
        case EmailBlockType.TITLE:
          return { type: 'title', content: block.content };
        case EmailBlockType.TEXT:
          return { type: 'text', markdown: block.content };
        case EmailBlockType.IMAGE:
          return {
            type: 'image',
            layout: block.images.length === 1 ? 'single' : block.images.length === 2 ? 'duo' : 'trio',
            images: block.images.map(img => ({
              url: img.url || '',
              alt: img.caption || '',
              maxHeight: img.maxHeight,
              caption: img.caption
            }))
          };
        default:
          return { type: 'title', content: '' };
      }
    }) as EmailPayload['blocks']
  };

  return renderEmailHtml(payload, baseUrl, unsubscriptionUrl, contactEmail);
};

/**
 * Generates the plain text version of an email campaign.
 * 
 * @param blocks - The array of email blocks to render
 * @param subject - The subject of the email
 * @param unsubscriptionUrl - Optional custom unsubscription URL
 * @param contactEmail - Optional custom contact email
 * @returns A promise resolving to the plain text string
 */
export const generateEmailText = async (
  blocks: EmailBlock[],
  subject: string,
  unsubscriptionUrl?: string,
  contactEmail?: string
): Promise<string> => {
  const payload: EmailPayload = {
    subject,
    blocks: blocks.map((block) => {
      switch (block.type) {
        case EmailBlockType.TITLE:
          return { type: 'title', content: block.content };
        case EmailBlockType.TEXT:
          return { type: 'text', markdown: block.content };
        case EmailBlockType.IMAGE:
          return {
            type: 'image',
            layout: 'single',
            images: block.images.map(img => ({ url: img.url || '' }))
          };
        default:
          return { type: 'title', content: '' };
      }
    }) as EmailPayload['blocks']
  };

  return renderEmailText(payload, undefined, unsubscriptionUrl, contactEmail);
};
