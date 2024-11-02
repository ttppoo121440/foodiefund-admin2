import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { AccountResponseType } from '@/api/services/userService/types';

interface SwitchCellProps {
  item: AccountResponseType;
  field: 'isBlackListed';
  itemStates: React.MutableRefObject<Record<string, { isBlackListed: boolean }>>;
  onToggle: (field: 'isBlackListed', checked: boolean, item: AccountResponseType) => void;
}

export const SwitchCell = ({ item, field, itemStates, onToggle }: SwitchCellProps) => {
  const [, setForceUpdate] = useState({});

  const isChecked = item._id ? (itemStates.current[item._id]?.[field] ?? item[field]) : item[field];

  const handleChange = (checked: boolean) => {
    onToggle(field, checked, item);
    setForceUpdate({});
  };

  return <Switch checked={isChecked} onCheckedChange={handleChange} />;
};
