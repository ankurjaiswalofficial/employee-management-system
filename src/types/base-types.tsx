type InputEvent = React.ChangeEvent<HTMLInputElement>;
type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
type FormEvent = React.ChangeEvent<HTMLFormElement>;

interface TableProps {
    headers: string[];
    data: {
        id?: string;
        name: string;
        department?: string;
        address?: string;
    }[];
    className?: string | null;
}


export type { InputEvent, SelectEvent, FormEvent, TableProps }
