import { Box, Typography, Select, MenuItem } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";
import React from "react";

import { Receipt } from "../receipt";

function CategorySpendingPie(props: { receipts: Receipt[] }) {
    const [targetMonth, setTargetMonth] = React.useState<number>(0)
    
    const now =  Date.now()
    const categoryData: {[key: string]: number} = {}
    let totalPrice = 0
   
    for (const receipt of props.receipts) {
        const date = receipt.timestamp
        const difference = new Date(now - date.getTime())
        const months = (11 - difference.getMonth()) + (difference.getUTCFullYear() - 1970) * 12

        if (months !== targetMonth)
            continue

        for (const item of receipt.items) {
            if (categoryData[item.category])
                categoryData[item.category] += item.cost
            else
                categoryData[item.category] = item.cost

            totalPrice += item.cost
        }
    }

    const data: PieValueType[] = []
    let id = 0

    for (const key in categoryData) {
        data.push({ id: id++, label: key, value: categoryData[key] })
    }

    return (
        <div>
            <Box>
                <Typography>Spending by category </Typography>
                <Select value={targetMonth} onChange={e => setTargetMonth(e.target.value as number)}>
                    <MenuItem value={0}>This Month</MenuItem>
                    {

                    }
                </Select>
            </Box>
            <PieChart 
                width={500} height={500} 
                series={
                    [
                        {
                            data,
                            arcLabel: item => `${item.label} ${(100 * item.value / totalPrice).toFixed(1)}%`,
                            arcLabelMinAngle: 30
                        }
                    ]
                }/>
        </div>
    )
}

function SpendingHabits(props: { receipts: Receipt[] }) {
    return (
        <>
            <CategorySpendingPie receipts={props.receipts}/>
        </>
    )
}

export default SpendingHabits