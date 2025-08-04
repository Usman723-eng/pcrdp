
$(window).on('load', function () {
  $('.loader').fadeOut();
});
$('.icons-ul .icons-link').attr('target', '_blank');
$('section .check-plan-btn').attr('target', '_blank');

$(document).ready(function() {
  $('.burger-icon').on('click', function() {
    $('.mobile-menu').toggleClass('show-popup');
  });

  $(document).on('click', function(event) {
    if (!$(event.target).closest('.burger-icon, .popup-menu').length) {
      $('.popup-menu').toggleClass('show-popup');
      $('.submenu').removeClass('show');
    }
  });

  $('.has-submenu').on('click', function() {
    $(this).children('.submenu').addClass('show');
  });

  $('.back-btn').on('click', function(event) {
    event.stopPropagation();
    $(this).closest('.submenu').removeClass('show');
  });
});

$(document).ready(function() {
  $('.inner-header-main, .heading-desc, .action-otr .theme-btn-fill').click(function() {
    $('html, body').animate({ scrollTop: 500 }, 'slow');
  });
});
