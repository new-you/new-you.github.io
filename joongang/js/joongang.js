document.addEventListener('DOMContentLoaded', function() {
    JOONGANGJS();
});

var JOONGANGJS = (function(){

    var structure = {
        navBtn : $('.btn_navi'),
        navArea : $('.navi_area'),
        navList : $('.navi_list'),

        section : $('section'),
        topArea : $('.top_area'),
        imgArea : $('.img_area'),
        imgDimd : $('.dimd_bg'),
        fixedText : $('.centerFix'),
        imgBox_before : $('.before'),
        imgBox_after : $('.after'),

        vodArea : $('.vod_container'),
        toggleBtn : $('.btn_open'),
        textArea : $('.inner_wrap'),
        text_box : $('.box_area'),
        table : $('.table_type'),
    };

    var classList = {
        dimdBK : 'dimd_black',
        active : 'active',
        open : 'open',
        on : 'on',
    };

    var setElement = function() {
        $navBtn = $(structure.navBtn);
        $navArea = $(structure.navArea);
        $navList = $(structure.navList);

        $topArea = $(structure.topArea);
        $imgArea = $topArea.find(structure.imgArea);
        $imgDimd = $topArea.find(structure.imgDimd);
        $fixedText = $topArea.find(structure.fixedText);
        $imgBox_before = $topArea.find(structure.imgBox_before);
        $imgBox_after = $topArea.find(structure.imgBox_after);

        $section = $(structure.section);
        $vodArea = $(structure.vodArea);
        $toggleBtn = $(structure.toggleBtn);
        $textArea = $section.find(structure.textArea);
        $text_box = $section.find(structure.text_box);
        $table = $(structure.table);
    };

    // 스크롤 계산을 위한 기본 계산식
    var setViewControl = function(){
        browserHeight = $(window).height();
        currentScroll = $(document).scrollTop();
        boxPosition = $(window).scrollTop() / 3;
    };

    var bindEvent = function() {
        $(window).on("scroll", setViewControl);
        $(window).on("scroll", eventList._imageScrollHandler);
        $(window).on("scroll", eventList._textScrollHandler);
        $(window).on("scroll", eventList._vodScrollHandler);
        $(window).on("scroll", eventList._tableScrollHandler);
        $navBtn.on("click", eventList._navClickHandler);
        $toggleBtn.on("click", eventList._toggleClickHandler);
    };

    var eventList = {
        
        _navClickHandler : function(){
            $navArea.toggleClass(classList.open);
            $navBtn.toggleClass(classList.on);

            var navList = $navList.find('h6').parent();
            if ($navArea.hasClass(classList.open) == true) {
                for (var i = 0; i < navList.length; i++){
                    var timeSetting = i * 0.2;
                    navList.eq(i).addClass(classList.active).css("transition-delay", timeSetting+'s')
                }
            } else if ($navArea.hasClass(classList.open) == false) {
                navList.removeClass(classList.active);
            }
        },
        
        _imageScrollHandler : function(){
            var imgTop = $imgArea.offset().top,
                imgBottom = $imgArea.offset().top + $imgArea.height();
            if (imgTop-(browserHeight/2) <= currentScroll && imgBottom >= currentScroll) {
                $fixedText.addClass(classList.active).css("opacity", $(window).scrollTop() / 500),
                $imgDimd.css("opacity", 2-$(window).scrollTop() / 700),
                $imgBox_before.css('left', '-'+boxPosition+'px'),
                $imgBox_after.css('right', '-'+boxPosition+'px');
            } else {
                $fixedText.removeClass(classList.active)
            }
        },
        
        _vodScrollHandler : function(){
            var vodArea = $vodArea.parent().offset().top,
                vodAreaTop = vodArea - $vodArea.height()/2,  //padding 추가
                vodAreaBottom = vodArea + $vodArea.height();  //padding 추가
            if (vodAreaTop <= currentScroll && vodAreaBottom - browserHeight/2 >= currentScroll) {
                $('html').addClass(classList.dimdBK);
                $vodArea.find('.autoPlay')[0].play();
                $vodArea.find('.autoPlay')[0].muted = false;
            } else {
                $('html').removeClass(classList.dimdBK);
                $vodArea.find('.autoPlay')[0].pause();
                $vodArea.find('.autoPlay')[0].muted = true;
                $('.stack').find('video')[0].pause();
            };
        },
        _toggleClickHandler : function(){
            $toggleBtn.parent().toggleClass(classList.open);
            // if ($toggleBtn.parent().hasClass(classList.open)) {
            //     $toggleBtn.parent().removeClass(classList.open);
            // } else {
            //     $toggleBtn.parent().addClass(classList.open);
            // }
        },
        
        _textScrollHandler : function(){
            for (var i = 0; i < $textArea.length; i++) {
                var textTarget = $textArea.eq(i),
                    textTop = textTarget.offset().top - browserHeight,
                    textBottom = textTarget.offset().top + textTarget.height();

                var boxTop = $text_box.offset().top,
                    boxBottom = $text_box.height();

                if (textTop <= currentScroll && textBottom >= currentScroll){
                    var pTagTarget = $textArea.eq(i).children()
                    for  (var j = 0; j < pTagTarget.length; j++) {
                        var timeSetting = j * 0.2;
                        pTagTarget.eq(j).addClass(classList.active).css("transition-delay", timeSetting+'s')
                    }
                } else if (boxTop - browserHeight <= currentScroll && boxTop + boxBottom >= currentScroll) {
                    $text_box.addClass(classList.active)
                }
                else {
                    $textArea.eq(i).find('p').removeClass(classList.active),
                    $text_box.removeClass(classList.active)
                }
            }
        },
        _tableScrollHandler : function(){
            var tableList = $table.find('tbody').children(),
                tableTop = $table.offset().top - browserHeight,
                tableBottom = $table.offset().top + $table.height();
                for (var i = 0; i < tableList.length; i++) {
                    if (tableTop <= currentScroll && tableBottom >= currentScroll){
                        tableList.eq(i).css("animation-delay", i*0.2 + 's'),
                        tableList.eq(i).addClass(classList.active)
                    } else {
                        tableList.eq(i).css("animation-delay", 0+'s'),
                        tableList.eq(i).removeClass(classList.active)
                    }
                }
        },
    };
    var init = function() {
        setElement();
        setViewControl();
        eventList._imageScrollHandler();
        eventList._textScrollHandler();
        eventList._tableScrollHandler();
        bindEvent();
    }
    init()
});