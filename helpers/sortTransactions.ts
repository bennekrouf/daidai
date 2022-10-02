import Transaction from "../models/transaction"

const sortList = (tx:Transaction[], standard:boolean) => (
    tx.sort((b:Transaction, a:Transaction) => standard ? (a.value - b.value):(a.timestamp - b.timestamp))
)

export default sortList