import express from 'express';

import { getUser } from '../controllers/users.js';


const router = express.Router();

/**
 * @swagger
 * /api/v1/user:
 *  get:
 *    description: Get a user
 *    tags:
 *      - user v1.0.0
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
 *      '404':
 *        description: The specified user does not exist
 */
router.get('/user', getUser);

export default router;
