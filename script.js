let mainContainer;
let sliderContainer;
let slider;

let nav;
// btn
let nextBtn;
let prevBtn;

// data

let sliceDistance; // 每次滑动的距离
let navDistance;
let distanceSum;
let sliceLength; // 滑块的距离

let currentIndex;

window.onload = function () {
  initElement();
  initData();
  initEvent();
};

function initElement() {
  // 主容器
  mainContainer = document.querySelector(".main-content");
  //   所有滑块
  slider = mainContainer.querySelectorAll(".slice");
  // 滑块容器
  sliderContainer = mainContainer.querySelector(".slieder-item-container");

  //   controller span
  nav = document.querySelector(".controller-content .nav-slice");
  navSpan = document.querySelectorAll(".controller-content .nav-slice span");
  navSpan[0].style.borderBottomColor = "red";
  //   btn
  nextBtn = document.querySelector(".controller-container .nextBtn");
  prevBtn = document.querySelector(".controller-container .prevBtn");
}

function initEvent() {
  navSpan.forEach((element, index) => {
    element.addEventListener("click", (e) => {
      console.log(index);
      handleClickSpan(index);
    });
  });

  // 前进
  nextBtn.addEventListener("click", (e) => {
    handleClickNext();
  });
  // 后退
  prevBtn.addEventListener("click", (e) => {
    handleClickPrev();
  });
}

function initData() {
  nav.style.width =
    nav.dataset.spanWidth * navSpan.length +
    2 * (nav.dataset.spanMargin * navSpan.length) +
    "px";

  sliderContainer.style.width =
    sliderContainer.dataset.sliceWidth * slider.length + "px";
  sliceDistance = sliderContainer.dataset.sliceWidth * 1;

  navDistance = nav.dataset.spanWidth * 1 + nav.dataset.spanMargin * 1 + 20;

  //   console.log(navDistance);
  sliceLength = slider.length - 1;
  currentIndex = 0;
}

function handleClickNext() {
  console.log(currentIndex);
  if (currentIndex >= sliceLength) {
    // currentIndex = 0;
    // sliderContainer.style.transform = "translateX(" + 0 + "px)";
    return;
  }
  if (currentIndex === 0) {
    sliderContainer.style.transform = "translateX(" + -sliceDistance + "px)";
    nav.style.transform =
      "translateX(" + -navDistance * (currentIndex + 1) + "px)";
  } else {
    sliderContainer.style.transform =
      "translateX(" + -sliceDistance * (currentIndex + 1) + "px)";

    nav.style.transform =
      "translateX(" + -navDistance * (currentIndex + 1) + "px)";
  }
  currentIndex = currentIndex + 1;
  clearBorder(currentIndex);
}

function handleClickPrev() {
  if (currentIndex === 0) {
    return;
  }
  currentIndex = currentIndex - 1;

  sliderContainer.style.transform =
    "translateX(" + -sliceDistance * currentIndex + "px)";

  nav.style.transform = "translateX(" + -navDistance * currentIndex + "px)";

  if (currentIndex < 0) {
    currentIndex = 0;
  } else {
    clearBorder(currentIndex);
  }
}

function handleClickSpan(index) {
  if (index === currentIndex) {
    return;
  }

  if (index > currentIndex) {
    currentIndex = index;
    clearBorder(index);
    sliderContainer.style.transform =
      "translateX(" + -sliceDistance * index + "px)";
    return;
  }

  if (index < currentIndex) {
    currentIndex = index;
    clearBorder(index);
    sliderContainer.style.transform =
      "translateX(" + -sliceDistance * index + "px)";
    return;
    return;
  }
}

function clearBorder(index) {
  navSpan.forEach((el) => {
    el.style.borderBottomColor = "rgba(255, 255, 255, .3)";
  });
  navSpan[index].style.borderBottomColor = "red";
}
