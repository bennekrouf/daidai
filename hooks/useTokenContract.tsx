import useContract from './useContract'
import ABI from '../erc20-abi.json'

const useTokenContract = (tokenAddress: string, provider: any) => (
  useContract(tokenAddress, ABI, provider)
)

export default useTokenContract