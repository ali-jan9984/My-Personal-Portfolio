import localFont from 'next/font/local'; 
import  Navbar  from './Navbar/page';

// Load the custom font
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",  // Adjust font path if needed
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {   
  title: "Create Next App",   
  description: "Generated by create next app", 
};

export default function RootLayout(
    { children }
    :Readonly<{ children: React.ReactNode}>) {
  return (
    <html lang="en" className="dark">
        <body className={`${geistSans.variable} antialiased`}>
          {children}
        </body>
    </html>
  );
}