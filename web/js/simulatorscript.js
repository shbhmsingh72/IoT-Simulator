var deviceClk=0;
var elt;
var addclk=0;
var devid=0;
var editflag;
var pubflag;
var resflag;
var s="";
var id="0";
var pubclk=0;
var deveditflag=10;
var dev_cnt=1;
var dev_key=[];
var activedev_key=[]
var improper_range=false;
var no_parameter=false;
var activedev_cnt=1;
var next_clk=0;
var rem_clk=0;
var nd=0;
var lastset=0;
var devtab=0;
var next_log_clk=0;
var lgrownumber=1;
var logcount=0;
var setconfig=0;
var newconfig="";
var json_msg=false;
var configuration="";
var subcount=0;
var pubcount=0;
var logcount=0;
var json_parameter_count=1;
var parameter_txt=new Array();
var value_txt=new Array();
var type_txt=new Array();
var json_row_number=new Array();
var initial_height=250;
var initial_top=170;
var pub_initial_top=340;
var add_json_initial_top=220;
var last_added=0;
var json_add_array=new Array();
json_row_number[0]=1;
$(document).ready(function(){

  $('.wizard-button .actions').addClass("col-md-6");

    $(document).on('click', '.subscribtion-fields-add', function()
    {
        

        var subscribtionfields = $(this).closest('table'),
            oldsubscribtionfields = $(this).parents('tr:first'),
            newsubscribtionfields = $(oldsubscribtionfields.clone()).appendTo(subscribtionfields);

        newsubscribtionfields.find('input').val('');
        subscribtionfields.find('tr:not(:last) .subscribtion-fields-add')
            .removeClass('subscribtion-fields-add').addClass('subscribtion-fields-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus gs"></span>');
    }).on('click', '.subscribtion-fields-remove', function()
    {
        $(this).parents('tr:first').remove();

        
        return false;
    });



$(document).on('click', '.publish-fields-add', function()
    {
        

        var publishfields = $(this).closest('table'),
            oldpublishfields = $(this).parents('tr:first'),
            newpublishfields = $(oldpublishfields.clone()).appendTo(publishfields);

        newpublishfields.find('input').val('');
        publishfields.find('tr:not(:last) .publish-fields-add')
            .removeClass('publish-fields-add').addClass('subscribtion-fields-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.subscribtion-fields-remove', function()
    {
        $(this).parents('tr:first').remove();

        
        return false;
    });


    
        $('#will_message_type').change(function(){
            $('.message-type-option').hide();
            $('#' + $(this).val()).show();
        });
         $('#will_qos_type').change(function(){
            $('.qos-type-option').hide();
            $('#' + $(this).val()).show();
        });
          $('#will_retain_type').change(function(){
            $('.retain-type-option').hide();
            $('#' + $(this).val()).show();
        });
var isIE=/*@cc_on!@*/false || !! document.documentMode;
if (isIE == true)
{

var errelt=document.getElementById("connectmsg");
errelt.style.display="none";
errelt.innerHTML="Internet Explorer does not support Bevywise IoT Simulator. Please try in other browser.";
//return;
}


document.getElementById('prtn_txt').value="0";
document.getElementById('pqos_txt').value="0";
document.getElementById("pqosoption").selected = "true";

$('#prtn_txt').val("0");
$('#pqos_txt').val("0");
$('#wqos_txt').val("0");

var xloc=window.location.href;
var str = "?setconfig=HOME"; 
    var n = str.search("setconfig");
if ((n!=-1) && (xloc=="http://127.0.0.1:9000/"))
{

   var nx=str.indexOf("=");
   newconfig=str.slice(nx+1);
	//setconfig=1;
  setconfig=2;
 setconfiguration();  

 $("#device").innerHTML="";
//getDashboard();
//startdoc();
}
function startdoc()
{

document.getElementById("devtab").value="1";
document.getElementById("alldev").style.color="#FA0000";
$("#device").innerHTML="";
}
$("#rule_cancel").click(function(event){
document.getElementById("add_devdialog").style.display="none";
$("#add_devdialog").dialog("close");
document.getElementById("pubd1").style.display="none";
document.getElementById("dialog_wrapper").style.display="none";
});
$("#pub_cancel").click(function(event){
document.getElementById("editdialog").style.display="none";
$("#editdialog").dialog("close");
document.getElementById("pubd2").style.display="none";
document.getElementById("dialog_wrapper1").style.display="none";
});

$("#prev").click(function(event){
lastset=0;
var ptxt=document.getElementById("next_clk_txt");
ptxt.value=next_clk+"";
var ne1=document.getElementById("device");
if(next_clk>0)
{
var hide_st_cnt=(20*next_clk)+1;
var hide_end_cnt=hide_st_cnt+19;
if (hide_end_cnt>nd)
hide_end_cnt=nd;
for(var hidev=hide_st_cnt;hidev<=hide_end_cnt;hidev++)
{
    var helt=document.getElementById("device"+dev_key[hidev]);
    helt.innerHTML="";
    helt.value="";
	helt.style.display="none";
	ne1.removeChild(helt);
}

next_clk--;
ptxt.value=next_clk+"";
if(next_clk==0)
{
  var prev_elt=document.getElementById("prev");
  prev_elt.disabled=true;
  var next_elt=document.getElementById("next");
  next_elt.className="nextimgg";
  next_elt.disabled=false;
}

var show_st_cnt=(20*next_clk)+1;
var show_end_cnt=show_st_cnt+19;

var ne11=document.getElementById("device");
ne11.style.display="block";
$("#device").children().hide();
if(show_end_cnt > nd) show_end_cnt=nd;
var top4=80;
for(var showv=show_st_cnt;showv<=show_end_cnt;showv++)
{
    var selt=document.getElementById("device"+dev_key[showv]);
    selt.style.display="block";
    if (showv==show_st_cnt)
    selt.style.padding="14px 4px 4px 24px";
    else
    selt.style.padding="4px 4px 4px 24px";
    selt.top=top4+"px";
    top4=top4+30;
}
var ptag1=document.getElementById("rec_count");
var ptagtxt1="";
ptagtxt1=show_st_cnt+"-"+show_end_cnt+" of "+nd;
ptag1.innerHTML=ptagtxt1;
disp_detail(dev_key[show_st_cnt]);
}
});

$("#runsubscribe, #runpublish, #startdevice,#startallclients").click(function(event){
var operationtype=$(event.target).attr('id');
if (operationtype=="runpublish")
{
document.getElementById("choice").value='runpublish';
}
else if (operationtype=="runsubscribe")
{
document.getElementById("choice").value='runsubscribe';
}
else if (operationtype=="startdevice")
{
	document.getElementById("choice").value='runclient';
	document.getElementById("tickgreen").style.display="block";
	document.getElementById("tickgrey").style.display="none";
 	document.getElementById("stopdevice").disabled=false;
  	document.getElementById("startdevice").disabled=true;
	/*var inputs = document.getElementsByTagName("img");
	for (x = 0 ; x < inputs.length ; x++)
	{
	 	myname = inputs[x].getAttribute("src");
		if(myname.indexOf("unsubscribe")>-1)
		{
		      $(inputs[x]).attr('onclick','fndrop("'+inputs[x].getAttribute("name")+'")');
		      inputs[x].style.pointerEvents="auto";
		}
	}*/
}
else
{
  document.getElementById("choice").value='startall';
  document.getElementById("stopallclients").disabled=false;
  document.getElementById("startallclients").disabled=true;
  document.getElementById("tickgreen").style.display="block";
  document.getElementById("tickgrey").style.display="none";
  document.getElementById("stopdevice").disabled=false;
  document.getElementById("startdevice").disabled=true;
  /* var inputs = document.getElementsByTagName("img");
   for (x = 0 ; x < inputs.length ; x++)
   {
    	myname = inputs[x].getAttribute("src");
	if(myname.indexOf("unsubscribe")>-1)
        {
		      $(inputs[x]).attr('onclick','fndrop("'+inputs[x].getAttribute("name")+'")');
		      inputs[x].style.pointerEvents="auto";

        }
    }*/

}


var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
    async:false,
     success:function () {
    }
    
});
document.getElementById("choice").value='getstatus';
document.getElementById("paid_txt").display="block";
var connect_status=0;

var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
 dataType: "text",
    async:false,
     success:function (data,status) {
data=JSON.parse(data);
if (data=="connected")
   connect_status=1;
else
   connect_status=0;
    },
error:function(data){
document.getElementById("paid_txt").display="none";
}
    
    
});
if (connect_status==0)
{
   document.getElementById("startdevice").disabled=true;
   document.getElementById("stopdevice").disabled=true;
  document.getElementById("stopallclients").disabled=true;
  document.getElementById("startallclients").disabled=true;
  
   document.getElementById("tickgreen").style.display="none";
document.getElementById("errmsg").style.display="block";
   document.getElementById("tickgrey").style.display="block";
  /* var inputs = document.getElementsByTagName("img");
   for (x = 0 ; x < inputs.length ; x++)
   {
    	myname = inputs[x].getAttribute("src");
	if(myname.indexOf("unsubscribe")>-1)
        {
	      		inputs[x].style.pointerEvents="none";
			inputs[x].onclick=null;

        }
    }*/
}
else
{
   document.getElementById("startdevice").disabled=true;
   document.getElementById("stopdevice").disabled=false;
   document.getElementById("tickgreen").style.display="block";
   document.getElementById("tickgrey").style.display="none";
 /*  var inputs = document.getElementsByTagName("img");
   for (x = 0 ; x < inputs.length ; x++)
   {
    	myname = inputs[x].getAttribute("src");
	if(myname.indexOf("unsubscribe")>-1)
        {
		      $(inputs[x]).attr('onclick','fndrop("'+inputs[x].getAttribute("name")+'")');
		      inputs[x].style.pointerEvents="auto";

        }
    }*/

}





});
function startclient()
{
  var operationtype=$(event.target).attr('id');
  operationtype="startdevice";
if (operationtype=="startdevice")
{
  document.getElementById("choice").value='runclient';
  document.getElementById("tickgreen").style.display="block";
  document.getElementById("tickgrey").style.display="none";
  document.getElementById("stopdevice").disabled=false;
    document.getElementById("startdevice").disabled=true;
 /* var inputs = document.getElementsByTagName("img");
  for (x = 0 ; x < inputs.length ; x++)
  {
    myname = inputs[x].getAttribute("src");
    if(myname.indexOf("unsubscribe")>-1)
    {
          $(inputs[x]).attr('onclick','fndrop("'+inputs[x].getAttribute("name")+'")');
          inputs[x].style.pointerEvents="auto";
    }
  }*/
}


var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
    async:false,
     success:function () {
    }
    
});
document.getElementById("choice").value='getstatus';
document.getElementById("paid_txt").display="block";
var connect_status=0;

var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
 dataType: "text",
    async:false,
     success:function (data,status) {
data=JSON.parse(data);
if (data=="connected")
   connect_status=1;
else
   connect_status=0;
    },
error:function(data){
document.getElementById("paid_txt").display="none";
}
    
    
});
if (connect_status==0)
{
   document.getElementById("startdevice").disabled=true;
   document.getElementById("stopdevice").disabled=true;
  document.getElementById("stopallclients").disabled=true;
  document.getElementById("startallclients").disabled=true;
  
   document.getElementById("tickgreen").style.display="none";
document.getElementById("errmsg").style.display="block";
   document.getElementById("tickgrey").style.display="block";
  /* var inputs = document.getElementsByTagName("img");
   for (x = 0 ; x < inputs.length ; x++)
   {
      myname = inputs[x].getAttribute("src");
  if(myname.indexOf("unsubscribe")>-1)
        {
            inputs[x].style.pointerEvents="none";
      inputs[x].onclick=null;

        }
    }*/
}
else
{
   document.getElementById("startdevice").disabled=true;
   document.getElementById("stopdevice").disabled=false;
   document.getElementById("tickgreen").style.display="block";
   document.getElementById("tickgrey").style.display="none";
/*   var inputs = document.getElementsByTagName("img");
   for (x = 0 ; x < inputs.length ; x++)
   {
      myname = inputs[x].getAttribute("src");
  if(myname.indexOf("unsubscribe")>-1)
        {
          $(inputs[x]).attr('onclick','fndrop("'+inputs[x].getAttribute("name")+'")');
          inputs[x].style.pointerEvents="auto";

        }
    }*/

}

}
function stopclient()
{
  var operationtype=$(event.target).attr('id');
  operationtype='stopdevice';
if(operationtype=='pubinstant')
  document.getElementById("choice").value='instantpublish';
else if(operationtype=='stopdevice')
{
    document.getElementById("choice").value='stopclient';
    document.getElementById("tickgreen").style.display="none";
    document.getElementById("tickgrey").style.display="block";
      document.getElementById("stopdevice").disabled=true;
      document.getElementById("startdevice").disabled=false;
   /*   var inputs = document.getElementsByTagName("img");
      for (x = 0 ; x < inputs.length ; x++)
      {
        myname = inputs[x].getAttribute("src");
    if(myname.indexOf("unsubscribe")>-1)
          {
            inputs[x].style.pointerEvents="none";
      inputs[x].onclick=null;
          }
        }*/


}
$("#paid_txt").appendTo("#pa");
$("#pid_txt").appendTo("#pi");
$("#pubt_txt").appendTo("#pt");
$("#pubm_txt").appendTo("#pm");
$("#pqos_txt").appendTo("#pq");
$("#prtn_txt").appendTo("#pr");
$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");


var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
dataType: "text",
    async:false,
     success:function (data,status) {
    },
error:function(data){
}
    
});


}
$("#stoppublish,#stopsubscribe,#stopdevice,#pubinstant,#stopallclients").click(function(event){
var operationtype=$(event.target).attr('id');
if(operationtype=='pubinstant')
  document.getElementById("choice").value='instantpublish';
else if(operationtype=='stopdevice')
{
	  document.getElementById("choice").value='stopclient';
	  document.getElementById("tickgreen").style.display="none";
	  document.getElementById("tickgrey").style.display="block";
  	  document.getElementById("stopdevice").disabled=true;
  	  document.getElementById("startdevice").disabled=false;
   	 /* var inputs = document.getElementsByTagName("img");
   	  for (x = 0 ; x < inputs.length ; x++)
   	  {
    		myname = inputs[x].getAttribute("src");
		if(myname.indexOf("unsubscribe")>-1)
        	{
	      		inputs[x].style.pointerEvents="none";
			inputs[x].onclick=null;
        	}
    	  }*/


}
else if (operationtype=='stopallclients')
{
  document.getElementById("choice").value='stopall';
  document.getElementById("stopallclients").disabled=true;
  document.getElementById("startallclients").disabled=false;
  document.getElementById("tickgreen").style.display="none";
  document.getElementById("tickgrey").style.display="block";
  document.getElementById("stopdevice").disabled=true;
  document.getElementById("startdevice").disabled=false;
 /* var inputs = document.getElementsByTagName("img");
  for (x = 0 ; x < inputs.length ; x++)
  {
    	myname = inputs[x].getAttribute("src");
	if(myname.indexOf("unsubscribe")>-1)
        {
	      		inputs[x].style.pointerEvents="none";
			inputs[x].onclick=null;
        }
  }*/
}
else
  document.getElementById("choice").value='stoppublish';
$("#paid_txt").appendTo("#pa");
$("#pid_txt").appendTo("#pi");
$("#pubt_txt").appendTo("#pt");
$("#pubm_txt").appendTo("#pm");
$("#pqos_txt").appendTo("#pq");
$("#prtn_txt").appendTo("#pr");
$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");


var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
dataType: "text",
    async:false,
     success:function (data,status) {
    },
error:function(data){
}
    
});
});


$("#next").click(function(event){
if (lastset==1) return;
next_clk++;
var ntxt=document.getElementById("next_clk_txt");
ntxt.value=next_clk+"";
rem_clk=next_clk-1;
var rem_st_cnt=(20*rem_clk)+1;
var rem_end_cnt=rem_st_cnt+19;
var prev_btn=document.getElementById("prev");
prev_btn.className="previmg";
prev_btn.style.display="block";
prev_btn.disabled=false;

for (var remv=rem_st_cnt;remv<=rem_end_cnt;remv++)
{
    var hide_elt=document.getElementById("device"+dev_key[remv]);
    hide_elt.style.display="none"; 
}
var ne1=document.getElementById("device");
ne1.style.display="block";
var st_cnt1=(20*next_clk)+1;
var end_cnt1=st_cnt1+19;
if (end_cnt1>=nd)
{
   var nxt=document.getElementById("next");
   nxt.className="nextimgg";
   nxt.disabled=true;
   lastset=1;
}
else
lastset=0;
if (end_cnt1>nd)
end_cnt1=nd;
var top1=80;
$("#device").children().hide();
ne1=document.getElementById("device");
ne1.style.display="block";
var aa;
var divavail=0;
for (var nn1=st_cnt1;nn1<=end_cnt1;nn1++)
{

  if(document.getElementById("device"+dev_key[nn1]))
  {
  aa=document.getElementById("device"+dev_key[nn1]);
    divavail=1;
   }
   else
    {
     divavail=0;
    aa=document.createElement("div");
	aa.id="device"+dev_key[nn1];
    aa.value=dev_key[nn1];
    aa.setAttribute("name","device"+dev_key[nn1]);
    aa.innerHTML=dev_key[nn1];
}
   aa.style.display="block";
  if(nn1==st_cnt1)
  aa.style.padding="14px 4px 4px 24px";
  else
  aa.style.padding="4px 4px 4px 24px";
  aa.style.top=top1+"px";
  top1=top1+30;
  aa.className="detail";
  if (divavail==0)
  ne1.appendChild(aa);
}
var ptag2=document.getElementById("rec_count");
var ptagtxt2="";
ptagtxt2=st_cnt1+"-"+end_cnt1+" of "+nd;
ptag2.innerHTML=ptagtxt2;
if (end_cnt1==nd) 
{
document.getElementById("next").disabled=true;
}
disp_detail(dev_key[st_cnt1]);
});

$("#add").click(function(event){
var checkdname=document.getElementById("d_name_txt").value;
checkdname=checkdname.trim();
var checkddesc=document.getElementById("d_desc_txt").value;
checkddesc=checkddesc.trim();
var invalid=0;
if ((checkdname=="") || (checkddesc==""))
{
	alert("Device Name/Description could not be empty");
	invalid=1;
}
var checkwtopic=document.getElementById("wtopic_txt").value;
checkwtopic=checkwtopic.trim();
var checkwmsg=document.getElementById("wmsg_txt").value;
checkwmsg=checkwmsg.trim();
if (checkwmsg=="NIL")
   checkwmsg="";
 if (checkwtopic=="NIL")
    checkwtopic="";
if ((checkwtopic=="") && (checkwmsg==""))
	alert("Will flag is not set");
else if (checkwtopic=="")
{ if (invalid==0)
	alert("Will message cannot be set without Will topic");
	invalid=1;
}
else if (checkwmsg=="")
{ if (invalid==0)
	alert("Will message cannot be empty if Will topic is set");
	invalid=1;
}
if(invalid==0)
{
if (document.getElementById("deveditflag").value=="1")
document.getElementById("choice").value='update';
else if (document.getElementById("deveditflag").value=="0")
document.getElementById("choice").value='adddevice';
$("#paid_txt").appendTo("#pa");
$("#pid_txt").appendTo("#pi");
$("#d_name_txt").appendTo("#dn");
$("#d_desc_txt").appendTo("#dd");
$("#wtopic_txt").appendTo("#wt");
$("#wmsg_txt").appendTo("#wm");
$("#wqos_txt").appendTo("#wq");
$("#wrtn_txt").appendTo("#wr");
$("#d_name_txt").appendTo("#myform");
$("#d_desc_txt").appendTo("#myform");
$("#wtopic_txt").appendTo("#myform");
$("#wmsg_txt").appendTo("#myform");
$("#wqos_txt").appendTo("#myform");
$("#wrtn_txt").appendTo("#myform");
document.getElementById("add_devdialog").style.display="none;"

$("#add_devdialog").dialog("close");

$("#device").innerHTML="";
addclk=1;
var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',
data: $("form[name='myform']").serialize(),
    type: "POST",
    async:false,
     success:function (msg) {
    },
    error:function(msg){
    }
    
});
addclk=1;
id=document.getElementById("d_name").value;
document.getElementById("d_name_txt").value="";
document.getElementById("d_desc_txt").value="";
document.getElementById("wtopic_txt").value="";
document.getElementById("wmsg_txt").value="";
document.getElementById("wqos_txt").value="0";
document.getElementById("wrtn_txt").value="0";


$("#d_name_txt").appendTo("#dn");
$("#d_desc_txt").appendTo("#dd");
$("#wtopic_txt").appendTo("#wt");
$("#wmsg_txt").appendTo("#wm");
$("#wqos_txt").appendTo("#wq");
$("#wrtn_txt").appendTo("#wr");
document.getElementById("dn").style.display="none";
document.getElementById("dd").style.display="none";
document.getElementById("wt").style.display="none";
document.getElementById("wm").style.display="none";
document.getElementById("wq").style.display="none";
document.getElementById("wr").style.display="none";

document.getElementById("addbtn").style.display="none";
document.getElementById("d_name_txt").style.display="none";

document.getElementById("add_devdialog").style.display="none";
if (document.getElementById("deveditflag").value=="1")
{
disp_detail(id);
}
else
{
location.reload();
}
}

});


$("#edit").click(function(event){
document.getElementById("will_topic").readOnly=false;
document.getElementById("will_msg").readOnly=false;
document.getElementById("will_retain").readOnly=false;

document.getElementById("choice").value='update';
document.getElementById("edit").className='btn btn-sm btn-info';
//("#editdev").click();
 
});


