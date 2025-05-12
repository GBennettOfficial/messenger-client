import React from 'react'
import { backendUri } from '../Variables'

const LoginForm = ({ setCurrentForm, setErrorMessage }) => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const changeForm = (form) => {
        setCurrentForm(form)
        setErrorMessage('')
    }
    const postLogin = async () => {
        
        const usernameLoginDto = { Username: username, Password: password }
        const response = fetch(`${backendUri}/Account/UsernameLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usernameLoginDto)
        })
            .then(async (response) => {
                if (response.status === 200) {
                    const data = await response.json()
                    console.log(data)
                    setErrorMessage('')
                }
                else {
                    const errorMessage = await response.text()
                    console.log(errorMessage)
                    setErrorMessage(errorMessage)
                }
            })
        }

return (
    <div className='d-flex flex-column justify-content-start align-items-center'>
        <h1 className="mt-5">Login</h1>
        <input type="text" className='form-control mt-2' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className='form-control mt-2' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <button className='btn btn-primary mt-3' style={{ 'width': '75%' }} onClick={() => postLogin()}>Login</button>
        <span className='mt-1'>Don't have an account? Register <a className='text-link' onClick={() => changeForm('register')}>here</a>.</span>
    </div>
)
}

export default LoginForm