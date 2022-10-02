import { AbiItem } from 'web3-utils'
import { useMemo } from 'react'

const useContract = (address: string, ABI: any, provider: any) => (
    useMemo(() => {
        try {
            return new provider.eth.Contract(ABI as AbiItem[], address)
        } catch (error) {
            console.error("Failed To Get Contract", error)
            return null
        }
    }, [ABI, address, provider])
)

export default useContract