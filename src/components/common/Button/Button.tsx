import "./Button.css";

export interface ButtonProps {
  icon?: string;
  text: string;
  disabled?: boolean;
  className?: string;
}

function Button({ icon, text, className, disabled }: ButtonProps) {
  return (
    <div>
      <button className={className} disabled={disabled}>
        <span>{icon}</span>
        <span>{text}</span>
      </button>
    </div>
  );
}

export default Button;
