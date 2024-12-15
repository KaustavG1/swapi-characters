import "./Button.css";

export interface ButtonProps {
  icon?: string;
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ icon, text, className, disabled, onClick }: ButtonProps) {
  return (
    <div>
      <button
        className={`${className} button-default`}
        disabled={disabled}
        onClick={onClick}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </button>
    </div>
  );
}

export default Button;
