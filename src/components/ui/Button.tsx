import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full';
  
  const variants = {
    primary: 'bg-primary text-text hover:bg-primary/90 hover:scale-105 hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 hover:scale-105 hover:shadow-lg',
    outline: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-3 md:py-2 text-sm min-h-[44px] md:min-h-0',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
