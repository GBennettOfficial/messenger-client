import React, { useEffect } from 'react'
import { useState } from 'react'
import LoginForm from '../Comps/LoginForm'
import RegisterForm from '../Comps/RegisterForm'

const LoginRegister = () => {

    const [currentForm, setCurrentForm] = useState('login')
    const [formErrorMessage, setFormErrorMessage] = useState('')

    const navigateForm = (form) => {
        setCurrentForm(form)
        setFormErrorMessage('')
    }

    return (
        <div className="pt-2">
            <div className='container-fluid pt-5'>
                <div className='row d-flex align-items-center justify-content-center'>
                    <div className='col-lg-4 col-md-8 col-sm-12 p-0 m-0'>
                            <h1 className="fst-italic text-purple text-center">Instant Messenger</h1>
                            {currentForm === 'login' && <LoginForm  {...{ navigateForm, setFormErrorMessage }} />}
                            {currentForm === 'register' && <RegisterForm  {...{ navigateForm, setFormErrorMessage }} />}
                            {formErrorMessage != '' && <p className='text-center text-danger'>{formErrorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister