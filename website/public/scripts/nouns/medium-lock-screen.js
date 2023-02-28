/*
 * Created by: ng
 * Twitter: @iamng_eth
 *
 * Version: 0.1.0
 * Last Update: 12.12.2022
 *
 * Enjoy!
 */

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