$(function () {
	// мой код
	// Перключаем грид на лист
	$('.shop-content__filter-btn').on('click', function () {
		$('.shop-content__filter-btn').removeClass('shop-content__filter-btn--active');
		$(this).addClass('shop-content__filter-btn--active');
	});

	$('.button-list').on('click', function () {
		$('.product-item').addClass('product-item--list');
	});

	$('.button-grid').on('click', function () {
		$('.product-item').removeClass('product-item--list');
	});
	// табы в продукте
	$('.product-single-tabs__top-item').on('click', function (e) {
		e.preventDefault();
		$('.product-single-tabs__top-item').removeClass('product-single-tabs__top-item--active');
		$(this).addClass('product-single-tabs__top-item--active');
		$('.product-single-tabs__content-item').removeClass('product-single-tabs__content-item--active');
		$($(this).attr('href')).addClass('product-single-tabs__content-item--active');
	});
	// мой код всё

	// Рэнж-слайдер
	$(".filter-price__input").ionRangeSlider({
		hide_min_max: "true",
		hide_from_to: 'true',
		onStart: function (data) {
			$('.filter-price__from').text(data.from);
			$('.filter-price__to').text(data.to);
		},
		onChange: function (data) {
			$('.filter-price__from').text(data.from);
			$('.filter-price__to').text(data.to);
		}
	});
	// Рэнж-слайдер всё

	// ЖиКвери Форм Стайлер
	$('.select-style, .product-single-item__num').styler();
	// ЖиКвери Форм Стайлер всё

	// Слайдеры, слик
	$('.top-slider__inner').slick({
		dots: true,
		arrows: false,
		fade: true,
		autoplay: true,
		autoplaySpeed: 2000
	})
	$('.product-single-slide__small').slick({
		asNavFor: '.product-single-slide__big',
		focusOnSelect: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		vertical: true,
		draggable: false
	});
	$('.product-single-slide__big').slick({
		asNavFor: '.product-single-slide__small',
		slidesToShow: 1,
		draggable: false,
		arrows: false,
		fade: true
	});
	// Слайдер всё

	// Рейтинг
	$(".star").rateYo({
		starWidth: "17px",
		normalFill: '#ccccce',
		ratedFill: "#ffc35b",
		readOnly: true
	});

	$(".product-single-item__rate-star").rateYo({
		starWidth: "16px",
		normalFill: '#ccccce',
		ratedFill: "#ffc35b",
		readOnly: true
	});

	$(".reviews__star").rateYo({
		starWidth: "18px",
		spacing: "2px",
		normalFill: '#ccccce',
		ratedFill: "#ffc35b",
		readOnly: true
	});
	// Рейтинг всё

	// Часы, таймер
	function getTimeRemaining(endtime) {
		const total = Date.parse(endtime) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		const days = Math.floor(total / (1000 * 60 * 60 * 24));

		return {
			total,
			days,
			hours,
			minutes,
			seconds
		};
	}

	function initializeClock(id, endtime) {
		const clock = document.querySelector('.promo__clock');
		const daysSpan = clock.querySelector('.days');
		const hoursSpan = clock.querySelector('.hours');
		const minutesSpan = clock.querySelector('.minutes');
		const secondsSpan = clock.querySelector('.seconds');

		function updateClock() {
			const t = getTimeRemaining(endtime);

			daysSpan.innerHTML = t.days;
			hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
			minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
			secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

			if (t.total <= 0) {
				clearInterval(timeinterval);
			}
		}

		updateClock();
		const timeinterval = setInterval(updateClock, 1000);
	}

	const deadline = $('.promo__clock').attr('data-time');
	initializeClock('promo__clock', deadline);
	// Часы, таймер всё

});
