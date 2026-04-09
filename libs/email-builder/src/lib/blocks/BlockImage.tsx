import * as React from 'react';
import { Section, Row, Column, Img, Text } from '@react-email/components';
import { ImageBlock } from '../types';

/**
 * Properties for the SingleImage component.
 */
interface SingleImageProps {
  /** The absolute URL or CID of the image */
  url: string;
  /** Accessibility text for the image */
  alt?: string;
  /** Maximum display height in pixels to ensure consistent layout across clients */
  maxHeight?: number;
  /** Optional italicized label shown under the image */
  caption?: string;
}

/**
 * Renders an individual image with its optional caption and height constraints.
 * Uses explicit height attributes for maximum email client compatibility.
 * 
 * @param props - Image source, dimensions and caption
 * @returns A styled container with the image and its caption
 */
const SingleImage = ({ url, alt, maxHeight, caption }: SingleImageProps) => {
  return (
    <div style={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
      <div 
        style={{
          display: 'inline-block',
          width: 'auto',
          maxWidth: '100%',
          overflow: 'hidden',
          borderRadius: '8px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Img
          src={url}
          alt={alt || ''}
          width="auto"
          height={maxHeight ? String(maxHeight) : "auto"}
          style={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto',
            maxHeight: maxHeight ? `${maxHeight}px` : undefined,
            objectFit: 'contain' as const,
          }}
        />
      </div>
      {caption && (
        <Text style={captionStyle}>
          {caption}
        </Text>
      )}
    </div>
  );
};

/**
 * A layout-aware image block component.
 * Supports single, duo, and trio image grids. Each image is responsively contained.
 * 
 * @param props - The image block data and layout configuration
 * @returns A Section component containing a grid of images
 */
export const BlockImage = ({ layout, images }: ImageBlock) => {
  return (
    <Section style={section}>
      <Row>
        {images.map((img, index) => (
          <Column key={index} style={{ padding: '0 4px', verticalAlign: 'top' }}>
            <SingleImage 
              url={img.url}
              alt={img.alt}
              maxHeight={img.maxHeight}
              caption={img.caption}
            />
          </Column>
        ))}
      </Row>
    </Section>
  );
};

const section = {
  margin: '16px 0',
};

const captionStyle = {
  fontSize: '12px',
  color: '#666',
  fontStyle: 'italic',
  textAlign: 'center' as const,
  marginTop: '4px',
  fontFamily: 'Roboto, sans-serif',
};
