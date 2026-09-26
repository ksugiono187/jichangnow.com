const fs = require('fs');
const path = require('path');

const clusters = [
  // 对比系列
  { slug: 'compare-price', title: '机场价格对比与低价风险分析', keywords: ['机场推荐', '机场价格对比', '便宜机场靠谱吗', '低价机场有什么风险'] },
  { slug: 'compare-traffic', title: '机场流量对比与倍率计算', keywords: ['机场推荐', '机场流量对比', '机场流量倍率怎么计算', '机场流量用完怎么办'] },
  { slug: 'compare-routes', title: '机场线路对比：专线、直连与中转', keywords: ['机场推荐', '机场线路对比', '专线机场是什么意思', 'IPLC和IEPL有什么区别', '中转机场是什么意思'] },
  { slug: 'compare-protocols', title: '机场协议对比分析', keywords: ['机场推荐', '机场协议对比', 'VLESS', 'Trojan', 'Shadowsocks'] },
  { slug: 'compare-clients', title: '机场客户端对比与选择', keywords: ['机场推荐', '机场客户端对比', 'Clash', 'Shadowrocket', 'v2rayN'] },
  { slug: 'compare-plans', title: '机场套餐对比：包月还是按量？', keywords: ['机场推荐', '机场套餐对比', '机场推荐页面应该怎么对比套餐'] },

  // 教程系列
  { slug: 'tutorial-clash', title: 'Clash机场推荐与导入教程', keywords: ['机场推荐', 'Clash机场推荐', '机场订阅链接怎么导入Clash'] },
  { slug: 'tutorial-shadowrocket', title: 'Shadowrocket小火箭机场推荐与教程', keywords: ['机场推荐', 'Shadowrocket机场推荐', '小火箭机场推荐', '机场订阅链接怎么导入Shadowrocket'] },
  { slug: 'tutorial-v2rayn', title: 'v2rayN机场推荐与Windows配置', keywords: ['机场推荐', 'v2rayN机场推荐', '机场订阅链接怎么导入v2rayN'] },
  { slug: 'tutorial-stash', title: 'Stash机场推荐与使用指南', keywords: ['机场推荐', 'Stash机场推荐'] },
  { slug: 'tutorial-singbox', title: 'sing-box机场推荐与配置教程', keywords: ['机场推荐', 'sing-box机场推荐'] },

  // AI系列
  { slug: 'ai-chatgpt', title: 'ChatGPT机场推荐与节点要求', keywords: ['机场推荐', 'ChatGPT机场推荐', '机场能用ChatGPT吗'] },
  { slug: 'ai-claude', title: 'Claude机场推荐与封号防范', keywords: ['机场推荐', 'Claude机场推荐', '机场能用Claude吗'] },
  { slug: 'ai-gemini', title: 'Gemini机场推荐与解锁条件', keywords: ['机场推荐', 'Gemini机场推荐', '机场能用Gemini吗'] },

  // 流媒体系列
  { slug: 'streaming-netflix', title: 'Netflix机场推荐与原生IP解析', keywords: ['机场推荐', 'Netflix机场推荐', '机场能解锁Netflix吗', '机场原生IP是什么意思'] },
  { slug: 'streaming-disney', title: 'Disney+机场推荐与流媒体解锁', keywords: ['机场推荐', 'Disney+机场推荐'] },
  { slug: 'streaming-youtube', title: 'YouTube机场推荐与4K测速', keywords: ['机场推荐', 'YouTube机场推荐'] },
  { slug: 'streaming-tiktok', title: 'TikTok机场推荐与免拔卡环境', keywords: ['机场推荐', 'TikTok机场推荐'] },

  // 基础知识
  { slug: 'basics-what-is-airport', title: '新手入门：机场是什么？和VPN有什么区别', keywords: ['机场推荐', '机场是什么', '机场和VPN有什么区别', '机场和梯子是一回事吗', '新手怎么选择机场'] },
  { slug: 'basics-subscription', title: '机场订阅链接与节点名词解释', keywords: ['机场推荐', '机场订阅链接是什么', '机场节点是什么意思', '机场节点倍率是什么意思'] },
  { slug: 'basics-how-to-choose', title: '2026年机场推荐怎么选？核心参考指标', keywords: ['机场推荐', '2026年机场推荐怎么选', '机场推荐应该看哪些因素', '机场排行榜靠谱吗', '机场评测可信吗', '机场品牌页应该写什么', '2026机场推荐应该怎么更新'] },

  // 故障解决
  { slug: 'troubleshoot-connection', title: '机场连接失败与官网打不开怎么解决', keywords: ['机场推荐', '机场连接失败', '机场官网打不开怎么办', '机场订阅失效', '机场跑路是什么意思', '怎么判断机场是否会跑路'] },
  { slug: 'troubleshoot-timeout', title: '机场节点超时与全红排查指南', keywords: ['机场推荐', '机场节点超时', '机场节点全红', '机场节点延迟怎么看', '机场晚高峰卡顿怎么办', '机场为什么晚上变慢'] }
];

const topicsDir = path.join(process.cwd(), 'content', 'topics');
if (!fs.existsSync(topicsDir)) {
  fs.mkdirSync(topicsDir, { recursive: true });
}

clusters.forEach(c => {
  const fileContent = `---
title: "${c.title}"
description: "详细解答关于 ${c.title} 的相关知识与常见问题，结合2026年最新的机场推荐与测试资料为您提供真实参考。"
keywords: ${JSON.stringify(c.keywords)}
updated: "2026-09-22"
---

# ${c.title}

本专题围绕**机场推荐**核心使用场景，为您详细解答相关疑问。

## 常见长尾问题解答 (FAQ)

${c.keywords.filter(k => k !== '机场推荐').map(k => `### ${k}\n\n关于“${k}”的详细测试与技术原理剖析正在由本站编辑基于 28 个品牌的真实数据库进行整理。建议参考[最新机场推荐主页](/airports)中的对应品牌测速日志。`).join('\n\n')}

## 关联阅读与测试数据

为了避免片面的营销信息，本站所有的资料均具备严格的核验边界。
- 想要了解具体价格表现？请前往 [机场推荐列表](/airports) 查看各品牌详情页的“第三方资料”板块。
- 更多配置问题，请参考我们的其他专题页面。
`;
  
  fs.writeFileSync(path.join(topicsDir, `${c.slug}.mdx`), fileContent, 'utf8');
});

console.log('Successfully generated ' + clusters.length + ' topic cluster MDX files.');
