import React from 'react';
import { cn } from '@/lib/utils'; // Optional utility for class merging

export function Separator({ className }: { className?: string }) {
  return (
    <div className={cn('my-4 h-px w-full bg-border', className)} />
  );
}
