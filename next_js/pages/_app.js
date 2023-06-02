import Layout from '../components/layout/Layout'
import '../styles/globals.css'

// root, beginiin point of the application

function MyApp({ Component, pageProps }) {
  // wrap Layout around in here, so all components are wrapped in it
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
