var cust = cust || {}
cust = (()=>{
	let _,js,compojs,r_cnt, l_cnt;
	let init =()=>{
		reset();
		onCreate();
	}
	let reset=()=>{
		_ = $.ctx();
		js = $.js();
		compojs = js+'/component/compo.js';
		r_cnt = '#right_content';
		l_cnt = '#left_content';
		prdjs = js+'/prd/prd.js';
	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
		$.getScript(compojs,()=>{
			$(r_cnt).html(compo.cust_mypage());
			// 왼쪽 네비게이션
			$(l_cnt+' ul.nav').empty();
			let arr=[{
				txt : '마이페이지', name : 'mypage'
			},{
				txt : '정보수정', name : 'update'
			},{
				txt : '회원탈퇴', name : 'remove'
			},{
				txt : '쇼핑몰', name : 'shop'
			},{
				txt : '구매내역', name : 'buylist'
			},{
				txt : '장바구니', name : 'cart'
			}];
			$.each(arr,(i,j)=>{
				 $('<li><a href="#">'+j.txt+'</a></li>')
				 .attr('name', j.name)
				 .attr('id', j.name)
				 .appendTo(l_cnt+' ul.nav')
				 .click(function(){
					 let that = $(this).attr('name');
					 $(this).addClass('active');
					 $(this).siblings().removeClass('active');
					 switch(that){
					 case 'update':
						 /*$(r_cnt).empty();
						 $(compo.cust_login_form())
						 .appendTo(r_cnt);
						 $('form button[type=submit]').click(e=>{
							e.preventDefault();
							login();
						});*/
						 break;
					 case 'remove':
						 break;
					 case 'shop':
						$.getScript(prdjs,()=>{
							prd.init();
						}).fail(()=>{});
						 break;
					 case 'buylist':
						 
						 break;
				 	 case 'cart':
						 
						 break;	
					 }
				 });
			});
			$('#mypage').addClass('active');
		});
	};
	let shop =()=>{
		let data ={
				customerID:$('form input[name=customerID]').val(),
				password:$('form input[name=password]').val()};
		$.ajax({
			url : _+'/customers/'+data.customerID,
			type : 'POST',
			data : JSON.stringify(data),
			dataType : 'json',
			contentType : 'application/json',
			success : d=>{
				if(d.customerID!==''){
					alert('로그인 성공'+d.customerID);
					$('#right_content').empty();
					//$(compo.cust_mypage()).appendTo('#right_content');
					$.getScript(custjs,()=>{
						prd.init();
					});
				}else{
					alert('로그인 실패');
				}
			},
			error : e=>{
				alert('실패');
			}
		});
};
	let list =()=>{
		reset();
		$.getJSON(_+'/customers/page/1',d=>{
			alert('리스트');
			let html = '<table><tr><th></th>'
				+'<th>아이디</th>'
				+'<th>이름</th>'
				+'<th>생년월일</th>'
				+'<th>성별</th>'
				+'<th>전화</th>'
				+'<th>주소</th>'
				+'<th>우편번호</th>'
				+'</tr>'
			$.each(d,(i,j)=>{
				html  += '<tr><td>'+j.rnum+'</td>'
				+'<th>'+j.customerID+'</th>'
				+'<th>'+j.customerName+'</th>'
				+'<th>'+j.ssn+'</th>'
				+'<th>'+j.남+'</th>'
				+'<th>'+j.address+'</th>'
				+'<th>'+j.city+'</th>'
				+'<th>'+j.postalCode+'</th>'
				+'</tr>'
			});
			html += '</table>'
				$(r_cnt).html(html);
		});
	};
	
	return {init: init , list:list};
})();
