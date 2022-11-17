"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
//----------------------------------------------------------------------------------
// v1.0.0
/**
 * @swagger
 * /api/get_user:
 *  post:
 *    description: Get a user
 *    tags:
 *      - user
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
router.post('/get_user', users_1.getUser);
/**
 * @swagger
 * /api/create_user:
 *  post:
 *    description: Create a user
 *    tags:
 *      - user
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
router.post('/create_user', users_1.createUser);
exports.default = router;
//----------------------------------------------------------------------------------
// v1.0.1
/**
 * @swagger
 * /api/v2/get_user:
 *  post:
 *    description: Get a user
 *    tags:
 *      - user v2
 *    parameters:
 *      - in: query
 *        name: environment
 *        enum: [ "engUsers", "testUsers" ]
 *        required: true
 *        description: environment
 *      - in: body
 *        name: user
 *        description: User data
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            name:
 *              type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Not found
 */
router.post('/v2/get_user', users_1.getUser_v2);
