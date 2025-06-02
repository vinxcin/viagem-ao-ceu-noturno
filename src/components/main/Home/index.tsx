import { BLACK_HOLE } from "@/assets/images"
import { StarsBackground } from "@/components/sub";

export default function Home() {
    const scrollToSection = () => {
        const section = document.getElementById("about");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative flex flex-col h-full w-full">
            <video
                autoPlay
                muted
                loop
                className="absolute rotate-180 inset-0 top-[-300px] h-full w-full object-cover brightness-50">
                <source src={BLACK_HOLE} type="video/webm" />
            </video>

            <StarsBackground length={20} />

            <div className="h-screen w-full flex flex-col justify-center items-center z-50 px-[30px]">
                <h1 className="md:text-[74px] font-bold text-[54px] text-center">
                    Viagem ao Céu Noturno
                </h1>


                <p className="text-lg md:text-3xl text-gray-300 text-center max-w-[700px]  mb-6">
                    A ponte entre o conhecimento ancestral e a exploração do cosmos.
                </p>

                <button
                    onClick={scrollToSection}
                    className="flex items-center px-16 py-3 text-white bg-[#7b3bfc26] rounded-full hover:bg-[#6429d1] border-[1px] border-[#3b0b9afa] transition duration-300"
                >
                    Embarque nessa TRIP 
                </button>
            </div>

        </section>
    );
}
