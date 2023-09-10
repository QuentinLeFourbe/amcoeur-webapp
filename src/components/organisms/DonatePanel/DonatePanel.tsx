import React from "react";
import { css } from "../../../../styled-system/css";
import MultipleChoicePanel from "../../molecules/MultipleChoicePanel/MultipleChoicePanel";

type PaymentMethod = "paypal" | "bankTransfer" | "check";

function DonatePanel() {
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethod>("paypal");

  return (
    <div className={container}>
      <h2 className={contentTitle}>Donation</h2>
      <p>
        Vous pouvez faire un don à l'association en utilisant l'un des moyens de
        paiement ci-dessous.
      </p>
      <MultipleChoicePanel
        buttons={[
          {
            name: "Carte bleue (Paypal)",
            onClick: () => {
              setPaymentMethod("paypal");
            },
          },
          {
            name: "Virement bancaire",
            onClick: () => {
              setPaymentMethod("bankTransfer");
            },
          },
          {
            name: "Chèque",
            onClick: () => {
              setPaymentMethod("check");
            },
          },
        ]}
        activeButtonIndex={0}
      />
      {paymentMethod === "paypal" && (
        <div className={paypalContainer}>
          <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
          >
            <input name="cmd" type="hidden" value="_s-xclick" />
            <input
              name="hosted_button_id"
              type="hidden"
              value="V265UZKB577FG"
            />
            <input
              alt="PayPal, le réflexe sécurité pour payer en ligne"
              name="submit"
              src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donateCC_LG.gif"
              type="image"
            />
            <img
              src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif"
              alt=""
              width="1"
              height="1"
            />
          </form>
        </div>
      )}
      {paymentMethod === "bankTransfer" && (
        <div className={bankTransferContainer}>
          <p className={important}>Fonctionnement:</p>
          <p>
            Le virement bancaire est toujours demandé par le titulaire du compte
            à débiter (vous en tant que donateur),
          </p>
          <p>Le transfert de fonds est effectué électroniquement.</p>
          <p>
            Cette opération exige pour votre banque de connaître les coordonnées
            bancaires précises du compte bénéficiaire : amcoeur.org (ci-aprés
            relevé d'identité Bancaire).
          </p>
          <img
            src="https://www.amcoeur.org/images/rib-societe-generale--1.jpg"
            alt="RIB"
            className={ribImage}
          />
        </div>
      )}
      {paymentMethod === "check" && (
        <div className={checkContainer}>
          <p>
            Le chèque bancaire sera émis par une banque domiciliée en France ou
            dans l'union européenne. Il devra être exclusivement libellé à
            l'ordre de l'association amcoeur.org et adressé par courrier à :
          </p>
          <p className={important}>
            amcoeur.org 597 route de Cazan 13330 PELISSANNE (FRANCE)
          </p>
          <p>
            Veuillez précisez au dos du chèque votre nom, prénom, adresse et
            code postal correspondant aux indications que vous aurez complétées
            sur le formulaire versement de don ou de cotisation.
          </p>
          <p className={important}>Merci pour votre participation</p>
        </div>
      )}
    </div>
  );
}

const paypalContainer = css({
  margin: "30px 0",
});

const container = css({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  padding: "100px 0",
  backgroundColor: "backgroundSecondary",
});

const contentTitle = css({
  fontSize: "2rem",
  fontWeight: "600",
  color: "textPrimary",
  margin: "0 0 10px 0",
});

const ribImage = css({
  alignSelf: "center",
  margin: "1rem",
});

const bankTransferContainer = css({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
});

const checkContainer = css({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",

  "& p ": {
    margin: "1rem 0",
  },
});

const important = css({
  fontWeight: "600",
});

export default DonatePanel;
