import Foundation

public enum openlocalbotChatTransportEvent: Sendable {
    case health(ok: Bool)
    case tick
    case chat(openlocalbotChatEventPayload)
    case agent(openlocalbotAgentEventPayload)
    case seqGap
}

public protocol openlocalbotChatTransport: Sendable {
    func requestHistory(sessionKey: String) async throws -> openlocalbotChatHistoryPayload
    func sendMessage(
        sessionKey: String,
        message: String,
        thinking: String,
        idempotencyKey: String,
        attachments: [openlocalbotChatAttachmentPayload]) async throws -> openlocalbotChatSendResponse

    func abortRun(sessionKey: String, runId: String) async throws
    func listSessions(limit: Int?) async throws -> openlocalbotChatSessionsListResponse

    func requestHealth(timeoutMs: Int) async throws -> Bool
    func events() -> AsyncStream<openlocalbotChatTransportEvent>

    func setActiveSessionKey(_ sessionKey: String) async throws
}

extension openlocalbotChatTransport {
    public func setActiveSessionKey(_: String) async throws {}

    public func abortRun(sessionKey _: String, runId _: String) async throws {
        throw NSError(
            domain: "openlocalbotChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "chat.abort not supported by this transport"])
    }

    public func listSessions(limit _: Int?) async throws -> openlocalbotChatSessionsListResponse {
        throw NSError(
            domain: "openlocalbotChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "sessions.list not supported by this transport"])
    }
}
