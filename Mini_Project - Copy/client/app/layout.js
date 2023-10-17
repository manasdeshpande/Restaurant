import Nav from "@/components/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/auth";
import bgimg from "../assets/images/backgroundimage.jpg";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Elysium",
  description: "Where culinary artistry meets elegance. Immerse yourself in a world of gastronomic delight as we tantalize your taste buds with our exceptional five-star dining experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Nav />
          <div className="bg-img">
            <Image
              className="bg-img blur-sm"
              src={bgimg}
              alt="background-image"
              fill='true'
              quality={100}
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="min-h-full">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
