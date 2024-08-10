import React from 'react';

import { TextField, Button, Link } from "@mui/material"
import "./PasswordReset.css"

function PasswordReset() {
  const [email, setEmail] = React.useState<string>()
  const [confirmationState, setConfirmationState] = React.useState(0) // 0 = None, 1 == Success, 2 = Failure

  function reset() {
    // Need backend route
  }
    
  return (
    <div className="reset-container">
        <span>Enter the email associated with your account. We will send you a password reset link.</span>
        <TextField value={email} className="reset-field" label="Email" type="text" onChange={(e) => setEmail(e.target.value)}></TextField>

        <Button onClick={reset}>Reset Password</Button>

        { (confirmationState === 1) &&
            <span>The password reset email was successfuly sent to {email}. It may take a few minutes before it arrives. The link will expire in X minutes.</span>
        }
        { (confirmationState === 2) &&
            <span>The given email is not associated with any account. Make sure it's correct and try again.</span>
        }

        <Link href="/login">Go back to Login.</Link>
        <Link href="/signin">Sign up</Link>
    </div>
  );
}

export default PasswordReset;
