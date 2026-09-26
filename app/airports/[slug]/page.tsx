import { getPostBySlug, getPostSlugs } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ShareButton } from "@/components/ShareButton";

export async function generateStaticParams() {
  const slugs = getPostSlugs("airports");
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const post = getPostBySlug("airports", resolvedParams.slug, ["name", "title", "description"]);
    return constructMetadata({
      title: post.title || `${post.name}怎么样？2026机场推荐、套餐、线路与使用资料`,
      description: post.description,
      canonicalUrl: `https://jichangnow.com/airports/${resolvedParams.slug}`,
    });
  } catch (e) {
    return {};
  }
}

export default async function AirportPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post;
  try {
    post = getPostBySlug("airports", resolvedParams.slug, [
      "name", "title", "description", "content", "updated", "officialUrl", "slug", "rating"
    ]);
  } catch (e) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": post.name,
    "description": post.description,
    "aggregateRating": post.rating ? {
      "@type": "AggregateRating",
      "ratingValue": post.rating,
      "bestRating": "10",
      "worstRating": "1"
    } : undefined
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://jichangnow.com/" },
      { "@type": "ListItem", "position": 2, "name": "机场推荐", "item": "https://jichangnow.com/airports" },
      { "@type": "ListItem", "position": 3, "name": post.name, "item": `https://jichangnow.com/airports/${resolvedParams.slug}` }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      
      {/* Header Layer */}
      <div className="bg-white border-b border-slate-200 pt-10 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav className="text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">首页</Link></li>
              <li><span className="mx-2 text-slate-300">/</span></li>
              <li><Link href="/airports" className="hover:text-blue-600 transition-colors">机场推荐</Link></li>
              <li><span className="mx-2 text-slate-300">/</span></li>
              <li className="text-blue-600 font-bold" aria-current="page">{post.name}</li>
            </ol>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 font-bold text-sm rounded-lg border border-blue-100">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  机场收录
                </span>
                {post.rating && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 font-bold text-sm rounded-lg border border-amber-200">
                    综合评分: {post.rating}/10
                  </span>
                )}
              </div>
              {/* Note: the actual H1 is currently within MDX. If this duplicates, we keep the page visually balanced. */}
            </div>
            
            <div className="flex flex-col md:items-end gap-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                最近数据更新：{post.updated || "2026-09-26"}
              </span>
              <ShareButton title={`${post.name}机场评测`} text={post.description} url={`https://jichangnow.com/airports/${post.slug}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 max-w-6xl">
        {/* Trust Signals Warning */}
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-8 text-sm flex items-start gap-3 shadow-sm">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <div>
            <strong>信息可信度提示：</strong> 
            机场的服务、价格、节点数量及流媒体解锁情况可能会随运营方的调整而变化。本文所载资料基于最近一次更新时的公开信息整理，请最终以服务商实际页面为准。
            <a href="mailto:ksugiono187@gmail.com" className="ml-2 font-bold underline hover:text-amber-900 transition-colors">发现信息有误？联系我们修正</a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <article className="flex-1 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 min-w-0">
            <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-hr:border-slate-100">
              <MDXRemote source={post.content} />
            </div>
            
            {post.officialUrl && (
              <div className="mt-16 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl text-center border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-2xl transform translate-x-10 -translate-y-10" />
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4 relative z-10">想要了解更多或进行体验？</h3>
                <p className="text-slate-600 mb-6 relative z-10 max-w-lg mx-auto">
                  直接访问官方网站获取最新套餐价格与活动信息，体验最准确的网络服务。
                </p>
                <a href={post.officialUrl} target="_blank" rel="noopener nofollow noreferrer" className="relative z-10 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-10 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 text-lg hover:-translate-y-1">
                  前往官方网站
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            )}
          </article>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:sticky lg:top-24">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-blue-600 rounded-full inline-block"></span>
                相关工具
              </h3>
              <div className="space-y-3">
                <Link 
                  href={`/compare?q=${encodeURIComponent(post.name)}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold rounded-xl transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  加入横向对比表
                </Link>
                {post.officialUrl && (
                  <a 
                    href={post.officialUrl} 
                    target="_blank" 
                    rel="noopener nofollow noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm"
                  >
                    前往官网
                  </a>
                )}
              </div>
            </div>

            {/* Related Topics */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-purple-600 rounded-full inline-block"></span>
                推荐专题阅读
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/topics/airport-recommendation" className="flex items-center text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors group">
                    <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    2026 机场推荐大揭秘
                  </Link>
                </li>
                <li>
                  <Link href="/topics/beginner-guide" className="flex items-center text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors group">
                    <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    新手怎么挑选节点？
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="flex items-center text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors group">
                    <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    常见使用问题 FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
