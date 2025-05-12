import React, { useEffect } from 'react'
import { useState } from 'react'
import LoginForm from '../Comps/LoginForm'
import RegisterForm from '../Comps/RegisterForm'

const LoginRegister = () => {

    const [currentForm, setCurrentForm] = useState('login')
    const [errorMessage, setErrorMessage] = useState('')


    return (
        <div className="pt-2">
            <div className='container-fluid pt-5'>
                <div className='row d-flex align-items-center justify-content-center'>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                            <h1 className="fst-italic text-purple text-center">Instant Messenger</h1>
                            {currentForm === 'login' && <LoginForm  {...{ setCurrentForm, setErrorMessage }} />}
                            {currentForm === 'register' && <RegisterForm  {...{ setCurrentForm, setErrorMessage }} />}
                            {errorMessage != '' && <p className='text-center text-danger'>{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister