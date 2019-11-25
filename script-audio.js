	let audio = new Audio();
	let isPlaying = false;

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