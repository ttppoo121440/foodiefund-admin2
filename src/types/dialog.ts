export interface DialogState<T> {
  isOpen: boolean;
  currentItem: T | null;
  isEdit: boolean;
  isAlertDialogOpen?: boolean;
}
