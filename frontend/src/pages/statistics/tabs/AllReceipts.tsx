import { Card, Box, Divider } from "@mui/material";

import { Receipt } from "../receipt";

function AllReceipts(props: { receipts: Receipt[] }) {
    return (
        <>
        {
            props.receipts?.map((receipt, i) => {
                return (
                    <Card key={i} sx={{marginBottom: 2}}>
                        <Box padding={2}>
                            <span>Receipt scanned on {receipt.timestamp.toDateString()} at {receipt.timestamp.toTimeString()}</span>
                        </Box>
                        <Divider></Divider>
                        {
                            receipt.items.map((item, i) => {
                                return (
                                    <Box key={i} paddingLeft={2}>
                                        <span>Bought {item.name} for ${(item.cost / 100).toLocaleString("en", { minimumFractionDigits: 2 })} ({item.category})</span>
                                    </Box>
                                )
                            })
                        }
                    </Card>
                )
            })
        }
        </>
    )
}

export default AllReceipts