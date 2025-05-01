import { Router } from "express";
import { bookController, categoryController, lendController, memberController, userController } from "../controllers";

const router = Router();

router.get('/', (req, res) => {
    res.send("Hello World!");
});          

router.post('/book', bookController.createValidation, bookController.Create);
router.get('/book', bookController.GetAllValidation, bookController.GetAll);
router.get('/book/:id', bookController.GetByIdValidation, bookController.GetById);
router.patch('/book/:id', bookController.UpdateByIdValidation, bookController.UpdateById);
router.delete('/book/:id', bookController.deleteByIdValidation, bookController.DeleteById);

router.post('/category', categoryController.createValidation, categoryController.Create);
router.get('/category', categoryController.GetAllValidation, categoryController.GetAll);
router.get('/category/:id', categoryController.GetByIdValidation, categoryController.GetById);
router.patch('/category/:id', categoryController.UpdateByIdValidation, categoryController.UpdateById);
router.delete('/category/:id', categoryController.deleteByIdValidation, categoryController.DeleteById);

router.post('/lend', lendController.createValidation, lendController.Create);
router.get('/lend', lendController.GetAllValidation, lendController.GetAll);
router.get('/lend/:id', lendController.GetByIdValidation, lendController.GetById);
router.patch('/lend/:id', lendController.UpdateByIdValidation, lendController.UpdateById);
router.delete('/lend/:id', lendController.deleteByIdValidation, lendController.DeleteById);

router.post('/member', memberController.createValidation, memberController.Create);
router.get('/member', memberController.GetAllValidation, memberController.GetAll);
router.get('/member/:id', memberController.GetByIdValidation, memberController.GetById);
router.patch('/member/:id', memberController.UpdateByIdValidation, memberController.UpdateById);
router.delete('/member/:id', memberController.deleteByIdValidation, memberController.DeleteById);

router.post('/user', userController.createValidation, userController.Create);
router.get('/user', userController.GetAllValidation, userController.GetAll);
router.get('/user/:id', userController.GetByIdValidation, userController.GetById);
router.patch('/user/:id', userController.UpdateByIdValidation, userController.UpdateById);
router.delete('/user/:id', userController.deleteByIdValidation, userController.DeleteById);

export { router };