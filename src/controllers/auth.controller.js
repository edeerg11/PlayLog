import userService from "../services/user.service.js";

async function register (req, res, next) {

    try {
        const result = await userService.register(req.body)
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }

}

async function login (req, res, next) {

    try {
        const result = await userService.login(req.body)
        res.json(result);
    } catch (error) {
        next(error)
    }

}

export default { register, login };