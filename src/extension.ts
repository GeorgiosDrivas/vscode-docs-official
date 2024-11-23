import * as vscode from "vscode";
import { lngs, searchUrls } from "./consts/constants";
import { getVsCodeLanguage } from "./utils/getVsCodeLanguage";

/**
 * @param {vscode.ExtensionContext} context
 */

export function activate(context: any) {
  const disposable = vscode.commands.registerCommand(
    "docsOfficial.activate",
    async function () {
      const action = await vscode.window.showQuickPick(
        ["Search by Keyword", "Open Documentation"],
        {
          placeHolder: "Choose an action",
          canPickMany: false,
        }
      );

      if (action === "Search by Keyword") {
        const keyword = await vscode.window.showInputBox({
          prompt: "Enter a keyword to search in the documentation",
          placeHolder: "e.g., async/await, decorators",
        });

        if (keyword) {
          const editor = vscode.window.activeTextEditor;
          if (!editor) {
            vscode.window.showInformationMessage("No active editor found");
            return;
          }

          const languageId = editor.document.languageId;
          const searchUrl = searchUrls[languageId];

          if (searchUrl) {
            vscode.env.openExternal(
              vscode.Uri.parse(`${searchUrl}${encodeURIComponent(keyword)}`)
            );
          } else {
            vscode.window.showErrorMessage(
              "Documentation not available for the selected language."
            );
          }
        }
      } else if (action === "Open Documentation") {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          vscode.window.showInformationMessage("No active editor found");
          return;
        }

        const languageId = editor.document.languageId;
        const docUrl = lngs[languageId][getVsCodeLanguage()]
          ? lngs[languageId][getVsCodeLanguage()]
          : lngs[languageId]["en"];

        if (docUrl) {
          vscode.env.openExternal(vscode.Uri.parse(docUrl));
        } else {
          vscode.window.showInformationMessage(
            `No documentation URL found for ${languageId}`
          );
        }
      }
    }
  );

  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = "docsOfficial.activate";
  statusBarItem.text = "$(book) Open Docs";
  statusBarItem.tooltip = "Open documentation for the current file";
  statusBarItem.show();

  context.subscriptions.push(statusBarItem, disposable);
}

export function deactivate() {}