$("#editdev").click(function(event){
document.getElementById("dialog").style.display="none;"

$("#add_devdialog").dialog("close");
var checkdname=document.getElementById("d_name_txt").value;
checkdname=checkdname.trim();
var checkddesc=document.getElementById("d_desc_txt").value;
checkddesc=checkddesc.trim();
var invalid=0;
if ((checkdname=="") || (checkddesc==""))
{
	alert("Device Name/Description could not be empty");
	invalid=1;
}
var checkwtopic=document.getElementById("wtopic_txt").value;
checkwtopic=checkwtopic.trim();
var checkwmsg=document.getElementById("wmsg_txt").value;
checkwmsg=checkwmsg.trim();
if ((checkwtopic=="") && (checkwmsg==""))
	alert("Will flag is not set");
else if ((checkwtopic=="") || (checkwtopic=="NIL"))
{
  if (invalid==0)
	alert("Will message cannot be set without Will topic");
	invalid=1;
}
else if ((checkwmsg=="") || (checkwmsg=="NIL"))
{
  if (invalid==0)
	alert("Will message cannot be empty if Will topic is set");
	invalid=1;
}
if (invalid==0)
{
document.getElementById("choice").value='update';
$("#d_name_txt").appendTo("#myform");
$("#d_desc_txt").appendTo("#myform");
$("#wtopic_txt").appendTo("#myform");
$("#wmsg_txt").appendTo("#myform");
$("#wqos_txt").appendTo("#myform");
$("#wrtn_txt").appendTo("#myform");

document.getElementById("will_topic").readOnly=true;
document.getElementById("will_msg").readOnly=true;
document.getElementById("will_retain").readOnly=true;

document.getElementById("edit").className='btn btn-sm btn-info';
document.getElementById("save").className='hidden';
var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
    async:false,
     success:function () {

    }
    
});
var dlgbtnid=document.getElementByID("editdev");
dlgbtnid.setAttribute("id","add");
dlgbtnid.setAttribute("name","add");
e.value="Add";
disp_detail(id);
}
});

$("#pub_update").click(function(event){
var checkpubt=document.getElementById("pubt_txt").value;
checkpubt=checkpubt.trim();
var checkpubm=document.getElementById("pubm_txt").value;
checkpubm=checkpubm.trim();
var subtime=document.getElementById("sub_txt").value;
var invalid=0;
var txt_chk=document.getElementById("text_check").checked;
var msgtype=document.getElementById("text_type").value;
var msg_type_value=1;
var msg_type_txt="plaintext";
var msg;
if ((s=="pub") || (s=="addpub"))
{
if (txt_chk==true)
{
  //msg_type="text";
  if (msgtype=="plaintext")
  {
    msg=document.getElementById("plaintext_txt").value;
    msg_type_value=1;
    msg_type_txt="plaintext";
  }
  else if (msgtype=="systemvariable")
  {
    msg=document.getElementById("system_var").value;
    if (msg=="$Client_uptime")
    {
      msg_type_value=21;
      msg_type_txt="client_uptime";
    }
    else if (msg=="$Current_time")
    {
      msg_type_value=22;
      msg_type_txt="current_time";
    }
    else if (msg=="$Client_ID")
    {
      msg_type_value=23;
      msg_type_txt="client_id";
    }
  }
  else if (msgtype=="random")
  {
    msg=document.getElementById("pipe_txt").value;
    msg_type_value=3;
    msg_type_txt="random";
  }
  else if (msgtype=="range")
  {
    msg=document.getElementById("start_value").value+" - "+document.getElementById("end_value").value;
    n1=parseInt(document.getElementById("start_value").value);
    n2=parseInt(document.getElementById("end_value").value);
    if (n1>n2)
    {
      alert("Improper Range");
      invalid=1;
      improper_range=true;
    }
    msg_type_value=4;
    msg_type_txt="range";
  }
  document.getElementById("pubm_txt").value=msg;
  document.getElementById("json_pubm_txt").value=msg;
  document.getElementById("message_type").value=msg_type_value;
}
else
{
  msg_type="json";
  fnjsonmsgupdate();
}
}
else
{
  document.getElementById("json_pubm_txt").value=document.getElementById("pubm_txt").value;
}
checkpubm=document.getElementById("pubm_txt").value;
checkpubm=checkpubm.trim();
if ((s=="pub") || (s=="addpub"))
{
	if ((checkpubt=="") || (checkpubm==""))
	{
    if (improper_range==true)
    {
      improper_range=false;
    }
    else if (no_parameter==true)
      no_parameter=false;
    else
    {
		alert("Publish Topic/Message could not be empty");
    }
		invalid=1;
	}
}
if ((s=="sub") || (s=="addsub"))
{
	if (checkpubt=="")
	{
		alert("Topic to be subscribed could not be empty");
		invalid=1;
	}
}
if ((s=="res") || (s=="addres"))
{
var checkrest=document.getElementById("rest_txt").value;
checkrest=checkrest.trim();
var checkresm=document.getElementById("resm_txt").value;
checkresm=checkresm.trim();
	if ((checkpubt=="") || (checkpubm=="") || (checkrest=="") || (checkresm==""))
	{
		alert("Request-Response Topic/Message could not be empty");
		invalid=1;
	}
}
if (invalid==0)
{
  $("#editdialog").dialog("close");
document.getElementById("pubd1").style.display="none";
document.getElementById("pubm_txt").disabled=false;
$("#paid_txt").appendTo("#myform");
$("#pid_txt").appendTo("#myform");
$("#pubt_txt").appendTo("#myform");
$("#rest_txt").appendTo("#myform");
$("#resm_txt").appendTo("#myform");
  $("#pubm_txt").appendTo("#pm");
$("#pm").appendTo("#myform");
$("#pubm_txt").appendTo("#myform");
document.getElementById("json_pubm_txt").style.display="block";
$("#json_pubm_txt").appendTo("#myform");
$("#message_type").appendTo("#myform");
$("#pqos_txt").appendTo("#myform");
$("#prtn_txt").appendTo("#myform");
$("#paid_txt").appendTo("#myform");
$("#d_name_txt").appendTo("#myform");
$("#d_desc_txt").appendTo("#myform");
$("#wtopic_txt").appendTo("#myform");
$("#wmsg_txt").appendTo("#myform");
$("#wqos_txt").appendTo("#myform");
$("#wrtn_txt").appendTo("#myform");
$("#sub_txt").appendTo("#myform");
$("#hr").appendTo("#myform");
$("#min").appendTo("#myform");
$("#sec").appendTo("#myform");
document.getElementById("d_name_txt").style.display="none";
document.getElementById("d_desc_txt").style.display="none";
document.getElementById("wtopic_txt").style.display="none";
document.getElementById("wmsg_txt").style.display="none";
document.getElementById("wqos_txt").style.display="none";
document.getElementById("wrtn_txt").style.display="none";
if (s=="pub")
document.getElementById("choice").value='pubupdate';
else if(s=="sub")
document.getElementById("choice").value='subupdate';
else if(s=="res")
document.getElementById("choice").value='resupdate';
else if(s=="addpub")
document.getElementById("choice").value='addpub';
else if(s=="addsub")
{
document.getElementById('prtn_txt').value="0";
document.getElementById("choice").value='addsub';
}
else if(s=="addres")
document.getElementById("choice").value='addres';
/*for (var v=0;v<json_parameter_count;v++)
{
  document.getElementById("type_txt"+json_parameter_count).style.display="block";
  $("#type_txt"+json_parameter_count).appendTo("#myform");
}*/
var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
    async:false,
     success:function () {
}  
});
json_parameter_count=0;
document.getElementById("paid_txt").style.display="none";
document.getElementById("pubm_txt").disabled=true;
document.getElementById("pid_txt").style.display="none";
document.getElementById("pubt_txt").style.display="none";
document.getElementById("pubm_txt").style.display="none";
document.getElementById("rest_txt").style.display="none";
document.getElementById("resm_txt").style.display="none";
var json_table=document.getElementById("json_table");
while(json_table.rows[1]) json_table.deleteRow(1);
  var count = $('#json_table tr').length;
  var json_row=json_table.insertRow(count);
  var json_par_column=json_row.insertCell(0);
  json_par_column.innerHTML="<input type=textbox id=parameter"+json_parameter_count+" name=parameter"+json_parameter_count+" class=form-control style='display:block;width:125px;' placeholder='Key'>";
  var json_type_column=json_row.insertCell(1);
  json_type_column.innerHTML="";
  var sl='<select class=form-control id=json_text_type'+json_parameter_count+' name=json_text_type'+json_parameter_count+' onchange="fnjsontexttype(this.value);">\
          <option value=plaintext'+json_parameter_count+' selected>Constant</option>\
          <option value=system_var'+json_parameter_count+'>System Variables</option>\
          <option value=pipe_txt'+json_parameter_count+'>RANDOM</option>\
          <option value=range'+json_parameter_count+'>RANGE</option>\
          </select>';
  json_type_column.innerHTML=sl;      
  var json_value_column=json_row.insertCell(2);
  json_value_column.innerHTML="<input type=textbox id=plaintext"+json_parameter_count+" name=plaintext"+json_parameter_count+" class=form-control placeholder='Constant' style=display:block>";
  json_value_column.innerHTML+='<select class="form-control" id=system_var'+json_parameter_count+' name=system_var'+json_parameter_count+' style="display:none;float:right;">\
          <option value="$Client_uptime">$Client_uptime</option>\
          <option value="$Current_time">$Current_time</option>\
          <option value="$Client_ID">$Client_ID</option>\
          </select>';
  json_value_column.innerHTML+='<input type=textbox class="form-control" id=pipe_txt'+json_parameter_count+' name=pipe_txt'+json_parameter_count+' style="display:none;float:right;" placeholder="Pipe Separated Eg: ON | OFF" tabindex=10></input>';
  json_value_column.innerHTML+='<input type=number class="form-control" max=100 min=-100 id=start_value'+json_parameter_count+' name=start_value'+json_parameter_count+' style="width:100px;padding-left:5px;float:left;display:none" value=-100 tabindex=22></input>\
          <label for="lbl23" id=lblto'+json_parameter_count+' name=lblto'+json_parameter_count+' class="form-control" style="text-align:center;width:28px;float:left;display:none;border:none;" >-</label>\
          <input type=number max=100 class="form-control" min=-100 id=end_value'+json_parameter_count+' name=end_value'+json_parameter_count+' style="padding-left:5px;padding-right:5px;width:100px;float:left;display:none" value=100></input>';
  json_value_column.innerHTML+='<input type=textbox class="form-control" id=type_txt'+json_parameter_count+' name=type_txt'+json_parameter_count+' style="display:none;width:260px;float:right;"></input>\
          ';

  var json_action_column=json_row.insertCell(3);
  json_action_column.innerHTML="<img src='/images/dbdrop.png' id=del"+json_parameter_count+" name=del"+json_parameter_count+" style='width:20px;height:20px;cursor:pointer;' onclick='fnjsondelete(this.id)'>";
  var json_action_column=json_row.insertCell(4);
  json_action_column.innerHTML="<img src='/images/plus.png' id=add"+json_parameter_count+" name=add"+json_parameter_count+" style='display:block;width:20px;height:20px;cursor:pointer;' onclick='fnaddjson(this.id)'>";
  last_added=json_parameter_count;
  json_row_number=new Array();
  json_row_number[json_parameter_count]=1;
  add_json_initial_top=220;
  pub_initial_top=340;
  //document.getElementById("add_json").style.top=add_json_initial_top+"px";
json_parameter_count++;
document.getElementById("text_check").checked=true;
document.getElementById("json_check").checked=false;
document.getElementById("json_div").style.display="none";
document.getElementById("pqos_txt").style.display="none";
document.getElementById("prtn_txt").style.display="none";
document.getElementById("sub_txt").style.display="none";
document.getElementById("hr").style.display="none";
document.getElementById("min").style.display="none";
document.getElementById("sec").style.display="none";
document.getElementById("json_pubm_txt").style.display="none";
document.getElementById("pubd1").style.display="none";
document.getElementById("rndrange_div").style.display="none";
document.getElementById("rnd_div").style.display="none";
document.getElementById("range_div").style.display="none";
id=document.getElementById("pid_txt").value;
disp_detail(id); 
}
});

$(".activedev").hover(function(event){
$(this).css("background-color","#265C00");
$(this).css("cursor","pointer");
},
function()
{

});
$(".alldev").hover(function(event){
$(this).css("cursor","pointer");
},
function()
{

});


$(".detail").hover(function(event){
  alert('a');
$(this).css("cursor","pointer");

},
function()
{
});


$(".editdb").hover(function(event){
$(this).css("cursor","pointer");
},
function()
{
});

$(".dropdb").hover(function(event){
$(this).css("cursor","pointer");
},
function()
{
});

//$(".detail").click(function(event){

$(".example").click(function(event){
var xdetail=document.getElementsByClassName("example");
var xd;

for(xd=0;xd<xdetail.length;xd++)
{
xdetail[xd].style.backgroundColor="#fafafa";
}

var devtrack_id=document.getElementById(($(event.target).attr('id')));
devtrack_id.style.backgroundColor="#ecf0f5";
});

$(".plusimg").hover(function(event){
$(this).css("cursor","pointer");
},
function()
{
});





$("#select_sim_env").click(function(event){

s="selectenv";
$("#device").innerHTML="";
document.getElementById("choice").value='dbselect';

if (setconfig == 1)
{
  document.getElementById("confname").value=newconfig;
   configuration=newconfig;
}
else
{
           $("#addenvdialog").modal('hide');
 
/*document.getElementById("addenvdialog").style.display="none";
$("#addenvdialog").dialog({ width:700,height:500,autoOpen: false, show: { effect: "blind", duration: 1000 }, hide: { effect: "blind", duration: 1000 }, close: function () {; }, title:"Network Details" }).dialog("close");
$("#addenvdialog").dialog("destroy");
document.getElementById("simenv").style.display="none";*/
configuration=document.getElementById('dbload').value;
}
$.ajax({


   url: '/?config='+configuration,

data: $("form[name='myform']").serialize(),
    type: "POST",
    async:false,
     success:function () {

}
});
getDashboard();
//location.reload();


});

function setconfiguration()
{
      $.ajax({


    url: '/client/network?curr_time='+new Date().getTime(),

    type: "GET",
dataType: "text",
    async:false,

     success: function (msg) {
var obj=JSON.parse(msg);
var x = document.getElementById("dbload");
x.innerHTML="";
for (var key in obj)
{
    var option = document.createElement("option");
    option.text = obj[key];
    x.add(option);

}
},
 error: function (mm) {
  alert('error'+mm);
    }

});
/*$.ajax({


   url: '/?config=bevywise_network',

data: $("form[name='myform']").serialize(),
    type: "POST",
    async:false,
     success:function (msg) {
      alert('success'+msg);
     var x = document.getElementById("dbload");
var option = document.createElement("option");
option.text = msg;
x.add(option);
},
error:function(errmsg)
{
  alert('error due to '+errmsg);
  var a=JSON.parse(errmsg);
  for (var key in errmsg)
    alert(errmsg[key]);
}
});
*/


s="selectenv";
$("#device").innerHTML="";
document.getElementById("choice").value='dbselect';
if (setconfig == 1)
{
  document.getElementById("confname").value=newconfig;
    configuration=newconfig;
}
else
{
          $("#addenvdialog").modal('show');

    $('.btn-ok').click(function(){
    var value=$(this).data('value');
    $("#"+value).slideUp();
    });
    $("#btn-load").click(function(){
    $("#envchoice").slideDown();
    $("#create").slideUp();
    });
    $("#btn-create").click(function(){
    $("#create").slideDown();
    $("#envchoice").slideUp();
    });
  

/*document.getElementById("addenvdialog").style.display="block";
$("#addenvdialog").dialog({ width:700,height:500,autoOpen: false, show: { effect: "blind", duration: 1000 }, hide: { effect: "blind", duration: 1000 }, close: function () {; }, title:"Network Details" }).dialog("open");
document.getElementById("simenv").style.display="block";
configuration=document.getElementById('envchoice').value;*/
}
}
/*$(".detail").click(function(event){
  alert('2');
var xdetail=document.getElementsByClassName("detail");
var xd;
for(xd=0;xd<xdetail.length;xd++)
xdetail[xd].style.backgroundColor="#FDFFFF";
dev_id=($(event.target).attr('id'));
id=dev_id.substring(6);
disp_detail(id);
});*/
});
$(".detail").click(function(event){
  alert('2');
var xdetail=document.getElementsByClassName("detail");
var xd;
for(xd=0;xd<xdetail.length;xd++)
xdetail[xd].style.backgroundColor="#FDFFFF";
dev_id=($(event.target).attr('id'));
id=dev_id.substring(6);
disp_detail(id);
});

