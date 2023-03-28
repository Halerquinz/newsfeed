import { Router } from "express";
import authController from "../controllers/authController";
import { check, body } from "express-validator"
import { User } from '../entities/User'
import { Repository } from 'typeorm'
import { AppDataSource } from '../configs/db'

const router = Router()

router.post(
    '/register',
    [
        body('username', 'Username field is required')
            .isLength({ min: 6 })
            .trim()
            .withMessage('Minimum length of username should be 6')
            .custom(async (value: string, {req}) => {
                if (value === 'adminapp') {
                    throw new Error('This username is forbidden.');
                } else {
                    const userRepo: Repository<User> = await AppDataSource.getRepository(User)
                    return userRepo.findOne({ where: { username: value } })
                        .then(userDoc => {
                            if (userDoc) {
                                return Promise.reject(
                                    'Username exist already, please pick a different one'
                                );
                            }
                    });
                }
            }),
        body('password', 'Password field is required')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .trim()
            .withMessage('Invalid password'),
        body('confirmPassword')
            .trim()
            .custom((value: string, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Confirm password have to match');
                }
                return true; 
            }),
        check('phone', 'Phone field is required')
            .notEmpty()
            .isNumeric()
            .withMessage('Invalid phone number')
            .custom(async (value: string, {req}) => {
                const userRepo: Repository<User> = await AppDataSource.getRepository(User)
                return userRepo.findOne({ where: { phone: value } })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject(
                                'Phone is already used to register another account, please pick a different one'
                            );
                        }
                });
            }),
        check('email', 'Email field is required')
            .notEmpty()
            .isEmail()
            .trim()
            .withMessage('Invalid email')
            .custom(async (value: string, {req}) => {
                const userRepo: Repository<User> = await AppDataSource.getRepository(User)
                return userRepo.findOne({ where: { email: value } })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject(
                                'Email address is already used to register another account, please pick a different one'
                            );
                        }
                });
            }),
        check('fistname', 'Firstname field is required')
            .isEmpty(),
        body('lastname', 'Lastname field is required')
            .notEmpty(),
        body('sex', 'Sex field is required')
            .notEmpty(),
    ], 
    authController.register
)

router.post('/login',
    [
        body('username', 'Username field is required')
            .isLength({ min: 6 })
            .trim()
            .withMessage('Invalid username'),
        body('password', 'Password field is required')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .trim()
            .withMessage('Invalid password'),
    ], 
    authController.login
)

router.post('/forgot-password',
    [
        check('email', 'Email field is required')
            .notEmpty()
            .isEmail()
            .trim()
    ], 
    authController.resetPassword
)

export default router
