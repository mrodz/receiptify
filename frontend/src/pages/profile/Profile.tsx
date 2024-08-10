import { Typography } from "@mui/material";
import { auth } from "../../firebase";
import { Navigate, useLocation } from "react-router-dom";

function Profile() {
	const location = useLocation();

	if (auth.currentUser === null) {
		return <Navigate to={'/login'} replace state={{
			redirectTo: location
		}} />;
	}

	return (
		<div>
			<Typography variant="h1">User Data:</Typography>
			{JSON.stringify(auth.currentUser!)}
		</div>
	)
}

export default Profile;