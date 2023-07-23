interface MenuObject {
	id: number;
	attributes: {
		title: string;
		description: string | null;
		slug: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		show_tags: boolean;
		type: string;
		category: string | null;
	};
}

export function cleanPhotosData(data: any) {
	data.sort((a: any, b: any) => {
		const aStickToTop = a.attributes.stick_to_top === true;
		const bStickToTop = b.attributes.stick_to_top === true;

		if (aStickToTop && !bStickToTop) {
			return -1;
		} else if (!aStickToTop && bStickToTop) {
			return 1;
		} else {
			return 0;
		}
	});

	const grouped: any =
		data.reduce(
			(
				acc: Record<string, { title: string; slug: string }[]>,
				item: MenuObject
			) => {
				const category = item.attributes.category;

				if (category) {
					if (!acc[category]) {
						acc[category] = [];
					}

					if (true) {
						acc[category].push(item.attributes);
					}
				}

				return acc;
			},
			{}
		);

	const filtered: any = {};

	for (const category in grouped) {
		const categoryItems = grouped[category];
		const filteredItems = categoryItems.filter(
			(item: any) => { return item.title !== category || categoryItems.length === 1 }
		);
		if (filteredItems.length > 0) {
			filtered[category] = filteredItems;
		}
	}
	return filtered
}