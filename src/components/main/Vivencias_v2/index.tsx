import { OBSERVACAO } from "@/assets/images"

export default function Vivencias_v2() {
    return (
        // <!-- Oficinas & Vivências -->
        <section className="h-[120vh] flex flex-col items-center justify-center mx-64">
            <div className="flex flex-col md:flex-row justify-around bg-[#10121565] h-1/2 w-full rounded-lg border border-[#1F1F1F] shadow-xl shadow-[#31313153] p-10">
                <div className="flex flex-col gap-10">
                    <h1 className="text-6xl ">Proposta do Projeto</h1>
                    <div className="flex">

                        <div className="text-3xl flex flex-col w-1/2 gap-10 font-lexend font-extralight opacity-95 tracking-wider">
                            <p> A proposta deste projeto traz consigo a promessa de enriquecer e diversificar ainda mais o já vibrante ambiente dos Festivais</p>
                            <p> A astronomia, sendo uma das formas mais antigas de conhecimento humano, possui o poder de conectar pessoas de diversas origens e culturas através de sua universalidade.</p>
                        </div>
                        
                        <div className="flex flex-col w-auto">
                            <h2 className="text-3xl font-semibold mb-2">Explorando o Céu Noturno</h2>
                            <img
                                className="w-full h-96 object-cover"
                                src={OBSERVACAO}
                                alt=""
                            />
                        </div>
                    </div>


                </div>
            </div>
        </section>

    );
}
