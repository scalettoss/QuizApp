$(".menu > ul > li").click(function (e) {
  // remove active from already active
  $(this).siblings().removeClass("active");
  // add active to clicked
  $(this).toggleClass("active");
  // if has sub menu open it
  $(this).find("ul").slideToggle();
  // close other sub menu if any open
  $(this).siblings().find("ul").slideUp();
  // remove active class of sub menu items
  $(this).siblings().find("ul").find("li").removeClass("active");
});

// window.addEventListener('click', function(event) {
//     if (!event.target.matches('#user-img')) {
//         var dropdowns = document.getElementsByClassName('dropdown-menu');
//         for (var i = 0; i < dropdowns.length; i++) {
//             var dropdown = dropdowns[i];
//             if (dropdown.classList.contains('show')) {
//                 dropdown.classList.remove('show');
//             }
//         }
//     }
// });
// $(".menu-btn").click(function () {
//   $(".sidebar").toggleClass("active");
// });

document.getElementById("user-img").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("show");
});

$(document).ready(function () {
  // Hàm kiểm tra kích thước màn hình và thực hiện toggle class
  function checkScreenSize() {
    if ($(window).width() < 700) {
      $(".sidebar").addClass("active");
    } else {
      $(".sidebar").removeClass("active");
    }
  }

  // Thực hiện kiểm tra ban đầu khi trang được tải
  checkScreenSize();

  // Sự kiện resize
  $(window).resize(function () {
    // Kiểm tra lại khi kích thước màn hình thay đổi
    checkScreenSize();
  });

  // Sự kiện click cho .menu-btn
  $(".menu-btn").click(function () {
    $(".sidebar").toggleClass("active");
  });
});
