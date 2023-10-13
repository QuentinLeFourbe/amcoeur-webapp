import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import FormErrorLabel from "../Form/FormErrorLabel";

type CaptchaProps = {
  errorMessage?: string;
  setFormValue: (value: string) => void;
};

const Captcha = forwardRef<ReCAPTCHA | null, CaptchaProps>(
  ({ errorMessage, setFormValue }: CaptchaProps, ref) => {
    const handleCaptchaChange = (value: string | null) => {
      setFormValue(value || "");
    };
    return (
      <div>
        <ReCAPTCHA
          sitekey="6Le4vnUoAAAAAKCNMteCbEZ6Wd7S5lG8SIgwocGM"
          ref={ref}
          onChange={handleCaptchaChange}
        />
        {errorMessage && <FormErrorLabel>{errorMessage}</FormErrorLabel>}
      </div>
    );
  }
);

export default Captcha;