function JsonpCallback(json)
{
 document.getElementById('#summary').innerHtml=json.result;

}
function fnedit(id2)
{
var btnid=id2;
var ind1=btnid.indexOf('edit');
var rownum=btnid.slice(3,ind1);
var d_id=btnid.slice(ind1+4);
pubflag=btnid.indexOf('pub');
editflag=btnid.indexOf('sub');
resflag=btnid.indexOf('res');
var cbtn=document.getElementById("pub_cancel");
var sbtn=document.getElementById("pub_update");
if (pubflag != -1)
{
   s="pub";

}
else if (editflag != -1)
{
   s="sub";
}
else
{
   s="res";
}
if (s=="sub")
{
	document.getElementById("pm").style.display="none";
		document.getElementById("pr").style.display="none";

}
else
{
	document.getElementById("pm").style.display="block";
		document.getElementById("pr").style.display="block";

}
document.getElementById("paid_txt").value=rownum;
document.getElementById("pid_txt").value=d_id;

	document.getElementById("editdialog").style.display="block";
	document.getElementById("pubd2").style.display="block";
	document.getElementById("editdialog").style.display="block";
	document.getElementById("pubt_txt").value="";
	document.getElementById("pubm_txt").value="";
	 document.getElementById("pa").style.display="none";
  document.getElementById("pi").style.display="none";
  document.getElementById("pt").style.display="block";
  document.getElementById("pt").style.width="390px";
  document.getElementById("pm").style.display="block";
  document.getElementById("pm").style.width="390px";
    document.getElementById("tm").style.display="block";
  document.getElementById("tm").style.width="400px";
    document.getElementById("sm").style.display="block";
  document.getElementById("sm").style.width="390px";
  document.getElementById("pq").style.display="block";
  document.getElementById("pq").style.width="390px";

  document.getElementById("pq").style.display="block";
  document.getElementById("pr").style.display="block";
  document.getElementById("paid_txt").style.display="block";
  document.getElementById("pid_txt").style.display="block";
  document.getElementById("pubt_txt").style.display="block";
  document.getElementById("pubm_txt").style.display="block";
  document.getElementById("pubt_txt").style.width="245px";
  document.getElementById("pubt_txt").style.float="right";
  document.getElementById("sub_txt").style.display="block";
  document.getElementById("sub_txt").style.width="245px";
  document.getElementById("sub_txt").style.float="right";
  document.getElementById("sub_txt").value=0;
  document.getElementById("hr").style.width="48px";
  document.getElementById("hr").style.float="left";
  document.getElementById("hr").style.display="block";
  document.getElementById("hr").value=0;
  document.getElementById("lbl1").style.width="35px";
  document.getElementById("lbl1").style.paddingLeft="5px";
  document.getElementById("lbl1").style.float="left";
  document.getElementById("lbl1").style.display="block";
  document.getElementById("min").style.width="48px";
  document.getElementById("min").style.float="left";
  document.getElementById("min").style.display="block";
  document.getElementById("min").value=0;
  document.getElementById("lbl2").style.paddingLeft="5px";
  document.getElementById("lbl2").style.paddingRight="5px";
  document.getElementById("lbl2").style.width="38px";
  document.getElementById("lbl2").style.float="left";
  document.getElementById("lbl2").style.display="block";
  document.getElementById("sec").style.width="48px";
  document.getElementById("sec").style.float="left";
  document.getElementById("sec").style.display="block";
  document.getElementById("sec").value=0;
  document.getElementById("lbl3").style.paddingLeft="5px";
  document.getElementById("lbl3").style.width="30px";
  document.getElementById("lbl3").style.float="left";
  document.getElementById("lbl3").style.display="block";
  document.getElementById("pub_lbl").style.visibility="visible";
	document.getElementById("pqos_txt").style.display="block";
	document.getElementById("prtn_txt").style.display="block";
	document.getElementById("pqos_txt").style.width="245px";
	document.getElementById("prtn_txt").style.width="245px";
	document.getElementById("pqos_txt").style.float="right";
	document.getElementById("prtn_txt").style.float="right";
  document.getElementById("pubm_txt").style.width="245px";
  document.getElementById("pubm_txt").style.float="right";



	$("#pqos_txt").val("0");
	$("#prtn_txt").val("0");

$("#paid_txt").appendTo("#pa");

$("#pid_txt").appendTo("#pi");
$("#pubt_txt").appendTo("#pt");
$("#pubm_txt").appendTo("#pm");
$("#sub_txt").appendTo("#sm");
$("#hr").appendTo("#tm");
$("#lbl1").appendTo("#tm");
$("#min").appendTo("#tm");
$("#lbl2").appendTo("#tm");
$("#sec").appendTo("#tm");
$("#lbl3").appendTo("#tm");

$("#pqos_txt").appendTo("#pq");
$("#prtn_txt").appendTo("#pr");

if (s=='res')
{
$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");

}

$("#pa").appendTo("#pubd2");
$("#pi").appendTo("#pubd2");
$("#pt").appendTo("#pubd2");
$("#pm").appendTo("#pubd2");
$("#tm").appendTo("#pubd2");
$("#sm").appendTo("#pubd2");

$("#pq").appendTo("#pubd2");
$("#pr").appendTo("#pubd2");
$("#pubbtn").appendTo("#dialog_wrapper1");
if (s=='res')
{
$("#rt").appendTo("#pubd2");
$("#rm").appendTo("#pubd2");

}
$("#pubd2").appendTo("#dialog_wrapper1");
$("#dialog_wrapper1").appendTo("#editdialog");
	document.getElementById("pid_txt").value=document.getElementById("d_name").value;
	if (s=="sub")
	{
		document.getElementById("pm").style.display="none";
		document.getElementById("pr").style.display="none";
        document.getElementById("sm").style.display="block";
      document.getElementById("sub_txt").style.display="block";
  document.getElementById("sub_txt").style.width="245px";
  document.getElementById("sub_txt").style.float="right";

	}
	else
	{
	
		document.getElementById("pr").style.display="block";
        document.getElementById("tm").style.display="block";

	document.getElementById("prtn_txt").style.display="block";
	document.getElementById("pm").style.width="390px";
	document.getElementById("pt").style.width="390px";
  document.getElementById("tm").style.width="400px";
  document.getElementById("pm").style.display="block";
  document.getElementById("pubm_txt").style.display="block";
	document.getElementById("pubm_txt").style.width="245px";
	document.getElementById("prtn_txt").style.width="245px";
	document.getElementById("pubm_txt").style.float="right";
	document.getElementById("prtn_txt").style.float="right";



	}
	if (s=="res")
	{
		document.getElementById("rest_txt").value="";
		document.getElementById("resm_txt").value="";	
		document.getElementById("rt").style.display="block";
		document.getElementById("rm").style.display="block";
	document.getElementById("rest_txt").style.display="block";
	document.getElementById("resm_txt").style.display="block";

	document.getElementById("rm").style.width="390px";
	document.getElementById("rt").style.width="390px";
	document.getElementById("rest_txt").style.width="245px";
	document.getElementById("resm_txt").style.width="245px";
	document.getElementById("rest_txt").style.float="right";
	document.getElementById("resm_txt").style.float="right";

$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");


	}
	else
	{
		document.getElementById("rt").style.display="none";
		document.getElementById("rm").style.display="none";
		
	}
$("#paid_txt").appendTo("#pa");

$("#pid_txt").appendTo("#pi");
$("#pubt_txt").appendTo("#pt");
$("#pubm_txt").appendTo("#pm");
$("#pqos_txt").appendTo("#pq");
$("#prtn_txt").appendTo("#pr");

if (s=='res')
{
$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");

}

$("#pa").appendTo("#pubd2");
$("#pi").appendTo("#pubd2");
$("#pt").appendTo("#pubd2");
$("#sm").appendTo("#pubd2");
$("#tm").appendTo("#pubd2");
$("#pm").appendTo("#pubd2");

$("#pq").appendTo("#pubd2");
$("#pr").appendTo("#pubd2");
if (s=='res')
{
$("#rt").appendTo("#pubd2");
$("#rm").appendTo("#pubd2");

}
$("#pubd2").appendTo("#dialog_wrapper1");
$("#dialog_wrapper1").appendTo("#editdialog");


	    id=document.getElementById("pid_txt").value;
document.getElementById("pid_txt").tabIndex=-1;
	    document.getElementById("dialog_wrapper1").style.display="block";
	    document.getElementById("pubd2").style.display="block";
	document.getElementById("pt").style.width="390px";
	document.getElementById("pm").style.width="390px";
  document.getElementById("tm").style.width="400px";
document.getElementById("sm").style.width="390px";
	document.getElementById("pq").style.width="390px";
	document.getElementById("pr").style.width="390px";




  /////////////////////////////////////////////////////////////////////////

var cbtn=document.getElementById("pub_cancel");
var sbtn=document.getElementById("pub_update");


  document.getElementById("editdialog").style.display="block";
  document.getElementById("pubd2").style.display="block";
  document.getElementById("editdialog").style.display="block";
  document.getElementById("paid_txt").value="";
  document.getElementById("pubt_txt").value="";
  document.getElementById("pubm_txt").value="";
  document.getElementById("pa").style.display="none";
  document.getElementById("pi").style.display="none";
      document.getElementById("tm").style.display="block";
  document.getElementById("tm").style.width="400px";

  document.getElementById("pt").style.display="block";
    document.getElementById("sm").style.display="block";
  document.getElementById("sm").style.width="490px";
  document.getElementById("sub_txt").style.display="block";
  document.getElementById("hr").style.display="block";
  document.getElementById("min").style.display="block";
  document.getElementById("sec").style.display="block";
  document.getElementById("hr").value=0;
  document.getElementById("min").value=0;
  document.getElementById("sec").value=0;
  document.getElementById("pq").style.display="block";
  document.getElementById("pq").style.width="490px";

  document.getElementById("pr").style.display="block";
  document.getElementById("paid_txt").style.display="block";
  document.getElementById("pid_txt").style.display="block";
  document.getElementById("pubt_txt").style.display="block";
  document.getElementById("pubm_txt").style.display="block";
  document.getElementById("pubt_txt").style.width="345px";
  document.getElementById("pubm_txt").style.width="245px";
  document.getElementById("pubt_txt").style.float="right";
  document.getElementById("pubm_txt").style.float="right";
  document.getElementById("sub_txt").style.display="block";
  document.getElementById("sub_txt").style.width="345px";
  document.getElementById("sub_txt").style.float="right";
  document.getElementById("lbl1").style.width="85px";
  document.getElementById("lbl1").style.paddingLeft="15px";
  document.getElementById("lbl1").style.float="left";
  document.getElementById("lbl1").style.display="block";



  document.getElementById("min").style.width="78px";
  document.getElementById("min").style.float="left";
  document.getElementById("min").style.display="block";

  document.getElementById("lbl2").style.paddingLeft="15px";
  document.getElementById("lbl2").style.paddingRight="5px";
  document.getElementById("lbl2").style.width="38px";
  document.getElementById("lbl2").style.float="left";
  document.getElementById("lbl2").style.display="block";

  document.getElementById("sec").style.width="78px";
  document.getElementById("sec").style.float="left";
  document.getElementById("sec").style.display="block";

  document.getElementById("pub_lbl").style.visibility="visible";
  document.getElementById("pqos_txt").style.display="block";
  document.getElementById("prtn_txt").style.display="block";
  document.getElementById("pqos_txt").style.width="150px";
  document.getElementById("prtn_txt").style.width="130px";
  document.getElementById("pqos_txt").style.float="left";
  document.getElementById("prtn_txt").style.float="left";
  document.getElementById("pm").style.display="none";
  document.getElementById("range_div").style.display="none";
  document.getElementById("json_div").style.display="none";
  document.getElementById("text_check").selected=true;
  document.getElementById("json_check").selected=false;

  $("#pqos_txt").val("0");
  $("#prtn_txt").val("0");

$("#paid_txt").appendTo("#pa");

$("#pid_txt").appendTo("#pi");
$("#pubt_txt").appendTo("#pt");
$("#pubm_txt").appendTo("#pm");
$("#sub_txt").appendTo("#sm");
$("#hr").appendTo("#tm");
$("#lbl1").appendTo("#tm");
$("#min").appendTo("#tm");
$("#lbl2").appendTo("#tm");
$("#sec").appendTo("#tm");
$("#lbl3").appendTo("#tm");
$("#pqos_txt").appendTo("#pq");
$("#prtn_txt").appendTo("#pq");
if (s=='addres')
{
$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");

}

$("#pa").appendTo("#pubd2");
$("#pi").appendTo("#pubd2");
$("#tm").appendTo("#pubd2");
$("#pt").appendTo("#pubd2");
$("#pq").appendTo("#pubd2");
//$("#pr").appendTo("#pubd2");
//$("#pm").appendTo("#pubd2");
$("#sm").appendTo("#pubd2")
$("#pubbtn").appendTo("#dialog_wrapper1");
if (s=='addres')
{
$("#rt").appendTo("#pubd2");
$("#rm").appendTo("#pubd2");

}
$("#pubd2").appendTo("#dialog_wrapper1");
$("#dialog_wrapper1").appendTo("#editdialog");
  document.getElementById("pid_txt").value=document.getElementById("d_name").value;
  if (s=="sub")
  {
    document.getElementById("pm").style.display="none";
    document.getElementById("pr").style.display="none";
    document.getElementById("sm").style.display="block";
      document.getElementById("sub_txt").style.display="block";
  document.getElementById("sub_txt").style.width="295px";
  document.getElementById("sub_txt").style.float="right";
document.getElementById("rndrange_div").style.display="none";
  }
  else
  {
    //document.getElementById("pm").style.display="block";
    document.getElementById("pm").style.display="none";
    document.getElementById("tm").style.display="block";
    document.getElementById("pr").style.display="block";
  document.getElementById("pubm_txt").style.display="block";
  document.getElementById("prtn_txt").style.display="block";
  document.getElementById("pm").style.width="490px";
    document.getElementById("tm").style.width="600px";
  document.getElementById("pt").style.width="490px";
  document.getElementById("pubm_txt").style.width="225px";
  document.getElementById("prtn_txt").style.width="130px";
  document.getElementById("pqos_txt").style.width="150px";
  document.getElementById("pubm_txt").style.float="left";
  document.getElementById("prtn_txt").style.float="left";
  document.getElementById("ptype").style.display="block";
  document.getElementById("rndrange_div").style.display="block";
  }
  if (s=="res")
  {
    document.getElementById("rest_txt").value="";
    document.getElementById("resm_txt").value=""; 
    document.getElementById("rt").style.display="block";
    document.getElementById("rm").style.display="block";
  document.getElementById("rest_txt").style.display="block";
  document.getElementById("resm_txt").style.display="block";

  document.getElementById("rm").style.width="490px";
  document.getElementById("rt").style.width="490px";
  document.getElementById("rest_txt").style.width="295px";
  document.getElementById("resm_txt").style.width="295px";
  document.getElementById("rest_txt").style.float="right";
  document.getElementById("resm_txt").style.float="right";

$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");


  }
  else
  {
    document.getElementById("rt").style.display="none";
    document.getElementById("rm").style.display="none";
    
  }
$("#paid_txt").appendTo("#pa");

$("#pid_txt").appendTo("#pi");
$("#pubt_txt").appendTo("#pt");
$("#pubm_txt").appendTo("#pm");
$("#pqos_lbl").appendTo("#pq");
$("#pqos_txt").appendTo("#pq");
$("#prtn_lbl").appendTo("#pq");
$("#prtn_txt").appendTo("#pq");
if (s=='res')
{
$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");

}

$("#pa").appendTo("#pubd2");
$("#pi").appendTo("#pubd2");
$("#tm").appendTo("#pubd2");
$("#pt").appendTo("#pubd2");
$("#sm").appendTo("#pubd2");
$("#pq").appendTo("#pubd2");
$("#ptype").appendTo("#pubd2");
$("#rndrange_div").appendTo("#pubd2");
$("#plaintext_div").appendTo("#pubd2");
$("#json_div").appendTo("#pubd2");
//$("#pr").appendTo("#pubd2");
//$("#pm").appendTo("#pubd2");
$("#par_div").appendTo("#pubd2");
$("#par_txt_div").appendTo("#pubd2");


if (s=='res')
{
$("#rt").appendTo("#pubd2");
$("#rm").appendTo("#pubd2");

}
$("#pubd2").appendTo("#dialog_wrapper1");
$("#dialog_wrapper1").appendTo("#editdialog");
      id=document.getElementById("pid_txt").value;
document.getElementById("pid_txt").tabIndex=-1;
      document.getElementById("dialog_wrapper1").style.display="block";
      document.getElementById("pubd2").style.display="block";
  document.getElementById("pt").style.width="490px";
  document.getElementById("pm").style.width="590px";
  document.getElementById("pq").style.width="590px";
  document.getElementById("pr").style.width="590px";
  document.getElementById("tm").style.width="600px";
    document.getElementById("sm").style.width="590px";


 document.getElementById("editdialog").style.display="block";


  /////////////////////////////////////////////////////////////////////////
 document.getElementById("editdialog").style.display="block";
document.getElementById("pubt_txt").value=document.getElementById(s+"r"+rownum+"c0").value;
document.getElementById("paid_txt").style.display="block";
document.getElementById("paid_txt").value=rownum;
document.getElementById("pubm_txt").value=document.getElementById(s+"r"+rownum+"c1").value;
if (s=="pub")
{
var msg_edit_type=document.getElementById(s+"r"+rownum+"c7").value;
var edit_msg=document.getElementById(s+"r"+rownum+"c8").value;
if (msg_edit_type==5)
{ 
     var json_table=document.getElementById("json_table");
   while(json_table.rows[1]) json_table.deleteRow(1);
   json_parameter_count=0;
  var count = $('#json_table tr').length;
  var json_row=json_table.insertRow(count);
  var json_par_column=json_row.insertCell(0);
  json_par_column.innerHTML="<input type=textbox id=parameter"+json_parameter_count+" name=parameter"+json_parameter_count+" class=form-control style='display:block;width:125px;' placeholder='Key'>";
  var json_type_column=json_row.insertCell(1);
  json_type_column.innerHTML="";
  var sl='<select class=form-control id=json_text_type'+json_parameter_count+' name=json_text_type'+json_parameter_count+' onchange="fnjsontexttype(this.value);">\
          <option value=plaintext'+json_parameter_count+' selected>Constant</option>\
          <option value=system_var'+json_parameter_count+'>System Variables</option>\
          <option value=pipe_txt'+json_parameter_count+'>RANDOM</option>\
          <option value=range'+json_parameter_count+'>RANGE</option>\
          </select>';
  json_type_column.innerHTML=sl;      
  var json_value_column=json_row.insertCell(2);
  json_value_column.innerHTML="<input type=textbox id=plaintext"+json_parameter_count+" name=plaintext"+json_parameter_count+" class=form-control placeholder='Constant' style=display:block>";
  json_value_column.innerHTML+='<select class="form-control" id=system_var'+json_parameter_count+' name=system_var'+json_parameter_count+' style="display:none;float:right;">\
          <option value="$Client_uptime">$Client_uptime</option>\
          <option value="$Current_time">$Current_time</option>\
          <option value="$Client_ID">$Client_ID</option>\
          </select>';
  json_value_column.innerHTML+='<input type=textbox class="form-control" id=pipe_txt'+json_parameter_count+' name=pipe_txt'+json_parameter_count+' style="display:none;float:right;" placeholder="Pipe Separated Eg: ON | OFF" tabindex=10></input>';
  json_value_column.innerHTML+='<input type=number class="form-control" max=100 min=-100 id=start_value'+json_parameter_count+' name=start_value'+json_parameter_count+' style="width:100px;padding-left:5px;float:left;display:none" value=-100 tabindex=22></input>\
          <label for="lbl23" id=lblto'+json_parameter_count+' name=lblto'+json_parameter_count+' class="form-control" style="text-align:center;width:28px;float:left;display:none;border:none;" >-</label>\
          <input type=number max=100 class="form-control" min=-100 id=end_value'+json_parameter_count+' name=end_value'+json_parameter_count+' style="padding-left:5px;padding-right:5px;width:100px;float:left;display:none" value=100></input>';
  json_value_column.innerHTML+='<input type=textbox class="form-control" id=type_txt'+json_parameter_count+' name=type_txt'+json_parameter_count+' style="display:none;width:260px;float:right;"></input>\
          ';

  var json_action_column=json_row.insertCell(3);
  json_action_column.innerHTML="<img src='/images/dbdrop.png' id=del"+json_parameter_count+" name=del"+json_parameter_count+" style='width:20px;height:20px;cursor:pointer;' onclick='fnjsondelete(this.id)'>";
  var json_action_column=json_row.insertCell(4);
  json_action_column.innerHTML="<img src='/images/plus.png' id=add"+json_parameter_count+" name=add"+json_parameter_count+" style='width:20px;height:20px;cursor:pointer;' onclick='fnaddjson(this.id)'>";
  last_added=json_parameter_count;
  json_row_number=new Array();
  json_row_number[json_parameter_count]=1;

json_parameter_count++;
  add_json_initial_top=220;
  pub_initial_top=340;
   document.getElementById("json_div").style.display="block";
   document.getElementById("add_json").style.display="none";
   document.getElementById("add_json").style.top=add_json_initial_top+"px";

  document.getElementById("json_div").style.display="block";  
  document.getElementById("json_check").checked=true;
  document.getElementById("text_check").checked=false;
  document.getElementById("plaintext_div").style.display="none";
  document.getElementById("rndrange_div").style.display="none";
  document.getElementById("add_json").style.display="none";
  var old_msg=edit_msg.split("},");
  for(var v=0;v<old_msg.length;v++)
  {
    if (v>0)
      fnaddjson("-1");
    var texttype="plaintext";
    var textkey="";
    var textvalue="";
    var actual_msg="";
    if ((v==0) && (v==old_msg.length-1))
      actual_msg=JSON.parse(old_msg[v]);
    else if (v==0)
    {
      actual_msg=JSON.parse(old_msg[v]+"}}");
    }
    else if (v<old_msg.length-1)
      actual_msg=JSON.parse("{"+old_msg[v]+"}}");
    else
      actual_msg=JSON.parse("{"+old_msg[v]);  
    for (var jkey in actual_msg)  
    {
      textkey=jkey;
      var msg_temp=actual_msg[jkey];
      texttype=msg_temp["type"];
      textvalue=msg_temp["msg"]
    }
    document.getElementById("parameter"+v).value=jkey;
    if (texttype=="plaintext")
    {
      document.getElementById("plaintext"+v).style.display="block";
      document.getElementById("plaintext"+v).value=textvalue;
      document.getElementById("json_text_type"+v).value="plaintext"+v;
    }
    else if (texttype=="systemvariable")
    {
      document.getElementById("system_var"+v).style.display="block";
      document.getElementById("plaintext"+v).style.display="none";
      document.getElementById("system_var"+v).value=textvalue;
      document.getElementById("json_text_type"+v).value="system_var"+v;      
    }
    else if (texttype=="random")
    {
      document.getElementById("pipe_txt"+v).style.display="block";
      document.getElementById("plaintext"+v).style.display="none";
      document.getElementById("pipe_txt"+v).value=textvalue;
      document.getElementById("json_text_type"+v).value="pipe_txt"+v;      
    }
    else if (texttype=="range")
    {
      var mm=textvalue.split(" - ")
      var start_val=mm[0];
      var end_val=mm[1];
      document.getElementById("plaintext"+v).style.display="none";
      document.getElementById("start_value"+v).style.display="block";
      document.getElementById("end_value"+v).style.display="block";
      document.getElementById("json_text_type"+v).value="range"+v;      
      document.getElementById("lblto"+v).style.display="block";
      document.getElementById("start_value"+v).value=mm[0];
      document.getElementById("end_value"+v).value=mm[1];
    }
  }

}
else
{ 
  document.getElementById("add_json").style.display="none";
  document.getElementById("json_check").checked=false;
  document.getElementById("text_check").checked=true;
  document.getElementById("json_div").style.display="none";
  document.getElementById("rndrange_div").style.display="block";  
  if (msg_edit_type==1)
  {
    document.getElementById("text_type").style.display="block";
    document.getElementById("text_type").style.width="360px";
    document.getElementById("text_type").style.marginTop="-20px";
    document.getElementById("text_type").style.float="right";
    document.getElementById("text_type").value="plaintext";
    document.getElementById("plaintext_div").style.display="block";
    document.getElementById("plaintext_div").style.width="500px";
    document.getElementById("sysvar_div").style.display="none";
    document.getElementById("rnd_div").style.display="none";
    document.getElementById("range_div").style.display="none";
    document.getElementById("plaintext_txt").style.display="block";
    document.getElementById("plaintext_txt").style.width="360px";
    document.getElementById("plaintext_txt").style.marginTop="20px";
    document.getElementById("plaintext_txt").style.float="right";
    document.getElementById("plaintext_txt").value=edit_msg;
        $("#plaintext_div").appendTo("#pubd2");

  }
  else if (msg_edit_type>20)
  {
    document.getElementById("text_type").style.display="block";
    document.getElementById("text_type").style.width="360px";
    document.getElementById("text_type").style.marginTop="-20px";
    document.getElementById("text_type").style.float="right";
    document.getElementById("text_type").value="systemvariable";
    document.getElementById("plaintext_div").style.display="none";
    document.getElementById("sysvar_div").style.display="block";
    document.getElementById("sysvar_div").style.width="500px";
    document.getElementById("rnd_div").style.display="none";
    document.getElementById("range_div").style.display="none";
    document.getElementById("system_var").style.display="block";
    document.getElementById("system_var").style.width="360px";
    document.getElementById("system_var").style.marginTop="20px";
    document.getElementById("system_var").style.float="right";
    if (msg_edit_type==21)
      document.getElementById("system_var").value="$Client_uptime";
    else if (msg_edit_type==22)
      document.getElementById("system_var").value="$Current_time";
    else if (msg_edit_type==23)
      document.getElementById("system_var").value="$Client_ID";
    $("#sysvar_div").appendTo("#pubd2");

  }
  else if (msg_edit_type==3)
  {
    document.getElementById("text_type").style.display="block";
    document.getElementById("text_type").style.width="360px";
    document.getElementById("text_type").style.marginTop="-20px";
    document.getElementById("text_type").style.float="right";
    document.getElementById("text_type").value="random";
    document.getElementById("plaintext_div").style.display="none";
    document.getElementById("rnd_div").style.display="block";
    document.getElementById("rnd_div").style.width="500px";
    document.getElementById("sysvar_div").style.display="none";
    document.getElementById("range_div").style.display="none";
    document.getElementById("pipe_lbl").style.display="block";
    document.getElementById("pipe_lbl").style.float="left";
    document.getElementById("pipe_lbl").style.marginTop="20px";
    document.getElementById("pipe_txt").style.display="block";
    document.getElementById("pipe_txt").style.width="360px";
    document.getElementById("pipe_txt").style.marginTop="20px";
    document.getElementById("pipe_txt").style.float="right";
    document.getElementById("pipe_txt").value=edit_msg;
    $("#rnd_div").appendTo("#pubd2");
  }
  else if (msg_edit_type==4)
  {
    document.getElementById("text_type").style.display="block";
    document.getElementById("text_type").style.width="360px";
    document.getElementById("text_type").style.marginTop="-20px";
    document.getElementById("text_type").style.float="right";
    document.getElementById("text_type").value="range";
    document.getElementById("plaintext_div").style.display="none";
    document.getElementById("range_div").style.display="block";
    document.getElementById("range_div").style.width="500px";
    document.getElementById("sysvar_div").style.display="none";
    document.getElementById("rnd_div").style.display="none";
    var temp=edit_msg.split(" - ");
    document.getElementById("start_value").value=temp[0];
    document.getElementById("end_value").value=temp[1];
    $("#range_div").appendTo("#pubd2");    
  }
}
}
if (s=="res")
{
document.getElementById("rt").style.display="block";
document.getElementById("rm").style.display="block";
document.getElementById("rest_txt").style.display="block";
document.getElementById("resm_txt").style.display="block";
	document.getElementById("rm").style.width="390px";
	document.getElementById("rt").style.width="390px";
	document.getElementById("rest_txt").style.width="245px";
	document.getElementById("resm_txt").style.width="245px";
	document.getElementById("rest_txt").style.float="right";
	document.getElementById("resm_txt").style.float="right";
document.getElementById("ptype").style.display="none";
document.getElementById("msg_type_div").style.display="none";
document.getElementById("rndrange_div").style.display="none";
document.getElementById("json_div").style.display="none";
$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");

document.getElementById("rest_txt").value=document.getElementById(s+"r"+rownum+"c2").value;
document.getElementById("resm_txt").value=document.getElementById(s+"r"+rownum+"c3").value;
var qosstr=document.getElementById(s+"r"+rownum+"c4").value;
var nqos=qosstr.search("0");
var qosvalue;
if (nqos>-1) qosvalue="0";
else
{
  var mqos=qosstr.search("1");
  if (mqos > -1) qosvalue="1";
  else qosvalue="2";
}
document.getElementById("pqos_txt").value=qosvalue;
var rtnstr=document.getElementById(s+"r"+rownum+"c5").value;
var nrtn=rtnstr.search("0");
var rtnvalue;
if (nrtn>-1) rtnvalue="0";
else  rtnvalue="1";
document.getElementById("prtn_txt").value=rtnvalue;
}
else
{
document.getElementById("rt").style.display="none";
document.getElementById("rm").style.display="none";
var qosstr=document.getElementById(s+"r"+rownum+"c2").value;
var nqos=qosstr.search("0");
var qosvalue;
if (nqos>-1) qosvalue="0";
else
{
  var mqos=qosstr.search("1");
  if (mqos > -1) qosvalue="1";
  else qosvalue="2";
}
document.getElementById("pqos_txt").value=qosvalue;
var rtnstr=document.getElementById(s+"r"+rownum+"c3").value;
var nrtn=rtnstr.search("0");
var rtnvalue;
if (nrtn>-1) rtnvalue="0";
else  rtnvalue="1";
document.getElementById("prtn_txt").value=rtnvalue;
document.getElementById("hr").value=document.getElementById(s+"r"+rownum+"c4").value;
document.getElementById("min").value=document.getElementById(s+"r"+rownum+"c5").value;
document.getElementById("sec").value=document.getElementById(s+"r"+rownum+"c6").value;
}
document.getElementById("pubd1").style.display="block";
document.getElementById("pubt_txt").focus();
if (s=="pub")
{
  if (msg_edit_type!=5)
  {
        document.getElementById("pub_cancel").style.top=document.getElementById("pub_update").style.top="340px";
    document.getElementById("pub_cancel").style.left="180px";
    document.getElementById("pub_update").style.left="350px";  
    document.getElementById("text_check").disabled=false;
    document.getElementById("json_check").disabled=false;
         document.getElementById("add_json").style.display="none";


  }
  else
  {
    document.getElementById("pub_cancel").style.top=document.getElementById("pub_update").style.top="175px";

    //document.getElementById("pub_cancel").style.left="550px";
    //document.getElementById("pub_update").style.left="480px";
    document.getElementById("text_check").disabled=true;
    document.getElementById("json_check").disabled=true;
         document.getElementById("add_json").style.display="none";
           var cbtn=document.getElementById("pub_cancel");
  var sbtn=document.getElementById("pub_update");
  var sample_top=340+((json_parameter_count-1)*30);
  cbtn.style.top=sample_top+"px";
  sbtn.style.top=sample_top+"px";


  }
   //cbtn.style.top="375px";
   //sbtn.style.top="375px";
      document.getElementById("tm").style.display="block";
   document.getElementById("sm").style.display="none";
   document.getElementById("prtn_lbl").style.display="block";
$("#editdialog").dialog({ width:700,height:500,autoOpen: false, show: { effect: "blind", duration: 1000 }, hide: { effect: "blind", duration: 1000 }, close: function () {; }, title:"Edit Publish Message Details" }).dialog("open");
}
else if (s=="sub")
{
   document.getElementById("sm").style.display="block";
   
document.getElementById("tm").style.display="block";
    document.getElementById("pub_lbl").style.visibility="hidden";
   var hr_value=document.getElementById("hr").value=document.getElementById(s+"r"+rownum+"c4").value;
var min_value=document.getElementById("min").value=document.getElementById(s+"r"+rownum+"c5").value;
var sec_value=document.getElementById("sec").value=document.getElementById(s+"r"+rownum+"c6").value;
   document.getElementById("pt").style.display="block";
   document.getElementById("pt").style.width="390px";
   document.getElementById("pt").style.marginBottom="5px";
   document.getElementById("pubt_txt").style.width="245px";
   document.getElementById("pubt_txt").style.float="right";
   document.getElementById("pq").style.width="390px";
   document.getElementById("pqos_lbl").style.paddingTop="10px";
   document.getElementById("pqos_lbl").style.width="145px";
   document.getElementById("pqos_lbl").style.float="left";
   document.getElementById("prtn_lbl").style.paddingTop="10px";
   document.getElementById("prtn_lbl").style.width="65px";
   document.getElementById("prtn_lbl").style.float="left";
    document.getElementById("prtn_lbl").style.paddingLeft="10px"; 
   document.getElementById("pqos_txt").style.width="245px";
   document.getElementById("pqos_txt").style.float="right";
   document.getElementById("prtn_txt").style.display="none";
   document.getElementById("prtn_lbl").style.display="none";
   document.getElementById("plaintext_div").style.display="none";
      cbtn.style.top="220px";
   sbtn.style.top="220px";
   document.getElementById("pt").style.display="block";
   document.getElementById("pt").style.width="390px";
   document.getElementById("pubt_txt").style.display="block";
   document.getElementById("pubt_txt").style.width="245px";
   document.getElementById("pubt_txt").style.float="right";
   document.getElementById("sm").style.display="block";
   document.getElementById("sm").style.width="390px";
   document.getElementById("sub_txt").style.display="block";
   document.getElementById("sub_txt").style.width="245px";
   document.getElementById("sub_txt").style.float="right";
   document.getElementById("prtn_txt").style.display="none";
   document.getElementById("prtn_lbl").style.display="none";
   document.getElementById("plaintext_div").style.display="none";
   document.getElementById("sub_txt").value=0;
   document.getElementById("pqos_txt").style.width="245px;"
   document.getElementById("tm").style.display="block";
   document.getElementById("tm").style.width="400px";
   document.getElementById("hr").style.width="48px";
   document.getElementById("min").style.width="48px";
   document.getElementById("sec").style.width="48px";
   document.getElementById("lbl1").style.display="block";
   document.getElementById("lbl1").style.width="32px";
   document.getElementById("lbl1").style.paddingLeft="10px";
   document.getElementById("lbl1").style.float="left";
   document.getElementById("lbl2").style.display="block";
   document.getElementById("lbl2").style.width="35px";
   document.getElementById("lbl2").style.paddingLeft="10px";
   document.getElementById("lbl2").style.paddingRight="5px";
   document.getElementById("lbl2").style.float="left";
   document.getElementById("lbl3").style.display="block";
   document.getElementById("lbl3").style.width="32px";
   document.getElementById("lbl3").style.paddingLeft="10px";
   document.getElementById("lbl3").style.float="left";
   document.getElementById("ptype").style.display="none";
     $("#pt").appendTo("#pubd2"); 
     $("#sm").appendTo("#pubd2"); 
     $("#tm").appendTo("#pubd2"); 
     $("#pq").appendTo("#pubd2"); 
     if ((hr_value=="-1") && (min_value=="-1") && (sec_value=="-1"))
{
  document.getElementById("sub_txt").value=0;
  document.getElementById("tm").style.display="none";
}
else
{
  document.getElementById("sub_txt").value=1;
  document.getElementById("tm").style.display="block";
}
   document.getElementById("plaintext_div").style.display="none";
   document.getElementById("sysvar_div").style.display="none";
   document.getElementById("rnd_div").style.display="none";
   document.getElementById("range_div").style.display="none";

   cbtn.style.left="310px";
   sbtn.style.left="190px";

     //document.getElementById("tm").style.display="none";
  document.getElementById("add_json").style.display="none";
$("#editdialog").dialog({ width:480,height:320,autoOpen: false, show: { effect: "blind", duration: 1000 }, hide: { effect: "blind", duration: 1000 }, close: function () {; }, title:"Edit Subscription Details" }).dialog("open");
}
else
{
   document.getElementById("tm").style.display="none";
   document.getElementById("sm").style.display="none";
   cbtn.style.top="305px";
   sbtn.style.top="305px";
   cbtn.style.left="330px";
   sbtn.style.left="180px";
   document.getElementById("sm").style.display="none";
   document.getElementById("tm").style.display="none";
   document.getElementById("pt").style.display="block";
   document.getElementById("pt").style.width="390px";
   document.getElementById("pt").style.marginBottom="5px";
   document.getElementById("pubt_txt").style.width="245px";
   document.getElementById("pubt_txt").style.float="right";
   document.getElementById("pq").style.width="390px";
   document.getElementById("pqos_lbl").style.paddingTop="10px";
   document.getElementById("pqos_lbl").style.width="145px";
   document.getElementById("pqos_lbl").style.float="left";
   document.getElementById("prtn_lbl").style.display="block";   
   document.getElementById("prtn_lbl").style.paddingTop="10px";
   document.getElementById("prtn_lbl").style.width="65px";
   document.getElementById("prtn_lbl").style.float="left"; 
   document.getElementById("prtn_lbl").style.paddingLeft="10px";   
   document.getElementById("pqos_txt").style.width="245px";
   document.getElementById("pqos_txt").style.float="right";

   document.getElementById("prtn_txt").style.marginTop="3px";
   document.getElementById("prtn_txt").style.width="245px";
   document.getElementById("prtn_txt").style.float="right";
   document.getElementById("pm").style.display="block";
   document.getElementById("pm").style.width="390px";
   document.getElementById("pm").style.paddingTop="65px";
   document.getElementById("pubm_txt").style.width="245px";
   document.getElementById("pubm_txt").style.float="right";
   document.getElementById("rt").style.width="390px";
   document.getElementById("rest_txt").style.width="245px";
   document.getElementById("rest_txt").style.float="right";
   document.getElementById("rm").style.width="390px";
   document.getElementById("resm_txt").style.width="245px";
   document.getElementById("resm_txt").style.float="right";
     $("#pm").appendTo("#pubd2"); 
  $("#rt").appendTo("#pubd2");
  $("#rm").appendTo("#pubd2");
  document.getElementById("add_json").style.display="none";
  document.getElementById("pubm_txt").disabled=false;
$("#editdialog").dialog({ width:500,height:400,autoOpen: false, show: { effect: "blind", duration: 1000 }, hide: { effect: "blind", duration: 1000 }, close: function () {; }, title:"Edit Request Response Details" }).dialog("open");

//$("#editdialog").dialog({ width:480,height:390,autoOpen: false, show: { effect: "blind", duration: 1000 }, hide: { effect: "blind", duration: 1000 }, close: function () {; }, title:"Edit Request Response Details" }).dialog("open");
}

//$( "#editdialog").dialog("open");
}



