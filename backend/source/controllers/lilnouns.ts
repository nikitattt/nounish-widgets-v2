import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'
import { ethers } from 'ethers'
import { ImageData, getNounData } from '@lilnounsdao/assets'
import { buildSVG } from '@nouns/sdk'
import { shortAddress, shortENS } from '../utils/addressAndENSDisplayUtils'
import { AnkrProvider } from '@ethersproject/providers'
import { AlchemyProvider } from '@ethersproject/providers'
import {
  getPropHouseRoundState,
  getPropHouseRoundTimestamp,
  getProposalEndTimestamp,
  getProposalState,
  getProposalTitle
} from '../utils/proposalHelpers'
import sharp from 'sharp'
import { LilNouns, LilPropHouseRound, LilProposal } from '../types/lil-nouns'

require('dotenv').config()

const ALCHEMY_KEY = process.env.ALCHEMY_KEY

const { palette } = ImageData

const url =
  'https://api.thegraph.com/subgraphs/name/lilnounsdao/lil-nouns-subgraph'
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
      proposals (where: {status_in: [PENDING, ACTIVE]}) {
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

const propHouseUrl = 'https://prod.backend.prop.house/graphql'
const propHouseQuery = `
      query CommunityByAddress {
          community(id: 2) {
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

const getLilNounsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the id from the req
  // let id: string = req.params.id;
  // const provider = new AnkrProvider()
  const provider = new AlchemyProvider('mainnet', ALCHEMY_KEY) // TODO: Use custom key for nounish widgets

  try {
    let result: AxiosResponse = await axios.post(url, { query: query })
    const data = result.data.data

    let bidder = '0x00...0000'
    let amount = '0'

    if (data.auctions[0].bidder && data.auctions[0].amount) {
      const ens = await provider.lookupAddress(data.auctions[0].bidder.id)
      bidder = ens ? shortENS(ens) : shortAddress(data.auctions[0].bidder.id)

      amount = data.auctions[0].amount
    }

    const { parts, background } = getNounData(data.auctions[0].noun.seed)
    const svgBinary = buildSVG(parts, palette, background)
    const svgBuffer = Buffer.from(svgBinary)
    const pngBuffer = await sharp(svgBuffer).resize(100).png().toBuffer()
    const image = pngBuffer.toString('base64')

    const blockNumber = await provider.getBlockNumber()

    const proposals = Array<LilProposal>()

    for (const prop of data.proposals) {
      const state = getProposalState(blockNumber, prop)

      if (state) {
        // proposals.push({
        //   id: Number(prop.id),
        //   title: getProposalTitle(prop),
        //   state: state,
        //   endTime: getProposalEndTimestamp(blockNumber, state, prop),
        //   quorum: prop.quorumVotes
        // })

        let propToAdd: LilProposal = {
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

    let propHouse: LilPropHouseRound[] = []
    try {
      let result: AxiosResponse = await axios.post(propHouseUrl, {
        query: propHouseQuery
      })
      const propHouseData = result.data.data.community.auctions

      for (const round of propHouseData) {
        if (['Upcoming', 'Open', 'Voting'].includes(round.status)) {
          const funding = `${round.fundingAmount} ${round.currencyType} × ${round.numWinners}`

          let roundToAdd: LilPropHouseRound = {
            id: Number(round.id),
            title: round.title,
            state: getPropHouseRoundState(round.status),
            funding: funding,
            endTime: getPropHouseRoundTimestamp(round)
          }

          if (['Open', 'Voting'].includes(round.status)) {
            roundToAdd.proposals = round.proposals.length
          }

          propHouse.push(roundToAdd)
        }
      }

      if (propHouse.length > 0) {
        propHouse.sort((a, b) => a.endTime - b.endTime)
      }
    } catch {}

    let nounsData: LilNouns = {
      auction: {
        id: parseInt(data.auctions[0].id),
        currentBid: ethers.utils.formatEther(amount),
        bidder: bidder,
        endTime: parseInt(data.auctions[0].endTime) * 1000,
        image: image,
        seed: data.auctions[0].noun.seed
      },
      proposals: proposals
    }
    if (propHouse) nounsData.propHouse = propHouse

    return res.status(200).json(nounsData)
  } catch (error) {
    console.log(error)
    return res.status(500).json('Error happened while loading lil nouns data')
  }
}

export default { getLilNounsData }
