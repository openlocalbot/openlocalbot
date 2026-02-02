// swift-tools-version: 6.2

import PackageDescription

let package = Package(
    name: "openlocalbotKit",
    platforms: [
        .iOS(.v18),
        .macOS(.v15),
    ],
    products: [
        .library(name: "openlocalbotProtocol", targets: ["openlocalbotProtocol"]),
        .library(name: "openlocalbotKit", targets: ["openlocalbotKit"]),
        .library(name: "openlocalbotChatUI", targets: ["openlocalbotChatUI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/steipete/ElevenLabsKit", exact: "0.1.0"),
        .package(url: "https://github.com/gonzalezreal/textual", exact: "0.3.1"),
    ],
    targets: [
        .target(
            name: "openlocalbotProtocol",
            path: "Sources/openlocalbotProtocol",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "openlocalbotKit",
            dependencies: [
                "openlocalbotProtocol",
                .product(name: "ElevenLabsKit", package: "ElevenLabsKit"),
            ],
            path: "Sources/openlocalbotKit",
            resources: [
                .process("Resources"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "openlocalbotChatUI",
            dependencies: [
                "openlocalbotKit",
                .product(
                    name: "Textual",
                    package: "textual",
                    condition: .when(platforms: [.macOS, .iOS])),
            ],
            path: "Sources/openlocalbotChatUI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "openlocalbotKitTests",
            dependencies: ["openlocalbotKit", "openlocalbotChatUI"],
            path: "Tests/openlocalbotKitTests",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
