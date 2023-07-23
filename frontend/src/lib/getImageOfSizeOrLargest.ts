import { PluginUploadFile } from "../../types/strapi/contentTypes";

export function getImageOfSizeOrLargest(
	image: PluginUploadFile["attributes"],
	preferredSize?: string
  ) {
	const sizes = [
	  "xxlarge",
	  "xlarge",
	  "large",
	  "medium",
	  "small",
	  "xsmall",
	  "thumbnail",
	];
  
	const formats = image.formats;
	if (!preferredSize) return image;
  
	if (formats[preferredSize]) return formats[preferredSize];
  
	sizes.forEach((size, index) => {
	  if (index >= sizes.indexOf(preferredSize) && formats[size]) {
		return formats[size];
	  }
	});
	return image;
  }