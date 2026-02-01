import { describe, expect, it } from "vitest";
import {
  buildParseArgv,
  getFlagValue,
  getCommandPath,
  getPrimaryCommand,
  getPositiveIntFlagValue,
  getVerboseFlag,
  hasHelpOrVersion,
  hasFlag,
  shouldMigrateState,
  shouldMigrateStateFromPath,
} from "./argv.js";

describe("argv helpers", () => {
  it("detects help/version flags", () => {
    expect(hasHelpOrVersion(["node", "openlocalbot", "--help"])).toBe(true);
    expect(hasHelpOrVersion(["node", "openlocalbot", "-V"])).toBe(true);
    expect(hasHelpOrVersion(["node", "openlocalbot", "status"])).toBe(false);
  });

  it("extracts command path ignoring flags and terminator", () => {
    expect(getCommandPath(["node", "openlocalbot", "status", "--json"], 2)).toEqual(["status"]);
    expect(getCommandPath(["node", "openlocalbot", "agents", "list"], 2)).toEqual(["agents", "list"]);
    expect(getCommandPath(["node", "openlocalbot", "status", "--", "ignored"], 2)).toEqual(["status"]);
  });

  it("returns primary command", () => {
    expect(getPrimaryCommand(["node", "openlocalbot", "agents", "list"])).toBe("agents");
    expect(getPrimaryCommand(["node", "openlocalbot"])).toBeNull();
  });

  it("parses boolean flags and ignores terminator", () => {
    expect(hasFlag(["node", "openlocalbot", "status", "--json"], "--json")).toBe(true);
    expect(hasFlag(["node", "openlocalbot", "--", "--json"], "--json")).toBe(false);
  });

  it("extracts flag values with equals and missing values", () => {
    expect(getFlagValue(["node", "openlocalbot", "status", "--timeout", "5000"], "--timeout")).toBe(
      "5000",
    );
    expect(getFlagValue(["node", "openlocalbot", "status", "--timeout=2500"], "--timeout")).toBe(
      "2500",
    );
    expect(getFlagValue(["node", "openlocalbot", "status", "--timeout"], "--timeout")).toBeNull();
    expect(getFlagValue(["node", "openlocalbot", "status", "--timeout", "--json"], "--timeout")).toBe(
      null,
    );
    expect(getFlagValue(["node", "openlocalbot", "--", "--timeout=99"], "--timeout")).toBeUndefined();
  });

  it("parses verbose flags", () => {
    expect(getVerboseFlag(["node", "openlocalbot", "status", "--verbose"])).toBe(true);
    expect(getVerboseFlag(["node", "openlocalbot", "status", "--debug"])).toBe(false);
    expect(getVerboseFlag(["node", "openlocalbot", "status", "--debug"], { includeDebug: true })).toBe(
      true,
    );
  });

  it("parses positive integer flag values", () => {
    expect(getPositiveIntFlagValue(["node", "openlocalbot", "status"], "--timeout")).toBeUndefined();
    expect(
      getPositiveIntFlagValue(["node", "openlocalbot", "status", "--timeout"], "--timeout"),
    ).toBeNull();
    expect(
      getPositiveIntFlagValue(["node", "openlocalbot", "status", "--timeout", "5000"], "--timeout"),
    ).toBe(5000);
    expect(
      getPositiveIntFlagValue(["node", "openlocalbot", "status", "--timeout", "nope"], "--timeout"),
    ).toBeUndefined();
  });

  it("builds parse argv from raw args", () => {
    const nodeArgv = buildParseArgv({
      programName: "openlocalbot",
      rawArgs: ["node", "openlocalbot", "status"],
    });
    expect(nodeArgv).toEqual(["node", "openlocalbot", "status"]);

    const versionedNodeArgv = buildParseArgv({
      programName: "openlocalbot",
      rawArgs: ["node-22", "openlocalbot", "status"],
    });
    expect(versionedNodeArgv).toEqual(["node-22", "openlocalbot", "status"]);

    const versionedNodeWindowsArgv = buildParseArgv({
      programName: "openlocalbot",
      rawArgs: ["node-22.2.0.exe", "openlocalbot", "status"],
    });
    expect(versionedNodeWindowsArgv).toEqual(["node-22.2.0.exe", "openlocalbot", "status"]);

    const versionedNodePatchlessArgv = buildParseArgv({
      programName: "openlocalbot",
      rawArgs: ["node-22.2", "openlocalbot", "status"],
    });
    expect(versionedNodePatchlessArgv).toEqual(["node-22.2", "openlocalbot", "status"]);

    const versionedNodeWindowsPatchlessArgv = buildParseArgv({
      programName: "openlocalbot",
      rawArgs: ["node-22.2.exe", "openlocalbot", "status"],
    });
    expect(versionedNodeWindowsPatchlessArgv).toEqual(["node-22.2.exe", "openlocalbot", "status"]);

    const versionedNodeWithPathArgv = buildParseArgv({
      programName: "openlocalbot",
      rawArgs: ["/usr/bin/node-22.2.0", "openlocalbot", "status"],
    });
    expect(versionedNodeWithPathArgv).toEqual(["/usr/bin/node-22.2.0", "openlocalbot", "status"]);

    const nodejsArgv = buildParseArgv({
      programName: "openlocalbot",
      rawArgs: ["nodejs", "openlocalbot", "status"],
    });
    expect(nodejsArgv).toEqual(["nodejs", "openlocalbot", "status"]);

    const nonVersionedNodeArgv = buildParseArgv({
      programName: "openlocalbot",
      rawArgs: ["node-dev", "openlocalbot", "status"],
    });
    expect(nonVersionedNodeArgv).toEqual(["node", "openlocalbot", "node-dev", "openlocalbot", "status"]);

    const directArgv = buildParseArgv({
      programName: "openlocalbot",
      rawArgs: ["openlocalbot", "status"],
    });
    expect(directArgv).toEqual(["node", "openlocalbot", "status"]);

    const bunArgv = buildParseArgv({
      programName: "openlocalbot",
      rawArgs: ["bun", "src/entry.ts", "status"],
    });
    expect(bunArgv).toEqual(["bun", "src/entry.ts", "status"]);
  });

  it("builds parse argv from fallback args", () => {
    const fallbackArgv = buildParseArgv({
      programName: "openlocalbot",
      fallbackArgv: ["status"],
    });
    expect(fallbackArgv).toEqual(["node", "openlocalbot", "status"]);
  });

  it("decides when to migrate state", () => {
    expect(shouldMigrateState(["node", "openlocalbot", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "openlocalbot", "health"])).toBe(false);
    expect(shouldMigrateState(["node", "openlocalbot", "sessions"])).toBe(false);
    expect(shouldMigrateState(["node", "openlocalbot", "memory", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "openlocalbot", "agent", "--message", "hi"])).toBe(false);
    expect(shouldMigrateState(["node", "openlocalbot", "agents", "list"])).toBe(true);
    expect(shouldMigrateState(["node", "openlocalbot", "message", "send"])).toBe(true);
  });

  it("reuses command path for migrate state decisions", () => {
    expect(shouldMigrateStateFromPath(["status"])).toBe(false);
    expect(shouldMigrateStateFromPath(["agents", "list"])).toBe(true);
  });
});
