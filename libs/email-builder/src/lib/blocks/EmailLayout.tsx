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
  Font,
} from '@react-email/components';

/**
 * Properties for the EmailLayout component.
 */
interface EmailLayoutProps {
  /** Brief text shown in the email client preview area */
  previewText?: string;
  /** Base URL for resolving static assets like logos and images */
  baseUrl?: string;
  /** Full URL for the unsubscription link in the footer */
  unsubscriptionUrl?: string;
  /** Contact email address displayed in the footer */
  contactEmail?: string;
  /** Main content blocks of the email */
  children: React.ReactNode;
}

/**
 * The master layout component for all Amcoeur emails.
 * Handles brand consistency, responsive containers, headers, and footers.
 * 
 * @param props - Layout configuration and children
 * @returns A complete React Email Html structure
 */
export const EmailLayout = ({
  previewText,
  baseUrl = '',
  unsubscriptionUrl = 'https://amcoeur.org/unsubscribe',
  contactEmail = 'contact@amcoeur.org',
  children,
}: EmailLayoutProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Playfair Display"
          fallbackFontFamily="serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/playfairdisplay/v25/nuFvD7K83OMqlujE4aXxsDsPxZzkISDM.woff2',
            format: 'woff2',
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>
      <Preview>{previewText || ''}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>{children}</Section>

          <Section style={footer}>
            <Hr style={hr} />
            <Img
              src={baseUrl.startsWith('http') ? `${baseUrl}/assets/amcoeur_logo.jpg` : 'cid:logo_amcoeur'}
              width="80"
              alt="Amcoeur"
              style={logo}
            />
            <Text style={footerTagline}>
              Amcoeur — Association de protection animale
            </Text>
            
            <Text style={footerLinksWrapper}>
              <Link href="https://amcoeur.org/don" style={{ ...footerLink, fontWeight: 'bold' }}>
                Faire un don
              </Link>
              <span style={separator}>&nbsp;|&nbsp;</span>
              <Link href="https://amcoeur.org" style={footerLink}>
                Visiter notre site
              </Link>
              <span style={separator}>&nbsp;|&nbsp;</span>
              <Link href={`mailto:${contactEmail}`} style={footerLink}>
                Nous contacter
              </Link>
            </Text>

            <Text style={footerDisclaimer}>
              Vous recevez ce mail car vous êtes inscrit à notre newsletter.<br />
              <Link href={unsubscriptionUrl} style={{ color: '#999', textDecoration: 'underline' }}>
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
  fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '600px',
  maxWidth: '100%',
  backgroundColor: '#FFFFFF',
  border: '1px solid #F0F0F0',
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

const footerTagline = {
  fontSize: '14px',
  color: '#333',
  margin: '10px 0',
};

const footerLinksWrapper = {
  fontSize: '12px',
  margin: '15px 0',
};

const footerLink = {
  color: '#E11D48',
  textDecoration: 'none',
};

const separator = {
  margin: '0 10px',
  color: '#ddd',
};

const footerDisclaimer = {
  fontSize: '10px',
  color: '#999',
  marginTop: '20px',
  lineHeight: '16px',
};

const hr = {
  borderColor: '#E11D48',
  margin: '20px 0',
};
