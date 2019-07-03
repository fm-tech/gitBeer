const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3000

// models 
const Employee = require('./models/employee')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
// set the view engine to ejs
app.set('view engine', 'ejs');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))


// routes 
// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});
app.post('/search', function(req, res) {
    Employee.findOne( req.body.employee , function(err, searchID) {
        if (err) {
            res.redirect('/')
            console.log(err)
            console.log(req.params.eID)
        } else {
            res.render('pages/employee', {employee: searchID})
        }
    } );
});


// Employee Routes
app.get('/emp', function(req, res) {
    res.redirect('/');
});

// Employee Addition
app.get('/new', function (req, res) {
    res.render('pages/new');
})
app.post('/emp/new', function (req, res) {
    Employee.create( req.body.employee, function(err, newEmp){
        if(err) {
            res.redirect('/')     
        } else {
            res.render('pages/employee', {employee: newEmp})
        }
    })
})

// search employee 
app.get('/emp/:eID', function(req, res) {
    Employee.findOne( {eID: req.params.eID} , function(err, foundEmp) {
        if (err) {
            res.redirect('/')
            console.log(err)
            console.log(req.params.eID)
        } else {
            res.render('pages/employee', {employee: foundEmp})
        }
    } );

})

// find and update 
app.get('/emp/:eID/update', function(req, res) {
    Employee.findOne( {eID: req.params.eID}, function(err, foundEmp) {
        if (err) {
            res.redirect('/')
            console.log(err)
        } else {
            res.render('pages/update', {employee: foundEmp})
        }
    } );

})

app.put('/emp/:eID/update', function(req, res) {
    Employee.findOneAndUpdate({eID: req.params.eID}, function(err, foundEmp) {
        if (err) {
            res.redirect('/')
            console.log(err)
        } else {
            res.render('pages/emp', {employee: foundEmp})
        }
    })
})










app.listen(port, () => console.log(`Example app listening on port ${port}!`))