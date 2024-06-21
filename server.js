
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

//collection  with name = "Message"
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


