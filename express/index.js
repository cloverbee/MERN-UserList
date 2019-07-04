const express = require("express");
var bodyParser = require("body-parser");

const path = require("path");
const mongoose = require("mongoose");
const mongodbConnect = require("./config/database");

const db = mongoose.connection;
const app = new express();
const User = require('./models/User');
const router = express.Router(); 

var tmpusers = []; ///////////////////////////////

mongodbConnect();

// Server Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("A " + req.method + " request received at " + new Date());
  next();
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.listen(5000, () => {
  console.log("Listening to port 5000.");
});

app.use('/api', router);
//=========================================================
//app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our home!' });   
});
//=========================================================
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });   
});
//=========================================================
router.get("/list", (req, res) => {
  User.find((err, users) => {
    if (err) {
        res.status(500).send(err);
    }
    res.json(users);//status(200).json(users);
    console.log('users sent already!');
  }).then((users) => {//
    //console.log('then users',users)
  }).catch((err) => {
    
  });
  
});
router.delete('/users/:user_id', (req, res) => {
  console.log('delete userid received', req.params.user_id.slice(1));  
  User.findByIdAndRemove(req.params.user_id.slice(1), function(err) {
    if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
})

router.post('/users', (req, res) => {
  // retrieve new user info request body and save it
    var user = new User();      // create a new instance of the User model
    user.firstName = req.body.firstName;  // set the bears name (comes from the request)
    user.lastName = req.body.lastName;
    user.age = req.body.age;
    user.sex = req.body.sex;
    user.password = req.body.password;
    
    // save the bear and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);
        else{//////
            res.json({ message: 'User created!' });
        }
    });    
});


router.post("/search", (req, res) => {
    const searchText = req.body.seachText;
    console.log("searchText:",searchText);
    User.find((err, tmpusers) => {
                if (err) {
                    res.status(500).send(err);
                }
                console.log('Got tmpusers already!');
              })
              .then((tmpusers) => {//
              //==========================================
                if (!searchText) {
                  console.log('null searchText'+ new Date());
                  res.json({matchedText: []});
                }
                ///////////////////////////////console.log('tmpusers data:', tmpusers);
                let matchedResult1 = tmpusers.filter((ele) => ele.firstName.toUpperCase().indexOf(searchText.toUpperCase()) > -1);
                let filtedPart1 = tmpusers.filter((ele) => ele.firstName.toUpperCase().indexOf(searchText.toUpperCase()) == -1);
                let matchedResult2 = filtedPart1.filter((ele)=> ele.lastName.toUpperCase().indexOf(searchText.toUpperCase()) > -1);
                let filtedPart2 = filtedPart1.filter((ele)=> ele.lastName.toUpperCase().indexOf(searchText.toUpperCase()) == -1);
                let matchedResult3 = filtedPart2.filter((ele)=> ele.sex.toUpperCase().indexOf(searchText.toUpperCase()) > -1);
                var ele;
                //console.log('matchedResult2', matchedResult2)
                for(ele in matchedResult2)
                {
                  //console.log('ele', ele)
                  matchedResult1.push(matchedResult2[ele]);
                }
                for(ele in matchedResult3)
                {
                  matchedResult1.push(matchedResult3[ele]);
                }
                
                res.json({matchedText: matchedResult1});
                
                //////////////////////////////console.log('Matched users',matchedResult);
              })
              .catch((err) => {
                console.log(' Catch err got users when searching',err)
              });

    //console.log('result users',matchedResult);
});

router.get('/users/:user_id', (req, res) => {
  User.findById(req.params.user_id.slice(1), function(err, user) {
    if (err)
            res.send(err);

    res.json(user);
    console.log('users sent already!');
  }).then((users) => {//
    //console.log('then users',users)
  }).catch((err) => {
  });
});

router.put('/users/:user_id', (req, res) => {
  // retrieve updated user info from request body and save it
  editOne(req, res, req.params.user_id);
});
let editOne = (req, res, id) => {
  //let selectedUser = users.findIndex(user=>user.id === Number(id));
  User.findById(req.params.user_id.slice(1), function(err, user) {
      if (err)
              res.send(err);

      res.json(user);
      user.name = req.body.name;  // update the user info
      user.firstname = req.body.firstname;  // set the User name (comes from the request)
      user.lastname = req.body.lastname;
      user.age = req.body.age;
      user.sex = req.body.sex;
      user.password = req.body.password;
      // save the user
      user.save(function(err) {
          if (err){
              res.send(err);
              console.log('err:', err);
          }
          else{
              res.json({ message: 'User updated!' });
          }
      });
    });

/*
  if (selectedUser >= 0) {
      users[selectedUser].name = req.body.name;
      users[selectedUser].age = req.body.age;
      users[selectedUser].sex = req.body.sex;
      res.status(200).json(`user with id ${id} is updated.`);
  }
  else {
      res.status(555).json(`user with id ${id} is not found!`);
  }*/
};


