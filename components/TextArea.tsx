"use client";
type TextAreaProps = {
  rows?: number;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  name?: string;
};

const TextArea = ({
  rows = 4,
  label,
  value = "",
  onChange,
  required = false,
  name = "",
}: TextAreaProps) => (
  <div>
    {label && (
      <label
        htmlFor={label.toLowerCase()}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    )}
    <textarea
      rows={rows}
      id={label ? label.toLowerCase() : undefined}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required={required}
    />
  </div>
);

export default TextArea;
