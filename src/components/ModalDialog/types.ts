import { UseFormReturn } from 'react-hook-form';

import { FieldValues } from 'react-hook-form';
import { FormFieldConfig } from '../FormComponent/types';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export interface ModalDialogProps<T extends FieldValues> {
  dialogState: {
    isOpen: boolean;
    currentItem: T | null;
    isEdit: boolean;
  };
  updateIsOpen: (newState: { isOpen: boolean; currentItem: T | null; isEdit: boolean }) => void;
  methods: UseFormReturn<T>;
  FormFields: FormFieldConfig<T>[];
  initialValues: T;
  createData: UseMutateFunction<AxiosResponse<T>, AxiosError<AxiosError>, T>;
  updateData?: UseMutateFunction<AxiosResponse<T>, AxiosError<AxiosError>, T>;
}
