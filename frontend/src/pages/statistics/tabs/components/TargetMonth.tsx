import { Select, MenuItem } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface MonthOption {
    date: Dayjs,
    value: number // I'd rather this be any, but it's really only used as a number
}

function TargetMonth(props: { 
    month: number, 
    monthOptions: MonthOption[], 
    onMonthChanged: ((month: number) => void)
}) {
    return (
        <>
            <Select value={props.month} onChange={e => props.onMonthChanged(Number(e.target.value))}>
                {
                    props.monthOptions.map((option, i) => {
                        return (
                            <MenuItem key={i} value={option.value}>{dayjs(option.date).format("MMMM YYYY").toString()}</MenuItem>
                        )
                    })
                }
            </Select>
        </>
    )
}

export { TargetMonth }
export type { MonthOption }