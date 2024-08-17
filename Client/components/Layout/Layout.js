import NavBar from "../Header/Navbar";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen transition-colors pb-2 bg-white dark:bg-[#171717] text-black dark:text-white">
      <NavBar />

      <main>{children}</main>

      <footer className="bg-[#f7f7f7] rounded-lg shadow m-4 mb-0 dark:bg-[#111]">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link href="https://github.com/sosenkkk" className="hover:underline">
              GrubGuide
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link
                href="https://github.com/sosenkkk"
                className="dark:hover:text-white hover:text-black me-4 md:me-6"
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/sosenkkk/"
                className="dark:hover:text-white hover:text-black  me-4 md:me-6"
              >
                LinkedIn
              </Link>
            </li>

            <li>
              <Link
                href="https://www.linkedin.com/in/sosenkkk/"
                className="dark:hover:text-white hover:text-black "
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
