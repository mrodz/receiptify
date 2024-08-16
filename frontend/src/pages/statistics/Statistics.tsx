import { auth } from "../../firebase";
import { useLocation } from "react-router-dom";
import React from "react";
import { ReactNode, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { Box, Tabs, Tab } from "@mui/material";
import {Receipt} from "./receipt";
import AllReceipts from "./tabs/AllReceipts";
import SpendingHabits from "./tabs/SpendingHabits";

function Statistics() {
	const location = useLocation();

	const [currentUser, setCurrentUser] = useState<User | null | 'loading'>('loading');

	useEffect(() => {
		auth.authStateReady().then(() => {
			setCurrentUser(auth.currentUser)
		});
	})

	return (
        <StatisticsPage></StatisticsPage>
	)
    {/*currentUser === 'loading'
			? <div>Loading, please wait...</div>
			: currentUser === null
				? <Navigate to={'/login'} replace state={{
					redirectTo: location
				}} />
				: <StatisticsPage user={currentUser} /> Waiting on 14-signup-page PR for this*/}
}

function TabPanel(props: { children: ReactNode, index: number, visibleIndex: number }) {
    const { children, index, visibleIndex, ...params } = props

    return (
        <div role="tabpanel" hidden={index !== visibleIndex} {...params}>
            {index === visibleIndex && <Box sx={{padding: 5}}>{children}</Box>}
        </div>
    )
}

function StatisticsPage() {
    const [visibleIndex, setVisibleIndex] = React.useState(0)

    const [receipts, setReceipts] = React.useState<Receipt[]>([ // for testing until #21 goes through
        {
            timestamp: new Date(0),
            items: [
                { name: "Cookies", cost: 20, category: "Food" },
                { name: "Cookies", cost: 20, category: "Food" }
            ],
        },
        {
            timestamp: new Date(200),
            items: [
                { name: "Cookies", cost: 20, category: "Food" },
                { name: "Cookies", cost: 20, category: "Food" }
            ],
        },
        {
            timestamp: new Date(50),
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
    ])
    const [sortMethod, setSortMethod] = React.useState("newest")

    useEffect(() => {
        switch (sortMethod) {
            default: // consider "newest" the default and anything else just redirects to it
                setReceipts(r => r.sort((r1, r2) => (r1.timestamp.getMilliseconds() > r2.timestamp.getMilliseconds()) ? 1 : -1))
                break;
            case "oldest":
                setReceipts(r => r.sort((r1, r2) => (r1.timestamp.getMilliseconds() < r2.timestamp.getMilliseconds()) ? 1 : -1))
                break;
        }
    }, [sortMethod])

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={visibleIndex} onChange={(_, newValue) => setVisibleIndex(newValue)}>
                    <Tab label="All Receipts"></Tab>
                    <Tab label="Spending Habits"></Tab>
                    <Tab label="Price History"></Tab>
                    <Tab label="Spending over Time"></Tab>
                </Tabs>
            </Box>
            <TabPanel index={0} visibleIndex={visibleIndex}>
                <AllReceipts receipts={receipts}/>
            </TabPanel>
            <TabPanel index={1} visibleIndex={visibleIndex}>
                <SpendingHabits receipts={receipts}/>
            </TabPanel>
            <TabPanel index={2} visibleIndex={visibleIndex}>
                <div></div>
            </TabPanel>
            <TabPanel index={3} visibleIndex={visibleIndex}>
                <div></div>
            </TabPanel>
        </>
    )
}

export default Statistics;