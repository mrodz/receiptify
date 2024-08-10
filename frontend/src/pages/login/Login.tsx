import { useNavigate } from "react-router-dom";
import { TextField, Button, Link, Card, FormControl, Typography } from "@mui/material"

import "./Login.css"
import google from '../../assets/google.svg'
import github from '../../assets/github.svg'

function Login() {
  const navigate = useNavigate()

  return (
    <main className="flex items-center justify-center h-full">
      <Card className="p-8 w-6/7 sm:w-2/3 md:w-1/2 max-w-4xl">
        <Typography className="text-center" variant="h3" component="h1" gutterBottom>
          <span className="max-sm:hidden">
            Sign in to&nbsp;
          </span>
          Receiptify
        </Typography>

        <FormControl className="w-full flex flex-col items-center gap-4">
          <div className="w-4/5 sm:w-2/5 md:w-3/5">
            <TextField className="w-full" label="Username" type="text"></TextField>

            <div className="flex flex-col mt-4">
              <TextField className="w-full" label="Password" type="password"></TextField>
              <Button onClick={() => navigate("/login/reset")}>Forgot password?</Button>
            </div>
          </div>

          <div className="grid max-lg:grid-rows-2 lg:grid-cols-2 w-4/5 sm:w-2/5 md:w-3/5">
            <Button variant="outlined" className="grid grid-cols-[1fr_auto] gap-3">
              <img className="w-8" src={google} />
              Sign in with Google
            </Button>
            <Button variant="outlined" className="grid grid-cols-[1fr_auto] gap-3">
              <img className="w-8" src={github} />
              Sign in in with GitHub
            </Button>
          </div>

          <Button variant="contained">Log in</Button>

          <Link href="/signup">Don't have an account? Sign up.</Link>
        </FormControl>
      </Card>
    </main>
  );
}

export default Login;
