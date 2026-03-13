import { Router } from 'express';
import * as shoppingController from '../controllers/shoppingController';

const router = Router();

router.get('/itens', shoppingController.listarItens);
router.get('/itens/:id', shoppingController.obterItem);
router.post('/itens', shoppingController.criarItem);
router.put('/itens/:id', shoppingController.atualizarItem);
router.delete('/itens/:id', shoppingController.deletarItem);

export default router;
