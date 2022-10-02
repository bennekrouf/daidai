import normalize from './normalizeTx'
import Transaction from '../models/transaction'
import removeDuplicate from './removeDuplicates'
import sortList from './sortTransactions'

const normalizeTxs = (txs: Transaction[], isStandardSorting: boolean) => {   
    txs = removeDuplicate(txs)
            .map((tx:any) => normalize(tx))
    txs = sortList(txs, isStandardSorting)
    while (txs.length > parseInt(process.env.NEXT_PUBLIC_MAX + '')) {
        txs.pop()
    }
    return txs
}

export default normalizeTxs