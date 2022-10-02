import { fromWei } from 'web3-utils'
import formatTime from "./formatTime"

const normalizeTx = (tx: any) => {
    if (!tx.returnValues) {
        return tx // Already normalized
    }
    return {
                timestamp: tx.timestamp,
                date: formatTime(tx.timestamp),
                to: tx.returnValues._to,
                from: tx.returnValues._from,
                value: (parseFloat(fromWei(tx.returnValues._value))).toFixed(2),
                transactionHash: tx.transactionHash
            }
}

export default normalizeTx