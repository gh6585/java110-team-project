
//이전값을 저장해주는 변수
var _prevObj = null;
$(function() {

	// 캘린더 출력해주는 코드
	$('#calendar').fullCalendar({      
		dayClick: function(date, jsEvent, view, resourceObj) {
			if(_prevObj) {
				_prevObj.css('background-color', 'white');
				$(this).css('background-color', 'gray');
			} else {
				$(this).css('background-color', 'gray');
			}
			_prevObj = $(this);
			$("#selectday h2").html(date.format());
			$('#showtype h4').empty();
			$('.insertDate tbody').empty();
		}  
	})
});

//달력 아래 전체/진행중/완료 필터 처리
$('.chkFlag button').click(function(){
	var f = $(this).val();
	$.ajax({ 
		type : "POST", 
		url : "chkFlag", 
		dataType: 'json',
		data : {"flag" : f},
		success : function(data) {
			$('#suggests tbody').empty();
			if(data.length == 0){
				$("#suggests tbody").append('해당일의 스케줄이 존재하지않습니다.');
			}else{
				$.each(data,function(index,item){
					if(item.flag==1){
						$("#suggests tbody").append(
								'<tr>'+
								'<td>'+item.busker.teamname+'</td>'+
								'<td>'+item.busker.teamgenre+'</td>'+
								'<td>'+item.nsdt+'~'+item.nedt+'</td>'+
								'<td>'+item.cnt+'명</td>'+
								'<td>'+'신청중'+'</td>'+
								'<td>'+item.ncdt+'</td>'+
								'<td><button type="button"'+ 
								'class="btn btn-default"'+ 
								'data-target="#detailModal"'+ 
							    'data-toggle="modal"'+
							    'value="'+item.sno+
							    '">상세보기</button></td></tr>');
					}else if(item.flag==2){
						$("#suggests tbody").append(
								'<tr>'+
								'<td>'+item.busker.teamname+'</td>'+
								'<td>'+item.busker.teamgenre+'</td>'+
								'<td>'+item.nsdt+'~'+item.nedt+'</td>'+
								'<td>'+item.cnt+'명</td>'+
								'<td>'+'완료'+'</td>'+
								'<td>'+item.ncdt+'</td>'+
								'<td><button type="button" class="btn btn-default" data-target="#detailModal"'+ 
							    'data-toggle="modal" value="'+item.sno+'">상세보기</button></td></tr>');
					}else{
						$("#suggests tbody").append(
								'<tr>'+
								'<td>'+item.busker.teamname+'</td>'+
								'<td>'+item.busker.teamgenre+'</td>'+
								'<td>'+item.nsdt+'~'+item.nedt+'</td>'+
								'<td>'+item.cnt+'명</td>'+
								'<td>'+'etc'+'</td>'+
								'<td>'+item.ncdt+'</td>'+
								'<td><button type="button" class="btn btn-default" data-target="#detailModal"'+ 
							    'data-toggle="modal" value="'+item.sno+'">상세보기</button></td></tr>');
					}
				});
			}

		},
		error : function(request, status, error) {
			alert("에러가 발생했습니다. 관리자에게 문의하시기 바랍니다");
		}
	});

});


//날짜를 현재 날짜로 설정
var dt = new Date();
var month = dt.getMonth()+1;
var day = dt.getDate();
var year = dt.getFullYear();
var today=year+"-"+month+"-"+day;



//등록가능한 무대일정 출력 & 체크할 수 있게.
function add(){
	var td = $('#showDate').text();
	if(td==null || td==''){
		alert("날짜를 먼저 선택해주세요");
		return;
	}
		
	$('#showtype h4').empty();
	$('#showtype h4').append('무대등록하기');

	$.ajax({ 
		type : "POST", 
		url : "showPossibleDate", 
		dataType: 'json',
		data : {"date" : td},
		success : function(data){
			$('.insertDate tbody').empty();
			$.each(data,function(index,item){
				$(".insertDate tbody").append(
						'<tr>'+
						'<td>'+'<input type="checkbox" name="insertdate" value="'+item+'">'+item+'</td>'+
				'</tr>');
			});
			$(".insertDate tbody").append(
					'<tr>'+
					'<td>' + '<button onclick="addDate()">등록하기</button>'+'</td>'+
					'</tr>'
			)            

		},
		error : function(request, status, error) {
			alert("에러가 발생했습니다. 관리자에게 문의하시기 바랍니다");
		}
	});

}

