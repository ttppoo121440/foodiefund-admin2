import { Control, FieldValues } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

export interface FormFieldConfig<T extends FieldValues> {
  id?: string;
  label: string;
  key: string;
  name: keyof T;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'checkbox' | 'textarea' | 'select' | 'switch' | 'date';
  text?: string;
  className?: string;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
}

export interface FormRendererProps<T extends FieldValues> extends FormFieldConfig<T> {
  control: Control<T>;
}

export interface FormComponentProps<T extends FieldValues> {
  FormFields: FormFieldConfig<T>[];
}
