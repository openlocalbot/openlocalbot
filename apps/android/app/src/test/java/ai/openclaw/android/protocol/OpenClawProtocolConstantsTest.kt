package ai.openlocalbot.android.protocol

import org.junit.Assert.assertEquals
import org.junit.Test

class openlocalbotProtocolConstantsTest {
  @Test
  fun canvasCommandsUseStableStrings() {
    assertEquals("canvas.present", openlocalbotCanvasCommand.Present.rawValue)
    assertEquals("canvas.hide", openlocalbotCanvasCommand.Hide.rawValue)
    assertEquals("canvas.navigate", openlocalbotCanvasCommand.Navigate.rawValue)
    assertEquals("canvas.eval", openlocalbotCanvasCommand.Eval.rawValue)
    assertEquals("canvas.snapshot", openlocalbotCanvasCommand.Snapshot.rawValue)
  }

  @Test
  fun a2uiCommandsUseStableStrings() {
    assertEquals("canvas.a2ui.push", openlocalbotCanvasA2UICommand.Push.rawValue)
    assertEquals("canvas.a2ui.pushJSONL", openlocalbotCanvasA2UICommand.PushJSONL.rawValue)
    assertEquals("canvas.a2ui.reset", openlocalbotCanvasA2UICommand.Reset.rawValue)
  }

  @Test
  fun capabilitiesUseStableStrings() {
    assertEquals("canvas", openlocalbotCapability.Canvas.rawValue)
    assertEquals("camera", openlocalbotCapability.Camera.rawValue)
    assertEquals("screen", openlocalbotCapability.Screen.rawValue)
    assertEquals("voiceWake", openlocalbotCapability.VoiceWake.rawValue)
  }

  @Test
  fun screenCommandsUseStableStrings() {
    assertEquals("screen.record", openlocalbotScreenCommand.Record.rawValue)
  }
}
