const removeDuplicate = (arr:any[]) => {
    return [...arr.reduce((map:any, obj:any) => map.set(obj.transactionHash, obj), new Map()).values()]
}

export default removeDuplicate