interface Receipt {
    timestamp: Date,
    items: ReceiptItem[],
}

interface ReceiptItem {
    name: string,
    cost: number, // stored as US cents
    category: string
}

export type { Receipt, ReceiptItem }