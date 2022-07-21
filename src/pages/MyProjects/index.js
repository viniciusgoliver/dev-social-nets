import { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss'
import firebase from 'firebase';

import Header from '../../components/Header'
import AddProjectModal from '../../components/AddProjectModal'

import Sidebox from '../../components/Sidebox'

import { FiPlus } from 'react-icons/fi';

import developers from '../../assets/developers.jpg'
import { AuthContext } from '../../contexts/auth';

export default function MyProjects() {
	const { user } = useContext(AuthContext)

   const [modalNewProjectIsOpen, setModalNewProjectIsOpen] = useState(false)
	const [projects, setProjects] = useState([])

	useEffect( () => {
		loadProjects();
	}, [])

	async function loadProjects() {
		await firebase.firestore().collection('projects')
		.get()
		.then( (snapshot) => {
			let arrayProjects = [];
			snapshot.forEach( (doc) => {
				if(doc.data().user_id === user.uid) {
					let data = {
						repo: doc.data().repo,
						user_id: doc.data().user_id,
						imageProjectUrl: doc.data().imageProjectUrl,
						liveLink: doc.data().liveLink,
						description: doc.data().description,
						title: doc.data().title,
						id: doc.id
					}
					arrayProjects.push(data)
				}
			})
			setProjects(arrayProjects)
		})
	}

   function handleCloseModalNewProject() {
      setModalNewProjectIsOpen(false)
   }

   function handleOpenModalNewProject() {
      setModalNewProjectIsOpen(true)
   }

   return (
      <>
         <Header />
         <div className={styles.containerMyProjects}>
				<Sidebox />
            <div className={styles.contentMyProjects}>
					<header>
						<h1>Meus projetos</h1>
						<button onClick={handleOpenModalNewProject}>
							<FiPlus />
							<span>Adicionar projeto</span>
						</button>
					</header>
					<div className={styles.cardsProjects}>
						{projects.map( project => (
							<div className={styles.card} key={project.id}>
								<img src={project.imageProjectUrl} alt="Foto projeto" />
								<div className={styles.infosCard}>
									<span>{project.title}</span>
									<p>{project.description}</p>
								</div>
								<div className={styles.buttonsCard}> 
									<button><a href={project.liveLink} target="_blank">Ver aplicação</a></button>
									<button><a href={project.repo} target="_blank">Ver repositório</a></button>
								</div>
							</div>
						))}
					</div>
				</div>
         </div> 
			{modalNewProjectIsOpen === true && <AddProjectModal closeModal={handleCloseModalNewProject} reloadProjects={loadProjects} />}
      </>
   )
}