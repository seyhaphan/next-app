import {PropsWithChildren} from 'react';

const RootLayout = ({children}: PropsWithChildren) => {
    return (
        <html>
           <body>
               <h2>Auth Layout</h2>
               {children}
           </body>
        </html>
    );
};

export default RootLayout;