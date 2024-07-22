/*
 * Created by: ng
 * Twitter: @iamng_eth
 * Farcaster: @iamng
 *
 * Version: 0.1.0
 * Last Update: 22.10.2024
 *
 * Enjoy!
 */

const nounsUrl = 'https://nouns.wtf/'

const data = await loadData()

const image = data.auction.image

const w = new ListWidget()

const imageObj = Image.fromData(Data.fromBase64String(image))

w.backgroundImage = imageObj

// const imageObj = Image.fromData(Data.fromBase64String(image))
// const nounImage = nounW.addImage(imageObj)
// nounImage.imageSize = new Size(42, 42)


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