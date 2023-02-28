// AutoInstallTest Widget

const scriptName = 'AutoInstallTest'
const url = 'https://nounswidgets.wtf/scripts/shared/auto-install.js'
const icon = 'user-astronaut'
const color = 'red'

fileManager = FileManager.iCloud()
documentsDirectory = fileManager.documentsDirectory()

let filePath = fileManager.joinPath(documentsDirectory, scriptName + '.js');
let req = new Request(sourceUrl);
let code = await req.loadString();
let hash = hashCode(code);
let codeToStore = Data.fromString(`// Variables used by Scriptable.\n// These must be at the very top of the file. Do not edit.\n// icon-color: ${color}; icon-glyph: ${icon};\n\n${code}`);
fileManager.write(filePath, codeToStore);
let selfFilePath = fileManager.joinPath(documentsDirectory, Script.name() + '.js');
fileManager.remove(selfFilePath);
let callback = new CallbackURL("scriptable:///run");
callback.addParameter("scriptName", scriptName);
callback.open();