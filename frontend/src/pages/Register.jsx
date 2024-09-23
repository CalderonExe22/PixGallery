import { useState } from "react"
import api from "../api/api"
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const [formData, setFormData ] = useState({
        username : '',
        email : '',
        password1 : '', 
        password2 : ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [successMesage, setSuccessMesage] = useState(null)
    const [error, setError] = useState(null)
    const navegate = useNavigate()

    const handleChange = (e) =>{
        setFormData({
            ...formData,[e.target.name] : e.target.value
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
            const response = await api.post('register/',formData)
            localStorage.setItem('accessToken', response.data.tokens.access)
            localStorage.setItem('refreshToken', response.data.tokens.refresh)
            console.log('success!',response)
            setSuccessMesage('cuenta creada correctamente!!')
            navegate('/createProfile')
        }catch(error){
            console.log('error en el registro', error.response?.data)
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
                <h1 className="font-bold text-xl">Register</h1>
                <form>
                    <div className="flex flex-col items-start">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username" 
                        value={formData.username}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="password1">Password:</label>
                        <input type="password" name="password1" id="password1" 
                        value={formData.password1}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="password2">Repeat password:</label>
                        <input type="password" name="password2" id="password2" 
                        value={formData.password2}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <button disabled={isLoading} onClick={handleSubmit} type="submit">Register</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
