///////////////
// Variables //
///////////////

var stars = document.querySelectorAll(".fa-star");
var outStarsContainer = false;
var lastStar = 999;

///////////////
// Functions //
///////////////

const modifyFluidStars = (remCl, addCl, count, status) => {
  for (let index = 0; index < count; index++) {
    let state = stars[index].getAttribute("data-state");
    if (state == status) {
      $(stars[index]).removeClass(remCl).addClass(addCl);
      stars[index].setAttribute("data-state", "fluid");
    }
  }
};

const changeStarState = (actualState, futureState, index, counter) => {
  for (index; index < counter; index++) {
    let state = stars[index].getAttribute("data-state");
    if (state == actualState) {
      stars[index].setAttribute("data-state", futureState);
    }
  }
};

/////////////////////
// Event listeners //
/////////////////////

// Clears all stars and resets lastStar clicked state

mainBody.addEventListener("click", () => {
  if (outStarsContainer) {
    for (let index = 0; index < 5; index++) {
      stars[index].setAttribute("data-state", "fluid");
      $(stars[index]).removeClass("fas").addClass("far");
      lastStar = 999;
    }
  }
});

// Event that prevents clearing stars while inside starsContainer

starsContainer.addEventListener("mouseenter", () => {
  outStarsContainer = false;
});

// Leaving starsContainer clears fluid stars, and enables clicks outside clear container

starsContainer.addEventListener("mouseleave", () => {
  outStarsContainer = true;
  modifyFluidStars("fas", "far", 5, "fluid");
});

// Clicking on a star changes state of itself and stars to the left to static, and stars to the right to fluid
// Also checks if the same star is clicked again, set its state to fluid and reset the actualStarValue

stars.forEach((el) => {
  el.addEventListener("click", () => {
    let counter = parseInt(el.getAttribute("value"));
    let actualStar = counter - 1;
    let index = 0;

    changeStarState("fluid", "static", index, counter);
    changeStarState("static", "fluid", counter, 5);

    if (actualStar == lastStar) {
      stars[actualStar].setAttribute("data-state", "fluid");
      lastStar = 999;
    } else {
      lastStar = actualStar;
    }
  });
});

// Event that toggles the fluid stars to solid

stars.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    let counter = parseInt(el.getAttribute("value"));
    modifyFluidStars("far", "fas", counter, "fluid");
  });
});

// Event that toggles the fluid stars to rounded border

stars.forEach((el) => {
  el.addEventListener("mouseleave", () => {
    modifyFluidStars("fas", "far", 5, "fluid");
  });
});
