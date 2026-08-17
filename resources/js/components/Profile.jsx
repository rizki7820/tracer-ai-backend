import React, { useEffect, useState } from 'react'

export default function Profile() {
    const [activeSection, setActiveSection] = useState('profile')

    // ================================
    // DARK MODE
    // ================================

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('tracer_dark_mode') === 'true'
    })

    useEffect(() => {
        localStorage.setItem(
            'tracer_dark_mode',
            darkMode
        )
    }, [darkMode])


    function toggleDarkMode() {
        setDarkMode((prev) => !prev)
    }


    // ================================
    // PROFILE
    // ================================

    const [profile, setProfile] = useState(() => {

        const savedProfile =
            localStorage.getItem('tracer_admin_profile')

        if (savedProfile) {
            return JSON.parse(savedProfile)
        }

        return {
            name: 'Admin',
            email: 'admin@telkomschools.id',
            role: 'Administrator',
            phone: '0812-3456-7890',
        }

    })


    const [password, setPassword] = useState({
        current: '',
        newPassword: '',
        confirmation: '',
    })


    const [message, setMessage] = useState('')

    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const [showProfile, setShowProfile] = useState(false)


    // ================================
    // PROFILE CHANGE
    // ================================

    function handleProfileChange(e) {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        })

    }


    // ================================
    // PASSWORD CHANGE
    // ================================

    function handlePasswordChange(e) {

        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        })

    }


    // ================================
    // SAVE PROFILE
    // ================================

    function handleSaveProfile(e) {

        e.preventDefault()

        localStorage.setItem(
            'tracer_admin_profile',
            JSON.stringify(profile)
        )

        setMessage(
            'Profil berhasil diperbarui.'
        )

        setTimeout(() => {
            setMessage('')
        }, 3000)

    }


    // ================================
    // CHANGE PASSWORD
    // ================================

    function handleChangePassword(e) {

        e.preventDefault()

        if (
            !password.current ||
            !password.newPassword ||
            !password.confirmation
        ) {

            setMessage(
                'Silakan lengkapi semua password.'
            )

            return
        }


        if (
            password.newPassword !==
            password.confirmation
        ) {

            setMessage(
                'Konfirmasi password tidak sesuai.'
            )

            return
        }


        setMessage(
            'Password berhasil diperbarui.'
        )


        setPassword({
            current: '',
            newPassword: '',
            confirmation: '',
        })


        setTimeout(() => {
            setMessage('')
        }, 3000)

    }


    // ================================
    // LOGOUT
    // ================================

    function logout() {

        localStorage.removeItem(
            'tracer_token'
        )

        localStorage.removeItem(
            'tracer_user'
        )

        window.location.href = '/'

    }


    // ================================
    // INITIALS
    // ================================

    const initials = profile.name
        ? profile.name
            .split(' ')
            .map((name) => name[0])
            .join('')
            .substring(0, 2)
            .toUpperCase()
        : 'AD'


    // ================================
    // RENDER
    // ================================

    return (

        <div
            className={
                darkMode
                    ? 'admin-dashboard dark-mode'
                    : 'admin-dashboard'
            }
        >

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <aside className="admin-sidebar">

                <div className="sidebar-brand">

                    <img
                        src="/images/logo_telkom_schools.png"
                        alt="Telkom Schools"
                    />

                    <div>
                        <strong>
                            TRACER
                        </strong>

                        <span>
                            ALUMNI
                        </span>
                    </div>

                </div>


                <div className="sidebar-menu">

                    <p className="menu-label">
                        MAIN MENU
                    </p>


                    {/* DASHBOARD */}

                    <button
                        className="sidebar-item"
                        onClick={() =>
                            window.location.href =
                                '/admin-page'
                        }
                    >

                        <svg viewBox="0 0 24 24">

                            <rect
                                x="3"
                                y="3"
                                width="7"
                                height="7"
                                rx="1"
                            />

                            <rect
                                x="14"
                                y="3"
                                width="7"
                                height="7"
                                rx="1"
                            />

                            <rect
                                x="3"
                                y="14"
                                width="7"
                                height="7"
                                rx="1"
                            />

                            <rect
                                x="14"
                                y="14"
                                width="7"
                                height="7"
                                rx="1"
                            />

                        </svg>

                        <span>
                            Dashboard
                        </span>

                    </button>


                    {/* ALUMNI */}

                    <button
                        className="sidebar-item"
                        onClick={() =>
                            window.location.href =
                                '/admin-page/alumni'
                        }
                    >

                        <svg viewBox="0 0 24 24">

                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />

                            <circle
                                cx="9"
                                cy="7"
                                r="4"
                            />

                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />

                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />

                        </svg>

                        <span>
                            Data Alumni
                        </span>

                    </button>


                    {/* TRACER */}

                    <button
                        className="sidebar-item"
                        onClick={() =>
                            window.location.href =
                                '/admin-page/tracer-study'
                        }
                    >

                        <svg viewBox="0 0 24 24">

                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />

                            <polyline points="14 2 14 8 20 8" />

                            <line
                                x1="8"
                                y1="13"
                                x2="16"
                                y2="13"
                            />

                            <line
                                x1="8"
                                y1="17"
                                x2="16"
                                y2="17"
                            />

                        </svg>

                        <span>
                            Tracer Study
                        </span>

                    </button>


                    {/* PERUSAHAAN */}

                    <button
                        className="sidebar-item"
                        onClick={() =>
                            window.location.href =
                                '/admin-page/perusahaan'
                        }
                    >

                        <svg viewBox="0 0 24 24">

                            <path d="M3 21h18" />

                            <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />

                            <path d="M9 7h1" />
                            <path d="M14 7h1" />

                            <path d="M9 11h1" />
                            <path d="M14 11h1" />

                            <path d="M9 15h1" />
                            <path d="M14 15h1" />

                        </svg>

                        <span>
                            Perusahaan
                        </span>

                    </button>


                    <p className="menu-label menu-label-second">
                        MANAGEMENT
                    </p>


                    {/* LAPORAN */}

                    <button
                        className="sidebar-item"
                        onClick={() =>
                            window.location.href =
                                '/admin-page/laporan'
                        }
                    >

                        <svg viewBox="0 0 24 24">

                            <line
                                x1="18"
                                y1="20"
                                x2="18"
                                y2="10"
                            />

                            <line
                                x1="12"
                                y1="20"
                                x2="12"
                                y2="4"
                            />

                            <line
                                x1="6"
                                y1="20"
                                x2="6"
                                y2="14"
                            />

                        </svg>

                        <span>
                            Laporan
                        </span>

                    </button>


                    {/* SETTINGS */}

                    <button
                        className="sidebar-item"
                        onClick={() =>
                            window.location.href =
                                '/admin-page/settings'
                        }
                    >

                        <svg viewBox="0 0 24 24">

                            <circle
                                cx="12"
                                cy="12"
                                r="3"
                            />

                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 6.5 4.29l.06.06A1.65 1.65 0 0 0 9 4.6h.05A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a2 2 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v.05A1.65 1.65 0 0 0 20.91 10H21a2 2 0 1 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z" />

                        </svg>

                        <span>
                            Pengaturan
                        </span>

                    </button>

                </div>


                <div className="sidebar-footer">

                    <div className="school-info">

                        <div className="school-logo">
                            TS
                        </div>

                        <div>

                            <strong>
                                Telkom Schools
                            </strong>

                            <span>
                                Tracer Alumni
                            </span>

                        </div>

                    </div>

                </div>

            </aside>


            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="admin-main">


                {/* =================================================
                    TOPBAR
                ================================================= */}

                <header className="admin-topbar">

                    <div>

                        <h1>
                            Profil Admin
                        </h1>

                        <p>
                            Kelola informasi akun administrator.
                        </p>

                    </div>


                    <div className="topbar-actions">


                        {/* NOTIFICATION */}

                        <button
                            className="notification-button"
                            onClick={() =>
                                window.location.href =
                                    '/admin-page/notifications'
                            }
                            title="Notifikasi"
                        >

                            <svg viewBox="0 0 24 24">

                                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

                                <path d="M10 21h4" />

                            </svg>

                            <span className="notification-dot"></span>

                        </button>


                        {/* PROFILE */}

                        <div className="profile-container">

                            <button
                                className="profile-button"
                                onClick={() =>
                                    setShowProfile(
                                        !showProfile
                                    )
                                }
                            >

                                <div className="profile-avatar">
                                    {initials}
                                </div>


                                <div className="profile-info">

                                    <strong>
                                        {profile.name}
                                    </strong>

                                    <span>
                                        Administrator
                                    </span>

                                </div>


                                <svg
                                    className="profile-chevron"
                                    viewBox="0 0 24 24"
                                >

                                    <polyline
                                        points="6 9 12 15 18 9"
                                    />

                                </svg>

                            </button>


                            {showProfile && (

                                <div className="profile-dropdown">


                                    <div className="dropdown-user">

                                        <div className="profile-avatar">
                                            {initials}
                                        </div>

                                        <div>

                                            <strong>
                                                {profile.name}
                                            </strong>

                                            <span>
                                                {profile.email}
                                            </span>

                                        </div>

                                    </div>


                                    <div className="dropdown-divider"></div>


                                    <button
                                        className="dropdown-item"
                                        onClick={() =>
                                            window.location.href =
                                                '/admin-page/profile'
                                        }
                                    >

                                        <svg viewBox="0 0 24 24">

                                            <circle
                                                cx="12"
                                                cy="8"
                                                r="4"
                                            />

                                            <path d="M4 21a8 8 0 0 1 16 0" />

                                        </svg>

                                        Profil Saya

                                    </button>


                                    <button
                                        className="dropdown-item"
                                        onClick={() =>
                                            window.location.href =
                                                '/admin-page/settings'
                                        }
                                    >

                                        <svg viewBox="0 0 24 24">

                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="3"
                                            />

                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6h.05A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l-.06-.06A2 2 0 1 1 19.4 9v.05A1.65 1.65 0 0 0 20.91 10H21a2 2 0 1 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z" />

                                        </svg>

                                        Pengaturan

                                    </button>


                                    <div className="dropdown-divider"></div>


                                    <div className="dark-mode-toggle-row">

                                        <div className="dark-mode-label">

                                            <svg
                                                viewBox="0 0 24 24"
                                            >

                                                {darkMode ? (

                                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />

                                                ) : (

                                                    <>

                                                        <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="4"
                                                        />

                                                        <path d="M12 2v2" />
                                                        <path d="M12 20v2" />

                                                        <path d="M4.93 4.93l1.41 1.41" />

                                                        <path d="M17.66 17.66l1.41 1.41" />

                                                        <path d="M2 12h2" />

                                                        <path d="M20 12h2" />

                                                        <path d="M4.93 19.07l1.41-1.41" />

                                                        <path d="M17.66 6.34l1.41-1.41" />

                                                    </>

                                                )}

                                            </svg>

                                            <span>
                                                {darkMode
                                                    ? 'Dark Mode'
                                                    : 'Light Mode'}
                                            </span>

                                        </div>


                                        <button
                                            type="button"
                                            className={
                                                darkMode
                                                    ? 'theme-switch active'
                                                    : 'theme-switch'
                                            }
                                            onClick={toggleDarkMode}
                                        >

                                            <span></span>

                                        </button>

                                    </div>


                                    <div className="dropdown-divider"></div>


                                    <button
                                        className="dropdown-item logout"
                                        onClick={logout}
                                    >

                                        <svg viewBox="0 0 24 24">

                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />

                                            <polyline points="16 17 21 12 16 7" />

                                            <line
                                                x1="21"
                                                y1="12"
                                                x2="9"
                                                y2="12"
                                            />

                                        </svg>

                                        Logout

                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </header>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="dashboard-content profile-page-content">


                    {/* PROFILE HEADER */}

                    <section className="profile-header-card">

                        <div className="profile-large-avatar">
                            {initials}
                        </div>


                        <div className="profile-header-info">

                            <h2>
                                {profile.name}
                            </h2>

                            <p>
                                {profile.email}
                            </p>

                            <span>
                                Administrator
                            </span>

                        </div>

                    </section>


                    {/* PROFILE LAYOUT */}

                    <section className="settings-layout">


                        {/* NAVIGATION */}

                        <aside className="settings-navigation">

                            <button
                                className={
                                    activeSection === 'profile'
                                        ? 'settings-nav-item active'
                                        : 'settings-nav-item'
                                }
                                onClick={() =>
                                    setActiveSection('profile')
                                }
                            >

                                <span className="settings-nav-icon">

                                    <svg viewBox="0 0 24 24">

                                        <circle
                                            cx="12"
                                            cy="8"
                                            r="4"
                                        />

                                        <path d="M4 21a8 8 0 0 1 16 0" />

                                    </svg>

                                </span>

                                <span>
                                    Informasi Profil
                                </span>

                            </button>


                            <button
                                className={
                                    activeSection === 'password'
                                        ? 'settings-nav-item active'
                                        : 'settings-nav-item'
                                }
                                onClick={() =>
                                    setActiveSection('password')
                                }
                            >

                                <span className="settings-nav-icon">

                                    <svg viewBox="0 0 24 24">

                                        <rect
                                            x="4"
                                            y="10"
                                            width="16"
                                            height="11"
                                            rx="2"
                                        />

                                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />

                                    </svg>

                                </span>

                                <span>
                                    Keamanan
                                </span>

                            </button>

                        </aside>


                        {/* PANEL */}

                        <div className="settings-panel">


                            {/* PROFILE */}

                            {activeSection === 'profile' && (

                                <form
                                    onSubmit={handleSaveProfile}
                                >

                                    <div className="settings-panel-header">

                                        <div>

                                            <h3>
                                                Informasi Profil
                                            </h3>

                                            <p>
                                                Perbarui informasi akun administrator.
                                            </p>

                                        </div>

                                    </div>


                                    <div className="profile-form">


                                        <div className="form-field">

                                            <label>
                                                Nama Lengkap
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                value={profile.name}
                                                onChange={handleProfileChange}
                                            />

                                        </div>


                                        <div className="form-field">

                                            <label>
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                value={profile.email}
                                                onChange={handleProfileChange}
                                            />

                                        </div>


                                        <div className="form-field">

                                            <label>
                                                Nomor Telepon
                                            </label>

                                            <input
                                                type="text"
                                                name="phone"
                                                value={profile.phone}
                                                onChange={handleProfileChange}
                                            />

                                        </div>


                                        <div className="form-field">

                                            <label>
                                                Role
                                            </label>

                                            <input
                                                type="text"
                                                value={profile.role}
                                                disabled
                                            />

                                            <small>
                                                Role hanya dapat diubah oleh administrator utama.
                                            </small>

                                        </div>

                                    </div>


                                    <div className="form-actions">

                                        <button
                                            type="submit"
                                            className="primary-button"
                                        >
                                            Simpan Perubahan
                                        </button>

                                    </div>

                                </form>

                            )}


                            {/* PASSWORD */}

                            {activeSection === 'password' && (

                                <form
                                    onSubmit={handleChangePassword}
                                >

                                    <div className="settings-panel-header">

                                        <div>

                                            <h3>
                                                Keamanan Akun
                                            </h3>

                                            <p>
                                                Ubah password untuk menjaga keamanan akun.
                                            </p>

                                        </div>

                                    </div>


                                    <div className="profile-form">


                                        <div className="form-field">

                                            <label>
                                                Password Saat Ini
                                            </label>

                                            <div className="password-field">

                                                <input
                                                    type={
                                                        showCurrent
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="current"
                                                    value={password.current}
                                                    onChange={handlePasswordChange}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowCurrent(
                                                            !showCurrent
                                                        )
                                                    }
                                                >

                                                    {showCurrent
                                                        ? 'Sembunyikan'
                                                        : 'Tampilkan'}

                                                </button>

                                            </div>

                                        </div>


                                        <div className="form-field">

                                            <label>
                                                Password Baru
                                            </label>

                                            <div className="password-field">

                                                <input
                                                    type={
                                                        showNew
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="newPassword"
                                                    value={password.newPassword}
                                                    onChange={handlePasswordChange}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowNew(
                                                            !showNew
                                                        )
                                                    }
                                                >

                                                    {showNew
                                                        ? 'Sembunyikan'
                                                        : 'Tampilkan'}

                                                </button>

                                            </div>

                                        </div>


                                        <div className="form-field">

                                            <label>
                                                Konfirmasi Password Baru
                                            </label>

                                            <div className="password-field">

                                                <input
                                                    type={
                                                        showConfirmation
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="confirmation"
                                                    value={password.confirmation}
                                                    onChange={handlePasswordChange}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmation(
                                                            !showConfirmation
                                                        )
                                                    }
                                                >

                                                    {showConfirmation
                                                        ? 'Sembunyikan'
                                                        : 'Tampilkan'}

                                                </button>

                                            </div>

                                        </div>

                                    </div>


                                    <div className="form-actions">

                                        <button
                                            type="submit"
                                            className="primary-button"
                                        >
                                            Ubah Password
                                        </button>

                                    </div>

                                </form>

                            )}


                            {/* MESSAGE */}

                            {message && (

                                <div className="settings-message">

                                    {message}

                                </div>

                            )}

                        </div>

                    </section>

                </div>

            </main>

        </div>

    )
}