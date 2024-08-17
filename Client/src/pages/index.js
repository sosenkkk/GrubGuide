import Head from "next/head";
import Section from "../../components/Card/Section";
import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const searchHandler = (e) => {
    const ele = document.getElementById("home-search").value;
    if(ele.trim().length!=0){
      console.log(ele)
      router.push("/restaurants?search="+ele)
    }
  };
  return (
    <>
      <Head>
        <title>GrubGuide - Discover Your Favorite Restaurants</title>
      </Head>
      <div className=" pt-8  text-black dark:text-white">
        <div className="bg-green-200 dark:bg-[#41B06E] relative min-h-[450px] p-8  m-8 mt-20 sm:m-20 rounded-xl">
          <div className="w-full flex-col md:flex-row flex min-h-[450px] gap-4 items-center justify-center">
            <Section className=" text-center md:text-left w-full sm:w-3/4 p-8   ">
              <h2 className=" text-2xl md:text-4xl lg:text-5xl font-bold">
                Check Out Your
              </h2>
              <h2 className=" text-xl md:text-4xl lg:text-5xl ">
                Favourite Restaurants
              </h2>
              <p className="text-xs md:text-lg pt-2 opacity-60">
                Find Out the best restraunts near you.
              </p>

              <input
                id="home-search"
                placeholder="Search your favourites"
                className="bg-white p-2 mt-2 text-black rounded-lg w-full"
              />
              <Button
                className="mt-2 bg-[#ebebeb] text-black"
                onClick={ searchHandler }
              >
                Search
              </Button>
            </Section>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 180, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className=" w-full sm:w-3/4 rounded-full max-w-[350px]  "
            >
              <img
                className="rounded-full w-full h-full object-cover "
                src="/images/bg1.png"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
