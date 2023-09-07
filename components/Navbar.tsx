import Link from "next/link";

const Navbar = () => {
    console.log('render nav')
    return (
        <nav>
            <Link href={"/"}>Home</Link>
            <Link href={"/profile"}>Profile</Link>
            <Link href={"/login"}>Login</Link>
        </nav>
    );
};

export default Navbar;