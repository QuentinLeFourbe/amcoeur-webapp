import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface EmailLayoutProps {
  previewText?: string;
  children: React.ReactNode;
}

const baseUrl = process.env.VITE_API_URL || '';

export const EmailLayout = ({
  previewText,
  children,
}: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={`${baseUrl}/assets/amcoeur_logo.jpg`}
              width="150"
              height="auto"
              alt="Amcoeur"
              style={logo}
            />
          </Section>

          <Section style={content}>{children}</Section>

          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>
              © {new Date().getFullYear()} Association Amcoeur. Tous droits réservés.
            </Text>
            <Text style={footerText}>
              <Link href="https://amcoeur.org" style={link}>
                Visiter notre site
              </Link>
              {' • '}
              <Link href="{{unsubscription_url}}" style={link}>
                Se désinscrire de la newsletter
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#F5F5F5', // veryPaleGrey
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '600px',
  maxWidth: '100%',
  backgroundColor: '#FFFFFF',
  border: '1px solid #F0F0F0',
};

const header = {
  padding: '32px',
  textAlign: 'center' as const,
};

const content = {
  padding: '0 32px',
};

const logo = {
  margin: '0 auto',
};

const footer = {
  padding: '32px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#8898aa',
  lineHeight: '16px',
  margin: '4px 0',
};

const hr = {
  borderColor: '#FFC0CB', // pinkLight
  margin: '20px 0',
};

const link = {
  color: '#FF69B4', // pinkMedium
  textDecoration: 'underline',
};
