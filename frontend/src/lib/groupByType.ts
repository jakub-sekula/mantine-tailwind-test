interface Item {
	id: number;
	attributes: {
	  title: string;
	  description: string | null;
	  slug: string;
	  createdAt: string;
	  updatedAt: string;
	  publishedAt: string;
	  showTags: boolean;
	  type: string;
	};
  }

export function groupByType(data:any) {
  
	const grouped: Record<string, Item[]> =
	  data.reduce(
		(
		  acc: Record<string, Item[]>,
		  item: Item
		) => {
		  const category = item.attributes.type;
  
		  if (category) {
			if (!acc[category]) {
			  acc[category] = [];
			}
  
			if (true) {
			  acc[category].push(item);
			}
		  }
  
		  return acc;
		},
		{}
	  );
  
	const filtered: Record<string, Item[]> = {};
  
	for (const category in grouped) {
	  const categoryItems = grouped[category];
	  const filteredItems = categoryItems.filter(
		(item) => item.attributes.title !== category || categoryItems.length === 1
	  );
	  if (filteredItems.length > 0) {
		filtered[category] = filteredItems;
	  }
	}
	return filtered
  }