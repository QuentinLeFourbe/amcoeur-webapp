import { css } from "../../../styled-system/css";

function InactiveAccount() {
  return (
    <div className={css({ margin: "auto", maxWidth: "500px" })}>
      <p className={css({ textAlign: "center" })}>
        Bonjour, votre compte est en attente d&apos;activation.
        <br />
        Merci de vous rapprocher de Roger ou de me contacter par mail:
        quentingarcia40@gmail.com
      </p>
    </div>
  );
}

export default InactiveAccount;