function fndrop(id1)
{
var btnid=id1;
var ind1=btnid.indexOf('drop');
var rownum=btnid.slice(3,ind1);
var d_id=btnid.slice(ind1+4);
id=d_id;
var dropflag=btnid.indexOf('pub');
var dropsub=btnid.indexOf('sub');
var sdrop;
if(dropflag != -1)
{
sdrop='pub';
document.getElementById("choice").value='droppmsg';
}
else if (dropsub != -1)
{
sdrop='sub';
document.getElementById("choice").value='dropsmsg';
}
else
{
sdrop='res';
document.getElementById("choice").value='droprmsg';
}
document.getElementById("d_name_txt").style.position="relative";
document.getElementById("d_desc_txt").value="";
document.getElementById("wtopic_txt").value="";
document.getElementById("wmsg_txt").value="";
document.getElementById("wqos_txt").value="0";
document.getElementById("wrtn_txt").value="0";
$("#d_name_txt").appendTo("#dn");
//$("#dn").appendTo("#myform");
$("#d_desc_txt").appendTo("#dd");
//$("#dd").appendTo("#myform");
$("#wtopic_txt").appendTo("#wt");
//$("#wt").appendTo("#myform");
$("#wmsg_txt").appendTo("#wm");
//$("#wm").appendTo("#myform");
$("#wqos_txt").appendTo("#wq");
//$("#wq").appendTo("#myform");
$("#wrtn_txt").appendTo("#wr");
//$("#wr").appendTo("#myform");

document.getElementById("paid_txt").value=rownum;
document.getElementById("pid_txt").value=d_id;
document.getElementById("pubt_txt").value=document.getElementById(sdrop+"r"+rownum+"c0").value;
document.getElementById("pubm_txt").value=document.getElementById(sdrop+"r"+rownum+"c1").value;
var qosstr=document.getElementById(sdrop+"r"+rownum+"c2").value;
var nqos=qosstr.search("0");
var qosvalue;
if (nqos>-1) qosvalue="0";
else
{
  var mqos=qosstr.search("1");
  if (mqos > -1) qosvalue="1";
  else qosvalue="2";
}
document.getElementById("pqos_txt").value=qosvalue;
var rtnstr=document.getElementById(sdrop+"r"+rownum+"c3").value;
var nrtn=rtnstr.search("0");
var rtnvalue;
if (nrtn>-1) rtnvalue="0";
else  rtnvalue="1";
document.getElementById("prtn_txt").value=rtnvalue;
$("#paid_txt").appendTo("#pa");
$("#pa").appendTo("#myform");
$("#pid_txt").appendTo("#pi");
$("#pi").appendTo("#myform");
$("#pubt_txt").appendTo("#pt");
$("#pt").appendTo("#myform");
$("#pubm_txt").appendTo("#pm");
$("#pm").appendTo("#myform");
$("#pqos_txt").appendTo("#pq");
$("#pq").appendTo("#myform");
$("#prtn_txt").appendTo("#pr");
$("#pr").appendTo("#myform");
$("#rest_txt").appendTo("#rt");
$("#rt").appendTo("#myform");
$("#resm_txt").appendTo("#rm");
$("#rm").appendTo("#myform");

var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
    async:false,
     success:function () {

    }
    
});
$("#paid_txt").appendTo("#pa");
$("#pid_txt").appendTo("#pi");
$("#pubt_txt").appendTo("#pt");
$("#pubm_txt").appendTo("#pm");
$("#pqos_txt").appendTo("#pq");
$("#prtn_txt").appendTo("#pr");

disp_detail(id);
}


function fnpublish(id1)
{

var btnid=id1;
var ind1=btnid.indexOf('msgs');
var rownum=btnid.slice(3,ind1);
var d_id=btnid.slice(ind1+4);
id=d_id;
var dropflag=btnid.indexOf('pub');
var dropsub=btnid.indexOf('sub');
var sdrop;
if(dropflag != -1)
{
sdrop='pub';
document.getElementById("choice").value='publishmsg';
}
else if (dropsub != -1)
{
sdrop='sub';
document.getElementById("choice").value='subscribemsg';
}
else
{
sdrop='res';
document.getElementById("choice").value='responsemsg';
}
document.getElementById("d1").style.display="none";

document.getElementById("d_name_txt").style.position="relative";
document.getElementById("d_desc_txt").value="";
document.getElementById("wtopic_txt").value="";
document.getElementById("wmsg_txt").value="";
document.getElementById("wqos_txt").value="0";
document.getElementById("wrtn_txt").value="0";


$("#d_name_txt").appendTo("#dn");
$("#d_desc_txt").appendTo("#dd");
$("#wtopic_txt").appendTo("#wt");
$("#wmsg_txt").appendTo("#wm");
$("#wqos_txt").appendTo("#wq");
$("#wrtn_txt").appendTo("#wr");
document.getElementById("paid_txt").value=rownum;
document.getElementById("pid_txt").value=d_id;
document.getElementById("pubt_txt").value=document.getElementById(sdrop+"r"+rownum+"c0").value;
document.getElementById("pubm_txt").value=document.getElementById(sdrop+"r"+rownum+"c1").value;
var qosstr=document.getElementById(sdrop+"r"+rownum+"c2").value;
var nqos=qosstr.search("0");
var qosvalue;
if (nqos>-1) qosvalue="0";
else
{
  var mqos=qosstr.search("1");
  if (mqos > -1) qosvalue="1";
  else qosvalue="2";
}
document.getElementById("pqos_txt").value=qosvalue;
var rtnstr=document.getElementById(sdrop+"r"+rownum+"c3").value;
var nrtn=rtnstr.search("0");
var rtnvalue;
if (nrtn>-1) rtnvalue="0";
else  rtnvalue="1";
document.getElementById("prtn_txt").value=rtnvalue;
var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
    async:false,
     success:function () {


    }
    
});
disp_detail(id);
}

function openMsg(evt, msg) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(msg).style.display = "block";
    evt.currentTarget.className += " active";
}
function fntexttype(val)
{
  if (val=="plaintext")
  {
    document.getElementById("plaintext_div").style.display="block";
    document.getElementById("sysvar_div").style.display="none"; 
    document.getElementById("range_div").style.display="none";
    document.getElementById("rnd_div").style.display="none";  
    $("#plaintext_div").appendTo("#pubd2");
  }
  else if (val=="systemvariable")
  {
    document.getElementById("sysvar_div").style.display="block";
    document.getElementById("plaintext_div").style.display="none";
    document.getElementById("range_div").style.display="none";
    document.getElementById("rnd_div").style.display="none";
    $("#sysvar_div").appendTo("#pubd2");
  }
  else if (val=="random")
  {
    document.getElementById("range_div").style.display="none";
    document.getElementById("rnd_div").style.display="block";
    document.getElementById("sysvar_div").style.display="none";
    document.getElementById("plaintext_div").style.display="none";   
    $("#rnd_div").appendTo("#pubd2"); 
  }
  else if (val=="range")
  {
    document.getElementById("range_div").style.display="block";
    document.getElementById("rnd_div").style.display="none";
    document.getElementById("sysvar_div").style.display="none";
    document.getElementById("plaintext_div").style.display="none";    
    $("#range_div").appendTo("#pubd2");
  }
}
function fnjsontexttype(val)
{
  var acc_type=val.indexOf("plaintext");
  var par_type="plaintext";
  if (acc_type>-1)
    par_type="plaintext";
  else 
  {
    acc_type=val.indexOf("system_var");
    if (acc_type>-1)
      par_type="system_var";
    else
    {
      acc_type=val.indexOf("pipe_txt");
      if (acc_type>-1)
        par_type="pipe_txt";
      else
        par_type="range";
    }
  }

  var acc_parameter_no=val.substring(par_type.length,val.length);
  if (par_type=="plaintext")
  {
    document.getElementById("plaintext"+acc_parameter_no).style.display="block";
    document.getElementById("system_var"+acc_parameter_no).style.display="none"; 
    document.getElementById("start_value"+acc_parameter_no).style.display="none";
    document.getElementById("end_value"+acc_parameter_no).style.display="none";
    document.getElementById("lblto"+acc_parameter_no).style.display="none";
    document.getElementById("pipe_txt"+acc_parameter_no).style.display="none";  
    document.getElementById("pipe_txt"+acc_parameter_no).style.display="none";

    //$("#plaintext_div").appendTo("#pubd2");
  }
  else if (par_type=="system_var")
  {
    document.getElementById("system_var"+acc_parameter_no).style.display="block";
    document.getElementById("plaintext"+acc_parameter_no).style.display="none";
    document.getElementById("start_value"+acc_parameter_no).style.display="none";
    document.getElementById("end_value"+acc_parameter_no).style.display="none";
    document.getElementById("lblto"+acc_parameter_no).style.display="none";
    document.getElementById("pipe_txt"+acc_parameter_no).style.display="none";

    //$("#sysvar_div").appendTo("#pubd2");
  }
  else if (par_type=="pipe_txt")
  {
    document.getElementById("start_value"+acc_parameter_no).style.display="none";
    document.getElementById("end_value"+acc_parameter_no).style.display="none";
    document.getElementById("lblto"+acc_parameter_no).style.display="none";
    document.getElementById("pipe_txt"+acc_parameter_no).style.display="block";
    document.getElementById("system_var"+acc_parameter_no).style.display="none";
    document.getElementById("plaintext"+acc_parameter_no).style.display="none";   
    //$("#rnd_div").appendTo("#pubd2"); 
  }
  else if (par_type=="range")
  {
    document.getElementById("start_value"+acc_parameter_no).style.display="block";
    document.getElementById("end_value"+acc_parameter_no).style.display="block";
    document.getElementById("lblto"+acc_parameter_no).style.display="block";
    document.getElementById("pipe_txt"+acc_parameter_no).style.display="none";
    document.getElementById("system_var"+acc_parameter_no).style.display="none";
    document.getElementById("plaintext"+acc_parameter_no).style.display="none";    
    //$("#range_div").appendTo("#pubd2");
  }
}

