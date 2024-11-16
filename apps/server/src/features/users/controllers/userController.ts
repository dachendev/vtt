import { RequestHandler } from "express";
import { User } from "../models/User";

export const createUser: RequestHandler = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).send(newUser);
};

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.findAll();
  res.send(users);
};

export const getUserById: RequestHandler = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.send(user);
};

export const updateUser: RequestHandler = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  const userUpdate = await user.update(req.body);
  res.send(userUpdate);
};

export const deleteUser: RequestHandler = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  await user.destroy();
  res.sendStatus(204);
};
