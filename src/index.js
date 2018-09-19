import "materialize-loader";
import "materialize-css";
import './scss/input.scss';
import './css/output.css';
// import $ from 'jquery';

function msToTime(duration) {
    var seconds = parseInt((duration/1000)%60)
    var minutes = parseInt((duration/(1000*60))%60)
    var hours = parseInt(duration/(1000*60*60));
    var days = Math.floor(hours/24)
    hours = hours%24;
    days = (days === 0) ? days = "" : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return days + " days, " + hours + ":" + minutes + ":" + seconds
}


// var element_to_scroll_to = document.getElementById('news');
// element_to_scroll_to.scrollIntoView({
//   behavior: 'auto'
// });

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top -250
        }, 600, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


$(function(){
  var releaseDate = new Date('December 21, 2018 03:24:00');
  var updateCountdown = setInterval(function(){
    var timeLeft = releaseDate - Date.now();
    timeLeft = msToTime(timeLeft);
    $('.timer-output h2').text(timeLeft);
  })

  //nav stuff
  var contentSections = $('.cd-section'),
		navigationItems = $('.nav a');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.scroll').on('click', function(event){
        event.preventDefault();
        smoothScroll($(".scroll-link".hash));
    });

    // //open-close navigation on touch devices
    // $('.touch .cd-nav-trigger').on('click', function(){
    // 	$('.touch #cd-vertical-nav').toggleClass('open');
    //
    // });
    // //close navigation on touch devices when selectin an elemnt from the list
    // $('.touch #cd-vertical-nav a').on('click', function(){
    // 	$('.touch #cd-vertical-nav').removeClass('open');
    // });

	function updateNavigation() {
		contentSections.each(function(){
			var $this = $(this);
			var activeSection = $('.nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;

      if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      navigationItems.eq(activeSection).children().removeClass('is-selected');
      $('#last-knob').addClass('is-selected');
			} else if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).children().addClass('is-selected');
      } else {
				navigationItems.eq(activeSection).children().removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top - 250},
        	600
        );
	}

  $('.modal').modal();
});
