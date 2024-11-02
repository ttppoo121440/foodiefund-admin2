import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { ModalDialogProps } from './types';
import FormComponent from '../FormComponent';
import { FormProvider } from 'react-hook-form';
import { useCallback, useEffect } from 'react';

const ModalDialog = <T extends object>({
  dialogState,
  updateIsOpen,
  methods,
  FormFields,
  createData,
  updateData,
  initialValues,
}: ModalDialogProps<T>) => {
  useEffect(() => {
    if (dialogState.currentItem) {
      methods.reset(dialogState.currentItem);
    } else {
      methods.reset(initialValues);
    }
  }, [dialogState.currentItem, methods, initialValues]);

  const handleCancel = useCallback(() => {
    methods.reset();
    updateIsOpen({ isOpen: false, currentItem: null, isEdit: false });
  }, [methods, updateIsOpen]);

  const onSubmit = useCallback(
    async (data: T) => {
      try {
        if (dialogState.isEdit) {
          if (updateData) {
            await updateData(data);
          }
        } else {
          await createData(data);
        }
        handleCancel();
      } catch (error) {
        console.error('提交失敗：', error);
      }
    },
    [handleCancel, dialogState.isEdit, createData, updateData],
  );
  return (
    <Dialog open={dialogState.isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogState.isEdit ? '修改資料' : '新增資料'}</DialogTitle>
          <DialogDescription>請填寫以下表單以提交資料。</DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormComponent<T> FormFields={FormFields} />
            <DialogFooter className="mt-10">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="mr-auto" onClick={handleCancel}>
                  取消
                </Button>
              </DialogClose>
              <Button type="submit">{dialogState.isEdit ? '修改' : '新增'}</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
