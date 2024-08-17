import { Box, Typography, Select, MenuItem } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";
import React from "react";

import { Receipt } from "../receipt";

function CategorySpendingPie(props: { receipts: Receipt[] }) {
    function getMonthDifference(start: Date, end: Date) {
        const difference = new Date(end.getTime() - start.getTime())
        const months = (11 - difference.getMonth()) + (difference.getUTCFullYear() - 1970) * 12

        return months
    }

    const [targetMonth, setTargetMonth] = React.useState<number>(0) // number of months before Today
    
    const now: Date = new Date(Date.now())
    const categoryData: {[key: string]: number} = {}
    let totalPrice: number = 0
   
    for (const receipt of props.receipts) {
        const months = getMonthDifference(receipt.timestamp, now)

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

    const chartData: PieValueType[] = []
    let id = 0

    for (const key in categoryData) {
        chartData.push({ id: id++, label: key, value: categoryData[key] })
    }

    const monthOptions: {[key: string]: Date} = {}

    for (const receipt of props.receipts) {
        const months = getMonthDifference(receipt.timestamp, now)

        monthOptions[months] = receipt.timestamp
    }

    return (
        <div>
            <Box>
                <Typography>Spending by category </Typography>
                <Select value={targetMonth} onChange={e => setTargetMonth(e.target.value as number)}>
                    {
                        Object.keys(monthOptions).map(Number).sort().map((monthIndex, i) => {
                            const date: Date = monthOptions[monthIndex]
                            const formatOptions: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" }

                            return (
                                <MenuItem key={i} value={monthIndex}>{date.toLocaleDateString(undefined, formatOptions)}</MenuItem>
                            )
                        })
                    }
                </Select>
            </Box>
            <PieChart 
                width={500} height={500} 
                series={
                    [
                        {
                            data: chartData,
                            arcLabel: item => `${item.label} ${(100 * item.value / totalPrice).toFixed(1)}%`,
                            arcLabelMinAngle: 40
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