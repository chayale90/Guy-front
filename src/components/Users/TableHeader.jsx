import React from 'react'

const TableHeader = ({ headers, showButtons }) => {
    return (
        <thead className='overflow-x-auto text-[16px] lg:text-[20px] whitespace-nowrap font-Assistant border-b font-bold'>
            <tr>
                {headers.filter(Boolean).map((header, index) => (
                    <th key={index} scope="col" className={`px-4 py-2 ${header === 'מזון' ? 'text-custom-blue' : 'text-border-color'} ${index === headers.length - 1 && showButtons ? 'w-1/4' : 'w-1/4'}`}>
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader
