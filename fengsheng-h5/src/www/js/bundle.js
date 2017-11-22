$('document').ready(function(){
    bundle.init();   
    $('#file').on('change',bundle.readPhoto);
    //播放音乐
    /*var audio = document.getElementById("audios");
    audio.addEventListener("canplaythrough",
        function() {
            audio.play();
            $('.music-icon').addClass('active');
        },
    false);
    $('.control').on('click',function(){
        if(audio.paused){
            audio.play();
            $(this).find('.music-icon').addClass('active');
        }else{
            audio.pause();
            $(this).find('.music-icon').removeClass('active');
        }
    });
     */
});

var bundle = {
    dpr: $('html').data('dpr'),
    scaleH: $(window).height()/1424,
    scaleW: $(window).width()/800,
    viewWidth: $(window).width(),
    viewHeight: $(window).height(), // 获取可视视图高度
    init: function() {
        // 设置swiper-container 的高度
        this.setContainerHeight();
        this.resetWidthAndHeight();
        // 重置元素的高度
        this.resetSize();
        // 重置元素的宽度
        this.resetWidth();
        // 重置元素的top
        this.resetTop();
        // 重置元素的left
        this.resetLeft();
        // 重置元素的right
        this.resetRight();
        // 重置元素的margin-top
        this.resetMarginTop();
        // 重置元素的margin-left
        this.resetMarginLeft();
        // 修复iphone5下.box3中文字列表溢出
        this.fixIphone5();
        // 预加载图片
        this.preloadImage();
    },
    setContainerHeight: function(){ // 设置swiper容器的高度
        var actualHeight = this.dpr === 1 ? this.viewHeight + 'px'  : this.viewHeight /75 + 'rem';
        $('.swiper-container').css({ 
            height: $(window).height()
        });
    },
    initSwiper:function(){ //实例化swiper
        var mySwiper = new Swiper('.swiper-container', {
            // effect : 'cube',
            direction: 'vertical', //垂直滚动
            pagination : '.swiper-pagination', //分页器
            hashnav:true,
            height: $(window).height(),
            // height: '100%'
            onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
                swiperAnimateCache(swiper); //隐藏动画元素 
                swiperAnimate(swiper); //初始化完成开始动画
            }, 
            onSlideChangeEnd: function(swiper){
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            },
            // cube: {
            //     slideShadows: false,
            //     shadow: false
            // },
            longSwipesMs : 1000,
            watchSlidesProgress: true,
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
            }
        })
    },
    resetTop:function(){    //重置所有resetTop元素
        var scaleH = this.scaleH;
        $('.reset-top').each(function(index,item){
            var originTop = parseInt($(item).css('top')); //获取元素原来的实际top
            $(item).css({
                top: scaleH*originTop
            });
        });
    },
    resetLeft: function(){
        var scaleW = this.scaleW;
        $('.reset-left').each(function(index,item){
            var originLeft = parseInt($(item).css('left')); //获取元素原来的实际top
            $(item).css({
                left: scaleW*originLeft
            });
        });
    },
    resetRight: function() {
        var scaleH = this.scaleH;
        $('.reset-right').each(function(index,item){
            var originRight = parseInt($(item).css('right')); //获取元素原来的实际top
            $(item).css({
                right: scaleH*originRight
            });
        });
    },
    resetSize:function(){
        var scaleH = this.scaleH;
        var scaleW = this.scaleW;
        $('.reset-size').each(function(index,item){
            var originHeight = parseInt($(item).css('height')); //获取元素原来的实际高度
            $(item).css({
                height: scaleH*originHeight
            });
        });
    },
    resetWidth: function(){
        var scaleW = this.scaleW;
        $('.reset-width').each(function(index,item){
            var originWidth = parseInt($(item).css('width')); //获取元素原来的实际宽度
            if($(item).hasClass('inner') && $(window).width() > 750){
                $(item).css({
                    width: (554/750)*originWidth
                });
            }else{
                $(item).css({
                    width: scaleW*originWidth
                });
            }
        });
    },
    resetWidthAndHeight: function(){
        var scaleW = this.scaleW;
        var scaleH = this.scaleH;
        $('.reset-width-height').each(function(index,item){
            var originHeight = parseInt($(item).css('height')); //获取元素原来的实际高度
            var originWidth = parseInt($(item).css('width')); //获取元素原来的实际宽度
            $(item).css({
                height: scaleH*originHeight,
                width: scaleW*originWidth
            });
        });
    },
    resetMarginTop:function(){
        var scaleH = this.scaleH;
        $('.reset-margin-top').each(function(index,item){
            var originMarginTop = parseInt($(item).css('margin-top')); //获取元素原来的实际margin-top
            $(item).css({
                marginTop: scaleH*originMarginTop
            });
        });
    },
    resetMarginLeft:function() {
        var scaleH = this.scaleH;
        $('.reset-margin-left').each(function(index,item){
            var originMarginLeft = parseInt($(item).css('margin-left')); //获取元素原来的实际margin-left
            $(item).css({
                marginLeft: scaleH*originMarginLeft
            });
        });
    },
    fixIphone5: function() {
        if( ( $(window).width() === 640 && this.dpr === 2 ) || ( $(window).width() === 320 && this.dpr === 1) ) {
            $('.box3 ul').css({
                marginTop: '0.41333rem'
            });
        }
        if($(window).width() === 640 && this.dpr === 2){
            $('.box3 .title').css({
                fontSize: 30
            });
            $('.box3 li').css({
                fontSize: 22
            });
        }
    },
    preloadImage: function() { // 预加载图片
        var imgList = [];
        var pattern = /http:\/\/(\w|\W){1,}\.(png|gif|jpg)/g;
        $('.preload').each(function(item,index){
            var str = $(index).css('background-image');
            imgList.push(str.match(pattern)[0]);
        });
        $('img').each(function(index,item){
            imgList.push(item.src);
        });
        var totalCount = imgList.length;
        var count = 0;
        // bind event
        var loadedAllImg = this.loadedAllImg.bind(this);
        var loadImgProgress = this.loadImgProgress.bind(this);
        $.each(imgList,function(index,item){
            // 创建一个img对象
            var img = new Image();
            img.src = item;
            if(!img.complete){
                img.onload = function(){
                    ++count;
                    loadImgProgress(count,totalCount);
                    if(totalCount == count) {
                        loadedAllImg();
                    }
                }
            }else{
                ++count;
                loadImgProgress(count,totalCount);
                if(totalCount == count) {
                    loadedAllImg();
                }
            }
        });
    },
    loadImgProgress: function(currentNum,totalNum) { //更改进度条
        $('.loading-wrapper .number').text(Math.floor(currentNum/totalNum*100)+'%');
    },
    loadedAllImg: function(){ //图片加载全部后的完成事件
        this.loadImgProgress(1,1);
        setTimeout(function(){
            $('.loading-wrapper').css({
                display: 'none'
            });
            $('.wrapper').css({
                display: 'block'
            });
            $('.box3 ul').css({
                width: $('.box3 .title').width()
            });
            if(this.viewWidth === 640 && this.dpr === 2){
                $('.box3 ul').css({
                    top: 120
                });
                $('.box3 li').css({
                    marginTop: 20
                });
            }
            // 初始化swiper
            this.initSwiper();
        }.bind(this),200);
    },
    readPhoto: function() {
        if(typeof FileReader == 'undefined'){
            alert('你的浏览器不支持h5拍照上传功能！');
        }else{
            var reader = new FileReader();
            var compress = bundle.compress.bind(this);
            reader.onload = function (e) {
                $('.loadingToast p').text('压缩图片中...');
                compress(this.result);
            };
            reader.onloadstart = function(){
                // console.log('开始读取!');
            }
            reader.onerror = function(){
                bundle.closeToast();
                alert('读取图片出错了');
            }
            reader.onprogress = function(){
                // console.log('正在读取!');
                bundle.openToast('正在读取...');
            }
            if(!/image\/\w+/.test(this.files[0].type)){
                alert('只能上传图片！');
            }else{
                bundle.openToast('开始读取图片...');
                reader.readAsDataURL(this.files[0]);
            }
        }
    },
    compress: function(res) {
        var img = new Image(),
        maxH = 400;

        img.onload = function () {
            var cvs = document.createElement('canvas'),
                ctx = cvs.getContext('2d');

            if(img.height > maxH) {
                img.width *= maxH / img.height;
                img.height = maxH;
            }

            cvs.width = img.width;
            cvs.height = img.height;

            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);

            var dataUrl = cvs.toDataURL('image/jpeg', 0.7);
            $.ajax({
                url: '/vita/m/activity/card.html',
                type: 'POST',
                data: {data:JSON.stringify({card:dataUrl,company:'',contact:'',designation:'',tel:''})},
                beforeSend:function(){
                    $('.loadingToast p').text('上传图片中...');
                },
                success:function(data){
                    $('.loadingToast p').text('上传名片成功！');
                    setTimeout(function(){
                        bundle.closeToast();
                    },200);
                },
                error: function(xhr){
                    $('.loadingToast p').text('上传名片失败！');
                    setTimeout(function(){
                        bundle.closeToast();
                    },200);
                }
            });
        }
        img.src = res;
    },
    openDialog:function(text){
        // var dialogTemplate = '<div class="dialog"><div class="dialog_bd">'+text+'</div><div class="dialog_ft"><a class="dialog_btn" href="javascript:;" onclick="bundle.closeDialog()">知道了</a></div></div>';
        // $('.dialog-container').append(dialogTemplate);
        $('.dialog-container').css({
            opacity: 1
        });
        $('.dialog').css({
            width: 600/75 +'rem'
        });
        $('.dialog_bd').text(text);
        $('.dialog').addClass('active');
    },  
    closeDialog:function() {
        $('.dialog-container').css({
            opacity: 0
        });
        $('.dialog').css({
            width: 0
        });
        $('.dialog').removeClass('active');
    },
    openToast: function(text) {
        $('.loadingToast').css({
            opacity: 1
        });
        $('.loadingToast p').text(text);
    },
    closeToast: function() {
        $('.loadingToast').css({
            opacity: 0
        });
    }
}
