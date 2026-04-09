import * as React from 'react';
import { Heading } from '@react-email/components';
import { TitleBlock } from '../types';

/**
 * A branded title block component.
 * Renders a centered heading using the Playfair Display font and the primary Amcoeur pink color.
 * 
 * @param props - The title block data containing the text content
 * @returns A styled Heading component
 */
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
  color: '#E11D48', // Rose Amcoeur plus mat
  textAlign: 'center' as const,
  margin: '30px 0',
  fontFamily: 'Playfair Display, serif',
};
