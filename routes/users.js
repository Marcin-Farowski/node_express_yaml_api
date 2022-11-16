import express from 'express';

import { getUser } from '../controllers/users.js';


const router = express.Router();

/**
 * @swagger
 * /api/user_v1:
 *  get:
 *    description: Get a user
 *    parameters:
 *      - in: query
 *        name: environment
 *        enum: [ "engUsers", "testUsers" ]
 *        required: true
 *        description: environment
 *      - in: query
 *        name: name
 *        type: string
 *        required: true
 *        description: Name of user
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/user_v1', getUser);

export default router;
