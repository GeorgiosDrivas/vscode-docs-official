const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

const lngs = {
    "javascript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "python": "https://docs.python.org/3/",
    "html": "https://developer.mozilla.org/en-US/docs/Web/HTML"
};

function activate(context) {

    const disposable = vscode.commands.registerCommand('docsOfficial.activate', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor found');
            return;
        }

        const languageId = editor.document.languageId;
        const docUrl = lngs[languageId];

        if (docUrl) {
            vscode.window.showInformationMessage(`Documentation for ${languageId}`, "Open Documentation")
            .then(response => {
                if(response === "Open Documentation"){
                    vscode.env.openExternal(vscode.Uri.parse(docUrl));
                }
            });
        } else {
            vscode.window.showInformationMessage(`No documentation URL found for ${languageId}`);
        }
    });

    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'docsOfficial.activate';
    statusBarItem.text = '$(book) Open Docs';
    statusBarItem.tooltip = 'Open documentation for the current file';
    statusBarItem.show();

    context.subscriptions.push(statusBarItem, disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
