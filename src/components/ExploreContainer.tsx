import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './ExploreContainer.css'
import { SupabaseContext } from '../supabase/SupabaseProvider'

interface ContainerProps {
	path: string
}

const ExploreContainer: React.FC<ContainerProps> = ({ path }) => {
	const { supabase } = useContext(SupabaseContext)

	const [mediaLink, setMediaLink] = useState('')

	useLayoutEffect(() => {
		const {
			data: { publicUrl }
		} = supabase.storage.from('audios').getPublicUrl(path)

		setMediaLink(publicUrl)
	}, [path])

	return (
		<div className='container'>
			<strong>{path}</strong>
			<div className='playerContainer'>
				<audio controls src={mediaLink}></audio>
			</div>
		</div>
	)
}

export default ExploreContainer