function fnmsgtype(chkid)
{
  var current_chk=document.getElementById(chkid).checked;
  var other="";
  if (chkid=="text_check")
    other="json_check";
  else
    other="text_check";
  if (current_chk==false)
    document.getElementById(other).checked=true;
  else
    document.getElementById(other).checked=false;
  var text_chk=document.getElementById("text_check").checked;
  var json_chk=document.getElementById("json_check").checked;
  if (text_chk==true)
  {
    val="text";
    document.getElementById("add_json").style.display="none";
    document.getElementById("pub_cancel").style.top=document.getElementById("pub_update").style.top="340px";
    document.getElementById("pub_cancel").style.left="180px";
    document.getElementById("pub_update").style.left="350px";
        json_msg=false;
  }
  else
  {
    val="json";
      if ($('#json_table tr').length==1)
    document.getElementById("add_json").style.display="block";
    else
          document.getElementById("add_json").style.display="none";


    //document.getElementById("add_json").style.display="block";
    if (s=="addpub")
    document.getElementById("add_json").style.top="217px";
    document.getElementById("pub_cancel").style.top=document.getElementById("pub_update").style.top="375px";
      var cbtn=document.getElementById("pub_cancel");
  var sbtn=document.getElementById("pub_update");
  cbtn.style.top=pub_initial_top+"px";
  sbtn.style.top=pub_initial_top+"px";
/*
    if (json_parameter_count<=1)
    {
      document.getElementById("pub_cancel").style.left="550px";
      document.getElementById("pub_update").style.left="480px";
    }*/
    //document.getElementById("pub_update").style.position="fixed";
    json_msg=true;

  }
  if (val=="text")
  {
    document.getElementById("rndrange_div").style.display="block";
    document.getElementById("plaintext_div").style.display="block";
    document.getElementById("rnd_div").style.display="none";
    document.getElementById("json_div").style.display="none";
        json_msg=false;

  }
  else
  {
    document.getElementById("rndrange_div").style.display="none";
    document.getElementById("plaintext_div").style.display="none";
    document.getElementById("sysvar_div").style.display="none";
    document.getElementById("rnd_div").style.display="none";
    document.getElementById("range_div").style.display="none";
    document.getElementById("json_div").style.display="block";
    //document.getElementById("rnd_div").style.display="none";
    //document.getElementById("rndrange_div").style.display="none";
    json_msg=true;
    //document.getElementById("par_div").style.display="block";
    //document.getElementById("par_txt_div").style.display="block";
  }
}
function fnjsonmsgupdate()
{
  if ($('#json_table tr').length==1)
  {
    no_parameter=true;
    alert("No parameter is specified. Add a parameter.")
    document.getElementById("pubm_txt").value="";
    document.getElementById("json_pubm_txt").value="";
    document.getElementById("message_type").value="";
  }
  else
  {
    var empty=false;
    var mm="{";
    var dbmm="{";
    for (var p=0;p<json_parameter_count;p++)
    {
      if (json_row_number[p]>0)
      {
      var pm=document.getElementById("parameter"+p).value;
      if (pm.trim()=="")
      {
        alert("Parameter is empty");
        empty=true;
        break;
      }
      mm=mm+'"'+pm+'":';
      dbmm=dbmm+'"'+pm+'":';
      var vtype=document.getElementById("json_text_type"+p).value;
      var vtext="";
      var mtype="plaintext";
      if (vtype.indexOf("plaintext")>-1)
      {
        vtext=document.getElementById("plaintext"+p).value;
        mtype="plaintext";
      }
      else if (vtype.indexOf("system_var")>-1)
      {
        vtext=document.getElementById("system_var"+p).value;
        mtype="systemvariable";
      }
      else if (vtype.indexOf("pipe_txt")>-1)
      {
        vtext=document.getElementById("pipe_txt"+p).value;
        mtype="random";
      }
      else
      {
        st_value=parseInt(document.getElementById("start_value"+p).value);
        e_value=parseInt(document.getElementById("end_value"+p).value);
        if (st_value>e_value)
        {
          improper_range=true;
          break;
        }
        vtext=document.getElementById("start_value"+p).value+" - "+document.getElementById("end_value"+p).value;
        mtype="range";
      }
      if (vtext.length==0)
      {
        empty=true;
        break;
      }
      if (p==json_parameter_count-1)
      {
        mm+='"'+vtext+'"}';
        dbmm+='{"type":"'+mtype+'","msg":"'+vtext+'"}}';
      }
      else
      {
        mm+='"'+vtext+'"},';
        dbmm+='{"type":"'+mtype+'","msg":"'+vtext+'"},';
      }
      }
    }
    if ((empty==true) || (improper_range==true))
    {
      if (improper_range==true)
        alert("Improper Range");
      document.getElementById("pubm_txt").value="";
      document.getElementById("json_pubm_txt").value="";
      document.getElementById("message_type").value="";

    }
    else
    {
      if (mm.substring(mm.length-1)==",")
      {
        document.getElementById("pubm_txt").value=mm.substring(0,mm.length-1)+"}";
        document.getElementById("json_pubm_txt").value=dbmm.substring(0,mm.length-1)+"}";
        document.getElementById("message_type").value=5+"";

      }
      else
      {
        document.getElementById("pubm_txt").value=mm;
        document.getElementById("json_pubm_txt").value=dbmm;
        document.getElementById("message_type").value=5+"";
      }
    }
  }
}
function fnrulecancel()
{
$("#add_devdialog").dialog("close");

}
function fnmsgcancel()
{
}
$("#json_table").delegate("tr", "click", function(e) {
    alert($(e.currentTarget).index() + 1);
});
function fnjsondelete(del_id)
{
  var row=parseInt(del_id.substring(3));
  var jtable=document.getElementById("json_table");
    var count = $('#json_table tr').length;

  jtable.deleteRow(json_row_number[row]);
  json_row_number[row]=-1;
  for (var vj=row+1;vj<json_parameter_count;vj++)
    json_row_number[vj]--;
  add_json_initial_top-=30;
  var add_visible=false;
  for (var vj=0;vj<json_parameter_count;vj++)
  {
    if (document.getElementById("add"+vj))
    {
      if ((document.getElementById("add"+vj)).style.display=="block")
      {
        add_visible=true;
        break;
      }
    }
  }
  if (add_visible==false)
  {
    for(var iv=last_added;iv>=0;iv--)
    {
      if (document.getElementById("add"+iv))
      {
        document.getElementById("add"+iv).style.display="block";
        last_added=iv;
        break;
      }
    }
  }



  //json_parameter_count--;
  //document.getElementById("add_json").style.top=add_json_initial_top+"px";
  pub_initial_top-=30;
  var cbtn=document.getElementById("pub_cancel");
  var sbtn=document.getElementById("pub_update");
  cbtn.style.top=pub_initial_top+"px";
  sbtn.style.top=pub_initial_top+"px";
  if ($('#json_table tr').length==1)
    document.getElementById("add_json").style.display="block";
}
function fnaddjson(tid)
{
  document.getElementById("add_json").style.display="none";
  var json_table=document.getElementById("json_table");
  var count = $('#json_table tr').length;
  if (tid!="-1")
  {
    if (document.getElementById(tid))
    document.getElementById(tid).style.display="none";
  }
  
  var json_row=json_table.insertRow(count);
  var json_par_column=json_row.insertCell(0);
  json_par_column.innerHTML="<input type=textbox id=parameter"+json_parameter_count+" name=parameter"+json_parameter_count+" class=form-control style='display:block;width:125px;' placeholder='Key'>";
  var json_type_column=json_row.insertCell(1);
  json_type_column.innerHTML="";
  var s='<select class=form-control id=json_text_type'+json_parameter_count+' name=json_text_type'+json_parameter_count+' onchange="fnjsontexttype(this.value);">\
          <option value=plaintext'+json_parameter_count+' selected>Constant</option>\
          <option value=system_var'+json_parameter_count+'>System Variables</option>\
          <option value=pipe_txt'+json_parameter_count+'>RANDOM</option>\
          <option value=range'+json_parameter_count+'>RANGE</option>\
          </select>';
  json_type_column.innerHTML=s;      
  var json_value_column=json_row.insertCell(2);
  json_value_column.innerHTML="<input type=textbox id=plaintext"+json_parameter_count+" name=plaintext"+json_parameter_count+" class=form-control placeholder='Constant' style=display:block>";
  json_value_column.innerHTML+='<select class="form-control" id=system_var'+json_parameter_count+' name=system_var'+json_parameter_count+' style="display:none;float:right;">\
          <option value="$Client_uptime">$Client_uptime</option>\
          <option value="$Current_time">$Current_time</option>\
          <option value="$Client_ID">$Client_ID</option>\
          </select>';
  json_value_column.innerHTML+='<input type=textbox class="form-control" id=pipe_txt'+json_parameter_count+' name=pipe_txt'+json_parameter_count+' style="display:none;float:right;" placeholder="Pipe Separated Eg: ON | OFF" tabindex=10></input>';
  json_value_column.innerHTML+='<input type=number class="form-control" max=100 min=-100 id=start_value'+json_parameter_count+' name=start_value'+json_parameter_count+' style="width:100px;padding-left:5px;float:left;display:none" value=-100 tabindex=22></input>\
          <label for="lbl23" id=lblto'+json_parameter_count+' name=lblto'+json_parameter_count+' class="form-control" style="text-align:center;width:28px;float:left;display:none;border:none;" >-</label>\
          <input type=number max=100 class="form-control" min=-100 id=end_value'+json_parameter_count+' name=end_value'+json_parameter_count+' style="padding-left:5px;padding-right:5px;width:100px;float:left;display:none" value=100></input>';
  json_value_column.innerHTML+='<input type=textbox class="form-control" id=type_txt'+json_parameter_count+' name=type_txt'+json_parameter_count+' style="display:none;width:260px;float:right;"></input>\
          ';

  var json_action_column=json_row.insertCell(3);
  json_action_column.innerHTML="<img src='/images/dbdrop.png' id=del"+json_parameter_count+" name=del"+json_parameter_count+" style='width:20px;height:20px;cursor:pointer;' onclick='fnjsondelete(this.id)'>";
  var json_action_column=json_row.insertCell(4);
  json_action_column.innerHTML="<img src='/images/plus.png' id=add"+json_parameter_count+" name=add"+json_parameter_count+" style='display:block;width:20px;height:20px;cursor:pointer;' onclick='fnaddjson(this.id)'>";

  json_row_number[json_parameter_count]=count;
  if (document.getElementById("add"+(json_parameter_count-1)))
  document.getElementById("add"+(json_parameter_count-1)).style.display="none";
  last_added=json_parameter_count;
  json_parameter_count++;
add_json_initial_top+=30;
  //document.getElementById("add_json").style.top=add_json_initial_top+"px";
  pub_initial_top+=30;
  var cbtn=document.getElementById("pub_cancel");
  var sbtn=document.getElementById("pub_update");
  cbtn.style.top=pub_initial_top+"px";
  sbtn.style.top=pub_initial_top+"px";

}
function fnaddpub(id1)
{
if(id1=="pubimg")
{
s="addpub";
     var json_table=document.getElementById("json_table");
   while(json_table.rows[1]) json_table.deleteRow(1);
   json_parameter_count=0;
  var count = $('#json_table tr').length;
  var json_row=json_table.insertRow(count);
  var json_par_column=json_row.insertCell(0);
  json_par_column.innerHTML="<input type=textbox id=parameter"+json_parameter_count+" name=parameter"+json_parameter_count+" class=form-control style='display:block;width:125px;' placeholder='Key'>";
  var json_type_column=json_row.insertCell(1);
  json_type_column.innerHTML="";
  var sl='<select class=form-control id=json_text_type'+json_parameter_count+' name=json_text_type'+json_parameter_count+' onchange="fnjsontexttype(this.value);">\
          <option value=plaintext'+json_parameter_count+' selected>Constant</option>\
          <option value=system_var'+json_parameter_count+'>System Variables</option>\
          <option value=pipe_txt'+json_parameter_count+'>RANDOM</option>\
          <option value=range'+json_parameter_count+'>RANGE</option>\
          </select>';
  json_type_column.innerHTML=sl;      
  var json_value_column=json_row.insertCell(2);
  json_value_column.innerHTML="<input type=textbox id=plaintext"+json_parameter_count+" name=plaintext"+json_parameter_count+" class=form-control placeholder='Constant' style=display:block>";
  json_value_column.innerHTML+='<select class="form-control" id=system_var'+json_parameter_count+' name=system_var'+json_parameter_count+' style="display:none;float:right;">\
          <option value="$Client_uptime">$Client_uptime</option>\
          <option value="$Current_time">$Current_time</option>\
          <option value="$Client_ID">$Client_ID</option>\
          </select>';
  json_value_column.innerHTML+='<input type=textbox class="form-control" id=pipe_txt'+json_parameter_count+' name=pipe_txt'+json_parameter_count+' style="display:none;float:right;" placeholder="Pipe Separated Eg: ON | OFF" tabindex=10></input>';
  json_value_column.innerHTML+='<input type=number class="form-control" max=100 min=-100 id=start_value'+json_parameter_count+' name=start_value'+json_parameter_count+' style="width:100px;padding-left:5px;float:left;display:none" value=-100 tabindex=22></input>\
          <label for="lbl23" id=lblto'+json_parameter_count+' name=lblto'+json_parameter_count+' class="form-control" style="text-align:center;width:28px;float:left;display:none;border:none;" >-</label>\
          <input type=number max=100 class="form-control" min=-100 id=end_value'+json_parameter_count+' name=end_value'+json_parameter_count+' style="padding-left:5px;padding-right:5px;width:100px;float:left;display:none" value=100></input>';
  json_value_column.innerHTML+='<input type=textbox class="form-control" id=type_txt'+json_parameter_count+' name=type_txt'+json_parameter_count+' style="display:none;width:260px;float:right;"></input>\
          ';

  var json_action_column=json_row.insertCell(3);
  json_action_column.innerHTML="<img src='/images/dbdrop.png' id=del"+json_parameter_count+" name=del"+json_parameter_count+" style='width:20px;height:20px;cursor:pointer;' onclick='fnjsondelete(this.id)'>";
  var json_action_column=json_row.insertCell(4);
  json_action_column.innerHTML="<img src='/images/plus.png' id=add"+json_parameter_count+" name=add"+json_parameter_count+" style='display:block;width:20px;height:20px;cursor:pointer;' onclick='fnaddjson(this.id)'>";
  last_added=json_parameter_count;
  json_row_number=new Array();
  json_row_number[json_parameter_count]=1;

json_parameter_count++;
  add_json_initial_top=220;
  pub_initial_top=340;
   document.getElementById("add_json").style.top=add_json_initial_top+"px";


 }
else if(id1=="subimg")
{
s="addsub";
}
else if(id1=="resimg")
{
s="addres";
}
var cbtn=document.getElementById("pub_cancel");
var sbtn=document.getElementById("pub_update");


	document.getElementById("editdialog").style.display="block";
	document.getElementById("pubd2").style.display="block";
	document.getElementById("editdialog").style.display="block";
	document.getElementById("paid_txt").value="";
	//document.getElementById("pubt_txt").value="";
	document.getElementById("pubm_txt").value="";
	document.getElementById("pa").style.display="none";
	document.getElementById("pi").style.display="none";
      document.getElementById("tm").style.display="block";
  document.getElementById("tm").style.width="400px";

	document.getElementById("pt").style.display="block";
    document.getElementById("sm").style.display="block";
  document.getElementById("sm").style.width="490px";
  document.getElementById("sub_txt").style.display="block";
  document.getElementById("hr").style.display="block";
  document.getElementById("min").style.display="block";
  document.getElementById("sec").style.display="block";
  //document.getElementById("hr").value=0;
  //document.getElementById("min").value=0;
  //document.getElementById("sec").value=0;
	document.getElementById("pq").style.display="block";
  document.getElementById("pq").style.width="490px";

	document.getElementById("pr").style.display="block";
	document.getElementById("paid_txt").style.display="block";
	document.getElementById("pid_txt").style.display="block";
	document.getElementById("pubt_txt").style.display="block";
	document.getElementById("pubm_txt").style.display="block";
	document.getElementById("pubt_txt").style.width="345px";
	document.getElementById("pubm_txt").style.width="245px";
	document.getElementById("pubt_txt").style.float="right";
	document.getElementById("pubm_txt").style.float="right";
  document.getElementById("sub_txt").style.display="block";
  document.getElementById("sub_txt").style.width="345px";
  document.getElementById("sub_txt").style.float="right";
  document.getElementById("lbl1").style.width="85px";
  document.getElementById("lbl1").style.paddingLeft="15px";
  document.getElementById("lbl1").style.float="left";
  document.getElementById("lbl1").style.display="block";
  document.getElementById("min").style.width="78px";
  document.getElementById("min").style.float="left";
  document.getElementById("min").style.display="block";
  document.getElementById("lbl2").style.paddingLeft="15px";
  document.getElementById("lbl2").style.paddingRight="5px";
  document.getElementById("lbl2").style.width="38px";
  document.getElementById("lbl2").style.float="left";
  document.getElementById("lbl2").style.display="block";
  document.getElementById("sec").style.width="78px";
  document.getElementById("sec").style.float="left";
  document.getElementById("sec").style.display="block";
  document.getElementById("pub_lbl").style.visibility="visible";
	document.getElementById("pqos_txt").style.display="block";
	document.getElementById("prtn_txt").style.display="block";
	document.getElementById("pqos_txt").style.width="150px";
	document.getElementById("prtn_txt").style.width="130px";
	document.getElementById("pqos_txt").style.float="left";
	document.getElementById("prtn_txt").style.float="left";
  document.getElementById("pm").style.display="none";
  document.getElementById("range_div").style.display="none";
  document.getElementById("json_div").style.display="none";
  document.getElementById("text_check").selected=true;
  document.getElementById("json_check").selected=false;

	$("#pqos_txt").val("0");
	$("#prtn_txt").val("0");

$("#paid_txt").appendTo("#pa");

$("#pid_txt").appendTo("#pi");
$("#pubt_txt").appendTo("#pt");
$("#pubm_txt").appendTo("#pm");
$("#sub_txt").appendTo("#sm");
$("#hr").appendTo("#tm");
$("#lbl1").appendTo("#tm");
$("#min").appendTo("#tm");
$("#lbl2").appendTo("#tm");
$("#sec").appendTo("#tm");
$("#lbl3").appendTo("#tm");
$("#pqos_txt").appendTo("#pq");
$("#prtn_txt").appendTo("#pq");
if (s=='addres')
{
$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");

}

$("#pa").appendTo("#pubd2");
$("#pi").appendTo("#pubd2");
$("#tm").appendTo("#pubd2");
$("#pt").appendTo("#pubd2");
$("#pq").appendTo("#pubd2");
//$("#pr").appendTo("#pubd2");
//$("#pm").appendTo("#pubd2");
$("#sm").appendTo("#pubd2")
$("#pubbtn").appendTo("#dialog_wrapper1");
if (s=='addres')
{
$("#rt").appendTo("#pubd2");
$("#rm").appendTo("#pubd2");

}
$("#pubd2").appendTo("#dialog_wrapper1");
$("#dialog_wrapper1").appendTo("#editdialog");
	document.getElementById("pid_txt").value=document.getElementById("d_name").value;
	if (s=="addsub")
	{
		document.getElementById("pm").style.display="none";
		document.getElementById("pr").style.display="none";
    document.getElementById("sm").style.display="block";
      document.getElementById("sub_txt").style.display="block";
  document.getElementById("sub_txt").style.width="295px";
  document.getElementById("sub_txt").style.float="right";
document.getElementById("rndrange_div").style.display="none";
	}
	else
	{
		//document.getElementById("pm").style.display="block";
    document.getElementById("pm").style.display="none";
    document.getElementById("tm").style.display="block";
		document.getElementById("pr").style.display="block";
	document.getElementById("pubm_txt").style.display="block";
	document.getElementById("prtn_txt").style.display="block";
	document.getElementById("pm").style.width="490px";
    document.getElementById("tm").style.width="600px";
	document.getElementById("pt").style.width="490px";
	document.getElementById("pubm_txt").style.width="225px";
	document.getElementById("prtn_txt").style.width="130px";
  document.getElementById("pqos_txt").style.width="150px";
	document.getElementById("pubm_txt").style.float="left";
	document.getElementById("prtn_txt").style.float="left";
  document.getElementById("ptype").style.display="block";
  document.getElementById("rndrange_div").style.display="block";
	}
	if (s=="addres")
	{
		document.getElementById("rest_txt").value="";
		document.getElementById("resm_txt").value="";	
		document.getElementById("rt").style.display="block";
		document.getElementById("rm").style.display="block";
	document.getElementById("rest_txt").style.display="block";
	document.getElementById("resm_txt").style.display="block";

	document.getElementById("rm").style.width="490px";
	document.getElementById("rt").style.width="490px";
	document.getElementById("rest_txt").style.width="295px";
	document.getElementById("resm_txt").style.width="295px";
	document.getElementById("rest_txt").style.float="right";
	document.getElementById("resm_txt").style.float="right";

$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");


	}
	else
	{
		document.getElementById("rt").style.display="none";
		document.getElementById("rm").style.display="none";
		
	}
$("#paid_txt").appendTo("#pa");

$("#pid_txt").appendTo("#pi");
$("#pubt_txt").appendTo("#pt");
$("#pubm_txt").appendTo("#pm");
$("#pqos_lbl").appendTo("#pq");
$("#pqos_txt").appendTo("#pq");
$("#prtn_lbl").appendTo("#pq");
$("#prtn_txt").appendTo("#pq");
if (s=='addres')
{
$("#rest_txt").appendTo("#rt");
$("#resm_txt").appendTo("#rm");

}

$("#pa").appendTo("#pubd2");
$("#pi").appendTo("#pubd2");
$("#tm").appendTo("#pubd2");
$("#pt").appendTo("#pubd2");
$("#sm").appendTo("#pubd2");
$("#pq").appendTo("#pubd2");
$("#ptype").appendTo("#pubd2");
$("#rndrange_div").appendTo("#pubd2");
$("#plaintext_div").appendTo("#pubd2");
$("#json_div").appendTo("#pubd2");
//$("#pr").appendTo("#pubd2");
//$("#pm").appendTo("#pubd2");
$("#par_div").appendTo("#pubd2");
$("#par_txt_div").appendTo("#pubd2");


if (s=='addres')
{
  document.getElementById("pubm_txt").disabled=false;
  document.getElementById("pm").style.display="block";
  document.getElementById("ptype").style.display="none";
  document.getElementById("msg_type_div").style.display="none";
  document.getElementById("rndrange_div").style.display="none";
  document.getElementById("plaintext_div").style.display="none";
  document.getElementById("pt").style.width="390px";
  document.getElementById("pubt_txt").style.width="245px";
  document.getElementById("pubt_txt").style.float="right";
  document.getElementById("pm").style.width="390px";
  document.getElementById("pubt_txt").style.width="245px";
  document.getElementById("pubt_txt").style.float="right";  
      document.getElementById("rt").style.display="block";
    document.getElementById("rm").style.display="block";

  $("#pm").appendTo("#pubd2"); 
  $("#rt").appendTo("#pubd2");
  $("#rm").appendTo("#pubd2");
}
$("#pubd2").appendTo("#dialog_wrapper1");
$("#dialog_wrapper1").appendTo("#editdialog");
	    id=document.getElementById("pid_txt").value;
document.getElementById("pid_txt").tabIndex=-1;
	    document.getElementById("dialog_wrapper1").style.display="block";
	    document.getElementById("pubd2").style.display="block";
	document.getElementById("pt").style.width="490px";
	document.getElementById("pm").style.width="590px";
	document.getElementById("pq").style.width="590px";
	document.getElementById("pr").style.width="590px";
  document.getElementById("tm").style.width="600px";
    document.getElementById("sm").style.width="590px";


 document.getElementById("editdialog").style.display="block";
if (s=="addpub")
{
  document.getElementById("text_check").checked=true;
  document.getElementById("json_check").checked=false;
  document.getElementById("text_check").disabled=false;
  document.getElementById("json_check").disabled=false;
    var msg_selected=document.getElementById("json_check").checked;
  if (msg_selected==true)
  {
 //  cbtn.style.top="440px";
 //  sbtn.style.top="440px";
   document.getElementById("tm").style.display="block";
   document.getElementById("tm").style.width="600px";
   document.getElementById("sm").style.display="none";
   document.getElementById("pipe_txt").value="";
   document.getElementById("sysvar_div").style.display="none";
   document.getElementById("rnd_div").style.display="none";
   document.getElementById("range_div").style.display="none";
   document.getElementById("rndrange_div").style.display="none";
   document.getElementById("json_text_type0").value="plaintext";
   document.getElementById("plaintext_div").style.display="none";
   var json_table=document.getElementById("json_table");
   while(json_table.rows[1]) json_table.deleteRow(1);
   json_parameter_count=0;
  var count = $('#json_table tr').length;
  var json_row=json_table.insertRow(count);
  var json_par_column=json_row.insertCell(0);
  json_par_column.innerHTML="<input type=textbox id=parameter"+json_parameter_count+" name=parameter"+json_parameter_count+" class=form-control style='display:block;width:125px;' placeholder='Key'>";
  var json_type_column=json_row.insertCell(1);
  json_type_column.innerHTML="";
  var sl='<select class=form-control id=json_text_type'+json_parameter_count+' name=json_text_type'+json_parameter_count+' onchange="fnjsontexttype(this.value);">\
          <option value=plaintext'+json_parameter_count+' selected>Constant</option>\
          <option value=system_var'+json_parameter_count+'>System Variables</option>\
          <option value=pipe_txt'+json_parameter_count+'>RANDOM</option>\
          <option value=range'+json_parameter_count+'>RANGE</option>\
          </select>';
  json_type_column.innerHTML=sl;      
  var json_value_column=json_row.insertCell(2);
  json_value_column.innerHTML="<input type=textbox id=plaintext"+json_parameter_count+" name=plaintext"+json_parameter_count+" class=form-control placeholder='Constant' style=display:block>";
  json_value_column.innerHTML+='<select class="form-control" id=system_var'+json_parameter_count+' name=system_var'+json_parameter_count+' style="display:none;float:right;">\
          <option value="$Client_uptime">$Client_uptime</option>\
          <option value="$Current_time">$Current_time</option>\
          <option value="$Client_ID">$Client_ID</option>\
          </select>';
  json_value_column.innerHTML+='<input type=textbox class="form-control" id=pipe_txt'+json_parameter_count+' name=pipe_txt'+json_parameter_count+' style="display:none;float:right;" placeholder="Pipe Separated Eg: ON | OFF" tabindex=10></input>';
  json_value_column.innerHTML+='<input type=number class="form-control" max=100 min=-100 id=start_value'+json_parameter_count+' name=start_value'+json_parameter_count+' style="width:100px;padding-left:5px;float:left;display:none" value=-100 tabindex=22></input>\
          <label for="lbl23" id=lblto'+json_parameter_count+' name=lblto'+json_parameter_count+' class="form-control" style="text-align:center;width:28px;float:left;display:none;border:none;" >-</label>\
          <input type=number max=100 class="form-control" min=-100 id=end_value'+json_parameter_count+' name=end_value'+json_parameter_count+' style="padding-left:5px;padding-right:5px;width:100px;float:left;display:none" value=100></input>';
  json_value_column.innerHTML+='<input type=textbox class="form-control" id=type_txt'+json_parameter_count+' name=type_txt'+json_parameter_count+' style="display:none;width:260px;float:right;"></input>\
          ';

  var json_action_column=json_row.insertCell(3);
  json_action_column.innerHTML="<img src='/images/dbdrop.png' id=del"+json_parameter_count+" name=del"+json_parameter_count+" style='width:20px;height:20px;cursor:pointer;' onclick='fnjsondelete(this.id)'>";
  var json_action_column=json_row.insertCell(4);
  json_action_column.innerHTML="<img src='/images/plus.png' id=add"+json_parameter_count+" name=add"+json_parameter_count+" style='display:block;width:20px;height:20px;cursor:pointer;' onclick='fnaddjson(this.id)'>";
  last_added=json_parameter_count;
  json_row_number=new Array();
  json_row_number[json_parameter_count]=1;

json_parameter_count++;
  add_json_initial_top=220;
  pub_initial_top=340;
   document.getElementById("json_div").style.display="block";
   document.getElementById("add_json").style.display="none";
   document.getElementById("add_json").style.top=add_json_initial_top+"px";
//$("#add_json").appendTo("#pubd2");
$("#pubd2").appendTo("#dialog_wrapper1");
$("#dialog_wrapper1").appendTo("#editdialog");
   cbtn.style.top="340px";
   sbtn.style.top="340px";
  $("#editdialog").dialog({ width:700,height:450,autoOpen: false, show: { effect: "blind", duration: 1000 }, hide: { effect: "blind", duration: 1000 }, close: function () {; }, title:"Add New Publish Message Details" }).dialog("open");
  }
  else
  {
   cbtn.style.top="380px";
   sbtn.style.top="380px";
   document.getElementById("tm").style.display="block";
   document.getElementById("pipe_txt").value="";
   document.getElementById("sysvar_div").style.display="none";
   document.getElementById("rnd_div").style.display="none";
   document.getElementById("range_div").style.display="none";
   document.getElementById("rndrange_div").style.display="block";
   document.getElementById("text_type").value="plaintext";
   document.getElementById("plaintext_div").style.display="block";
   document.getElementById("sm").style.display="none";
   document.getElementById("json_div").style.display="none";
      document.getElementById("add_json").style.display="none";
$("#msg_type_div").appendTo("#pubd2");
$("#rndrange_div").appendTo("#pubd2");
$("#plaintext_div").appendTo("#pubd2");
document.getElementById("ptype").style.display="block";
//$("#ptype").appendTo("#pubd2");
  $("#editdialog").dialog({ width:700,height:540,autoOpen: false, show: { effect: "blind", duration: 1000 }, hide: { effect: "blind", duration: 1000 }, close: function () {; }, title:"Add New Publish Message Details" }).dialog("open");
  }
}
else if (s=="addsub")
{
   cbtn.style.top="220px";
   sbtn.style.top="220px";
   cbtn.style.left="300px";
   sbtn.style.left="200px";
   document.getElementById("pt").style.display="block";
   document.getElementById("pt").style.width="390px";
   document.getElementById("pubt_txt").style.display="block";
   document.getElementById("pubt_txt").style.width="245px";
   document.getElementById("pubt_txt").style.float="right";
   document.getElementById("sm").style.display="block";
   document.getElementById("sm").style.width="390px";
   document.getElementById("sub_txt").style.display="block";
   document.getElementById("sub_txt").style.width="245px";
   document.getElementById("sub_txt").style.float="right";
   document.getElementById("prtn_txt").style.display="none";
   document.getElementById("prtn_lbl").style.display="none";
   document.getElementById("plaintext_div").style.display="none";
   document.getElementById("sysvar_div").style.display="none";
   document.getElementById("rnd_div").style.display="none";
   document.getElementById("range_div").style.display="none";
   document.getElementById("sub_txt").value=0;
   document.getElementById("pq").style.display="block";
   document.getElementById("pq").style.width="390px";
   document.getElementById("pqos_txt").style.display="block";
   document.getElementById("pqos_txt").style.width="245px";
   document.getElementById("pqos_txt").style.float="right";
   document.getElementById("tm").style.display="block";
   document.getElementById("tm").style.width="400px";
   document.getElementById("hr").style.width="48px";
   document.getElementById("min").style.width="48px";
   document.getElementById("sec").style.width="48px";
   document.getElementById("lbl1").style.display="block";
   document.getElementById("lbl1").style.width="32px";
   document.getElementById("lbl1").style.paddingLeft="10px";
   document.getElementById("lbl1").style.float="left";
   document.getElementById("lbl2").style.display="block";
   document.getElementById("lbl2").style.width="35px";
   document.getElementById("lbl2").style.paddingLeft="10px";
   document.getElementById("lbl2").style.paddingRight="5px";
   document.getElementById("lbl2").style.float="left";
   document.getElementById("lbl3").style.display="block";
   document.getElementById("lbl3").style.width="32px";
   document.getElementById("lbl3").style.paddingLeft="10px";
   document.getElementById("lbl3").style.float="left";
   document.getElementById("ptype").style.display="none";
   document.getElementById("add_json").style.display="none";
   document.getElementById("ptype").style.display="none";
     $("#pt").appendTo("#pubd2"); 
     $("#sm").appendTo("#pubd2"); 
     $("#tm").appendTo("#pubd2"); 
     $("#pq").appendTo("#pubd2"); 
     document.getElementById("tm").style.display="none";


   //document.getElementById("pub_lbl").style.visibility="hidden";
$("#editdialog").dialog({ width:480,height:340,autoOpen: false, show: { effect: "blind", duration: 1000 }, hide: { effect: "blind", duration: 1000 }, close: function () {; }, title:"Add New Subscription Details" }).dialog("open");
}
else
{
   cbtn.style.top="305px";
   sbtn.style.top="305px";
   cbtn.style.left="330px";
   sbtn.style.left="180px";
   document.getElementById("sm").style.display="none";
   document.getElementById("tm").style.display="none";
   document.getElementById("pt").style.display="block";
   document.getElementById("pt").style.display="block";
   document.getElementById("pt").style.width="390px";
   document.getElementById("pt").style.marginBottom="5px";
   document.getElementById("pubt_txt").style.width="245px";
   document.getElementById("pubt_txt").style.float="right";
   document.getElementById("pq").style.width="390px";
   document.getElementById("pqos_lbl").style.paddingTop="10px";
   document.getElementById("pqos_lbl").style.width="145px";
   document.getElementById("pqos_lbl").style.float="left";
   document.getElementById("prtn_lbl").style.display="block";
   document.getElementById("prtn_lbl").style.paddingTop="10px";
   document.getElementById("prtn_lbl").style.width="65px";
   document.getElementById("prtn_lbl").style.float="left"; 
   document.getElementById("prtn_lbl").style.paddingLeft="10px";   
   document.getElementById("pqos_txt").style.width="245px";
   document.getElementById("pqos_txt").style.float="right";
   document.getElementById("prtn_txt").style.marginTop="3px";
   document.getElementById("prtn_txt").style.width="245px";
   document.getElementById("prtn_txt").style.float="right";
   document.getElementById("pm").style.display="block";
   document.getElementById("pm").style.width="390px";
   document.getElementById("pm").style.paddingTop="65px";
   document.getElementById("pubm_txt").style.width="245px";
   document.getElementById("pubm_txt").style.float="right";
   document.getElementById("rt").style.width="390px";
   document.getElementById("rest_txt").style.width="245px";
   document.getElementById("rest_txt").style.float="right";
   document.getElementById("rm").style.width="390px";
   document.getElementById("resm_txt").style.width="245px";
   document.getElementById("resm_txt").style.float="right";
     document.getElementById("add_json").style.display="none";
     $("#pm").appendTo("#pubd2"); 
  $("#rt").appendTo("#pubd2");
  $("#rm").appendTo("#pubd2");

$("#editdialog").dialog({ width:500,height:400,autoOpen: false, show: { effect: "blind", duration: 1000 }, hide: { effect: "blind", duration: 1000 }, close: function () {; }, title:"Add New Request Response Details" }).dialog("open");
}


}
function f1(id)
{
 var s="";
 s=id.slice(6);
 var i=parseInt(s);
document.getElementById("pub_topic").value="topic";
document.getElementById("pub_msg").value="msg";
document.getElementById("pub_retain").value="retain";
}
function fnsubtime()
{
  var subtime=document.getElementById("sub_txt").value;
  if (subtime==0)
  {
    document.getElementById("tm").style.display="none";
  }
  else
  {
    document.getElementById("tm").style.display="block";
    document.getElementById("pub_lbl").style.visibility="hidden";
  }
}
function getDashboard()
{
$("device").innerHTML="";
s="selectenv";
if (window.location.href=="http://127.0.0.1:9000/")
document.getElementById("choice").value='dbselect';
else
document.getElementById("choice").value='dbselect1';
document.getElementById("addenvdialog").style.display="none;"
var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/?config='+configuration,

data: $("form[name='myform']").serialize(),
    async:false,
     success:function () {

}
});
       $.ajax({


    url: '/client/count?curr_time='+new Date().getTime(),

    type: "GET",
dataType: "text",
    async:false,

     success: function (msg) {
var obj=JSON.parse(msg);

clientcount=obj[1];

},
 error: function () {
  alert('error');
    }

});
var devtrack=document.getElementById("dev_track");
devtrack.innerHTML="";
if (clientcount>21)
{
var n=parseInt(clientcount/20)+1;
var i=0;
while (i<n)
{
	if (i==0)
	{
		devtrack.innerHTML=devtrack.innerHTML+"<li><a class=example  style=cursor:pointer;  id=firsti name=firsti onclick=setnextclk("+i+",id)>&laquo;</a></li>";	
		devtrack.innerHTML=devtrack.innerHTML+"<li><a  class=example style=cursor:pointer;background-color:#ecf0f5  id="+i+" name="+i+" onclick=setnextclk("+i+",id)>"+(i+1)+"</a></li>";
	}
	else
		devtrack.innerHTML=devtrack.innerHTML+"<li><a  class=example style=cursor:pointer  id="+i+" name="+i+" onclick=setnextclk("+i+",id)>"+(i+1)+"</a></li>";


	i=i+1;
}
		devtrack.innerHTML=devtrack.innerHTML+"<li><a  class=example  style=cursor:pointer id=lasti name=lasti onclick=setnextclk("+(i-1)+",id)>&raquo;</a></li>";	
}
else
{
	devtrack.innerHTML=devtrack.innerHTML+"<li><a  class=example  style=cursor:pointer id=firsti name=firsti onclick=setnextclk(0,id)>&laquo;</a></li>";
	devtrack.innerHTML=devtrack.innerHTML+"<li><a  class=example  style=cursor:pointer id=1 name=1 onclick=setnextclk(0,id)>1</a></li>";
	devtrack.innerHTML=devtrack.innerHTML+"<li><a  class=example  style=cursor:pointer id=lasti name=lasti onclick=setnextclk(0,id)>&raquo;</a></li>";				
}
{
var list_size=$('#dev_track li').size();
var rec_count_start=0;
var rec_count_end=rec_count_start+12;
if (rec_count_start==0)
{
$('#dev_track li:gt(-1)').show();
var x=(5 <= list_size) ? 5 : list_size;
$('#dev_track li:lt('+(x+1)+')').show();
$('#dev_track li:gt('+x+')').hide();
$('#dev_track li:gt('+(list_size-2)+')').show();
}
else
{
$('#dev_track li:lt('+(rec_count_start+1)+')').hide();
$('#dev_track li:gt('+rec_count_start+')').show();
}
}


