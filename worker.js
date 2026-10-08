// MCP Server Billing Kit — 按量计费模板（订阅校验 + 用量记录 + 402 超限）
// 流程: Authorization: Bearer <key> → KV 记录用量 → 超限返回 402 + X-Payment-Required
export default {
  async fetch(request) {
    const auth = request.headers.get("Authorization") || "";
    const key = auth.replace(/^Bearer /i, "");
    const keys = (await MCP_BILLING.get("SUB_KEYS", "text") || "").split(",").map(s => s.trim());
    if (!key || !keys.includes(key)) return json({ error: { code: -32001, message: "Unauthorized" } }, 401);
    // 用量计量：每请求计数（免费额度 1000/月，超额 402）
    const usage = parseInt(await MCP_BILLING.get("USAGE:" + key, "text") || "0", 10);
    await MCP_BILLING.put("USAGE:" + key, String(usage + 1));
    if (usage >= 1000) return json({ error: { code: -32029, message: "Quota exceeded: upgrade your plan or pay per-use" } }, 402);
    const body = await request.json().catch(() => ({}));
    if (body.method === "initialize") return json({ protocolVersion: "2025-03-26", capabilities: { tools: {} }, serverInfo: { name: "mcp-billing-kit", version: "1.0.0" } });
    if (body.method === "tools/list") return json({ tools: [
      { name: "usage", description: "Check your current usage vs free quota", inputSchema: { type: "object", properties: {} } }
    ]});
    if (body.method === "tools/call" && body.params?.name === "usage")
      return json({ content: [{ type: "text", text: "Usage: " + (usage + 1) + " / 1000 free quota. Upgrade at https://pixharvest.com/pricing" }] });
    return json({ error: { code: -32601, message: "Method not found" } });
  }
};
function json(o, s){ return new Response(JSON.stringify(o), { headers: { "Content-Type": "application/json" }, status: s || 200 }); }
