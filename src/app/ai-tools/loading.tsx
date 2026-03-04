import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-surface-border border-t-primary-500 rounded-full animate-spin" />
        <p className="mt-4 text-gray-400 font-medium">Loading AI tools...</p>
      </div>
    </div>
  );
}
