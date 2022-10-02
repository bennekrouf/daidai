import RelativeTime from '@yaireo/relative-time'

const formatTime = (timestamp:number) => {
        if (!timestamp) return 
        const relativeTime = new RelativeTime()
        const newDate = new Date()
        newDate.setTime(timestamp * 1000)
        return relativeTime.from(newDate)
    }

export default formatTime