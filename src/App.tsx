import { useState, useEffect } from 'react';
import DepartmentForm from './components/app/departments';
import { EmployeeForm, EmployeeFilters, EmployeeList } from './components/app/employees';
import { InputEvent, SelectEvent } from './types/base-types';

const API_URL = 'http://localhost:5000/api';

interface Department {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  name: string;
  department_id: string;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEmployees = async () => {
    const queryParams = new URLSearchParams();
    if (nameFilter) queryParams.append('name', nameFilter);
    if (departmentFilter) queryParams.append('department_id', departmentFilter);

    try {
      const response = await fetch(`${API_URL}/employees?${queryParams}`);
      const data: Employee[] = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_URL}/departments`);
      const data: Department[] = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleAddDepartment = async (departmentData: Omit<Department, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/departments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(departmentData),
      });
      if (response.ok) {
        fetchDepartments();
      }
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const handleAddEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      if (response.ok) {
        fetchEmployees();
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Employee Management System</h1>

      <div className="flex flex-col md:flex-row w-full gap-3">
        <DepartmentForm onSubmit={handleAddDepartment} />

        <EmployeeForm
          departments={departments}
          onSubmit={handleAddEmployee}
        />
      </div>

      <EmployeeFilters
        nameFilter={nameFilter}
        departmentFilter={departmentFilter}
        departments={departments}
        onNameChange={(e: InputEvent) => setNameFilter(e.target.value)}
        onDepartmentChange={(e: SelectEvent) => setDepartmentFilter(e.target.value)}
        onFilter={fetchEmployees}
      />
      <EmployeeList employees={employees} />
    </div>
  );
}

export default App;
