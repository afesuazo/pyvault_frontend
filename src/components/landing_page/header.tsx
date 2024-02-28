import Link from "next/link";


const Header = () => {
    return (
        <header className="flex px-14 pt-10 items-center justify-between w-full">
            <Link href="/" className="text-3xl font-bold">
                PyVault
            </Link>
            <div className="flex space-x-4 text-lg font-medium">
                <a
                    href="https://github.com/afesuazo/pyvault"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-300 rounded-2xl transition ease-in-out duration-100 hover: hover:bg-gray-500"
                >
                    GitHub
                </a>
                <Link href="/dashboard" className="px-4 py-2 bg-gray-300 rounded-2xl transition ease-in-out duration-100 hover:bg-gray-500 ">
                    Log In
                </Link>
            </div>
        </header>
    );
};


export default Header;