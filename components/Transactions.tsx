import { useCallback, useEffect, useRef, useState } from "react"
import EventEmitter      from "events"

import Grid              from '@mui/material/Unstable_Grid2'
import Box               from '@mui/material/Box'
import LinearProgress    from "@mui/material/LinearProgress"

import styles            from '../styles/app.module.css'

import fetchTransactions from "../api/fetchTransactions"

import useLastBlockNumber   from "../hooks/useLastBlockNumber"
import useWSProvider        from "../hooks/useWSProvider"
import useHttpProvider      from "../hooks/useHttpProvider"
import useWeb3              from "../hooks/useWeb3"
import useTokenContract     from "../hooks/useTokenContract"
import useWSTransactions    from "../hooks/useWSTransactions"

import normalizeTxList      from "../helpers/normalizeTxList"
import decodeLog            from "../helpers/decodeLog"

import FiltersComponent from './Filters'
import TransactionCard from "./TransactionCard"
import Filters from "../models/Filters"
import isValidForFilters from "../helpers/isValidFilters"

const Transactions = () => {
    const HttpProvider = useHttpProvider()
    const web3 = useWeb3(HttpProvider)
    const contract = useTokenContract(process.env.NEXT_PUBLIC_DAI_ADDRESS + '', web3)
    const latest = useLastBlockNumber(web3)

    const WSProvider = useWSProvider()
    const web3WS = useWeb3(WSProvider)
    const sock:EventEmitter = useWSTransactions(web3WS)

    const [isLoading, setIsLoading] = useState(false)
    const [isSortedByValue, setIsSortedByValue] = useState(false)
    const filters = useRef<Filters>({
            sender: '',
            recipient: '',
            sort: ''
        })

    const [transactions, setTransactions] = useState<any[]>([])

    const loadPrimaryData = useCallback(async () => {
        setIsLoading(true)
        setTransactions(prev => [])
        return fetchTransactions(latest, contract, filters.current, web3)
            .then((res:any[]) => {
                setTransactions(prev => normalizeTxList(res, isSortedByValue))
            })
            .finally(() => { 
                setIsLoading(false)
            })
    }, [contract, web3, latest])

    const loadSocketData = useCallback(async () => {
        sock.on('data', async (event:any) => {
            if (event.topics.length === 3 && event.address === process.env.NEXT_PUBLIC_DAI_ADDRESS) {
                const tx = decodeLog(event, web3)
                if(!isValidForFilters(filters.current, tx) 
                || transactions.some(item => item.transactionHash === tx.transactionHash)) return

                const block = await web3.eth.getBlock(event.blockNumber)
                if (block && block.timestamp) {
                    tx.timestamp = block.timestamp
                    setTransactions(prev => normalizeTxList([...prev, tx], isSortedByValue))
                } else {
                    console.log('Null block or block timestamp !!', event.blockNumber)
                }
            }
        })
    }, [sock, web3, filters.current])

    const bindingHandler = (updatedFilters: Filters) => {
            if(isValidForFilters(updatedFilters, undefined)){
                filters.current = updatedFilters
                loadPrimaryData()
            } else {
                filters.current
            }
    }

    useEffect(() => {
        if(!!latest) {
            loadPrimaryData()
        }
    }, [loadPrimaryData, filters.current])

    useEffect(()=> {
        loadSocketData()
    }, [loadSocketData])

    const changeSortOrder = () => {
        setIsSortedByValue(prevSort => {
            setTransactions(prevTx => normalizeTxList([...prevTx], !prevSort))
            return !prevSort
        })
    }

    return (
        <main className={styles.main_section}>
            <div className={styles.container}>
                <div className={styles.search_section}>
                <Box sx={{ flexGrow: 1 }}>
                    <FiltersComponent updateFilters={bindingHandler} />
                    {!isSortedByValue && (
                        <div>
                            <span>Sort by </span>
                            <a onClick={changeSortOrder}> Value</a><span>/Timestamp</span>

                        </div>
                    )}
                    {isSortedByValue && (
                        <div>
                            <span>Sort by</span>
                            <span> Value/</span><a onClick={changeSortOrder}>Timestamp</a>

                        </div>
                    )}
                </Box>
                </div>
                <Box sx={{ flexGrow: 1 }}>
                    {  transactions.length > 0 && (
                            <Grid container spacing={{ xs: 2, md: 5 }} >
                                { 
                                    transactions.map((tx, i) => (
                                        <Grid xs={12} sm={12} md={12} lg={6} xl={6} key={i}>
                                            <TransactionCard {...tx}/>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                    )}
                    {  isLoading && (<LinearProgress />) }
                </Box>
            </div>
        </main>
    )
}

export default Transactions