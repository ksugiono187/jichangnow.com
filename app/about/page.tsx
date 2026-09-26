import { constructMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "关于我们｜机场推荐与机场信息整理",
  description: "了解本站的内容定位、机场资料整理方式、机场对比与教程内容，以及本站的信息来源和更新原则。",
  canonicalUrl: "https://jichangnow.com/about",
});

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://jichangnow.com/" },
      { "@type": "ListItem", "position": 2, "name": "关于我们", "item": "https://jichangnow.com/about" }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={breadcrumbJsonLd} />
      
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-blue-600">首页</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-slate-900" aria-current="page">关于我们</li>
        </ol>
      </nav>

      <article className="prose prose-slate prose-lg max-w-none">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">关于我们</h1>
        
        <p className="lead">
          本站主要整理机场相关的公开信息，包括机场推荐、机场对比、机场详情、使用教程、节点与线路知识、常见问题等内容。本站的主要目的，是帮助用户更方便地了解不同机场服务之间公开可见的信息和差异。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">关于本站</h2>
        <p>本站提供的信息主要包括：</p>
        <ul>
          <li>机场基础知识</li>
          <li>机场推荐信息</li>
          <li>机场套餐与流量信息</li>
          <li>机场线路与节点信息</li>
          <li>机场对比</li>
          <li>机场使用教程</li>
          <li>客户端教程</li>
          <li>AI 与流媒体相关信息</li>
          <li>常见问题</li>
          <li>机场服务相关公开资料</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">我们如何整理机场信息</h2>
        <p>
          本站会尽可能参考机场官方公开信息以及可信的第三方公开资料。
        </p>
        <p>
          对于价格、套餐、节点、线路、客户端支持等可能发生变化的信息，会尽可能注明资料时间。
        </p>
        <p>
          如果官方资料与第三方资料存在差异，本站不会自行制造结论，而是明确说明信息来源和差异所在，供用户自行判断。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">关于机场评测</h2>
        <p>
          本站<strong>不会</strong>为了制作排行榜而虚构以下数据：
        </p>
        <ul>
          <li>测速数据</li>
          <li>用户评价</li>
          <li>评分</li>
          <li>稳定性百分比</li>
          <li>节点数量</li>
          <li>流媒体解锁结果</li>
          <li>AI 工具使用结果</li>
        </ul>
        <p>
          如果页面引用了第三方测试，我们会明确标注为第三方资料。如果缺少可靠公开资料，我们会如实显示 <code>暂无可靠公开资料</code>，而不是自行补充或编造数据。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">内容更新</h2>
        <p>
          机场价格、套餐、节点、域名、线路以及客户端支持情况随时可能发生变化。因此，用户在购买或使用服务之前，应进一步查看相关机场当前的官方公开信息。
        </p>
        <p>
          本站会根据公开资料变化持续更新相关内容。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">联系方式</h2>
        <p>
          如果您对本站内容有任何疑问或建议，可通过以下方式联系我们：
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Telegram:</strong> <a href="https://t.me/Hy_0027" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@Hy_0027</a>
          </li>
          <li>
            <strong>Email:</strong> <a href="mailto:ksugiono187@gmail.com" className="text-blue-600 hover:underline">ksugiono187@gmail.com</a>
          </li>
        </ul>
      </article>
    </div>
  );
}
