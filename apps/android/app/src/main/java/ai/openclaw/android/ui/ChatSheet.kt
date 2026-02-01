package ai.openlocalbot.android.ui

import androidx.compose.runtime.Composable
import ai.openlocalbot.android.MainViewModel
import ai.openlocalbot.android.ui.chat.ChatSheetContent

@Composable
fun ChatSheet(viewModel: MainViewModel) {
  ChatSheetContent(viewModel = viewModel)
}
