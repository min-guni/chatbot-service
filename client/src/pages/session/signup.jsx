import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { blue } from '@mui/material/colors';
import { signup } from '../../service/sign/signUpService';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function SignUp() {
  const [openErrorInfo, setOpenErrorInfo] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    signup({
      username: data.get('username'),
      password: data.get('password'),
    })
      .then((res) => {
        setOpenErrorInfo(1);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setOpenErrorInfo(0);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 20 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: blue[500] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth id="username" label="Username" name="username" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog
        open={openErrorInfo === 0}
        onClose={() => {
          setOpenErrorInfo(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            이미 같은 Username의 사용자가 있습니다. Username을 변경해 주세요.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openErrorInfo === 1}
        onClose={() => {
          setOpenErrorInfo(false);
          navigate('/signin');
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            회원 가입이 완료 되었습니다. 이제 로그인을 해주세요.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
