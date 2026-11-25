const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "../supabase/functions");
const ai = fs.readFileSync(path.join(root, "ai-assistant/index.ts"), "utf8");
const voice = fs.readFileSync(path.join(root, "assistant-voice/index.ts"), "utf8");
const migration = fs.readFileSync(path.join(__dirname, "../supabase/migrations/20261125130000_make_assistant_learning_pending_until_reviewed.sql"), "utf8");

test("IA e voz usam somente o IP de origem do Cloudflare para rate limit", () => {
  assert.match(ai, /request\.headers\.get\("cf-connecting-ip"\)/);
  assert.match(voice, /request\.headers\.get\("cf-connecting-ip"\)/);
  assert.doesNotMatch(ai, /x-client-ip|x-forwarded-for/);
  assert.doesNotMatch(voice, /x-client-ip|x-forwarded-for/);
});

test("IA falha de forma segura sem IP e limita o tamanho do corpo", () => {
  assert.match(ai, /if \(!clientIp\) return json\(503/);
  assert.match(ai, /const maxBodyBytes = 18 \* 1024 \* 1024/);
  assert.match(ai, /return json\(413/);
  assert.match(voice, /const maxBodyBytes = 64 \* 1024/);
  assert.match(ai, /Não consegui verificar a proteção de uso da IA/);
});

test("respostas novas e antigas ficam pendentes até revisão humana", () => {
  assert.match(ai, /status: "pending"/);
  assert.match(ai, /status=eq\.approved/);
  assert.match(migration, /alter column status set default 'pending'/);
  assert.match(migration, /set status = 'pending'/);
});

test("aprendizado não armazena contexto com dados privados de clientes", () => {
  assert.match(ai, /function containsPrivateBusinessData/);
  assert.match(ai, /if \(containsPrivateBusinessData\(question\) \|\| containsPrivateBusinessData\(answer\)\)/);
});

test("pesquisa externa só é ativada por pedido explícito ou regra atual", () => {
  assert.match(ai, /const explicitlyRequestsResearch/);
  assert.match(ai, /const asksCurrentRule/);
  assert.match(ai, /const webSearchIntent = explicitlyRequestsResearch \|\| asksCurrentRule/);
  assert.doesNotMatch(ai, /const webSearchIntent = \/\(pesquis\|internet\|fonte\|atualiz\|lei\|decreto\|portaria\|instrução normativa\|solução\|erro\|falha\|código\|fiscal/);
});
