import { Request, Response, NextFunction } from 'express'
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

const getNounsArtData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    return res.status(200).json(nounsData)
  } catch (error) {
    console.log(error)
    return res.status(500).json('Error happened while loading nouns data')
  }
}

export default { getNounsArtData }
