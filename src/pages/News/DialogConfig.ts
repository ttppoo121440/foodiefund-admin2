import { NewsResponseType } from '@/api/services/newsService/types';
import { newsResponseTypeSchema } from '@/schemas/newsSchema';
import { DialogState } from '@/types/dialog';
import { safeParseResponse } from '@/utils/zodUtils';
import { useCallback, useState } from 'react';

export const DialogConfig = () => {
  const [dialogState, setDialogState] = useState<DialogState<NewsResponseType>>({
    isOpen: false,
    currentItem: null,
    isEdit: false,
    isAlertDialogOpen: false,
  });

  const updateIsOpen = useCallback((newState: DialogState<NewsResponseType>) => {
    setDialogState(newState);
  }, []);

  const openDialogEditData = useCallback(
    (data: NewsResponseType) => {
      const result = safeParseResponse(newsResponseTypeSchema, data);
      updateIsOpen({ isOpen: true, currentItem: result, isEdit: true });
    },
    [updateIsOpen],
  );

  const openDialogDeleteData = useCallback(
    (id: string, title: string) => {
      updateIsOpen({ isOpen: false, currentItem: { id, title }, isEdit: true, isAlertDialogOpen: true });
    },
    [updateIsOpen],
  );

  return { dialogState, setDialogState, updateIsOpen, openDialogEditData, openDialogDeleteData };
};
