import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { UseMutateFunction } from '@tanstack/react-query';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { AxiosError, AxiosResponse } from 'axios';
import { AccountBlackListResponseType, AccountResponseType } from '@/api/services/userService/types';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useRef } from 'react';
import { SwitchCell } from './SwitchCellComponent';

// 定義防抖函數的類型
type DebouncedFunction = ReturnType<typeof debounce> & {
  cancel: () => void;
};

// 定義更新函數的類型
type UpdateFunction = (item: AccountResponseType, field: 'isBlackListed', value: boolean) => void;

type getColumnsProps = {
  openDialogDeleteData: (id: string, email: string) => void;
  openDialogEditData?: (data: AccountResponseType) => void;
  UpdateSwitch?: UseMutateFunction<
    AxiosResponse<AccountBlackListResponseType>,
    AxiosError,
    AccountBlackListResponseType
  >;
  filter?: number | undefined;
};
export const useColumns = ({
  openDialogDeleteData,
  openDialogEditData,
  UpdateSwitch,
  filter,
}: getColumnsProps): ColumnDef<AccountResponseType>[] => {
  const itemStates = useRef<Record<string, { isBlackListed: boolean }>>({});

  // 使用正確的類型定義
  const debouncedFnsRef = useRef<Record<string, DebouncedFunction>>({});

  // 在組件卸載時清理防抖函數
  useEffect(() => {
    // 在 effect 內部創建一個引用的副本
    const currentDebouncedFns = { ...debouncedFnsRef.current };

    return () => {
      // 使用副本進行清理
      Object.values(currentDebouncedFns).forEach((fn) => {
        fn.cancel();
      });
    };
  }, []);

  const handleToggle = useCallback(
    (field: 'isBlackListed', checked: boolean, item: AccountResponseType) => {
      if (!item._id) {
        console.error('Missing _id in news object');
        return;
      }

      // 更新本地狀態
      itemStates.current[item._id] = {
        ...itemStates.current[item._id],
        [field]: checked,
      };

      // 為每個項目的每個字段創建唯一的 key
      const key = `${item._id}-${field}`;

      // 如果這個 key 的防抖函數不存在，就創建一個
      if (!debouncedFnsRef.current[key]) {
        const updateFn: UpdateFunction = (itemToUpdate, fieldToUpdate, valueToUpdate) => {
          if (UpdateSwitch) {
            UpdateSwitch({
              _id: itemToUpdate._id,
              [fieldToUpdate]: valueToUpdate,
            });
          }
        };
        debouncedFnsRef.current[key] = debounce(updateFn, 1000);
      }

      // 使用存儲的防抖函數
      debouncedFnsRef.current[key](item, field, checked);
    },
    [UpdateSwitch],
  );

  const Columns: ColumnDef<AccountResponseType>[] = [
    {
      accessorKey: 'name',
      header: '姓名',
      cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'email',
      header: '信箱',
      cell: ({ row }) => <div className="capitalize">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'phone',
      header: '電話',
      cell: ({ row }) => <div className="capitalize">{row.getValue('phone')}</div>,
    },
    {
      accessorKey: 'address',
      header: '地址',
      cell: ({ row }) => <div className="capitalize">{row.getValue('address')}</div>,
    },
    {
      accessorKey: 'dateOfBirth',
      header: '生日',
      cell: ({ row }) => {
        const dateValue = row.getValue('dateOfBirth');
        const date = new Date(dateValue as Date);
        const isValidDate = !isNaN(date.getTime());

        return <div className="lowercase">{isValidDate ? date.toLocaleDateString() : ''}</div>;
      },
    },
    {
      accessorKey: 'role',
      header: '角色',
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue('role') === 'admin' ? (
            <Badge variant="secondary">{row.getValue('role')}</Badge>
          ) : (
            <Badge>{row.getValue('role')}</Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'remarks',
      header: '備註',
      cell: ({ row }) => <div className="capitalize">{row.getValue('remarks')}</div>,
    },
    {
      id: 'actions',
      header: '操作',
      cell: ({ row }) => {
        const payment = row?.original;
        return (
          <div className="flex items-center">
            <Button
              className="mr-3 text-secondary"
              variant="outline"
              onClick={() => openDialogEditData && openDialogEditData(payment)}
            >
              <Pencil1Icon />
            </Button>
            <Button
              variant="outline"
              className="mr-3 text-red-500"
              onClick={() => openDialogDeleteData(payment._id!, payment.email!)}
            >
              <TrashIcon />
            </Button>
            {filter !== 1 && filter !== 0 ? null : (
              <SwitchCell item={row.original} field="isBlackListed" itemStates={itemStates} onToggle={handleToggle} />
            )}
          </div>
        );
      },
    },
  ];

  return Columns;
};
