import * as React from 'react';
import { Heading } from '@react-email/components';
import { TitleBlock } from '../types';

export const BlockTitle = ({ content }: TitleBlock) => {
  return (
    <Heading style={heading}>
      {content}
    </Heading>
  );
};

const heading = {
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: '700',
  color: '#FF69B4', // pinkMedium
  textAlign: 'center' as const,
  margin: '30px 0',
  fontFamily: 'Playfair Display, serif',
};
