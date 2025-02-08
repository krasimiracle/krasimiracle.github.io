/*
	Full Motion by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Banner.
			var $banner = $('#banner');

			if ($banner.length > 0) {

				// IE fix.
					if (skel.vars.IEVersion < 12) {

						$window.on('resize', function() {

							var wh = $window.height() * 0.60,
								bh = $banner.height();

							$banner.css('height', 'auto');

							window.setTimeout(function() {

								if (bh < wh)
									$banner.css('height', wh + 'px');

							}, 0);

						});

						$window.on('load', function() {
							$window.triggerHandler('resize');
						});

					}

				// Video check.
					var video = $banner.data('video');

					if (video)
						$window.on('load.banner', function() {

							// Disable banner load event (so it doesn't fire again).
								$window.off('load.banner');

							// Append video if supported.
								if (!skel.vars.mobile
								&&	!skel.breakpoint('large').active
								&&	skel.vars.IEVersion > 9)
									$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

						});

				// More button.
					$banner.find('.more')
						.addClass('scrolly');

			}

		// Scrolly.
			$('.scrolly').scrolly();

		// Poptrox.
			$window.on('load', function() {

				var $thumbs = $('.box videopreview');

				if ($thumbs.length > 0)
					$thumbs.poptrox({
						onPopupClose: function() { $body.removeClass('is-covered'); },
						onPopupOpen: function() { $body.addClass('is-covered'); },
						baseZIndex: 10001,
						useBodyOverflow: false,
						overlayColor: '#222226',
						overlayOpacity: 0.75,
						popupLoaderText: '',
						fadeSpeed: 500,
						usePopupDefaultStyling: false,
						windowMargin: (skel.breakpoint('small').active ? 5 : 50)
					});

			});

		// Initial scroll.
			$window.on('load', function() {
				$window.trigger('scroll');
			});

		// Smooth scroll for the navigation menu and links with .scrolly classes
		$('.more, .scrolly').on('click', function(e) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1000, 'easeInOutExpo');
			e.preventDefault();
		});

		// Activate scrollspy to add active class to navbar items on scroll
		$('body').scrollspy({
			target: '#nav',
			offset: 80
		});

		// Back to top button
		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.back-to-top').fadeIn('slow');
			} else {
				$('.back-to-top').fadeOut('slow');
			}
		});

		$('.back-to-top').click(function() {
			$('html, body').animate({
				scrollTop: 0
			}, 1000, 'easeInOutExpo');
			return false;
		});

		// Initialize poptrox
		$('.thumbnails').poptrox({
			onPopupClose: function() { $('body').removeClass('is-poptrox-visible'); },
			onPopupOpen: function() { $('body').addClass('is-poptrox-visible'); },
			baseZIndex: 10001,
			useBodyOverflow: false,
			usePopupEasyClose: true,
			overlayColor: '#1f2328',
			overlayOpacity: 0.95,
			popupCloserText: '',
			popupLoaderText: '',
			selector: '.box:not(.videopreview) .image.fit',
			usePopupDefaultStyling: false,
			usePopupCaption: true,
			usePopupCloser: true,
			usePopupNav: true,
			windowMargin: 50
		});

		// Handle video previews separately
		$('.videopreview .button').on('click', function(e) {
			e.preventDefault();
			var videoUrl = $(this).attr('href');
			if (videoUrl.includes('youtube')) {
				var videoId = videoUrl.split('v=')[1];
				var iframe = $('<iframe>', {
					src: 'https://www.youtube.com/embed/' + videoId + '?autoplay=1',
					frameborder: 0,
					allowfullscreen: true,
					width: '800',
					height: '450'
				});
				$.magnificPopup.open({
					items: {
						src: iframe,
						type: 'inline'
					},
					closeBtnInside: true
				});
			}
		});

		// Add parallax effect to banner
		$(window).scroll(function() {
			var scrolled = $(window).scrollTop();
			$('#banner').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
		});

		// Lazy load images
		if ('loading' in HTMLImageElement.prototype) {
			const images = document.querySelectorAll('img[loading="lazy"]');
			images.forEach(img => {
				img.src = img.dataset.src;
			});
		} else {
			// Fallback for browsers that don't support lazy loading
			const script = document.createElement('script');
			script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
			document.body.appendChild(script);
		}

	});

})(jQuery);