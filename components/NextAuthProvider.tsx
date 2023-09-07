'use client';

import { SessionProvider } from "next-auth/react";
import {PropsWithChildren} from "react";

const NextAuthProvider = ({ children }: PropsWithChildren) => (
    <SessionProvider>{children}</SessionProvider>
)

export default NextAuthProvider;
