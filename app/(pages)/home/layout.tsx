import Banner from "@/app/components/Banner/Banner";
import Footer from "@/app/components/Footer/Footer";
import { Header } from "@/app/components/Header/Header";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Banner />
      <div className="h-20" />
      {children}
      <Footer />
    </>
  );
}
