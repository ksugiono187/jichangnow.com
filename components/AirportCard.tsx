import Link from "next/link";

export function AirportCard({ airport }: { airport: any }) {
  return (
    <div className="group relative border border-slate-200 rounded-2xl bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{airport.name}</h2>
          {airport.rating && (
            <span className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-bold border border-blue-100 shadow-sm">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {airport.rating}
            </span>
          )}
        </div>
        
        <p className="text-slate-600 text-sm mb-5 line-clamp-3 leading-relaxed flex-1">
          {airport.description}
        </p>
        
        {airport.features && (
          <ul className="text-sm text-slate-600 space-y-2.5 mb-6">
            {airport.features.slice(0, 3).map((f: string, j: number) => (
              <li key={j} className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="line-clamp-1">{f}</span>
              </li>
            ))}
          </ul>
        )}
        
        {/* Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          <Link 
            href={`/airports/${airport.slug}`} 
            className="flex-1 text-center py-2.5 bg-slate-50 border border-slate-200 hover:bg-blue-600 hover:border-blue-600 hover:text-white text-slate-700 rounded-lg font-bold text-sm transition-all duration-300"
          >
            评测详情
          </Link>
          <Link 
            href={`/compare?q=${encodeURIComponent(airport.name)}`}
            className="flex-1 text-center py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-bold text-sm transition-all duration-300"
          >
            加入对比
          </Link>
        </div>
      </div>
    </div>
  );
}
