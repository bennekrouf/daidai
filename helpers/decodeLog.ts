const decodeLog = (event: any, web3:any) => {
    const tx = {...event}
    tx.returnValues = web3.eth.abi.decodeLog([
        { type: 'address', name: '_from', indexed: true},
        { type: 'address', name: '_to', indexed: true},
        { type: 'uint256', name: '_value', indexed: false }
    ], event.data, [event.topics[1], event.topics[2], event.topics[3]])
    return tx
}

export default decodeLog