import React, { useState, useEffect } from 'react'

const API_BASE = '/api/v1/auth'

export default function Login({ initialMode = 'login' }) {

    const [mode, setMode] = useState(initialMode)

    // ================================
    // ALREADY LOGGED IN? SKIP THE FORM
    // ================================

    useEffect(() => {

        const token = localStorage.getItem('tracer_token')

        if (!token) return

        let role = 'alumni'

        try {
            role = JSON.parse(localStorage.getItem('tracer_user') || '{}').role || 'alumni'
        } catch (e) {
            role = 'alumni'
        }

        window.location.href = role === 'admin' ? '/admin-page' : '/alumni'

    }, [])

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)


    // ================================
    // HANDLE CHANGE
    // ================================

    function handleChange(e) {

        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))

    }


    // ================================
    // HANDLE SUBMIT
    // ================================

    async function handleSubmit(e) {

        e.preventDefault()

        setLoading(true)
        setError('')
        setMessage('')

        try {

            const endpoint =
                mode === 'login'
                    ? `${API_BASE}/login`
                    : `${API_BASE}/register`


            const payload =
                mode === 'login'
                    ? {
                        email: String(form.email || '').trim(),
                        password: String(form.password || '').trim(),
                    }
                    : {
                        name: String(form.name || '').trim(),
                        email: String(form.email || '').trim(),
                        password: String(form.password || '').trim(),
                        password_confirmation:
                            String(form.password || '').trim(),
                        role: 'alumni',
                    }


            const res = await fetch(endpoint, {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },

                body: JSON.stringify(payload),

            })


            const data = await res.json()


            if (!res.ok) {

                const errorMessage = data.errors
                    ? Object.values(data.errors).flat().join(' ')
                    : data.message || 'Permintaan gagal.'

                throw new Error(errorMessage)

            }


            // ================================
            // SAVE AUTH DATA
            // ================================

            const payloadData = data.data || {}

            localStorage.setItem(
                'tracer_token',
                payloadData.token
            )


            localStorage.setItem(
                'tracer_user',
                JSON.stringify(payloadData.user || {})
            )


            // ================================
            // SUCCESS MESSAGE
            // ================================

            setMessage(
                mode === 'login'
                    ? 'Login berhasil.'
                    : 'Registrasi berhasil.'
            )


            // ================================
            // RESET FORM
            // ================================

            setForm({
                name: '',
                email: '',
                password: '',
            })


            // ================================
            // REDIRECT (role-based)
            // ================================

            const role = payloadData.user?.role

            window.location.href =
                role === 'admin' ? '/admin-page' : '/alumni'


        } catch (err) {

            setError(err.message)

        } finally {

            setLoading(false)

        }

    }


    // ================================
    // SWITCH LOGIN / REGISTER
    // ================================

    function switchMode(newMode) {

        setMode(newMode)

        setError('')
        setMessage('')

        setForm({
            name: '',
            email: '',
            password: '',
        })

        setShowPassword(false)

    }


    // ================================
    // RENDER
    // ================================

    return (

        <div className="login-page">

            {/* ================================
                BACKGROUND
            ================================= */}

            <div className="background-red"></div>


            {/* ================================
                DECORATIVE DOTS
            ================================= */}

            <div className="dot-pattern">

                {Array.from({ length: 48 }).map((_, index) => (

                    <span key={index}></span>

                ))}

            </div>


            {/* ================================
                HOME
            ================================= */}

            <a
                href="/"
                className="home-link"
            >

                <svg
                    width="27"
                    height="27"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >

                    <path
                        d="M19 12H5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />

                    <path
                        d="M11 6L5 12L11 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                </svg>

                <span>
                    Home page
                </span>

            </a>


            {/* ================================
                MAIN
            ================================= */}

            <main className="login-main">


                {/* ================================
                    LOGO
                ================================= */}

                <div className="brand">

                    <img
                        src="/images/logo_telkom_schools.png"
                        alt="Telkom Schools"
                        className="brand-logo"
                    />

                    <div className="brand-subtitle">
                        TRACER ALUMNI
                    </div>

                </div>


                {/* ================================
                    LOGIN CARD
                ================================= */}

                <section className="login-card">


                    {/* ================================
                        HEADING
                    ================================= */}

                    <div className="login-heading">

                        <h1>

                            {mode === 'login'
                                ? 'Welcome Back!'
                                : 'Create Account'}

                        </h1>

                        <p>

                            {mode === 'login'
                                ? 'Welcome back! Please enter your details.'
                                : 'Create your account to continue.'}

                        </p>

                    </div>


                    {/* ================================
                        LOGIN / REGISTER TABS
                    ================================= */}

                    <div className="mode-tabs">

                        <button
                            type="button"
                            className={
                                mode === 'login'
                                    ? 'tab-button active'
                                    : 'tab-button'
                            }
                            onClick={() =>
                                switchMode('login')
                            }
                        >
                            Login
                        </button>


                        <button
                            type="button"
                            className={
                                mode === 'register'
                                    ? 'tab-button active'
                                    : 'tab-button'
                            }
                            onClick={() =>
                                switchMode('register')
                            }
                        >
                            Register
                        </button>

                    </div>


                    {/* ================================
                        FORM
                    ================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="login-form"
                    >


                        {/* ================================
                            NAME
                        ================================= */}

                        {mode === 'register' && (

                            <div className="form-group">

                                <label htmlFor="name">
                                    Name
                                </label>

                                <div className="input-wrapper">

                                    <svg
                                        className="input-icon"
                                        width="21"
                                        height="21"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >

                                        <path
                                            d="M20 21C20 17.6863 17.3137 15 14 15H10C6.68629 15 4 17.6863 4 21"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />

                                        <circle
                                            cx="12"
                                            cy="7"
                                            r="4"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />

                                    </svg>


                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your Name"
                                        required
                                    />

                                </div>

                            </div>

                        )}


                        {/* ================================
                            EMAIL
                        ================================= */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <div className="input-wrapper">

                                <svg
                                    className="input-icon"
                                    width="21"
                                    height="21"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >

                                    <rect
                                        x="3"
                                        y="5"
                                        width="18"
                                        height="14"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />

                                    <path
                                        d="M3 7L12 13L21 7"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                </svg>


                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your Email"
                                    required
                                />

                            </div>

                        </div>


                        {/* ================================
                            PASSWORD
                        ================================= */}

                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <svg
                                    className="input-icon"
                                    width="21"
                                    height="21"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >

                                    <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="10"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />

                                    <path
                                        d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />

                                    <circle
                                        cx="12"
                                        cy="15"
                                        r="1"
                                        fill="currentColor"
                                    />

                                </svg>


                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    required
                                />


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    aria-label="Toggle password"
                                >

                                    {showPassword ? (

                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >

                                            <path
                                                d="M3 3L21 21"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M10.58 10.58C10.21 10.95 10 11.46 10 12C10 13.1 10.9 14 12 14C12.54 14 13.05 13.79 13.42 13.42"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M9.88 4.24C10.56 4.08 11.27 4 12 4C17 4 20.73 8.11 21.5 9C21.15 9.41 20.37 10.25 19.26 11.14"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M6.61 6.61C4.76 7.87 3.42 9.52 2.5 10.5C3.5 11.6 6.8 16 12 16C13.16 16 14.24 15.78 15.22 15.39"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />

                                        </svg>

                                    ) : (

                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >

                                            <path
                                                d="M2.5 12C3.5 10.7 6.8 6 12 6C17.2 6 20.5 10.7 21.5 12C20.5 13.3 17.2 18 12 18C6.8 18 3.5 13.3 2.5 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            />

                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="3"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            />

                                        </svg>

                                    )}

                                </button>

                            </div>

                        </div>


                        {/* ================================
                            OPTIONS
                        ================================= */}

                        {mode === 'login' && (

                            <div className="form-options">

                                <label className="remember">

                                    <input
                                        type="checkbox"
                                    />

                                    <span>
                                        Remember me
                                    </span>

                                </label>


                                <button
                                    type="button"
                                    className="forgot-password"
                                >
                                    Forgot password?
                                </button>

                            </div>

                        )}


                        {/* ================================
                            ERROR
                        ================================= */}

                        {error && (

                            <div className="alert alert-error">
                                {error}
                            </div>

                        )}


                        {/* ================================
                            SUCCESS
                        ================================= */}

                        {message && (

                            <div className="alert alert-success">
                                {message}
                            </div>

                        )}


                        {/* ================================
                            SUBMIT
                        ================================= */}

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >

                            {loading

                                ? mode === 'login'
                                    ? 'Signing in...'
                                    : 'Creating account...'

                                : mode === 'login'
                                    ? 'Sign in'
                                    : 'Create account'

                            }

                        </button>

                    </form>


                    {/* ================================
                        DIVIDER
                    ================================= */}

                    {mode === 'login' && (

                        <div className="divider">

                            <span></span>

                            <p>
                                or
                            </p>

                            <span></span>

                        </div>

                    )}


                    {/* ================================
                        FOOTER
                    ================================= */}

                    <div className="signup-text">

                        {mode === 'login' ? (

                            <>

                                Don't have an account?

                                <button
                                    type="button"
                                    onClick={() =>
                                        switchMode('register')
                                    }
                                >
                                    Sign up
                                </button>

                            </>

                        ) : (

                            <>

                                Already have an account?

                                <button
                                    type="button"
                                    onClick={() =>
                                        switchMode('login')
                                    }
                                >
                                    Sign in
                                </button>

                            </>

                        )}

                    </div>

                </section>

            </main>

        </div>

    )
}