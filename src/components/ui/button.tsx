import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'lg';
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none rounded-2xl";
  
  let styles = "";
  if (variant === 'outline') {
    styles = "border border-gray-300 hover:bg-gray-50 text-gray-700";
  } else if (variant === 'ghost') {
    styles = "hover:bg-gray-100 text-gray-700";
  } else {
    styles = "bg-[#006AA7] hover:bg-[#005589] text-white";
  }

  const sizeStyles = size === 'lg' ? "px-8 py-4 text-lg" : "px-6 py-3";

  return (
    <button className={`${baseStyles} ${styles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}
