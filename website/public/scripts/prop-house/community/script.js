const version = 1

await update()

const white = new Color('#FFFFFF')
const black = new Color('#000000')
const purple = new Color('#8A2BE2')
const purpleSemiTransparent = new Color('#8A2BE2', 0.25)
const green = new Color('#50BA9A')
const greenSemiTransparent = new Color('#50BA9A', 0.4)
const greyOne = new Color('#BBBBBB')
const greyTwo = new Color('#666666')
const borderLight = new Color('#000000', 0.14)

const propHouseUrl = 'https://prop.house/'

const address = args.widgetParameter

const data = await loadCommunity(address)

const communityName = data.name
const communityAuctions = data.auctions

const w = new ListWidget()
w.backgroundColor = white
w.url = propHouseUrl

const communityNameW = w.addStack()
communityNameW.centerAlignContent()

const image = await loadImage("https://prop.house/bulb.png")
const bulb = communityNameW.addImage(image)
bulb.imageSize = new Size(18, 18)

communityNameW.addSpacer(6)

const commName = communityNameW.addText(`${communityName} House`)
commName.textColor = black
commName.font = Font.heavySystemFont(12)

w.addSpacer(4)
w.addImage(createLine(850, 2, greyOne))

const now = new Date()

const openAndVoting = []
const upcoming = []

for (const auction of communityAuctions) {
    if (auction.status === "Open" || auction.status === "Voting") {
        openAndVoting.push(auction)
    } else if (auction.status === "Upcoming") {
        upcoming.push(auction)
    }
}

let firstDone = false
let totalDisplayed = 0

for (const auction of openAndVoting) {
    if (totalDisplayed > 2) continue
    doSpacing()
    displayAuction(auction)
    totalDisplayed++
}

if (totalDisplayed <= 2) {
    for (const auction of upcoming) {
        if (totalDisplayed > 2) continue
        doSpacing()
        displayAuction(auction)
        totalDisplayed++
    }
}

if (totalDisplayed == 0) {
    w.addSpacer(6)
    const noRounds = w.addText('No Active or Upcoming rounds')
    noRounds.textColor = greyOne
    noRounds.font = Font.systemFont(12)
}

w.addSpacer(null)

Script.setWidget(w)
Script.complete()
w.presentMedium()

/*
* Utility Functions
*/

function doSpacing() {
    if (!firstDone) {
        firstDone = true
        w.addSpacer(4)
    } else {
        w.addSpacer(6)
    }
}

function displayAuction(auction) {
    let barTextColor
    let barBorderColor
    let barText
    let time

    if (auction.status === "Open") {
        barTextColor = green
        barBorderColor = greenSemiTransparent
        barText = 'Proposing'
        time = new Date(auction.proposalEndTime)
    } else if (auction.status === "Voting") {
        barTextColor = purple
        barBorderColor = purpleSemiTransparent
        barText = 'Voting'
        time = new Date(auction.votingEndTime)
    } else if (auction.status === "Upcoming") {
        barTextColor = greyTwo
        barBorderColor = borderLight
        barText = 'Not Started'
        time = new Date(auction.startTime)
    }

    const deadline = getTime(time)
    const funding = `${auction.fundingAmount} ${auction.currencyType} × ${auction.numWinners}`
    const proposals = auction.proposals.length
    const title = auction.title

    const titleW = w.addStack()
    titleW.centerAlignContent()

    const barW = titleW.addStack()
    barW.cornerRadius = 3
    barW.borderWidth = 2
    barW.borderColor = barBorderColor
    barW.setPadding(2, 3, 2, 3)

    const barTxt = barW.addText(barText)
    barTxt.textColor = barTextColor
    barTxt.font = Font.boldSystemFont(8)

    titleW.addSpacer(4)

    const titleText = titleW.addText(title)
    titleText.textColor = black
    titleText.font = Font.semiboldSystemFont(12)

    const infoW = w.addStack()

    const fundingInfoText = infoW.addText('Funding ')
    fundingInfoText.textColor = greyOne
    fundingInfoText.font = Font.mediumSystemFont(10)

    const fundingText = infoW.addText(funding)
    fundingText.textColor = black
    fundingText.font = Font.mediumSystemFont(10)

    infoW.addSpacer(16)

    const deadlineInfoTxt = auction.status === "Upcoming" ? 'Starts ' : 'Deadline '
    const deadlineInfoText = infoW.addText(deadlineInfoTxt)
    deadlineInfoText.textColor = greyOne
    deadlineInfoText.font = Font.mediumSystemFont(10)

    const deadlineText = infoW.addText(deadline)
    deadlineText.textColor = black
    deadlineText.font = Font.mediumSystemFont(10)

    if (auction.status !== "Upcoming") {
        infoW.addSpacer(16)

        const proposalsInfoText = infoW.addText('Proposals ')
        proposalsInfoText.textColor = greyOne
        proposalsInfoText.font = Font.mediumSystemFont(10)

        const proposalsText = infoW.addText(`${proposals}`)
        proposalsText.textColor = black
        proposalsText.font = Font.mediumSystemFont(10)
    }
}

async function loadImage(imageUrl) {
    const req = new Request(imageUrl)
    const image = await req.loadImage()
    return image
}

async function loadCommunity(address) {
    const url = 'https://prod.backend.prop.house/graphql'
    const query = `
    query CommunityByAddress {
        findByAddress(address: "${address}") {
          id,
          name,
          auctions {
            id,
            status,
            title,
            startTime,
            proposalEndTime,
            votingEndTime,
            fundingAmount,
            currencyType,
            numWinners,
            proposals {
              id
            }
          }
        }
      }
  `

    const req = new Request(url)
    req.method = 'POST'
    req.body = JSON.stringify({ query: query })
    req.headers = { 'Content-Type': 'application/json' }
    const res = await req.loadJSON()
    const data = res.data.findByAddress

    return data
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
