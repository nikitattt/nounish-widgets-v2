const version = 1

await update()

const data = await loadData()

const widgetUrl = 'https://nouns.wtf/'

const id = data.auction.id
const currentBid = data.auction.currentBid
const endTime = data.auction.endTime

const w = new ListWidget()
w.url = widgetUrl

const nounW = w.addStack()
nounW.layoutHorizontally()

nounW.addText(`Noun ${id}`)
nounW.addSpacer(null)
nounW.addText(`${currentBid} Ξ`)

const auctionW = w.addStack()
auctionW.layoutHorizontally()

auctionW.addText(`Ends In`)
auctionW.addSpacer(null)
const now = new Date().valueOf()
const timeToGo = endTime - now
const timeToGoText = secondsToDhms(timeToGo / 1000)
auctionW.addText(timeToGoText)

const propsW = w.addStack()
propsW.layoutHorizontally()

propsW.addText(`Active Props`)
propsW.addSpacer(null)
propsW.addText(`${numOfActiveProps(data.proposals)}`)

w.addSpacer(null)

Script.setWidget(w)
Script.complete()
w.presentMedium()

/*
* Utility Functions
*/

async function loadData() {
    const url = 'https://api.nounswidgets.wtf/nouns'
    const req = new Request(url)
    req.method = 'GET'
    req.headers = { 'Content-Type': 'application/json' }
    const res = await req.loadJSON()

    return res
}

function secondsToDhms(seconds) {
    seconds = Number(seconds)

    var h = Math.floor((seconds % (3600 * 24)) / 3600)
    var m = Math.floor((seconds % 3600) / 60)
    var s = Math.floor(seconds % 60)

    var hDisplay = h > 0 ? h + 'h ' : ''
    var mDisplay = m > 0 ? m + 'm ' : ''
    var sDisplay = s > 0 ? s + 's' : ''

    return hDisplay + mDisplay + sDisplay
}

function numOfActiveProps(proposals) {
    let n = 0

    proposals.forEach(e => {
        if (e.state === "ACTIVE") {
            n++
        }
    });

    return n
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