import { useContext, useEffect, useState } from "react";
import styles from './styles.module.scss';

import avatar from "../../assets/avatar.png";

import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { BiTrash } from 'react-icons/bi'
import { BsBookmark } from 'react-icons/bs'

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

import { usePublications } from "../../hooks/usePublications";
import { AuthContext } from "../../contexts/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";


const ITEM_HEIGHT = 48;

export default function Feed() {
	const [popoverActive, setPopoverActive] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const { user } = useContext(AuthContext)
	const { publications, loadPublications, handleDeletePublication, loadingPublications } = usePublications()

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

	async function handleDelete() {
		await handleDeletePublication(popoverActive.publication_id);
	}

	function handleSavePublication() {
		console.log("Publication to save: " + popoverActive.publication_id)
	}

	useEffect(() => {
		loadPublications();

		setTimeout( loadPublications(), 500 )
	}, []);

	if(loadingPublications) {
		return (
			<div className={styles.loading}>
				<CircularProgress />
			</div>
		)
	}

	return (
		<div className={styles.feed}>
			{publications.map((publication) => (
				<div key={publication.id} className={styles.post}>
					<header>
						{publication.avatarUrl === null ?
							<img src={avatar} alt="foto avatar" />
							:
							<img src={publication.avatarUrl} alt="Avatar foto" />
						}
						<div>
								<Link to={`/user/${publication.user_id}`}>
									<span>{publication.user_name}</span>
								</Link>
								<p>{publication.user_role}</p>
								<time>{format(new Date(publication.created.seconds * 1000), "EEEE ' • 'd' de 'MMMM' • 'k'h'mm'", {
									locale: ptBR
								})}</time>
						</div>
					</header>
					<div className={styles.contentPost}>
						<p>{publication.publication}</p>
					</div>
					<IconButton
						aria-label="more"
						id="long-button"
						aria-controls={open ? 'long-menu' : undefined}
						aria-expanded={open ? 'true' : undefined}
						aria-haspopup="true"
						onClick={(e) => {
							handleClick(e)
							setPopoverActive({ publication_id: publication.id, user_id: publication.user_id })
						}}
						className={styles.buttonToSeeActions}
					>
						<IoEllipsisHorizontalSharp />
					</IconButton>
				</div>
			))}
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch',
					},
				}}>
				{user.uid === popoverActive.user_id && (
					<MenuItem>
						<button
							className={styles.buttonActionMenu}
							onClick={handleDelete}>
							<BiTrash /> Excluir publicação
						</button>
					</MenuItem>
				)}
				<MenuItem><button className={styles.buttonActionMenu} onClick={handleSavePublication}><BsBookmark /> Salvar publicação</button></MenuItem>
			</Menu>
		</div>
	)
}