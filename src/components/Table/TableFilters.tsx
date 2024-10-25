import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Table as ReactTable, Column, HeaderContext } from '@tanstack/react-table';
import LocalStorageService from '@/utils/LocalStorageService';

const localStorageService = LocalStorageService.getInstance();

type TableFiltersProps<TData> = {
  table: ReactTable<TData>;
  handleSearch: (newSearch: string) => void;
  name: string;
  filterName: string;
};

const TableFilters = <TData,>({ table, handleSearch, name, filterName }: TableFiltersProps<TData>) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchValue);
    }
  };

  const handleCheckedChange = (column: Column<TData, unknown>, value: boolean) => {
    column.toggleVisibility(value);
    const visibility = table.getAllColumns().reduce(
      (acc, col) => {
        if (col.getCanHide()) {
          acc[col.id] = col.getIsVisible();
        }
        return acc;
      },
      {} as Record<string, boolean>,
    );
    localStorageService.setItem(`${name}columnVisibility`, JSON.stringify(visibility));
  };

  useEffect(() => {
    const storedVisibility = localStorageService.getItem(`${name}columnVisibility`);
    if (storedVisibility) {
      const visibility = JSON.parse(storedVisibility);
      table.getAllColumns().forEach((column: Column<TData, unknown>) => {
        if (column.getCanHide() && visibility[column.id] !== undefined) {
          column.toggleVisibility(visibility[column.id]);
        }
      });
    } else {
      const initialVisibility = table.getAllColumns().reduce(
        (acc, col) => {
          if (col.getCanHide()) {
            acc[col.id] = col.getIsVisible();
          }
          return acc;
        },
        {} as Record<string, boolean>,
      );
      localStorageService.setItem(`${name}columnVisibility`, JSON.stringify(initialVisibility));
    }
  }, [table, name]);

  const tableColumnVisibility = table.getState().columnVisibility;

  useEffect(() => {
    const visibility = table.getAllColumns().reduce(
      (acc, col) => {
        if (col.getCanHide()) {
          acc[col.id] = col.getIsVisible();
        }
        return acc;
      },
      {} as Record<string, boolean>,
    );
    localStorageService.setItem(`${name}columnVisibility`, JSON.stringify(visibility));
  }, [table, name, tableColumnVisibility]);

  return (
    <div className="flex items-center py-4">
      <Input
        placeholder={`過濾 ${filterName}...`}
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            隱藏欄位 <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column: Column<TData, unknown>) => column.getCanHide())
            .map((column: Column<TData, unknown>) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => handleCheckedChange(column, !!value)}
                >
                  {typeof column.columnDef.header === 'function'
                    ? column.columnDef.header({ column, table } as HeaderContext<TData, unknown>)
                    : column.columnDef.header}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableFilters;
