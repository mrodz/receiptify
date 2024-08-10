import { Button } from "@mui/material";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
	const navigate = useNavigate()

	const click = () => {
		auth.signOut()
		navigate('/')
	}
	return (
		<Button variant="contained" onClick={click}>
			Log Out
		</Button>
	)
}

export default LogoutButton;