import { useState } from 'react';
import { InputEvent, SelectEvent, FormEvent } from "../../types/base-types";
import { EmployeeTypes, DepartmentInterface, EmployeeFiltersProps } from "../../types/employee-types";
import Card from '../ui/card';
import Input from '../ui/input';
import Select from '../ui/select';
import Button from '../ui/button';
import Table from '../ui/table';

const EmployeeForm = ({ departments, onSubmit }: Readonly<{ departments: DepartmentInterface[], onSubmit: (x: EmployeeTypes) => void }>) => {
    const [employee, setEmployee] = useState<EmployeeTypes>({
        name: '',
        department_id: '',
        address: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(employee);
        setEmployee({ name: '', department_id: '', address: '' });
    };

    return (
        <Card title="Add Employee">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Employee Name"
                    value={employee.name}
                    onChange={(e: InputEvent) => setEmployee({ ...employee, name: e.target.value })}
                    placeholder="Enter employee name"
                />
                <Select
                    label="Department"
                    value={employee.department_id}
                    onChange={(e: SelectEvent) => setEmployee({ ...employee, department_id: e.target.value })}
                    options={departments.map(dept => ({
                        value: dept.id?.toString() ?? '',
                        label: dept.name
                    }))}
                    placeholder="Select department"
                />
                <Input
                    label="Address"
                    value={employee.address ?? ""}
                    onChange={(e: InputEvent) => setEmployee({ ...employee, address: e.target.value })}
                    placeholder="Enter address"
                />
                <Button type="submit">Add Employee</Button>
            </form>
        </Card>
    );
};


const EmployeeFilters = ({
    nameFilter,
    departmentFilter,
    departments,
    onNameChange,
    onDepartmentChange,
    onFilter
}: Readonly<EmployeeFiltersProps>) => {
    return (
        <Card title="Filters">
            <div className="flex gap-4">
                <Input
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={onNameChange}
                />
                <Select
                    placeholder="Filter by department"
                    value={departmentFilter}
                    onChange={onDepartmentChange}
                    options={departments.map(dept => ({
                        value: dept.id?.toString() ?? '',
                        label: dept.name
                    }))}
                />
                <Button onClick={onFilter}>Apply Filters</Button>
            </div>
        </Card>
    );
};

const EmployeeList = ({ employees }: Readonly<{ employees: EmployeeTypes[] }>) => {
    const headers = ['ID', 'Name', 'Department', 'Address'];

    const formattedData = employees.map(employee => ({
        id: employee.id,
        name: employee.name,
        department: employee.department_name,
        address: employee.address
    }));

    return (
        <Card title="Employees">
            <Table headers={headers} data={formattedData} />
        </Card>
    );
};

export { EmployeeForm, EmployeeFilters, EmployeeList };
