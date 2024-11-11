"use client";
type InputProps = {
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
};

const Input = ({
  label,
  type = "text",
  value = "",
  onChange,
  required = false,
  name = "",
}: InputProps) => (
  <div>
    {label && (
      <label
        htmlFor={label.toLowerCase()}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    )}
    <input
      type={type}
      id={label ? label.toLowerCase() : undefined}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required={required}
    />
  </div>
);

export default Input;
