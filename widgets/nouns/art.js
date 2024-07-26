// Created by: ng
// Support: @iamng_eth

const urlPath = 'https://nounswidgets.wtf/scripts/nouns/art'
const icon = 'adjust'
const color = 'red'

const version = 1

await update()

const nounsUrl = 'https://nouns.wtf/'

//const data = await loadData()
//const image = data.auction.image
//const imageObj = Image.fromData(Data.fromBase64String(image))

const imageObj = await fetchImage()

const canvas = new DrawContext()

//canvas.respectScreenScale = true
canvas.size = new Size(2000, 2000)

console.log(canvas.size)

//canvas.drawImageAtPoint(imageObj, new Point(0, 0))
canvas.drawImageInRect(imageObj, new Rect(0, 0, canvas.size.width, canvas.size.height))

const canvasImage = canvas.getImage()
console.log(canvasImage.size)

const w = new ListWidget()
w.backgroundImage = imageObj
//w.backgroundImage = canvasImage

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

const imageFileName = "daily-noun.png"


// fetches the image once, after that the local copy is used
async function fetchImage() {
    let fm = FileManager.iCloud()
    let dir = fm.documentsDirectory()
    let path = fm.joinPath(dir, imageFileName)
    let file_exists = false
    let gotRemoteImage = false
    let cImage
    let rawData

    // check if file already exists
    try {
        if (fm.fileExists(path)) {
            rawData = await fm.read(path);
            cImage = Image.fromData(rawData)
            if (typeof cImage === 'object') {
                file_exists = true
            }
        }
    } catch (err) {
        file_exists = false
    }

    if (!file_exists) {
        try {
            //rawData = await loadImage(remoteURL)
            const data = await loadData()
            const image = data.auction.image
            cImage = Image.fromData(Data.fromBase64String(image))

            //if (typeof rawData === 'object') {
            gotRemoteImage = true
            //cImage = Image.fromData(rawData)
            await fm.write(path, rawData);
            //}
        } catch (err) {
            gotRemoteImage = false
        }
    }

    return cImage
}

