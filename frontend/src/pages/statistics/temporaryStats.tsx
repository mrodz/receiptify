import { Receipt } from "./receipt"

const stats: Receipt[] = [
    {
        timestamp: new Date(1000000000000),
        items: [
            { name: "Cookies", cost: 20, category: "Food" },
            { name: "Water", cost: 200, category: "Drink" }
        ],
    },
    {
        timestamp: new Date(20000000000),
        items: [
            { name: "Cookies", cost: 20, category: "Food" },
            { name: "Cookies", cost: 20, category: "Food" }
        ],
    },
    {
        timestamp: new Date(50000000),
        items: [
            { name: "Milk", cost: 20, category: "Drink" },
            { name: "Water", cost: 20, category: "Drink" }
        ],
    },
    {
        timestamp: new Date(Date.now() - 1000),
        items: [
            { name: "Cookies", cost: 20, category: "Food" },
            { name: "OJ", cost: 45, category: "Drink" }
        ],
    },
]

export default stats