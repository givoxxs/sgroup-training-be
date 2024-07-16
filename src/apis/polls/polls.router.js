import express from "express";
import PollsController from './polls.controller';
import { verifyMiddleware } from '../../middleware';

const router = express.Router();

router.get('/', verifyMiddleware.verify, PollsController.getAllPolls);
router.post('/create', verifyMiddleware.verify, PollsController.createPoll);
router.put('/update/:id', verifyMiddleware.verify, PollsController.updatePoll);
router.delete('/delete/:id', verifyMiddleware.verify, PollsController.deletePoll);
router.get('/detail-poll/:id', verifyMiddleware.verify, PollsController.getDetailPoll);

router.post('/:id/option', verifyMiddleware.verify, PollsController.createOption);
// router.put('/updatePollOption/:id', PollsController.updateOption);
// router.delete('/deletePollOption/:id', PollsController.deleteOption);

router.post('/vote/:idOption', verifyMiddleware.verify, PollsController.votePoll);
router.delete('/vote/:idOption', verifyMiddleware.verify, PollsController.unVotePoll);



export default router;