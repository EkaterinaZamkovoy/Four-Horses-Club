//running-line
//(scrollSum = 1) - скорость прокрутки (1 пиксель за шаг), (speed = 7) - шаг анимации (ms);

const createRunningLine = (scrollSum = 1, speed = 10) => {
  const runningLine = document.getElementById("running-line");
  const text = document.getElementById("text");
  const clone = text.cloneNode(true);
  runningLine.appendChild(clone);

  const animate = () => {
    if (runningLine.scrollLeft >= text.offsetWidth) {
      runningLine.scrollLeft -= text.offsetWidth;
    } else {
      runningLine.scrollLeft += scrollSum;
    }
  };
  setInterval(animate, speed);
};

createRunningLine(1, 10);

//running-line2

const createRunningLineBottom = (scrollSum = 1, speed = 10) => {
  const runningLineBottom = document.getElementById("running-line-bottom");
  const text = document.getElementById("text-bottom");
  const clone = text.cloneNode(true);
  runningLineBottom.appendChild(clone);

  const animate = () => {
    if (runningLineBottom.scrollLeft >= text.offsetWidth) {
      runningLineBottom.scrollLeft -= text.offsetWidth;
    } else {
      runningLineBottom.scrollLeft += scrollSum;
    }
  };
  setInterval(animate, speed);
};

createRunningLineBottom(1, 10);

//stages

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".stage__item-adaptiv-slide"); // cлайды карусели
  const prevBtn = document.querySelector(
    ".stage__items-adaptiv-pagination .prev"
  ); // кнопка назад
  const nextBtn = document.querySelector(
    ".stage__items-adaptiv-pagination .next"
  ); // кнопка вперёд
  const paginationDots = document.querySelectorAll(
    ".stage__items-adaptiv-pagination .pagination span"
  ); // точки нумерации

  let activeSlideIndex = 0;

  const displaySlide = (index) => {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "flex" : "none";
    });
  };

  const updatePaginationDots = (index) => {
    paginationDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  };

  const toggleNavButtons = () => {
    prevBtn.classList.toggle("disabled", activeSlideIndex === 0);
    nextBtn.classList.toggle(
      "disabled",
      activeSlideIndex === slides.length - 1
    );
  };

  const navigateToSlide = (index) => {
    if (index >= 0 && index < slides.length) {
      activeSlideIndex = index;
      displaySlide(activeSlideIndex);
      updatePaginationDots(activeSlideIndex);
      toggleNavButtons();
    }
  };

  prevBtn.addEventListener("click", () => {
    if (!prevBtn.classList.contains("disabled")) {
      navigateToSlide(activeSlideIndex - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (!nextBtn.classList.contains("disabled")) {
      navigateToSlide(activeSlideIndex + 1);
    }
  });

  paginationDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      navigateToSlide(index);
    });
  });

  displaySlide(activeSlideIndex);
  updatePaginationDots(activeSlideIndex);
  toggleNavButtons();
});

//tournament

document.addEventListener("DOMContentLoaded", () => {
  const playerSlides = document.querySelectorAll(".tournament__player"); // cлайды игроков
  const totalPlayers = playerSlides.length; // oбщее количество слайдов игроков
  let visiblePlayers = 1; // количество видимых слайдов
  let currentPlayerIndex = 0; // индекс текущего слайда

  const displaySlides = () => {
    playerSlides.forEach((player, id) => {
      player.style.display =
        id >= currentPlayerIndex && id < currentPlayerIndex + visiblePlayers
          ? "flex"
          : "none";
    });

    const slideIndicator = document.querySelector(
      ".tournament__pagination-number-slide span:first-child"
    );
    const displayedSlideNumber = currentPlayerIndex + 1;
    const maxVisibleSlides = totalPlayers - (visiblePlayers - 1);
    slideIndicator.textContent = `${displayedSlideNumber} / ${maxVisibleSlides}`;
    updateNavigation();
  };

  const updateNavigation = () => {
    const previousButton = document.querySelector(
      ".tournament__pagination.prev"
    );
    const nextButton = document.querySelector(".tournament__pagination.next");

    previousButton.classList.toggle("disabled", currentPlayerIndex === 0);

    nextButton.classList.toggle(
      "disabled",
      currentPlayerIndex + visiblePlayers >= totalPlayers
    );
  };

  const moveToPreviousSlide = () => {
    if (currentPlayerIndex === 0) {
      currentPlayerIndex = totalPlayers - visiblePlayers;
    } else {
      currentPlayerIndex--;
    }
    displaySlides();
  };

  const moveToNextSlide = () => {
    if (currentPlayerIndex + visiblePlayers >= totalPlayers) {
      currentPlayerIndex = 0;
    } else {
      currentPlayerIndex++;
    }
    displaySlides();
  };

  const previousButton = document.querySelector(".tournament__pagination.prev");
  const nextButton = document.querySelector(".tournament__pagination.next");

  previousButton.addEventListener("click", moveToPreviousSlide);
  nextButton.addEventListener("click", moveToNextSlide);

  window.addEventListener("resize", () => {
    updateVisiblePlayers();
    displaySlides();
  });

  const updateVisiblePlayers = () => {
    if (totalPlayers === 1 || totalPlayers === 2) {
      visiblePlayers = 1;
    } else if (totalPlayers >= 3 && window.innerWidth >= 1024) {
      visiblePlayers = 3;
    } else if (totalPlayers >= 2 && window.innerWidth >= 768) {
      visiblePlayers = 2;
    } else {
      visiblePlayers = 1;
    }
  };

  updateVisiblePlayers();
  displaySlides();
  setInterval(moveToNextSlide, 4000);
});
