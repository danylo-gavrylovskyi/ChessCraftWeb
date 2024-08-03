import React, { ReactNode } from 'react';

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
    return (
        <button className={`button ${className || ''}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
