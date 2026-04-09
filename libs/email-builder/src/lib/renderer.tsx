import * as React from 'react';
import { EmailLayout } from './blocks/EmailLayout';
import { BlockTitle } from './blocks/BlockTitle';
import { BlockText } from './blocks/BlockText';
import { BlockImage } from './blocks/BlockImage';
import { EmailPayload } from './types';

// On utilise un import dynamique ou un require conditionnel pour éviter de charger @react-email/render dans le navigateur
// car il dépend de modules Node.js (fs, path, etc.) via la librairie 'juice'.
let renderFn: any = null;

async function getRenderFn() {
  if (renderFn) return renderFn;
  
  if (typeof window === 'undefined') {
    // Node.js environment
    try {
      const { render } = await import('@react-email/render');
      renderFn = render;
    } catch (err) {
      console.error('Failed to load @react-email/render. Make sure it is installed and accessible in the runtime environment.', err);
      throw new Error('Server-side email rendering is unavailable: @react-email/render could not be loaded.');
    }
  } else {
    // Browser environment - we don't have a perfect equivalent of 'render' (with CSS inlining)
    // but we can use a placeholder or the raw React tree.
    // For now, we return a function that just says it's not supported or returns null.
    renderFn = () => {
      throw new Error('renderEmailHtml is not directly supported in the browser due to Node.js dependencies. Use EmailRenderer component directly.');
    };
  }
  return renderFn;
}

/**
 * Properties for the EmailRenderer component.
 */
interface EmailRendererProps {
  /** The email data structure to render */
  payload: EmailPayload;
  /** Optional base URL for images (e.g., association website or API root) */
  baseUrl?: string;
  /** Optional unsubscribe URL for the footer */
  unsubscriptionUrl?: string;
  /** Optional contact email for the footer */
  contactEmail?: string;
}

/**
 * A React component that renders the complete email structure based on a JSON payload.
 * Safe for use in both browser (backoffice previews) and server-side rendering.
 */
export const EmailRenderer = ({ payload, baseUrl, unsubscriptionUrl, contactEmail }: EmailRendererProps) => {
  return (
    <EmailLayout 
      previewText={payload.subject} 
      baseUrl={baseUrl} 
      unsubscriptionUrl={unsubscriptionUrl} 
      contactEmail={contactEmail}
    >
      {payload.blocks.map((block, index) => {
        switch (block.type) {
          case 'title':
            return <BlockTitle key={index} {...block} />;
          case 'text':
            return <BlockText key={index} {...block} />;
          case 'image':
            return <BlockImage key={index} {...block} />;
          default:
            return null;
        }
      })}
    </EmailLayout>
  );
};

/**
 * Generates the final HTML string for an email.
 * 
 * @param payload - The email data to render
 * @param baseUrl - Optional base URL for images and links
 * @param unsubscriptionUrl - Optional unsubscribe URL
 * @param contactEmail - Optional contact email
 * @returns A promise resolving to the final HTML string
 * 
 * @remarks
 * This function should only be called on the server (Node.js). 
 * It uses `@react-email/render` which depends on Node.js-only features (like CSS inlining).
 * In the browser, use the `EmailRenderer` component directly within an iframe or portal.
 */
export const renderEmailHtml = async (
  payload: EmailPayload, 
  baseUrl?: string,
  unsubscriptionUrl?: string,
  contactEmail?: string
) => {
  const render = await getRenderFn();
  return render(
    <EmailRenderer 
      payload={payload} 
      baseUrl={baseUrl} 
      unsubscriptionUrl={unsubscriptionUrl}
      contactEmail={contactEmail}
    />
  );
};

/**
 * Generates the plain text fallback for an email.
 * 
 * @param payload - The email data to render
 * @param baseUrl - Optional base URL for images and links
 * @param unsubscriptionUrl - Optional unsubscribe URL
 * @param contactEmail - Optional contact email
 * @returns A promise resolving to the plain text string
 * 
 * @remarks
 * This function should only be called on the server (Node.js).
 */
export const renderEmailText = async (
  payload: EmailPayload, 
  baseUrl?: string,
  unsubscriptionUrl?: string,
  contactEmail?: string
) => {
  const render = await getRenderFn();
  return render(
    <EmailRenderer 
      payload={payload} 
      baseUrl={baseUrl} 
      unsubscriptionUrl={unsubscriptionUrl}
      contactEmail={contactEmail}
    />, 
    {
      plainText: true,
    }
  );
};
