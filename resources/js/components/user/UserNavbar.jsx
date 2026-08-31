import React, { useState } from 'react'

export default function UserNavbar() {

    const [profileOpen, setProfileOpen] = useState(false)

    const path = window.location.pathname

    const menus = [
        {
            label: 'Beranda',
            path: '/alumni',
        },
        {
            label: 'Kampus',
            path: '/alumni/kampus',
        },
        {
            label: 'Beasiswa',
            path: '/alumni/beasiswa',
        },
        {
            label: 'Lowongan',
            path: '/alumni/lowongan',
        },
        {
            label: 'Tracer Study',
            path: '/alumni/tracer-study',
        },
    ]


    // =========================================================
    // NOTIFICATION
    // =========================================================

    const hasUnreadNotification = true


    // =========================================================
    // HANDLE NOTIFICATION
    // =========================================================

    const handleNotificationClick = () => {

        window.location.href =
            '/alumni/notifications'

    }


    // =========================================================
    // HANDLE LOGOUT
    // =========================================================

    const handleLogout = async () => {

        const confirmed = window.confirm(
            'Apakah Anda yakin ingin logout?'
        )

        if (!confirmed) {
            return
        }

        const token = localStorage.getItem('tracer_token')

        try {

            if (token) {

                await fetch('/api/v1/auth/logout', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

            }

        } catch (e) {
            // Tetap lanjut logout di sisi client meskipun request gagal
        }

        localStorage.removeItem('tracer_token')
        localStorage.removeItem('tracer_user')

        window.location.href = '/login'
    }


    return (

        <header className="user-navbar">

            <div className="user-navbar-inner">


                {/* =====================================================
                    LOGO
                ===================================================== */}

                <a
                    href="/alumni"
                    className="user-brand"
                >

                    <div className="user-brand-logo">
                        TS
                    </div>

                    <div className="user-brand-text">

                        <strong>
                            Tracer Alumni
                        </strong>

                        <span>
                            Telkom Schools
                        </span>

                    </div>

                </a>


                {/* =====================================================
                    NAVIGATION
                ===================================================== */}

                <nav className="user-nav">

                    {menus.map((menu) => (

                        <a
                            key={menu.path}
                            href={menu.path}
                            className={
                                path === menu.path
                                    ? 'user-nav-link active'
                                    : 'user-nav-link'
                            }
                        >
                            {menu.label}
                        </a>

                    ))}

                </nav>


                {/* =====================================================
                    RIGHT SIDE
                ===================================================== */}

                <div className="user-navbar-actions">


                    {/* =================================================
                        NOTIFICATION
                    ================================================= */}

                    <button
                        type="button"
                        className={
                            path === '/alumni/notifications'
                                ? 'user-notification-button active'
                                : 'user-notification-button'
                        }
                        title="Notifikasi"
                        onClick={handleNotificationClick}
                        aria-label="Notifikasi"
                    >

                        <span className="notification-icon">
                            🔔
                        </span>


                        {/* UNREAD INDICATOR */}

                        {hasUnreadNotification && (
                            <span className="notification-dot"></span>
                        )}

                    </button>


                    {/* =================================================
                        PROFILE
                    ================================================= */}

                    <div className="user-profile-wrapper">


                        {/* PROFILE BUTTON */}

                        <button
                            type="button"
                            className="user-profile-button"
                            onClick={() =>
                                setProfileOpen(
                                    !profileOpen
                                )
                            }
                        >

                            <div className="user-avatar">
                                A
                            </div>


                            <div className="user-profile-info">

                                <strong>
                                    Aulia
                                </strong>

                            </div>
                        </button>


                        {/* =================================================
                            PROFILE DROPDOWN
                        ================================================= */}

                        {profileOpen && (

                            <div className="user-profile-dropdown">


                                <a
                                    href="/alumni/profile"
                                    onClick={() =>
                                        setProfileOpen(false)
                                    }
                                >
                                    Profil Saya
                                </a>


                                <a
                                    href="/alumni/settings"
                                    onClick={() =>
                                        setProfileOpen(false)
                                    }
                                >
                                    Pengaturan
                                </a>


                                <button
                                    type="button"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>


                            </div>

                        )}

                    </div>

                </div>

            </div>

        </header>
    )
}