import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export function Button({ children, variant = 'default', className = '', ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-colors focus:outline-none";
  
  const styles = variant === 'outline' 
    ? "border border-gray-300 hover:bg-gray-50 text-gray-700" 
    : "bg-[#006AA7] text-white hover:bg-[#005589]";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
