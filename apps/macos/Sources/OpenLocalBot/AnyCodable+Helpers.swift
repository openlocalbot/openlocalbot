import openlocalbotKit
import openlocalbotProtocol
import Foundation

// Prefer the openlocalbotKit wrapper to keep gateway request payloads consistent.
typealias AnyCodable = openlocalbotKit.AnyCodable
typealias InstanceIdentity = openlocalbotKit.InstanceIdentity

extension AnyCodable {
    var stringValue: String? { self.value as? String }
    var boolValue: Bool? { self.value as? Bool }
    var intValue: Int? { self.value as? Int }
    var doubleValue: Double? { self.value as? Double }
    var dictionaryValue: [String: AnyCodable]? { self.value as? [String: AnyCodable] }
    var arrayValue: [AnyCodable]? { self.value as? [AnyCodable] }

    var foundationValue: Any {
        switch self.value {
        case let dict as [String: AnyCodable]:
            dict.mapValues { $0.foundationValue }
        case let array as [AnyCodable]:
            array.map(\.foundationValue)
        default:
            self.value
        }
    }
}

extension openlocalbotProtocol.AnyCodable {
    var stringValue: String? { self.value as? String }
    var boolValue: Bool? { self.value as? Bool }
    var intValue: Int? { self.value as? Int }
    var doubleValue: Double? { self.value as? Double }
    var dictionaryValue: [String: openlocalbotProtocol.AnyCodable]? { self.value as? [String: openlocalbotProtocol.AnyCodable] }
    var arrayValue: [openlocalbotProtocol.AnyCodable]? { self.value as? [openlocalbotProtocol.AnyCodable] }

    var foundationValue: Any {
        switch self.value {
        case let dict as [String: openlocalbotProtocol.AnyCodable]:
            dict.mapValues { $0.foundationValue }
        case let array as [openlocalbotProtocol.AnyCodable]:
            array.map(\.foundationValue)
        default:
            self.value
        }
    }
}
