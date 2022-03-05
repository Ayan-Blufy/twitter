
import Head from 'next/head'
import Image from 'next/image'
import { getSession, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Modal from "../components/Modal";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import Widgets from '../components/Widgets'

const Home = ({ trendingResults, followResults}) => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
      <Sidebar/>
      <Feed/>
        <Widgets trendingResults={trendingResults} followResults={followResults}/>
        {isOpen && <Modal />}

      </main>


    </div>
  )
}

export default Home
export async function getServerSideProps(context) {
  // // Check if the user is authenticated on the server...
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }
  return{
    props:{
      session,
      trendingResults ,
      followResults
    }
  }
}