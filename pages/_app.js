import "@/styles/globals.css";
import Nav from "@/component/nav"
export default function App({ Component, pageProps }) {
  return(
     <>
     <Nav></Nav>
     <Component {...pageProps} />
     </>
  ) 
}
