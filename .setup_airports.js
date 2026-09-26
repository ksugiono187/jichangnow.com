const fs = require('fs');
const path = require('path');

const airports = [
  {
    rank: 1, name: '微风网络 Breezenet', slug: 'breezenet', url: 'https://edp01.breezenetaff.com/#/?code=4KDOroY0',
    content: `## 品牌简介
微风网络 Breezenet 的官方公开入口需要注册后才能查看详细套餐，因此套餐、流量、节点数量等不能仅凭公开入口直接确认。

## 线路与协议 (第三方资料)
第三方公开资料显示，该机场存在 IEPL/专线 相关描述，并支持 VLESS, Trojan, Hysteria2 等协议，包含国内中转节点描述。

## 套餐与价格
部分第三方资料记录了其包含 100GB/月 的套餐，以及 100GB/月 的年付方案等。具体请以官方注册后的控制面板为准。

## 测速与稳定性
目前公开核验资料指出，尚无足够可靠的公开测速数字。长期平均速度、长期稳定性、永久在线率、实际所有节点数量以及所有流媒体/AI服务解锁情况**暂不可确认**，建议在实际使用前进一步测试。`
  },
  {
    rank: 2, name: '飞猫云', slug: 'flycat', url: 'https://flycat1.flycatvipaff.cc/#/?code=Os3T3OxW',
    content: `## 品牌简介
飞猫云是目前公开资料相对完整的品牌之一。官方宣称提供 IEPL 专线服务，并支持多设备使用。

## 套餐与价格 (第三方核验)
根据 2026-07-12 的第三方资料记录，其套餐包括：
- **学生版**：50GB/月，年付 ¥84（折合约 ¥7/月）
- **150GB**：月付 ¥25
- **300GB**：月付 ¥45
- **600GB**：月付 ¥85
- **1000GB**：月付 ¥150
- 另有一次性流量套餐提供。

## 测速与稳定性 (第三方实测)
存在第三方晚高峰测速记录。测试来源明确说明测试使用了自己的订阅进行，因此可标记为第三方实测（非本站实测）。2026 年仍有公开持续资料更新。`
  },
  {
    rank: 3, name: '暮光网络', slug: 'twilight', url: 'https://varnexa.twilightaff.com/#/?code=3qqonTlH',
    content: `## 品牌简介
暮光网络在公开机场资料库中（截至2026年9月）有相关套餐核验信息，包含专线/高端机场类描述。

## 套餐与价格 (第三方资料)
目前公开资料显示其存在 70GB/月 左右的入门方案，年付约 ¥109。部分套餐已经有第三方核验。

## 测速与稳定性
所有节点状态、长期测速、实际在线率、全部协议及全部客户端兼容性**暂未充分确认**。建议以官方当前说明为准。`
  },
  {
    rank: 4, name: '无忧链接', slug: 'worryfree', url: 'https://wep01.worryfreeaff.com/#/?code=56A0RTpU',
    content: `## 品牌简介
无忧链接在第三方公开资料中能够找到关于 IPLC 线路及 VLESS 协议的相关描述。

## 套餐与价格
机场资料库记录显示，其存在约 40GB/月、年付约 ¥79 等套餐资料。

## 解锁与使用场景
第三方资料显示其支持 ChatGPT, Gemini, TikTok, Netflix 等。

## 测速与稳定性
永久稳定性、所有节点速度以及所有 AI 和流媒体的解锁情况**不可直接确认**。不能将公开营销资料直接视作独立测速，建议小额试用。`
  },
  {
    rank: 5, name: '灵猫 Civet', slug: 'civet', url: 'https://vip02.civetaff.com/#/?code=kZlRw46w',
    content: `## 品牌简介
灵猫 Civet 官方宣称提供全 IPLC 线路，并具备原生 IP 描述。

## 线路与解锁 (第三方首轮实测)
根据 2026-07-31 的第三方评测资料（非常具体）：
- **协议**：VLESS
- **地区**：香港、新加坡、日本、台湾、美国
- **节点**：约50个节点测试记录，包含 UDP 相关测试
- **解锁**：Netflix, Hulu, HBO, Disney+

## 套餐与价格
起步价格资料约为 ¥25/月。（注：价格与节点数量属于 2026-07-31 测试资料，不能写成永久固定数据，官方资料和首轮实测已被明确区分）。`
  },
  {
    rank: 6, name: '闪跃 FlashLeap', slug: 'flashleap', url: 'https://vip02.flashleapaff.com/#/?code=FkCGEeaC',
    content: `## 品牌简介
闪跃 FlashLeap 在官方及公开资料中宣称提供 IPLC 线路，支持多种付款方式。

## 客户端支持
官方资料显示其提供官方客户端，支持 Windows, macOS, iOS, Android。

## 套餐与解锁 (第三方资料)
公开资料宣称支持 AI 与流媒体解锁。2026年机场导航/资料库记录其存在约 ¥96/年、60GB/月的套餐资料。官方“低延迟、稳定”等宣传不代表本站实测，请以实际体验为准。`
  },
  {
    rank: 7, name: 'Firefly机场', slug: 'firefly', url: 'https://vip02.fireflyaff.com/#/?code=Fes6j9rn',
    content: `## 品牌简介
Firefly机场的官方入口需要注册后才能继续查看详细套餐信息。

## 套餐与价格 (第三方资料)
目前公开第三方资料对年付套餐约 8元/月、60GB 的记录比较一致。

## 客户端支持 (资料冲突)
不同第三方资料对客户端兼容方式存在差异：一个第三方来源称主要使用官方自研客户端；另一个来源表示可能可以联系客服获取通用订阅。**结论：不同第三方资料对客户端兼容方式存在差异，建议购买前向官方客服确认当前订阅格式。**`
  },
  {
    rank: 8, name: '跨界云', slug: 'kuajie', url: 'https://vip02.kuajieaff.com/#/?code=VfWeYwHM',
    content: `## 品牌简介
跨界云提供官方客户端及通用订阅服务（属于当前公开资料），支持 Clash, Shadowrocket, v2rayN, sing-box, Stash, Quantumult X。

## 套餐与价格 (第三方资料)
根据 2026-08 资料记录：
- 流量：120GB/月
- 价格：约 ¥20/月
- 优惠：存在优惠码 \`kuajie\`，使用优惠后约 ¥16/月
**注意**：具体价格和优惠必须以当前官网结算页为准。`
  },
  {
    rank: 9, name: '星岛梦 StarDream', slug: 'stardream', url: 'https://kfccbb.xingdaomeng.com/#/?code=JTRIWFim',
    content: `## 品牌简介
星岛梦 StarDream 目前公开资料较多，存在企业级专线描述及多地区节点分布。

## 测速与解锁 (第三方实测)
机场资料库 2026年9月 仍记录其有第三方实测资料，包含 AI 与流媒体解锁表现。
*注：某第三方网站曾对其给出“主推/最佳”等评价，本站仅作客观记录其被评价过的事实，禁止将其复制为本站观点。*`
  },
  {
    rank: 10, name: '光速云 LightSpeed', slug: 'lightspeed', url: 'https://mdlky.gsyaff.com/#/?code=6tRWbtgK',
    content: `## 品牌简介
光速云 LightSpeed 在公开资料中存在 IPLC/IEPL 线路描述，支持 Trojan 和 VLESS 协议。
*注意：搜索结果中存在不同“光速云”混淆案例，明确提醒存在同名/相近品牌。*

## 节点与解锁 (第三方资料)
记录显示拥有 60+ 节点（涵盖香港、台湾、日本、新加坡、美国、英国、德国、韩国），支持流媒体及 ChatGPT。

## 套餐与价格
部分资料记录为 ¥17～¥18/月左右起。不同第三方来源价格存在变化，必须以官方结算页为准。`
  },
  {
    rank: 11, name: '唯兔云 V2云', slug: 'v2yun', url: 'https://fast.v2yunvipaff.com/#/?code=xYEe8gyb',
    content: `## 品牌简介
唯兔云（V2云）在 GitHub 及第三方公开资料中记录了其专线、三网优化特性，支持 VLESS 和 Trojan 协议。

## 节点与解锁 (第三方资料)
- 地区：香港、日本、美国、新加坡、台湾、英国
- 解锁：ChatGPT, Claude, Netflix, Disney+, YouTube, TikTok, Spotify

## 套餐与实测
价格约为 14.9元/月 左右起，包含 100GB/月 左右流量。目前存在第三方统一测试资料，请参考客观事实，禁止直接复制第三方排行榜排名。`
  },
  {
    rank: 12, name: 'U1S1（有一说一）', slug: 'u1s1', url: 'https://pkdj7.vipaff.cc/#/?code=NMjmHbvu',
    content: `## 品牌简介
**特别注意**：U1S1 存在同名的其他互联网产品。GitHub 资料明确将其识别为机场 U1S1，并提供相关资料。

## 线路与解锁 (第三方资料)
- 协议与线路：VLESS, Trojan, 专线
- 地区：香港、日本、美国、新加坡
- 解锁：ChatGPT, Claude, Netflix, YouTube, TikTok, Spotify

## 套餐与评价
套餐约为 ¥20/月，约 120GB 流量。某第三方测试站曾给出过排名评价，本站仅记录某第三方测试站曾如此评价的事实，禁止复制其排名。`
  },
  {
    rank: 13, name: '极连云', slug: 'jilianyun', url: 'https://kdjhao.jlyvipaff.com/#/?code=poyoU7mq',
    content: `## 品牌简介
极连云提供自研客户端及多地区节点，公开资料显示其线路包含 IEPL 描述。

## 套餐与解锁 (第三方资料)
第三方资料记录其套餐约为 18元/月 左右，包含 100GB/月，支持 AI 与流媒体。部分第三方资料明确把其归为 20 元以内综合型机场（此为第三方编辑观点，不能直接变成本站结论）。`
  },
  {
    rank: 14, name: '全球云', slug: 'quanqiuyun', url: 'https://sswdh.gcvipaff.com/#/?code=NE1AcNIX',
    content: `## 品牌简介
全球云官方资料显示提供 IPLC 和 IEPL 线路，支持 VLESS 协议及自研客户端。

## 套餐与解锁 (第三方资料)
第三方资料记录其包含约 ¥20/月、120GB/月 的套餐，并支持 AI 与流媒体。
*重要说明*：第三方资料明确说明这些信息主要来自官方资料，尚无完整独立复测，因此必须声明“官方资料显示”，而非本站实测。`
  },
  {
    rank: 15, name: '光年梯', slug: 'guangnianti', url: 'https://ggmq.gntaff.com/#/?code=RAJFvngV',
    content: `## 品牌简介
光年梯公开资料记录支持 iOS, Android, Windows, macOS 客户端。

## 地区与套餐 (第三方资料)
记录显示其包含香港、台湾、日本、新加坡、马来西亚、美国等地区，价格约为 ¥18/月 左右起（约 110GB）。
*注意*：第三方资料明确指出，这些地区信息主要来自官方宣传，尚缺完整订阅节点清单和测速数据，不能将地区列表直接当作独立实测。`
  },
  {
    rank: 16, name: '飞V FlyV', slug: 'feiv', url: 'https://varnexa.flyvaff.com/#/?code=UoU2Izm5',
    content: `## 品牌简介
飞V FlyV 第三方及公开资料中可以找到关于其 Clash 支持、全球节点、中继/专线描述以及多设备、跨境使用场景的记录。

## 套餐与评价
提供低价套餐及流媒体支持。部分公开页面包含用户评价和营销内容。禁止直接写“用户一致认为非常稳定”，用户评价不能当作严谨的大规模实测数据。`
  },
  {
    rank: 17, name: '梯子云 LadderCloud', slug: 'laddercloud', url: 'https://varnexa.ladderaff.com/#/?code=kuE4kqxo',
    content: `## 品牌简介
梯子云 LadderCloud 第三方资料称其于 2025 年开始运营。提供自研客户端及通用订阅，支持 VLESS 协议及三网入口优化，宣称 IEPL。

## 套餐与线路 (第三方资料)
- 价格：约 ¥25/月 (125GB/月)；包含低频方案年付 ¥89/60GB 左右
- 节点：60+ 节点（香港、日本、新加坡、美国、台湾）
- 解锁：Netflix, Disney+, TikTok, ChatGPT, Claude
*注意*：节点数量和解锁能力属于服务商宣传，不要标记为本站实测。`
  },
  {
    rank: 18, name: '浪网 WaveNet', slug: 'wavenet', url: 'https://varnexa.wavenetaff.com/#/?code=oU77JXen',
    content: `## 品牌简介
浪网 WaveNet 目前存在于第三方机场资料中，品牌名称与官方入口可确认。

## 详细资料
关于具体节点数量、价格、协议、速度、流媒体、AI 解锁等信息，目前**暂无足够公开资料**。禁止为了补充页面而编造。`
  },
  {
    rank: 19, name: '灵动云', slug: 'lingdong', url: 'https://varnexa.lingdongaff.com/#/?code=QcRK6OPG',
    content: `## 品牌简介
灵动云公开资料比较丰富，包含 BGP 与 IEPL 线路描述，节点覆盖香港、日本、新加坡、美国、法兰克福等地区，支持多平台客户端。

## 测速与解锁 (第三方实测)
支持 AI 与流媒体。存在被标记为已核查的第三方测试页面及测速记录。测速数据必须绑定测试时间，不能写成永久固定数据。`
  },
  {
    rank: 20, name: '隐形人', slug: 'invisible', url: 'https://varnexa.invisibleaff.com/#/?code=JF4seZUy',
    content: `## 品牌简介
隐形人官方公开页面宣称提供 BGP 与 IEPL 线路，支持 Clash, Shadowrocket, Sing-box 客户端。

## 节点与解锁 (官方公开资料)
- 节点：官方宣称 200+ 节点（香港、日本、新加坡、美国、台湾）
- 解锁：宣称支持 AI, Netflix, Disney+, YouTube, Spotify, TikTok
*注意*：官方页面展示了具体延迟和速度数据，此为官方页面展示数据，不能直接写本站实测。

## 套餐与价格 (第三方资料)
第三方资料记录有“白银纪元”约 ¥24/月、144GB 等套餐资料，具体价格必须重新核验以当前官网结算页为准。`
  },
  {
    rank: 21, name: 'Sogo云', slug: 'sogo', url: 'https://wzjc.sogoyunaff.cc/#/?code=2x2EywO9',
    content: `## 品牌简介
Sogo云品牌名称与官方入口可确认，存在相关机场入口。

## 详细资料
关于套餐、价格、流量、节点、协议、AI、流媒体及实测速度，目前**暂无足够公开资料**。`
  },
  {
    rank: 22, name: '宇宙云 YuZhou', slug: 'yuzhou', url: 'https://wzjc.yuzoucloud.cc/#/?code=wL7YStBa',
    content: `## 品牌简介
宇宙云 YuZhou 第三方资料记录存在 VLESS 协议与 IEPL 线路描述。

## 套餐与测试 (第三方资料)
- 套餐：约 ¥25/月/120GB 等资料，并存在年付低价方案。
- 节点与解锁：包含节点地区、AI 与流媒体相关记录，并存在第三方测试记录。
*注意*：不同资料来源可能存在价格差异，必须使用核验日期加来源。`
  },
  {
    rank: 23, name: '二猫云 2mao', slug: 'ermao', url: 'https://waaa.2maoyunaff.cc/#/?code=uHeyKG44',
    content: `## 品牌简介
二猫云 2mao 官方及第三方公开资料非常丰富。包含 IEPL/IPLC 描述，提供自研客户端，宣称不限速、不限设备。

## 节点与解锁 (公开资料)
- 地区：香港、台湾、日本、新加坡、美国、越南、德国、英国、法国、荷兰
- 解锁：Netflix, YouTube, Disney+, TikTok, ChatGPT

## 套餐与价格
公开套餐资料存在 ¥20/月左右 100GB 等方案；部分第三方页面记录有年付小包、60GB/月等方案。不同第三方页面价格不同，必须以当前官方结算页为最终价格依据。`
  },
  {
    rank: 24, name: '一翻云 1fly', slug: 'yifanyun', url: 'https://wzjc.1flyunaff.cc/#/?code=F7eaT191',
    content: `## 品牌简介
一翻云 1fly 在第三方资料中记录支持 BGP，并兼容 Clash, Shadowrocket, v2rayN, Stash, Quantumult X, sing-box 等客户端。

## 套餐与测速 (第三方资料)
- 套餐：提供多地区节点、年付套餐及一次性流量包。
- 测速：存在第三方晚高峰测速，部分公开测试资料记录有 84/85 节点在线等数据。这些必须写成第三方测试记录，不能写成本站实测。`
  },
  {
    rank: 25, name: '边缘节点 EdgeNova', slug: 'edgenova', url: 'https://work.edgenovaaff.cc/#/?code=z81zCfw1',
    content: `## 品牌简介
边缘节点 EdgeNova 的品牌名称与官方入口均可确认。

## 详细资料
关于具体节点数量、价格、协议、速度、流媒体、AI 解锁等信息，目前**暂无足够公开资料**。`
  },
  {
    rank: 26, name: '可信云 Kosing', slug: 'kexinyun', url: 'https://work.kosingaff.com/#/?code=BNsA58Es',
    content: `## 品牌简介
可信云 Kosing 的品牌名称与官方入口均可确认。

## 详细资料
关于具体节点数量、价格、协议、速度、流媒体、AI 解锁等信息，目前**暂无足够公开资料**。`
  },
  {
    rank: 27, name: '速界 SuJie', slug: 'sujie', url: 'https://work.speedworldaff.cc/#/?code=wSjLCpIf',
    content: `## 品牌简介
速界 SuJie 的品牌名称与官方入口均可确认。

## 详细资料
关于具体节点数量、价格、协议、速度、流媒体、AI 解锁等信息，目前**暂无足够公开资料**。`
  },
  {
    rank: 28, name: '快狸 KuaiLi', slug: 'kuaili', url: 'https://work.kuailicloud.cc/#/?code=gVGJa0Mp',
    content: `## 品牌简介
快狸 KuaiLi 的品牌名称与官方入口均可确认。

## 详细资料
关于具体节点数量、价格、协议、速度、流媒体、AI 解锁等信息，目前**暂无足够公开资料**。`
  }
];

airports.forEach(a => {
  const fileContent = `---
name: "${a.name}"
officialUrl: "${a.url}"
rank: ${a.rank}
description: "${a.name} 机场评测、价格套餐及节点线路深度解析。提供当前有效的官方网址入口，不虚构测速数据，客观分析是否适合您的网络需求。"
updated: "2026-09-22"
keywords: ["${a.name}", "${a.name}机场", "${a.name}官网", "机场推荐"]
---

${a.content}
`;
  fs.writeFileSync(path.join(__dirname, 'content', 'airports', `${a.slug}.mdx`), fileContent, 'utf8');
});

console.log('Successfully wrote 28 airport MDX files.');
