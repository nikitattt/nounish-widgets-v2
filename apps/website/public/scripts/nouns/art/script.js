const version = 1

await update()

const nounsUrl = 'https://nouns.wtf/'

const data = await loadData()
const image = data.auction.image
const imageObj = Image.fromData(Data.fromBase64String(image))

const w = new ListWidget()
w.backgroundImage = imageObj

Script.setWidget(w)
Script.complete()
w.presentSmall()

/*
* Utility Functions
*/

async function loadImage(imageUrl) {
    const req = new Request(imageUrl)
    return await req.loadImage()
}

async function loadData() {
    const url = 'https://api.nounswidgets.wtf/nouns/art'
    const req = new Request(url)
    req.method = 'GET'
    req.headers = { 'Content-Type': 'application/json' }
    const res = await req.loadJSON()

    return res
}

async function update() {
    let req = new Request(`${urlPath}/versions.json`);
    let versions = await req.loadJSON();
    if (versions.latestVersion > version) {
        fileManager = FileManager.iCloud()
        documentsDirectory = fileManager.documentsDirectory()

        let req = new Request(`${urlPath}/script.js`);
        let code = await req.loadString();

        let codeToStore = Data.fromString(`// Variables used by Scriptable.\n// These must be at the very top of the file. Do not edit.\n// icon-color: ${color}; icon-glyph: ${icon};\n// Created by: ng\n// Support: @iamng_eth\n\nconst urlPath = '${urlPath}'\nconst icon = '${icon}'\nconst color = '${color}'\n\n${code}`);
        let selfFilePath = fileManager.joinPath(documentsDirectory, Script.name() + '.js');
        fileManager.write(selfFilePath, codeToStore);
        let callback = new CallbackURL("scriptable:///run");
        callback.addParameter("scriptName", Script.name());
        callback.open();
    }
}