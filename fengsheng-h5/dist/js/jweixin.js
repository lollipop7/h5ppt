function abc(){$.ajax({url:"http://www.51jrq.com/weixin/token",data:{location:window.location.href},success:function(data){var d=eval("("+data+")");d.jsApiList=["onMenuShareTimeline","onMenuShareAppMessage","getNetworkType","startRecord","stopRecord","uploadVoice","playVoice","downloadVoice","onVoicePlayEnd","onVoiceRecordEnd"],wx.config(d)},error:function(e,n){alert(data),alert(e)}})}abc(),wx.ready(function(){alert("ready"),document.getElementById("audios").play(),wx.checkJsApi({jsApiList:["getNetworkType","previewImage"],success:function(e){}}),wx.onMenuShareAppMessage({title:"51金融圈-陆家嘴高端金融理财师人才招聘会专场!",desc:"春季招聘高峰来临，51金融圈将于陆家嘴金茂大厦举办金融机构专场招聘会，届时将有数十家业内知名金融机构同台招聘，更有百万金融人才中精选优质人才前往寻觅伯乐！",link:"http://www.51jrq.com/wx/0325h5/index.html",imgUrl:"http://www.51jrq.com/wx/0325h5/images/head.png",trigger:function(e){},success:function(e){},cancel:function(e){},fail:function(e){}}),wx.onMenuShareTimeline({title:"51金融圈-陆家嘴高端金融理财师人才招聘会专场!",link:"http://www.51jrq.com/wx/0325h5/index.html",imgUrl:"http://www.51jrq.com/wx/0325h5/images/head.png",trigger:function(e){},success:function(e){},cancel:function(e){},fail:function(e){}})}),wx.error(function(e){alert(e.errMsg)});