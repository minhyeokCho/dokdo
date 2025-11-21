$(document).ready(function(){
	$('#header').length && handleHeaderFix(); //헤더 고정
	$('.menu_wrap').length && setupMenuToggle(); //전체 메뉴
	$('.tooltip').length && setupTooltips(); //툴팁
	$('.history_slide').length && historySlide(); //이미지 슬라이드
	$('.img_slide_type02').length && imgSlideType02(); //이미지 슬라이드
	$('.img_pop_slide').length && imgPopSlide(); //이미지 슬라이드
	$(window).scroll(function() {
		handleHeaderFix();
	});
});

function handleHeaderFix() {
	const header = $('#header');
	if ($(window).scrollTop() > 0) {
		header.addClass('fixed');
	} else {
		header.removeClass('fixed');
	}
}

function setupMenuToggle() {
	$('.h_btn.btn_menu').on('click', function(e) {
		e.preventDefault()
		$('.menu_wrap').fadeIn();
		$('body').css('overflow', 'hidden')
	});

	$('.menu_wrap .menu_close').on('click', function() {
		$('.menu_wrap').fadeOut();
		$('body').css('overflow', '')
	});
}

function setupTooltips() {
	const desktopBreakpoint = 768; // 데스크톱/모바일 분기점

	function closeAndResetTooltip($tooltip) {
		$tooltip.fadeOut(function() {
			if ($tooltip.data('original-parent')) {
				$tooltip.appendTo($tooltip.data('original-parent'));
				$tooltip.removeData('original-parent');
				$tooltip.css({
					top: '',
					left: '',
					width: '',
					position: '',
					transform: '',
					right: '',	
					bottom: ''	
				});
			}
		});
	}

	$('.link a').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation(); 
		const $clickedLink = $(this);
		const $parentLink = $clickedLink.parent('.link');
		const $tooltip = $parentLink.find('.tooltip');

		$('.link .tooltip').not($tooltip).each(function() {
			closeAndResetTooltip($(this));
		});

		if ($tooltip.is(':visible')) {
			closeAndResetTooltip($tooltip);
			return; 
		}

		$tooltip.fadeIn();

		const windowWidth = $(window).width();

		if (windowWidth > desktopBreakpoint) {
			const tooltipWidth = $tooltip.outerWidth();
			const linkOffsetLeft = $parentLink.offset().left;
			const linkWidth = $parentLink.outerWidth();
			const viewportMargin = 10;

			$tooltip.css({
				left: '',
				right: '',
				transform: '',
				top: '',
				position: '',
				bottom: ''
			});

			const expectedLeft = linkOffsetLeft + (linkWidth / 2) - (tooltipWidth / 2);

			if (expectedLeft < viewportMargin) {
				$tooltip.css({
					left: 0,
					transform: 'none'
				});
			} else if ((expectedLeft + tooltipWidth) > (windowWidth - viewportMargin)) {
				$tooltip.css({
					right: 0,
					left: 'auto',
					transform: 'none'
				});
			} else {
			}

			if ($tooltip.data('original-parent')) {
				$tooltip.appendTo($tooltip.data('original-parent'));
				$tooltip.removeData('original-parent');
			}
		}
		else {
			if (!$tooltip.data('original-parent')) {
				$tooltip.data('original-parent', $parentLink);
			}
			$tooltip.appendTo('body');

			const linkOffsetTop = $parentLink.offset().top;
			const tooltipHeight = $tooltip.outerHeight();
			const bottomMargin = 10;

			$tooltip.css({
				position: 'absolute',
				top: (linkOffsetTop - tooltipHeight - bottomMargin) + 'px', 
				left: '10px',
				width: 'calc(100% - 20px)',
				transform: 'none',
				right: 'auto',
				bottom: 'auto'
			});
		}
	});

	$('.link .tooltip .tooltip_close').on('click', function(e) {
		e.stopPropagation(); 
		closeAndResetTooltip($(this).closest('.tooltip'));
	});

	$(document).on('click', function(e) {
		if (!$(e.target).closest('.link .tooltip').length &&
			!$(e.target).closest('.link a').length) {
			$('.link .tooltip:visible').each(function() {
				closeAndResetTooltip($(this));
			});
		}
	});

	$(window).on('resize', function() {
		$('.desc .link .tooltip:visible').each(function() {
			closeAndResetTooltip($(this));
		});
	});
}

