var mysql = require('./mysql');
/*
 * GET users listing.
 */
//var uname;
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


//LOGIN PAGE
	exports.signinmanager = function(req, res){
		
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
							res.render('managerhome');							
							} 
						else
							{
							console.log("Invalid User Name & Password");
							res.send({"status":100});	
							}

						}
					
				},myquery);
			};
//TESTER SIGNUP PAGE
			exports.signup = function(req, res) {
				console.log(req.param("name", "email", "phone", "qualification", "skills",
						"mobileos", "expretise", "username","password"));
				var name = req.param("name");
				var email = req.param("email");
				var phone = req.param("phone");
				var qualification = req.param("qualification");
				var skills = req.param("skills");
				var mobileos = req.param("mobileos");
				var expretise = req.param("expretise");
				var username = req.param("username");
                var password = req.param("password");
				

				var myquery = "insert into testersignup (name,email,phone,qualification,skills,mobileos,expretise,username,passwordd) values ('" + name + "','" + email + "','" + phone + "','" + qualification + "','" + skills + "','" + mobileos + "','" + expretise + "','" + username + "','" + password + "')";
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						
						
						var myquery1 = "insert into authenticate (username,passwordd)values ('" + username + "', '" + password + "')";
						
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

//APP MANAGER SIGNUP PAGE
			exports.appmanagersignup = function(req, res) {
				console.log(req.param("name", "email", "phone", "testtype", "company",
						"billingplan", "expretise", "username","password"));
				var name = req.param("name");
				var email = req.param("email");
				var phone = req.param("phone");
				var testtype = req.param("testtype");
				var company = req.param("company");
				var billingplan = req.param("billingplan");
				var expretise = req.param("expretise");
				var username = req.param("username");
                var password = req.param("password");
				

				var myquery = "insert into appmanagersignup (name,email,phone,testtype,company,billingplan,expretise,username,passwordd) values ('" + name + "','" + email + "','" + phone + "','" + testtype + "','" + company + "','" + billingplan + "','" + expretise + "','" + username + "','" + password + "')";
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						
						
						var myquery1 = "insert into authenticate (username,passwordd)values ('" + username + "', '" + password + "')";
						
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



//  REGISTER FOR PPROJECTS IN PROJECT DETAILS PAGE
			exports.registerproject = function(req, res) {
				console.log(req.param("testerid", "testername", "appmanagerid", "appmanagername", "appname",
						"appurl", "testurl", "testdesc","startdate","enddate"));
				var testerid = req.param("testerid");
				var testername = req.param("testername");
                var appmanagerid = req.param("appmanagerid");
				var appmanagername = req.param("appmanagername");
				var appname = req.param("appname");
				var appurl = req.param("appurl");
				var testurl = req.param("testurl");
				var testdesc = req.param("testdesc");
				var startdate = req.param("startdate");
				var enddate = req.param("enddate");

				var myquery = "insert into registeredprojects (testerid,testername,appmanagerid,appmanagername,appname,appurl,testurl,testdesc,startdate,enddate) values ('" + testerid + "','" + testername + "','"+ appmanagerid + "','" + appmanagername + "','" + appname + "','" + appurl + "','" + testurl + "','" + testdesc + "','" + startdate + "','" + enddate + "')";
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {						
                        console.log("Entry successfully made in PROJECT DETAILS table");}
				}, myquery);
				
			};





//ADD PPROJECTS IN PROJECT DETAILS PAGE
			exports.addproject = function(req, res) {
				console.log(req.param("appmanagerid", "appmanagercompany", "appname", "appurl", "testurl",
						"testdesc", "startdate", "enddate"));
				var appmanagerid = req.param("appmanagerid");
				var appmanagercompany = req.param("appmanagercompany");
				var appname = req.param("appname");
				var appurl = req.param("appurl");
				var testurl = req.param("testurl");
				var testdesc = req.param("testdesc");
				var startdate = req.param("startdate");
				var enddate = req.param("enddate");

				var myquery = "insert into projectdetails (appmanagerid,appmanagername,appname,appurl,testurl,testdesc,startdate,enddate) values ('" + appmanagerid + "','" + appmanagercompany + "','" + appname + "','" + appurl + "','" + testurl + "','" + testdesc + "','" + startdate + "','" + enddate + "')";
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {						
                        console.log("Entry successfully made in PROJECT DETAILS table");}
				}, myquery);
				
			};


