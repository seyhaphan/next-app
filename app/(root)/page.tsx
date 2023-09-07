import Link from "next/link";

export default function Home() {
  return (
    <main>
        <Link href={"/profile"}>Profile</Link>
        <h2>Home Page</h2>
    </main>
  )
}
