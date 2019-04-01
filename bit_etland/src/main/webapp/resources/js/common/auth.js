var auth = auth||{};
auth = (()=>{
	let _,js,compojs,rightCtnt;
	let init =()=>{
		_ = $.ctx();
		js = $.js();
		compojs = js+'/component/compo.js';
		r_cnt = '#right_content';
		l_cnt = '#left_content';
		custjs = js+'/customer/cust.js';
		onCreate();
	};
	let onCreate =()=>{
		setContentView();
	};
	let setContentView =()=>{
		$.getScript(compojs,()=>{
			$(r_cnt).html(compo.cust_login_form());
			$('form button[type=submit]').click(e=>{
				e.preventDefault();
				login();
			});
			$(l_cnt+' ul.nav').empty();
			let arr=[{
				txt :'로그인',name : 'login'
			},{
				txt :'회원가입',name : 'join'
			},{
				txt :'사원등록',name : 'register'
			},{
				txt :'사원접속',name : 'access'
			}];
			$.each(arr,(i,j)=>{
				$('<li><a href="#">'+j.txt+'</a></li>')
				.attr('name', j.name)
				.attr('id',j.name)
				.appendTo(l_cnt+' ul.nav')
				.click(function(){
					let that = $(this).attr('name');
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
					switch(that){
					case 'login':
						$(r_cnt).empty();
						$(compo.cust_login_form())
						.appendTo(r_cnt);
						$('form button[type=submit]').click(e=>{
							e.preventDefault();
							login();
						});
						break;
					case 'join':
						$(r_cnt).empty();
						$(compo.cust_join_form())
						.appendTo(r_cnt);
								join();
						break;
					case 'register':
						$(r_cnt).empty();
						$(compo.emp_register_form())
						.appendTo(r_cnt);
							access();
						break;
					case 'access':
						$(r_cnt).empty();
						$(compo.emp_access_form())
						.appendTo(r_cnt);
						$('#accessbtn').click(e=>{
							e.preventDefault();
							alert('접근확인');
						});
						break;
					}
				});
		});
			$('#login').addClass('active');
	})
		.fail(()=>{
			alert('/component/compo.js 를 찾지 못했습니다.');
		});
	};
	let login =()=>{
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
							cust.init();
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
	let join =()=>{
		let data ={
				customerID:$('form input[name=unme]').val(),
				password:$('form input[name=psw]').val(),
		};
		$.ajax({
			url : _+'/customers',
			type : 'POST',
			data : JSON.stringify(data),
			contentType : 'application/json',
			success : d=>{
				if(d.mag==='SUCCESS'){
					alert('회원가입 성공 '+d.mag);
					$(r_cnt).html(compo.cust_login_form());
					$('form button[type=submit]').click(e=>{
						e.preventDefault();
						login();
					});
				}else{
					alert('회원가입 실패');
					$("#right_content").html(compo.cust_join_form());
					join();
				}
			},
			error : e=>{
				alert('실패');
			}
		})
	};
	let register =()=>{
		let data ={
				employeeID:$('form input[name=employeeID]').val(),
				name:$('form input[name=name]').val(),
				manager:$('form input[name=manager]').val(),
				birthDate:$('form input[name=birthDate]').val(),
				photo:$('form input[name=photo]').val(),
				notes:$('form input[name=notes]').val()
		};
		$.ajax({
			url : _+'/users/emp',
			type : 'POST',
			data : JSON.stringify(data),
			contentType : 'application/json',
			success : d=>{
				if(d.mag==='SUCCESS'){
					alert('회원가입 성공 '+d.mag);
					$(r_cnt).html(compo.cust_login_form());
					$('form button[type=submit]').click(e=>{
						e.preventDefault();
						login();
					});
				}else{
					alert('회원가입 실패');
					$("#right_content").html(compo.cust_join_form());
					join();
				}
			},
			error : e=>{
				alert('실패');
			}
		})
	};
	let access =()=>{
		let ok = confirm('사원 입니까?');
		if(ok){
			let emp_no = prompt('사원번호 입력하세요');
			$.getJSON(_+'/employees',d=>{
				if(emp_no === d.employeeID){
					//고객 명단
					$.getScript(compojs,()=>{
						$(r_cnt).html(emp_access_form());
						cust.list();
					});
				}
			});
			if(emp_no==1000){
				// 이름 이력참을 그린다
				alert('사원 인증');
			}else{
				alert('사원번호가 일치하지 않습니다.');
				// 사원번호가 일치하지 않습니다.
			}
		}else{
			alert('사원 전용 페이지 입니다');
			// 사원 전용 페이지 입니다
			// 되돌아가기 버튼이 보입니다.
		}
	};
	return {init:init};	
})();




