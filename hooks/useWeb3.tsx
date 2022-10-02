import Web3 from 'web3'
import { useMemo } from 'react'

const useWeb3 = (provider: any) => (useMemo(() => (new Web3(provider)), [provider]))

export default useWeb3