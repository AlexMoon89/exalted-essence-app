'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectProps {
  options: { label: string; value: string }[];
  value: string | null;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Select({ options, value, placeholder, onChange, className }: SelectProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <select
        value={value ?? ''}
        onChange={(e) => {
          console.log('[DEBUG] Native select onChange', e.target.value);
          onChange(e.target.value);
        }}
        className="appearance-none w-full border border-muted bg-card text-foreground py-2 px-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-aura-sidereal"
      >
        <option value="">
          {placeholder || 'Select...'}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
    </div>
  );
}