document.getElementById("simcheck").value="selected";
envvalue=1;
document.getElementById("Devices").style.display="block"
$("#device").children().empty();
$("#device").innerHTML="";
adddevices();

}
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  var hour = a.getHours();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function next_log_disp1()
{
id=document.getElementById("d_name").value;
next_log_clk++;
var ofval=next_log_clk*10;
if (parseInt(ofval)+10 >= logcount)
{
document.getElementById("next_log").style.display="none";
}
var u='/client/get?a='+id+'&offsetvalue='+ofval+'&curr_time='+new Date().getTime();
$.ajax({

	url: u,

    type: "GET",
dataType: "text",
    async:false,
     success: function (msg) {
var lp=JSON.parse(msg);
 
  var lgkeys = [];
  for(var lk in lp) lgkeys.push(lk);

  var lgs=lp[lgkeys[0]];
  var lgm=lgs[0];
  var lgelt_tbl=document.getElementById("log_table");
  var lgcnt=lgkeys.length;

  for(var lgt=0;lgt<lgcnt;lgt++)
  { 

   var lgrow=lgelt_tbl.insertRow(lgrownumber);
   var lgss1=lp[lgkeys[lgt]];
   lgrownumber=lgrownumber+1;
   var lgsc1=0;
   var lgaid=lgkeys[lgt];
   var lgsdata=1;
   var lg_op="";
   var lgsrtn="";
   for (var lgj=2;lgj<lgss1.length;lgj++)
   {
	var lgcell1=lgrow.insertCell(lgsc1);
        if (lgss1[lgj]=="NIL") lgsdata=0; 
	if (lgj==5)
	{
		if (lgss1[lgj]==0) lg_op="PUBLISH";
		else if (lgss1[lgj]==1) lg_op="SUBSCRIBE";
		else if (lgss1[lgj]==2) lg_op="UNSUBSCRIBE";
		else if (lgss1[lgj]==3) lg_op="CONNECT";
		else if (lgss1[lgj]==4) lg_op="DISCONNECT";
		else if (lgss1[lgj]==5) lg_op="WILL";
		else lg_op=lgss1[lgj];
		lgcell1.innerHTML=lg_op;
		lgcell1.value=lg_op;
	}
	else if (lgj==2)
	{
		lgcell1.innerHTML=timeConverter(lgss1[lgj]);
		lgcell1.style.width="200px";
		lgcell1.value=lgss1[lgj];
	}
 	else
	{
		lgcell1.innerHTML=lgss1[lgj];
		lgcell1.value=lgss1[lgj];
	}
	lgcell1.id="logr"+lgaid+"c"+lgsc1;
	lgcell1.setAttribute("name","logr"+lgaid+"c"+lgsc1);
	lgcell1.style.width="180px";
	lgcell1.style.fontWeight="normal";
	lgcell1.style.textAlign="left";


	lgsc1=lgsc1+1;

   }




}
},
error:function()
{
}
});

}
function setnextclk(nextcnt)
{
var dev_list_size=$('#dev_track li').size();
if(dev_list_size>7)
{
if ((nextcnt>=1) && (nextcnt<(dev_list_size-4)))
{
var showfrom=nextcnt-2;
var showto=nextcnt+4;
var hideright=nextcnt+3;
if (nextcnt==1)
{
   showto=nextcnt+5;
   hideright=nextcnt+4;
}
var hideleft=nextcnt-1;
$('#dev_track li:gt('+showfrom+')').show();
$('#dev_track li:lt('+showto+')').show();
$('#dev_track li:gt('+hideright+')').hide();
$('#dev_track li:lt('+hideleft+')').hide();
$('#dev_track li:lt(1)').show();
$('#dev_track li').last().show();
}
}
$('#dev_track li:lt(1)').show();
$('#dev_track li').last().show();
var list_size=$('#device li').size();
var rec_count_start=(nextcnt*20);
var rec_count_end=rec_count_start+20;
if (rec_count_start==0)
{
$('#device li:gt(-1)').show();
var x=(20 <= list_size) ? 20 : list_size;
var newelt=$('#device li a').get(0);
$('#device li:lt('+(x+1)+')').show();
disp_detail((newelt.innerText).toString());
$('#device li:gt('+x+')').hide();
}
else
{
$('#device li:lt('+(rec_count_start+1)+')').hide();
$('#device li:gt('+rec_count_start+')').show();
var newelt=$('#device li a').get(rec_count_start+1);
$('#device li:gt('+rec_count_end+')').hide();
disp_detail((newelt.innerText).toString());
}
}

