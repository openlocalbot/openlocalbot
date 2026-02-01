/**
 * DeepSeek official API model catalog.
 *
 * DeepSeek API uses OpenAI-compatible format.
 *
 * API endpoint: https://api.deepseek.com
 * Documentation: https://api-docs.deepseek.com/
 */

import type { ModelApi, ModelDefinitionConfig } from "../config/types.js";

export const DEEPSEEK_API_BASE_URL = "https://api.deepseek.com";
export const DEEPSEEK_DEFAULT_MODEL = "deepseek-chat";
export const DEEPSEEK_DEFAULT_MODEL_REF = `deepseek/${DEEPSEEK_DEFAULT_MODEL}`;

/**
 * Model aliases for convenient shortcuts.
 */
export const DEEPSEEK_MODEL_ALIASES: Record<string, string> = {
  // Main models
  chat: "deepseek-chat",
  reasoner: "deepseek-reasoner",
  "v3.2": "deepseek-chat",
  "v3.2-thinking": "deepseek-reasoner",

  // Shorthand
  deepseek: "deepseek-chat",
  "deepseek-v3": "deepseek-chat",
  "deepseek-v3.2": "deepseek-chat",
  thinking: "deepseek-reasoner",
};

/**
 * Resolve a model alias to its full model ID.
 * Returns the input if no alias exists.
 */
export function resolveDeepSeekAlias(modelIdOrAlias: string): string {
  const normalized = modelIdOrAlias.toLowerCase().trim();
  return DEEPSEEK_MODEL_ALIASES[normalized] ?? modelIdOrAlias;
}

/**
 * DeepSeek uses OpenAI-compatible API.
 */
export function resolveDeepSeekModelApi(_modelId: string): ModelApi {
  return "openai-completions";
}

// Cost per million tokens (in USD)
// Based on DeepSeek pricing
const MODEL_COSTS: Record<
  string,
  { input: number; output: number; cacheRead: number; cacheWrite: number }
> = {
  "deepseek-chat": { input: 0.27, output: 1.1, cacheRead: 0.07, cacheWrite: 0 },
  "deepseek-reasoner": { input: 0.55, output: 2.19, cacheRead: 0.14, cacheWrite: 0 },
};

const DEFAULT_COST = { input: 0.27, output: 1.1, cacheRead: 0.07, cacheWrite: 0 };

const MODEL_CONTEXT_WINDOWS: Record<string, number> = {
  "deepseek-chat": 65536,
  "deepseek-reasoner": 65536,
};

function getDefaultContextWindow(modelId: string): number {
  return MODEL_CONTEXT_WINDOWS[modelId] ?? 65536;
}

const MODEL_MAX_TOKENS: Record<string, number> = {
  "deepseek-chat": 8192,
  "deepseek-reasoner": 16384,
};

function getDefaultMaxTokens(modelId: string): number {
  return MODEL_MAX_TOKENS[modelId] ?? 8192;
}

const MODEL_NAMES: Record<string, string> = {
  "deepseek-chat": "DeepSeek V3.2 Chat",
  "deepseek-reasoner": "DeepSeek V3.2 Reasoner",
};

function formatModelName(modelId: string): string {
  return MODEL_NAMES[modelId] ?? modelId;
}

/**
 * Check if a model supports reasoning/thinking.
 */
function supportsReasoning(modelId: string): boolean {
  return modelId.includes("reasoner");
}

/**
 * Build a ModelDefinitionConfig from a model ID.
 */
function buildModelDefinition(modelId: string): ModelDefinitionConfig {
  return {
    id: modelId,
    name: formatModelName(modelId),
    api: resolveDeepSeekModelApi(modelId),
    reasoning: supportsReasoning(modelId),
    input: ["text"],
    cost: MODEL_COSTS[modelId] ?? DEFAULT_COST,
    contextWindow: getDefaultContextWindow(modelId),
    maxTokens: getDefaultMaxTokens(modelId),
  };
}

/**
 * Static fallback models for DeepSeek official API.
 */
export function getDeepSeekStaticFallbackModels(): ModelDefinitionConfig[] {
  const modelIds = ["deepseek-chat", "deepseek-reasoner"];
  return modelIds.map(buildModelDefinition);
}
