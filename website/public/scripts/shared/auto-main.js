const url = 'https://nounswidgets.wtf/scripts/shared/auto-main.js'
const icon = 'user-astronaut'
const color = 'red'

const version = 1

// async function checkForUpdates() {
//     const url = "https://example.com/myscript/version.json";
//     const response = await new Request(url).loadString();
//     const latestVersion = Number(response);
//     if (latestVersion > version) {
//         const updateUrl = "https://example.com/myscript/myscript.js";
//         const updateResponse = await new Request(updateUrl).loadString();
//         FileManager.iCloud().writeString("myscript.js", updateResponse);
//         console.log("Updated to version " + latestVersion);
//         return true;
//     } else {
//         console.log("Up to date");
//         return false;
//     }
// }

// (async () => {
//     const needsUpdate = await checkForUpdates();
//     if (needsUpdate) {
//         // Restart the script to load the new version
//         const fm = FileManager.iCloud();
//         const path = fm.joinPath(fm.documentsDirectory(), Script.name());
//         app.openURL("scriptable:///run/" + encodeURIComponent(path));
//         return;
//     }
//     // The rest of your script goes here
// })();

await update()

const w = new ListWidget()
w.backgroundColor = Color.black()

w.addSpacer(null)
const vT = w.addText(`${version}`)
vT.textColor = Color.white()
vT.font = Font.heavyRoundedSystemFont(32)
vT.centerAlignText()
w.addSpacer(null)

Script.setWidget(w)
Script.complete()
w.presentSmall()


async function update() {
    let req = new Request('https://nounswidgets.wtf/scripts/shared/auto-latest-version.js');
    let latestVersion = await req.loadString();
    if (latestVersion != String(version)) {
        fileManager = FileManager.iCloud()
        documentsDirectory = fileManager.documentsDirectory()

        let req = new Request(url);
        let code = await req.loadString();

        let codeToStore = Data.fromString(`// Variables used by Scriptable.\n// These must be at the very top of the file. Do not edit.\n// icon-color: ${color}; icon-glyph: ${icon};\n\n${code}`);
        let selfFilePath = fileManager.joinPath(documentsDirectory, Script.name() + '.js');
        fileManager.write(selfFilePath, codeToStore);
        let callback = new CallbackURL("scriptable:///run");
        callback.addParameter("scriptName", Script.name());
        callback.open();
    }
}