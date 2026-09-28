document.addEventListener("DOMContentLoaded", () => {
	const carousel = document.querySelector("[data-carousel]");

	if (!carousel) {
		return;
	}

	const slides = Array.from(carousel.querySelectorAll(".balms-image"));
	const dots = Array.from(document.querySelectorAll("[data-carousel-dot]"));
	const prevSelector = "[data-carousel-prev], .balms-carousel-control-prev";
	const nextSelector = "[data-carousel-next], .balms-carousel-control-next";

	if (!slides.length) {
		return;
	}

	let currentIndex = slides.findIndex((slide) => slide.classList.contains("active"));

	if (currentIndex < 0) {
		currentIndex = 0;
	}

	const normalizeIndex = (index) => {
		return (index + slides.length) % slides.length;
	};

	const updateCarousel = (nextIndex) => {
		currentIndex = normalizeIndex(nextIndex);

		slides.forEach((slide, index) => {
			const isActive = index === currentIndex;
			slide.classList.toggle("active", isActive);
			slide.hidden = !isActive;
		});

		dots.forEach((dot, index) => {
			const isActive = index === currentIndex;
			dot.classList.toggle("active", isActive);

			if (isActive) {
				dot.setAttribute("aria-current", "true");
			} else {
				dot.removeAttribute("aria-current");
			}
		});
	};

	carousel.addEventListener("click", (event) => {
		if (event.target.closest(prevSelector)) {
			updateCarousel(currentIndex - 1);
			return;
		}

		if (event.target.closest(nextSelector)) {
			updateCarousel(currentIndex + 1);
		}
	});

	dots.forEach((dot) => {
		dot.addEventListener("click", () => {
			const dotIndex = Number.parseInt(dot.getAttribute("data-carousel-dot"), 10);

			if (!Number.isNaN(dotIndex)) {
				updateCarousel(dotIndex);
			}
		});
	});

	updateCarousel(currentIndex);
});
