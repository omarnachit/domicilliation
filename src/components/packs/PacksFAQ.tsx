'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { getFAQsData } from '@/lib/packs-data';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  category: string;
  items: FAQItem[];
}

function FAQSection({ category, items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-zinc-900 mb-6 pb-4 border-b-2 border-indigo-600">
        {category}
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-zinc-200 rounded-lg overflow-hidden hover:border-zinc-300 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-zinc-50 transition-colors"
            >
              <span className="text-left font-semibold text-zinc-900">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-zinc-600 shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200">
                <p className="text-zinc-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PacksFAQ() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getFAQsData();
        setFaqItems(result);
      } catch (error) {
        console.error('Error loading FAQ data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categories = Array.from(new Set(faqItems.map((item) => item.category)));

  const groupedFAQ = categories.map((category) => ({
    category,
    items: faqItems.filter((item) => item.category === category),
  }));

  if (loading) {
    return (
      <div className="w-full py-24 bg-gradient-to-b from-zinc-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-zinc-600">Chargement des questions fréquentes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-24 bg-gradient-to-b from-zinc-50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Questions Fréquemment Posées
          </h2>
          <p className="text-lg text-zinc-600">
            Trouvez les réponses à vos questions sur nos packs et services
          </p>
        </div>

        {/* FAQ Sections */}
        <div>
          {groupedFAQ.map((section, index) => (
            <FAQSection
              key={index}
              category={section.category}
              items={section.items}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 p-8 bg-indigo-50 border-2 border-indigo-200 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-indigo-900 mb-3">
            Vous n'avez pas trouvé votre réponse?
          </h3>
          <p className="text-indigo-800 mb-6">
            Notre équipe est prête à vous aider. Contactez-nous directement pour toute question.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors">
              Nous contacter
            </button>
            <button className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-lg transition-colors">
              Chat en direct
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
