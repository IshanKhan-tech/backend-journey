import {Router} from "express"
import {register, login} from "../controllers/auth.controller"
import {registerValidator, loginValidator} from "../validators/auth.validator"

const route = Router()

route.post('/register', registerValidator,  register)
route.post('/register', loginValidator, login)

export default route