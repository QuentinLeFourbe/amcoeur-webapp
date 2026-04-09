import * as React from 'react';
import { Section, Markdown } from '@react-email/components';
import { TextBlock } from '../types';

/**
 * A rich text block component supporting Markdown.
 * Renders paragraphs, lists, and headings using the Roboto font and left alignment.
 * 
 * @param props - The text block data containing the Markdown string
 * @returns A styled Section containing the rendered Markdown
 */
export const BlockText = ({ markdown }: TextBlock) => {
  return (
    <Section style={section}>
      <Markdown
        markdownCustomStyles={{
          h1: { fontSize: '24px', color: '#333', fontFamily: 'Roboto, sans-serif' },
          h2: { fontSize: '20px', color: '#333', fontFamily: 'Roboto, sans-serif' },
          p: { fontSize: '16px', lineHeight: '24px', color: '#333', textAlign: 'left' as const, fontFamily: 'Roboto, sans-serif' },
          li: { fontSize: '16px', lineHeight: '24px', color: '#333', fontFamily: 'Roboto, sans-serif' },
        }}
      >
        {markdown}
      </Markdown>
    </Section>
  );
};

const section = {
  margin: '16px 0',
};
