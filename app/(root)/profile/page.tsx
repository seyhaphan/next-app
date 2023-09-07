import React from 'react';
import Link from "next/link";

const Page = () => {
    return (
        <div>
            <h2>Profile Page</h2>
            <Link href={'/login'}>
                Login
            </Link>
        </div>
    );
};

export default Page;