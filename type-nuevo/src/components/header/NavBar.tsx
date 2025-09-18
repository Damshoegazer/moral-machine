import Link from "next/link";
import { links } from "./links";

const NavBar = () => {
  return (
    <div className="w-full flex justify-start ">
    <div className="w-[25%] border border-orange-500 px-4 uppercase text-[0.9rem] h-10 my-4 ml-10 flex justify-start items-center gap-2 rounded-4xl fixed  bg-[#51505000] z-50  text-white ">
        {links.map((link) => (
            <li className="" key={link.title}>
                <Link href={link.href}>{link.title}</Link>
            </li>
        ))}
    </div>
    </div>
  )
}

export default NavBar;