import { AccountResponseType } from '@/api/services/userService/types';
import { accountResponseTypeSchema } from '@/schemas/accountSchema';
import { DialogState } from '@/types/dialog';
import { safeParseResponse } from '@/utils/zodUtils';
import { useCallback, useState } from 'react';

export const DialogConfig = () => {
  const [dialogState, setDialogState] = useState<DialogState<AccountResponseType>>({
    isOpen: false,
    currentItem: null,
    isEdit: false,
    isAlertDialogOpen: false,
  });

  const updateIsOpen = useCallback((newState: DialogState<AccountResponseType>) => {
    setDialogState(newState);
  }, []);

  const openDialogEditData = useCallback(
    (data: AccountResponseType) => {
      const result = safeParseResponse(accountResponseTypeSchema, data);
      updateIsOpen({ isOpen: true, currentItem: result, isEdit: true });
    },
    [updateIsOpen],
  );

  const openDialogDeleteData = useCallback(
    (_id: string, email: string) => {
      updateIsOpen({ isOpen: false, currentItem: { _id, name: email }, isEdit: true, isAlertDialogOpen: true });
    },
    [updateIsOpen],
  );

  return { dialogState, setDialogState, updateIsOpen, openDialogEditData, openDialogDeleteData };
};
