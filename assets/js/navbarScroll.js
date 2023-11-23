// setting navbar saat digulir ke bawah
var lastScrollTop = 0;
var navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-70px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;
});

// setting navbar icon duck saat digulir ke bawah
var lastScrollDuck = 0;
var elementsDuck = document.querySelectorAll(".bg-first, .bg-second");

window.addEventListener("scroll", function () {
  var scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollDuck) {
    elementsDuck.forEach(function (element) {
      element.style.opacity = "0";
    });
  } else {
    elementsDuck.forEach(function (element) {
      element.style.opacity = "1";
    });
  }
  lastScrollDuck = scrollTop;
});
