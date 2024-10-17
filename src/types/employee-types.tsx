import { InputEvent, SelectEvent } from "./base-types";

interface EmployeeTypes {
    id?: string,
    name: string,
    department_id: string;
    department_name?: string;
    address?: string;
}

interface EmployeeFiltersProps {
    nameFilter: string,
    departmentFilter: string,
    departments: DepartmentInterface[],
    onNameChange: (e: InputEvent) => void,
    onDepartmentChange: (e: SelectEvent) => void,
    onFilter: VoidFunction,
}

interface DepartmentInterface {
    id?: string,
    name: string,
    description?: string
}


export type { EmployeeTypes, DepartmentInterface, EmployeeFiltersProps }
