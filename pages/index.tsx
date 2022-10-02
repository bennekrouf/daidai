import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/app.module.css'

import Transactions from '../components/Transactions'
import Header from '../components/Header'
const Home: NextPage = (data) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>DAI DAI</title>
        <meta name="description" content="DAI explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='App'>
        <Header />
        <Transactions />
      </main>

    </div>
  )
}

export default Home