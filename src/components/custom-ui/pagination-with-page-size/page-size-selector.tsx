import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { PageSizeSelectorProps, RNArray } from './types';

export const PageSizeSelector = <T extends RNArray>({
  page,
  itemsPerPageOptions,
  itemsPerPage,
  totalItems,
  changeItemsPerPage,
}: PageSizeSelectorProps<T>) => {
  // Utils
  const getItemsSummary = () => {
    if (totalItems === 0) return 'No items available';

    const firstItem = (page - 1) * itemsPerPage + 1;
    const lastItem = Math.min(page * itemsPerPage, totalItems);
    return `${firstItem}-${lastItem} of ${totalItems} items`;
  };

  return (
    <div className="flex items-center justify-center text-sm">
      {/* Page size selector */}
      <div className="flex items-center gap-0.5">
        <p>Items per page:</p>
        <Select
          value={String(itemsPerPage)}
          onValueChange={(value) => changeItemsPerPage(Number(value))}
        >
          <SelectTrigger className="w-16 border-none shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {itemsPerPageOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Items summary */}
      <p>{getItemsSummary()}</p>
    </div>
  );
};
