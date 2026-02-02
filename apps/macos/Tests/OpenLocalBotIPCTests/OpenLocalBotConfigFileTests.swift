import Foundation
import Testing
@testable import openlocalbot

@Suite(.serialized)
struct OpenLocalBotConfigFileTests {
    @Test
    func configPathRespectsEnvOverride() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("openlocalbot-config-\(UUID().uuidString)")
            .appendingPathComponent("openlocalbot.json")
            .path

        await TestIsolation.withEnvValues(["openlocalbot_CONFIG_PATH": override]) {
            #expect(OpenLocalBotConfigFile.url().path == override)
        }
    }

    @MainActor
    @Test
    func remoteGatewayPortParsesAndMatchesHost() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("openlocalbot-config-\(UUID().uuidString)")
            .appendingPathComponent("openlocalbot.json")
            .path

        await TestIsolation.withEnvValues(["openlocalbot_CONFIG_PATH": override]) {
            OpenLocalBotConfigFile.saveDict([
                "gateway": [
                    "remote": [
                        "url": "ws://gateway.ts.net:19999",
                    ],
                ],
            ])
            #expect(OpenLocalBotConfigFile.remoteGatewayPort() == 19999)
            #expect(OpenLocalBotConfigFile.remoteGatewayPort(matchingHost: "gateway.ts.net") == 19999)
            #expect(OpenLocalBotConfigFile.remoteGatewayPort(matchingHost: "gateway") == 19999)
            #expect(OpenLocalBotConfigFile.remoteGatewayPort(matchingHost: "other.ts.net") == nil)
        }
    }

    @MainActor
    @Test
    func setRemoteGatewayUrlPreservesScheme() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("openlocalbot-config-\(UUID().uuidString)")
            .appendingPathComponent("openlocalbot.json")
            .path

        await TestIsolation.withEnvValues(["openlocalbot_CONFIG_PATH": override]) {
            OpenLocalBotConfigFile.saveDict([
                "gateway": [
                    "remote": [
                        "url": "wss://old-host:111",
                    ],
                ],
            ])
            OpenLocalBotConfigFile.setRemoteGatewayUrl(host: "new-host", port: 2222)
            let root = OpenLocalBotConfigFile.loadDict()
            let url = ((root["gateway"] as? [String: Any])?["remote"] as? [String: Any])?["url"] as? String
            #expect(url == "wss://new-host:2222")
        }
    }

    @Test
    func stateDirOverrideSetsConfigPath() async {
        let dir = FileManager().temporaryDirectory
            .appendingPathComponent("openlocalbot-state-\(UUID().uuidString)", isDirectory: true)
            .path

        await TestIsolation.withEnvValues([
            "openlocalbot_CONFIG_PATH": nil,
            "openlocalbot_STATE_DIR": dir,
        ]) {
            #expect(OpenLocalBotConfigFile.stateDirURL().path == dir)
            #expect(OpenLocalBotConfigFile.url().path == "\(dir)/openlocalbot.json")
        }
    }
}
