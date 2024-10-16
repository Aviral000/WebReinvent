import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, id }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700">{label}</label>
    <input 
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-md"
      required
    />
  </div>
);

export default InputField;
