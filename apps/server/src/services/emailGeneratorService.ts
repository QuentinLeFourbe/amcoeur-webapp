import type { EmailBlock } from "@amcoeur/types";
import { EmailBlockType } from "@amcoeur/types";
import { marked } from "marked";

const AMCOEUR_ROSE = "#e11d48";
const AMCOEUR_PALE = "#fda4af";

/**
 * Génère le contenu HTML complet pour une campagne d'emailing
 */
export const generateEmailHtml = async (
  blocks: EmailBlock[], 
  unsubscribeEmail: string, 
  contactEmail: string
): Promise<string> => {
  const contentHtml = (await Promise.all(blocks.map((block, index) => renderBlock(block, index)))).join("");

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Amcoeur</title>
      <style>
        body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8f8f8; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f8f8f8; padding-bottom: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-left: 20px solid ${AMCOEUR_PALE}; border-right: 20px solid ${AMCOEUR_PALE}; }
        .content { padding: 40px 20px; text-align: left; }
        .footer { padding: 30px 20px; text-align: center; font-size: 12px; color: #888888; font-family: Arial, sans-serif; border-top: 1px solid #eeeeee; }
        img { max-width: 100%; height: auto; border-radius: 8px; display: block; margin: 0 auto; }
        h1 { color: ${AMCOEUR_ROSE}; font-family: Georgia, 'Times New Roman', serif; text-align: center; }
        p { line-height: 1.6; color: #333333; font-family: Arial, sans-serif; }
      </style>
    </head>
    <body>
      <table class="wrapper" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table class="main" width="600" cellpadding="0" cellspacing="0">
              <tr>
                <td class="content">
                  ${contentHtml}
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <div style="margin-bottom: 15px; text-align: center;">
                    <img src="cid:logo_amcoeur" width="100" alt="Logo Amcoeur" style="display: inline-block; border: 0; outline: none; text-decoration: none;">
                  </div>
                  <p style="font-weight: bold; margin-bottom: 5px; text-align: center;">Amcoeur — Association de protection animale</p>
                  <p style="text-align: center;">
                    <a href="https://www.amcoeur.org/don" style="color: ${AMCOEUR_ROSE}; text-decoration: none; font-weight: bold;">Faire un don</a>
                    <span style="margin: 0 10px; color: #dddddd;">|</span>
                    <a href="https://amcoeur.org" style="color: ${AMCOEUR_ROSE}; text-decoration: none;">Visiter notre site</a>
                    <span style="margin: 0 10px; color: #dddddd;">|</span>
                    <a href="mailto:${contactEmail}" style="color: ${AMCOEUR_ROSE}; text-decoration: none;">Nous contacter</a>
                  </p>
                  <p style="margin-top: 25px; font-size: 10px; text-align: center; color: #999999;">
                    Vous recevez ce mail car vous êtes inscrit à notre newsletter. <br>
                    <a href="https://amcoeur.org/unsubscribe?email=${encodeURIComponent(unsubscribeEmail)}" style="color: #999999; text-decoration: underline;">
                      Se désinscrire de la newsletter
                    </a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

/**
 * Rendu individuel d'un bloc en HTML
 */
const renderBlock = async (block: EmailBlock, blockIndex: number): Promise<string> => {
  switch (block.type) {
    case EmailBlockType.TITLE:
      return `<h1 style="margin-bottom: 24px; color: ${AMCOEUR_ROSE}; font-family: Georgia, serif; text-align: center;">${block.content}</h1>`;

    case EmailBlockType.TEXT: {
      const rawHtml = await marked.parse(block.content);
      const htmlContent = rawHtml.replace(/<p>/g, '<p style="margin-bottom: 16px; margin-top: 0; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333;">');
      return `<div style="margin-bottom: 24px; text-align: left;">${htmlContent}</div>`;
    }

    case EmailBlockType.IMAGE: {
      const imagesCount = block.images.length;
      const width = Math.floor(100 / imagesCount) - 2;
      
      const imagesHtml = block.images.map((img, imgIndex) => `
        <td width="${width}%" style="padding: 5px; vertical-align: top; text-align: center;">
          <div style="margin-bottom: 8px; text-align: center;">
            <img src="cid:img_b${blockIndex}_i${imgIndex}" 
                 style="display: inline-block; max-width: 100%; height: auto; max-height: ${img.maxHeight}px; border-radius: 8px; object-fit: contain;">
          </div>
          ${img.caption ? `<p style="font-size: 11px; color: #666666; font-style: italic; margin: 0; font-family: Arial, sans-serif; text-align: center; line-height: 1.3;">${img.caption}</p>` : ""}
        </td>
      `).join("");

      return `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; table-layout: fixed;">
          <tr>
            ${imagesHtml}
          </tr>
        </table>
      `;
    }

    default:
      return "";
  }
};
