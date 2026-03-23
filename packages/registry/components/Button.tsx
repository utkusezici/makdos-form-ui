
/**
 * Tosts componenti
 * @param {string} text - Buton yazısı.
 * @param {string} style - Buton stili
 * @param {HTMLElement} icon - Buton iconu.
 * @param {string} type - Buton stili
 * @param {string} iconLeft - Buton stili
 * @param {string} onClick - Buton stili
 * @param {string} disabled - Buton stili
 * @param {string} size - Buton stili
 * @param {string} buttonType - Buton stili
 * @param {string} isLoading - Buton loading
 * Solves equations of the form a * x = b
 * @returns {Number} Returns the value of x for the equation.
 */
type Props = {
  text?: string;
  style?: string;
  icon?: any;
  type?: "button" | "submit" | "reset";
  iconLeft?: any;
  iconRight?: any;
  onClick?: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  buttonType?: "primary" | "bordered" | "secondary" | "tertiary" | "error";
  isLoading?: boolean;
}

function Button({ text, style, type, iconLeft, iconRight, onClick, size, buttonType = "primary", isLoading, disabled = isLoading && true }: Props) {
  const defaultStyle = `text-center flex justify-center items-center rounded-md font-semibold  cursor-pointer transition-all duration-300 border space-x-1 ${style && style}`;
  const buttonSize = `${size === "large" ? "px-10 py-4" : (size === "medium" ? "px-8 py-3" : "px-6 py-2")}`;
  const buttonStyle = `${defaultStyle} ${buttonSize}
  ${buttonType === "primary" ? "bg-primarybuttonbgcolor text-primarybuttontextcolor border-primarybuttonbordercolor hover:border-primarybuttonhoverbordercolor  hover:bg-primarybuttonhoverbgcolor hover:text-primarybuttonhovertextcolor disabled:bg-primarybuttondisabledbgcolor disabled:text-primarybuttondisabledtextcolor disabled:border-primarybuttondisablebordercolor disabled:cursor-not-allowed" : ""}
  ${buttonType === "secondary" ? "bg-secondarybuttonbgcolor text-secondarybuttontextcolor border-secondarybuttonbordercolor hover:border-secondarybuttonhoverbordercolor  hover:bg-secondarybuttonhoverbgcolor hover:text-secondarybuttonhovertextcolor disabled:bg-secondarybuttondisabledbgcolor disabled:text-secondarybuttondisabledtextcolor disabled:border-secondarybuttondisablebordercolor disabled:cursor-not-allowed" : ""}
  ${buttonType === "tertiary" ? "bg-tertiarybuttonbgcolor text-tertiarybuttontextcolor border-tertiarybuttonbordercolor hover:border-tertiarybuttonhoverbordercolor hover:bg-tertiarybuttonhoverbgcolor hover:text-tertiarybuttonhovertextcolor disabled:text-tertiarybuttondisabledtextcolor disabled:bg-tertiarybuttondisabledbgcolor disabled:border-tertiarybuttondisablebordercolor disabled:border-tertiarybuttondisablebordercolor disabled:cursor-not-allowed" : ""}
  ${buttonType === "bordered" ? "bg-borderedbuttonbgcolor text-borderedbuttontextcolor border-borderedbuttonbordercolor  hover:border-borderedbuttonhoverbordercolor hover:bg-borderedbuttonhoverbgcolor hover:text-borderedbuttonhovertextcolor disabled:bg-borderedbuttondisabledbgcolor disabled:text-borderedbuttondisabledtextcolor disabled:border-borderedbuttondisabledbordercolor disabled:cursor-not-allowed disabled:hover:border-borderedbuttondisabledhoverbordercolor" : ""}
  ${buttonType === "error" ? "bg-error500 text-white border-transparent " : ""}`;

  return (
    <>

      <button
        className={`${buttonStyle} `}
        type={type && type}
        onClick={onClick && onClick}
        disabled={disabled}
      >
        {iconLeft ?
          iconLeft
          :
          <></>
        }

        {text &&
          <p className="whitespace-nowrap"> {text}</p>
        }
        {/* {isLoading &&
          <div className="ml-2">
            <TailSpin color="#D51636" height={15} width={15} />
          </div>
        } */}
        {iconRight ?
          iconRight
          :
          <></>
        }
      </button>



    </>
  );
}

export default Button;
