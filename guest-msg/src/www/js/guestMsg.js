/**
 * Created by lollipop on 2018/1/16
 */

$('input, textarea').focus(function () {
    $(this).parent().removeClass('error')
});
$('input, textarea').click(function () {
    $(this).parent().removeClass('error')
});

var openGuestMsg = {

    openDialog:function(text){
        $('.dialog-container').css({
            opacity: 1
        });
        $('.dialog-container .mask').show();
        $('.dialog_bd').text(text);
        $('.dialog').css({
            width: '6rem'
        }).addClass('active');
    },
    closeDialog:function() {
        $('.dialog-container').css({
            opacity: 0
        });
        $('.dialog-container .mask').hide();
        $('.dialog').css({width: 0}).removeClass('active');
    }
}

var submitGuestMsg = function () {

    var emailpattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    var mobilepattern = /^1[34578]\d{9}$/;
    var teleppattern = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
    var corpname = $('#corpname').val();
    if (corpname == "") {
        openGuestMsg.openDialog("公司名称不能为空！");
        $('#corpname').focus();
        $('#corpname').parent().addClass('error');
        return;
    }
    var linkman = $('#linkman').val();
    if (linkman == "") {
        openGuestMsg.openDialog("联系人不能为空！");
        $('#linkman').focus();
        $('#linkman').parent().addClass('error')
        return;
    }
    var telephone = $('#telephone').val();
    if(telephone != ""){
        if (!teleppattern.test(telephone)) {
            openGuestMsg.openDialog("公司电话不正确!");
            $('#telephone').focus();
            $('#telephone').parent().addClass('error');
            return;
        }
    }
    var mobile = $('#mobile').val();
    if (mobile == "") {
        openGuestMsg.openDialog("手机号不能为空！");
        $('#mobile').focus();
        $('#mobile').parent().addClass('error');
        return;
    }
    if (!mobilepattern.test(mobile)) {
        openGuestMsg.openDialog("手机号码不正确！");
        $('#mobile').focus();
        $('#mobile').parent().addClass('error');
        return;
    }
    var email = $('#email').val();
    if (email == "") {
        openGuestMsg.openDialog("邮箱不能为空！");
        $('#email').focus();
        $('#email').parent().addClass('error');
        return;
    }
    if (!emailpattern.test(email)) {
        openGuestMsg.openDialog("邮箱格式不正确！");
        $('#email').focus();
        $('#email').parent().addClass('error');
        return;
    }
    var demand = $('#demand').val();


    var guestMsgData = {
        type: "3",
        corpname: corpname,
        linkman: linkman,
        telephone: telephone,
        mobile: mobile,
        email: email,
        demand: demand
    };
    console.log($('#guest-msg').serialize())
    var PR ="http://"+window.location.host+"/";
    var url = PR + "vita/m/salary/p_access";
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(guestMsgData),
        contentType: "application/json; charset=utf-8",
        dataType : "json",
        success: function (data) {
            console.log(data);
            if(JSON.parse(data).result) {

            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    })

}

//注册事件
$('.submit').on('click',function(){
    submitGuestMsg();
});