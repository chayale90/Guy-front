import React from 'react'


const FormSelectInput = ({ name, value, className, onChange, options }) => {
    return (
        <select
            dir='rtl'
            name={name}
            value={value}
            onChange={onChange}
            className={className}
            // "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
        >
            <option value="">בחר קטגוריה</option>
            {options.map((option, index) => (
                <option key={index} value={option.category}>
                    {option.category}
                </option>
            ))}
        </select>
    );
}

export default FormSelectInput