import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { UseMutateFunction } from '@tanstack/react-query';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { AxiosError, AxiosResponse } from 'axios';
import { AccountBlackListResponseType, AccountResponseType } from '@/api/services/userService/types';

type getColumnsProps = {
  openDialogEditData: (data: AccountResponseType) => void;
  openDialogDeleteData: (id: string, email: string) => void;
  UpdateSwitch: UseMutateFunction<
    AxiosResponse<AccountBlackListResponseType>,
    AxiosError,
    AccountBlackListResponseType
  >;
  filter?: number | undefined;
};
export const getColumns = ({
  openDialogEditData,
  openDialogDeleteData,
  UpdateSwitch,
  filter,
}: getColumnsProps): ColumnDef<AccountResponseType>[] => {
  const handleToggle = async (checked: boolean, item: AccountResponseType) => {
    if (!item._id) {
      console.error('Missing _id in item object');
      return;
    }
    try {
      await UpdateSwitch({
        _id: item._id,
        isBlackListed: checked,
      });
    } catch (error) {
      console.error('Toggle failed:', error);
    }
  };

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
        const date = new Date(row.getValue('dateOfBirth'));
        return <div className="lowercase">{date.toLocaleDateString()}</div>;
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
            <Button className="mr-3" variant="outline" onClick={() => openDialogEditData(payment)}>
              <Pencil1Icon />
            </Button>
            <Button
              variant="outline"
              className="mr-3"
              onClick={() => openDialogDeleteData(payment._id!, payment.email!)}
            >
              <TrashIcon />
            </Button>
            {filter !== 1 && filter !== 0 ? null : (
              <Switch
                id={`switch-enabled-${row.id}`}
                checked={payment.isBlackListed as boolean}
                onCheckedChange={(checked) => handleToggle(checked, payment)}
              />
            )}
          </div>
        );
      },
    },
  ];

  return Columns;
};

export default getColumns;