//삭제가능한 무대일정 출력&체크할 수 있게
function remove(){
	var td = $('#showDate').text();
	if(td==null || td==''){
		alert("날짜를 먼저 선택해주세요");
		return;
	}
	$('#showtype h4').empty();
	$('#showtype h4').append('무대 삭제하기');

	$.ajax({ 
		type : "POST", 
		url : "showDate", 
		dataType: 'json',
		data : {"date" : td},
		success : function(data){
			$('.insertDate tbody').empty();
			if(data.length == 0){
				$(".insertDate tbody").append(
						'<tr>'+
						'<td>'+'해당 일자에 등록된 무대 일정이 없습니다.'+'</td>'+
				'</tr>');      
			}else{
				$.each(data,function(index,item){
					$(".insertDate tbody").append(
							'<tr>'+
							'<td>'+'<input type="checkbox" name="stagedate" value="'+item.sno+'">'+item.nsdt+'~'+item.nedt+'</td>'+
					'</tr>');
				});
				$(".insertDate tbody").append(
						'<tr>'+
						'<td>' + '<button onclick="removeDate()">삭제하기</button>'+'</td>'+
						'</tr>'
				)
			}
		},
		error : function(request, status, error) {
			alert("에러가 발생했습니다. 관리자에게 문의하시기 바랍니다");
		}
	});

}

//체크한 일정 삭젷가ㅣ
function removeDate(){
	var td = $('#showDate').text();
	var chkbox = document.getElementsByName("stagedate");
	var chkCnt=0;
	var chks = new Array();
	var j=0;
	for(var i=0;i<chkbox.length; i++){
		if(chkbox[i].checked){
			chks[j] = chkbox[i].value;
			j++
			chkCnt++;
		}
	}

	if(chkCnt == 0){
		alert("삭제하실 일정을 체크해주세요");
	}


	$.ajax({ 
		type : "GET", 
		url : "removeDate", 
		traditional : true,
		data : {"stagedate" : chks},
		success : function(data){
			if(data != null){
				alert("success!");
				window.location.href=window.location.href;
			}else{
				alert("fail!");
			}
		},
		error : function(request, status, error) {
			alert("에러가 발생했습니다. 관리자에게 문의하시기 바랍니다");
		}
	});


}

function addDate(){
	var td = $('#showDate').text();
	var chkbox = document.getElementsByName("insertdate");
	var chkCnt=0;
	var addchk = new Array();
	var j=0;
	for(var i=0;i<chkbox.length; i++){
		if(chkbox[i].checked){
			addchk[j] = chkbox[i].value;
			j++;
			chkCnt++;
		}
	}

	if(chkCnt == 0){
		alert("등록하실 일정을 체크해주세요");
	}

	$.ajax({ 
		type : "GET", 
		url : "insertDate", 
		traditional : true,
		data : {"insertDate" : addchk, "day" : td},
		success : function(data){
			if(data != null){
				alert("success!");
				window.location.href=window.location.href;
			}else{
				alert("fail!");
			}
		},
		error : function(request, status, error) {
			alert("에러가 발생했습니다. 관리자에게 문의하시기 바랍니다");
		}
	});
}

$('#suggests tbody button').click(function(){
	var brno = $(this).val();
	$.ajax({ 
		type : "GET", 
		url : "showInfo", 
		data : {"brno" : brno},
		success : function(data){
			$('.info').empty();
			$(".dates").empty();
			if(data.length != 0){
				$(".info").append(
					    "<h3>"+data.busker.teamname+"</h3>"+
						/*"<img src='/upload/"+data.busker.teamPhoto+"' alt='버스커 이미지'>"+*/
						"<button value="+data.busker.no+">"+"피드링크연결필요"+"</button>"+
						"<table>"+
						"<tr><td>팀명</td><td>"+data.busker.teamname+"</td></tr>"+
						"<tr><td>장르</td><td>"+data.busker.teamgenre+"</td></tr>"+
						"<tr><td>연락처</td><td>"+data.busker.tel+"</td></tr>"+
						"<tr><td>좋아요</td><td>"+data.busker.likecount+"</td></tr>"+
						"<tr><td>메시지</td><td>"+data.busker.message+"</td></tr>");
				$.each(data.scheduletime,function(index,item){
					$('.dates').append(
					  '<tr>'+
					  '<td>'+'<input type="checkbox" name="reqdates" value="'+item.snsdt+'">'
					  +item.snsdt+'~'+item.snedt+'</td>');
					});
			}else
				alert("fail!");
		},
		error : function(request, status, error) {
			alert("에러가 발생했습니다. 관리자에게 문의하시기 바랍니다");
		}
	});
});
