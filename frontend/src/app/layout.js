import "./globals.css";

import Navbar from "../../components/navbar/navbar";
import NavbarAlertProvider from "../../components/navbarAlertProvider/navbarAlertProvider";
import AccountProvider from "../../components/accountProvider/accountProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavbarAlertProvider>
          <AccountProvider>
            <Navbar></Navbar>
            {children}
          </AccountProvider>
        </NavbarAlertProvider>
      </body>
    </html>
  );
}
