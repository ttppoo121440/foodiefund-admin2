import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import { buttonVariants } from './ui/button';
import { DialogState } from '@/types/dialog';

export interface AlertDialogProps<T extends FieldValues> {
  dialogState: DialogState<T>;
  updateIsOpen: (newState: DialogState<T>) => void;
  AlertDialogHandleContinue: () => void;
}

const AlertDialogComponent = <T extends FieldValues>({
  dialogState,
  updateIsOpen,
  AlertDialogHandleContinue,
}: AlertDialogProps<T>) => {
  const handleCancel = useCallback(() => {
    updateIsOpen({ isOpen: false, currentItem: null, isEdit: false });
  }, [updateIsOpen]);
  return (
    <AlertDialog open={dialogState.isAlertDialogOpen} onOpenChange={handleCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            你確定要刪除這筆
            {dialogState.currentItem ? dialogState.currentItem.title || dialogState.currentItem.name : ''} 資料嗎?
          </AlertDialogTitle>
          <AlertDialogDescription>
            此操作無法撤銷。這將永久刪除您的資料並從我們的網站中刪除您的數據
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={AlertDialogHandleContinue}>
            刪除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
