interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'textarea' | 'select';
  value: string | number;
  onChange: (value: string | number) => void;
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options,
  required,
  placeholder,
}: FormFieldProps) {
  const baseClassName =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClassName} min-h-[100px]`}
          required={required}
          placeholder={placeholder}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClassName}
          required={required}
        >
          <option value="">選択してください</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          className={baseClassName}
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
