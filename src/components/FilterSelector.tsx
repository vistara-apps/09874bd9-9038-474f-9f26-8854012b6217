import { useStore } from '@/lib/store';
import { formatPrice } from '@/utils/helpers';

interface FilterSelectorProps {
  selectedFilter: string;
  onSelectFilter: (filterId: string) => void;
  disabled?: boolean;
}

export default function FilterSelector({
  selectedFilter,
  onSelectFilter,
  disabled = false,
}: FilterSelectorProps) {
  const { filters } = useStore();

  const handleFilterSelect = (filterId: string) => {
    if (!disabled) {
      onSelectFilter(filterId);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Select Enhancement Filter</h3>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Free Filters</h4>
        <div className="grid grid-cols-1 gap-2">
          {filters
            .filter(filter => !filter.isPremium)
            .map(filter => (
              <button
                key={filter.id}
                onClick={() => handleFilterSelect(filter.id)}
                className={`p-3 rounded-md text-left transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={disabled}
              >
                <div className="font-medium">{filter.name}</div>
                <div className="text-xs mt-1">
                  {selectedFilter === filter.id && !filter.isPremium
                    ? '✓ Applied'
                    : filter.description}
                </div>
              </button>
            ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Premium Filters</h4>
        <div className="grid grid-cols-1 gap-2">
          {filters
            .filter(filter => filter.isPremium)
            .map(filter => (
              <button
                key={filter.id}
                onClick={() => handleFilterSelect(filter.id)}
                className={`p-3 rounded-md text-left transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={disabled}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{filter.name}</span>
                  {filter.price && (
                    <span className="text-xs bg-accent text-text px-2 py-0.5 rounded-full">
                      {formatPrice(filter.price)}
                    </span>
                  )}
                </div>
                <div className="text-xs mt-1">
                  {selectedFilter === filter.id && filter.isPremium
                    ? '✓ Applied'
                    : filter.description}
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

