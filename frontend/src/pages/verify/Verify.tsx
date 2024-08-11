import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

function UserVerify() {
	const [emailSent, setEmailSent] = useState(false);

	if (auth.currentUser === null) {
		return (
			<Box flexDirection="column" textAlign="center">
				<Typography variant="body1">
					You have not signed in! Please sign in before attempting to verify your account.
				</Typography>

				<Button href="/login" variant="contained">
					Sign In
				</Button>
			</Box>
		)
	}

	if (!auth.currentUser.email) {
		return (
			<Typography variant="body1" textAlign="center">
				Your account does not have any associated email account, and thus does not require verification.
			</Typography>
		)
	}

	if (auth.currentUser.emailVerified) return (
		<Typography variant="body1" textAlign="center">
			Your account has already verified its email address! Thank you.
		</Typography>
	)

	const verifyUser = async () => {
		await sendEmailVerification(auth.currentUser!, {
			url: 'https://receiptify-cac.web.app/profile?welcome', // TODO
		});
		setEmailSent(true);
	}

	return (
		<Box flexDirection="column" textAlign="center">
			<Typography variant="body1">
				We will attempt to send you a verification email at {auth.currentUser!.email}
			</Typography>

			<Button className="!mt-4" variant="outlined" onClick={verifyUser}>
				Click here to receive a verification code.
			</Button>

			{emailSent && <>
				<Divider className="!my-5" />

				<Typography variant="body1">
					Sent! Please check your inbox or spam folder for a verification link. Once you click it,
					refreshing this page will indicate whether your account's email was verified.
				</Typography>
			</>}
		</Box>
	)
}

export default function Verify() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		auth.authStateReady().then(() => {
			setLoaded(true);
		})
	}, []);

	return (
		<main className="flex justify-center items-center h-full">
			<Card className="receiptify-principle-card">
				<Typography className="text-center" variant="h3" component="h1" gutterBottom>
					Verify Email
				</Typography>
				{
					!loaded
						? <div>Loading...</div>
						: <UserVerify />
				}
			</Card>
		</main>
	)
}
