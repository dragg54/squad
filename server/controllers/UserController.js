import db from "../configs/db.js";
import { DuplicateError } from "../errors/DuplicateError.js";
import * as userService from "../services/UserService.js"

export const createUser = async (req, res) => {
  const transaction = await db.transaction()
  try {
    const user = await userService.createUser(req, transaction);
    res.status(201).json({
        message: "user created"
    });
    await transaction.commit()
  } catch (error) {
    console.log(error)
    await transaction.rollback()
    res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(req);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const success = await userService.deleteUser(req.params.id);
    if (success) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) =>{
    try{
        const user = await userService.loginUser(req.body)
       
        res.cookie('token', user.token, {
          sameSite: 'None',
          secure: true,
          httpOnly: true,
          }).send(user)
    }
    catch(error){
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}


export const getUserAvatars = async(req, res) =>{
  try{
    const avatarFiles = await userService.getUserAvatars()
    return res.json(avatarFiles)
  }
  catch(err){
    res.status(500).json({message: err.message})
  }
}
