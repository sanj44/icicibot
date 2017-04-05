module.exports = function(bp) {	
  var https = require('https');
  var UserData={};
  var token={};
  bp.middlewares.load();
  bp.hear(/account number|no/i, (event, next) => { 
		var optionsget = {
			host : 'retailbanking.mybluemix.net', 
			port : 443,
			path : '/banking/icicibank/participantmapping?client_id=vibhas.kdhingra@gmail.com', 
			method : 'GET' 
		};
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(d) {
				UserData=JSON.parse(d.toString())[0];
				const first_name = event.user.first_name
				bp.messenger.sendText(event.user.id, 'Hello, ' + first_name +", your account number is " +UserData.account_no, { typing: true })
			});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
			console.error(e);
		});
  }); 
  
  bp.hear(/authenticate me/i, (event, next) => {	  
			var optionsget = {
				host : 'corporateapiprojectwar.mybluemix.net', 
				port : 443,
				path : '/corporate_banking/mybank/authenticate_client?client_id=vibhas.kdhingra@gmail.com&password=CDPMGK5R', 
				method : 'GET' 
			};
			var reqGet = https.request(optionsget, function(res) {
				res.on('data', function(d) {
					token=JSON.parse(d.toString())[0];
					const first_name = event.user.first_name
					bp.messenger.sendText(event.user.id,  first_name +",  you are successfully authenticated, Now you can ask questions related to your account.", { typing: true })
				});
			});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.error(e);
			});
  
  });
  
  bp.hear(/spent on movie/i, (event, next) => {	  
			
			var optionsget = {
				host : 'retailbanking.mybluemix.net', 
				port : 443,
				path : '/banking/icicibank/transactioninterval?client_id=vibhas.kdhingra@gmail.com&token='+token.token+'&accountno=4444777755550993&fromdate=2017-03-01&todate=2017-04-01', 
				method : 'GET' 
			};
			var reqGet = https.request(optionsget, function(res) {
				res.on('data', function(d) {
					UserData=JSON.parse(d.toString());
					var amountspent=0;
					for(var i=0;i<UserData.length;i++){
						if(UserData[i].remark=="Movie Ticket"){
							amountspent+=parseInt(UserData[i].transaction_amount);
						}
					}
					const first_name = event.user.first_name
					bp.messenger.sendText(event.user.id,  first_name +",  you spent "+amountspent.toString()+" INR last month on Movie tickets.", { typing: true })
				});
			});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.error(e);
			});
  });  
    bp.hear(/electricity bill due/i, (event, next) => {	  
			var optionsget = {
				host : 'retailbanking.mybluemix.net', 
				port : 443,
				path : '/banking/icicibank/ndaystransaction?client_id=vibhas.kdhingra@gmail.com&token='+token.token+'&accountno=4444777755550993&days=100', 
				method : 'GET' 
			};
			var reqGet = https.request(optionsget, function(res) {
				res.on('data', function(d) {
					UserData=JSON.parse(d.toString());
				
					var amountspent=0;
					for(var i=0;i<UserData.length;i++){
						if(UserData[i].remark=="Electricity"){
							amountspent=i;
							break;
						}
					}
					const first_name = event.user.first_name
					if(amountspent){
						bp.messenger.sendText(event.user.id,  first_name +",  you spent "+UserData[amountspent].transaction_amount+" INR on "+UserData[amountspent].transactiondate+" for "+UserData[amountspent].remark+".", { typing: true });
					}
					else{
					bp.messenger.sendText(event.user.id,  first_name +", you not paid any of the electricity bill yet.", { typing: true });
					}
				});
			});
				reqGet.end();
				reqGet.on('error', function(e) {
					console.error(e);
		});
	});
      
	bp.hear(/How much was it last time Did i pay a penalty/i, (event, next) => {	  
		const first_name = event.user.first_name
		bp.messenger.sendText(event.user.id,  first_name +",  sorry for the inconvinence caused to you but unfortunately i am not able to answer.", { typing: true })
	});
	bp.hear(/How much do you think is my income tax/i, (event, next) => {	  
		const first_name = event.user.first_name
		bp.messenger.sendText(event.user.id,  first_name +",  this part of me is under development once my auther updated me i ll be able to calculate it for you,  Thank you "+first_name+".", { typing: true })
	});
	bp.hear(/How much did i invest last month/i, (event, next) => {	  
		const first_name = event.user.first_name
		bp.messenger.sendText(event.user.id,  first_name +",  sorry for the inconvinence caused to you but unfortunately i am not able to answer.", { typing: true })
	});
	bp.hear(/How is my portfolio doing/i, (event, next) => {	  
		const first_name = event.user.first_name
		bp.messenger.sendText(event.user.id,  first_name +",  sorry for the inconvinence caused to you but unfortunately i am not able to answer.", { typing: true })
	});
	bp.hear(/Insurance premium is due/i, (event, next) => {	  
		const first_name = event.user.first_name
		bp.messenger.sendText(event.user.id,  first_name +",  sorry for the inconvinence caused to you but unfortunately i am not able to answer.", { typing: true })
	});
	bp.hear(/Lost my credit card/i, (event, next) => {	  
		const first_name = event.user.first_name
		bp.messenger.sendText(event.user.id,  first_name +", sorry to hear that please call customer executive to block your card immidately", { typing: true })
	});
	bp.hear(/How much TAX did i pay last year/i, (event, next) => {	  
		const first_name = event.user.first_name
		bp.messenger.sendText(event.user.id,  first_name +", I cannot tell you that please ask me another question", { typing: true })
	});
	bp.hear(/What are recommended stock picks for the quarter/i, (event, next) => {	  
		const first_name = event.user.first_name
		bp.messenger.sendText(event.user.id,  first_name +",  .", { typing: true })
	});
}