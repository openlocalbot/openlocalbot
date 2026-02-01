import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "openlocalbot",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual(["node", "openlocalbot", "gateway", "--dev", "--allow-unconfigured"]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "openlocalbot", "--dev", "gateway"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "openlocalbot", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "openlocalbot", "--profile", "work", "status"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "openlocalbot", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "openlocalbot", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (dev first)", () => {
    const res = parseCliProfileArgs(["node", "openlocalbot", "--dev", "--profile", "work", "status"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (profile first)", () => {
    const res = parseCliProfileArgs(["node", "openlocalbot", "--profile", "work", "--dev", "status"]);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join("/home/peter", ".openlocalbot-dev");
    expect(env.openlocalbot_PROFILE).toBe("dev");
    expect(env.openlocalbot_STATE_DIR).toBe(expectedStateDir);
    expect(env.openlocalbot_CONFIG_PATH).toBe(path.join(expectedStateDir, "openlocalbot.json"));
    expect(env.openlocalbot_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      openlocalbot_STATE_DIR: "/custom",
      openlocalbot_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.openlocalbot_STATE_DIR).toBe("/custom");
    expect(env.openlocalbot_GATEWAY_PORT).toBe("19099");
    expect(env.openlocalbot_CONFIG_PATH).toBe(path.join("/custom", "openlocalbot.json"));
  });
});

describe("formatCliCommand", () => {
  it("returns command unchanged when no profile is set", () => {
    expect(formatCliCommand("openlocalbot doctor --fix", {})).toBe("openlocalbot doctor --fix");
  });

  it("returns command unchanged when profile is default", () => {
    expect(formatCliCommand("openlocalbot doctor --fix", { openlocalbot_PROFILE: "default" })).toBe(
      "openlocalbot doctor --fix",
    );
  });

  it("returns command unchanged when profile is Default (case-insensitive)", () => {
    expect(formatCliCommand("openlocalbot doctor --fix", { openlocalbot_PROFILE: "Default" })).toBe(
      "openlocalbot doctor --fix",
    );
  });

  it("returns command unchanged when profile is invalid", () => {
    expect(formatCliCommand("openlocalbot doctor --fix", { openlocalbot_PROFILE: "bad profile" })).toBe(
      "openlocalbot doctor --fix",
    );
  });

  it("returns command unchanged when --profile is already present", () => {
    expect(
      formatCliCommand("openlocalbot --profile work doctor --fix", { openlocalbot_PROFILE: "work" }),
    ).toBe("openlocalbot --profile work doctor --fix");
  });

  it("returns command unchanged when --dev is already present", () => {
    expect(formatCliCommand("openlocalbot --dev doctor", { openlocalbot_PROFILE: "dev" })).toBe(
      "openlocalbot --dev doctor",
    );
  });

  it("inserts --profile flag when profile is set", () => {
    expect(formatCliCommand("openlocalbot doctor --fix", { openlocalbot_PROFILE: "work" })).toBe(
      "openlocalbot --profile work doctor --fix",
    );
  });

  it("trims whitespace from profile", () => {
    expect(formatCliCommand("openlocalbot doctor --fix", { openlocalbot_PROFILE: "  jbopenlocalbot  " })).toBe(
      "openlocalbot --profile jbopenlocalbot doctor --fix",
    );
  });

  it("handles command with no args after openlocalbot", () => {
    expect(formatCliCommand("openlocalbot", { openlocalbot_PROFILE: "test" })).toBe(
      "openlocalbot --profile test",
    );
  });

  it("handles pnpm wrapper", () => {
    expect(formatCliCommand("pnpm openlocalbot doctor", { openlocalbot_PROFILE: "work" })).toBe(
      "pnpm openlocalbot --profile work doctor",
    );
  });
});
