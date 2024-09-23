import { useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

export default function Login() {
    
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    })
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [successMesage, setSuccessMesage] = useState(null)
    const [error, setError] = useState(null)
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
        console.log(formData)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isLoading){
            return
        }
        setIsLoading(true);
        try{
            const response = await api.post('login/',formData)
            console.log('success!',response.data)
            setSuccessMesage('Te has logeado correctamente!!')
            localStorage.setItem('accessToken', response.data.tokens.access)
            localStorage.setItem('refreshToken', response.data.tokens.refresh)
            navigate('/');
        }catch(error){
            console.log('error en el logeado', error.response?.data)
            if(error.response && error.response.data){
                Object.keys(error.response.data).forEach(fields =>{
                    const errorMesage = error.response.data[fields];
                    if(errorMesage && errorMesage.length > 0){
                        setError(errorMesage[0])
                    }
                })
            }
        }
    }

    return (
        <div className="mt-96">
            {error && <p className="text-center text-xl font-bold text-red-800">{error}</p>}
            {successMesage && <p className="text-center text-xl font-bold text-green-800">{successMesage}</p>}
            <div className="flex flex-col gap-10 p-14 bg-white text-black rounded text-center">
                <h1 className="font-bold text-xl">Login</h1>
                <form>
                    <div className="flex flex-col items-start">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" 
                        value={formData.password}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <button disabled={isLoading} onClick={handleSubmit} type="submit">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
