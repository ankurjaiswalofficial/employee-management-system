import { TableProps } from "../../types/base-types";

const Table = ({ headers, data, className }: Readonly<TableProps>) => {
    return (
        <div className={`overflow-x-auto ${className ?? ''}`}>
            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-50">
                        {headers.map((header, index) => (
                            <th key={"TableTRHeader__" + String(index)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={"TableTRData__" + String(rowIndex)}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={"TableTDData__" + String(cellIndex)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table