//Get Indivudal Project Details

exports.getproj = function(req, res){
    
    var myquery = "select * from projectdetails where projectid=" + project_id;
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {	
                        res.send({"status":100,"results":results})
                        console.log("Entry successfully made in PROJECT DETAILS table");}
				}, myquery);
				 
			};
//GET TESTER PROFILE INFORMATION
exports.gettesterprofile = function(req, res){
    
    var myquery = "select * from testersignup where username = '"+req.session.uname+"'";
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {	
                        res.send({"status":100,"results":results})
                        console.log("Entry successfully made in PROJECT DETAILS table");}
				}, myquery);
				 
			};

//GET TESTER PROFILE INFORMATION
exports.getmanagerprofile = function(req, res){
    
    var myquery = "select * from appmanagersignup where username = '"+req.session.uname+"'";
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {	
                        res.send({"status":100,"results":results})
                        console.log("Entry successfully made in PROJECT DETAILS table");}
				}, myquery);
				 
			};


//SIGNUP PAGE
			exports.register = function(req, res){
				  res.render('signup');
			};
            exports.managerhome = function(req, res){
				  res.render('managerhome');
			};

			exports.appmanagerregister = function(req, res){
				  res.render('appmanagersignup');
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
			
            //RENDER PROJECTS AVAILABLE PAGE
                        exports.projectsavailable = function(req, res){
							  res.render('projectsavailable');
						};
            //RENDER TESTER BILLING PAGE
                        exports.testerbilling = function(req, res){
							  res.render('testerbilling');
						};

			//RENDER TESTER PROFILE PAGE
						exports.testerprofile = function(req, res){
							  res.render('testerprofile');
						};

			//SEARCH SUPPLIER PAGE
						exports.managerprojectcreation = function(req, res){
							  res.render('managerprojectcreation');
						};
			//SEARCH SUPPLIER PAGE
						exports.projectevaluations = function(req, res){
							  res.render('projectevaluations');
						};

			//SEARCH SUPPLIER PAGE
						exports.managerbilling = function(req, res){
							  res.render('managerbilling');
						};
			//SEARCH SUPPLIER PAGE
						exports.managerprofile = function(req, res){
							  res.render('managerprofile');
						};


			//MANAGER PROJECT DETAILS SUPPLIER PAGE
						exports.projectdetailstester = function(req, res){
							  res.render('projectdetailstester');
						};

				//PROCESS SUPPLIER PAGE
							exports.processsupplier = function(req, res){
									  res.render('processsupplier');
									};
						
						//HOME SUPPLIER PAGE
									exports.home = function(req, res)  {
										  res.render('home');
									};

                        //TESTER PROJECT DETAILS
                                    exports.testerprojectdetails = function(req, res)  {
										  res.render('testerprojectdetails');
									};
                        //MANAGER PROJECT DETAILS
                                    exports.managerprojectdetails = function(req, res)  {
										  res.render('managerprojectdetails');
									};

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
				var getUser="select * from suppliers";
			
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

//FECTH PROJECT DETAILS ON TESTER HOME PAGE
			
			exports.searchprojectdetails = function(req, res){
				var getUser="select * from projectdetails";
			
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

//FECTH ENROLLED PROJECT DETAILS ON TESTER HOME PAGE
			
			exports.searchenrolledprojects = function(req, res){
			   console.log(req.session.uname);
			   var myquery = "select * from registeredprojects where testername = '"+req.session.uname+"'";
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

//FECTH PROJECT DETAILS ON PROJECT DETAILS PAGE
			
			exports.searchmanagerprojects = function(req, res){
			   console.log(req.session.uname);
			   var myquery = "select * from projectdetails where appmanagername = '"+req.session.uname+"'";
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


//FECTH countof projects ON home PAGE
			
			exports.getprojectcount = function(req, res){
			//	var getUser="SELECT count(*) FROM projectdetails where appmanagername= '"+req.session.uname+"'";
			var getUser="SELECT COUNT(DISTINCT projectid) AS projectid FROM projectdetails where appmanagername ='"+req.session.uname+"' ";
                var appmanagername = req.param("appmanagername");
				console.log("Query is:"+getUser);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched Project Count");
								res.send({"result":JSON.stringify(results)});
                                   // res.send({"result":results});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,getUser);
			};


//FECTH NUMBER OF TESTERS REGISTERED
			
			exports.getregtestercount = function(req, res){
			//	var getUser="SELECT count(*) FROM projectdetails where appmanagername= '"+req.session.uname+"'";
			var getUser="SELECT COUNT(DISTINCT regprojectid) AS regprojectid FROM registeredprojects where appmanagername ='"+req.session.uname+"' ";
                var appmanagername = req.param("appmanagername");
				console.log("Query is:"+getUser);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched Project Count");
								res.send({"result":JSON.stringify(results)});
                                   // res.send({"result":results});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,getUser);
			};





//FECTH COUNT OF ENROLLED PROJECTS ON TESTER HOME PAGE
			
			exports.getenrolledprojectcount = function(req, res){
			//	var getUser="SELECT count(*) FROM projectdetails where appmanagername= '"+req.session.uname+"'";
			var getUser="SELECT COUNT(*) AS testerid FROM registeredprojects where testername ='"+req.session.uname+"' ";
                var testername = req.param("testername");
				console.log("Query is:"+getUser);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched Project Count");
								res.send({"result":JSON.stringify(results)});
                                   // res.send({"result":results});
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
		

//Fetch User Details on home page

exports.homeusername = function(req, res){
			   console.log(req.session.uname);
			   var myquery = "select * from testersignup where username = '"+req.session.uname+"'";
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



//Fetch Enrolled Projects Details on home page

exports.homeenrolledcount= function(req, res){
			   console.log(req.session.uname);
			   var myquery = "select count(*) from testersignup where username = '"+req.session.uname+"'";
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
	
//Fetch Tester Details on Project Details page

exports.testerusername = function(req, res){
			   console.log("Inside Tester USername");
			   var myquery = "select * from testersignup where username = '"+req.session.uname+"'";
			   mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						var jsonstr=JSON.stringify(results);
						console.log("Entry successfully fethced and displayed on GUI");
						//res.send(JSON.stringify(results));
							res.send({"result":jsonstr});
					}
				}, myquery);
			};
			

//Fetch Application Manager Details on Project Addition page

exports.appmanagerusername = function(req, res){
			   console.log("Inside App Manager USername");
			   var myquery = "select * from appmanagersignup where username = '"+req.session.uname+"'";
			   mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						var jsonstr=JSON.stringify(results);
						console.log("Entry successfully fethced and displayed on GUI");
						//res.send(JSON.stringify(results));
							res.send({"result":jsonstr});
					}
				}, myquery);
			};

//Fetch Tester User Details on Every page

exports.testeruserdetails = function(req, res){
			   console.log("Inside testeruserdetails");
			   var myquery = "select * from testersignup where username = '"+req.session.uname+"'";
			   mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						var jsonstr=JSON.stringify(results);
						console.log("Entry successfully fethced and displayed on GUI");
						//res.send(JSON.stringify(results));
							res.send({"result":jsonstr});
					}
				}, myquery);
			};


//GET Project Details on separate page

exports.projdet = function(req, res){
	project_id=req.param("id");

    console.log(project_id);
    res.send({"status":200})
};