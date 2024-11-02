import { FileListResponseType } from '@/api/services/FileService/types';
import { NewsResponseType } from '@/api/services/newsService/types';
import { fileFormSchema } from '@/schemas/fileSchema';
import { DialogState } from '@/types/dialog';
import { safeParseResponse } from '@/utils/zodUtils';
import { useCallback, useState } from 'react';

export const DialogConfig = () => {
  const [dialogState, setDialogState] = useState<DialogState<FileListResponseType>>({
    isOpen: false,
    currentItem: null,
    isEdit: false,
    isAlertDialogOpen: false,
  });

  const updateIsOpen = useCallback((newState: DialogState<FileListResponseType>) => {
    setDialogState(newState);
  }, []);

  const openDialogEditData = useCallback(
    (data: NewsResponseType) => {
      const result = safeParseResponse(fileFormSchema, data);
      updateIsOpen({ isOpen: true, currentItem: result, isEdit: true });
    },
    [updateIsOpen],
  );

  const openDialogDeleteData = useCallback(
    (id: string, name: string) => {
      updateIsOpen({
        isOpen: false,
        currentItem: { id, name, URL: '', folder: '' },
        isEdit: true,
        isAlertDialogOpen: true,
      });
    },
    [updateIsOpen],
  );

  return { dialogState, setDialogState, updateIsOpen, openDialogEditData, openDialogDeleteData };
};
