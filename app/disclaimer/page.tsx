import { constructMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "免责声明｜机场推荐",
  description: "本站免责声明，说明机场资料、第三方信息、外部链接、价格套餐和内容更新等相关事项。",
  canonicalUrl: "https://jichangnow.com/disclaimer",
});

export default function DisclaimerPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://jichangnow.com/" },
      { "@type": "ListItem", "position": 2, "name": "免责声明", "item": "https://jichangnow.com/disclaimer" }
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
          <li className="text-slate-900" aria-current="page">免责声明</li>
        </ol>
      </nav>

      <article className="prose prose-slate prose-lg max-w-none">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">免责声明</h1>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">1. 信息来源</h2>
        <p>
          本站内容主要基于机场官方公开信息、第三方公开资料、公开测试信息以及网站编辑的归纳整理。鉴于信息的复杂性，不同来源的信息可能存在差异。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">2. 信息准确性</h2>
        <p>
          本站会尽力确保整理的内容客观准确，但无法保证所有机场的价格、套餐、节点、线路、域名和功能信息始终保持最新。相关信息可能随时间发生变化。
        </p>
        <p>
          用户在注册、购买或使用服务前，应以对应服务商当前官方页面和最新公告为准。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">3. 第三方机场服务</h2>
        <p>
          本站介绍或对比的机场服务均属于第三方服务。本站不直接运营这些机场服务（除非页面明确说明）。
        </p>
        <p>
          机场服务的服务质量、价格、套餐、节点、线路、退款政策、客服、服务连续性及使用规则，均由对应服务商独立负责。本站不对第三方服务商的行为承担法律责任。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">4. 第三方链接</h2>
        <p>
          本站可能提供第三方网站链接。用户点击第三方链接后，将离开本站。第三方网站的内容、服务、隐私政策和使用规则由第三方自行负责，本站不对第三方网站内容作绝对保证。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">5. 价格与套餐</h2>
        <p>
          <strong>特别说明：</strong>机场价格、流量、套餐、优惠活动以及服务内容可能随时调整。页面中的价格如果存在资料时间，我们已明确标注资料时间（如最后核验时间）。用户购买之前应以机场官方当前页面显示的信息为最终准则。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">6. 测速与评测</h2>
        <p>
          明确说明：第三方测速结果会受到测试时间、测试地点、本地网络、测试设备、节点、线路以及当时的网络大环境等多种因素影响。
        </p>
        <p>
          一次测试结果不能代表长期服务表现。本站不会将单次测试结果描述为永久性的服务质量结论。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">7. AI 与流媒体</h2>
        <p>
          AI 工具、流媒体平台以及其他第三方服务可能根据地区、IP、账号、平台政策等因素产生不同结果。本站不能保证任何机场、节点或线路能够永久访问或稳定解锁某个第三方服务。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">8. 用户自行判断</h2>
        <p>
          本站提供的信息仅用于信息整理和参考。用户应该根据自己的实际网络需求、预算、适用设备以及服务商当前的公开信息，自行进行风险评估和消费判断。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">9. 佣金与推广链接</h2>
        <p>
          部分机场链接可能属于联盟推广链接（Affiliate Link）。当用户通过某些推广链接注册或购买服务时，本站可能获得相应的推广佣金，而用户支付的价格不一定因此发生变化。
        </p>
        <p>
          存在推广关系并不意味着本站会虚构测速、评分、用户评价或服务数据。我们坚持依据客观规则呈现事实。如果某个页面没有推广链接，我们亦不声称该页面存在佣金关系。
        </p>
      </article>
    </div>
  );
}
