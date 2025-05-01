import { Router } from "express";
import { bookController, userController } from "../controllers";

const router = Router();

router.get('/', (req, res) => {
    res.send("Hello World!");
});          


router.post('/user', userController.createValidation, userController.Create);
router.get('/user', userController.GetAllValidation, userController.GetAll);
router.get('/user/:id', userController.GetByIdValidation, userController.GetById);
router.patch('/user/:id', userController.UpdateByIdValidation, userController.UpdateById);
router.delete('/user/:id', userController.deleteByIdValidation, userController.DeleteById);

router.post('/book', bookController.createValidation, bookController.Create)


export { router };