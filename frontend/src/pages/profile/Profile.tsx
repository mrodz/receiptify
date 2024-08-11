import { Typography } from "@mui/material";
import { auth } from "../../firebase";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import LogoutButton from "../../components/LogoutButton";

function UserProfile(props: { user: User }) {
	return (
		<div>
			{/* dummy code to show off a log in */}
			<Typography variant="h1">User Data:</Typography>
			{JSON.stringify(props.user)}

			<hr />

			<LogoutButton />
		</div>
	)
}

function Profile() {
	const location = useLocation();

	const [currentUser, setCurrentUser] = useState<User | null | 'loading'>('loading');

	useEffect(() => {
		auth.authStateReady().then(() => {
			setCurrentUser(auth.currentUser)
		});
	}, [auth, auth.currentUser])

	return (
		currentUser === 'loading'
			? <div>Loading, please wait...</div>
			: currentUser === null
				? <Navigate to={'/login'} replace state={{
					redirectTo: location
				}} />
				: <UserProfile user={currentUser} />
	)
}

export default Profile;