function historySlide() {
	var swiper = new Swiper(".history_slide", {
		spaceBetween: 18,
		slidesPerView : 'auto',
		loop:true,
		pagination: {
			el: ".history_slide .pro",
			type: 'progressbar'
		},
	});
}

function imgPopSlide () {
	let imgPopSwiper;

	$('.js_img_pop').on('click', function(e) {
		e.preventDefault();

		const $imgPop = $('.img_pop');

		$imgPop.fadeIn(300, function() {
			if (!imgPopSwiper) {
				imgPopSwiper = new Swiper(".img_pop_slide", {
					spaceBetween: 0,
					slidesPerView : '1',
					observer: true,
					observeParents: true,
					navigation: {
						nextEl: ".img_pop .btn_slide_next",
						prevEl: ".img_pop .btn_slide_prev",
					},
				});
			} else {
				imgPopSwiper.update();
			}
			$('body').css('overflow', 'hidden'); 
		});
	});

	$('.img_pop .pop_close').on('click', function() {
		const $imgPop = $('.img_pop');

		$imgPop.fadeOut(300, function() { 
			$('body').css('overflow', 'auto'); 
		});
	});
	$('.img_pop').on('click', function(e) {
		if ($(e.target).is($(this))) {
			$(this).fadeOut(300, function() {
				$('body').css('overflow', 'auto');
			});
		}
	});
}

function imgSlideType02() {
	var swiper = new Swiper(".img_slide_type02", {
		spaceBetween: 0,
		slidesPerView : '1',
		loop:true,
		navigation: {
			nextEl: ".img_slide_wrap .btn_slide_next",
			prevEl: ".img_slide_wrap .btn_slide_prev",
		},
		pagination: {
			el: ".swiper_bullet",
			type : 'bullets',
			clickable: true,
		
			renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + "</span>";
			},
		},
	});
}

$(function (){
	var bannerSwiper = new Swiper('.bannerSwiper', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		autoHeight: true,
		//effect : 'fade',
		navigation: {
			prevEl: ".swiper_indicator .swiper-button-prev",
			nextEl: ".swiper_indicator .swiper-button-next"
			/*nextEl: ".bannerSwiper .swiper-button-next",
			prevEl: ".bannerSwiper .swiper-button-prev",*/
		},
		paginationClickable: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		breakpoints: {
			1199: {
			  slidesPerView: 2,
			  spaceBetween: 5,
			},
		},	
	});

	$(".banner_area .swiper-button-pause").on('click',function(){
		bannerSwiper.autoplay.stop();
	});

	$(".banner_area .swiper-button-play").on('click',function(){
		bannerSwiper.autoplay.start();
	});

	// 푸터 배너 인디게이터
	$('.ind_middle > button').on('click',function(){
		$(this).toggleClass(isOpen);
		$(this).siblings().toggleClass(isOpen);
	});

	// 셀렉트박스 radio 커스텀 --------------------------------
	var selectToggle = function(target){ // target은 select_wrap
		
		if(!target.hasClass('is_open')){
			$('.select_wrap').removeClass('is_open');
			$('.select_wrap .option').stop().fadeOut(100);
			target.addClass('is_open');
			target.find('.sel_option').stop().fadeIn(100);
		} else{
			target.removeClass('is_open');
			target.find('.sel_option').stop().fadeOut(100);
			target.find('a').focus();
		}
	}

	//language
	$('.select_wrap a').on('click', function(e){
		selectToggle($(this).parents('.select_wrap'));
	})
	$('.select_wrap.pc_lang').on('mouseleave',function(){
		$(this).removeClass('is_open')
		$('.select_wrap.pc_lang .sel_option').stop().hide();
	});

	$('.select_wrap').find('li:last-child() a').on('focusout',function(){
		$(this).closest('.select_wrap').removeClass(isOpen);
	})

	//selectbox 텍스트 변환(퍼블용)
	/* $('.select_wrap .sel_option a').on('click',  function(){
		var rel = $(this).text()
		//console.log(rel);
		$(this).parents('.select_wrap.sel_ty01').find('.btn_sel').text(rel);
	}); */

	// 선택 영역 외 클릭 시 이벤트 -------------------------------------------
	$('body').on('click', function(e){

		// 셀렉트 외 선택 시 셀렉트 옵션 닫힘
		if(!$('.select_wrap').has(e.target).length){
			$('.select_wrap').removeClass('is_open');
			$('.select_wrap').find('.is_open').hide();
		}

	});
})