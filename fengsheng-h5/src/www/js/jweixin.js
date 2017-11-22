function abc() {
    $.ajax({
        url: 'http://www.51jrq.com/weixin/token',
        data: {
            location: window.location.href
        },
        success: function(data){
            var d = eval("("+data+")");
            d.jsApiList = ['onMenuShareTimeline',
                'onMenuShareAppMessage',
                'getNetworkType',
                'startRecord',
                'stopRecord',
                'uploadVoice',
                'playVoice',
                'downloadVoice',
                'onVoicePlayEnd',
                'onVoiceRecordEnd'];
            wx.config(d);
        },
        error: function(xhr, type){
            // alert(xhr);
        }
    });
};
abc();
wx.ready(function () {
    //修复在iphone平台上微信上音乐不能自动播放
    document.getElementById('audios').play();
    wx.checkJsApi({
        jsApiList: [
            'getNetworkType',
            'previewImage'
        ],
        success: function (res) {
        }
    });
    wx.onMenuShareAppMessage({
        title: '梦想起航，无限未来',
        desc:  '丰圣财富资产管理有限公司（以下简称丰圣财富）创始于2014年初，注册资金5000万元。丰圣财富专注于为高净值人群提供优秀的综合性理财服务。',
        link:  'http://www.51jrq.com/wx/fsh5/index.html',
        imgUrl: 'http://www.51jrq.com/wx/fsh5/images/page2/banner.jpg',
        trigger: function (res) {
        },
        success: function (res) {
        },
        cancel: function (res) {
        },
        fail: function (res) {
        }
    });
    wx.onMenuShareTimeline({
        title: '梦想起航，无限未来',
        link:  'http://www.51jrq.com/wx/fsh5/index.html',
        imgUrl: 'http://www.51jrq.com/wx/fsh5/images/page2/banner.jpg',
        trigger: function (res) {
        },
        success: function (res) {
        },
        cancel: function (res) {
        },
        fail: function (res) {
        }
    });

});
wx.error(function (res) {
    alert(res.errMsg);
});