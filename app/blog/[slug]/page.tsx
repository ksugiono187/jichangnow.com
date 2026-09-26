import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ShareButton } from "@/components/ShareButton";

export async function generateStaticParams() {
  const slugs = getPostSlugs("blog");
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const post = getPostBySlug("blog", resolvedParams.slug, ["title", "description"]);
    return constructMetadata({
      title: post.title,
      description: post.description,
      canonicalUrl: `https://jichangnow.com/blog/${resolvedParams.slug}`,
    });
  } catch (e) {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post;
  try {
    post = getPostBySlug("blog", resolvedParams.slug, [
      "title", "description", "content", "date", "category", "author", "faqs", "slug"
    ]);
  } catch (e) {
    notFound();
  }

  // Next / Prev Post logic
  const allPosts = getAllPosts("blog", ["title", "slug"]);
  const currentIndex = allPosts.findIndex((p: any) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Reading time and word count
  const wordCount = post.content.replace(/[^\w\u4e00-\u9fa5]/g, "").length;
  const readTime = Math.max(1, Math.ceil(wordCount / 400)); // approx 400 words/min
  const currentUrl = `https://jichangnow.com/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "wordCount": wordCount,
    "author": {
      "@type": "Person",
      "name": post.author || "JichangNow"
    }
  };

  let faqJsonLd = null;
  if (post.faqs && Array.isArray(post.faqs) && post.faqs.length > 0) {
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map((f: any) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://jichangnow.com/" },
      { "@type": "ListItem", "position": 2, "name": "博客与教程", "item": "https://jichangnow.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": currentUrl }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      
      {/* Header Area */}
      <div className="bg-white border-b border-slate-200 pt-10 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav className="text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">首页</Link></li>
              <li><span className="mx-2 text-slate-300">/</span></li>
              <li><Link href="/blog" className="hover:text-blue-600 transition-colors">博客与教程</Link></li>
              <li><span className="mx-2 text-slate-300">/</span></li>
              <li className="text-blue-600 line-clamp-1" aria-current="page">{post.title}</li>
            </ol>
          </nav>

          {post.category && (
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-blue-100 mb-5">
              {post.category}
            </span>
          )}
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl">
            {post.description}
          </p>
          
          <div className="flex flex-wrap items-center text-sm font-medium text-slate-500 gap-y-3 gap-x-6 border-t border-slate-100 pt-6">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              发布于 {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              共 {wordCount} 字，预计阅读 {readTime} 分钟
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                {post.author}
              </span>
            )}
            <div className="ml-auto">
              <ShareButton title={post.title} text={post.description} url={currentUrl} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Article Content */}
          <article className="flex-1 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200">
            <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
              <MDXRemote source={post.content} />
            </div>
            
            {/* Prev / Next Links */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between not-prose">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="flex-1 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
                  <span className="text-xs font-bold text-slate-400 mb-1 block uppercase tracking-wider">上一篇</span>
                  <span className="font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2">{prevPost.title}</span>
                </Link>
              ) : <div className="flex-1" />}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="flex-1 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group text-right">
                  <span className="text-xs font-bold text-slate-400 mb-1 block uppercase tracking-wider">下一篇</span>
                  <span className="font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2">{nextPost.title}</span>
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </article>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-blue-600 rounded-full inline-block"></span>
                相关阅读与工具
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/airports" className="flex items-center text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors group">
                    <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    查看最新机场推荐列表
                  </Link>
                </li>
                <li>
                  <Link href="/compare" className="flex items-center text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors group">
                    <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    横向对比各家机场
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="flex items-center text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors group">
                    <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    浏览常见问题大全
                  </Link>
                </li>
                <li>
                  <Link href="/topics/guide" className="flex items-center text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors group">
                    <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    新手入门完全指南
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
              <h3 className="font-bold text-blue-900 mb-2">正在寻找稳定的机场？</h3>
              <p className="text-sm text-blue-700 mb-4">为您测试了市面上主流的 28 款服务商，并进行了横向评估。</p>
              <Link href="/airports" className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-colors">
                前往挑选
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
