import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { resolveOpenLocalBotAgentDir } from "./agent-paths.js";

describe("resolveOpenLocalBotAgentDir", () => {
  const previousStateDir = process.env.openlocalbot_STATE_DIR;
  const previousAgentDir = process.env.openlocalbot_AGENT_DIR;
  const previousPiAgentDir = process.env.PI_CODING_AGENT_DIR;
  let tempStateDir: string | null = null;

  afterEach(async () => {
    if (tempStateDir) {
      await fs.rm(tempStateDir, { recursive: true, force: true });
      tempStateDir = null;
    }
    if (previousStateDir === undefined) {
      delete process.env.openlocalbot_STATE_DIR;
    } else {
      process.env.openlocalbot_STATE_DIR = previousStateDir;
    }
    if (previousAgentDir === undefined) {
      delete process.env.openlocalbot_AGENT_DIR;
    } else {
      process.env.openlocalbot_AGENT_DIR = previousAgentDir;
    }
    if (previousPiAgentDir === undefined) {
      delete process.env.PI_CODING_AGENT_DIR;
    } else {
      process.env.PI_CODING_AGENT_DIR = previousPiAgentDir;
    }
  });

  it("defaults to the multi-agent path when no overrides are set", async () => {
    tempStateDir = await fs.mkdtemp(path.join(os.tmpdir(), "openlocalbot-agent-"));
    process.env.openlocalbot_STATE_DIR = tempStateDir;
    delete process.env.openlocalbot_AGENT_DIR;
    delete process.env.PI_CODING_AGENT_DIR;

    const resolved = resolveOpenLocalBotAgentDir();

    expect(resolved).toBe(path.join(tempStateDir, "agents", "main", "agent"));
  });

  it("honors openlocalbot_AGENT_DIR overrides", async () => {
    tempStateDir = await fs.mkdtemp(path.join(os.tmpdir(), "openlocalbot-agent-"));
    const override = path.join(tempStateDir, "agent");
    process.env.openlocalbot_AGENT_DIR = override;
    delete process.env.PI_CODING_AGENT_DIR;

    const resolved = resolveOpenLocalBotAgentDir();

    expect(resolved).toBe(path.resolve(override));
  });
});
