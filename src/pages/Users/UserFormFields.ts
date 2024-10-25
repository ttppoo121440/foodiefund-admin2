import { accountRegistrationSchemaType, AccountResponseType } from '@/api/services/userService/types';
import { FormFieldConfig } from '@/components/FormComponent/types';
import { DialogState } from '@/types/dialog';

export const commonItems: FormFieldConfig<Partial<accountRegistrationSchemaType>>[] = [
  { name: 'name', label: '姓名', required: true, type: 'text', key: 'name' },
  { name: 'email', label: '信箱', type: 'email', required: true, key: 'email' },
  { name: 'password', label: '密碼', type: 'password', required: true, key: 'password' },
  { name: 'dateOfBirth', label: '生日', type: 'date', key: 'date_of_birth' },
  { name: 'phone', label: '電話', type: 'tel', key: 'phone' },
  { name: 'address', label: '地址', type: 'text', key: 'address' },
  { name: 'remarks', label: '備註', type: 'textarea', key: 'remarks' },
];

export const getUserFormFields = (
  dialogState: DialogState<AccountResponseType>,
): FormFieldConfig<Partial<AccountResponseType>>[] => {
  return dialogState.isEdit
    ? [
        ...commonItems.filter((item) => item.name !== 'password'),
        {
          name: 'role',
          label: '角色',
          type: 'select',
          key: 'role',
          options: [
            { label: 'user', value: 'user' },
            { label: 'admin', value: 'admin' },
          ],
        },
      ]
    : commonItems;
};
