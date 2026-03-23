
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
  ${buttonType === "primary" ? "bg-primary-button-bg text-primary-button-text border-primary-button-border hover:border-primary-button-hover-border  hover:bg-primary-button-hover-bg hover:text-primary-button-hover-text disabled:bg-primary-button-disabled-bg disabled:text-primary-button-disabled-text disabled:border-primary-button-disabled-border disabled:cursor-not-allowed" : ""}
  ${buttonType === "secondary" ? "bg-secondary-button-bg text-secondary-button-text border-secondary-button-border hover:border-secondary-button-hover-border  hover:bg-secondary-button-hover-bg hover:text-secondary-button-hover-text disabled:bg-secondary-button-disabled-bg disabled:text-secondary-button-disabled-text disabled:border-secondary-button-disabled-border disabled:cursor-not-allowed" : ""}
  ${buttonType === "tertiary" ? "bg-tertiary-button-bg text-tertiary-button-text border-tertiary-button-border hover:border-tertiary-button-hover-border hover:bg-tertiary-button-hover-bg hover:text-tertiary-button-hover-text disabled:text-tertiary-button-disabled-text disabled:bg-tertiary-button-disabled-bg disabled:border-tertiary-button-disabled-border disabled:border-tertiary-button-disabled-border disabled:cursor-not-allowed" : ""}
  ${buttonType === "bordered" ? "bg-bordered-button-bg text-bordered-button-text border-bordered-button-border  hover:border-bordered-button-hover-border hover:bg-bordered-button-hover-bg hover:text-bordered-button-hover-text disabled:bg-bordered-button-disabled-bg disabled:text-bordered-button-disabled-text disabled:border-bordered-button-disabled-border disabled:cursor-not-allowed disabled:hover:border-bordered-button-disabled-hover-border" : ""}
  ${buttonType === "error" ? "bg-error-500 text-white border-transparent " : ""}`;

  return (
    <>

      <button
        className={`${buttonStyle} `}
        type={type && type}
        onClick={onClick && onClick}
        disabled={disabled && disabled}
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
