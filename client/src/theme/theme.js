import { createTheme } from '@mui/material/styles';

// 폰트 경로
const yourFontPath = '../../public';

// 폰트 선언
const yourFont = {
  fontFamily: 'YourFontName',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('YourFontName'),
    local('YourFontName-Regular'),
    url(${yourFontPath}) format('ttf')
  `,
};

// 테마 생성
const theme = createTheme({
  typography: {
    fontFamily: 'YourFontName, Arial, sans-serif', // 폰트 적용
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': [yourFont], // 글로벌 폰트 적용
      },
    },
  },
});

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
