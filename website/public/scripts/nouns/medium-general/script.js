const version = 2 //TODO: revert to 1

await update()

const coolBackground = new Color('#d5d7e0')
const coolBorder = new Color('#bcc0d0')
const coolDarkText = new Color('#151c3b')
const coolLightText = new Color('#79809c')
const coolAccent = new Color('#e9ebf3')

const warmBackground = new Color('#e2d7d5')
const warmBorder = new Color('#d3bcb9')
const warmDarkText = new Color('#221b1a')
const warmLightText = new Color('#8f7e7c')
const warmAccent = new Color('#f9f1f1')

const red = new Color('#C24949')
const redSemiTransparent = new Color('#C24949', 0.4)

const widgetUrl = 'https://nouns.wtf/'

const data = await loadData()

const id = data.auction.id
const bidder = data.auction.bidder
const currentBid = data.auction.currentBid
const endTime = data.auction.endTime
const image = data.auction.image
const seed = data.auction.seed

const w = new ListWidget()
w.backgroundColor = pickByState(coolBackground, warmBackground)
w.url = widgetUrl

const auctionSectionW = w.addStack()

const idBarWidth = 42
const idBarHeight = 14

const nounW = auctionSectionW.addStack()
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

auctionSectionW.addSpacer(20)

const countdownW = auctionSectionW.addStack()
countdownW.layoutVertically()
countdownW.addSpacer(4)

const auctionEndsIn = countdownW.addText('Auction ends in')
auctionEndsIn.textColor = pickByState(coolDarkText, warmDarkText)
auctionEndsIn.font = Font.systemFont(12)

const now = new Date().valueOf()
const timeToGo = endTime - now

const timeToGoText = secondsToDhms(timeToGo / 1000)
const timeLeft = countdownW.addText(timeToGoText)
timeLeft.textColor = pickByState(coolDarkText, warmDarkText)
timeLeft.font = Font.heavySystemFont(18)

const dateFormatter = new DateFormatter()
dateFormatter.useShortTimeStyle()
const nowTime = dateFormatter.string(new Date())
const lastUpdated = countdownW.addText(`Updated: ${nowTime}`)
lastUpdated.textColor = pickByState(coolLightText, warmLightText)
lastUpdated.font = Font.semiboldSystemFont(10)

auctionSectionW.addSpacer(32)

const bidW = auctionSectionW.addStack()
bidW.layoutVertically()
bidW.addSpacer(4)

const currentBidTxt = bidW.addText('Current Bid')
currentBidTxt.textColor = pickByState(coolDarkText, warmDarkText)
currentBidTxt.font = Font.systemFont(12)

const bidTxt = bidW.addText(`${currentBid} Ξ`)
bidTxt.textColor = pickByState(coolDarkText, warmDarkText)
bidTxt.font = Font.heavySystemFont(18)

const bidderTxt = bidW.addText(`by: ${bidder}`)
bidderTxt.textColor = pickByState(coolLightText, warmLightText)
bidderTxt.font = Font.semiboldSystemFont(10)
bidderTxt.lineLimit = 1

w.addSpacer(4)

const proposalsSectionTitleW = w.addStack()
proposalsSectionTitleW.centerAlignContent()

const propsSectionTitle = proposalsSectionTitleW.addText('Active Proposals')
propsSectionTitle.textColor = pickByState(coolLightText, warmLightText)
propsSectionTitle.font = Font.systemFont(12)

proposalsSectionTitleW.addSpacer(6)

proposalsSectionTitleW.addImage(createLine(600, 2, pickByState(coolBorder, warmBorder)))

let firstDone = false
let totalDisplayed = 0

for (const proposal of data.proposals) {
    if (totalDisplayed > 2) continue
    w.addSpacer(4)
    displayProposal(proposal)
    totalDisplayed++
}

w.addSpacer(null)

Script.setWidget(w)
Script.complete()
w.presentMedium()

/*
* Utility Functions
*/

function pickByState(cool, warm) {
    return seed.background === '0' ? cool : warm
}

function displayProposal(proposal) {
    let barTextColor
    let barBorderColor
    let barText
    let time
    let deadlinePrefix

    if (proposal.state === "ACTIVE") {
        barTextColor = pickByState(coolLightText, warmLightText)
        barBorderColor = pickByState(coolBorder, warmBorder)
        barText = 'Active'
        time = new Date(proposal.endTime)
        deadlinePrefix = "Ends "
    } else {
        return
    }

    const timeLeft = proposal.endTime - new Date().valueOf()

    if (timeLeft <= 43200000) {
        barTextColor = red
        barBorderColor = redSemiTransparent
    }

    const deadline = getTime(time)
    const title = proposal.title

    const titleW = w.addStack()
    titleW.centerAlignContent()

    const barW = titleW.addStack()
    barW.cornerRadius = 3
    barW.borderWidth = 2
    barW.borderColor = barBorderColor
    barW.setPadding(2, 3, 2, 3)

    const barTxt = barW.addText(deadlinePrefix + deadline)
    barTxt.textColor = barTextColor
    barTxt.font = Font.boldSystemFont(8)

    titleW.addSpacer(4)

    const titleText = titleW.addText(title)
    titleText.textColor = pickByState(coolDarkText, warmDarkText)
    titleText.font = Font.semiboldSystemFont(12)
    titleText.lineLimit = 1
}

async function loadImage(imageUrl) {
    const req = new Request(imageUrl)
    const image = await req.loadImage()
    return image
}

async function loadData() {
    const url = 'https://api.nounswidgets.wtf/nouns'
    const req = new Request(url)
    req.method = 'GET'
    req.headers = { 'Content-Type': 'application/json' }
    const res = await req.loadJSON()

    return res
}

function getTime(time) {
    const relativeTime = new RelativeDateTimeFormatter().string(time, new Date())

    return relativeTime
}

function createLine(width, height, color) {
    const context = new DrawContext()
    context.size = new Size(width, height)
    context.opaque = false
    context.respectScreenScale = true
    const path = new Path()
    path.addRect(new Rect(0, 0, width, height))
    context.addPath(path)
    context.setFillColor(color)
    context.fillPath()
    return context.getImage()
}

function getIdBar(id, color, accent) {
    const context = new DrawContext()
    context.size = new Size(idBarWidth, idBarHeight)
    context.opaque = false
    context.respectScreenScale = true

    context.setFillColor(accent)
    const path = new Path()
    path.addRoundedRect(new Rect(2, 0, idBarWidth - 2, idBarHeight), 5, 4)
    context.addPath(path)
    context.fillPath()

    context.setTextAlignedCenter()
    context.setFont(Font.boldSystemFont(10))
    context.setTextColor(color)

    context.drawTextInRect(id, new Rect(2, 1, idBarWidth - 2, idBarHeight))

    return context.getImage()
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
