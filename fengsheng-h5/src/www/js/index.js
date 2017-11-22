/**
 * Created by zzy on 2017/3/14.
 */
//图片加载完成后在设置left的值
function setLeft(obj){
    $(obj).css({
        marginLeft: ($(window).width() - $(obj).width()) / 2 + 'px'
    });
}

$(document).ready(function(){


    //播放音乐
    var audio = document.getElementById("audios");
    audio.addEventListener("canplaythrough",
        function() {
            audio.play();
            $('.music').addClass('music-play');
        },
        false);
    $('.music').on('click',function(){
        if(audio.paused){
            audio.play();
            $(this).addClass('music-play');
        }else{
            audio.pause();
            $(this).removeClass('music-play');
        }
    });
    //注册事件
    $('#signin-button').on('click',function(){
        signin();
    });

    var images = [],
        count = 0;
    $('html body').find('img').each(function(i){
        images[i] = $(this).attr('src');
    });
    for(var i=0;i<images.length;i++){
        var image = new Image();
        image.src = images[i];
        image.onload = function(){
            count++;
            var per = Math.floor(count / images.length * 100);
            $('.loadInner .text').children('span.progress').text(per+'%');
                if(count == images.length){
                    $('.loading').css({
                        display: 'none'
                    });
                    swiper();
                }
        }
    }
    //获取屏幕高度
    var screenHeight = $(window).height();
    //获取屏幕宽度
    var screenWidth = $(window).width();
    //获取比例
    var scale = screenHeight / 1280;
    var scaleW = screenWidth / 720;
    // img width: 191 height: 221 margin 20px margin-top 33px
    var left = 191 * scaleW + scaleW * 20;
    var top = 221 * scale + scale * 33;
    function setBox3() {
        $('.box3 div:nth-child(3)').find('img').each(function(i){
            $(this).data('index',i);
            switch(i){
                case 0:
                    $(this).css({
                        top: 0,
                        left: 0
                    });
                    break;
                case 1:
                    $(this).css({
                        top: 0,
                        left: left+ 'px'
                    });
                    break;
                case 2:
                    $(this).css({
                        top: 0,
                        left: 2*left+ 'px'
                    });
                    break;
                case 3:
                    $(this).css({
                        top: top + 'px',
                        left: 0
                    });
                    break;
                case 4:
                    $(this).css({
                        top: top + 'px',
                        left: left + 'px'
                    });
                    break;
                case 5:
                    $(this).css({
                        top: top + 'px',
                        left: 2 * left + 'px'
                    });
                    break;
            }
        });
    }
    function resize() {
        //设置right的值
        $('.reset-right').each(function(index,item){
            $(item).css({
                right: parseInt($(item).css('right'))*scale + 'px'
            });
        });

        //设置left的值
        $('.reset-left').each(function(index,item){
            $(item).css({
                left: parseInt($(item).css('left'))*scale + 'px'
            });
        });

        $('.reset-top').each(function(index,item){
            $(item).css({
                top: $(item).offset().top * scale + 'px',
            });
        });

        //设置图片高度
        $('.resize').each(function(index,item){
            $(item).css({
                height: $(item).height()*scale+'px',
            });
        });

        //设置宽度
        $('.resize-width').each(function(index,item){
            $(item).css({
                width: parseInt($(item).css('width'))*scale + 'px'
            });
        });

        //.box3
        $('.box3 div:nth-child(3)').css({
            left: (screenWidth -3*scaleW*185 - 2 * scaleW * 20)/2 + 'px'
        });

        setBox3();
        //.box4
        $('.box4 div:nth-child(3)').find('img').each(function(i){
            if(i === 1 || i === 3 || i === 5 || i === 7){
                $(this).css({
                    marginLeft: parseInt($(this).css('margin-left'))*scale + 'px'
                });
            }
            $(this).css({
                marginBottom: parseInt($(this).css('margin-bottom'))*scale + 'px'
            });
        });

        //.box6
        // $('.box6 input').each(function(i){
        //     $(this).css({
        //         marginLeft: parseInt($(this).css('margin-left'))*scale + 'px',
        //     });
        // });
        $('.box6 li').each(function(i){
            $(this).css({
                marginBottom: parseInt($(this).css('margin-bottom'))*scale + 'px',
            });
        });
        //
        // if($(window).width() < 340){
        //     $('.box6 ul').css({
        //         top: '130px'
        //     });
        //     $('.box6 div:nth-child(3)').css({
        //         top: '450px'
        //     });
        // }

        // $('.box6 ul').each(function(i){
        //     $(this).css({
        //         left: ($(window).width() - $(this).width()) / 2 + 'px'
        //     });
        // });
    }
    // setinterval
    var loop;
    function swiper() {
        //swiper
        function fixPagesHeight() {
            $('.swiper-slide,.swiper-container').css({
                height: screenHeight,
            })
        }
        $(window).on('resize', function() {
            fixPagesHeight();
        });
        fixPagesHeight();
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            // mousewheelControl: true,
            watchSlidesProgress: true,
            pagination : '.swiper-pagination',
            paginationType : 'custom', //自定义特殊类型分页器
            paginationCustomRender: function (swiper, current, total) {
                $('.swiper-pagination-custom .page-index').text(current);
                $('.swiper-pagination-custom .page-total').text(total);
                $('.swiper-pagination-custom .progress-bar').css({
                    width: Math.floor(current/total*100) + '%'
                });
            },
            onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
                swiper.myactive = 0;
                swiperAnimateCache(swiper); //隐藏动画元素
                swiperAnimate(swiper); //初始化完成开始动画
            },
            onSlideChangeEnd: function(swiper){
                //第三页进行动画
                if(swiper.activeIndex === 2){
                    loop = setInterval(function(){
                        animate();
                    },1500);
                }else{
                    if(loop){
                        clearInterval(loop);
                        setBox3();
                    }
                }
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            },
            
            onProgress: function(swiper) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides[i];
                    var progress = slide.progress;
                    var translate, boxShadow;
                    translate = progress * swiper.height * 0.8;
                    scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
                    boxShadowOpacity = 0;
                    slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';
                    if (i == swiper.myactive) {
                        es = slide.style;
                        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
                        es.zIndex=0;
                    }else{
                        es = slide.style;
                        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform ='';
                        es.zIndex=1;
                    }
                }
            },
            onTransitionEnd: function(swiper, speed) {
                swiper.myactive = swiper.activeIndex;
            },
            onSetTransition: function(swiper, speed) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    es = swiper.slides[i].style;
                    es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
                }
            },
        });
    }
    //设置箭头的bottom
    $('.arrow').css({
        bottom: 55*scale + 'px'
    });
    resize();
    function animate() {
        $('.box3 div:nth-child(3)').find('img').each(function(i){
            switch($(this).data('index')) {
                case 0:
                    $(this).animate({
                        left: left
                    },2000);
                    $(this).data('index',1);
                    break;
                case 1:
                    $(this).animate({
                        left: 2*left
                    },2000)
                    $(this).data('index',2);
                    break;
                case 2:
                    $(this).animate({
                        top: top
                    },2000);
                    $(this).data('index',5);
                    break;
                case 3:
                    $(this).animate({
                        top: 0
                    },2000);
                    $(this).data('index',0);
                    break;
                case 4:
                    $(this).animate({
                        left: 0
                    },2000);
                    $(this).data('index',3);
                    break;
                case 5:
                    $(this).animate({
                        left: left
                    },2000);
                    $(this).data('index',4);
                    break;
            }
        });
    }
});

