var auth = auth||{};
auth = (()=>{
	let _,js,compojs,rightCtnt;
	let init =()=>{
		_ = $.ctx();
		js = $.js();
		compojs = js+'/component/compo.js';
		r_cnt = '#right_content';
		l_cnt = '#left_content';
		onCreate();
	};
	let onCreate =()=>{
		setContentView();
	};
	let setContentView =()=>{
		$.getScript(compojs)
		.done(()=>{
			$(r_cnt).empty()
			$(compo.cust_login_form())
			.appendTo(r_cnt);
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
				.appendTo(l_cnt+' ul.nav')
				.click(function(){
					let that = $(this).attr('name');
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
						$('form button[type=submit]').click(e=>{
								e.preventDefault();
								alert('회원가입 클릭');
								join();
							});
						break;
					case 'register':
						$(r_cnt).empty();
						$(compo.emp_access_form())
						.appendTo(r_cnt);
						$('form button[type=submit]').click(e=>{
							e.preventDefault();
							alert('어세스 클릭');
							access();
						});
						break;
					case 'access':
						$(r_cnt).empty();
						 $(compo.emp_register_form())
						.appendTo(r_cnt);
						$('form button[type=submit]').click(e=>{
							e.preventDefault();
							alert('레지스터 클릭');
							register();
						});
						break;
					}
				});
		});
	})
		.fail(()=>{
			alert('/component/compo.js 를 찾지 못했습니다.');
		});
	};
	let login =()=>{
			let data ={
					customerID:$('form input[name=uname]').val(),
					password:$('form input[name=psw]').val()};
			$.ajax({
				url : _+'/users/cust'+data.customerID,
				type : 'POST',
				data : JSON.stringify(data),
				dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					if(d.customerID!==''){
						alert('로그인 성공'+d.customerID);
						$('#right_content').empty();
						$(compo.cust_mypage()).appendTo('#right_content');
						cust.init();
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
			url : _+'/users/cust',
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
		let data ={
				employeeID:$('form input[name=employeeID]').val(),
				name:$('form input[name=name]').val(),
				manager:$('form input[name=manager]').val(),
				birthDate:$('form input[name=birthDate]').val(),
				photo:$('form input[name=photo]').val(),
				notes:$('form input[name=notes]').val()
		};
		$.ajax({
			url : _+'/users/cust'+data.customerID,
			type : 'POST',
			data : JSON.stringify(data),
			contentType : 'application/json',
			success : d=>{
				if(d.customerID!==''){
					alert('회원가입 성공 '+d.customerName);
					$(r_cnt).html(compo.cust_mypage());
				}else{
					alert('회원가입 실패');
				}
			},
			error : e=>{
				alert('실패');
			}
		})
	};
	return {init:init};	
})();