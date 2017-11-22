function signin(){
    var contact=$("#contact").val();
    if(""==contact){
        // $(".error").css("display","block");
        // alert("姓名不能为空！");
        bundle.openDialog("姓名不能为空！");
        return;
    }
    var designation=$("#designation").val();
    if(""==designation){
        // $(".error").css("display","block");
        // alert("职位不能为空！");
        bundle.openDialog("职位不能为空！");
        return;
    }
    var company=$("#company").val();
    if(""==company){
        // $(".error").css("display","block");
        // alert("公司不能为空！");
        bundle.openDialog("公司名称不能为空！");
        return;
    }
    var tel=$("#tel").val();
    if(""==tel){
        // $(".error").css("display","block");
        // alert("手机号不能为空！");
        bundle.openDialog("手机号不能为空！");
        return;
    }
    if(!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(tel)){
        bundle.openDialog("请输入有效的手机号码！");
        return;
    }
    // var email=$("#email").val();
    // if(""==email){
    //     $(".error").css("display","block");
    //     alert("邮箱不能为空！");
    //     return;
    // }else{
    //     var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    //     if(!re.test(email)){
    //         alert("请输入有效的邮箱！");
    //         return;
    //     }
    // }
    // var type=$("#recommender").val() || '';
    $.ajax({
        url:"/vita/m/activity/regist.html",
        type:"post",
        // data:{contact:contact+"	"+type,designation:designation,company:company,tel:tel+"	"+email},
        data:{contact:contact,designation:designation,company:company+' '+designation,tel:tel},
        "success":function(data){
            data=eval("("+data+")");
            if(true==data.result){
                $("#contact").val("");
                $("#designation").val("");
                $("#company").val("");
                $("#tel").val("");
                // $("#email").val("");
                // $("#personal").attr("checked",true);
                // $("#companys").attr("checked",false);
                bundle.openDialog("报名成功！")
            }

        }
    })


}
