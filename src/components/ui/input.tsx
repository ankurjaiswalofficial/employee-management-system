import React, { ChangeEvent, ReactNode } from 'react';

interface InputProps {
  label?: ReactNode;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-3 py-2 border border-gray-300 rounded focus:outline-none 
          focus:border-blue-500 ${className}`}
      />
    </div>
  );
};

export default Input;
