import React from 'react'

const LoginForm = ({ setCurrentForm }) => {
    return (
        <div className='d-flex flex-column justify-content-start align-items-center'>
            <h1 className="mt-5">Login</h1>
            <input type="text" className='form-control mt-2' placeholder='Username' />
            <input type="password" className='form-control mt-2' placeholder='Password' />
            <button className='btn btn-primary mt-3' style={{ 'width': '75%' }}>Login</button>
            <span className='mt-1'>Don't have an account? Register <a className='text-link' onClick={() => setCurrentForm('register')}>here</a>.</span>
        </div>
    )
}

export default LoginForm