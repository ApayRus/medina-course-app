interface Page {
	type: 'page'
	title: string
}

interface Folder {
	type: 'folder'
	title: string
	content: Array<Page | Folder>
}

export type TableOfContent = Array<Page | Folder>

const tableOfContent: TableOfContent = [
	{
		type: 'folder',
		title: 'Book 1',
		content: [
			{ type: 'page', title: 'page 1' },
			{ type: 'page', title: 'page 2' },
			{ type: 'page', title: 'page 3' }
		]
	},
	{
		type: 'folder',
		title: 'Book 2',
		content: [
			{ type: 'page', title: 'page 4' },
			{ type: 'page', title: 'page 5' },
			{ type: 'page', title: 'page 6' },
			{
				type: 'folder',
				title: 'Book 2.1',
				content: [
					{ type: 'page', title: 'page 7' },
					{ type: 'page', title: 'page 8' },
					{ type: 'page', title: 'page 9' },
					{
						type: 'folder',
						title: 'Book 2.2',
						content: [
							{ type: 'page', title: 'page 10' },
							{ type: 'page', title: 'page 11' },
							{ type: 'page', title: 'page 12' }
						]
					}
				]
			},
			{ type: 'page', title: 'page 7' }
		]
	}
]

export default tableOfContent
