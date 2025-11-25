export interface LilProposal {
  id: number
  title: string
  state: string
  endTime: number
  quorum?: number
  votes?: {
    yes: number
    no: number
    abstain: number
  }
}

export interface LilPropHouseRound {
  id: number
  title: string
  state: string
  endTime: number
  funding: string
  proposals?: number
}

export type LilSeed = {
  head: number
  glasses: number
  body: number
  accessory: number
  background: number
}

export interface LilAuction {
  id: number
  currentBid: String
  bidder: String
  endTime: number
  image: String
  seed: LilSeed
}

export interface LilNouns {
  auction: LilAuction
  proposals?: LilProposal[]
  propHouse?: LilPropHouseRound[]
}
