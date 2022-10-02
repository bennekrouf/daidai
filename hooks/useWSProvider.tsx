import Web3 from 'web3'
import { useMemo } from 'react'

const useProvider = () => (
  useMemo(() => {
    return new Web3.providers.WebsocketProvider(
        `wss://${process.env.NEXT_PUBLIC_ETHEREUM_NETWORK}.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
      )
  }, [])
)

export default useProvider