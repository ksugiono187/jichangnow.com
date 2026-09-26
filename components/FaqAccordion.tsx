"use client";

import { useState } from "react";
import { FaqCategory, FaqItem } from "@/lib/faqData";

function AccordionItem({ item, isOpen, onClick }: { item: FaqItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className={`border-b border-slate-100 last:border-0 transition-colors ${isOpen ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}>
      <button
        onClick={onClick}
        className="w-full text-left py-5 px-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg group"
        aria-expanded={isOpen}
      >
        <span className={`font-bold text-lg transition-colors duration-200 ${isOpen ? 'text-blue-700' : 'text-slate-800 group-hover:text-blue-600'}`}>
          {item.question}
        </span>
        <div className={`flex-shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-6 pt-1 text-slate-600 leading-relaxed text-base">
          {item.answerNode}
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ data }: { data: FaqCategory[] }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10">
      {data.map((category, cIdx) => (
        <section key={cIdx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group">
          <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-5 border-b border-slate-200/80">
            <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">{category.category}</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {category.items.map((item, iIdx) => (
              <AccordionItem
                key={iIdx}
                item={item}
                isOpen={!!openItems[`${cIdx}-${iIdx}`]}
                onClick={() => toggleItem(cIdx, iIdx)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
