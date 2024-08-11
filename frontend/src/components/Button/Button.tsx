import React, { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
    return (
        <button
            className={`${styles.button} ${className || ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
