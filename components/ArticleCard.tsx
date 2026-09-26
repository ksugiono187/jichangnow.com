import Link from "next/link";

function getCategoryColor(category: string) {
  if (category.includes("教程")) return "bg-blue-50 text-blue-700 border-blue-200";
  if (category.includes("评测")) return "bg-purple-50 text-purple-700 border-purple-200";
  if (category.includes("指南") || category.includes("选择")) return "bg-cyan-50 text-cyan-700 border-cyan-200";
  if (category.includes("知识")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export function ArticleCard({ post }: { post: any }) {
  const badgeColor = getCategoryColor(post.category || "");

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="border border-slate-200 rounded-2xl p-6 bg-white h-full flex flex-col hover:border-blue-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${badgeColor}`}>
            {post.category || "文章"}
          </span>
          <span className="text-xs font-medium text-slate-400">
            {post.date}
          </span>
        </div>
        
        <h3 className="text-lg font-extrabold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>
        
        <p className="text-slate-600 text-sm mb-5 flex-1 line-clamp-3 leading-relaxed">
          {post.description}
        </p>
        
        <div className="text-sm font-semibold text-blue-600 flex items-center gap-1 mt-auto group-hover:gap-2 transition-all">
          阅读全文 
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </article>
    </Link>
  );
}
