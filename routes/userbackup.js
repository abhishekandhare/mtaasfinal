var mysql = require('./mysql');
/*
 * GET users listing.
 */
var process_id;
var project_id;
//LOGOUT FUNCTION
exports.logoutsession = function(req,res){
console.log("checking logout");	
req.session.destroy();
res.send({"status":200});
};
	
var process_status = 'pending';
//MAINTAINING SESSION LOGIN
exports.checklogin = function(req, res){
	console.log("checking session");
	console.log(req.session.uname);
	  if(req.session.uname)
		  {
		  console.log("session is"+req.session.uname);
		  res.send({"status":200});
		  }
	  else
		  {
		  res.send({"status":300});
		  }
	};
//LOGIN PAGE
	exports.signin = function(req, res){
		
		console.log(req.param("name","password"));
		var name = req.param("name");
		var password = req.param("password");
		
		var myquery = "Select * from authenticate where username = '"+name+"'and passwordd='"+password+"' ";
		mysql.fetchData(function(err,results){
					if(err)
						{
							throw err;
						}
					else
						{
						if(results.length > 0)
							{
						req.session.uname = results[0].username;
							console.log("success");
							res.render('home');							
							} 
						else
							{
							console.log("Invalid User Name & Password");
							res.send({"status":100});	
							}
						}
					
				},myquery);
			};

//LOGIN TESTER PAGE
	exports.signintester = function(req, res){
		
		console.log(req.param("name","password"));
		var name = req.param("name");
		var password = req.param("password");
		
		var myquery = "Select * from authenticate where username = '"+name+"'and passwordd='"+password+"' ";
		mysql.fetchData(function(err,results){
					if(err)
						{
							throw err;
						}
					else
						{
						if(results.length > 0)
							{
						req.session.uname = results[0].username;
							console.log("success");
							res.render('testerhome');							
							} 
						else
							{
							console.log("Invalid User Name & Password");
							res.send({"status":100});	
							}
						}
					
				},myquery);
			};
// process info kept global
exports.processfetch = function(req, res){
	console.log(req.param("processid"));
	process_id=req.param("processid");
	//console.log("testing process id: " +process_id);
	res.render('processview');
};
	exports.approvedsupplier = function(req, res){
		console.log("Test:" + req.param("approval"));
		var result =req.param("approval");
		var myquery= "update addsupplierpage set approval='"+result+"' where addsupplierpage_id="+process_id+"";
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			}
			else {
				var myquery1="update process set process_status = 'Approved' where process_id="+process_id+"";
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					}
					else {
						console.log("Entry successfully updated in process table");
						res.render('processsupplier')
					}
				}, myquery1);
		console.log("Entry successfully updated in addsuppplierpage table");
	}
}, myquery);
		};
	//console.log("testing process id: " +process_id);
	//res.render('processview');
exports.processview = function (req,res)
{
	res.render('processview');
}
exports.processdetail = function (req,res)
{
	var getProcess="select * from addsupplierpage where addsupplierpage_id = "+process_id+"";
	console.log("Query is:"+getProcess);
	mysql.fetchData(function(err,results){
				if(!err){
					console.log(results);
					var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched");
					res.send({"result":JSON.stringify(results)});
				}
				else {
					console.log(err);
				}
			}
			,getProcess);
};
//User Details
exports.homeusername = function(req, res){
	console.log(req.session.uname);
	var myquery = "select * from addsupplierpage where addsupplierpage_id = "+process_id;
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log(results);
			var jsonstr=JSON.stringify(results);
			console.log(jsonstr);
			console.log("Entry successfully fethced and displayed on GUI");
			//res.send(JSON.stringify(results));
			res.send({"result":jsonstr});
		}
	}, myquery);
};
//SUPPLIER SIGNUP PAGE
			exports.signup = function(req, res) {
				console.log(req.param("fname", "lname", "email", "name", "password",
						"cpassword", "company", "supplier"));
				var fname = req.param("fname");
				var lname = req.param("lname");
				var email = req.param("email");
				var name = req.param("name");
				var password = req.param("password");
				var cpassword = req.param("cpassword");
				var company = req.param("company");
				var supplier = req.param("supplier");
				
				var myquery = "insert into suppliersignup (firstname,lastname,email,username,passwordd,cpasswordd,company,supplier) values ('" + fname + "','" + lname + "','" + email + "','" + name + "','" + password + "','" + cpassword + "','" + company + "','" + supplier + "')";
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						
						
						var myquery1 = "insert into authenticate (username,passwordd)values ('" + name + "', '" + password + "')";
						
						mysql.fetchData(function(err, results1) {
							if (err) {
								throw err;
							} else {
								console.log("Entry successfully made in authenticate table");
								res.render('login');
							}
						}, myquery1);
						
						
						
						console.log("Entry successfully made in suppliersignup table");
					}
				}, myquery);
				
				
			};
