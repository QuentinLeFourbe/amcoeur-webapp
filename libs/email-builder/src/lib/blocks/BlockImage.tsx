import * as React from 'react';
import { Section, Row, Column, Img } from '@react-email/components';
import { ImageBlock } from '../types';

export const BlockImage = ({ layout, images }: ImageBlock) => {
  const renderImage = (img: { url: string; alt?: string }, index: number) => (
    <Img
      key={index}
      src={img.url}
      alt={img.alt || ''}
      width="100%"
      style={imageStyle}
    />
  );

  return (
    <Section style={section}>
      <Row>
        {images.map((img, index) => (
          <Column key={index} style={{ padding: '0 4px' }}>
            {renderImage(img, index)}
          </Column>
        ))}
      </Row>
    </Section>
  );
};

const section = {
  margin: '16px 0',
};

const imageStyle = {
  borderRadius: '8px',
  display: 'block',
};
