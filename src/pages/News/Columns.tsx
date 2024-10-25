import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { UseMutateFunction } from '@tanstack/react-query';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { NewsResponseType } from '@/api/services/newsService/types';
import { AxiosError, AxiosResponse } from 'axios';

type getColumnsProps = {
  openDialogEditData: (data: NewsResponseType) => void;
  openDialogDeleteData: (id: string, title: string) => void;
  UpdateSwitch: UseMutateFunction<AxiosResponse<NewsResponseType>, AxiosError, NewsResponseType>;
};
export const getColumns = ({
  openDialogEditData,
  openDialogDeleteData,
  UpdateSwitch,
}: getColumnsProps): ColumnDef<NewsResponseType>[] => {
  const handleToggle = async (field: 'isTop' | 'isEnabled', checked: boolean, item: NewsResponseType) => {
    if (!item._id) {
      console.error('Missing _id in payment object');
      return;
    }
    try {
      await UpdateSwitch({
        _id: item._id,
        [field]: checked,
      });
    } catch (error) {
      console.error('Toggle failed:', error);
    }
  };
  const Columns: ColumnDef<NewsResponseType>[] = [
    {
      accessorKey: 'title',
      header: '標題',
      cell: ({ row }) => <div className="capitalize">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'content',
      header: '內容',
      cell: ({ row }) => <div className="capitalize">{row.getValue('content')}</div>,
    },
    {
      accessorKey: 'isEnabled',
      header: '是否開啟',
      cell: ({ row }) => {
        const payment = row?.original;
        return (
          <Switch
            id={`switch-enabled-${row.id}`}
            checked={payment.isEnabled as boolean}
            onCheckedChange={(checked) => handleToggle('isEnabled', checked, payment)}
          />
        );
      },
    },
    {
      accessorKey: 'isTop',
      header: '是否置頂',
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <Switch
            id={`switch-top-${row.id}`}
            checked={payment.isTop as boolean}
            onCheckedChange={(checked) => handleToggle('isTop', checked, payment)}
          />
        );
      },
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
        const payment = row?.original;
        return (
          <div>
            <Button className="mr-3" variant="outline" onClick={() => openDialogEditData(payment)}>
              <Pencil1Icon />
            </Button>
            <Button variant="outline" onClick={() => openDialogDeleteData(payment._id!, payment.title!)}>
              <TrashIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  return Columns;
};

export default getColumns;
