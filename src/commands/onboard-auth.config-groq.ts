import {
  getGroqStaticFallbackModels,
  GROQ_API_BASE_URL,
  GROQ_DEFAULT_MODEL_REF,
} from "../agents/groq-models.js";
import type { OpenLocalBotConfig } from "../config/config.js";

/**
 * Apply Groq provider configuration without changing the default model.
 * Registers Groq models and sets up the provider, but preserves existing model selection.
 */
export function applyGroqProviderConfig(cfg: OpenLocalBotConfig): OpenLocalBotConfig {
  const models = { ...cfg.agents?.defaults?.models };
  models[GROQ_DEFAULT_MODEL_REF] = {
    ...models[GROQ_DEFAULT_MODEL_REF],
    alias: models[GROQ_DEFAULT_MODEL_REF]?.alias ?? "Groq",
  };

  const providers = { ...cfg.models?.providers };
  const existingProvider = providers.groq;
  const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];

  const groqModels = getGroqStaticFallbackModels();
  const mergedModels = [
    ...existingModels,
    ...groqModels.filter((model) => !existingModels.some((existing) => existing.id === model.id)),
  ];

  const { apiKey: existingApiKey, ...existingProviderRest } = (existingProvider ?? {}) as Record<
    string,
    unknown
  > as { apiKey?: string };
  const resolvedApiKey = typeof existingApiKey === "string" ? existingApiKey : undefined;
  const normalizedApiKey = resolvedApiKey?.trim();

  providers.groq = {
    ...existingProviderRest,
    baseUrl: GROQ_API_BASE_URL,
    api: "openai-completions",
    ...(normalizedApiKey ? { apiKey: normalizedApiKey } : {}),
    models: mergedModels.length > 0 ? mergedModels : groqModels,
  };

  return {
    ...cfg,
    agents: {
      ...cfg.agents,
      defaults: {
        ...cfg.agents?.defaults,
        models,
      },
    },
    models: {
      mode: cfg.models?.mode ?? "merge",
      providers,
    },
  };
}

/**
 * Apply Groq provider configuration AND set Groq as the default model.
 * Use this when Groq is the primary provider choice during onboarding.
 */
export function applyGroqConfig(cfg: OpenLocalBotConfig): OpenLocalBotConfig {
  const next = applyGroqProviderConfig(cfg);
  const existingModel = next.agents?.defaults?.model;
  return {
    ...next,
    agents: {
      ...next.agents,
      defaults: {
        ...next.agents?.defaults,
        model: {
          ...(existingModel && "fallbacks" in (existingModel as Record<string, unknown>)
            ? {
                fallbacks: (existingModel as { fallbacks?: string[] }).fallbacks,
              }
            : undefined),
          primary: GROQ_DEFAULT_MODEL_REF,
        },
      },
    },
  };
}

export { GROQ_DEFAULT_MODEL_REF };
