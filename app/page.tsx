import Banner from "@/components/Banner";
import CartDrawer from "@/components/CartDrawer";
import Header from "@/components/Header";
import Menuitems from "@/components/Menuitems";
import ViewCartButton from "@/components/ViewCartButton";


export default function HomePage() {
  return (
    <>
    <Header />
    <Banner />
    <div className="grid grid-cols-1 min-h-screen">
      <Menuitems />
      <ViewCartButton /> 
      <CartDrawer />
    </div>
     </> 
  )
}
