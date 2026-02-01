/**
 * Groq API model catalog.
 *
 * Groq provides ultra-fast inference for open-source models.
 * Uses OpenAI-compatible API format.
 *
 * API endpoint: https://api.groq.com/openai/v1
 * Documentation: https://console.groq.com/docs
 */

import type { ModelApi, ModelDefinitionConfig } from "../config/types.js";

export const GROQ_API_BASE_URL = "https://api.groq.com/openai/v1";
export const GROQ_DEFAULT_MODEL = "llama-3.3-70b-versatile";
export const GROQ_DEFAULT_MODEL_REF = `groq/${GROQ_DEFAULT_MODEL}`;

/**
 * Model aliases for convenient shortcuts.
 */
export const GROQ_MODEL_ALIASES: Record<string, string> = {
  // Llama 3.3
  llama: "llama-3.3-70b-versatile",
  "llama-70b": "llama-3.3-70b-versatile",
  "llama-3.3": "llama-3.3-70b-versatile",
  "llama-3.3-70b": "llama-3.3-70b-versatile",

  // Llama 3.1
  "llama-3.1": "llama-3.1-8b-instant",
  "llama-3.1-8b": "llama-3.1-8b-instant",
  "llama-8b": "llama-3.1-8b-instant",

  // Llama 4
  "llama-4": "meta-llama/llama-4-maverick-17b-128e-instruct",
  "llama-4-maverick": "meta-llama/llama-4-maverick-17b-128e-instruct",
  "llama-4-scout": "meta-llama/llama-4-scout-17b-16e-instruct",
  maverick: "meta-llama/llama-4-maverick-17b-128e-instruct",
  scout: "meta-llama/llama-4-scout-17b-16e-instruct",

  // Kimi K2
  kimi: "moonshotai/kimi-k2-instruct",
  "kimi-k2": "moonshotai/kimi-k2-instruct",

  // Qwen
  qwen: "qwen/qwen3-32b",
  "qwen-32b": "qwen/qwen3-32b",
  qwen3: "qwen/qwen3-32b",

  // GPT OSS (OpenAI open-source)
  "gpt-oss": "openai/gpt-oss-120b",
  "gpt-oss-120b": "openai/gpt-oss-120b",
  "gpt-oss-20b": "openai/gpt-oss-20b",

  // Groq Compound
  compound: "groq/compound",
  "compound-mini": "groq/compound-mini",

  // Allam (Arabic)
  allam: "allam-2-7b",

  // Whisper (speech-to-text)
  whisper: "whisper-large-v3-turbo",
  "whisper-turbo": "whisper-large-v3-turbo",
};

/**
 * Resolve a model alias to its full model ID.
 * Returns the input if no alias exists.
 */
export function resolveGroqAlias(modelIdOrAlias: string): string {
  const normalized = modelIdOrAlias.toLowerCase().trim();
  return GROQ_MODEL_ALIASES[normalized] ?? modelIdOrAlias;
}

/**
 * Groq uses OpenAI-compatible API.
 */
export function resolveGroqModelApi(_modelId: string): ModelApi {
  return "openai-completions";
}

// Cost per million tokens (in USD) - Groq pricing
const MODEL_COSTS: Record<
  string,
  { input: number; output: number; cacheRead: number; cacheWrite: number }
