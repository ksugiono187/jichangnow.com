import { constructMetadata } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decoded = decodeURIComponent(resolvedParams.slug);
  return constructMetadata({
    title: `分类: ${decoded}`,
    description: `${decoded} 分类下的全部内容。`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decoded = decodeURIComponent(resolvedParams.slug);
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">分类：{decoded}</h1>
      <p className="text-slate-600">该分类下的文章列表...</p>
    </div>
  );
}
