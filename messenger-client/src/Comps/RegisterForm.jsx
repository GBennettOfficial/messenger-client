import React from 'react'

const RegisterForm = ({ setCurrentForm }) => {
    return (
        <div className='d-flex flex-column justify-content-start align-items-center'>
            <h1 className="mt-5">Register</h1>
            <input type="text" className='form-control mt-2' placeholder='Username' />
            <input type="text" className='form-control mt-2' placeholder='Email' />
            <input type="text" className='form-control mt-2' placeholder='First Name' />
            <input type="text" className='form-control mt-2' placeholder='Last Name' />
            <input type="text" className='form-control mt-2' placeholder='Phone' />
            <input type="password" className='form-control mt-2' placeholder='Password' />
            <input type="password" className='form-control mt-2' placeholder='Confirm Password' />
            <button className='btn btn-primary mt-3' style={{ 'width': '75%' }}>Register</button>
            <span className='mt-1'>Already have an account? Login <a className='text-link' onClick={() => setCurrentForm('login')}>here</a>.</span>
        </div>
    )
}

export default RegisterForm