//SIGNUP PAGE
			exports.register = function(req, res){
				  res.render('signup');
			};
			
			exports.login = function(req, res){
				  res.render('login');
			};
//ADD SUPPLIER PAGE
			exports.addsupplier = function(req, res){
				  res.render('addsupplier');
			};
			
			
//EDIT SUPPLIER PAGE
			exports.editsupplier = function(req, res){
				  res.render('editsupplier');
			};
			
			
//UPDATE SUPPLIER PAGE
			exports.updatesupplier = function(req, res){
				  res.render('updatesupplier');
			};
			exports.processinfo = function(req, res){
				   res.render('processinfo');
			};
			//SEARCH SUPPLIER PAGE
						exports.searchsupplier = function(req, res){
							  res.render('searchsupplier');
						};
				//PROCESS SUPPLIER PAGE
							exports.processsupplier = function(req, res){
									  res.render('processsupplier');
									};
						
						//HOME SUPPLIER PAGE
									exports.home = function(req, res)  {
										  res.render('home');
									};

//TESTER HOME PAGE

//HOME SUPPLIER PAGE

//ADDIGN SUPPLIER DETAILS IN DETAILED PAGE
			//TESTER SIGNUP PAGE
			exports.addsupplierdetails = function(req, res) {
				console.log(req.param("suppliername", "supplieremail", "legal", "commodity", "website",
						"glocation", "addressline1", "addressline2", "city","postcode","country","state",
						"sfirstname","slastname","phone","email","fax","pemail"));
				var suppliername = req.param("suppliername");
				var supplieremail = req.param("supplieremail");
				var legal = req.param("legal");
				var commodity = req.param("commodity");
				var website = req.param("website");
				var glocation = req.param("glocation");
				var addressline1 = req.param("addressline1");
				var addressline2 = req.param("addressline2");
				var city = req.param("city");
				var postcode = req.param("postcode");
				var country = req.param("country");
				var state = req.param("state");
				var sfirstname = req.param("sfirstname");
				var slastname = req.param("slastname");
				var phone = req.param("phone");
				var email = req.param("email");
				var fax = req.param("fax");
				var pemail = req.param("pemail");
				
				var myquery = "insert into addsupplierpage(suppliername,emailaddress,legalstructure,commodity,website,location,addressline1,addressline2,city,postcode,country,state,supplierfirstname,supplierlastname,phone,fax,primaryemail) values ('" + suppliername + "','" + supplieremail + "','" + legal + "','" + commodity + "','" + website + "','" + glocation + "','" + addressline1 + "','" + addressline2 + "','" + city + "','" + postcode + "','" + country + "','" + state + "','" + sfirstname + "','" + slastname + "','" + email + "','" + fax + "','" + pemail + "')";
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					}
					else {
						
									
						var id = "select addsupplierpage_id from addsupplierpage where suppliername= '"+ suppliername +"' ";
						var myquery1 = "insert into process(process_id,suppliername,process_type,process_status) values ((" + id + "), '" + suppliername + "','add','"+process_status+"')";
						mysql.fetchData(function(err, results) {
							if (err) {
							throw err;
						}
						else {
						console.log("Entry successfully made in authenticate table");
						}
					}, myquery1);
				
				console.log("Entry successfully made in authenticate table");
				res.render('home');
				}
				}, myquery);
			};
//FECTH SUPPLIER DETAILS ON SEARCH SUPPLIER PAGE
			
			exports.searchsupplierdetails = function(req, res){
				var getUser="select * from addsupplierpage";
			
				console.log("Query is:"+getUser);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,getUser);
			};
				
//FETCH PROCESS DETAILS ON PROCESS PAGE	 
			
			exports.processsupplierdetails = function(req, res){
				var getUser="select * from process";
			
				console.log("Query is:"+getUser);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,getUser);
			};
		
//GET Project Details on separate page

exports.projdet = function(req, res){
	project_id=req.param("id");
    console.log("Ankit Gupta");
    console.log(project_id);
};



			/*
//practice post			
			
			exports.addcontact = function(req, res) {
				console.log(req.param("fname", "lname", "email"));
				var fname = req.param("fname");
				var lname = req.param("lname");
				var email = req.param("email");
				var myquery = "insert into contactlist(firstname,lastname,email) values ('" + fname + "','" + lname + "','" + email + "')";
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					}
					else {
						console.log("Entry successfully made in contactlist table");
						res.render('addentry');
					}
				}, myquery);
			};
//practice get 
			
			exports.contactlist = function(req, res){
				var getUser="select * from contactlist";
			
				console.log("Query is:"+getUser);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,getUser);
			};
				   	
			*/



exports.testerhome = function(req,res){
res.render('testerhome');
};