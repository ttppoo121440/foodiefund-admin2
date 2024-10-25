type RadioGroupProps = {
  selectedValue: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
  name: string;
  options: { id: string; value: string | number | undefined; label: string }[];
};

const RadioGroup = ({ selectedValue, onChange, name, options }: RadioGroupProps) => {
  return (
    <ul className="my-5 w-1/5 items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex">
      {options.map((option) => (
        <li key={option.id} className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
          <div className="flex items-center ps-3">
            <input
              id={option.id}
              type="radio"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              name={name}
              className="h-4 w-4 border-gray-300 bg-gray-100 text-primary hover:cursor-pointer focus:ring-2 focus:ring-primary dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor={option.id}
              className="ms-2 w-full py-3 text-sm font-medium text-gray-900 hover:cursor-pointer dark:text-gray-300"
            >
              {option.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RadioGroup;
