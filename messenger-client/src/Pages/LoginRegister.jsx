import React from 'react'
import { useState } from 'react'
import LoginForm from '../Comps/LoginForm'
import RegisterForm from '../Comps/RegisterForm'

const LoginRegister = () => {

    const [currentForm, setCurrentForm] = useState('login')

    return (
        <div className="pt-2">
            <div className='container-fluid pt-5'>
                <div className='row d-flex align-items-center justify-content-center'>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                    
                            <h1 className="fst-italic text-purple text-center">Instant Messenger</h1>
                            {currentForm === 'login' && <LoginForm  {...{ setCurrentForm }} />}
                            {currentForm === 'register' && <RegisterForm  {...{ setCurrentForm }} />}
                 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister