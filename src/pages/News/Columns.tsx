import { UseMutateFunction } from '@tanstack/react-query';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { NewsResponseType } from '@/api/services/newsService/types';
import { AxiosError, AxiosResponse } from 'axios';
import debounce from 'lodash/debounce';
import { useCallback, useRef, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { SwitchCell } from './SwitchCellComponent';

type useColumnsProps = {
  openDialogDeleteData: (id: string, title: string) => void;
  openDialogEditData?: (data: NewsResponseType) => void;
  UpdateSwitch?: UseMutateFunction<AxiosResponse<NewsResponseType>, AxiosError, NewsResponseType>;
};

// 定義防抖函數的類型
type DebouncedFunction = ReturnType<typeof debounce> & {
  cancel: () => void;
};

// 定義更新函數的類型
type UpdateFunction = (item: NewsResponseType, field: 'isTop' | 'isEnabled', value: boolean) => void;

export const useColumns = ({
  openDialogDeleteData,
  openDialogEditData,
  UpdateSwitch,
}: useColumnsProps): ColumnDef<NewsResponseType>[] => {
  const itemStates = useRef<Record<string, { isEnabled: boolean; isTop: boolean }>>({});

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
    (field: 'isTop' | 'isEnabled', checked: boolean, item: NewsResponseType) => {
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

  return [
    {
      accessorKey: 'title',
      header: '標題',
    },
    {
      accessorKey: 'isTop',
      header: '置頂',
      cell: ({ row }) => (
        <SwitchCell item={row.original} field="isTop" itemStates={itemStates} onToggle={handleToggle} />
      ),
    },
    {
      accessorKey: 'isEnabled',
      header: '啟用',
      cell: ({ row }) => (
        <SwitchCell item={row.original} field="isEnabled" itemStates={itemStates} onToggle={handleToggle} />
      ),
    },
    {
      accessorKey: 'publicAt',
      header: '發表時間',
      cell: ({ row }) => {
        const date = new Date(row.getValue('publicAt'));
        return <div className="lowercase">{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: 'updateAt',
      header: '更新時間',
      cell: ({ row }) => {
        const date = new Date(row.getValue('updateAt'));
        return <div className="lowercase">{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: 'actions',
      header: '操作',
      enableHiding: false,
      cell: ({ row }) => {
        const news = row?.original;
        return (
          <div>
            <Button
              className="mr-3 text-secondary"
              variant="outline"
              onClick={() => openDialogEditData && openDialogEditData(news)}
            >
              <Pencil1Icon />
            </Button>
            <Button
              variant="outline"
              className="text-red-500"
              onClick={() => openDialogDeleteData(news._id!, news.title!)}
            >
              <TrashIcon />
            </Button>
          </div>
        );
      },
    },
  ];
};
