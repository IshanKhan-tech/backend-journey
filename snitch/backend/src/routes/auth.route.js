import {Router} from "express"
import {register, login} from "../controllers/auth.controller.js"
import {registerValidator, loginValidator} from "../validators/auth.validator.js"

const route = Router()

route.post('/register', registerValidator,  register)
route.post('/login', loginValidator, login)

export default route