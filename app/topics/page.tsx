import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "科学上网与机场相关专题合集",
  description: "从新手入门到进阶测速，覆盖各种流媒体解锁与客户端配置教程的机场专题指南。",
  canonicalUrl: "https://jichangnow.com/topics",
});

export default function TopicsPage() {
  const topics = getAllPosts("topics", ["title", "slug", "description", "updated"]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">内容专题</h1>
        <p className="text-lg text-slate-600">
          我们针对不同用户的搜索意图与需求，整理了多个系统化的指南专题。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic: any, i: number) => (
          <Link key={i} href={`/topics/${topic.slug}`} className="group block h-full">
            <article className="border rounded-xl p-6 bg-white h-full flex flex-col hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {topic.title}
              </h2>
              <p className="text-slate-600 mb-6 flex-1">
                {topic.description}
              </p>
              <div className="text-sm text-blue-600 font-medium">
                查看专题内容 &rarr;
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
