import { createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

/**
 * Example form to use the reCaptcha, to delete once it's implemented on real usecase
 * @returns
 */
const CaptchaForm = () => {
  const recaptchaRef = createRef<ReCAPTCHA>();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const recaptchaToken = recaptchaRef.current?.getValue();
    console.log(recaptchaToken);
    axios.post("/api/email", { recaptchaToken });
  };

  return (
    <div>
      {/* Ton formulaire */}
      <form onSubmit={handleFormSubmit}>
        {/* ... autres champs de formulaire ... */}

        {/* reCAPTCHA */}
        <ReCAPTCHA
          sitekey="6Le4vnUoAAAAAKCNMteCbEZ6Wd7S5lG8SIgwocGM"
          ref={recaptchaRef}
        ></ReCAPTCHA>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default CaptchaForm;
