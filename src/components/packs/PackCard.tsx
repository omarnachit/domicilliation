'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';

interface PackFeature {
  name: string;
  included: boolean;
}

interface PackProps {
  title: string;
  description: string;
  price: string;
  period?: string;
  features: PackFeature[];
  popular?: boolean;
  cta?: string;
  discount?: string;
}

export function PackCard({
  title,
  description,
  price,
  period = 'an',
  features,
  popular = false,
  cta = 'Contacter',
  discount
}: PackProps) {
  const router = useRouter();
  return (
    <div
      className={`relative flex flex-col rounded-xl border transition-all duration-300 ${
        popular
          ? 'border-indigo-600 shadow-xl shadow-indigo-100 ring-2 ring-indigo-600 scale-105 bg-gradient-to-br from-white to-indigo-50 z-10'
          : 'border-zinc-200 shadow-sm hover:shadow-lg hover:border-zinc-300 bg-white'
      }`}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
            ⭐ Populaire
          </span>
        </div>
      )}

      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-4 right-4">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
            {discount}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h3 className={`text-2xl font-bold mb-2 ${
            popular ? 'text-indigo-600' : 'text-zinc-900'
          }`}>
            {title}
          </h3>
          <p className="text-sm text-zinc-600 mb-4">{description}</p>
          
          {/* Price */}
          <div className="flex items-baseline gap-1">
            {price === 'À la demande' ? (
              <span className="text-3xl font-bold text-zinc-900">{price}</span>
            ) : (
              <>
                <span className="text-3xl font-bold text-zinc-900">{price}</span>
                <span className="text-lg text-zinc-500"> MAD/{period}</span>
              </>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3 flex-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              {feature.included ? (
                <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                  popular ? 'text-indigo-600' : 'text-green-600'
                }`} />
              ) : (
                <X className="w-5 h-5 shrink-0 mt-0.5 text-zinc-300" />
              )}
              <span className={`text-sm ${
                feature.included ? 'text-zinc-700' : 'text-zinc-400 line-through'
              }`}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push('/booking')}
          className={`w-full mt-8 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            popular
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
              : 'border-2 border-zinc-300 text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400'
          }`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
