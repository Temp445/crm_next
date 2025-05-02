import BackToTop from "@/components/BackToTop";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PricingTable from "@/components/PricingTable";
import ProductEnquire from "@/components/ProductEnquire";
import StatsSection from "@/components/StatsSection";
import ToolsSection from "@/components/ToolsSection";

export default function Home() {
  return (
  <div className="main-container w-full  bg-white relative overflow-hidden mx-auto my-0 ">
 <div className="w-[1536px] h-[768px]  bg-cover bg-no-repeat absolute top-[79px] left-[-37px] z-[2]" />

  <Header/>
  <main>
  <Hero/>
  <ToolsSection/>
  <Features/>
  <StatsSection/>
  <CallToAction/>
  <PricingTable/>
  <ProductEnquire/>
  <BackToTop/>
  </main>
  <Footer/>
 </div>
  );
}
