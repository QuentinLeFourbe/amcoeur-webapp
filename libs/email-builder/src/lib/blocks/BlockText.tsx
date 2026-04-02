import * as React from 'react';
import { Section, Text, Markdown } from '@react-email/components';
import { TextBlock } from '../types';

export const BlockText = ({ markdown }: TextBlock) => {
  return (
    <Section style={section}>
      <Markdown
        markdownCustomStyles={{
          h1: { fontSize: '24px', color: '#333' },
          h2: { fontSize: '20px', color: '#333' },
          p: { fontSize: '16px', lineHeight: '24px', color: '#333', textAlign: 'center' as const },
          li: { fontSize: '16px', lineHeight: '24px', color: '#333' },
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
