'use client';

import { useState } from 'react';
import { Filter } from '@/types';

interface FilterSelectorProps {
  onSelectFilter: (filter: Filter) => void;
  selectedFilter: Filter | null;
}

// Mock filters - in a real implementation, these would come from an API
const mockFilters: Filter[] = [
  { id: 'basic-1', name: 'Natural', type: 'basic', description: 'Subtle enhancement of natural colors', price: 0 },
  { id: 'basic-2', name: 'Vibrant', type: 'basic', description: 'Boost colors and contrast', price: 0 },
  { id: 'basic-3', name: 'Soft', type: 'basic', description: 'Gentle softening for a dreamy look', price: 0 },
  { id: 'premium-1', name: 'Pro Light', type: 'premium', description: 'Professional lighting enhancement', price: 0.25 },
  { id: 'premium-2', name: 'Artistic', type: 'premium', description: 'Creative artistic enhancement', price: 0.25 },
  { id: 'premium-3', name: 'Portrait', type: 'premium', description: 'Perfect for cat portraits', price: 0.25 },
];

export default function FilterSelector({ onSelectFilter, selectedFilter }: FilterSelectorProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'premium'>('basic');
  
  const filteredFilters = mockFilters.filter(filter => filter.type === activeTab);
  
  return (
    <div className="space-y-4">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'basic'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Basic Filters
        </button>
        <button
          onClick={() => setActiveTab('premium')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'premium'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Premium Filters
          {activeTab === 'premium' && <span className="ml-1 text-xs">($0.25)</span>}
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filteredFilters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onSelectFilter(filter)}
            className={`p-3 rounded-md text-left transition-colors ${
              selectedFilter?.id === filter.id
                ? 'bg-primary/10 border border-primary'
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="text-sm font-medium">{filter.name}</div>
            <div className="text-xs text-gray-500 mt-1">{filter.description}</div>
            {filter.price > 0 && (
              <div className="text-xs text-primary mt-2">${filter.price.toFixed(2)}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

