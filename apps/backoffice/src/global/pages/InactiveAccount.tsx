import { css } from "../../../styled-system/css";

function InactiveAccount() {
  return (
    <div className={css({ margin: "auto", maxWidth: "500px" })}>
      <p className={css({ textAlign: "center" })}>
        Bonjour, votre compte est en attente d&apos;activation.
      </p>
    </div>
  );
}

export default InactiveAccount;
