/* -----------------------------------------------
					Js Main
--------------------------------------------------

    Author: Evandro Delgado
    Copyright: 2022

--------------------------------------------------

Table of Content

	1. Preloader
	2. Sound Start
	3. Evandro Portfolio Setup
	4. Blog Evandro Setup
	5. Active Current Link
	6. Mobile Toggle Click Setup
	8. Chart Setup
	9. Portfolio Tilt Setup
	10. Portfolio Image Link
	11. Portfolio Video Link
	12. Blog Video Link
	13. Validate Contact Form
	14. Google Map

----------------------------------- */

$(window).on("load", function () {
	/* -----------------------------------
				1. Preloader
	----------------------------------- */

	$("#preloader").delay(1000).addClass("loaded");

	/* -----------------------------------
			3. Evandro Portfolio Setup
	----------------------------------- */
	if ($(".portfolio-items").length) {
		var $elements = $(".portfolio-items"),
			$filters = $(".portfolio-filter ul li");
		$elements.isotope();

		$filters.on("click", function () {
			$filters.removeClass("active");
			$(this).addClass("active");
			var selector = $(this).data("filter");
			$(".portfolio-items").isotope({
				filter: selector,
				hiddenStyle: {
					transform: "scale(.2) skew(30deg)",
					opacity: 0,
				},
				visibleStyle: {
					transform: "scale(1) skew(0deg)",
					opacity: 1,
				},
				transitionDuration: ".5s",
			});
		});
	}

	/* -----------------------------------
			4. Blog Evandro Setup
	----------------------------------- */
	$(".blog-masonry").isotope({ layoutMode: "moduloColumns" });
});

$(document).ready(function () {
	"use strict";

	/* -----------------------------------
			5. Active Current Link
	----------------------------------- */
	$(".header-main ul li a").on("click", function () {
		if ($(".header-main.on").length) {
			$(".header-main").removeClass("on");
		}
	});

	/* -----------------------------------
		6. Mobile Toggle Click Setup
	----------------------------------- */
	$(".header-toggle").on("click", function () {
		$(".header-main").toggleClass("on");
	});

	/* -----------------------------------
	      7. Testimonials OwlCarousel
	----------------------------------- */
	$(".testimonial .owl-carousel").owlCarousel({
		loop: true,
		margin: 30,
		autoplay: true,
		smartSpeed: 500,
		responsiveClass: true,
		dots: false,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			},
			800: {
				items: 1,
			},
			1000: {
				items: 2,
			},
		},
	});

	/* -----------------------------------
	      	8. Chart Setup
	----------------------------------- */
	if ($(".chart").length > 0) {
		$(".chart").easyPieChart({
			trackColor: "#0e0f10",
			scaleColor: false,
			easing: "easeOutBounce",
			scaleLength: 4,
			lineCap: "square",
			lineWidth: 5,
			size: 130,
			animate: {
				duration: 2500,
				enabled: true,
			},
		});
	}

	/* -----------------------------------
	      	9. Portfolio Tilt Setup
	----------------------------------- */
	$(".pt-portfolio .portfolio-items .item figure").tilt({
		maxTilt: 3,
		glare: true,
		maxGlare: 0.6,
		reverse: true,
	});

	/* -----------------------------------
	      10. Portfolio Image Link
	----------------------------------- */
	$(".portfolio-items .image-link").magnificPopup({
		type: "image",
	});

	/* -----------------------------------
	      11. Portfolio Video Link
	----------------------------------- */
	$(".portfolio-items .video-link").magnificPopup({
		type: "iframe",
	});

	/* -----------------------------------
	      12. Blog Video Link
	----------------------------------- */
	$(".pt-blog .blog-item .thumbnail .btn-play").magnificPopup({
		type: "iframe",
	});

	/* -----------------------------------
	    13. Validate Contact Form
	----------------------------------- */
	if ($("#contact-form").length) {
		$("#contact-form").validate({
			rules: {
				name: {
					required: true,
					minlength: 2,
				},

				email: "required",
			},

			messages: {
				name: "Please enter your name",
				email: "Please enter your email address",
			},

			submitHandler: function (form) {
				$.ajax({
					type: "POST",
					url: "mail.php",
					data: $(form).serialize(),
					success: function () {
						$("#loader").hide();
						$("#success").slideDown("slow");
						setTimeout(function () {
							$("#success").slideUp("slow");
						}, 3000);
						form.reset();
					},
					error: function () {
						$("#loader").hide();
						$("#error").slideDown("slow");
						setTimeout(function () {
							$("#error").slideUp("slow");
						}, 3000);
					},
				});
				return false;
			},
		});
	}

	/* Google Map Setup */
	if ($("#map").length) {
		initMap();
	}
});

/* -----------------------------------
  		14. Google Map
----------------------------------- */
function initMap() {
	var latitude = $("#map").data("latitude"),
		longitude = $("#map").data("longitude"),
		zoom = $("#map").data("zoom"),
		cordinates = new google.maps.LatLng(latitude, longitude);

	var styles = [
		{
			stylers: [
				{ saturation: -100 },
				{ gamma: 0.8 },
				{ lightness: 4 },
				{ visibility: "on" },
			],
		},
		{
			featureType: "landscape.natural",
			stylers: [
				{ visibility: "on" },
				{ color: "#5dff00" },
				{ gamma: 4.97 },
				{ lightness: -5 },
				{ saturation: 100 },
			],
		},
	];

	var mapOptions = {
		zoom: zoom,
		center: cordinates,
		mapTypeControl: false,
		disableDefaultUI: true,
		zoomControl: true,
		scrollwheel: false,
		styles: styles,
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var marker = new google.maps.Marker({
		position: cordinates,
		map: map,
		title: "We are here!",
	});
}
