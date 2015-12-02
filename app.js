
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
app.use(express.cookieParser());
app.use(express.session({secret:'Mtaas',duration:30*60*1000}));

// all environments
app.set('port', process.env.PORT || 3029);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/public')));


// development only
if ('development'  === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/addsupplierdetails',user.addsupplierdetails);
app.post('/signin',user.signin);
app.post('/addproject',user.addproject);
app.post('/registerproject',user.registerproject);
app.get('/login', user.login);
app.get('/managerhome', user.managerhome);
app.post('/signup', user.signup);
app.post('/appmanagersignup', user.appmanagersignup);
app.get('/testerusername', user.testerusername);
app.post('/signinmanager', user.signinmanager);
app.get('/home', user.home);
app.get('/testerprofile', user.testerprofile);
app.get('/homeusername', user.homeusername);
app.get('/getprojectcount', user.getprojectcount);
app.get('/getregtestercount', user.getregtestercount);
app.get('/getenrolledprojectcount', user.getenrolledprojectcount);
app.get('/searchmanagerprojects', user.searchmanagerprojects);
app.get('/appmanagerusername', user.appmanagerusername);
app.get('/testeruserdetails', user.testeruserdetails);
app.get('/testerprojectdetails', user.testerprojectdetails);
app.get('/managerprojectdetails', user.managerprojectdetails);
app.get('/logoutsession', user.logoutsession);
app.get('/register', user.register);
app.get('/appmanagerregister', user.appmanagerregister);
app.get('/checklogin', user.checklogin);
app.get('/addsupplier', user.addsupplier);
app.get('/editsupplier', user.editsupplier);
app.get('/processsupplier', user.processsupplier);
app.get('/managerprojectcreation', user.managerprojectcreation);
app.get('/projectsavailable', user.projectsavailable);
app.get('/testerbilling', user.testerbilling);
app.get('/projectevaluations', user.projectevaluations);
app.get('/projectdetailstester', user.projectdetailstester);
app.get('/managerbilling', user.managerbilling);
app.get('/managerprofile', user.managerprofile);
app.get('/getproj', user.getproj);
app.get('/getmanagerprofile', user.getmanagerprofile);
app.get('/gettesterprofile', user.gettesterprofile);
app.get('/searchprojectdetails', user.searchprojectdetails);
app.get('/searchenrolledprojects', user.searchenrolledprojects);
app.get('/processsupplierdetails', user.processsupplierdetails);
app.post('/projdet',user.projdet);





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
