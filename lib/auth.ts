import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {JWT} from "next-auth/jwt";
import {Session, User} from "next-auth";
import {fetchJson} from "@/lib";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as
     * a prop on the `SessionProvider` React Context
     */
    interface Session {
        refreshTokenExpires?: number;
        accessTokenExpires?: string;
        refreshToken?: string;
        token?: string;
        error?: string;
        user?: User;
    }

    interface User {
        status: {
            code: number;
            message: string;
        };
        data: {
            access_token: string;
            token_type: string;
            expires_in: number;

        };
        sub: string;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        refreshTokenExpires?: number;
        accessTokenExpires: number;
        refreshToken?: string;
        token: string;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}

export const jwt = async ({ token, user }: { token: JWT; user?: User }) => {

    if(user){
        token.token = user.data.access_token
    }
    return { ...token, ...user };
};

export const session = ({ session, token }: { session: Session; token: JWT }): Promise<Session> => {

    if (Date.now() / 1000 > token?.accessTokenExpires) {
        return Promise.reject({
            error: new Error("Refresh token has expired. Please log in again to get a new refresh token."),
        });
    }
    const accessTokenData = JSON.parse(atob(token.token?.split(".")?.at(1)!));

    session.user = accessTokenData;
    token.accessTokenExpires = accessTokenData.exp;

    // @ts-ignore
    session.token = token?.token;

    return Promise.resolve(session);
};

export const authOption: NextAuthOptions = ({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials) {

                const authRequest = {
                    username: credentials?.username!,
                    password: "2B8/5M03rp1HxdsM2+XS3g=="
                }

                const response = await fetchJson('http://localhost:8080/api/wb/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(authRequest)
                })

                console.log('ddddddddddd',response)
                // if (response.statuc?Code === 200) {
                //     return response.data;
                // }

                throw new Error("Invalid username or password")
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60, // 2 hours
    },
    callbacks:{
        jwt,
        session
    },
    pages: {
        signIn: '/login'
    }
})