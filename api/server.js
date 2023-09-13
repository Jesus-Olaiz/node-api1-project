const express = require("express");
const cors = require("cors")
const User = require("./users/model");

const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());
server.use(cors())

// ENDPOINTS
// [GET /api/users]    /           (Returns an array)

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users)
    if (!users) {
      throw Error("The users information could not be retrieved");
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// [GET /api/users/:id]    /           (Returns the user object with the specified 'id')

server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res
        .status(200)
        .json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: `The user information could not be retrieved` });
  }
});

// [POST /api/users]    /          (Creates a user using the information sent inside the req.body)

server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const newUser = await User.insert({ name: name, bio: bio });
      res.status(201).json(newUser);
    }
  } catch (err) {
    res
      .status(500)
      .json({
        message: `There was an error while saving the user to the database`,
      });
  }
});

// [DELETE /api/users/:id]   /          (Removes the user with the specified 'id' and returns the deleted user)

server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.remove(id);

    if(!deletedUser){
        res.status(404).json({message: 'The user with the specified ID does not exist'})
    }else{
        res.status(200).json(deletedUser)
    }

  } catch (error) {
    res.status(500).json({message: "The user could not be removed"})
  }
});

// [PUT /api/users/:id] /           (Updates the user with the specified 'id' using data from the req.body . Returns modified user)

server.put('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {name, bio} = req.body

        if(!name || !bio){
            res.status(400).json({message: 'Please provide name and bio for the user'})
        }else{
            const updatedUser = await User.update(id, {name:name, bio: bio})

            if(!updatedUser){
                res.status(404).json({message: 'The user with the specified ID does not exist'})
            }else{
                res.status(200).json(updatedUser)
            }
        }
        
    } catch (error) {
        res.status(500).json({message:"The user information could not be modified"})
    }
})

module.exports = server;
