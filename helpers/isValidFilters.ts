import Filters from "../models/Filters"
import isEmpty from "./isEmpty"

const adrLength = parseInt(process.env.NEXT_PUBLIC_ADDRESS_SIZE + '')

const isValidFilters = (filters:Filters, tx:any):boolean => {
    if (!filters) return true

    if(!isEmpty(filters.sender) && adrLength !== filters.sender.length) return false
    if(!isEmpty(filters.recipient) && adrLength !== filters.recipient.length) return false

    if(!tx) return true
    return !!(
        (isEmpty(filters.sender) || (!isEmpty(filters.sender) && tx._from === filters.sender))
        && (isEmpty(filters.recipient) || (!isEmpty(filters.recipient) && tx._to === filters.recipient))
        )
}

export default isValidFilters