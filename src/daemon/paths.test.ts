import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveGatewayStateDir } from "./paths.js";

describe("resolveGatewayStateDir", () => {
  it("uses the default state dir when no overrides are set", () => {
    const env = { HOME: "/Users/test" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".openlocalbot"));
  });

  it("appends the profile suffix when set", () => {
    const env = { HOME: "/Users/test", openlocalbot_PROFILE: "rescue" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".openlocalbot-rescue"));
  });

  it("treats default profiles as the base state dir", () => {
    const env = { HOME: "/Users/test", openlocalbot_PROFILE: "Default" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".openlocalbot"));
  });

  it("uses openlocalbot_STATE_DIR when provided", () => {
    const env = { HOME: "/Users/test", openlocalbot_STATE_DIR: "/var/lib/openlocalbot" };
    expect(resolveGatewayStateDir(env)).toBe(path.resolve("/var/lib/openlocalbot"));
  });

  it("expands ~ in openlocalbot_STATE_DIR", () => {
    const env = { HOME: "/Users/test", openlocalbot_STATE_DIR: "~/openlocalbot-state" };
    expect(resolveGatewayStateDir(env)).toBe(path.resolve("/Users/test/openlocalbot-state"));
  });

  it("preserves Windows absolute paths without HOME", () => {
    const env = { openlocalbot_STATE_DIR: "C:\\State\\openlocalbot" };
    expect(resolveGatewayStateDir(env)).toBe("C:\\State\\openlocalbot");
  });
});
