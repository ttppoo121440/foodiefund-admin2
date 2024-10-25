import { AccountResponseType } from '@/api/services/userService/types';
import { accountRegistrationSchema, accountResponseTypeSchema } from '@/schemas/accountSchema';
import { DialogState } from '@/types/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export const FormConfig = (dialogState: DialogState<AccountResponseType>) => {
  const initialValues = useMemo(
    () => ({
      _id: '',
      name: '',
      email: '',
      password: '',
      date_of_birth: '',
      phone: '',
      address: '',
      remarks: '',
    }),
    [],
  );

  const methods = useForm<AccountResponseType>({
    resolver: dialogState.isEdit ? zodResolver(accountResponseTypeSchema) : zodResolver(accountRegistrationSchema),
    defaultValues: initialValues,
  });

  return { initialValues, methods };
};
