import * as vscode from "vscode";

/**
 * @param {vscode.ExtensionContext} context
 */

const lngs: any = {
  javascript: {
    en: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    es: "https://developer.mozilla.org/es/docs/Web/JavaScript",
    fr: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
    pt: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
  },
  python: {
    en: "https://docs.python.org/3/",
    es: "https://docs.python.org/es/3/",
    fr: "https://docs.python.org/fr/3/",
    pt: "https://docs.python.org/pt-br/3/",
  },
  html: {
    en: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    es: "https://developer.mozilla.org/es/docs/Web/HTML",
    fr: "https://developer.mozilla.org/fr/docs/Web/HTML",
    pt: "https://developer.mozilla.org/pt-BR/docs/Web/HTML",
  },
  php: {
    en: "https://www.php.net/docs.php",
    es: "https://www.php.net/manual/es/",
    fr: "https://www.php.net/manual/fr/",
    pt: "https://www.php.net/manual/pt_BR/",
  },
  typescript: "https://www.typescriptlang.org/docs/",
  jsx: {
    en: "https://react.dev/learn/writing-markup-with-jsx",
    fr: "https://fr.react.dev/learn/writing-markup-with-jsx",
    es: "https://es.react.dev/learn/writing-markup-with-jsx",
  },
  css: {
    en: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    es: "https://developer.mozilla.org/es/docs/Web/CSS",
    fr: "https://developer.mozilla.org/fr/docs/Web/CSS",
    pt: "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
  },
  sass: "https://sass-lang.com/documentation/",
  json: {
    en: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
    es: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON",
    fr: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON",
    pt: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON",
  },
  cpp: "https://devdocs.io/cpp/",
  java: "https://docs.oracle.com/en/java/",
  tsx: "https://typescriptlang.org/docs/handbook/jsx.html",
};

export function activate(context: any) {
  // Retrieves the VS Code interface language
  function getVsCodeLanguage() {
    const language = vscode.env.language;
    // vscode.window.showInformationMessage(
    //   `VS Code language is set to: ${language}`
    // );
    return language;
  }

  const disposable = vscode.commands.registerCommand(
    "docsOfficial.activate",
    function () {
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
