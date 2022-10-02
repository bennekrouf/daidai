import Card             from '@mui/material/Card'
import CardContent      from '@mui/material/CardContent'
import Typography       from '@mui/material/Typography'
import { BsFillArrowUpRightCircleFill }    from 'react-icons/bs'

const TransactionCard = ({...tx}:any) => {
    const cardStyle = {
        display: "flex"
    }

    return (
        <Card style={cardStyle} variant="elevation" sx={{ minWidth: 275 }}>
            <CardContent >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {tx.date}
                </Typography>
                <Typography variant="body2">
                    Sender {tx.from}
                </Typography>
                <Typography variant="body2">
                    Recipient {tx.to}
                </Typography>
                <Typography variant="body1">
                    Value {tx.value} ETH <a href={ 'https://etherscan.io/tx/' + tx.transactionHash }><BsFillArrowUpRightCircleFill /></a> 
                </Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                    {tx.transactionHash}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default TransactionCard