import * as React from 'react';
import { render } from '@react-email/render';
import { EmailLayout } from './blocks/EmailLayout';
import { BlockTitle } from './blocks/BlockTitle';
import { BlockText } from './blocks/BlockText';
import { BlockImage } from './blocks/BlockImage';
import { EmailPayload, EmailBlock } from './types';

interface EmailRendererProps {
  payload: EmailPayload;
}

export const EmailRenderer = ({ payload }: EmailRendererProps) => {
  return (
    <EmailLayout previewText={payload.subject}>
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

export const renderEmailHtml = async (payload: EmailPayload) => {
  const html = await render(<EmailRenderer payload={payload} />);
  return html;
};

export const renderEmailText = async (payload: EmailPayload) => {
  const text = await render(<EmailRenderer payload={payload} />, {
    plainText: true,
  });
  return text;
};
