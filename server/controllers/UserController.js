import db from "../configs/db.js";
import { DuplicateError } from "../errors/DuplicateError.js";
import logger from "../logger.js";
import * as userService from "../services/UserService.js"

export const createUser = async (req, res) => {
  const transaction = await db.transaction()
  try {
    const user = await userService.createUser(req, transaction);
    logger.info("User created")
    res.status(201).json({
      message: "user created"
    });
  } catch (error) {
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
      logger.info("User updated")
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

export const loginUser = async (req, res) => {
  const transaction = await db.transaction()
  try {
    const user = await userService.loginUser(req.body, transaction)
    await transaction.commit()
    res.cookie('token', user.token, {
      sameSite: 'None',
      secure: true,
      httpOnly: true,
    }).send(user)
  }
  catch (error) {
    await transaction.rollback()
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" })
  }
}

export const logoutUser = async (req, res) =>{
  try{
    userService.logoutUser(res)
    res.json('User logged out')
  }
  catch(error){
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" })
  }
}


export const getUserAvatars = async (req, res) => {
  try {
    const avatarFiles = await userService.getUserAvatars()
    return res.json(avatarFiles)
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const verifyEmail = async (req, res) => {
  try {
    const avatarFiles = await userService.verifyEmail(req)
    return res.json('User email verification successful')
  }
  catch (err) {
    res.status(err.statusCode || 500).send({
      message: err.message || "Internal Server Error"
    })
  }
}

export const resendVerificationMail = async (req, res) =>{
  try {
    const avatarFiles = await userService.resendVerificationMail(req)
    logger.info('Verification link resent')
    return res.json('Verification link has been resent')
  }
  catch (err) {
    res.status(err.statusCode || 500).send({
      message: err.message || "Internal Server Error"
    })
  }
}

