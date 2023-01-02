export const getTitle = (string = '') => {
	const match = string.match(/\d{3}/) || []
	const [num] = match
	return `Страница ${num}`
}
