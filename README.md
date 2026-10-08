# MCP Server Billing Kit (Usage-Based)

**Monetize an MCP server: Dodo subscription check + KV usage metering + 402 payment-required overage. The missing payment layer for the MCP economy (<5% servers monetized).**

> 由 AI 代码公司（PixHarvest）按数据验证配方生成 · 模板/boilerplate × 生态市场 × 按量计费

## 快速开始
```bash
npx wrangler deploy worker.js --name mcp-billing-kit
```
然后在 Claude / Cursor / 任意 MCP 客户端添加：
```
https://mcp-billing-kit..workers.dev/mcp
```

## 授权与订阅
本模板为**订阅授权**：$79/月，含免费额度；超额按量付费。
- 订阅入口（立即开通）: https://checkout.dodopayments.com/session/cks_0NpHVSe8Tj8u1kT7Mpp5s
- 产品 ID: pdt_0NpHVPczDlpseiTnHqOoT
- 生态市场: npm (`mcp-server-billing-kit`) · GitHub · MCP 生态

## 配套
完整商业化（Dodo 自动订阅校验 + 用量计费 402）见 mcp-server-billing-kit。
