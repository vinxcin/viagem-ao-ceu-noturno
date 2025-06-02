import { Cards } from "@/constants";

export default function Vivencias() {
    return (
        // <!-- Oficinas & Vivências -->
        <section className="h-[120vh] flex flex-col items-center justify-center gap-20">
            <h1 className="text-6xl font-bold leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-[#06a9b3] to-[#fb9513]">Conheça a nossa Proposta</h1>
            <p className="max-w-5xl mx-auto text-center text-lg leading-relaxed text-gray-300 px-4 md:px-0">
                A proposta deste projeto traz consigo a promessa de enriquecer e diversificar ainda mais o já vibrante ambiente do Festival.
                <br className="hidden md:block" />
                A astronomia, sendo uma das formas mais antigas de conhecimento humano, possui o poder de conectar pessoas de diversas origens e culturas através de sua universalidade.
                <br className="hidden md:block" />
                Acreditamos firmemente que esta iniciativa irá promover a troca de ideias, o compartilhamento de perspectivas e o enriquecimento da diversidade cultural que caracteriza o festival.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-[70rem] w-full">
                {Cards.map((i) => (
                    <div className="bg-[#7042f813] cursor-pointer rounded-3xl overflow-hidden shadow-lg shadow-[#2A0E61]/50 transition-transform hover:scale-105">
                        <img
                            className="w-full h-96 object-cover"
                            src={i.src}
                            alt={i.name}
                        />

                        <div className="p-4 text-left">
                            <h2 className="text-3xl font-semibold mb-2">{i.name}</h2>
                            <p className="text-2xl text-gray-300">
                                {i.description}
                            </p>
                        </div>
                    </div>
                ))}


            </div>
        </section>

    );
}