> = {
  // Llama 3.3
  "llama-3.3-70b-versatile": { input: 0.59, output: 0.79, cacheRead: 0, cacheWrite: 0 },

  // Llama 3.1
  "llama-3.1-8b-instant": { input: 0.05, output: 0.08, cacheRead: 0, cacheWrite: 0 },

  // Llama 4
  "meta-llama/llama-4-maverick-17b-128e-instruct": {
    input: 0.2,
    output: 0.6,
    cacheRead: 0,
    cacheWrite: 0,
  },
  "meta-llama/llama-4-scout-17b-16e-instruct": {
    input: 0.11,
    output: 0.34,
    cacheRead: 0,
    cacheWrite: 0,
  },

  // Kimi K2
  "moonshotai/kimi-k2-instruct": { input: 0.2, output: 0.4, cacheRead: 0, cacheWrite: 0 },
  "moonshotai/kimi-k2-instruct-0905": { input: 0.2, output: 0.4, cacheRead: 0, cacheWrite: 0 },

  // Qwen
  "qwen/qwen3-32b": { input: 0.29, output: 0.39, cacheRead: 0, cacheWrite: 0 },

  // GPT OSS
  "openai/gpt-oss-120b": { input: 0.8, output: 1.2, cacheRead: 0, cacheWrite: 0 },
  "openai/gpt-oss-20b": { input: 0.2, output: 0.4, cacheRead: 0, cacheWrite: 0 },
  "openai/gpt-oss-safeguard-20b": { input: 0.2, output: 0.4, cacheRead: 0, cacheWrite: 0 },

  // Groq Compound
  "groq/compound": { input: 0.3, output: 0.6, cacheRead: 0, cacheWrite: 0 },
  "groq/compound-mini": { input: 0.1, output: 0.2, cacheRead: 0, cacheWrite: 0 },

  // Allam
  "allam-2-7b": { input: 0.1, output: 0.2, cacheRead: 0, cacheWrite: 0 },

  // Guard models
  "meta-llama/llama-guard-4-12b": { input: 0.2, output: 0.2, cacheRead: 0, cacheWrite: 0 },

  // Whisper
  "whisper-large-v3": { input: 0.111, output: 0, cacheRead: 0, cacheWrite: 0 },
  "whisper-large-v3-turbo": { input: 0.04, output: 0, cacheRead: 0, cacheWrite: 0 },
};

const DEFAULT_COST = { input: 0.5, output: 0.5, cacheRead: 0, cacheWrite: 0 };

const MODEL_CONTEXT_WINDOWS: Record<string, number> = {
  "llama-3.3-70b-versatile": 131072,
  "llama-3.1-8b-instant": 131072,
  "meta-llama/llama-4-maverick-17b-128e-instruct": 131072,
  "meta-llama/llama-4-scout-17b-16e-instruct": 131072,
  "moonshotai/kimi-k2-instruct": 131072,
  "moonshotai/kimi-k2-instruct-0905": 262144,
  "qwen/qwen3-32b": 131072,
  "openai/gpt-oss-120b": 131072,
  "openai/gpt-oss-20b": 131072,
  "openai/gpt-oss-safeguard-20b": 131072,
  "groq/compound": 131072,
  "groq/compound-mini": 131072,
  "allam-2-7b": 4096,
  "meta-llama/llama-guard-4-12b": 131072,
};

function getDefaultContextWindow(modelId: string): number {
  return MODEL_CONTEXT_WINDOWS[modelId] ?? 131072;
}

const MODEL_MAX_TOKENS: Record<string, number> = {
  "llama-3.3-70b-versatile": 32768,
  "llama-3.1-8b-instant": 131072,
  "meta-llama/llama-4-maverick-17b-128e-instruct": 8192,
  "meta-llama/llama-4-scout-17b-16e-instruct": 8192,
  "moonshotai/kimi-k2-instruct": 16384,
  "moonshotai/kimi-k2-instruct-0905": 16384,
  "qwen/qwen3-32b": 40960,
  "openai/gpt-oss-120b": 65536,
  "openai/gpt-oss-20b": 65536,
  "openai/gpt-oss-safeguard-20b": 65536,
  "groq/compound": 8192,
  "groq/compound-mini": 8192,
  "allam-2-7b": 4096,
  "meta-llama/llama-guard-4-12b": 1024,
};

function getDefaultMaxTokens(modelId: string): number {
  return MODEL_MAX_TOKENS[modelId] ?? 8192;
}

