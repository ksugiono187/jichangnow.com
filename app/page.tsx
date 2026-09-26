import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { AirportCard } from "@/components/AirportCard";
import { ArticleCard } from "@/components/ArticleCard";

export default function Home() {
  const latestPosts = getAllPosts("blog", ["title", "slug", "date", "description", "category"]).slice(0, 6);
  const airports = getAllPosts("airports", ["name", "slug", "description", "updated", "features", "rating"]).slice(0, 6);

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-slate-50 pt-28 pb-24 px-4 overflow-hidden border-b border-slate-200">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-blue-400/20 via-indigo-400/10 to-purple-400/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            2026 最新资料库已更新
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.15]">
            专业的高级中文<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">机场评测</span>与推荐指南
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            为您提供最中立、深度的机场评测数据，对比线路稳定性、速度表现与性价比，帮您找到最适合的科学上网节点。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/airports" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300">
              查看机场推荐
            </Link>
            <Link href="/compare" className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm">
              机场深度对比
            </Link>
          </div>
        </div>
      </section>

      {/* Categories / Navigation */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "机场推荐", 
              desc: "精选优质节点", 
              href: "/airports", 
              color: "blue",
              icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            },
            { 
              title: "机场评测", 
              desc: "真实数据测试", 
              href: "/topics/reviews", 
              color: "purple",
              icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            },
            { 
              title: "新手指南", 
              desc: "从零开始入门", 
              href: "/topics/guide", 
              color: "cyan",
              icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            },
            { 
              title: "常见问题", 
              desc: "解决使用疑难", 
              href: "/faq", 
              color: "emerald",
              icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            }
          ].map((cat, i) => {
            const colorClasses = {
              blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white border-blue-100",
              purple: "text-purple-600 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white border-purple-100",
              cyan: "text-cyan-600 bg-cyan-50 group-hover:bg-cyan-600 group-hover:text-white border-cyan-100",
              emerald: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white border-emerald-100",
            }[cat.color];

            return (
              <Link 
                key={i} 
                href={cat.href} 
                className="group flex items-center p-6 bg-white border border-slate-200 rounded-2xl hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border transition-colors duration-300 ${colorClasses}`}>
                  {cat.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.title}</h3>
                  <p className="text-sm text-slate-500 font-medium">{cat.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Airports */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">精选机场推荐</h2>
            <p className="text-slate-500">综合各方面指标为您推荐最优质的服务商</p>
          </div>
          <Link href="/airports" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold transition-colors">
            查看完整排名 <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {airports.map((airport: any, i: number) => (
            <AirportCard key={i} airport={airport} />
          ))}
          {airports.length === 0 && <p className="text-slate-500">暂无推荐，即将更新...</p>}
        </div>
      </section>

      {/* Newbie Guide Section */}
      <section className="container mx-auto px-4 mt-8">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl transform translate-x-20 -translate-y-20 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="inline-block px-4 py-1.5 bg-blue-600 text-white font-bold text-sm rounded-full mb-4 shadow-sm shadow-blue-600/20">
                新手入门第一站
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                第一次接触科学上网？
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-xl">
                从“什么是机场”到“如何挑选节点”，再到“怎么配置客户端”，我们为您准备了结构清晰、易懂的保姆级入门知识库。
              </p>
              <Link href="/topics/beginner-guide" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md">
                前往新手指南专题
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
            <div className="w-full md:w-1/3 grid grid-cols-1 gap-4">
              <Link href="/blog/what-is-an-airport" className="p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600">1. 什么是机场？</h4>
                <p className="text-xs text-slate-500 mt-1">机场与VPN的本质区别说明</p>
              </Link>
              <Link href="/blog/how-to-choose-airport-for-beginners" className="p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600">2. 应该怎么挑选？</h4>
                <p className="text-xs text-slate-500 mt-1">避开新手容易踩的几个选购坑</p>
              </Link>
              <Link href="/blog/clash-tutorial-import-subscription" className="p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600">3. 如何配置使用？</h4>
                <p className="text-xs text-slate-500 mt-1">订阅链接导入与基础客户端设置</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="container mx-auto px-4 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">最新教程与评测</h2>
            <p className="text-slate-500">掌握科学上网技巧，避开选购雷区</p>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold transition-colors">
            浏览所有文章 <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post: any, i: number) => (
            <ArticleCard key={i} post={post} />
          ))}
          {latestPosts.length === 0 && <p className="text-slate-500">暂无文章，敬请期待...</p>}
        </div>
      </section>
    </div>
  );
}
