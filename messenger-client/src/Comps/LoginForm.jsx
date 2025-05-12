import React from 'react'
import { backendUri } from '../Vanilla/appSettings'
import { isAlphaNumeric } from '../Vanilla/validationFuncs'
import { appState } from '../Vanilla/appState' 

const LoginForm = ({ navigateForm, setFormErrorMessage }) => {

    const [username, setUsername] = React.useState('')
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')

    const postUsernameLogin = async () => {

        const usernameLoginDto = { Username: username, Password: password }
        fetch(`${backendUri}/Account/UsernameLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usernameLoginDto)
        })
        .then(async (response) => {
                if (response.status === 200) {
                    const data = await response.json()
                    appState.jsonWebToken = data.jsonWebToken.value
                    appState.socialConnections = data.socialConnections
                    setFormErrorMessage('')
                    console.log('Post Login Successful')
                }
                else {
                    const errorMessage = await response.text()
                    console.log('Post Login Failed')
                    console.log(errorMessage)
                    setFormErrorMessage(errorMessage)
                }
        })
    }

    const setValidateUsername = (value) => {
        setUsername(value)
        if (value === '') {
            setUsernameErrorMessage('')
            return
        }
        if (isAlphaNumeric(value) == false) {
            setUsernameErrorMessage('Must be only letters and numbrers')
        }
        else if (value.length < 5 || value.length > 120) {
            setUsernameErrorMessage('Must be between 5 and 120 characters long')
        }
        else {
            setUsernameErrorMessage('')
        }
    }

    const setValidatePassword = (value) => {
        setPassword(value)
        if (value === '') {
            setPasswordErrorMessage('')
            return
        }
        if (value.length < 8 || value.length > 30) {
            setPasswordErrorMessage('Must be between 8 and 30 characters long')
        }
        let uppercases = 0;
        let lowercases = 0;
        let digits = 0;
        let specialChars = 0;
        for (let i = 0; i < value.length; i++) {
            if (/^[A-Z]$/.test(value[i])) {
                uppercases++;
            }
            if (/^[a-z]$/.test(value[i])) {
                lowercases++;
            }
            if (/^[0-9]$/.test(value[i])) {
                digits++;
            }
            if ('!@#$%^&*<>~'.includes(value[i])) {
                specialChars++;
            }
        }
        if (uppercases < 2) {
            setPasswordErrorMessage('Must contain at least 2 uppercase letters')
        }
        else if (lowercases < 2) {
            setPasswordErrorMessage('Must contain at least 2 lowercase letters')
        }
        else if (digits < 2) {
            setPasswordErrorMessage('Must contain at least 2 numbers')
        }
        else if (specialChars < 2) {
            setPasswordErrorMessage('Must contain at least 2 special characters')
        }
        else {
            setPasswordErrorMessage('')
        }
    }

    const formIsReady = () => {
        return usernameErrorMessage === ''
            && passwordErrorMessage === ''
            && username !== ''
            && password !== ''
    }

    return (
        <div className='d-flex flex-column justify-content-start align-items-center'>
            <h2 className="mt-5">Login</h2>
            <label className='mt-3 text-start w-75' htmlFor='Username'>Username</label>
            <input type="text" className='w-75' onChange={(e) => setValidateUsername(e.target.value)} />
            {usernameErrorMessage && <span className='text-danger text-start w-75' style={{ fontSize: '13px' }}>{usernameErrorMessage}</span>}
            <label className='mt-2 text-start w-75' htmlFor='Password'>Password</label>
            <input type="password" className='w-75' onChange={(e) => setValidatePassword(e.target.value)} />
            {passwordErrorMessage && <span className='text-danger text-start w-75' style={{ fontSize: '13px' }}>{passwordErrorMessage}</span>}
            { formIsReady() && <button className='btn btn-primary mt-3  w-75' onClick={() => postUsernameLogin()}>Login</button> }
            { formIsReady() === false && <button disabled className='btn btn-primary mt-3  w-75'>Login</button> }
            <span className='mt-2'>Don't have an account? Register <a className='text-link' onClick={() => navigateForm('register')}>here</a>.</span>
        </div>
    )
}

export default LoginForm