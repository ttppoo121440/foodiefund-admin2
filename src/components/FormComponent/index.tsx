import { FieldValues } from 'react-hook-form';
import FormInput from './FormInput';
import { FormComponentProps, FormFieldConfig } from './types';
import FormTextarea from './FormTextarea';
import FormSwitch from './FormSwitch';
import FormSelect from './FormSelect';
import FormDatePicker from './FormDatePicker';

const FormComponent = <T extends FieldValues>({ FormFields }: FormComponentProps<T>) => {
  return (
    <div className="my-5">
      {FormFields.map((field: FormFieldConfig<T>) =>
        field.type === 'textarea' ? (
          <FormTextarea
            key={field.name as string}
            label={field.label}
            name={field.name}
            type="textarea"
            placeholder={field.placeholder}
          />
        ) : field.type === 'switch' ? (
          <FormSwitch key={field.name as string} id={field.id} label={field.label} name={field.name} type="switch" />
        ) : field.type === 'select' ? (
          <FormSelect
            key={field.name as string}
            label={field.label}
            name={field.name}
            options={field.options}
            type="select"
          />
        ) : field.type === 'date' ? (
          <FormDatePicker key={field.name as string} label={field.label} name={field.name} type="date" />
        ) : (
          <FormInput
            key={field.name as string}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
          />
        ),
      )}
    </div>
  );
};

export default FormComponent;
