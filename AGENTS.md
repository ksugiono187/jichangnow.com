# Agent 协作指南 (AGENTS.md)

* 多 Agent 协作时避免修改同一文件
* 不覆盖其他 Agent 工作
* 不重构无关代码
* 不读取敏感文件
* 修改前列出目标文件
* 修改后总结修改内容
* UI 调整与架构修改分离
* SEO 修改必须保持页面内容一致
* 不随意新增依赖

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
