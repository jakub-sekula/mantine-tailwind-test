export function convertRelativeUrl(src) {
  if (src) {
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
  } else {
	return "/images/thailand.jpg"
  }
}
