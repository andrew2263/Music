	const keys = {37 : 1, 38 : 1, 39 : 1, 40 : 1, 32 : 1, 33 : 1, 34 : 1, 35 : 1, 36 : 1};
	let isPlaying = false;
	let audio = new Audio();

	function preventDefault (e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}

	function preventDefaultForScrollKeys(e) {
		if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
		}
	}

	const disableScroll = function() {
		if (window.addEventListener)
			window.addEventListener('DOMMouseScroll', preventDefault, false);
		window.onwheel = preventDefault;
		window.onmousewheel = document.onmousewheel = preventDefault;
		window.ontouchmove = document.ontouchmove = preventDefault;
		document.onkeydown = preventDefaultForScrollKeys;
	}

	var enableScroll = function() {
		if (window.removeEventListener)
			window.removeEventListener('DOMMouseScroll', preventDefault, false);
		window.onwheel = null;
		window.onmousewheel = document.onmousewheel = null;
		window.ontouchmove = document.ontouchmove = null;
		document.onkeydown = null;
	}

	$('.header__button-search').on('click', function(e){
		e.preventDefault();
		$('.header__buttons-input').toggleClass('header__buttons-input-visible');
	});

	$('.week__days-day a').on('click', function(e) {
		e.preventDefault();
		let href = $(this).attr('href');
		let weekDay = $(this).parent();
		$('.week__track-list').removeClass('week__track-list-active').removeClass('in');
		$(href).addClass('week__track-list-active');
		setTimeout(function() {
			$(href).addClass('in');
		}, 150);
		$('.week__days-day').removeClass('week__days-day-active');
		$(weekDay).addClass('week__days-day-active');
	});

	$('.week__button-right').on('click', function(e) {
		e.preventDefault();
		let hrefWeek = $('.week__days-day-active').next().find('a').attr('href');
		let weekDayNext = $('.week__days-day-active').next();

		if(weekDayNext.length == 0) {
			$('.week__track-list').removeClass('week__track-list-active').removeClass('in');
			$('#week__track-list-mo').addClass('week__track-list-active');
			setTimeout(function() {
				$('#week__track-list-mo').addClass('in');
			}, 150);
			$('.week__days-day').removeClass('week__days-day-active');
			$('.week__days-day').find('a[href="#week__track-list-mo"]').parent().addClass('week__days-day-active');
		} else {
			$('.week__track-list').removeClass('week__track-list-active').removeClass('in');
			$(hrefWeek).addClass('week__track-list-active');
			setTimeout(function() {
				$(hrefWeek).addClass('in');
			}, 150);
			$('.week__days-day').removeClass('week__days-day-active');
			$(weekDayNext).addClass('week__days-day-active');
		}
	});

	$('.week__button-left').on('click', function(e) {
		e.preventDefault();
		let hrefWeek = $('.week__days-day-active').prev().find('a').attr('href');
		let weekDayPrev = $('.week__days-day-active').prev();
		if (weekDayPrev.length == 0) {
			$('.week__track-list').removeClass('week__track-list-active').removeClass('in');
			$('#week__track-list-su').addClass('week__track-list-active');
			setTimeout(function() {
				$('#week__track-list-su').addClass('in');
			}, 150);
			$('.week__days-day').removeClass('week__days-day-active');
			$('.week__days-day').find('a[href="#week__track-list-su"]').parent().addClass('week__days-day-active');
		} else {
			$('.week__track-list').removeClass('week__track-list-active').removeClass('in');
			$(hrefWeek).addClass('week__track-list-active');
			setTimeout(function() {
				$(hrefWeek).addClass('in');
			}, 150);
			$('.week__days-day').removeClass('week__days-day-active');
			$(weekDayPrev).addClass('week__days-day-active');
		}
	});

	$('.video-second__pages-item a').on('click', function(e) {
		e.preventDefault();
		let hrefPage = $(this).attr('href');
		let page = $(this).parent();
		$('.video-second__list').removeClass('video-second__list-active').removeClass('in');
		$(hrefPage).addClass('video-second__list-active');
		setTimeout(function() {
			$(hrefPage).addClass('in');
		}, 150);
		$('.video-second__pages-item').removeClass('video-second__pages-item-active');
		$(page).addClass('video-second__pages-item-active');
	});

	$('.music-chart__play').on('click', function(e) {
		e.preventDefault();
		let hrefChart = $(this).attr('href');
		let track = $(this).parent();
		$('.music-chart__current-track').removeClass('music-chart__current-track-active').removeClass('in');
		$(hrefChart).addClass('music-chart__current-track-active');
		setTimeout(function() {
			$(hrefChart).addClass('in');
		}, 100);
		$('.music-chart__tracklist__item').removeClass('music-chart__tracklist__item-active');
		$(track).addClass('music-chart__tracklist__item-active');
	});

	$('.footer__sign-in-button').on('click', function(e) {
		e.preventDefault();
		$('.popup-container').fadeIn(100, disableScroll());
		$('.sign-in').css('display', 'block');
		$('body').css('overflow-y', 'hidden');
	});

	$('.footer__sign-up-button').on('click', function(e) {
		e.preventDefault();
		$('.popup-container').fadeIn(100, disableScroll());
		$('.sign-up').css('display', 'block');
		$('body').css('overflow-y', 'hidden');
	});

	$('.sign-in a').on('click', function(e) {
		e.preventDefault();
		$('.sign-in').fadeOut(100);
		$('#forgot-password').fadeIn(100);
	})

	$('.video-story__list-play').on('click', function(e) {
		e.preventDefault();
		$('.popup-container').fadeIn(100, disableScroll());
		$('.popup__video-story').css('display', 'block');
		$('.popup__video-story').find('.video-story__first__heading').text($(this).parent().find('.video-story__list__author').text());
		$('.popup__video-story').find('.video-story__first__description').text($(this).parent().find('.video-story__list__song').text());
		$('body').css('overflow-y', 'hidden');
		$(audio).trigger("pause");
		$(audio).parents().find('h4').removeClass('author-active');
		$(audio).parents('li').removeClass('item-active');
		isPlaying = false;
		audio = $(this).children()[0];
	});

	$('.popup-close').on('click', function(e) {
		e.preventDefault();
		$('.popup-container').fadeOut(100, enableScroll());
		$('.popup__video-story').css('display', 'none');
		$('.sign-in').css('display', 'none');
		$('.sign-up').css('display', 'none');
		$('#forgot-password').css('display', 'none');
		$('.popup__video-story').find('.video-story__first__heading').text("");
		$('.popup__video-story').find('.video-story__first__description').text("");
		$('body').css('overflow-y', 'auto');
		$(audio).trigger("pause");
		isPlaying = false;
	});

	document.querySelector('.popup__play').addEventListener("click", function(e) {
		e.preventDefault();
		if (isPlaying == false) {
			audio.play();
			isPlaying = true;
		} else {
			audio.pause();
			isPlaying = false;
		}
	});

	let playButtons = document.querySelectorAll('.play-button');

	for (let i = 0; i < playButtons.length; i++) {

	  	playButtons[i].addEventListener("click", function(e) {
			e.preventDefault();
			if (isPlaying == false) {
				audio = this.children[0];
				isPlaying = true;
				audio.play();
				this.parentNode.children[0].classList.add('author-active');
				this.parentNode.classList.add('item-active');
			} else if(this.children[0].src == audio.src) {
				audio.pause();
				isPlaying = false;
				this.parentNode.children[0].classList.remove('author-active');
				this.parentNode.classList.remove('item-active');
			} else if(this.children[0].src != audio.src) {
				audio.pause();
				audio.parentNode.parentNode.children[0].classList.remove('author-active');
				audio.parentNode.parentNode.classList.remove('item-active');
				audio = this.children[0];
				audio.play();
				isPlaying = true;
				this.parentNode.children[0].classList.add('author-active');
				this.parentNode.classList.add('item-active');
			}
		});

	}

	document.querySelector('.video-story__first-play').addEventListener("click", function(e) {
		e.preventDefault();
		if (isPlaying == false) {
			isPlaying = true;
			audio = this.children[0];
			audio.play();
		} else if(this.children[0].src == audio.src) {
			audio.pause();
			isPlaying = false;
		} else if(this.children[0].src != audio.src) {
			audio.pause();
			audio.parentNode.parentNode.children[0].classList.remove('author-active');
			audio.parentNode.parentNode.classList.remove('item-active');
			audio = this.children[0];
			audio.play();
			isPlaying = true;
		}
	});