import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decoded = decodeURIComponent(resolvedParams.slug);
  return constructMetadata({
    title: `标签: ${decoded}`,
    description: `${decoded} 标签相关内容。`,
  });
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decoded = decodeURIComponent(resolvedParams.slug);
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">标签：{decoded}</h1>
      <p className="text-slate-600">该标签下的文章列表...</p>
    </div>
  );
}
