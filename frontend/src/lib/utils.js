export function convertRelativeUrl(src) {
  if (src) {
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
  } else {
	return "/images/thailand.jpg"
  }
}

// Converts relative links from Markdown to absolute for image display
export function imageLinkTransformer(src) {
  return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
}


export function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 50;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      // reveals[i].classList.remove("active");
    }
  }
}

