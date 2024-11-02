import { TrashIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { FileListResponseType } from '@/api/services/FileService/types';
import { Badge } from '@/components/ui/badge';
import { ClipboardIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type getColumnsProps = {
  openDialogDeleteData: (id: string, email: string) => void;
  filter?: number | undefined;
};

export const useColumns = ({ openDialogDeleteData }: getColumnsProps): ColumnDef<FileListResponseType>[] => {
  const { toast } = useToast();
  const handleCopyLink = (item: FileListResponseType) => {
    if (item.URL) {
      navigator.clipboard
        .writeText(item.URL)
        .then(() => {
          toast({
            description: '圖片連結已複製成功!',
          });
        })
        .catch((err) => {
          console.error('复制失败:', err);
        });
    }
  };

  return [
    {
      accessorKey: 'URL',
      header: '圖片',
      cell: ({ row }) => {
        const item = row?.original;
        return (
          <Zoom classDialog="custom-zoom">
            <div className="capitalize">
              <img src={item.URL} className="h-60 w-60 hover:cursor-pointer" />
            </div>
          </Zoom>
        );
      },
    },
    {
      accessorKey: 'folder',
      header: 'folder',
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue('folder') === 'Images' ? (
            <Badge variant="secondary">{row.getValue('folder')}</Badge>
          ) : (
            <Badge>{row.getValue('folder')}</Badge>
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      header: '操作',
      enableHiding: false,
      cell: ({ row }) => {
        const item = row?.original;
        return (
          <div className="flex space-x-2">
            <Button className="text-secondary" variant="outline" onClick={() => handleCopyLink(item)}>
              <ClipboardIcon />
            </Button>
            <Button
              variant="outline"
              className="text-red-500"
              onClick={() => openDialogDeleteData(item.id!, item.name!)}
            >
              <TrashIcon />
            </Button>
          </div>
        );
      },
    },
  ];
};
