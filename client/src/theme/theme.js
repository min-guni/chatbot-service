import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 'bold', // h1에 대한 굵기 설정
    },
    h2: {
      fontWeight: 'bolder', // h2에 대한 굵기 설정
    },
  },
});
