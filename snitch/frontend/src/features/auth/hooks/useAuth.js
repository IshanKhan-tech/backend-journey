import { register, login } from "../services/auth.api"
import { setUser } from "../state/auth.slice"
import { useDispatch } from "react-redux"

export const useAuth = () => {
    const dispatch = useDispatch()

    const handleRegister = async ({
        email,
        contact,
        fullname,
        password,
        isSeller = false
    }) => {
        const data = await register(
            email,
            contact,
            fullname,
            password,
            isSeller
        )

        dispatch(setUser(data.user))
        return data.user
    }

    const handleLogin = async ({ email, password }) => {
        const data = await login(email, password)

        dispatch(setUser(data.user))
        return data.user
    }

    return { handleLogin, handleRegister }
}