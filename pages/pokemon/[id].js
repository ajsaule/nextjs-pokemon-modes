import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/Details.module.css'
import Link from 'next/link'

// SSG Below
export async function getStaticPaths() {
  const res = await fetch(
    'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  )

  const pokemon = await res.json()

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  )

  return {
    props: {
      pokemon: await res.json(),
    },
  }
}

/* 
  SSR or CSR will fetch the latest data from endpoints if they have been changed in some way. 
  SSG will not, it will simply build the files and populate them with the right data at build time. 
*/

// SSR Below
// export async function getServerSideProps({ params }) {
//   const res = await fetch(
//     `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
//   )

//   return {
//     props: {
//       pokemon: await res.json(),
//     },
//   }
// }

export default function Details({ pokemon }) {
  // const {
  //   query: { id },
  // } = useRouter()

  // const [pokemon, setPokemon] = useState(null)

  // useEffect(() => {
  //   async function getPokemon() {
  //     // fetch and .json() are both promises that's why they're being awaited...
  //     const res = await fetch(
  //       `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
  //     )
  //     setPokemon(await res.json())
  //   }
  //   if (id) {
  //     getPokemon()
  //   }
  // }, [id])

  // if (!pokemon) {
  //   return null
  // }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <Link href="/">Back to Home</Link>
      <div className={styles.layout}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(', ')}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
