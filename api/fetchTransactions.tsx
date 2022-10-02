import Filters from "../models/Filters"
import removeDuplicate from "../helpers/removeDuplicates"
import isValidFilters from "../helpers/isValidFilters"

const max = parseInt(process.env.NEXT_PUBLIC_MAX + '')

const getEvents = async (contract:any, latestBlock:any, filters:Filters) => {
    let txs:any[] = []
    let credit = 40 // For security, to avoid fetching too much with Infura limited API
    let latest = latestBlock
    do {
        const blockFilters = {
            fromBlock: latest - 1, 
            toBlock: latest + 1
        }
        const events = await contract.getPastEvents('Transfer', blockFilters)
        events && events.forEach(async (t:any) => {
            isValidFilters(filters, t.returnValues) && txs.length < max && txs.push(t)
        })
        txs = removeDuplicate(txs)
        latest = latest - 2
        credit--
    } while (txs.length < max && credit)
    return txs
}

const fetchTransactions = async (latest:any, contract:any, filters:Filters, web3: any) => {
    return getEvents(contract, latest, filters).then(async (txs:any[]) => {
        return Promise.all(txs.map(async (tx:any) => {
            const block = await web3.eth.getBlock(tx.blockNumber)
            tx.timestamp = block.timestamp
            return tx
        })) 
    })
}

export default fetchTransactions