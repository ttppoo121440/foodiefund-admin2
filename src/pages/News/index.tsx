import { useCallback } from 'react';
import { DataTablePagination } from '@/components/Table/DataTablePagination';
import { getColumns } from './Columns';
import useTableConfig from '@/hooks/useTableConfig';
import TableFilters from '@/components/Table/TableFilters';
import TableContent from '@/components/Table/TableContent';
import {
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
  useUpdateNewsTableMutation,
} from '@/hooks/useNews';
import ModalDialog from '@/components/ModalDialog';
import { Button } from '@/components/ui/button';
import { NewsResponseType } from '@/api/services/newsService/types';
import { FormProvider } from 'react-hook-form';
import AlertDialogComponent from '@/components/AlertDialog';
import { FormConfig } from './FormConfig';
import { DialogConfig } from './DialogConfig';
import { PaginationConfig } from './PaginationConfig';
import { NewsFormFields } from './NewsFormFields';

const News = () => {
  const { initialValues, methods } = FormConfig();
  const { dialogState, setDialogState, updateIsOpen, openDialogEditData, openDialogDeleteData } = DialogConfig();
  const { search, currentPage, pageSize, totalPages, handlePageChange, handleSearch, tableData } = PaginationConfig();

  const { mutate: deleteData } = useDeleteNewsMutation();
  const { mutate: createData } = useCreateNewsMutation();
  const { mutate: updateData } = useUpdateNewsMutation();
  const { mutate: UpdateSwitch } = useUpdateNewsTableMutation({
    keyWord: search,
    page: currentPage + 1,
    limit: pageSize,
  });

  const AlertDialogHandleContinue = useCallback(() => {
    if (dialogState.currentItem?.id) {
      deleteData(dialogState.currentItem.id);
    }
  }, [deleteData, dialogState]);

  const table = useTableConfig<NewsResponseType, NewsResponseType>(
    tableData,
    getColumns,
    openDialogEditData,
    openDialogDeleteData,
    UpdateSwitch,
  );

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
          <h1 className="mr-auto text-5xl">最新消息</h1>
          <Button onClick={handleAddNew}>新增資料</Button>
          <ModalDialog<NewsResponseType>
            FormFields={NewsFormFields}
            dialogState={dialogState}
            updateIsOpen={updateIsOpen}
            methods={methods}
            createData={createData}
            updateData={updateData}
            initialValues={initialValues}
          />
        </div>
        <TableFilters table={table} handleSearch={handleSearch} name="最新消息" filterName="標題" />
        <TableContent table={table} />
        <DataTablePagination
          table={table}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      <AlertDialogComponent
        dialogState={dialogState}
        updateIsOpen={updateIsOpen}
        AlertDialogHandleContinue={AlertDialogHandleContinue}
      />
    </FormProvider>
  );
};

export default News;
