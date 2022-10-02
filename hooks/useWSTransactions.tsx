import EventEmitter from 'events'
import { useState, useEffect, useCallback } from 'react'

const useWSTransactions = (web3:any):EventEmitter => {
    const [socket, setSocket] = useState<EventEmitter>(new EventEmitter())

    const loadSocket = useCallback(async () => {
        setSocket(prev => web3.eth.subscribe('logs', {
            topics: [
                web3.utils.sha3('Transfer(address,address,uint256)')
            ]
        }))
    }, [web3.utils, web3.eth])

    useEffect(() => {
        loadSocket()
    }, [loadSocket])

    return socket
}

export default useWSTransactions