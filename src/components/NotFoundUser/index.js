import { Link } from 'react-router-dom';
import notFoundUser from '../../assets/notfounduser.svg'
import styles from './styles.module.scss';

export default function NotFoundUser() {
	return (
		<div className={styles.containerNotFoundUser}>
			<img src={notFoundUser} alt="" />
			<h1>Usuário não encontrado.</h1>
			<p>Verifique o ID ou volte para a página de início da Dev Social Network.</p>
			<Link to="/">Voltar para home</Link>
		</div>
	)
}