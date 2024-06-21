// ## 1) create htttp server and listen onto the port = 3000 and get the http request ------------------------------------------------->

/*
const http = require('http')

// create http server
const  server = http.createServer((req,res) =>{        
     res.write('<h1> HELLO, YOU ARE IN THE HTTP SERVER </h1>');
        res.end();
})

// create port no. and listen server on that port number
const PORT = 3000;

// start the server
  server.listen(PORT , () =>{
      console.log('Successfully listen on the server');
  })

*/


// ## 2) create express.js server and listen onto the port = 3000 --------------------------------------------------------->

/*
     const express = require('express');
     const app = express();

    // create route of express.js (app.get( path, callback )) ----------->

    app.get('/' , (req,res) =>{
         res.send('<h1> hare krishna </h1>');
    })

    // create port no. and listen server on that port number
      const PORT = process.env.PORT || 3000;

// start the server
  app.listen(PORT , () =>{
      console.log('Successfully listen on the server');
  })

  */


// ## 3) create express.js server by the help of route and listen onto the port  --------------------------------------------------------->

/*

const express = require('express');
const app = express();

app.get('/' , (req,res) =>{
    res.send('<h1> hare krishna ji </h1>'); // this gets executed when user visit http://localhost:3000/
})

// Include route files
const userRoute = require('./routes/user');

// Use routes
app.use('/user', userRoute);

// create port no. and listen server on that port number
const PORT = process.env.PORT || 3000;

// start the server
  app.listen(PORT , () =>{
      console.log('Successfully listen on the server');
  })

  */


// 4) ----------------------------------------------------------------------------------------------------------------------------------->
// create the database----------->

/*
 const adder = async ()=>{
     
     const par =  await Message.create({
          FullName : "lovKhatri",
          email : "parol@gmail.com",
          CreatePassword : "789h3923"
   });
}

adder();

for reading or finding in the database-->

const adder = async ()=>{
       
    const par =  await Message.find();
    console.log(par);
}

for using operator we always uesed $ sign ----> // eq , ls , lse , gte , 

const adder = async ()=>{
       
    const par =  await Message.find({FullName:{$eq:"Khatri"}});
    console.log(par);
}

*/


// server.js PROJECT FILE CODE ----------------------------------------------------------------------------------------------------------->

const express = require('express');
const app = express();

const mongoose = require('mongoose');

// Serve static files from the 'public' directory
// use express.static middleware to serve static files (like HTML, CSS, JS) from the public directory:
app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017",{
     dbName : "Students",
}).then(()=> {
    console.log(`connecting successfully`);
}).catch((e) => {
    console.log(`no connection`);
})

const userSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    CreatePassword: {
        type: String,
        required: true
    }
});

//collection bna h with name = "Message"

const userModel = mongoose.model("Message", userSchema);

// Example defining a route (path , callback func) in Express
app.get('/', (req, res) => {
	 res.sendFile(__dirname + '/index.html')  ;
   })

   // Route to handle form submission
app.post('/post', async(req, res) => {

	const {FullName , email , CreatePassword} = req.body

	try{
         // Create a new message instance
		const user = new userModel({ 
			FullName , 
			  email ,
			  CreatePassword 
	   })
	  
        // Save the new message to MongoDB
	   await user.save();

       // for showing user info into the terminal
	  console.log('User saved successfully:', user);

	//   res.send("Sign up succesfully and stored all the info in the database")  
   	res.redirect('/sign-up_Succesfully.html');

	}catch (error) {
		console.error('Error saving user:', error.message);
		res.status(500).send("Error saving user");
	  }

});

// Example specifying the port and starting the server
const PORT = process.env.PORT || 3000;  // You can use environment variables for port configuration

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


