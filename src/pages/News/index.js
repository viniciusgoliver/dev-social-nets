import styles from './styles.module.scss';

import ChatModal from '../../components/ChatModal';

import { FaArrowLeft } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import aprendaProgramar from '../../assets/aprenda-programar.png';
import qualLinguagem from '../../assets/qual-linguagem.png';
import qualLinguagemEscolher from '../../assets/qual-utilizar.png';

export default function NewsPage() {
    return (
        <>
            <div className={styles.container}>
                <Link className={styles.buttonBack} to="/dashboard">
                    <FaArrowLeft color="var(--soft-blue)" size={30} />
                </Link>
                <img src={aprendaProgramar} alt="aprende-programar" />

                <div className={styles.informationBox}>
                    <h1>• 5 passos para aprender a programar</h1>

                    <p>
                        Está começando agora a sua carreira como programador? Ou então nem começou mas precisa de um “empurrãozinho” para dar o ponto de partida? Então da uma olhada nessas dicas que farão toda a diferença para você trilhar a sua jornada!
                    </p>

                    <h2>1 - Escolha uma linguagem de programação.</h2>
                    <p>
                        Em diversos grupos, redes sociais ou em qualquer tipo de comunidade de estudantes/programadores uma das maiores dúvidas de qualquer pessoa que está começando é:
                    </p>

                    <img className={styles.qualLinguagem} src={qualLinguagem} alt="qual-linguagem-escolher" />

                    <p>
                        Para esse tipo de pergunta, é bem comum obtermos diversas respostas, como por exemplo, C, Java, C#, C++, Ruby, Python, PHP, JavaScript entre diversas linguagens que temos atualmente.
                        <br />
                        <br />
                        Entretanto, quando estamos começando, a linguagem em si não importa, pois a lógica é a mesma para todas as linguagens!
                        <br />
                        <br />
                        Nesse exato momento, você pode estar se perguntando:
                    </p>

                    <img className={styles.qualEscolher} src={qualLinguagemEscolher} alt="qual-linguagem-escolher" />

                    <p>
                        Teoricamente sim, porém, na prática, recomendo fortemente que escolha uma linguagem que tenha menos barreiras na curva de aprendizagem.
                        <br />
                        <br />
                        Em outras palavras, linguagens como por exemplo o JavaScript, que pode ser escrito em qualquer editor de texto e executado em qualquer navegador (até mesmo o IE em versões não tão antigas), é uma ótima escolha, pelos seguintes motivos:
                        <br />
                        <br />
                        • Não precisa instalar uma ferramenta específica para codificar.
                        <br />
                        <br />
                        • É uma linguagem de fácil aprendizagem.
                    </p>

                    <a href="https://sujeitoprogramador.com/5-passos-para-aprender-programar/" target="_blank">
                        Ler mais
                    </a>
                </div>
            </div>

            <ChatModal />
        </>
    )
}