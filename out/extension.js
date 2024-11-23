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
const constants_1 = require("./consts/constants");
const getVsCodeLanguage_1 = require("./utils/getVsCodeLanguage");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const disposable = vscode.commands.registerCommand("docsOfficial.activate", async function () {
        const action = await vscode.window.showQuickPick(["Search by Keyword", "Open Documentation"], {
            placeHolder: "Choose an action",
            canPickMany: false,
        });
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
                const searchUrl = constants_1.searchUrls[languageId];
                if (searchUrl) {
                    vscode.env.openExternal(vscode.Uri.parse(`${searchUrl}${encodeURIComponent(keyword)}`));
                }
                else {
                    vscode.window.showErrorMessage("Documentation not available for the selected language.");
                }
            }
        }
        else if (action === "Open Documentation") {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage("No active editor found");
                return;
            }
            const languageId = editor.document.languageId;
            const docUrl = constants_1.lngs[languageId][(0, getVsCodeLanguage_1.getVsCodeLanguage)()]
                ? constants_1.lngs[languageId][(0, getVsCodeLanguage_1.getVsCodeLanguage)()]
                : constants_1.lngs[languageId]["en"];
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