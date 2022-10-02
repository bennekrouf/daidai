import { useCallback, useEffect, useState } from "react"

const useLastBlockNumber = (web3: any) => {
  const [blockNumber, setBlockNumber] = useState(0)

  const loadBlockNumber = useCallback(async () => {
    const bn = await web3.eth.getBlockNumber()
    setBlockNumber(bn)
  }, [web3.eth])

  useEffect(() => {
        loadBlockNumber()
    }, [loadBlockNumber, blockNumber])
  
    return blockNumber
}

export default useLastBlockNumber