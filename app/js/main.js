$(function () {
	// Слайдер
	$('.top-slider__inner').slick({
		dots: true,
		arrows: false,
		fade: true,
		autoplay: true,
		autoplaySpeed: 2000
	})

	// Рейтинг
	$(".star").rateYo({
		starWidth: "17px",
		normalFill: '#ccccce',
		ratedFill: "#ffc35b",
		readOnly: true
	});
});
