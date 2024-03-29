
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

import Nav from "@/components/Nav";


export const metadata = {
  title: "Auth One",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <AuthProvider>
        <body >
          <Nav/>
            {children}
          </body>
        </AuthProvider>
    </html>
  );
}
