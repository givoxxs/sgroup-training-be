import express from 'express';
import { UserRoute } from './users/index.js';
import { authRoute } from './auth/index.js';
import { uploadRoute } from './upload/index.js';
// import { PollsRoute } from './polls/index.js';
import PollsRoute from './polls/polls.router.js'
const router = express.Router();

router.use('/users' ,UserRoute);
router.use('/auth', authRoute);
router.use('/upload', uploadRoute);
router.use('/polls', PollsRoute);

export default router;