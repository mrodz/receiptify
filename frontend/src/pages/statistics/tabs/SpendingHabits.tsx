import React from "react";

import { Box, Typography, Divider } from "@mui/material";
import { BarChart, BarSeriesType, PieChart, PieValueType } from "@mui/x-charts";
import { Receipt } from "../receipt";
import { TargetMonth, MonthOption } from "./components/TargetMonth";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

function getMonthOffsetFromToday(start: Dayjs) {
    return dayjs().diff(start, "month")
}

function getReceiptsInMonth(receipts: Receipt[], monthOffset: number) {
    return receipts.filter(receipt => {
        return getMonthOffsetFromToday(receipt.timestamp) === monthOffset
    })
}

function CategorySpendingPie(props: { receipts: Receipt[] }) {
    const [targetMonth, setTargetMonth] = React.useState<number>(0) // number of months before Today
    
    const categoryData: {[key: string]: number} = {}
    let totalPrice: number = 0
   
    for (const receipt of getReceiptsInMonth(props.receipts, targetMonth)) {
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

    const monthOptions: MonthOption[] = props.receipts.map(receipt => { 
        return { date: receipt.timestamp, value: getMonthOffsetFromToday(receipt.timestamp)}})

    return (
        <div>
            <Box>
                <Typography>Spending by category by month </Typography>
                <TargetMonth month={targetMonth} monthOptions={monthOptions} onMonthChanged={setTargetMonth}></TargetMonth>
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

function ExpensesOverTime(props: { receipts: Receipt[] }) {
    const now = dayjs()
    const monthNow = now.month()
    const lastMonth = now.clone().date(1).month(monthNow === 0 ? 11 : monthNow - 1)

    const [rangeStart, setRangeStart] = React.useState(lastMonth)
    const [rangeEnd, setRangeEnd] = React.useState(now)

    const costData: {[key: string]: {[key: string]: number}} = {}
    const categoryLabels: {[key: string]: BarSeriesType} = {}

    const rangeStartOffset = getMonthOffsetFromToday(rangeStart)
    const rangeEndOffset = getMonthOffsetFromToday(rangeEnd)
    const monthRange = rangeStartOffset - rangeEndOffset
    const monthStep = monthRange <= 24 ? 1 : 4
    
    for (let month = rangeStartOffset; month >= rangeEndOffset; month -= monthStep) {
        if (!costData[month])
            costData[month] = { month, food: 0, drink: 0 }

        for (const receipt of getReceiptsInMonth(props.receipts, month)) {
            for (const item of receipt.items) {
                if (costData[month][item.category])
                    costData[month][item.category] += item.cost
                else
                    costData[month][item.category] = item.cost

                if (!categoryLabels[item.category])
                    categoryLabels[item.category] = { type: "bar", label: item.category }
            }
        }
    }
    console.log(costData)
    console.log(Object.values(categoryLabels))
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography>Expenses by category over time </Typography>
            <DatePicker 
                label="Start Date" views={["year", "month"]} 
                value={dayjs(rangeStart)} 
                maxDate={dayjs(rangeEnd)} 
                onChange={e => setRangeStart(e || rangeStart)}/>
            <DatePicker 
                label="End Date" views={["year", "month"]} 
                value={dayjs(rangeEnd)} 
                minDate={dayjs(rangeStart)} 
                maxDate={dayjs()}
                onChange={e => setRangeEnd(e || rangeEnd)}/>
            <BarChart
                width={500}
                height={500}
                xAxis={[{ scaleType: "band", dataKey: "month" }]}
                series={Object.values(categoryLabels)}/>
        </LocalizationProvider>
    )
}

function SpendingHabits(props: { receipts: Receipt[] }) {
    return (
        <>
            <CategorySpendingPie receipts={props.receipts}/>
            <Divider></Divider>
            <ExpensesOverTime receipts={props.receipts}/>
        </>
    )
}

export default SpendingHabits