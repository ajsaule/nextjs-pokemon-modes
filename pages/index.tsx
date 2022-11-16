import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    async function getPokemon() {
      // fetch and .json() are both promises that's why they're being awaited...
      const res = await fetch(
        'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
      )
      setPokemon(await res.json())
    }
    getPokemon()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
        {pokemon.map((poke) => (
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
