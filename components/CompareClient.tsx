"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CompareClient({ airports }: { airports: any[] }) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = searchParams?.get("q");
    if (q) setSearchTerm(q);
  }, [searchParams]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const term = searchTerm.toLowerCase();
  const filteredAirports = airports.filter(a => {
    return a.brand_name.toLowerCase().includes(term) ||
           a.pricing.toLowerCase().includes(term) ||
           a.node_regions.toLowerCase().includes(term) ||
           a.route_type.toLowerCase().includes(term);
  });

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      } else {
        alert("最多只能同时对比 4 个机场");
      }
    }
  };

  const selectedAirports = airports.filter(a => selectedIds.includes(a.id));

  return (
    <div className="mt-8 relative z-10">
      {/* Filter Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-8 shadow-sm">
        <h3 className="font-extrabold text-slate-800 mb-4 text-lg">筛选与查找</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="输入品牌、专线、地区、价格等关键词..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          提示：勾选下方列表中的机场，可在此区域上方生成深度并排对比表（最多支持 4 个）
        </p>
      </div>

      {/* Selected Comparison Table */}
      {selectedAirports.length > 0 && (
        <div className="mb-12 bg-white border border-blue-200 rounded-2xl overflow-hidden shadow-xl shadow-blue-900/5 transition-all duration-300 transform scale-100 origin-top">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border-b border-blue-100 flex justify-between items-center">
            <h3 className="font-extrabold text-blue-900 text-lg flex items-center gap-2">
              深度并排对比 
              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">{selectedAirports.length}/4</span>
            </h3>
            <button onClick={() => setSelectedIds([])} className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline px-3 py-1 bg-white/50 rounded-lg transition-colors">
              清空对比
            </button>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-white border-b border-slate-100">
                  <th className="p-5 w-32 border-r border-slate-100 font-bold text-slate-400 uppercase tracking-wider text-xs">对比维度</th>
                  {selectedAirports.map(a => (
                    <th key={a.id} className="p-5 border-r border-slate-100 w-1/4 align-top">
                      <div className="text-xl font-extrabold text-slate-900 mb-3">{a.brand_name}</div>
                      <Link href={`/airports/${a.id}`} className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 mb-3 transition-colors">
                        查看详情页 <span aria-hidden="true">&rarr;</span>
                      </Link>
                      <a href={a.official_url} target="_blank" rel="noopener nofollow noreferrer" className="block text-center w-full px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 hover:shadow-md transition-all">官网入口</a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 border-r border-slate-100 font-bold bg-slate-50/50 text-slate-700">套餐价格</td>
                  {selectedAirports.map(a => <td key={a.id} className="p-5 border-r border-slate-100 text-slate-600 leading-relaxed">{a.pricing}</td>)}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 border-r border-slate-100 font-bold bg-slate-50/50 text-slate-700">流量与设备</td>
                  {selectedAirports.map(a => <td key={a.id} className="p-5 border-r border-slate-100 text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-800">流量:</span> {a.traffic}<br/><br/>
                    <span className="font-semibold text-slate-800">设备:</span> {a.device_limit}
                  </td>)}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 border-r border-slate-100 font-bold bg-slate-50/50 text-slate-700">线路类型</td>
                  {selectedAirports.map(a => <td key={a.id} className="p-5 border-r border-slate-100 text-slate-600 leading-relaxed">
                    {a.third_party_facts.includes('IEPL') || a.third_party_facts.includes('IPLC') || a.official_facts.includes('IEPL') || a.official_facts.includes('IPLC') 
                      ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-50 text-purple-700 font-medium border border-purple-100"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>包含专线/IEPL/IPLC</span> 
                      : '普通中转/直连或暂无资料'}
                  </td>)}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 border-r border-slate-100 font-bold bg-slate-50/50 text-slate-700">节点地区</td>
                  {selectedAirports.map(a => <td key={a.id} className="p-5 border-r border-slate-100 text-slate-600 leading-relaxed">{a.node_regions}</td>)}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 border-r border-slate-100 font-bold bg-slate-50/50 text-slate-700">客户端支持</td>
                  {selectedAirports.map(a => <td key={a.id} className="p-5 border-r border-slate-100 text-slate-600 leading-relaxed">{a.clients}</td>)}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 border-r border-slate-100 font-bold bg-slate-50/50 text-slate-700">AI与流媒体</td>
                  {selectedAirports.map(a => <td key={a.id} className="p-5 border-r border-slate-100 text-slate-600 leading-relaxed">{a.ai_services}</td>)}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 border-r border-slate-100 font-bold bg-slate-50/50 text-slate-700">数据核验时间</td>
                  {selectedAirports.map(a => <td key={a.id} className="p-5 border-r border-slate-100 text-slate-400 text-xs font-mono">{a.last_verified}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Database Table */}
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm tracking-wide">
              <th className="p-5 w-16 text-center font-bold">对比</th>
              <th className="p-5 font-bold">机场名称</th>
              <th className="p-5 font-bold">价格参考 (以官网为准)</th>
              <th className="p-5 font-bold">线路与节点资料</th>
              <th className="p-5 font-bold">AI与流媒体支持</th>
              <th className="p-5 font-bold w-32 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredAirports.map((airport) => (
              <tr key={airport.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-5 text-center align-middle">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 cursor-pointer text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    checked={selectedIds.includes(airport.id)}
                    onChange={() => handleSelect(airport.id)}
                  />
                </td>
                <td className="p-5 align-middle">
                  <div className="font-extrabold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">{airport.brand_name}</div>
                  <div className="text-xs text-slate-400 font-mono">核验: {airport.last_verified}</div>
                </td>
                <td className="p-5 text-slate-600 align-middle">
                  <div className="line-clamp-2 leading-relaxed">{airport.pricing}</div>
                </td>
                <td className="p-5 text-slate-600 align-middle">
                  <div className="line-clamp-1 mb-1.5"><span className="font-bold text-slate-800">地区:</span> {airport.node_regions}</div>
                  <div className="line-clamp-1"><span className="font-bold text-slate-800">线路:</span> {airport.route_type}</div>
                </td>
                <td className="p-5 text-slate-600 align-middle">
                  <div className="line-clamp-2 leading-relaxed">{airport.ai_services}</div>
                </td>
                <td className="p-5 space-y-2 align-middle">
                  <Link href={`/airports/${airport.id}`} className="block text-center w-full px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg text-xs font-bold transition-colors border border-transparent hover:border-blue-100">
                    评测详情
                  </Link>
                  <a href={airport.official_url} target="_blank" rel="noopener nofollow noreferrer" className="block text-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow">
                    官网入口
                  </a>
                </td>
              </tr>
            ))}
            {filteredAirports.length === 0 && (
              <tr>
                <td colSpan={6} className="p-12 text-center text-slate-500 bg-slate-50/50">
                  没有找到符合条件的机场品牌资料。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
