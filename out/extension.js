"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
/**
 * @param {vscode.ExtensionContext} context
 */
const lngs = {
    javascript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    python: "https://docs.python.org/3/",
    html: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    php: "https://www.php.net/docs.php",
    ts: "https://www.typescriptlang.org/docs/",
    jsx: "https://react.dev/learn/writing-markup-with-jsx",
    css: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    sass: "https://sass-lang.com/documentation/",
    json: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
    cpp: "https://devdocs.io/cpp/",
    java: "https://docs.oracle.com/en/java/",
    tsx: "https://typescriptlang.org/docs/handbook/jsx.html",
};
function activate(context) {
    const disposable = vscode.commands.registerCommand("docsOfficial.activate", function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("No active editor found");
            return;
        }
        const languageId = editor.document.languageId;
        const docUrl = lngs[languageId];
        if (docUrl) {
            vscode.window
                .showInformationMessage(`Documentation for ${languageId}`, "Open Documentation")
                .then((response) => {
                if (response === "Open Documentation") {
                    vscode.env.openExternal(vscode.Uri.parse(docUrl));
                }
            });
        }
        else {
            vscode.window.showInformationMessage(`No documentation URL found for ${languageId}`);
        }
    });
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = "docsOfficial.activate";
    statusBarItem.text = "$(book) Open Docs";
    statusBarItem.tooltip = "Open documentation for the current file";
    statusBarItem.show();
    context.subscriptions.push(statusBarItem, disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map