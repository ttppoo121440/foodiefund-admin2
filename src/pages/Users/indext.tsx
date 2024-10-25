import { useCallback } from 'react';
import { DataTablePagination } from '@/components/Table/DataTablePagination';
import { getColumns } from './Columns';
import useTableConfig from '@/hooks/useTableConfig';
import TableFilters from '@/components/Table/TableFilters';
import TableContent from '@/components/Table/TableContent';
import ModalDialog from '@/components/ModalDialog';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import AlertDialogComponent from '@/components/AlertDialog';
import { FormConfig } from './FormConfig';
import { DialogConfig } from './DialogConfig';
import { PaginationConfig } from './PaginationConfig';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateUserTableMutation,
} from '@/hooks/useUsers';
import { getUserFormFields } from './UserFormFields';
import { AccountBlackListResponseType, AccountResponseType } from '@/api/services/userService/types';
import RadioGroup from '@/components/RadioGroup';
import { blackListedOptions, isAdminOptions } from './RadioGroupConfig';

const Users = () => {
  const { dialogState, setDialogState, updateIsOpen, openDialogEditData, openDialogDeleteData } = DialogConfig();
  const { initialValues, methods } = FormConfig(dialogState);
  const {
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
    handleSearch,
    tableData,
    setBlackListedFilter,
    blackListedFilter,
    search,
    isAdminFilter,
    setIsAdminFilter,
  } = PaginationConfig();
  const userFormFields = getUserFormFields(dialogState);

  const { mutate: deleteData } = useDeleteUserMutation();
  const { mutate: createData } = useCreateUserMutation();
  const { mutate: updateData } = useUpdateUserMutation();
  const { mutate: UpdateSwitch } = useUpdateUserTableMutation({
    keyWord: search,
    page: currentPage + 1,
    limit: pageSize,
    isBlackListed: blackListedFilter,
    role: isAdminFilter,
  });

  const AlertDialogHandleContinue = useCallback(() => {
    if (dialogState.currentItem?._id) {
      deleteData(dialogState.currentItem._id);
    }
  }, [deleteData, dialogState]);

  const table = useTableConfig<AccountResponseType, AccountBlackListResponseType>(
    tableData,
    getColumns,
    openDialogEditData,
    openDialogDeleteData,
    UpdateSwitch,
    blackListedFilter,
  );
  return (
    <FormProvider {...methods}>
      <div className="w-full">
        <div className="mb-5 flex p-5">
          <h1 className="mr-auto text-5xl">會員資料</h1>
          <Button
            onClick={() => {
              setDialogState({
                isOpen: true,
                currentItem: null,
                isEdit: false,
              });
            }}
          >
            新增資料
          </Button>
          <ModalDialog<AccountResponseType>
            FormFields={userFormFields}
            dialogState={dialogState}
            updateIsOpen={updateIsOpen}
            methods={methods}
            createData={createData}
            updateData={updateData}
            initialValues={initialValues}
          />
        </div>
        <TableFilters table={table} handleSearch={handleSearch} name="會員資料" filterName="信箱" />
        <RadioGroup
          selectedValue={blackListedFilter}
          onChange={(value) => setBlackListedFilter(value as number | undefined)}
          name="list-radio-blackListedFilter"
          options={blackListedOptions}
        />
        <RadioGroup
          selectedValue={isAdminFilter}
          onChange={(value) => setIsAdminFilter(value as string)}
          name="list-radio-isAdminFilter"
          options={isAdminOptions}
        />
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

export default Users;
