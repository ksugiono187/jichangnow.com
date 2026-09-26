"use client";

import { useState, useMemo } from "react";
import { AirportCard } from "@/components/AirportCard";

export function AirportsClient({ airports }: { airports: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default"); // default, rating-desc, rating-asc, name
  
  // Extract all unique features for filtering (mocked simplified tags for now)
  const [selectedTag, setSelectedTag] = useState("all");
  
  const tags = ["all", "IPLC", "IEPL", "流媒体", "AI", "专线", "原生IP"];

  const filteredAndSorted = useMemo(() => {
    let result = [...airports];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        a => a.name.toLowerCase().includes(term) || 
             a.description?.toLowerCase().includes(term)
      );
    }

    // Tag filter
    if (selectedTag !== "all") {
      result = result.filter(a => {
        const featuresText = (a.features || []).join(" ").toLowerCase();
        const descText = (a.description || "").toLowerCase();
        const tag = selectedTag.toLowerCase();
        return featuresText.includes(tag) || descText.includes(tag);
      });
    }

    // Sort
    if (sortBy === "rating-desc") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "rating-asc") {
      result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [airports, searchTerm, selectedTag, sortBy]);

  return (
    <div>
      {/* Control Panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between z-20 relative">
        <div className="flex-1 w-full relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="搜索机场名称或特点..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-sm"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select 
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
          >
            <option value="default">默认排序</option>
            <option value="rating-desc">评分从高到低</option>
            <option value="rating-asc">评分从低到高</option>
            <option value="name">按名称排序</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedTag === tag 
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tag === "all" ? "全部" : tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAndSorted.map((airport: any, i: number) => (
          <AirportCard key={airport.slug || i} airport={airport} />
        ))}
        {filteredAndSorted.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
            没有找到符合条件的机场资料
          </div>
        )}
      </div>
    </div>
  );
}
