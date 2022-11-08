import React, { createContext } from 'react'

import supabase from './client'

interface Props {
	children: JSX.Element | JSX.Element[]
}

export const SupabaseContext = createContext({ supabase })

const SupabaseProvider: React.FC<Props> = ({ children }) => {
	return (
		<SupabaseContext.Provider value={{ supabase }}>
			{children}
		</SupabaseContext.Provider>
	)
}
export default SupabaseProvider
