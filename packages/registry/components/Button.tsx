import type { ReactNode } from "react";

/**
 * Button component
 * @param {string} text - Buton yazısı
 * @param {string} style - Butona ek Tailwind sınıfları
 * @param {ReactNode} iconLeft - Butonun solundaki ikon
 * @param {ReactNode} iconRight - Butonun sağındaki ikon
 * @param {"button" | "submit" | "reset"} type - HTML button type
 * @param {() => void} onClick - Tıklama handler'ı
 * @param {boolean} disabled - Devre dışı durumu
 * @param {"small" | "medium" | "large"} size - Buton boyutu
 * @param {"primary" | "bordered" | "secondary" | "tertiary" | "error"} buttonType - Buton stili
 * @param {boolean} isLoading - Yükleniyor durumu (butonu devre dışı bırakır ve spinner gösterir)
 */
export interface ButtonProps {
  text?: string;
  style?: string;
  /** @deprecated Use `iconLeft` or `iconRight` instead */
  icon?: ReactNode;
  type?: "button" | "submit" | "reset";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  buttonType?: "primary" | "bordered" | "secondary" | "tertiary" | "error";
  isLoading?: boolean;
}

function Button({
  text,
  style,
  type,
  iconLeft,
  iconRight,
  onClick,
  size,
  buttonType = "primary",
  isLoading,
  disabled = isLoading,
}: ButtonProps) {
  const defaultStyle = `text-center flex justify-center items-center rounded-md font-semibold cursor-pointer transition-all duration-300 border space-x-1 ${style ?? ""}`;
  const buttonSize = `${size === "large" ? "px-10 py-4" : size === "medium" ? "px-8 py-3" : "px-6 py-2"}`;
  const buttonStyle = `${defaultStyle} ${buttonSize}
  ${buttonType === "primary" ? "bg-primary-button-bg text-primary-button-text border-primary-button-border hover:border-primary-button-hover-border hover:bg-primary-button-hover-bg hover:text-primary-button-hover-text disabled:bg-primary-button-disabled-bg disabled:text-primary-button-disabled-text disabled:border-primary-button-disabled-border disabled:cursor-not-allowed" : ""}
  ${buttonType === "secondary" ? "bg-secondary-button-bg text-secondary-button-text border-secondary-button-border hover:border-secondary-button-hover-border hover:bg-secondary-button-hover-bg hover:text-secondary-button-hover-text disabled:bg-secondary-button-disabled-bg disabled:text-secondary-button-disabled-text disabled:border-secondary-button-disabled-border disabled:cursor-not-allowed" : ""}
  ${buttonType === "tertiary" ? "bg-tertiary-button-bg text-tertiary-button-text border-tertiary-button-border hover:border-tertiary-button-hover-border hover:bg-tertiary-button-hover-bg hover:text-tertiary-button-hover-text disabled:text-tertiary-button-disabled-text disabled:bg-tertiary-button-disabled-bg disabled:border-tertiary-button-disabled-border disabled:cursor-not-allowed" : ""}
  ${buttonType === "bordered" ? "bg-bordered-button-bg text-bordered-button-text border-bordered-button-border hover:border-bordered-button-hover-border hover:bg-bordered-button-hover-bg hover:text-bordered-button-hover-text disabled:bg-bordered-button-disabled-bg disabled:text-bordered-button-disabled-text disabled:border-bordered-button-disabled-border disabled:cursor-not-allowed disabled:hover:border-bordered-button-disabled-hover-border" : ""}
  ${buttonType === "error" ? "bg-error-500 text-white border-transparent" : ""}`;

  return (
    <button
      className={buttonStyle}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <>
          {iconLeft}
          {text && <p className="whitespace-nowrap">{text}</p>}
          {iconRight}
        </>
      )}
    </button>
  );
}

export default Button;
