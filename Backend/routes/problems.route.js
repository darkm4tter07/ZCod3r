import { Router } from "express";
import {createProblem, updateProblem, deleteProblem, getProblem, getAllProblems} from '../controllers/problems.controller.js';

const router = Router();

router.route('/').get(getAllProblems);
router.route('/create').post(createProblem);
router.route('/:problemId/:creatorId').put(updateProblem);
router.route('/:problemId/:creatorId').delete(deleteProblem);
router.route('/problem/:problemId').get(getProblem);

export default router;
