import {PropsWithChildren} from "react";
import {Navbar, NextAuthProvider} from "@/components";

const RootLayout = ({ children }: PropsWithChildren ) => {

  return (
    <html lang="en">
      <body >
          <NextAuthProvider>
              <Navbar />
              <h2>ROOT Layout</h2>
              {children}
          </NextAuthProvider>
      </body>
    </html>
  )
}

export default RootLayout