function disp_detail(id)
{
logcount=0;
var xdetail1=document.getElementsByClassName("detail");
var xd;
for(xd=0;xd<xdetail1.length;xd++)
{
xdetail1[xd].style.backgroundColor="#222d32";
xdetail1[xd].style.border="none";
xdetail1[xd].style.color="#b8c7ce";
}
var xdetail=document.getElementById("device"+id);
xdetail.style.borderLeft="3px solid transparent";
xdetail.style.borderColor="#337ab7";
xdetail.style.color="#ffffff";

document.getElementById("d_name").value=id;
document.getElementById("choice").value='getstatus';
document.getElementById("paid_txt").display="block";
var connect_status=0;
var $form=$("#myform");
var f=$form
var u=$form.attr("action")+"?"+$form.serialize();
$.ajax({


   url: '/',

data: $("form[name='myform']").serialize(),
    type: "POST",
 dataType: "text",
    async:false,
     success:function (data,status) {
data=JSON.parse(data);
if (data=="connected")
   connect_status=1;
else
   connect_status=0;
    },
error:function(data){
document.getElementById("paid_txt").display="none";
}
    
    
});

if (connect_status==0)
{
   document.getElementById("startdevice").disabled=false;
   document.getElementById("stopdevice").disabled=true;
   document.getElementById("tickgreen").style.display="none";
   document.getElementById("tickgrey").style.display="block";
}
else
{
   document.getElementById("startdevice").disabled=true;
   document.getElementById("stopdevice").disabled=false;
   document.getElementById("tickgreen").style.display="block";
   document.getElementById("tickgrey").style.display="none";
}
devid=0;
var u='/client/get?a='+id+'&curr_time='+new Date().getTime();


       $.ajax({
	url: u,
   type: "GET",
dataType: "text",
    async:false,
     success: function (msg) {
document.getElementById("edit").className='btn btn-sm btn-info';
document.getElementById("d_name").value='Click on a device to get details';
document.getElementById("d_type").value='';
document.getElementById("d_desc").value='';
document.getElementById("will_topic").value='';
document.getElementById("will_msg").value='';
document.getElementById("will_retain").value='';
var px=document.getElementById("pub_table");
while(px.rows[2]) px.deleteRow(2);
var sx=document.getElementById("sub_table");
while(sx.rows[2]) sx.deleteRow(2);
var rx=document.getElementById("log_table");
while(rx.rows[1]) rx.deleteRow(1);
var clindex1=msg.indexOf("[");
var clindex2=msg.indexOf("]");
var clnt_details=msg.slice(clindex1+1,clindex2);
var cln_ar=clnt_details.split(",");
var dname=cln_ar[1].split('"');
var nmindex1=cln_ar[1].indexOf('"');
var nmindex2=cln_ar[1].indexOf('"');
var ddesc=cln_ar[2].split('"');
var timestr="";
if(ddesc[0]!="")
  timestr=ddesc[0];
else
  timestr=ddesc[1];
var windex1=msg.indexOf("[",clindex2-1);
var windex2=msg.indexOf("]",clindex2+1);
var w_details=msg.slice(windex1+1,windex2);
var w_ar=w_details.split(",");
var wtopic=w_ar[1].split('"');
var wmsg=w_ar[2].split('"');
document.getElementById("d_name").value=id;
document.getElementById("d_desc").value=timestr;

document.getElementById("will_topic").value=wtopic[1];
document.getElementById("will_msg").value=wmsg[1];
if (w_ar[4]==0)
document.getElementById("will_retain").value="0-Retain Flag is not set";
else if (w_ar[4]==1)
document.getElementById("will_retain").value="1-Retain Flag is set";
else 
document.getElementById("will_retain").value="NIL";





var pindex1=msg.indexOf("[",windex2-1);
var pindex2;
var multipub=0;
if (pindex1==windex2+1)
{
   pindex2=msg.indexOf("]",windex2+1)
}
else
{
  multipub=1;
  pindex1=msg.indexOf("{",windex2-1);
  pindex2=msg.indexOf("}{",windex2+1);
}

if (multipub==1)
{
  pubmsgs=msg.slice(pindex1,pindex2+1);
  var p=JSON.parse(pubmsgs);
  var keys = [];
  for(var k in p) keys.push(k);
  var s=p[keys[0]];
  var m=s[0];
  var elt_tbl=document.getElementById("pub_table");
elt_tbl.style.display="block";
  var rcnt=keys.length;
var px=document.getElementById("nopub");
px.style.display="none";

var px11=document.getElementById("no_pub_table");
px11.style.display="none";


  var rownumber=2;
  for(var t=0;t<rcnt;t++)
  { 

   var row=elt_tbl.insertRow(rownumber);
   var s1=p[keys[t]];
   var c1=0;
   var data=1;
   rownumber=rownumber+1;
   var p_aid=keys[t];
   c1=0;
   var pqos="";
   var prtn="";
   var pub_msg_type=s1[s1.length-1];
   for (var j=1;j<s1.length+1;j++)
   {
	var cell1=row.insertCell(c1);
	cell1.style.width="180px";
  if ((j<s1.length) && (s1[j]=="NIL"))
	{
		data=0;
		//continue;
		break;
	}
	if (j==3)
	{
		if (s1[j]==0) pqos="0-Atmost Once";
		else if (s1[j]==1) pqos="1-Atleast Once";
		else if (s1[j]==2) pqos="2-Exactly Once";
		else pqos=s1[j];
		cell1.innerHTML=pqos;
		cell1.value=pqos;
		cell1.id="pubr"+p_aid+"c"+c1;
 		cell1.setAttribute("name","pubr"+p_aid+"c"+c1);
	cell1.style.fontWeight="normal";
	cell1.style.textAlign="left";
	}
	else if (j==4)
	{
		if (s1[j]==0) prtn="0-Retain Flag is not set";
		else if (s1[j]==1) prtn="1-Retain Flag is set";
		else prtn=s1[j];
		cell1.innerHTML=prtn;
		cell1.value=prtn;
		cell1.id="pubr"+p_aid+"c"+c1;
		cell1.setAttribute("name","pubr"+p_aid+"c"+c1);
		cell1.style.fontWeight="normal";
		cell1.style.textAlign="left";
	}
  else
  {
    if (j<s1.length)
    {
      if (j>4)
        cell1.style.textAlign="center";
      else
        cell1.style.textAlign="left";
      var actual_data=s1[j];
      if ((pub_msg_type==5) && (j==2))
      {
        var mm=JSON.parse(s1[j]);
        var json_op="{";
        for (var key in mm)
        {
          json_op+='"'+key+'":"'+mm[key]["msg"]+'"},{';
        }
        actual_data=json_op.substring(0,json_op.length-2);
      }
    }
    else actual_data=s1[2];
  	cell1.innerHTML=actual_data;
  	cell1.value=actual_data;
  	cell1.id="pubr"+p_aid+"c"+c1;
  	cell1.setAttribute("name","pubr"+p_aid+"c"+c1);
  	cell1.style.width="180px";
  	cell1.style.fontWeight="normal";
    if (j>=s1.length-1)
      cell1.style.display="none";
	

	}
	c1=c1+1;
   }
    if(data!=0)
     {
	var cell2=row.insertCell(c1);
	cell2.innerHTML="<img src=/images/dbedit.png  class=editdb id=pub"+p_aid+"edit"+id+" name=pub"+p_aid+"edit"+id+" style=align:center;width:20px;height:20px;cursor:pointer onclick='fnedit(this.id);'>";
	var cell3=row.insertCell(c1+1);
  cell2.style.textAlign="center";
  cell3.style.textAlign="center";
	cell3.innerHTML="<img  class=dropdb src=/images/dbdrop.png id=pub"+p_aid+"drop"+id+" name=pub"+p_aid+"drop"+id+" style=align:center;width:20px;height:20px;cursor:pointer onclick='fndrop(this.id);'>";
	}
     else
     {
var px11=document.getElementById("pub_table");
px11.style.display="none";
var px=document.getElementById("nopub");
px.style.display="block";

var px1=document.getElementById("no_pub_table");
px1.style.display="block";
while(px1.rows[1]) px1.deleteRow(1);
var row=px1.insertRow(1);
       //row.colSpan="9";
       var temp1=row.insertCell(0);
       temp1.colSpan="9";	
       temp1.style.fontWeight="normal";
       temp1.style.textAlign="center";
       temp1.innerHTML="No Published Topics";
	break;
     }
  }

}
else
{

     var row1=elt_tbl.insertRow(1);
      for (var c11=0;c11<5;c11++)
   {
	var cell11=row1.insertCell(c11);
	cell11.innerHTML='NIL';
	c11=c11+1;
   }
  
}
var sindex1=msg.indexOf("[",pindex2-1);
var sindex2;
var multisub=0;
if (sindex1==pindex2+1)
{
   sindex2=msg.indexOf("]",pindex2+1)
}
else
{
  multisub=1;
  sindex1=msg.indexOf("{",pindex2-1);
  sindex2=msg.indexOf("}{",pindex2+1);
}

if (multisub==1)
{
  submsgs=msg.slice(sindex1,sindex2+1);
  var sp=JSON.parse(submsgs);
  var skeys = [];
  for(var sk in sp) skeys.push(sk);

  var ss=sp[skeys[0]];
  var sm=ss[0];

var px=document.getElementById("nosub");
px.style.display="none";

var px11=document.getElementById("no_sub_table");
px11.style.display="none";

  var selt_tbl=document.getElementById("sub_table");
selt_tbl.style.display="block";
  var srcnt=skeys.length;
  var srownumber=2;

  for(var st=0;st<srcnt;st++)
  { 

   var srow=selt_tbl.insertRow(srownumber);
   var ss1=sp[skeys[st]];
   srownumber=srownumber+1;
   var sc1=0;
   var aid=skeys[st];
   var sdata=1;
   var sqos="";
   var srtn="";
   for (var sj=1;sj<ss1.length;sj++)
   {
	var scell1=srow.insertCell(sc1);
        if (ss1[sj]=="NIL") 
	{
		sdata=0; 
		continue;
	}
	if (sj==3)
	{
		if (ss1[sj]==0) sqos="0-Atmost Once";
		else if (ss1[sj]==1) sqos="1-Atleast Once";
		else if (ss1[sj]==2) sqos="2-Exactly Once";
		else sqos=ss1[sj];
		scell1.innerHTML=sqos;
		scell1.value=sqos;
		scell1.id="subr"+aid+"c"+sc1;
		scell1.setAttribute("name","subr"+aid+"c"+sc1);
		scell1.style.width="180px";
		scell1.style.fontWeight="normal";
		scell1.style.textAlign="left";

	}
        else if (sj==4)
	{
		if (ss1[sj]==0) srtn="0-Retain Flag is not set";
		else if (ss1[sj]==1) srtn="1-Retain Flag is set";
		else srtn=ss1[sj];
		scell1.innerHTML=srtn;
		scell1.value=srtn;
		scell1.id="subr"+aid+"c"+sc1;
		scell1.setAttribute("name","subr"+aid+"c"+sc1);
		scell1.style.width="180px";
		scell1.style.fontWeight="normal";
		scell1.style.textAlign="left";

		scell1.style.display="none"
	}
	else
	{
              if (j>4)
            scell1.style.textAlign="center";
          else
            scell1.style.textAlign="left";

		scell1.innerHTML=ss1[sj];
		scell1.value=ss1[sj];
		scell1.id="subr"+aid+"c"+sc1;
		scell1.setAttribute("name","subr"+aid+"c"+sc1);
		scell1.style.width="180px";
		scell1.style.fontWeight="normal";
	

		if (sj==2)
			scell1.style.display="none";
        }
	sc1=sc1+1;
   }
   if(sdata!=0)
     {
	var scell2=srow.insertCell(sc1);
	scell2.innerHTML="<img src=/images/dbedit.png  class=editdb id=sub"+aid+"edit"+id+" name=sub"+aid+"edit"+id+" style=width:20px;height:20px;cursor:pointer onclick='fnedit(this.id);'>";
	var scell3=srow.insertCell(sc1+1);
  scell2.style.textAlign="center";
  scell3.style.textAlign="center";
	scell3.innerHTML="<img  class=dropdb src=/images/unsubscribe.png id=sub"+aid+"drop"+id+" name=sub"+aid+"drop"+id+" style=width:20px;height:20px;cursor:pointer onclick='fndrop(this.id);'>";


	}
     else
     {

var px11=document.getElementById("sub_table");
px11.style.display="none";
var px=document.getElementById("nosub");
px.style.display="block";

var px1=document.getElementById("no_sub_table");
px1.style.display="block";
while(px1.rows[1]) px1.deleteRow(1);
var row=px1.insertRow(1);
       //row.colSpan="9";
       var temp1=row.insertCell(0);
       temp1.colSpan="9";	
       temp1.style.fontWeight="normal";
       temp1.style.textAlign="center";
       temp1.innerHTML="No Subscribed Topics";
	break;
    }

  }
}
else
{

     var srow1=selt_tbl.insertRow(1);
      for (var sc11=0;sc11<5;sc11++)
   {
	var scell11=srow1.insertCell(sc11);
	scell11.innerHTML='NIL';
	sc11=sc11+1;
   }
  
}

//CODE STARTS FOR REQUEST RESPONSE


var rrindex1=msg.indexOf("[",sindex2-1);
var rrindex2;
var multirr=0;
if (rrindex1==sindex2+1)
{
   rrindex2=msg.indexOf("]",sindex2+1)
}
else
{
  multirr=1;
  rrindex1=msg.indexOf("{",sindex2-1);
  rrindex2=msg.indexOf("}",sindex2+1);
}

if (multirr==1)
{
  rrmsgs=msg.slice(rrindex1,rrindex2+1);
  var rrp=JSON.parse(rrmsgs);
  var rrkeys = [];
  for(var rrk in rrp) rrkeys.push(rrk);

  var rrs=rrp[rrkeys[0]];
  var rrm=rrs[0];
var px=document.getElementById("noreqres");
px.style.display="none";

var px11=document.getElementById("no_reqres_table");
px11.style.display="none";

  var rrelt_tbl=document.getElementById("log_table");
rrelt_tbl.style.display="block";


  var rrcnt=rrkeys.length;
  var rrownumber=1;


  for(var rrt=0;rrt<rrcnt;rrt++)
  { 

   var rrow=rrelt_tbl.insertRow(rrownumber);
   var rrs1=rrp[rrkeys[rrt]];
   rrownumber=rrownumber+1;
   var rrc1=0;
   var rraid=rrkeys[rrt];
   var rrdata=1;
   var rrqos="";
   var rrtn="";
   for (var rrj=1;rrj<rrs1.length;rrj++)
   {
	var rrcell1=rrow.insertCell(rrc1);
        if (rrs1[rrj]=="NIL") 
	{
		rrdata=0; 
		continue;
	}
	if (rrj==5)
	{
		if (rrs1[rrj]==0) rrqos="0-Atmost Once";
		else if (rrs1[rrj]==1) rrqos="1-Atleast Once";
		else if (rrs1[rrj]==2) rrqos="2-Exactly Once";
		else rrqos=rrs1[rrj];
		rrcell1.innerHTML=rrqos;
		rrcell1.value=rrqos;
		rrcell1.id="resr"+rraid+"c"+rrc1;
		rrcell1.setAttribute("name","resr"+rraid+"c"+rrc1);
		rrcell1.style.width="180px";
		rrcell1.style.fontWeight="normal";
		rrcell1.style.textAlign="left";

	}
        else if (rrj==6)
	{
		if (rrs1[rrj]==0) rrtn="0-Retain Flag is not set";
		else if (rrs1[rrj]==1) rrtn="1-Retain Flag is set";
		else rrtn=rrs1[rrj];
		rrcell1.innerHTML=rrtn;
		rrcell1.value=rrtn;
		rrcell1.id="resr"+rraid+"c"+rrc1;
		rrcell1.setAttribute("name","resr"+rraid+"c"+rrc1);
		rrcell1.style.width="180px";
		rrcell1.style.fontWeight="normal";
		rrcell1.style.textAlign="left";

	}
	else
	{
		rrcell1.innerHTML=rrs1[rrj];
		rrcell1.value=rrs1[rrj];
		rrcell1.id="resr"+rraid+"c"+rrc1;
		rrcell1.setAttribute("name","resr"+rraid+"c"+rrc1);
		rrcell1.style.width="180px";
		rrcell1.style.fontWeight="normal";
		rrcell1.style.textAlign="left";

        }
	rrc1=rrc1+1;
   }
  if(rrdata!=0)
     {
	var rrcell2=rrow.insertCell(rrc1);
	rrcell2.innerHTML="<img src=/images/dbedit.png  class=editdb id=res"+rraid+"edit"+id+" name=res"+rraid+"edit"+id+" style=width:20px;height:20px;cursor:pointer onclick='fnedit(this.id);'>";

	var rrcell3=rrow.insertCell(rrc1+1);
  rrcell2.style.textAlign="center";
  rrcell3.style.textAlign="center";
	rrcell3.innerHTML="<img  class=dropdb src=/images/dbdrop.png id=res"+rraid+"drop"+id+" name=res"+rraid+"drop"+id+" style=width:20px;height:20px;cursor:pointer onclick='fndrop(this.id);'>";
	}
     else
     {

var px11=document.getElementById("log_table");
px11.style.display="none";
var px=document.getElementById("noreqres");
px.style.display="block";

var px1=document.getElementById("no_reqres_table");
px1.style.display="block";
while(px1.rows[1]) px1.deleteRow(1);
var row=px1.insertRow(1);
       //row.colSpan="9";
       var temp1=row.insertCell(0);
       temp1.colSpan="9";	
       temp1.style.fontWeight="normal";
       temp1.style.textAlign="center";
       temp1.innerHTML="No Request Response Pattern";
	break;
    }

  }
}
else
{

     var rrow1=rrelt_tbl.insertRow(1);
      for (var rrc11=0;rrc11<5;rrc11++)
   {
	var rrcell11=rrrow1.insertCell(rrc11);
	rrcell11.innerHTML='NIL';
	rrc11=rrc11+1;
   }
  
}
},
    error: function () {

    }

});
var u='/singleclient/pubcount/get?a='+id+'&curr_time='+new Date().getTime();
       $.ajax({

	url: u,

    type: "GET",
 
dataType: "text",
    async:false,
     success: function (msg) {
var obj=JSON.parse(msg);
var ppcnt=0;
for (var key in obj)
{
ppcnt++;
if (ppcnt==2)
pubcount=parseInt(obj[key]);
}
var pubtrack=document.getElementById("pub_track");
pubtrack.innerHTML="";
if (pubcount>10)
{
var n=parseInt(pubcount/10)+1;
var i=0;
while (i<n)

{
	if (i==0)
	{
		pubtrack.innerHTML=pubtrack.innerHTML+"<li><a  class=pubset style=cursor:pointer id=firstpubi name=firstpubi onclick=next_pub_disp("+i+",id)>&laquo;</a></li>";
		pubtrack.innerHTML=pubtrack.innerHTML+"<li><a  class=pubset style=cursor:pointer;background-color:#ecf0f5; id=pub"+i+" name=pub"+i+" onclick=next_pub_disp("+i+",id)>"+(i+1)+"</a></li>";
	}
	
	else
		pubtrack.innerHTML=pubtrack.innerHTML+"<li><a  class=pubset style=cursor:pointer id=pub"+i+" name=pub"+i+" onclick=next_pub_disp("+i+",id)>"+(i+1)+"</a></li>"


	i=i+1;
}
		pubtrack.innerHTML=pubtrack.innerHTML+"<li><a  class=pubset style=cursor:pointer id=lastpubi name=lastpubi onclick=next_pub_disp("+(i-1)+",id)>&raquo;</a></li>"		

}

else

{
	pubtrack.innerHTML=pubtrack.innerHTML+"<li><a  class=pubset style=cursor:pointer id=firstpubi name=firstpubi onclick=next_pub_disp(0,id)>&laquo;</a></li>"

	pubtrack.innerHTML=pubtrack.innerHTML+"<li><a  class=pubset style=cursor:pointer;background-color:#ecf0f5 id=pub0 name=pub0 onclick=next_pub_disp(0,id)>1</a></li>"
	pubtrack.innerHTML=pubtrack.innerHTML+"<li><a  class=pubset style=cursor:pointer id=lastpubi name=lastpubi onclick=next_pub_disp(0,id)>&raquo;</a></li>"				


}
{

var list_size=$('#pub_track li').size();
$('#pub_track li:gt(-1)').show();
var x=(5 <= list_size) ? 5 : list_size;
$('#pub_track li:lt('+(x+1)+')').show();

$('#pub_track li:gt('+x+')').hide();
$('#pub_track li:gt('+(list_size-2)+')').show();

}

},
    error: function () {    }

});

var u='/singleclient/subcount/get?a='+id+'&curr_time='+new Date().getTime();

       $.ajax({

	url: u,

    type: "GET",
 
dataType: "text",
    async:false,
     success: function (msg) {
var obj=JSON.parse(msg);
var sscnt=0;
for (var key in obj)
{
sscnt++;
if (sscnt==2)
subcount=parseInt(obj[key]);
}
var subtrack=document.getElementById("sub_track");

subtrack.innerHTML="";
if (subcount>10)
{
var n=parseInt(subcount/10)+1;
var i=0;

while (i<n)
{
	if (i==0)
	{
		subtrack.innerHTML=subtrack.innerHTML+"<li><a class=subset  style=cursor:pointer id=firstsubi name=firstsubi onclick=next_sub_disp("+i+",id)>&laquo;</a></li>";	
		subtrack.innerHTML=subtrack.innerHTML+"<li><a class=subset  style=cursor:pointer;background-color:#ecf0f5; id=sub"+i+" name=sub"+i+" onclick=next_sub_disp("+i+",id)>"+(i+1)+"</a></li>";
	}
	else
		subtrack.innerHTML=subtrack.innerHTML+"<li><a class=subset  style=cursor:pointer id=sub"+i+" name=sub"+i+" onclick=next_sub_disp("+i+",id)>"+(i+1)+"</a></li>";


	i=i+1;
}
		subtrack.innerHTML=subtrack.innerHTML+"<li><a class=subset  style=cursor:pointer id=lastsubi name=lastsubi onclick=next_sub_disp("+(i-1)+",id)>&raquo;</a></li>";	
}

else
{

	subtrack.innerHTML=subtrack.innerHTML+"<li><a class=subset  style=cursor:pointer id=firstsubi name=firstsubi onclick=next_sub_disp(0,id)>&laquo;</a></li>";
	subtrack.innerHTML=subtrack.innerHTML+"<li><a class=subset  style=cursor:pointer;background-color:#ecf0f5 id=sub0 name=sub0 onclick=next_sub_disp(0,id)>1</a></li>"
	subtrack.innerHTML=subtrack.innerHTML+"<li><a class=subset  style=cursor:pointer id=lastsubi name=lastsubi onclick=next_sub_disp(0,id)>&raquo;</a></li>"				

}
{
var list_size=$('#sub_track li').size();
$('#sub_track li:gt(-1)').show();
var x=(5 <= list_size) ? 5 : list_size;
$('#sub_track li:lt('+(x+1)+')').show();
$('#sub_track li:gt('+x+')').hide();
$('#sub_track li:gt('+(list_size-2)+')').show();
}
},

    error: function () {    }

});

var u='/singleclient/logcount/get?a='+id+'&curr_time='+new Date().getTime();

       $.ajax({

	url: u,

    type: "GET",
 
dataType: "text",
    async:false,
     success: function (msg) {
var obj=JSON.parse(msg);
var llcnt=0;
for (var key in obj)
{
llcnt++;
if (llcnt==2)
logcount=parseInt(obj[key]);
}
var logtrack=document.getElementById("log_track");

logtrack.innerHTML="";
if (logcount>10)
{
var n=parseInt(logcount/10)+1;
var i=0;

while (i<n)
{
	if (i==0)
	{
		logtrack.innerHTML=logtrack.innerHTML+"<li><a class=logset  style=cursor:pointer id=firstlogi name=firstlogi onclick=next_log_disp("+i+",id)>&laquo;</a></li>";	
		logtrack.innerHTML=logtrack.innerHTML+"<li><a class=logset  style=cursor:pointer;background-color:#ecf0f5; id=log"+i+" name=log"+i+" onclick=next_log_disp("+i+",id)>"+(i+1)+"</a></li>";
	}
	else
		logtrack.innerHTML=logtrack.innerHTML+"<li><a class=logset  style=cursor:pointer id=log"+i+" name=log"+i+" onclick=next_log_disp("+i+",id)>"+(i+1)+"</a></li>";


	i=i+1;
}
		logtrack.innerHTML=logtrack.innerHTML+"<li><a class=logset  style=cursor:pointer id=lastlogi name=lastlogi onclick=next_log_disp("+(i-1)+",id)>&raquo;</a></li>";	
}

else
{

	logtrack.innerHTML=logtrack.innerHTML+"<li><a class=logset  style=cursor:pointer id=firstlogi name=firstlogi onclick=next_log_disp(0,id)>&laquo;</a></li>";
	logtrack.innerHTML=logtrack.innerHTML+"<li><a class=logset  style=cursor:pointer;background-color:#ecf0f5 id=log0 name=log0 onclick=next_log_disp(0,id)>1</a></li>"
	logtrack.innerHTML=logtrack.innerHTML+"<li><a class=logset  style=cursor:pointer id=lastlogi name=lastlogi onclick=next_log_disp(0,id)>&raquo;</a></li>"				

}
{
var list_size=$('#log_track li').size();
$('#log_track li:gt(-1)').show();
var x=(5 <= list_size) ? 5 : list_size;
$('#log_track li:lt('+(x+1)+')').show();
$('#log_track li:gt('+x+')').hide();
$('#log_track li:gt('+(list_size-2)+')').show();
}


},
    error: function () {
    }

});

}

