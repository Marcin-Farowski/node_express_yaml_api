import express from 'express';

import { getUser } from '../controllers/users.js';

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *  get:
 *    description: Get a user
 *    parameters:
 *      - in: query
 *        name: folder
 *        schema:
 *          type: string
 *        required: true
 *        description: Name of folder - "engUsers" or "testUsers"
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: Name of user
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/user', getUser);

export default router;
