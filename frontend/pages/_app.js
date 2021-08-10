import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
    // return (
    //   <Component {...pageProps} />
    // )
    return (
        <>
            <Head>
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
                    rel="stylesheet"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
