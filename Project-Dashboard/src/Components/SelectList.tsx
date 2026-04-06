import React from 'react';

type SelectListProps = {
    selected: any;
    options: any[];
    onChange: (value: any) => void;
}

const SelectList: React.FC<SelectListProps> = ({ selected, options, onChange }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as any;
        onChange(value);
    };

    return (
        <select
            value={selected as any}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
            <option value="">Select an option</option>
            {options.map((option, index) => (
                <option key={index} value={String(option)}>
                    {String(option)}
                </option>
            ))}
        </select>
    );
}

export default SelectList;