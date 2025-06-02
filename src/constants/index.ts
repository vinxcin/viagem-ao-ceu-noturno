import { Instagram } from 'lucide-react';
import { RUPESTRE_SOL, SOL, CONST_SARG, OBSERVACAO, BLACK_HOLE_3} from '@/assets/images';

export const NavBarItens = [
        // { name: "Home", id: "" },
        { name: "Início", id: "home" },
        { name: "Sobre o Projeto", id: "about" },
        { name: "Oficinas & Vivências", id: "vivencias" },
        { name: "Contato", id: "contato" }
    ];

export const Socials = [
    {
        name: "Instagram",
        Icon: Instagram,
        src: "https://www.instagram.com/viagemaoceunoturno/"
    }
];


export const Images = [
    { src: RUPESTRE_SOL, name: "pedra rupestre", top: "40%", left: "10%" },
    // { src: SOL, name: "SOL", top: "80%", left: "40%"  },
    { src: CONST_SARG, name: "Constelacao Sagittarius", top: "15%", left: "85%" }
];


export const Cards = [
    { src: OBSERVACAO, name: "Explorando o Céu Noturno", description: "Vamos usar telescópios para observar de perto a Lua, Saturno com seus anéis, Júpiter com suas luas e outros astros visíveis. Uma jornada mágica sob as estrelas!"  },
    { src: BLACK_HOLE_3, name: "O Mistério dos Buracos Negros", description: "Você sabia que as estrelas também nascem, vivem e morrem? Nessa vivência, vamos descobrir como elas se formam, o que acontece quando explodem, e como surgem os fascinantes buracos negros."},
    // { src: OBSERVACAO, name: "Observação Astronômica", description: "Uma experiência guiada para explorar os astros e histórias do céu noturno."  },
];