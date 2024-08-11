import { useNavigate } from "react-router-dom";
import { TextField, Button, Link, Card, Typography, FormControl, FormHelperText } from "@mui/material"

import google from '../../assets/google.svg'
import github from '../../assets/github.svg'
import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, validatePassword } from "firebase/auth";
import { auth } from "../../firebase";

function Signup() {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [usernameError, setUsernameError] = useState<string | null>(null)
	const [passwordError, setPasswordError] = useState<string | null>(null)
	const [firebaseError, setFirebaseError] = useState<string | null>(null)
	const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null)

	const handleLoginError = (e: any) => {
		if (e !== null && typeof e === 'object' && 'name' in e && e.name === "FirebaseError") {
			if (!('code' in e)) {
				console.error('NO CODE', e);
				setFirebaseError('Unknown firebase error');
				return;
			}

			switch (e.code) {
				case 'auth/invalid-credential':
					setFirebaseError('This username/password combination is not correct');
					setUsernameError('Bad Credential');
					setPasswordError('Bad Credential');
					break;
				case 'auth/account-exists-with-different-credential':
					setFirebaseError('An account already exists with this email, but a different sign in method');
					setUsernameError('You have already used this email with another sign in method!');
					setPasswordError(null);
					break;
				case 'auth/invalid-email':
					setUsernameError('This is not a valid email');
					setFirebaseError(null)
					setPasswordError(null)
					break;
				// add more error cases here later
				default:
					console.error(e);
					setFirebaseError('Unknown firebase error');
			}
		} else {
			console.error(e);
			setFirebaseError(`Could not sign you in: ${JSON.stringify(e)}`)
		}
	}

	const formSubmission = async (e: FormEvent) => {
		e.preventDefault()

		let errors = 0

		if (!username) {
			setUsernameError('Username cannot be empty')
			errors++
		} else {
			setUsernameError(null)
		}

		const symbols: string[]  = [
			"!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "[", "{", "}", "]", "\\", "|",
			":", ";", "\"", "'", "<", ",", ">", ".", "/", "?"
		]

		if (!password) {
			setPasswordError('Password cannot be empty')
			errors++
		} else if (password.length < 6) {
			setPasswordError('Password length must be at least 6 characters')
			errors++
		} else if (!Array.from(password).some((character: string, _, __) => symbols.includes(character))) {
			setPasswordError('Password must contain at least one symbol')
			errors++
		} else if (!(await validatePassword(auth, password)).isValid) {
			setPasswordError('This is not a valid password')
			errors++
		} else {
			setPasswordError(null)
		}

		if (!confirmPassword) {
			setConfirmPasswordError('Password confirmation cannot be empty')
			errors++
		} else if (password !== confirmPassword) {
			setConfirmPasswordError('Passwords do not match')
			errors++
		} else {
			setConfirmPasswordError(null)
		}

		if (errors !== 0) return

		try {
			const credential = await createUserWithEmailAndPassword(auth, username, password)

			console.log(credential.user)

			navigate('/profile')
		} catch (e) {
			handleLoginError(e);
		}
	}

	const googleLogin = async () => {
		const provider = new GoogleAuthProvider();

		try {
			await signInWithPopup(auth, provider);
			navigate('/profile')
		} catch (e) {
			handleLoginError(e);
		}
	}

	const githubLogin = async () => {
		const provider = new GithubAuthProvider();

		try {
			await signInWithPopup(auth, provider);
			navigate('/profile');
		} catch (e) {
			handleLoginError(e);
		}
	}

	return (
		<main className="flex items-center justify-center h-full">
			<Card className="p-8 w-6/7 sm:w-2/3 md:w-1/2 max-w-4xl">
				<Typography className="text-center" variant="h3" component="h1" gutterBottom>
					<span className="max-sm:hidden">
						Create Account:&nbsp;
					</span>
					Receiptify
				</Typography>

				<form onSubmit={formSubmission} className="w-full flex flex-col items-center gap-4">
					<div className="w-4/5 sm:w-2/5 md:w-3/5">
						<FormControl fullWidth error={!!usernameError}>
							<TextField
								onChange={(e) => setUsername(e.target.value)}
								fullWidth
								label="Email"
								type="text"
								autoComplete="username"
							/>
							{!!usernameError && <FormHelperText>{usernameError}</FormHelperText>}
						</FormControl>


						<FormControl className="!my-4" fullWidth error={!!passwordError}>
							<TextField
								onChange={(e) => setPassword(e.target.value)}
								fullWidth
								label="Password"
								type="password"
								autoComplete="current-password"
							/>
							{!!passwordError && <FormHelperText>{passwordError}</FormHelperText>}
						</FormControl>

						<FormControl fullWidth error={!!confirmPasswordError}>
							<TextField
								onChange={(e) => setConfirmPassword(e.target.value)}
								fullWidth
								label="Confirm Password"
								type="password"
								autoComplete="current-password"
							/>
							{!!confirmPasswordError && <FormHelperText>{confirmPasswordError}</FormHelperText>}
						</FormControl>
					</div>

					<div className="grid max-lg:grid-rows-2 lg:grid-cols-2 w-4/5 sm:w-2/5 md:w-3/5">
						<Button onClick={googleLogin} variant="outlined" className="grid grid-cols-[1fr_auto] gap-3">
							<img className="w-8" src={google} />
							Sign in with Google
						</Button>
						<Button onClick={githubLogin} variant="outlined" className="grid grid-cols-[1fr_auto] gap-3">
							<img className="w-8" src={github} />
							Sign in in with GitHub
						</Button>
					</div>

					<FormControl error={!!firebaseError}>
						<Button variant="contained" type="submit">Log in</Button>
						{!!firebaseError && <FormHelperText>{firebaseError}</FormHelperText>}
					</FormControl>

					<Link href="/login">Already have an account? Sign in.</Link>
				</form>
			</Card>
		</main>
	);
}

export default Signup;
