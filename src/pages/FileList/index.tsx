import ModalDialog from '@/components/ModalDialog';
import TableContent from '@/components/Table/TableContent';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { FormConfig } from './FormConfig';
import { DialogConfig } from './DialogConfig';
import { PaginationConfig } from './PaginationConfig';
import useTableConfig from '@/hooks/useTableConfig';
import { FileListResponseType } from '@/api/services/FileService/types';
import { useColumns } from './Columns';
import { useCreateFileMutation, useDeleteFileMutation } from '@/hooks/useFile';
import { useCallback } from 'react';
import AlertDialogComponent from '@/components/AlertDialog';
import { FilesFormFields } from './ImagesFormFields';

const ImageList = () => {
  const { initialValues, methods } = FormConfig();
  const { dialogState, setDialogState, updateIsOpen, openDialogDeleteData } = DialogConfig();
  const { tableData } = PaginationConfig();

  const { mutate: createData } = useCreateFileMutation();
  const { mutate: deleteData } = useDeleteFileMutation();

  const AlertDialogHandleContinue = useCallback(() => {
    if (dialogState.currentItem?.name) {
      deleteData(dialogState.currentItem.name);
    }
  }, [deleteData, dialogState]);

  const table = useTableConfig<FileListResponseType, FileListResponseType>(tableData, useColumns, openDialogDeleteData);

  const handleAddNew = () => {
    setDialogState({
      isOpen: true,
      currentItem: null,
      isEdit: false,
    });
  };
  return (
    <FormProvider {...methods}>
      <div className="w-full">
        <div className="mb-5 flex p-5">
          <h1 className="mr-auto text-5xl">檔案管理</h1>
          <Button onClick={handleAddNew}>新增資料</Button>
          <ModalDialog<FileListResponseType>
            FormFields={FilesFormFields}
            dialogState={dialogState}
            updateIsOpen={updateIsOpen}
            methods={methods}
            createData={createData}
            initialValues={initialValues}
          />
        </div>
        <TableContent table={table} />
      </div>
      <AlertDialogComponent
        dialogState={dialogState}
        updateIsOpen={updateIsOpen}
        AlertDialogHandleContinue={AlertDialogHandleContinue}
      />
    </FormProvider>
  );
};

export default ImageList;
