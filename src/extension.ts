import * as vscode from "vscode";

/**
 * @param {vscode.ExtensionContext} context
 */

const lngs: any = {
  javascript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  python: "https://docs.python.org/3/",
  html: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  php: "https://www.php.net/docs.php",
  typescript: "https://www.typescriptlang.org/docs/",
  jsx: "https://react.dev/learn/writing-markup-with-jsx",
  css: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  sass: "https://sass-lang.com/documentation/",
  json: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
  cpp: "https://devdocs.io/cpp/",
  java: "https://docs.oracle.com/en/java/",
  tsx: "https://typescriptlang.org/docs/handbook/jsx.html",
};

export function activate(context: any) {
  const disposable = vscode.commands.registerCommand(
    "docsOfficial.activate",
    function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("No active editor found");
        return;
      }

      const languageId = editor.document.languageId;
      const docUrl = lngs[languageId];

      if (docUrl) {
        vscode.window
          .showInformationMessage(
            `Documentation for ${languageId}`,
            "Open Documentation"
          )
          .then((response) => {
            if (response === "Open Documentation") {
              vscode.env.openExternal(vscode.Uri.parse(docUrl));
            }
          });
      } else {
        vscode.window.showInformationMessage(
          `No documentation URL found for ${languageId}`
        );
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
