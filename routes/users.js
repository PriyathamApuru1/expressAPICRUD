const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Copy the code here
  const email = req.params.email;
  let usersAfterFiltering = users.filter((user) => user.email === email);
  res.send(usersAfterFiltering);
});

// GET by specific lastname request: Retrieve users with a specific lastname
router.get("/:lastName",(req,res)=>{
    const lastName = req.params.lastName;
    let usersAfterFiltering = users.filter((user) => user.lastName === lastName);
    res.send(usersAfterFiltering);
  });

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd);
}

// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
    // Sort the users array by DOB in ascending order
    let sorted_users = users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    // Send the sorted_users array as the response to the client
    res.send(sorted_users);
});

// POST request: Create a new user
router.post("/",(req,res)=>{
  var newUser = {
    "firstName":req.query.firstName,
    "lastName":req.query.lastName,
    "email":req.query.email,
    "DOB":req.query.DOB
    };
  users.push(newUser);
  res.send("The user " + req.query.firstName + " has been added!")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    let usersAfterFiltering = users.filter((user) => user.email === email);

    if(usersAfterFiltering.length > 0)
    {
        let filtered_user = usersAfterFiltering[0];
        
        let DOB = req.query.DOB;
        if(DOB)
        {
            filtered_user.DOB = DOB;
        }

        let firstName = req.query.firstName;
        if(firstName)
        {
            filtered_user.firstName = firstName;
        }

        let lastName = req.query.lastName;
        if(lastName)
        {
            filtered_user.lastName = lastName;
        }

        users = users.filter((user) => user.email === email);
        users.push(filtered_user);

        res.send('User with the email ' + email + ' updated!');
    } else {
        res.send("Unable to find the user!");
    }

});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    const email = req.params.email;

    users = users.filter((user) => user.email != email);
    res.send("User with email " + email + " deleted!");

});

module.exports=router;
