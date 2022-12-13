export const getTitle = (string: string) => {
	const match = string.match(/\d{3}/) || []
	const [num] = match
	return `Страница ${+num}`
}
