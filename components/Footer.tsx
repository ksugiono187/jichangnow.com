import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-blue-600 mt-20">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <span className="text-2xl font-extrabold text-white block mb-4 tracking-tight">
              机场<span className="text-blue-500">推荐</span>站
            </span>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              提供最新、最稳定的机场推荐与评测，客观横向对比，帮助您选择最适合的科学上网节点服务。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">内容分类</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/airports" className="hover:text-blue-400 transition-colors">机场推荐</Link></li>
              <li><Link href="/compare" className="hover:text-blue-400 transition-colors">机场对比</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">使用教程</Link></li>
              <li><Link href="/topics" className="hover:text-blue-400 transition-colors">专题合集</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">关于网站</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">关于我们</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition-colors">常见问题</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">隐私政策</Link></li>
              <li><Link href="/disclaimer" className="hover:text-blue-400 transition-colors">免责声明</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">关注我们</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              持续更新高质量评测，不虚报测速数据，坚持客观原则。
            </p>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p>© {new Date().getFullYear()} 机场推荐站. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Design for Speed & Reliability.</p>
        </div>
      </div>
    </footer>
  );
}
