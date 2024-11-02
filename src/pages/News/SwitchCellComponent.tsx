import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { NewsResponseType } from '@/api/services/newsService/types';

interface SwitchCellProps {
  item: NewsResponseType;
  field: 'isTop' | 'isEnabled';
  itemStates: React.MutableRefObject<Record<string, { isEnabled: boolean; isTop: boolean }>>;
  onToggle: (field: 'isTop' | 'isEnabled', checked: boolean, item: NewsResponseType) => void;
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
