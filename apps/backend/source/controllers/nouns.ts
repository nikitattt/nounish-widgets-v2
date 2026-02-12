import axios, { AxiosResponse } from 'axios'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { formatEther } from 'viem/utils'
import { ImageData, getNounData } from '@noundry/nouns-assets'
import { buildSVG } from '@nouns/sdk'
import { shortAddress, shortENS } from '../utils/addressAndENSDisplayUtils'
import {
  getProposalEndTimestamp,
  getProposalState
} from '../utils/proposalHelpers'
import sharp from 'sharp'
import { Nouns, Proposal } from '../types/nouns'

const ALCHEMY_KEY = process.env.ALCHEMY_KEY
const GRAPH_API_KEY = process.env.GRAPH_API_KEY

const { palette } = ImageData

const url =
  'https://gateway.thegraph.com/api/subgraphs/id/5qcR6rAfDMZCVGuZ6DDois7y4zyXqsyqvaqhE6NRRraW'
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
        },
        endTime,
        amount,
        bidder {
          id
        }
      },
      proposals(
        where: {status_in: [PENDING, ACTIVE], id_gte: 495}
        orderBy: endBlock
        orderDirection: desc
      ) {
        id
        proposer {
          id
        }
        startBlock
        endBlock
        quorumVotes
        minQuorumVotesBPS
        maxQuorumVotesBPS
        title
        status
        executionETA
        forVotes
        againstVotes
        abstainVotes
        totalSupply
      }
    }
  `

const getNounsData = async (req: Request): Promise<Response> => {
  // get the id from the req
  // let id: string = req.params.id;
  const client = createPublicClient({
    chain: mainnet,
    transport: http(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`)
  }) // TODO: Use custom key for nounish widgets

  try {
    let result: AxiosResponse = await axios.post(
      url,
      { query: query },
      {
        headers: {
          Authorization: `Bearer ${GRAPH_API_KEY}`
        }
      }
    )

    const data = result.data.data

    if (result.data.errors && result.data.errors.length > 0) {
      console.error(result.data.errors)
      throw new Error('Failed to fetch data')
    }

    let bidder = '-'
    let amount = '0'

    if (data.auctions[0].bidder && data.auctions[0].amount) {
      const ens = await client.getEnsName({
        address: data.auctions[0].bidder.id as `0x${string}`
      })
      bidder = ens ? shortENS(ens) : shortAddress(data.auctions[0].bidder.id)

      amount = data.auctions[0].amount
    }

    const { parts, background } = getNounData(data.auctions[0].noun.seed)
    const svgBinary = buildSVG(parts, palette, background)
    const svgBuffer = Buffer.from(svgBinary)
    const pngBuffer = await sharp(svgBuffer).resize(100).png().toBuffer()
    const image = pngBuffer.toString('base64')

    const blockNumber = Number(await client.getBlockNumber())

    const proposals = Array<Proposal>()

    for (const prop of data.proposals) {
      const state = getProposalState(blockNumber, prop)

      if (state) {
        // console.log(prop)

        let propToAdd: Proposal = {
          id: Number(prop.id),
          title: prop.title,
          state: state,
          endTime: getProposalEndTimestamp(blockNumber, state, prop),
          quorum: prop.quorumVotes
        }

        if (state === 'ACTIVE') {
          propToAdd.votes = {
            yes: prop.forVotes,
            no: prop.againstVotes,
            abstain: prop.abstainVotes
          }
        }

        proposals.push(propToAdd)
      }
    }

    proposals.sort((a, b) => a.id - b.id)

    let nounsData: Nouns = {
      auction: {
        id: parseInt(data.auctions[0].id),
        currentBid: formatEther(BigInt(amount)),
        bidder: bidder,
        endTime: parseInt(data.auctions[0].endTime) * 1000,
        image: image,
        seed: data.auctions[0].noun.seed
      },
      proposals: proposals
    }

    nounsData.propHouse = []

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

export default { getNounsData }
