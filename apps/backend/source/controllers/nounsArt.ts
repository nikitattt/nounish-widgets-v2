import axios, { AxiosResponse } from 'axios'
import { ImageData, getNounData } from '@noundry/nouns-assets'
import { buildSVG } from '@nouns/sdk'
import sharp from 'sharp'

const { palette } = ImageData

const url =
  'https://api.goldsky.com/api/public/project_cldf2o9pqagp43svvbk5u3kmo/subgraphs/nouns/prod/gn'
const query = `
    query NounsData {
      auctions(where: {settled: false}) {
        id,
        noun {
          seed {
            head
            glasses
            body
            accessory
            background
          }
        }
      }
    }
  `

const getNounsArtData = async (req: Request): Promise<Response> => {
  try {
    let result: AxiosResponse = await axios.post(url, { query: query })
    const data = result.data.data

    const { parts, background } = getNounData(data.auctions[0].noun.seed)
    const svgBinary = buildSVG(parts, palette, background)
    const svgBuffer = Buffer.from(svgBinary)
    const pngBuffer = await sharp(svgBuffer).resize(480).png().toBuffer()
    const image = pngBuffer.toString('base64')

    let nounsData = {
      auction: {
        id: parseInt(data.auctions[0].id),
        image: image,
        seed: data.auctions[0].noun.seed
      }
    }

    return Response.json(nounsData, {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return Response.json('Error happened while loading nouns data', {
      status: 500
    })
  }
}

export default { getNounsArtData }
