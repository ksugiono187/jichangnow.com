import { getPostBySlug, getPostSlugs } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  const slugs = getPostSlugs("topics");
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const post = getPostBySlug("topics", resolvedParams.slug, ["title", "description"]);
    return constructMetadata({
      title: `${post.title} - 机场相关专题`,
      description: post.description,
      canonicalUrl: `https://jichangnow.com/topics/${resolvedParams.slug}`,
    });
  } catch (e) {
    return {};
  }
}

export default async function TopicSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post;
  try {
    post = getPostBySlug("topics", resolvedParams.slug, [
      "title", "description", "content", "updated"
    ]);
  } catch (e) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "dateModified": post.updated
  };

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={jsonLd} />
      
      <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-blue-600">首页</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link href="/topics" className="hover:text-blue-600">专题</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-slate-900 line-clamp-1" aria-current="page">{post.title}</li>
        </ol>
      </nav>

      <header className="mb-10 pb-10 border-b">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">{post.title}</h1>
        <p className="text-xl text-slate-600 leading-relaxed">{post.description}</p>
        {post.updated && (
          <div className="text-sm text-slate-500 mt-6">
            更新于：<time dateTime={post.updated}>{post.updated}</time>
          </div>
        )}
      </header>

      <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
