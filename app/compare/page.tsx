import { constructMetadata } from "@/lib/seo";
import fs from 'fs';
import path from 'path';
import CompareClient from "@/components/CompareClient";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = constructMetadata({
  title: "机场对比 2026：价格、流量、线路、节点与功能对比",
  description: "机场对比页面，整理不同机场的套餐、流量、线路、节点地区、客户端支持、AI 与流媒体支持等公开信息，帮助用户根据自己的需求进行选择。",
  canonicalUrl: "https://jichangnow.com/compare",
});

export default function ComparePage() {
  const dbPath = path.join(process.cwd(), 'data', 'airports-db.json');
  let airports = [];
  try {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    airports = JSON.parse(rawData);
  } catch (e) {
    console.error("Failed to load airport DB");
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "机场对比主要看哪些因素？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "主要看价格预算、流量需求、线路质量（如IPLC/IEPL还是普通中转）、晚高峰稳定性、流媒体及AI工具的支持情况，以及客户端的易用性。"
        }
      },
      {
        "@type": "Question",
        "name": "机场价格越低越好吗？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "并非如此。低于行业平均成本的机场往往面临带宽超售、线路拥堵甚至随时跑路的风险。价格应结合自己的真实流量需求进行综合评估。"
        }
      },
      {
        "@type": "Question",
        "name": "机场官方宣传和第三方测试有什么区别？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "官方宣传往往展现最佳状态（如宣称支持全流媒体解锁），而第三方测试则记录了特定时间点、特定测试环境下的实际表现，两者可能存在冲突，建议结合查看。"
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://jichangnow.com/" },
      { "@type": "ListItem", "position": 2, "name": "机场推荐", "item": "https://jichangnow.com/airports" },
      { "@type": "ListItem", "position": 3, "name": "机场对比", "item": "https://jichangnow.com/compare" }
    ]
  };

  return (
    <div className="flex flex-col pb-20">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Visual Header Layer */}
      <div className="w-full bg-slate-50 border-b border-slate-200 pt-16 pb-12 relative overflow-hidden">
        {/* Subtle decorative grid/blob */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full mix-blend-multiply filter blur-[80px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          <nav className="text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">首页</Link></li>
              <li><span className="mx-2 text-slate-300">/</span></li>
              <li><Link href="/airports" className="hover:text-blue-600 transition-colors">机场推荐</Link></li>
              <li><span className="mx-2 text-slate-300">/</span></li>
              <li className="text-blue-600" aria-current="page">机场对比</li>
            </ol>
          </nav>

          <header className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">机场对比</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              机场之间在套餐价格、流量、线路类型、节点地区、设备支持、AI 与流媒体等方面存在差异，用户应该根据自己的实际需求进行比较，而非盲目迷信单一排行榜。以下为您呈现本站客观整理的 28 款主流机场横向对比资料库。
            </p>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Suspense fallback={<div className="p-8 text-center text-slate-500">加载对比工具中...</div>}>
          <CompareClient airports={airports} />
        </Suspense>

        <article className="mt-20 pt-16 border-t border-slate-200 prose prose-slate prose-lg max-w-none">
          <h2>机场对比应该看什么？</h2>
          <p>面对众多机场品牌，建议您从以下核心维度进行横向评估：</p>
          <ul>
            <li><strong>价格与流量</strong>：包月还是按量计费？是否提供适合自己消耗量的套餐？</li>
            <li><strong>线路与节点地区</strong>：直连、中转还是 IPLC/IEPL 专线？是否具备您需要的冷门国家节点？</li>
            <li><strong>晚高峰表现</strong>：第三方测速资料中，晚高峰时段的丢包率和速度衰减程度。</li>
            <li><strong>客户端支持</strong>：是否提供方便小白的“一键客户端”，或者全面兼容 Clash, Shadowrocket, v2rayN 等通用工具。</li>
            <li><strong>AI 工具与流媒体</strong>：是否提供原生 IP？能否稳定解锁 Netflix, Disney+, ChatGPT, Claude 等严格风控应用。</li>
            <li><strong>售后与官网可访问性</strong>：是否有可靠的客服工单系统及防失联发布页。</li>
          </ul>

          <h2>不同用户应该关注什么？</h2>
          <ul>
            <li><strong>新手用户</strong>：首选提供自研“傻瓜式一键客户端”的品牌，避免繁琐的订阅配置。</li>
            <li><strong>小流量用户</strong>：适合低价轻量月付或不限时（一次性）流量包，切勿购买大容量年付套餐。</li>
            <li><strong>大流量用户</strong>：关注流量倍率，优先选择大宽带中转机场，避免高倍率专线导致的流量快速消耗。</li>
            <li><strong>AI 用户</strong>：必须关注对 ChatGPT, Claude, Gemini 等工具的原生 IP 支持记录，且需注意 AI 服务商随时可能升级风控。</li>
            <li><strong>流媒体用户</strong>：注重节点地区覆盖率及长期解锁稳定性，专线机场在流媒体体验上通常更佳。</li>
            <li><strong>多设备用户</strong>：关注机场的“同时在线设备限制”条款，避免设备过多被封号。</li>
          </ul>

          <h2>机场对比数据多久更新一次？</h2>
          <p>
            本页展示的价格、套餐、节点分布和各项解锁功能均基于公开第三方资料或官方说明定期核验。由于机场运营策略变化频繁，表格中已标出“最后核验时间”。所有信息请以机场当前公开结算页面为最终标准，本站数据仅供参考，不作为绝对服务保证。
          </p>

          <hr className="my-12 border-slate-200" />

          <h2>常见问题 (FAQ)</h2>
          
          <h3>机场对比主要看哪些因素？</h3>
          <p>主要看价格预算、流量需求、线路质量（如IPLC/IEPL还是普通中转）、晚高峰稳定性、流媒体及AI工具的支持情况，以及客户端的易用性。</p>

          <h3>机场价格越低越好吗？</h3>
          <p>并非如此。低于行业平均成本的便宜机场往往面临带宽超售、线路拥堵甚至随时跑路的风险。推荐在合理预算内，根据真实流量需求进行综合评估。</p>

          <h3>机场流量越多越好吗？</h3>
          <p>如果不经常下载大文件或观看 4K 视频，过多的流量毫无意义。且某些机场的冷门节点存在高额“流量倍率”（如消耗1GB实际扣除3GB），需仔细阅读服务条款。</p>

          <h3>IPLC 和 IEPL 有什么区别？</h3>
          <p>两者均为跨境内网专线，不经过公网 GFW，因此在敏感时期更为稳定。IPLC 是纯粹的物理层专线，IEPL 是二层以太网专线，对普通用户而言，两者的日常使用体验极为接近，均优于普通公网中转。</p>

          <h3>机场节点越多越好吗？</h3>
          <p>不是。绝大多数用户只需使用香港、日本、新加坡、美国四个核心地区的节点即可满足 95% 的需求。节点过多反而容易混入低质量凑数服务器。</p>

          <h3>机场官方宣传和第三方测试有什么区别？</h3>
          <p>官方宣传往往展现最佳状态（如宣称支持全流媒体解锁），而第三方测试则记录了特定时间点、特定测试环境下的实际表现，两者可能存在冲突。本站强烈建议优先参考结合了明确测试时间的第三方资料。</p>

          <h3>机场推荐和机场对比有什么区别？</h3>
          <p>机场推荐主要提供具体的品牌介绍与独立深度资料，而机场对比页面侧重于横向维度的数据罗列与筛选，帮助您快速找到符合筛选池特征的候选者。</p>
        </article>
      </div>
    </div>
  );
}
