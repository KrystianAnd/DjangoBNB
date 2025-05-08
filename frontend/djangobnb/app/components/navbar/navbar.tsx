import Link from "next/link";
import Image from "next/image";
import Searchfilter from "./searchfilter";
import UserNav from "./usernav";
import AddPropertyButton from "./AddPropertyButton";
import { getUserId } from "@/app/lib/actions";

const Navbar = async () => {
    const userId = await getUserId();

    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b border-b-gray-300 bg-white z-10">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="DjangoBNB logo"
                            width={180}
                            height={38}
                        />
                    </Link>

                    <div className="flex space-x-6 ">
                        <Searchfilter />
                    </div>
                    

                    <div className="flex items-center space-x-6">
                        <AddPropertyButton 
                            userId={userId}
                        />
                        
                        <UserNav 
                            userId={userId}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