function next_pub_disp(rec_cnt,pid)
{
var xdetail=document.getElementsByClassName("pubset");
var xd;
for(xd=0;xd<xdetail.length;xd++)
{
xdetail[xd].style.backgroundColor="#fafafa";
}

document.getElementById(pid).style.backgroundColor="#ecf0f5";
var list_size=$('#pub_track li').size();
var rec_count_start=(rec_cnt*12);
var rec_count_end=rec_count_start+12;
if(list_size>7)
{
if ((rec_cnt>=2) && (rec_cnt<(list_size-4)))
{
var showfrom=rec_cnt-2;
var showto=rec_cnt+4;
var hideright=rec_cnt+3;
var hideleft=rec_cnt-1;

$('#pub_track li:gt('+showfrom+')').show();
$('#pub_track li:lt('+showto+')').show();
$('#pub_track li:gt('+hideright+')').hide();
$('#pub_track li:lt('+hideleft+')').hide();
$('#pub_track li:lt(1)').show();
$('#pub_track li').last().show();
}
}
$('#pub_track li:lt(1)').show();

$('#pub_track li').last().show();


id=document.getElementById("d_name").value;
next_log_clk++;
var ofval=rec_cnt*10;
if (parseInt(ofval)+10 >= pubcount)
{
document.getElementById("next_log").style.display="none";
}
var u='/singleclient/pub/get?a='+id+'&offsetvalue='+ofval+'&curr_time='+new Date().getTime();
$.ajax({

	url: u,
    type: "GET",
dataType: "text",
    async:false,
     success: function (msg) {
var obj=JSON.parse(msg);
var px1=document.getElementById("pub_table");
px1.style.display="block";
var px=document.getElementById("nopub");
px.style.display="none";

var px11=document.getElementById("no_pub_table");
px11.style.display="none";

while(px1.rows[2]) px1.deleteRow(2);

  var p=JSON.parse(msg);
  var keys = [];
  for(var k in p) keys.push(k);
  var s=p[keys[0]];
  var m=s[0];
  var elt_tbl=document.getElementById("pub_table");

  var rcnt=keys.length;
 
  var rownumber=2;
  for(var t=0;t<rcnt;t++)
  {  

   var row=elt_tbl.insertRow(rownumber);
   var s1=p[keys[t]];
   var c1=0;
   var data=1;
   rownumber=rownumber+1;
   var p_aid=keys[t];
   c1=0;
   var pqos="";
   var prtn="";
   for (var j=1;j<s1.length;j++)
   {
	var cell1=row.insertCell(c1);
	cell1.style.width="180px";
        if (s1[j]=="NIL") 
	{
		data=0;
		continue;
	}
	if (j==3)
	{
		if (s1[j]==0) pqos="0-Atmost Once";
		else if (s1[j]==1) pqos="1-Atleast Once";
		else if (s1[j]==2) pqos="2-Exactly Once";
		else pqos=s1[j];
		cell1.innerHTML=pqos;
		cell1.value=pqos;
		cell1.id="pubr"+p_aid+"c"+c1;
 		cell1.setAttribute("name","pubr"+p_aid+"c"+c1);
		cell1.style.fontWeight="normal";
		cell1.style.textAlign="left";

	}
	else if (j==4)
	{
		if (s1[j]==0) prtn="0-Retain Flag is not set";
		else if (s1[j]==1) prtn="1-Retain Flag is set";
		else prtn=s1[j];
		cell1.innerHTML=prtn;
		cell1.value=prtn;
		cell1.id="pubr"+p_aid+"c"+c1;
		cell1.setAttribute("name","pubr"+p_aid+"c"+c1);
		cell1.style.fontWeight="normal";
		cell1.style.textAlign="left";

	}
        else{
                    if (j>4)
            cell1.style.textAlign="center";
          else
            cell1.style.textAlign="left";

	cell1.innerHTML=s1[j];
	cell1.value=s1[j];
	cell1.id="pubr"+p_aid+"c"+c1;
	cell1.setAttribute("name","pubr"+p_aid+"c"+c1);
	cell1.style.width="180px";
	cell1.style.fontWeight="normal";
	

	}
	c1=c1+1;
   }
    if(data!=0)
     {
	var cell2=row.insertCell(c1);
	cell2.innerHTML="<img src=/images/dbedit.png  class=editdb id=pub"+p_aid+"edit"+id+" name=pub"+p_aid+"edit"+id+" style=width:20px;height:20px;cursor:pointer;align:center onclick='fnedit(this.id);'>";
	var cell3=row.insertCell(c1+1);
  cell2.style.textAlign="center";
  cell3.style.textAlign="center";
	cell3.innerHTML="<img  class=dropdb src=/images/dbdrop.png id=pub"+p_aid+"drop"+id+" name=pub"+p_aid+"drop"+id+" style=width:20px;height:20px;cursor:pointer;align:center onclick='fndrop(this.id);'>";
	}
     else
     {
var px11=document.getElementById("pub_table");
px11.style.display="none";
var px=document.getElementById("nopub");
px.style.display="block";

var px1=document.getElementById("no_pub_table");
px1.style.display="block";
while(px1.rows[1]) px1.deleteRow(1);
var row=px1.insertRow(1);
       //row.colSpan="9";
       var temp1=row.insertCell(0);
       temp1.colSpan="9";	
       temp1.style.fontWeight="normal";
       temp1.style.textAlign="center";
       temp1.innerHTML="No Published Topics";
	break;
     }
  }





},
error:function()
{
}
});
var elt=$('#pub_track li').get(1);
elt.style.backgroundColor="#ff0000";
}


function next_sub_disp(rec_cnt,sid)
{
var list_size=$('#sub_track li').size();
var rec_count_start=(rec_cnt*12);
var rec_count_end=rec_count_start+12;
var xdetail=document.getElementsByClassName("subset");
var xd;
for(xd=0;xd<xdetail.length;xd++)
{
xdetail[xd].style.backgroundColor="#fafafa";
}

document.getElementById(sid).style.backgroundColor="#ecf0f5";

if(list_size>7)
{
if ((rec_cnt>=2) && (rec_cnt<(list_size-4)))
{
var showfrom=rec_cnt-2;
var showto=rec_cnt+4;
var hideright=rec_cnt+3;
var hideleft=rec_cnt-1;

$('#sub_track li:gt('+showfrom+')').show();
$('#sub_track li:lt('+showto+')').show();
$('#sub_track li:gt('+hideright+')').hide();
$('#sub_track li:lt('+hideleft+')').hide();
$('#sub_track li:lt(1)').show();
$('#sub_track li').last().show();
}
}
$('#sub_track li:lt(1)').show();
$('#sub_track li').last().show();

id=document.getElementById("d_name").value;
next_log_clk++;
var ofval=rec_cnt*10;
if (parseInt(ofval)+10 >= subcount)
{
document.getElementById("next_log").style.display="none";
}
var u='/singleclient/sub/get?a='+id+'&offsetvalue='+ofval+'&curr_time='+new Date().getTime();
$.ajax({

	url: u,
    type: "GET",
dataType: "text",
    async:false,
     success: function (msg) {
var obj=JSON.parse(msg);
var px1=document.getElementById("sub_table");
while(px1.rows[2]) px1.deleteRow(2);
  var sp=JSON.parse(msg);
  var skeys = [];
  for(var sk in sp) skeys.push(sk);

  var ss=sp[skeys[0]];
  var sm=ss[0];
var px=document.getElementById("nosub");
px.style.display="none";

var px11=document.getElementById("no_sub_table");
px11.style.display="none";

  var selt_tbl=document.getElementById("sub_table");
selt_tbl.style.display="block";
  var srcnt=skeys.length;
  var srownumber=2;

  for(var st=0;st<srcnt;st++)
  {

   var srow=selt_tbl.insertRow(srownumber);
   var ss1=sp[skeys[st]];
   srownumber=srownumber+1;
   var sc1=0;
   var aid=skeys[st];
   var sdata=1;
   var sqos="";
   var srtn="";
   for (var sj=1;sj<ss1.length;sj++)
   {
	var scell1=srow.insertCell(sc1);
        if (ss1[sj]=="NIL") 
	{
		sdata=0; 
		continue;
	}
	if (sj==3)
	{
		if (ss1[sj]==0) sqos="0-Atmost Once";
		else if (ss1[sj]==1) sqos="1-Atleast Once";
		else if (ss1[sj]==2) sqos="2-Exactly Once";
		else sqos=ss1[sj];
		scell1.innerHTML=sqos;
		scell1.value=sqos;
		scell1.id="subr"+aid+"c"+sc1;
		scell1.setAttribute("name","subr"+aid+"c"+sc1);
		scell1.style.width="180px";
	scell1.style.fontWeight="normal";
	scell1.style.textAlign="left";
	}
        else if (sj==4)
	{
		if (ss1[sj]==0) srtn="0-Retain Flag is not set";
		else if (ss1[sj]==1) srtn="1-Retain Flag is set";
		else srtn=ss1[sj];
		scell1.innerHTML=srtn;
		scell1.value=srtn;
		scell1.id="subr"+aid+"c"+sc1;
		scell1.setAttribute("name","subr"+aid+"c"+sc1);
		scell1.style.width="180px";
	scell1.style.fontWeight="normal";
	scell1.style.textAlign="left";

		scell1.style.display="none"
	}
	else
	{
              if (sj>4)
            scell1.style.textAlign="center";
          else
            scell1.style.textAlign="left";

		scell1.innerHTML=ss1[sj];
		scell1.value=ss1[sj];
		scell1.id="subr"+aid+"c"+sc1;
		scell1.setAttribute("name","subr"+aid+"c"+sc1);
		scell1.style.width="180px";
	scell1.style.fontWeight="normal";

		if (sj==2)
			scell1.style.display="none";
        }
	sc1=sc1+1;
   }
   if(sdata!=0)
     {
	var scell2=srow.insertCell(sc1);
	scell2.innerHTML="<img src=/images/dbedit.png  class=editdb id=sub"+aid+"edit"+id+" name=sub"+aid+"edit"+id+" style=width:20px;height:20px;cursor:pointer;align:center onclick='fnedit(this.id);'>";
	var scell3=srow.insertCell(sc1+1);
  scell2.style.textAlign="center";
  scell3.style.textAlign="center";
	scell3.innerHTML="<img  class=dropsub src=/images/dbdrop.png id=sub"+aid+"drop"+id+" name=sub"+aid+"drop"+id+" style=width:20px;height:20px;cursor:pointer;align:center onclick='fndrop(this.id);'>";
	}
     else
     {
var px11=document.getElementById("sub_table");
px11.style.display="none";
var px=document.getElementById("nosub");
px.style.display="block";

var px1=document.getElementById("no_sub_table");
px1.style.display="block";
while(px1.rows[1]) px1.deleteRow(1);
var row=px1.insertRow(1);
       //row.colSpan="9";
       var temp1=row.insertCell(0);
       temp1.colSpan="9";	
       temp1.style.fontWeight="normal";
       temp1.style.textAlign="center";
       temp1.innerHTML="No Subscribed Topics";
	break;
    }

  }


},
error:function()
{
}
});

}


function next_log_disp(rec_cnt,sid)
{
var list_size=$('#log_track li').size();
var rec_count_start=(rec_cnt*12);
var rec_count_end=rec_count_start+12;
var xdetail=document.getElementsByClassName("logset");
var xd;
for(xd=0;xd<xdetail.length;xd++)
{
xdetail[xd].style.backgroundColor="#fafafa";
}

document.getElementById(sid).style.backgroundColor="#ecf0f5";

if(list_size>7)
{
if ((rec_cnt>=2) && (rec_cnt<(list_size-4)))
{
var showfrom=rec_cnt-2;
var showto=rec_cnt+4;
var hideright=rec_cnt+3;
var hideleft=rec_cnt-1;

$('#log_track li:gt('+showfrom+')').show();
$('#log_track li:lt('+showto+')').show();
$('#log_track li:gt('+hideright+')').hide();
$('#log_track li:lt('+hideleft+')').hide();
$('#log_track li:lt(1)').show();
$('#log_track li').last().show();
}
}
$('#log_track li:lt(1)').show();
$('#log_track li').last().show();

id=document.getElementById("d_name").value;
next_log_clk++;
var ofval=rec_cnt*10;
if (parseInt(ofval)+10 >= logcount)
{
document.getElementById("next_log").style.display="none";
}
var u='/singleclient/log/get?a='+id+'&offsetvalue='+ofval+'&curr_time='+new Date().getTime();
$.ajax({

	url: u,
    type: "GET",
dataType: "text",
    async:false,
     success: function (msg) {

var obj=JSON.parse(msg);
var px1=document.getElementById("log_table");
while(px1.rows[1]) px1.deleteRow(1);
  var rrp=JSON.parse(msg);
  var rrkeys = [];
  for(var rrk in rrp) rrkeys.push(rrk);

  var rrs=rrp[rrkeys[0]];
  var rrm=rrs[0];
var px=document.getElementById("noreqres");
px.style.display="none";

var px11=document.getElementById("no_reqres_table");
px11.style.display="none";

  var rrelt_tbl=document.getElementById("log_table");
rrelt_tbl.style.display="block";

   var rrcnt=rrkeys.length;
  var rrownumber=1;


  for(var rrt=0;rrt<rrcnt;rrt++)
  {

   var rrow=rrelt_tbl.insertRow(rrownumber);
   var rrs1=rrp[rrkeys[rrt]];
   rrownumber=rrownumber+1;
   var rrc1=0;
   var rraid=rrkeys[rrt];
   var rrdata=1;
   var rrqos="";
   var rrtn="";
   for (var rrj=1;rrj<rrs1.length;rrj++)
   {
	var rrcell1=rrow.insertCell(rrc1);
        if (rrs1[rrj]=="NIL") 
	{
		rrdata=0; 
		continue;
	}
	if (rrj==5)
	{
		if (rrs1[rrj]==0) rrqos="0-Atmost Once";
		else if (rrs1[rrj]==1) rrqos="1-Atleast Once";
		else if (rrs1[rrj]==2) rrqos="2-Exactly Once";
		else rrqos=rrs1[rrj];
		rrcell1.innerHTML=rrqos;
		rrcell1.value=rrqos;
		rrcell1.id="resr"+rraid+"c"+rrc1;
		rrcell1.setAttribute("name","resr"+rraid+"c"+rrc1);
		rrcell1.style.width="180px";
	rrcell1.style.fontWeight="normal";
	rrcell1.style.textAlign="left";

	}
        else if (rrj==6)
	{
		if (rrs1[rrj]==0) rrtn="0-Retain Flag is not set";
		else if (rrs1[rrj]==1) rrtn="1-Retain Flag is set";
		else rrtn=rrs1[rrj];
		rrcell1.innerHTML=rrtn;
		rrcell1.value=rrtn;
		rrcell1.id="resr"+rraid+"c"+rrc1;
		rrcell1.setAttribute("name","resr"+rraid+"c"+rrc1);
		rrcell1.style.width="180px";
		rrcell1.style.fontWeight="normal";
		rrcell1.style.textAlign="left";

	}
	else
	{
		rrcell1.innerHTML=rrs1[rrj];
		rrcell1.value=rrs1[rrj];
		rrcell1.id="resr"+rraid+"c"+rrc1;
		rrcell1.setAttribute("name","resr"+rraid+"c"+rrc1);
		rrcell1.style.width="180px";
		rrcell1.style.fontWeight="normal";
		rrcell1.style.textAlign="left";

        }
	rrc1=rrc1+1;
   }
  if(rrdata!=0)
     {
	var rrcell2=rrow.insertCell(rrc1);
	rrcell2.innerHTML="<img src=/images/dbedit.png  class=editdb id=res"+rraid+"edit"+id+" name=res"+rraid+"edit"+id+" style=width:20px;height:20px;cursor:pointer onclick='fnedit(this.id);'>";
	var rrcell3=rrow.insertCell(rrc1+1);
  rrcell2.style.textAlign="center";
  rrcell3.style.textAlign="center";
	rrcell3.innerHTML="<img  class=dropdb src=/images/dbdrop.png id=res"+rraid+"drop"+id+" name=res"+rraid+"drop"+id+" style=width:20px;height:20px;cursor:pointer onclick='fndrop(this.id);'>";
	}
     else
     {

var px11=document.getElementById("log_table");
px11.style.display="none";
var px=document.getElementById("noreqres");
px.style.display="block";

var px1=document.getElementById("no_reqres_table");
px1.style.display="block";
while(px1.rows[1]) px1.deleteRow(1);
var row=px1.insertRow(1);
       //row.colSpan="9";
       var temp1=row.insertCell(0);
       temp1.colSpan="9";	
       temp1.style.fontWeight="normal";
       temp1.style.textAlign="center";
       temp1.innerHTML="No Request Response Pattern";
	break;
    }

  }

},
error:function()
{
}
});

}





function adddevices()
{
document.getElementById("addenvdialog").style.display="none";
id=document.getElementById("d_name").value;
document.getElementById("pubd1").style.display="none;"
document.getElementById("d_name").value='';
document.getElementById("d_type").value='';
document.getElementById("d_desc").value='';

document.getElementById("will_topic").value='';
document.getElementById("will_msg").value='';
document.getElementById("will_retain").value='';

var px1=document.getElementById("pub_table");
while(px1.rows[2]) px1.deleteRow(2);
var sx1=document.getElementById("sub_table");
while(sx1.rows[2]) sx1.deleteRow(2);
var lx1=document.getElementById("log_table");
while(lx1.rows[1]) lx1.deleteRow(1);
addactive=document.getElementById("addactiveflag");
var x=document.getElementById("device");
addactive=document.getElementById("addactiveflag").value;
var addactive;
var urlcheck;
   urlcheck='/client/list/0?curr_time='+new Date().getTime();

dev_cnt=1;
dev_key=[];
activedev_key=[]
activedev_cnt=1;




       $.ajax({

   url: urlcheck,
    type: "GET",
    dataType: "json",
    async:false,

     success: function (msg) {
if (deviceClk==0)
{
obj=JSON.parse(msg);
var cnt=1;
x=document.getElementById("device");
var key;
for (key in obj)
{
dev_key[dev_cnt]=key;
dev_cnt++;
}
for (key in obj)
{
elt=document.createElement("li");
var ielt=document.createElement("i");
ielt.className="fa fa-circle-o";
elt.style.display="block";
elt.style.cursor="pointer";
elt.style.pointerEvents="auto";
if (cnt==1) first=key;
    if (cnt==1)
    elt.style.padding="14px 4px 4px 4px";
    else
    elt.style.padding="4px 4px 4px 4px";
    elt.innerHTML="<a class=detail id='device"+key+"' name='device"+key+"' onclick=devclick(this.id)><i class=detail></i> "+key+"</a>";
    top=top+30;
    elt.value="device"+key;
    x.appendChild(elt);	
    elt.style.display="none";
    cnt=cnt+1;
}
nd=cnt-1;
if (nd==0)
{
/*var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }*/
var errelt=document.getElementById("connectmsg");
errelt.style.display="block";
errelt.innerHTML="There are no devices connected. Please connect and load this page.";
return;
}
var list_size=$('#device li').size();
var rec_count_start=0;
var rec_count_end=rec_count_start+12;
if (rec_count_start==0)
{
$('#device li:gt(-1)').show();
var x=(20 <= list_size) ? 20 : list_size;
$('#device li:lt('+(x+1)+')').show();
$('#device li:gt('+x+')').hide();
}
var top3=80;
var stop_cnt=0;
var ee;
if (nd>20)  stop_cnt=20;
else stop_cnt=nd;
var ptag=document.getElementById("rec_count");
var ptagtxt="";
ptagtxt="1-"+stop_cnt+" of "+nd;
ptag.innerHTML=ptagtxt;
var md=document.getElementById("next");
if (nd>12)
{
md.className="nextimgg";
md.style.display="block";
md.disabled=false;
}
else
md.disabled=true;
var nxt_txt=document.getElementById("next_clk_txt");
nxt_txt.style.display="none";
document.body.appendChild(nxt_txt);
next_clk=parseInt(nxt_txt.value);
if (document.getElementById("deveditflag").value=="10")
{
disp_detail(first);
}
else if (document.getElementById("deveditflag").value=="1")
{
disp_detail(id);
}
else
{
disp_detail(key);
}
}
else
{
 disp_detail(id);
}
      
    },


    error: function () {
    }

});
}
function devclick(dev_id)
{
var xdetail=document.getElementsByClassName("detail");
var xd;
for(xd=0;xd<xdetail.length;xd++)
{
xdetail[xd].style.backgroundColor="#222d32";
xdetail[xd].style.border="none";
xdetail[xd].style.color="#b8c7ce";
}
dev_id=($(event.target).attr('id'));
id=dev_id.substring(6);
disp_detail(id);
}

function addbulkdevices()
{
  document.getElementById("choice").value="addbulk";
  var will_msg_type=document.getElementById("will_message_type").value;
  if (will_msg_type=="random")
    document.getElementById("will_message_txt").value=document.getElementById("will_random_message").value;
  else
    document.getElementById("will_message_txt").value=document.getElementById("will_start_message").value+" - "+document.getElementById("will_end_message").value;
  $.ajax({


   url: '/',
data: $("form[name='bulk_form']").serialize(),
    type: "POST",
    async:false,
     success:function (msg) {
    },
    error:function(msg){
    }
    
});

}
function addactivedevices()
{
document.getElementById("activedev").style.color="#FA0000";
document.getElementById("alldev").style.color="#000000";
document.getElementById("addactiveflag").value="1";
$("#device").innerHTML="";
adddevices();
}
function addalldevices()
{
document.getElementById("alldev").style.color="#FA0000";
document.getElementById("activedev").style.color="#000000";
document.getElementById("addactiveflag").value="0";
$("#device").innerHTML="";
adddevices();
}
