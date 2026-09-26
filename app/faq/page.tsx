import { constructMetadata } from "@/lib/seo";
import { faqData } from "@/lib/faqData";
import { JsonLd } from "@/components/JsonLd";
import FaqAccordion from "@/components/FaqAccordion";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "机场常见问题 FAQ：机场选择、使用与订阅问题解答",
  description: "整理机场推荐、机场选择、订阅链接、节点、套餐、客户端、AI、流媒体以及常见故障等问题，帮助新手快速了解机场相关知识。",
  canonicalUrl: "https://jichangnow.com/faq",
});

export default function FAQPage() {
  const schemaFaqs = faqData.flatMap(cat => cat.items).map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answerText
    }
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": schemaFaqs
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://jichangnow.com/" },
      { "@type": "ListItem", "position": 2, "name": "常见问题 FAQ", "item": "https://jichangnow.com/faq" }
    ]
  };

  return (
    <div className="flex flex-col pb-20">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      
      {/* Visual Header Layer */}
      <div className="w-full bg-slate-50 border-b border-slate-200 pt-16 pb-16 relative overflow-hidden">
        {/* Subtle decorative blob */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[300px] bg-emerald-400/10 rounded-full mix-blend-multiply filter blur-[80px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-sm text-slate-500 mb-8 flex justify-center font-medium" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">首页</Link></li>
              <li><span className="mx-2 text-slate-300">/</span></li>
              <li className="text-blue-600" aria-current="page">常见问题 FAQ</li>
            </ol>
          </nav>

          <header className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">机场常见问题 FAQ</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              这里是我们为您整理的知识库，主要解答机场选择、购买、使用、节点、客户端和故障排查等常见问题。所有答案均立足于客观事实，不虚构评测数据。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/airports" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300">
                前往查看机场推荐
              </Link>
              <Link href="/compare" className="px-6 py-3 bg-white text-slate-700 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm">
                使用横向对比工具
              </Link>
            </div>
          </header>
        </div>
      </div>

      <main className="container mx-auto px-4 pt-12 max-w-5xl">
        <FaqAccordion data={faqData} />
      </main>
      
      <section className="container mx-auto px-4 mt-20 pt-10 border-t border-slate-200 text-center text-slate-500 text-sm max-w-2xl">
        <p className="leading-relaxed">
          以上问题解答如有变更或失效，请随时关注各大机场的最新服务条款及官方通告。部分技术教程详细内容可参阅本站的 <Link href="/blog" className="text-blue-600 font-bold hover:underline">博客指南</Link>。
        </p>
      </section>
    </div>
  );
}
