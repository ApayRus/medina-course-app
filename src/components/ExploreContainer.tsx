import './ExploreContainer.css'

interface ContainerProps {
	path: string
	children: JSX.Element | JSX.Element[]
}

const ExploreContainer: React.FC<ContainerProps> = ({ children, path }) => {
	return (
		<div className='container'>
			<div className='playerContainer'>{children}</div>
		</div>
	)
}

export default ExploreContainer
