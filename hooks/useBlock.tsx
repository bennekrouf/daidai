import { useCallback, useEffect, useState } from "react"

const useBlock = (web3: any, blockNumber: number) => {
  const [block, setBlock] = useState(0)

  const loadBlockNumber = useCallback(async (blockNumber:number) => {
    const bn = await web3.eth.getBlock(blockNumber)
    setBlock(bn)
  }, [web3.eth])

  useEffect(() => {
        loadBlockNumber(blockNumber)
    }, [loadBlockNumber, blockNumber])
  
    return blockNumber
}

export default useBlock