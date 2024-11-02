import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { FormFieldConfig } from './types';

function isFile(value: unknown): value is File {
  return value instanceof File;
}

const FormInput = <T extends FieldValues>({ label, name, placeholder, type }: FormFieldConfig<T>) => {
  const { control, setValue, watch } = useFormContext<T>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(name as Path<T>, file as T[Path<T>]);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const file = watch(name as Path<T>);

  useEffect(() => {
    if (type === 'file' && isFile(file)) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file, type]);

  return (
    <div className="my-5">
      <FormField
        control={control}
        name={name as Path<T>}
        render={({ field: { ref, ...field } }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {type === 'file' ? (
                <Input type="file" placeholder={placeholder} onChange={handleFileChange} ref={ref} />
              ) : (
                <Input
                  placeholder={placeholder}
                  {...field}
                  type={type}
                  value={(field.value as string | number | readonly string[] | undefined) || ''}
                />
              )}
            </FormControl>
            <FormMessage />
            {type === 'file' && previewUrl && (
              <div className="flex justify-center">
                <div className="relative mt-5 w-full overflow-hidden rounded-lg border border-gray-300">
                  <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                </div>
              </div>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormInput;