const MODEL_NAMES: Record<string, string> = {
  "llama-3.3-70b-versatile": "Llama 3.3 70B Versatile",
  "llama-3.1-8b-instant": "Llama 3.1 8B Instant",
  "meta-llama/llama-4-maverick-17b-128e-instruct": "Llama 4 Maverick 17B",
  "meta-llama/llama-4-scout-17b-16e-instruct": "Llama 4 Scout 17B",
  "moonshotai/kimi-k2-instruct": "Kimi K2 Instruct",
  "moonshotai/kimi-k2-instruct-0905": "Kimi K2 Instruct 0905",
  "qwen/qwen3-32b": "Qwen 3 32B",
  "openai/gpt-oss-120b": "GPT OSS 120B",
  "openai/gpt-oss-20b": "GPT OSS 20B",
  "openai/gpt-oss-safeguard-20b": "GPT OSS Safeguard 20B",
  "groq/compound": "Groq Compound",
  "groq/compound-mini": "Groq Compound Mini",
  "allam-2-7b": "Allam 2 7B",
  "meta-llama/llama-guard-4-12b": "Llama Guard 4 12B",
  "whisper-large-v3": "Whisper Large V3",
  "whisper-large-v3-turbo": "Whisper Large V3 Turbo",
};

function formatModelName(modelId: string): string {
  return MODEL_NAMES[modelId] ?? modelId;
}

/**
 * Check if a model supports image input.
 */
function supportsImageInput(modelId: string): boolean {
  const lower = modelId.toLowerCase();
  return lower.includes("vision") || lower.includes("maverick");
}

/**
 * Check if a model supports reasoning/thinking.
 */
function supportsReasoning(modelId: string): boolean {
  const lower = modelId.toLowerCase();
  return lower.includes("kimi") || lower.includes("qwen") || lower.includes("gpt-oss-120b");
}

/**
 * Build a ModelDefinitionConfig from a model ID.
 */
function buildModelDefinition(modelId: string): ModelDefinitionConfig {
  return {
    id: modelId,
    name: formatModelName(modelId),
    api: resolveGroqModelApi(modelId),
    reasoning: supportsReasoning(modelId),
    input: supportsImageInput(modelId) ? ["text", "image"] : ["text"],
    cost: MODEL_COSTS[modelId] ?? DEFAULT_COST,
    contextWindow: getDefaultContextWindow(modelId),
    maxTokens: getDefaultMaxTokens(modelId),
  };
}

/**
 * Static fallback models for Groq API.
 */
export function getGroqStaticFallbackModels(): ModelDefinitionConfig[] {
  const modelIds = [
    // Llama 3.3/3.1
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",

    // Llama 4
    "meta-llama/llama-4-maverick-17b-128e-instruct",
    "meta-llama/llama-4-scout-17b-16e-instruct",

    // Kimi K2
    "moonshotai/kimi-k2-instruct",

    // Qwen
    "qwen/qwen3-32b",

    // GPT OSS
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",

    // Groq Compound
    "groq/compound",
    "groq/compound-mini",

    // Allam (Arabic)
    "allam-2-7b",
  ];
  return modelIds.map(buildModelDefinition);
}

/**
 * Response shape from Groq /models endpoint.
 */
interface GroqModelsResponse {
  data: Array<{
    id: string;
    object: "model";
    created?: number;
    owned_by?: string;
  }>;
}

// Cache for fetched models (1 hour TTL)
let cachedModels: ModelDefinitionConfig[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Fetch models from the Groq API.
 * Uses caching with 1-hour TTL.
 *
 * @param apiKey - Groq API key for authentication
 * @returns Array of model definitions, or static fallback on failure
 */
export async function fetchGroqModels(apiKey?: string): Promise<ModelDefinitionConfig[]> {
  // Return cached models if still valid
  const now = Date.now();
  if (cachedModels && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedModels;
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }

    const response = await fetch(`${GROQ_API_BASE_URL}/models`, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as GroqModelsResponse;

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid response format from /models endpoint");
    }

    // Filter out non-chat models (whisper, guard, etc.) for default model list
    const chatModels = data.data.filter(
      (model) => !model.id.includes("whisper") && !model.id.includes("guard"),
    );

    const models = chatModels.map((model) => buildModelDefinition(model.id));

    cachedModels = models;
    cacheTimestamp = now;

    return models;
  } catch {
    // Silently fall back to static models on network errors
    return getGroqStaticFallbackModels();
  }
}

/**
 * Clear the model cache (useful for testing or forcing refresh).
 */
export function clearGroqModelCache(): void {
  cachedModels = null;
  cacheTimestamp = 0;
}
