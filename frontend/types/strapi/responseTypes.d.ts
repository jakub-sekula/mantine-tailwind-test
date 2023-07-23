export interface Data {
	id: number;
	attributes: Attribute;
}

export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface Meta {
	pagination: Pagination;
}

type StrapiResponse<T> = {
	data: T;
	meta: Meta,
	message: string;
  };