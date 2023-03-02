const version = 2

await update()

const coolBackground = '#d5d7e0'
const coolBorder = '#bcc0d0'
const coolDarkText = '#151c3b'
const coolLightText = '#79809c'
const coolAccent = '#e9ebf3'

const warmBackground = '#e2d7d5'
const warmBorder = '#d3bcb9'
const warmDarkText = '#221b1a'
const warmLightText = '#8f7e7c'
const warmAccent = '#f9f1f1'

const width = 115
const h = 9

const idBarWidth = 42
const idBarHeight = 16

const nounsUrl = 'https://nouns.wtf/'
const fomoUrl = 'https://fomonouns.wtf/'

const data = await loadData()

const id = data.auction.id
const bidder = data.auction.bidder
const currentBid = data.auction.currentBid
const endTime = data.auction.endTime
const image = data.auction.image
const seed = data.auction.seed

const activeAuction = endTime > new Date().valueOf()

const w = new ListWidget()
w.backgroundColor = new Color(pickByState(coolBackground, warmBackground))

const nounsAndBidW = w.addStack()

const nounW = nounsAndBidW.addStack()
nounW.layoutVertically()

const imageObj = Image.fromData(Data.fromBase64String(image))
const nounImage = nounW.addImage(imageObj)
nounImage.imageSize = new Size(42, 42)

const idBar = nounW.addImage(
    getIdBar(
        `${id}`,
        pickByState(coolDarkText, warmDarkText),
        pickByState(coolAccent, warmAccent)
    )
)
idBar.imageSize = new Size(idBarWidth, idBarHeight)

nounsAndBidW.addSpacer(8)

const bidW = nounsAndBidW.addStack()
bidW.layoutVertically()

bidW.addSpacer(6)

let bidTitleText
if (activeAuction) {
    bidTitleText = 'Current bid'
} else {
    bidTitleText = 'Winning bid'
}

const title = bidW.addText(bidTitleText)
title.textColor = new Color(pickByState(coolDarkText, warmDarkText))
title.font = Font.systemFont(12)

w.addSpacer(2)
const bid = bidW.addText(`${currentBid} Ξ`)
bid.textColor = new Color(pickByState(coolDarkText, warmDarkText))
bid.font = Font.heavySystemFont(18)

w.addSpacer(2)
const dateFormatter = new DateFormatter()
dateFormatter.useShortTimeStyle()
const nowTime = dateFormatter.string(new Date())
const lastUpdated = bidW.addText(`Updated: ${nowTime}`)
lastUpdated.textColor = new Color(pickByState(coolLightText, warmLightText))
lastUpdated.font = Font.systemFont(10)

if (activeAuction) {
    w.addSpacer(8)
    const auctionEndsIn = w.addText('Auction ends in')
    auctionEndsIn.textColor = new Color(pickByState(coolDarkText, warmDarkText))
    auctionEndsIn.font = Font.systemFont(12)

    const now = new Date().valueOf()
    const timeToGo = (endTime - now) / 1000

    const timeToGoText = secondsToDhms(timeToGo)
    const timeLeft = w.addText(timeToGoText)
    timeLeft.textColor = new Color(pickByState(coolDarkText, warmDarkText))
    timeLeft.font = Font.heavySystemFont(18)

    w.addSpacer(8)
    const progress = w.addImage(
        createProgress(
            86400,
            timeToGo,
            pickByState(coolDarkText, warmDarkText),
            pickByState(coolAccent, warmAccent)
        )
    )
    progress.imageSize = new Size(width, h)

    w.url = nounsUrl
} else {
    w.addSpacer(8)

    const fomo = w.addText('Time To Play Fomo!')
    fomo.textColor = new Color(pickByState(coolDarkText, warmDarkText))
    fomo.font = Font.heavySystemFont(18)

    w.url = fomoUrl
}

Script.setWidget(w)
Script.complete()
w.presentSmall()

/*
* Utility Functions
*/

function pickByState(cool, warm) {
    return seed.background === '0' ? cool : warm
}

async function loadImage(imageUrl) {
    const req = new Request(imageUrl)
    return await req.loadImage()
}

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

function getIdBar(id, color, accent) {
    const context = new DrawContext()
    context.size = new Size(idBarWidth, idBarHeight)
    context.opaque = false
    context.respectScreenScale = true

    context.setFillColor(new Color(accent))
    const path = new Path()
    path.addRoundedRect(new Rect(2, 0, idBarWidth - 2, idBarHeight), 5, 4)
    context.addPath(path)
    context.fillPath()

    context.setTextAlignedCenter()
    context.setFont(Font.boldSystemFont(11))
    context.setTextColor(new Color(color))

    context.drawTextInRect(id, new Rect(2, 1, idBarWidth - 2, idBarHeight))

    return context.getImage()
}

function createProgress(total, haveGone, color, accent) {
    const context = new DrawContext()
    context.size = new Size(width, h)
    context.opaque = false
    context.respectScreenScale = true
    context.setFillColor(new Color(accent))
    const path = new Path()
    path.addRoundedRect(new Rect(0, 0, width, h), 5, 4)
    context.addPath(path)
    context.fillPath()
    context.setFillColor(new Color(color))
    const path1 = new Path()
    path1.addRoundedRect(new Rect(0, 0, (width * haveGone) / total, h), 5, 4)
    context.addPath(path1)
    context.fillPath()
    return context.getImage()
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