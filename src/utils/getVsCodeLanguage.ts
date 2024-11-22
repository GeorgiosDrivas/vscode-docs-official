import * as vscode from "vscode";

// Retrieves the VS Code interface language
export const getVsCodeLanguage = () => {
  const language = vscode.env.language;
  // vscode.window.showInformationMessage(
  //   `VS Code language is set to: ${language}`
  // );
  return language;
};
