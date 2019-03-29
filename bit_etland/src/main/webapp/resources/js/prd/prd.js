var prd = prd || {};
prd = (()=>{
	let init=x=>{
		onCreate();
	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
		$.when(
                $.js()+'/component/compo.js',
                $.js()+'/customer/cust.js'
        ).done(()=>{
            $('#right_content').empty();
             $('#right_content').html(compo.carousel());
             let i = 0;
             for(i=1; i<4;i++){
            	 $('#caro-img-'+i)
            	 .attr('src',$.img()+'/s10-'+i+'.jpg')
            	 .css('width','600px')
            	 ;
             };
        })
	};
	let post=()=>{
		
	};
	let get=()=>{
		
	};
	let put=()=>{
		
	};
	let del=()=>{
		
	};
	return {init: init};
})();