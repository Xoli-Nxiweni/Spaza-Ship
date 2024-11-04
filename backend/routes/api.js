import { Router } from 'express'
import usersController from '../controllers/usersController.js'
import productsController from '../controllers/productsController.js';

const router = Router();

//users endpoints

router.post('/user', usersController.registerUser)
router.post('/user/login', usersController.loginUser)

//products endpoints

router.post('/product', productsController.addProduct)
router.get('/product/', productsController.viewProducts)
router.get('/product/:id', productsController.addProduct)
router.put('/product/:id', productsController.updateProduct)
router.patch('/product/:id', productsController.updateProduct)
router.delete('/product/:id', productsController.deleteProduct)


export default router;