import dayjs from "dayjs"
import { Receipt } from "./receipt"

const stats: Receipt[] = [
    {
        timestamp: dayjs.unix(1000000000),
        items: [
            { name: "Cookies", cost: 20, category: "Food" },
            { name: "Water", cost: 200, category: "Drink" }
        ],
    },
    {
        timestamp: dayjs.unix(20000000),
        items: [
            { name: "Cookies", cost: 20, category: "Food" },
            { name: "Cookies", cost: 20, category: "Food" }
        ],
    },
    {
        timestamp: dayjs.unix(50000),
        items: [
            { name: "Milk", cost: 20, category: "Drink" },
            { name: "Water", cost: 20, category: "Drink" }
        ],
    },
    {
        timestamp: dayjs.unix((Date.now() - 100000) / 1000),
        items: [
            { name: "Cookies", cost: 20, category: "Food" },
            { name: "OJ", cost: 45, category: "Drink" }
        ],
    },
]

export default stats