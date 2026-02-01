import {
  getDeepSeekStaticFallbackModels,
  DEEPSEEK_API_BASE_URL,
  DEEPSEEK_DEFAULT_MODEL_REF,
} from "../agents/deepseek-models.js";
import type { OpenClawConfig } from "../config/config.js";

/**
 * Apply DeepSeek provider configuration without changing the default model.
 * Registers DeepSeek models and sets up the provider, but preserves existing model selection.
 */
export function applyDeepSeekProviderConfig(cfg: OpenClawConfig): OpenClawConfig {
  const models = { ...cfg.agents?.defaults?.models };
  models[DEEPSEEK_DEFAULT_MODEL_REF] = {
    ...models[DEEPSEEK_DEFAULT_MODEL_REF],
    alias: models[DEEPSEEK_DEFAULT_MODEL_REF]?.alias ?? "DeepSeek",
  };

  const providers = { ...cfg.models?.providers };
  const existingProvider = providers.deepseek;
  const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];

  const deepseekModels = getDeepSeekStaticFallbackModels();
  const mergedModels = [
    ...existingModels,
    ...deepseekModels.filter(
      (model) => !existingModels.some((existing) => existing.id === model.id),
    ),
  ];

  const { apiKey: existingApiKey, ...existingProviderRest } = (existingProvider ?? {}) as Record<
    string,
    unknown
  > as { apiKey?: string };
  const resolvedApiKey = typeof existingApiKey === "string" ? existingApiKey : undefined;
  const normalizedApiKey = resolvedApiKey?.trim();

  providers.deepseek = {
    ...existingProviderRest,
    baseUrl: DEEPSEEK_API_BASE_URL,
    api: "openai-completions",
    ...(normalizedApiKey ? { apiKey: normalizedApiKey } : {}),
    models: mergedModels.length > 0 ? mergedModels : deepseekModels,
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
 * Apply DeepSeek provider configuration AND set DeepSeek as the default model.
 * Use this when DeepSeek is the primary provider choice during onboarding.
 */
export function applyDeepSeekConfig(cfg: OpenClawConfig): OpenClawConfig {
  const next = applyDeepSeekProviderConfig(cfg);
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
          primary: DEEPSEEK_DEFAULT_MODEL_REF,
        },
      },
    },
  };
}

export { DEEPSEEK_DEFAULT_MODEL_REF };
