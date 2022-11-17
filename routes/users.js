import express from 'express';

import { getUser, createUser } from '../controllers/users.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/get_user:
 *  post:
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
router.post('/get_user', getUser);

/**
 * @swagger
 * /api/v1/create_user:
 *  post:
 *    description: Create a user
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
 *        description: Name
 *      - in: query
 *        name: surname
 *        type: string
 *        required: true
 *        description: Surname
 *      - in: query
 *        name: email
 *        type: string
 *        required: true
 *        description: E-mail
 *    responses:
 *      '201':
 *        description: User has been created
 *      '400' :
 *        description: Bad Request
 */
router.post('/create_user', createUser);

export default router;
