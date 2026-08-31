import React, { useEffect, useState } from 'react'
import NotificationPopup from './NotificationPopup'

export default function AdminLayout({
    children,
    title = 'Dashboard',
    description = '',
}) {

    // =========================================
    // DARK MODE
    // =========================================

    const [showNotifications, setShowNotifications] = useState(false)
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('tracer_dark_mode') === 'true'
    })


    useEffect(() => {

        localStorage.setItem(
            'tracer_dark_mode',
            darkMode
        )

        document.body.classList.toggle(
            'dark-mode',
            darkMode
        )

    }, [darkMode])


    function toggleDarkMode() {
        setDarkMode((prev) => !prev)
    }


    // =========================================
    // PROFILE
    // =========================================

    const [profile] = useState(() => {

        const savedProfile =
            localStorage.getItem('tracer_admin_profile')

        if (savedProfile) {

            try {

                return JSON.parse(savedProfile)

            } catch (error) {

                console.error(
                    'Gagal membaca profile:',
                    error
                )

            }

        }

        return {
            name: 'Admin',
            email: 'admin@telkomschools.id',
            role: 'Administrator',
            phone: '0812-3456-7890',
        }

    })


    const [showProfile, setShowProfile] = useState(false)


    // =========================================
    // INITIALS
    // =========================================

    const initials = profile.name
        ? profile.name
            .split(' ')
            .map((name) => name[0])
            .join('')
            .substring(0, 2)
            .toUpperCase()
        : 'AD'


    // =========================================
    // NAVIGATION
    // =========================================

    function goTo(path) {
        window.location.href = path
    }


    // =========================================
    // LOGOUT
    // =========================================

    function logout() {

        localStorage.removeItem(
            'tracer_token'
        )

        localStorage.removeItem(
            'tracer_user'
        )

        window.location.href = '/'

    }


    // =========================================
    // CURRENT PATH
    // =========================================

    const currentPath =
        window.location.pathname


    function isActive(path) {

        return currentPath === path

    }


    // =========================================
    // RENDER
    // =========================================

    return (

        <div
            className={
                darkMode
                    ? 'admin-dashboard dark-mode'
                    : 'admin-dashboard'
            }
        >

            {/* =====================================
                SIDEBAR
            ====================================== */}

            <aside className="admin-sidebar">


                {/* =================================
                    SIDEBAR BRAND
                ================================== */}

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


                {/* =================================
                    SIDEBAR MENU
                ================================== */}

                <div className="sidebar-menu">


                    <p className="menu-label">
                        MAIN MENU
                    </p>


                    {/* =================================
                        DASHBOARD
                    ================================== */}

                    <button
                        type="button"
                        className={
                            isActive('/admin-page')
                                ? 'sidebar-item active'
                                : 'sidebar-item'
                        }
                        onClick={() =>
                            goTo('/admin-page')
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


                    {/* =================================
                        ALUMNI
                    ================================== */}

                    <button
                        type="button"
                        className={
                            isActive('/admin-page/alumni')
                                ? 'sidebar-item active'
                                : 'sidebar-item'
                        }
                        onClick={() =>
                            goTo('/admin-page/alumni')
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


                    {/* =================================
                        TRACER STUDY
                    ================================== */}

                    <button
                        type="button"
                        className={
                            isActive(
                                '/admin-page/tracer-study'
                            )
                                ? 'sidebar-item active'
                                : 'sidebar-item'
                        }
                        onClick={() =>
                            goTo(
                                '/admin-page/tracer-study'
                            )
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


                    {/* =================================
                        PERUSAHAAN
                    ================================== */}

                    <button
                        type="button"
                        className={
                            isActive(
                                '/admin-page/perusahaan'
                            )
                                ? 'sidebar-item active'
                                : 'sidebar-item'
                        }
                        onClick={() =>
                            goTo(
                                '/admin-page/perusahaan'
                            )
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

                    {/* =================================
                        KAMPUS
                    ================================== */}

                    <button
                        type="button"
                        className={
                            isActive(
                                '/admin-page/kampus'
                            )
                                ? 'sidebar-item active'
                                : 'sidebar-item'
                        }
                        onClick={() =>
                            goTo(
                                '/admin-page/kampus'
                            )
                        }
                    >

                        <svg viewBox="0 0 24 24">

                            <path d="M2 10l10-6 10 6" />

                            <path d="M4 10v8" />
                            <path d="M8 10v8" />
                            <path d="M12 10v8" />
                            <path d="M16 10v8" />
                            <path d="M20 10v8" />

                            <path d="M3 18h18" />

                            <path d="M2 21h20" />

                        </svg>

                        <span>
                            Kampus
                        </span>

                    </button>

                    {/* =================================
                        LOWONGAN KERJA
                    ================================== */}

                    <button
                        type="button"
                        className={
                            isActive(
                                '/admin-page/lowongan'
                            )
                                ? 'sidebar-item active'
                                : 'sidebar-item'
                        }
                        onClick={() =>
                            goTo(
                                '/admin-page/lowongan'
                            )
                        }
                    >

                        <svg viewBox="0 0 24 24">

                            <path d="M3 7h18v13H3z" />
                            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <path d="M3 12h18" />

                        </svg>

                        <span>
                            Lowongan Kerja
                        </span>

                    </button>

                    {/* =================================
                        BEASISWA
                    ================================== */}

                    <button
                        type="button"
                        className={
                            isActive(
                                '/admin-page/beasiswa'
                            )
                                ? 'sidebar-item active'
                                : 'sidebar-item'
                        }
                        onClick={() =>
                            goTo(
                                '/admin-page/beasiswa'
                            )
                        }
                    >

                        <svg viewBox="0 0 24 24">

                            <path d="M22 10L12 5 2 10l10 5 10-5z" />
                            <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />

                        </svg>

                        <span>
                            Beasiswa
                        </span>

                    </button>


                    {/* =================================
                        MANAGEMENT
                    ================================== */}

                    <p className="menu-label menu-label-second">
                        MANAGEMENT
                    </p>


                    {/* =================================
                        LAPORAN
                    ================================== */}

                    <button
                        type="button"
                        className={
                            isActive(
                                '/admin-page/laporan'
                            )
                                ? 'sidebar-item active'
                                : 'sidebar-item'
                        }
                        onClick={() =>
                            goTo(
                                '/admin-page/laporan'
                            )
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


                    {/* =================================
                        SETTINGS
                    ================================== */}

                    <button
                        type="button"
                        className={
                            isActive(
                                '/admin-page/settings'
                            )
                                ? 'sidebar-item active'
                                : 'sidebar-item'
                        }
                        onClick={() =>
                            goTo(
                                '/admin-page/settings'
                            )
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


                {/* =================================
                    SIDEBAR FOOTER
                ================================== */}

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


            {/* =====================================
                MAIN
            ====================================== */}

            <main className="admin-main">


                {/* =================================
                    TOPBAR
                ================================== */}

                <header className="admin-topbar">

                    <div>

                        <h1>
                            {title}
                        </h1>

                        {description && (

                            <p>
                                {description}
                            </p>

                        )}

                    </div>


                    <div className="topbar-actions">


                        {/* =================================
                            NOTIFICATION
                        ================================== */}

                        <button
                            type="button"
                            className="notification-button"
                            onClick={() =>
                                setShowNotifications((prev) => !prev)
                            }
                            title="Notifikasi"
                        >

                            <svg viewBox="0 0 24 24">

                                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

                                <path d="M10 21h4" />

                            </svg>

                            <span className="notification-dot"></span>

                        </button>

                        {showNotifications && (
                            <NotificationPopup
                            onViewAll={() => {
                                setShowNotifications(false)
                                goTo('/admin-page/laporan')
                            }}
                            />
                        )}

                        {/* =================================
                            PROFILE
                        ================================== */}

                        <div className="profile-container">

                            <button
                                type="button"
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
                                        {profile.role}
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


                            {/* =================================
                                PROFILE DROPDOWN
                            ================================== */}

                            {showProfile && (

                                <div className="profile-dropdown">


                                    {/* USER */}

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


                                    {/* PROFILE */}

                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            goTo(
                                                '/admin-page/profile'
                                            )
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


                                    {/* SETTINGS */}

                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            goTo(
                                                '/admin-page/settings'
                                            )
                                        }
                                    >

                                        <svg viewBox="0 0 24 24">

                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="3"
                                            />

                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 6.5 4.29l.06.06A1.65 1.65 0 0 0 9 4.6h.05A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a2 2 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l-.06-.06A2 2 0 1 1 19.4 9v.05A1.65 1.65 0 0 0 20.91 10H21a2 2 0 1 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z" />

                                        </svg>

                                        Pengaturan

                                    </button>


                                    <div className="dropdown-divider"></div>


                                    {/* DARK MODE */}

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
                                            onClick={
                                                toggleDarkMode
                                            }
                                        >

                                            <span></span>

                                        </button>

                                    </div>


                                    <div className="dropdown-divider"></div>


                                    {/* LOGOUT */}

                                    <button
                                        type="button"
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


                {/* =================================
                    PAGE CONTENT
                ================================== */}

                <div className="dashboard-content">

                    {children}

                </div>

            </main>

        </div>
    )
}