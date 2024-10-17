import { FormEvent, useState } from 'react';
import { InputEvent } from '../../types/base-types';
import { DepartmentInterface } from '../../types/employee-types';
import Card from '../ui/card';
import Input from '../ui/input';
import Button from '../ui/button';

const DepartmentForm = ({ onSubmit }: Readonly<{onSubmit: (x: DepartmentInterface) => void}>) => {
  const [department, setDepartment] = useState<DepartmentInterface>({ name: '', description: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(department);
    setDepartment({ name: '', description: '' });
  };

  return (
    <Card title="Add Department">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Department Name"
          value={department.name}
          onChange={(e: InputEvent) => setDepartment({ ...department, name: e.target.value })}
          placeholder="Enter department name"
        />
        <Input
          label="Description"
          value={department.description??''}
          onChange={(e: InputEvent) => setDepartment({ ...department, description: e.target.value })}
          placeholder="Enter department description"
        />
        <Button type="submit">Add Department</Button>
      </form>
    </Card>
  );
};

export default DepartmentForm
