import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";
import { AirportsClient } from "@/components/AirportsClient";

export const metadata = constructMetadata({
  title: "机场推荐：2026 年如何选择合适的稳定机场",
  description: "全网最新机场推荐指南。详细讲解机场是什么、机场怎么选、如何判断机场稳定性及流媒体解锁情况，并为您评测对比 28 个主流优质机场品牌。",
  canonicalUrl: "https://jichangnow.com/airports",
});

export default function AirportsPage() {
  const airports = getAllPosts("airports", ["name", "slug", "description", "updated", "features", "rating"]);

  return (
    <div className="flex flex-col pb-16">
      {/* Visual Header Layer */}
      <div className="w-full bg-gradient-to-b from-blue-50/80 to-white pt-16 pb-12 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <header className="prose prose-slate prose-lg max-w-none">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              机场推荐与选择指南
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-0">
              在众多科学上网工具中，「机场」凭借其协议先进、节点丰富、速度快等优势，成为了主流选择。
              本页面不仅为您提供真实的机场推荐列表，还将告诉您如何避坑，找到最适合自己需求的节点服务。
            </p>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <article className="prose prose-slate prose-lg max-w-none mb-16">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2">
            什么是机场？它和 VPN 有什么区别？
          </h2>
          <p>
            「机场」通常指提供 Shadowsocks、V2Ray、Trojan 等代理协议节点的服务商（因早期的 SS 客户端图标是纸飞机而得名）。相比于传统 VPN，机场的协议更难被特征识别，线路（如 IPLC/IEPL 专线）延迟更低，在流媒体解锁和日常科学上网体验上表现更佳。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mt-10">
            机场推荐应该看哪些核心维度？
          </h2>
          <ul>
            <li><strong>稳定性：</strong> 最重要的指标。晚高峰是否卡顿，特殊时期是否容易断联。</li>
            <li><strong>速度与线路：</strong> 是否提供 BGP 跨境专线、IEPL 或 IPLC？直连线路通常受本地网络环境影响很大。</li>
            <li><strong>流媒体解锁：</strong> 是否原生 IP？能否稳定观看 Netflix、Disney+ 或正常使用 ChatGPT 等 AI 工具。</li>
            <li><strong>套餐与性价比：</strong> 流量倍率如何计算，适合小流量月付还是大流量年付。</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mt-10 mb-8">
            2026 年精选机场推荐品牌库
          </h2>
          <p>以下是我们为您收录整理的 28 个主流机场品牌，点击对应卡片即可查看详细评测、优缺点及官方入口链接。</p>
        </article>

        {/* Client-side Filtering & Grid */}
        <AirportsClient airports={airports} />
        
        {/* Footer Navigation */}
        <section className="mt-20 pt-10 border-t border-slate-200 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">更多相关专题与教程</h2>
          <p className="text-slate-600 mb-6">如果您对如何使用机场客户端、或者如何判断线路好坏有疑问，欢迎查阅我们整理的专项内容。</p>
          <div className="flex gap-4 flex-wrap not-prose">
            <Link href="/topics/beginner-guide" className="px-5 py-2.5 bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm">
              新手怎么用？
            </Link>
            <Link href="/topics/stability" className="px-5 py-2.5 bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm">
              稳定性排查
            </Link>
            <Link href="/topics/streaming-ai" className="px-5 py-2.5 bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm">
              流媒体与 AI
            </Link>
            <Link href="/faq" className="px-5 py-2.5 bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm">
              常见问题大全
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
