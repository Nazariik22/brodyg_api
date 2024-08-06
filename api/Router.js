import Router from "express";
import sqlite3 from 'sqlite3';
import { UserController } from "../Controller.js/UserController.js";

const router = new Router();
//*CRUD create reade update delete
//? База даних:
const dbName = 'apiDbSql.db'
const db = new sqlite3.Database(dbName);
//! Робота з користувачем
const userController = new UserController(db);
router.get('/users', (req, res) => userController.getAll(req, res))
router.get('/users/:id', (req, res) => userController.getOne(req, res))
router.post('/users', (req, res) => userController.createUser(req, res))
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res))
router.post('/users', (req, res) => userController.updateUser(req, res))

//? Замітки користувача
router.post('/post')
router.get('/post/:id')
router.put('/post')
router.delete('/post/:id')


export default router;

