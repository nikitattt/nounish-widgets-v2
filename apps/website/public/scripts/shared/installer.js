let fileManager
try {
  fileManager = FileManager.iCloud()
  fileManager.documentsDirectory()
} catch (e) {
  fileManager = FileManager.local()
}
let documentsDirectory = fileManager.documentsDirectory()
let filePath = fileManager.joinPath(documentsDirectory, scriptName + '.js');
let req = new Request(`${urlPath}/script.js`);
let code = await req.loadString();
let codeToStore = Data.fromString(`// Variables used by Scriptable.\n// These must be at the very top of the file. Do not edit.\n// icon-color: ${color}; icon-glyph: ${icon};\n// Created by: ng\n// Support: [X]: @iamng_eth, [Farcaster]: @iamng\n// Website: nounswidgets.wtf\n\nconst urlPath = '${urlPath}'\nconst icon = '${icon}'\nconst color = '${color}'\n\n${code}`);
fileManager.write(filePath, codeToStore);
let selfFilePath = fileManager.joinPath(documentsDirectory, Script.name() + '.js');
fileManager.remove(selfFilePath);
let callback = new CallbackURL("scriptable:///run");
callback.addParameter("scriptName", scriptName);
callback.open();