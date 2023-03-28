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
        body('fistname', 'Họ bạn là gì')
            .notEmpty(),
        body('lastname', 'Tên bạn là gì')
            .notEmpty(),
        body('username', 'Tên đăng nhập không được để trống')
            .isLength({ min: 6 })
            .trim()
            .withMessage('Tên đăng nhập phải tối thiểu 6 ký tự')
            .custom(async (value: string, {req}) => {
                if (value === 'adminapp') {
                    throw new Error('Tên đăng nhập bị cấm');
                } else {
                    const userRepo: Repository<User> = await AppDataSource.getRepository(User)
                    return userRepo.findOne({ where: { username: value } })
                        .then(userDoc => {
                            if (userDoc) {
                                return Promise.reject(
                                    'Tên đăng nhập đã tồn tại, vui lòng chọn một tên khác'
                                );
                            }
                    });
                }
            }),
        body('password', 'Mật khẩu không được để trống')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .trim()
            .withMessage('Invalid password'),
        body('confirmPassword')
            .trim()
            .custom((value: string, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Xác nhận mật khẩu không chính xác');
                }
                return true; 
            }),
        check('phone', 'Số điện thoại không được để trống')
            .notEmpty()
            .isNumeric()
            .withMessage('Số điện thoại không hợp lệ')
            .custom(async (value: string, {req}) => {
                const userRepo: Repository<User> = await AppDataSource.getRepository(User)
                return userRepo.findOne({ where: { phone: value } })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject(
                                'Số điện thoại này đã được dùng để đăng ký tài khoản khác'
                            );
                        }
                });
            }),
        check('email', 'Địa chỉ email không được để trống')
            .notEmpty()
            .isEmail()
            .trim()
            .withMessage('Địa chỉ email không hợp lệ')
            .custom(async (value: string, {req}) => {
                const userRepo: Repository<User> = await AppDataSource.getRepository(User)
                return userRepo.findOne({ where: { email: value } })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject(
                                'Địa chỉ email này đã được dùng để đăng ký tài khoản khác'
                            );
                        }
                });
            }),
       
        body('sex', 'Giới tính không được để trống')
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
