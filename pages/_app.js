import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "next/head";
import db from "../db.json";

const GlobalStyle = createGlobalStyle`

* {
box-sizing: border-box;

}

  body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  font-family: 'Catamaran', sans-serif;
  color: ${({ theme }) => theme.colors.contrastText};
  overflow: hidden;
  }


  html, body {
  min-height: 100vh;
  }

  #__next{
  flex: 1;
  display: flex;
  flex-direction: column;
  }

@media (max-width: 768px) {
  body {
    overflow: auto;
  }
}
`;

const theme = db.theme;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Catamaran:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="./images/icon.png" />
        <title>The Vikings Quiz | Imersão Alura</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
