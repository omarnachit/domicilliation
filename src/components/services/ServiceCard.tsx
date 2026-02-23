'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  priceNote?: string;
  included?: boolean;
}

export function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-lg border border-zinc-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 bg-white hover:bg-indigo-50">
      {/* Checkmark or Icon */}
      <div className="mt-1">
        {item.included ? (
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-green-600" />
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-zinc-900 mb-1">{item.title}</h4>
        <p className="text-sm text-zinc-600 mb-2">{item.description}</p>
        {item.price && (
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-indigo-600">{item.price}</span>
            {item.priceNote && (
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                {item.priceNote}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
