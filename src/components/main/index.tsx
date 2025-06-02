import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import { StarsBackground } from "../sub";
import Footer from "./Footer";
import Vivencias_v2 from "./Vivencias_v2";

export default function LandingPage() {
    return (
        <main className="relative h-full w-full overflow-hidden text-white">
            <StarsBackground/>

            <div className="relative z-10 flex flex-col">
                <Home />
                <NavBar />
                <About />
                <Vivencias_v2 />
                <Footer/>
            </div>
        </main>
    );
}
