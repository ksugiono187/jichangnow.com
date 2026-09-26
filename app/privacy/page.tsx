import { constructMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "隐私政策｜机场推荐",
  description: "了解本站如何处理访问数据、Cookie、分析工具以及用户在浏览网站过程中可能产生的信息。",
  canonicalUrl: "https://jichangnow.com/privacy",
});

export default function PrivacyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://jichangnow.com/" },
      { "@type": "ListItem", "position": 2, "name": "隐私政策", "item": "https://jichangnow.com/privacy" }
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
          <li className="text-slate-900" aria-current="page">隐私政策</li>
        </ol>
      </nav>

      <article className="prose prose-slate prose-lg max-w-none">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">隐私政策</h1>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">1. 政策说明</h2>
        <p>
          本站重视用户隐私，并在此说明本站在用户访问网站过程中可能涉及的信息处理方式。本文使用清晰易懂的语言，帮助您了解在使用本站时可能产生的信息及其用途。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">2. 网站访问信息</h2>
        <p>
          在您浏览本站时，我们的服务器和日志系统可能被动记录以下常规网络请求信息：
        </p>
        <ul>
          <li>IP 地址</li>
          <li>浏览器类型</li>
          <li>操作系统</li>
          <li>访问页面及访问时间</li>
          <li>来源页面（Referer）</li>
          <li>设备相关基础信息</li>
        </ul>
        <p>
          本站不会主动收集或索取您的真实姓名、电话号码、家庭住址等敏感个人身份信息。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">3. Cookie</h2>
        <p>
          本站可能使用 Cookie 或类似技术（如本地存储 LocalStorage），主要用于：
        </p>
        <ul>
          <li>保障网站的基础正常运行</li>
          <li>保存您在页面中做出的必要交互设置</li>
          <li>改善用户体验</li>
        </ul>
        <p>
          您可以通过浏览器设置拒绝或清除 Cookie，但这可能影响网站部分交互功能的正常使用。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">4. 第三方服务</h2>
        <p>
          本站目前主要以提供静态内容资讯为主，可能根据后续运营需求接入搜索引擎站长工具（如 Google Search Console、Bing Webmaster）等分析服务以优化网站性能。当实际接入第三方分析服务时，相关数据的收集遵循该第三方平台自身的隐私协议。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">5. 外部链接</h2>
        <p>
          本站可能包含指向第三方网站的链接（例如相关工具官网、参考资料等）。用户访问第三方网站后，其数据处理方式由第三方网站自己的隐私政策决定。本站不控制第三方网站的隐私政策，也不对其内容负责。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">6. 机场及第三方服务</h2>
        <p>
          本站可能提供指向机场官方网站或第三方服务页面的链接。用户点击并访问第三方网站后，相关账号注册、付款、个人资料以及其他信息由对应第三方服务商处理。
        </p>
        <p>
          本站不会声称能够控制第三方服务商的数据处理行为，强烈建议您在第三方平台输入敏感信息前仔细阅读其隐私条款。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">7. 信息安全</h2>
        <p>
          本站会采取合理措施维护网站运行安全。但互联网传输不存在绝对安全，因此不能保证网络环境下的信息传输绝对不会发生风险。请您妥善保管个人网络信息。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">8. 儿童隐私</h2>
        <p>
          本站提供的网络工具及加速器知识资讯面向具备完全民事行为能力的成年人。我们不会故意收集不必要的儿童个人信息。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">9. 隐私政策更新</h2>
        <p>
          本站可能根据网站功能变化、第三方服务调整或法律法规要求更新隐私政策。更新后会在本页面公布。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">10. 联系方式</h2>
        <p>
          如果您对本隐私政策有任何疑问，可通过以下方式联系我们：
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
