// swift-tools-version: 6.2
// Package manifest for the openlocalbot macOS companion (menu bar app + IPC library).

import PackageDescription

let package = Package(
    name: "openlocalbot",
    platforms: [
        .macOS(.v15),
    ],
    products: [
        .library(name: "openlocalbotIPC", targets: ["openlocalbotIPC"]),
        .library(name: "openlocalbotDiscovery", targets: ["openlocalbotDiscovery"]),
        .executable(name: "openlocalbot", targets: ["openlocalbot"]),
        .executable(name: "openlocalbot-mac", targets: ["openlocalbotMacCLI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/orchetect/MenuBarExtraAccess", exact: "1.2.2"),
        .package(url: "https://github.com/swiftlang/swift-subprocess.git", from: "0.1.0"),
        .package(url: "https://github.com/apple/swift-log.git", from: "1.8.0"),
        .package(url: "https://github.com/sparkle-project/Sparkle", from: "2.8.1"),
        .package(url: "https://github.com/steipete/Peekaboo.git", branch: "main"),
        .package(path: "../shared/openlocalbotKit"),
        .package(path: "../../Swabble"),
    ],
    targets: [
        .target(
            name: "openlocalbotIPC",
            dependencies: [],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "openlocalbotDiscovery",
            dependencies: [
                .product(name: "openlocalbotKit", package: "openlocalbotKit"),
            ],
            path: "Sources/openlocalbotDiscovery",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "openlocalbot",
            dependencies: [
                "openlocalbotIPC",
                "openlocalbotDiscovery",
                .product(name: "openlocalbotKit", package: "openlocalbotKit"),
                .product(name: "openlocalbotChatUI", package: "openlocalbotKit"),
                .product(name: "openlocalbotProtocol", package: "openlocalbotKit"),
                .product(name: "SwabbleKit", package: "swabble"),
                .product(name: "MenuBarExtraAccess", package: "MenuBarExtraAccess"),
                .product(name: "Subprocess", package: "swift-subprocess"),
                .product(name: "Logging", package: "swift-log"),
                .product(name: "Sparkle", package: "Sparkle"),
                .product(name: "PeekabooBridge", package: "Peekaboo"),
                .product(name: "PeekabooAutomationKit", package: "Peekaboo"),
            ],
            exclude: [
                "Resources/Info.plist",
            ],
            resources: [
                .copy("Resources/openlocalbot.icns"),
                .copy("Resources/DeviceModels"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "openlocalbotMacCLI",
            dependencies: [
                "openlocalbotDiscovery",
                .product(name: "openlocalbotKit", package: "openlocalbotKit"),
                .product(name: "openlocalbotProtocol", package: "openlocalbotKit"),
            ],
            path: "Sources/openlocalbotMacCLI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "openlocalbotIPCTests",
            dependencies: [
                "openlocalbotIPC",
                "openlocalbot",
                "openlocalbotDiscovery",
                .product(name: "openlocalbotProtocol", package: "openlocalbotKit"),
                .product(name: "SwabbleKit", package: "swabble"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
