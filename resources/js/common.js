$(document).ready(function(){
	$('#header').length && handleHeaderFix(); //헤더 고정
	$('.menu_wrap').length && setupMenuToggle(); //전체 메뉴
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