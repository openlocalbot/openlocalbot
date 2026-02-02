import Foundation

public enum openlocalbotCameraCommand: String, Codable, Sendable {
    case list = "camera.list"
    case snap = "camera.snap"
    case clip = "camera.clip"
}

public enum openlocalbotCameraFacing: String, Codable, Sendable {
    case back
    case front
}

public enum openlocalbotCameraImageFormat: String, Codable, Sendable {
    case jpg
    case jpeg
}

public enum openlocalbotCameraVideoFormat: String, Codable, Sendable {
    case mp4
}

public struct openlocalbotCameraSnapParams: Codable, Sendable, Equatable {
    public var facing: openlocalbotCameraFacing?
    public var maxWidth: Int?
    public var quality: Double?
    public var format: openlocalbotCameraImageFormat?
    public var deviceId: String?
    public var delayMs: Int?

    public init(
        facing: openlocalbotCameraFacing? = nil,
        maxWidth: Int? = nil,
        quality: Double? = nil,
        format: openlocalbotCameraImageFormat? = nil,
        deviceId: String? = nil,
        delayMs: Int? = nil)
    {
        self.facing = facing
        self.maxWidth = maxWidth
        self.quality = quality
        self.format = format
        self.deviceId = deviceId
        self.delayMs = delayMs
    }
}

public struct openlocalbotCameraClipParams: Codable, Sendable, Equatable {
    public var facing: openlocalbotCameraFacing?
    public var durationMs: Int?
    public var includeAudio: Bool?
    public var format: openlocalbotCameraVideoFormat?
    public var deviceId: String?

    public init(
        facing: openlocalbotCameraFacing? = nil,
        durationMs: Int? = nil,
        includeAudio: Bool? = nil,
        format: openlocalbotCameraVideoFormat? = nil,
        deviceId: String? = nil)
    {
        self.facing = facing
        self.durationMs = durationMs
        self.includeAudio = includeAudio
        self.format = format
        self.deviceId = deviceId
    }
}
