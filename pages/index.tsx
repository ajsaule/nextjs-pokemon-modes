import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

// makes a request to services, gathers up all that data and returns and object that has props in it
// SSR can be used in conjunction with client side rendering, some data in SSG (Client side rendering) and some in SSR, depending on the use case
export async function getServerSideProps() {
  const res = await fetch(
    'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  )

  return {
    props: {
      pokemon: await res.json(),
    },
  }
}

export default function Home({ pokemon }: { pokemon: any }) {
  // const [pokemon, setPokemon] = useState([])

  // useEffect(() => {
  //   async function getPokemon() {
  //     // fetch and .json() are both promises that's why they're being awaited...
  //     const res = await fetch(
  //       'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  //     )
  //     setPokemon(await res.json())
  //   }
  //   getPokemon()
  // }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
        {pokemon.map((poke: any) => (
          <div className={styles.card} key={poke.id}>
            <Link href={`/pokemon/${poke.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${poke.image}`}
                alt={poke.name}
              />
            </Link>
            <h3>{poke.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
