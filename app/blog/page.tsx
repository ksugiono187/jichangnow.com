import { getAllPosts } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata = constructMetadata({
  title: "博客与教程 - 科学上网新手指南与进阶技巧",
  description: "提供最新的科学上网节点使用教程、客户端配置指南、以及网络加速常见问题解答。",
  canonicalUrl: "https://jichangnow.com/blog",
});

export default function BlogPage() {
  const posts = getAllPosts("blog", ["title", "slug", "description", "date", "category"]);

  return (
    <div className="flex flex-col pb-20">
      {/* Visual Header Layer */}
      <div className="w-full bg-slate-50 border-b border-slate-200 pt-16 pb-12 relative overflow-hidden">
        {/* Subtle decorative blob */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <header className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              博客与教程
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              掌握科学上网的正确姿势。在这里找到从零开始的配置指南，以及各平台客户端的使用教程。
            </p>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any, i: number) => (
            <ArticleCard key={i} post={post} />
          ))}
          {posts.length === 0 && (
            <p className="text-slate-500 col-span-full text-center py-10">
              暂无文章，敬请期待...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
