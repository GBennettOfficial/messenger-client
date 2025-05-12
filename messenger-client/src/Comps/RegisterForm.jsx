import React from 'react'
import { backendUri } from '../Vanilla/appSettings'
import { isAlphabetic, isAlphaNumeric, isEmail } from '../Vanilla/validationFuncs'
import { appState } from '../Vanilla/appState' 

const RegisterForm = ({ navigateForm, setFormErrorMessage }) => {

    const [username, setUsername] = React.useState('')
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('')

    const postRegister = async () => {
        const registerDto = { Username: username, Email: email, FirstName: firstName, LastName: lastName, Password: password }
        fetch(`${backendUri}/Account/Register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerDto)
        })
        .then(async (response) => {
            if (response.status === 200) {
                const data = await response.json()
                appState.jsonWebToken = data.jsonWebToken.value
                appState.socialConnections = data.socialConnections
                console.log('Post Register Successful')
                navigateForm('login')
            }
            else {
                const errorMessage = await response.text()
                console.log('Post Register Failed')
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

    const setValidateEmail = (value) => {
        setEmail(value)
        if (value === '') {
            setEmailErrorMessage('')
            return
        }
        if (isEmail(value) == false) {
            setEmailErrorMessage('Must be a valid email')
        }
        else {
            setEmailErrorMessage('')
        }
    }

    const setValidateFirstName = (value) => {
        setFirstName(value)
        if (value === '') {
            setFirstNameErrorMessage('')
            return
        }
        if (isAlphabetic(value) == false) {
            setFirstNameErrorMessage('Must be only letters')
        }
        else if (value.length < 2 || value.length > 35) {
            setFirstNameErrorMessage('Must be between 2 and 35 characters long')
        }
        else {
            setFirstNameErrorMessage('')
        }
    }

    const setValidateLastName = (value) => {
        setLastName(value)
        if (value === '') {
            setLastNameErrorMessage('')
            return
        }
        if (isAlphabetic(value) == false) {
            setLastNameErrorMessage('Must be only letters')
        }
        else if (value.length < 2 || value.length > 35) {
            setLastNameErrorMessage('Must be between 2 and 35 characters long')
        }
        else {
            setLastNameErrorMessage('')
        }
    }

    const setValidatePassword = (value) => {
        setPassword(value)
        if (value === '') {
            setPasswordErrorMessage('')
            return
        }
        if (value.length < 8 || value.length > 30){
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

    const setValidateConfirmPassword = (value) => {
        setConfirmPassword(value)
        if (value === '') {
            setConfirmPasswordErrorMessage('')
            return
        }
        if (value !== password) {
            setConfirmPasswordErrorMessage('Passwords do not match')
        }
        else {
            setConfirmPasswordErrorMessage('')
        }
    }

    const formIsReady = () => {
        return username != ''
            && usernameErrorMessage === ''
            && email != ''
            && emailErrorMessage === ''
            && firstName != ''
            && firstNameErrorMessage === ''
            && lastName != ''
            && lastNameErrorMessage === ''
            && password != ''
            && passwordErrorMessage === ''
            && confirmPassword != ''
            && confirmPasswordErrorMessage === ''
    }

    return (
        <div className='d-flex flex-column justify-content-start align-items-center'>
            <h2 className="mt-5">Register</h2>
            <div className='d-flex flex-column justify-content-start align-items-center w-100' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <label htmlFor='RegisterUsername' className='mt-3 text-start w-75'>Username</label>
                <input type="text" name='RegisterUsername' className='w-75' onChange={(e) => setValidateUsername(e.target.value)} />
                { usernameErrorMessage && <span className='text-danger text-start w-75' style={{ fontSize :'13px'}}>{usernameErrorMessage}</span> }
                <label htmlFor='Email' className='mt-2 text-start w-75'>Email</label>
                <input type="text" name='Email' className='w-75'  onChange={(e) => setValidateEmail(e.target.value)} />
                { emailErrorMessage && <span className='text-danger text-start w-75' style={{ fontSize :'13px'}}>{emailErrorMessage}</span> }
                <label htmlFor='FirstName' className='mt-2 text-start w-75'>First Name</label>
                <input type="text" name='FirstName' className='w-75'  onChange={(e) => setValidateFirstName(e.target.value)} />
                { firstNameErrorMessage && <span className='text-danger text-start w-75' style={{ fontSize :'13px'}}>{firstNameErrorMessage}</span> }
                <label htmlFor='LastName' className='mt-2 text-start w-75'>Last Name</label>
                <input type="text" name='LastName' className='w-75' onChange={(e) => setValidateLastName(e.target.value)}  />
                { lastNameErrorMessage && <span className='text-danger text-start w-75' style={{ fontSize :'13px'}}>{lastNameErrorMessage}</span> }
                <label htmlFor='RegisterPassword' className='mt-2 text-start w-75'>Password</label>
                <input type="password" name='RegisterPassword' className='w-75' onChange={(e) => setValidatePassword(e.target.value)} />
                { passwordErrorMessage && <span className='text-danger text-start w-75' style={{ fontSize :'13px'}}>{passwordErrorMessage}</span> }
                <label htmlFor='ConfirmPassword' className='mt-2 text-start w-75'>Confirm Password</label>
                <input type="password" name='ConfirmPassword' className='w-75' onChange={(e) => setValidateConfirmPassword(e.target.value)} />
                { confirmPasswordErrorMessage && <span className='text-danger text-start w-75' style={{ fontSize :'13px'}}>{confirmPasswordErrorMessage}</span> }
            </div>
            { formIsReady() && <button className='btn btn-primary w-75 mt-3' onClick={() => postRegister()} >Register</button> }
            { formIsReady() == false && <button disabled className='btn btn-primary w-75 mt-3'>Register</button> }
            
            <span className='mt-2'>Already have an account? Login <a className='text-link' onClick={() => navigateForm('login')}>here</a>.</span>
        </div>
    )
}

export default RegisterForm