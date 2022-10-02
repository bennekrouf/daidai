import Box          from '@mui/material/Box'
import TextField    from '@mui/material/TextField'


const Filters = ({...filters}:any) => {
    const onChangeSender = (event:any) => {
        filters.updateFilters({ sender: event.target.value})
    }

    const onChangeRecipient = (event:any) => {
        filters.updateFilters({ recipient: event.target.value})
    }

    const handleFocus = (event:any) => event.target.select()

    return (
        <Box sx={{ m: "10px" }}>
            <TextField
                id="outlined-uncontrolled1"
                label="Sender"
                defaultValue="0x"
                style={{ width: 300, marginRight: '40px'}}
                onKeyUp={onChangeSender}
                onFocus={handleFocus}
            />
            <TextField
                id="outlined-uncontrolled2"
                label="Recipient"
                defaultValue="0x"
                style={{ width: 300}}
                onKeyUp={onChangeRecipient}
                onFocus={handleFocus}
            />
        </Box>
    )
}

export default Filters