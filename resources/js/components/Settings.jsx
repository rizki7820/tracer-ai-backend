import React, { useEffect, useState } from 'react'

export default function Settings() {

    // =========================================
    // STATE
    // =========================================

    const [activeSection, setActiveSection] = useState('general')

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('tracer_dark_mode') === 'true'
    })

    const [settings, setSettings] = useState(() => {

        const savedSettings =
            localStorage.getItem('tracer_settings')

        if (savedSettings) {
            try {
                return JSON.parse(savedSettings)
            } catch (error) {
                console.error(
                    'Gagal membaca pengaturan:',
                    error
                )
            }
        }

        return {
            applicationName: 'Tracer Alumni',
            schoolName: 'Telkom Schools',
            language: 'Bahasa Indonesia',
            dateFormat: 'DD/MM/YYYY',
        }
    })

    const [notifications, setNotifications] = useState(() => {

        const savedNotifications =
            localStorage.getItem('tracer_notifications')

        if (savedNotifications) {
            try {
                return JSON.parse(savedNotifications)
            } catch (error) {
                console.error(
                    'Gagal membaca pengaturan notifikasi:',
                    error
                )
            }
        }

        return {
            alumni: true,
            tracer: true,
            company: true,
            system: true,
        }
    })

    const [message, setMessage] = useState('')


    // =========================================
    // DARK MODE
    // =========================================

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


    // =========================================
    // HANDLER
    // =========================================

    function handleSettingChange(e) {

        const {
            name,
            value,
        } = e.target

        setSettings((prev) => ({
            ...prev,
            [name]: value,
        }))

    }


    function handleNotificationChange(name) {

        setNotifications((prev) => ({
            ...prev,
            [name]: !prev[name],
        }))

    }


    function showMessage(text) {

        setMessage(text)

        setTimeout(() => {
            setMessage('')
        }, 3000)

    }


    function saveSettings() {

        localStorage.setItem(
            'tracer_settings',
            JSON.stringify(settings)
        )

        localStorage.setItem(
            'tracer_notifications',
            JSON.stringify(notifications)
        )

        showMessage(
            'Pengaturan berhasil disimpan.'
        )

    }


    function saveAppearance() {

        localStorage.setItem(
            'tracer_dark_mode',
            darkMode
        )

        showMessage(
            'Pengaturan tampilan berhasil disimpan.'
        )

    }


    function saveNotifications() {

        localStorage.setItem(
            'tracer_notifications',
            JSON.stringify(notifications)
        )

        showMessage(
            'Pengaturan notifikasi berhasil disimpan.'
        )

    }


    // =========================================
    // NAVIGATION
    // =========================================

    function goTo(path) {
        window.location.href = path
    }


    // =========================================
    // RENDER
    // =========================================

    return (

        <div
            className={
                darkMode
                    ? 'admin-dashboard settings-page dark-mode'
                    : 'admin-dashboard settings-page'
            }
        >

            {/* =====================================
                SIDEBAR
            ====================================== */}

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
                        type="button"
                        className="sidebar-item"
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


                    {/* ALUMNI */}

                    <button
                        type="button"
                        className="sidebar-item"
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


                    {/* TRACER STUDY */}

                    <button
                        type="button"
                        className="sidebar-item"
                        onClick={() =>
                            goTo('/admin-page/tracer-study')
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
                        type="button"
                        className="sidebar-item"
                        onClick={() =>
                            goTo('/admin-page/perusahaan')
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
                        type="button"
                        className="sidebar-item"
                        onClick={() =>
                            goTo('/admin-page/laporan')
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


                    {/* PENGATURAN */}

                    <button
                        type="button"
                        className="sidebar-item active"
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


            {/* =====================================
                MAIN
            ====================================== */}

            <main className="admin-main">

                <header className="admin-topbar">

                    <div>

                        <h1>
                            Pengaturan
                        </h1>

                        <p>
                            Kelola preferensi sistem dan akun.
                        </p>

                    </div>


                    <div className="topbar-actions">

                        <button
                            type="button"
                            className="notification-button"
                            onClick={() =>
                                goTo(
                                    '/admin-page/notifications'
                                )
                            }
                            title="Notifikasi"
                        >

                            <svg viewBox="0 0 24 24">

                                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

                                <path d="M10 21h4" />

                            </svg>

                            <span className="notification-dot"></span>

                        </button>

                    </div>

                </header>


                {/* =====================================
                    CONTENT
                ====================================== */}

                <div className="settings-content">

                    <section className="settings-layout">


                        {/* =================================
                            NAVIGATION
                        ================================== */}

                        <aside className="settings-navigation">


                            {/* UMUM */}

                            <button
                                type="button"
                                className={
                                    activeSection === 'general'
                                        ? 'settings-nav-item active'
                                        : 'settings-nav-item'
                                }
                                onClick={() =>
                                    setActiveSection('general')
                                }
                            >

                                <span className="settings-nav-icon">

                                    <svg viewBox="0 0 24 24">

                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="3"
                                        />

                                        <path d="M12 2v2" />
                                        <path d="M12 20v2" />

                                        <path d="M2 12h2" />
                                        <path d="M20 12h2" />

                                    </svg>

                                </span>

                                <span>
                                    Umum
                                </span>

                            </button>


                            {/* TAMPILAN */}

                            <button
                                type="button"
                                className={
                                    activeSection === 'appearance'
                                        ? 'settings-nav-item active'
                                        : 'settings-nav-item'
                                }
                                onClick={() =>
                                    setActiveSection('appearance')
                                }
                            >

                                <span className="settings-nav-icon">

                                    <svg viewBox="0 0 24 24">

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

                                    </svg>

                                </span>

                                <span>
                                    Tampilan
                                </span>

                            </button>


                            {/* NOTIFIKASI */}

                            <button
                                type="button"
                                className={
                                    activeSection === 'notifications'
                                        ? 'settings-nav-item active'
                                        : 'settings-nav-item'
                                }
                                onClick={() =>
                                    setActiveSection('notifications')
                                }
                            >

                                <span className="settings-nav-icon">

                                    <svg viewBox="0 0 24 24">

                                        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

                                        <path d="M10 21h4" />

                                    </svg>

                                </span>

                                <span>
                                    Notifikasi
                                </span>

                            </button>


                            {/* KEAMANAN */}

                            <button
                                type="button"
                                className="settings-nav-item"
                                onClick={() =>
                                    goTo('/admin-page/profile')
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


                        {/* =================================
                            PANEL
                        ================================== */}

                        <div className="settings-panel">


                            {/* =================================
                                GENERAL
                            ================================== */}

                            {activeSection === 'general' && (

                                <div>

                                    <div className="settings-panel-header">

                                        <h3>
                                            Pengaturan Umum
                                        </h3>

                                        <p>
                                            Atur informasi dasar aplikasi.
                                        </p>

                                    </div>


                                    <div className="settings-form">


                                        <div className="form-field">

                                            <label>
                                                Nama Aplikasi
                                            </label>

                                            <input
                                                type="text"
                                                name="applicationName"
                                                value={
                                                    settings.applicationName
                                                }
                                                onChange={
                                                    handleSettingChange
                                                }
                                            />

                                        </div>


                                        <div className="form-field">

                                            <label>
                                                Nama Sekolah / Instansi
                                            </label>

                                            <input
                                                type="text"
                                                name="schoolName"
                                                value={
                                                    settings.schoolName
                                                }
                                                onChange={
                                                    handleSettingChange
                                                }
                                            />

                                        </div>


                                        <div className="form-row">

                                            <div className="form-field">

                                                <label>
                                                    Bahasa
                                                </label>

                                                <select
                                                    name="language"
                                                    value={
                                                        settings.language
                                                    }
                                                    onChange={
                                                        handleSettingChange
                                                    }
                                                >

                                                    <option value="Bahasa Indonesia">
                                                        Bahasa Indonesia
                                                    </option>

                                                    <option value="English">
                                                        English
                                                    </option>

                                                </select>

                                            </div>


                                            <div className="form-field">

                                                <label>
                                                    Format Tanggal
                                                </label>

                                                <select
                                                    name="dateFormat"
                                                    value={
                                                        settings.dateFormat
                                                    }
                                                    onChange={
                                                        handleSettingChange
                                                    }
                                                >

                                                    <option value="DD/MM/YYYY">
                                                        DD/MM/YYYY
                                                    </option>

                                                    <option value="MM/DD/YYYY">
                                                        MM/DD/YYYY
                                                    </option>

                                                    <option value="YYYY-MM-DD">
                                                        YYYY-MM-DD
                                                    </option>

                                                </select>

                                            </div>

                                        </div>

                                    </div>


                                    <div className="form-actions">

                                        <button
                                            type="button"
                                            className="primary-button"
                                            onClick={saveSettings}
                                        >
                                            Simpan Perubahan
                                        </button>

                                    </div>

                                </div>

                            )}


                            {/* =================================
                                APPEARANCE
                            ================================== */}

                            {activeSection === 'appearance' && (

                                <div>

                                    <div className="settings-panel-header">

                                        <h3>
                                            Tampilan
                                        </h3>

                                        <p>
                                            Atur tampilan dashboard sesuai kebutuhan.
                                        </p>

                                    </div>


                                    <div className="setting-option">

                                        <div className="setting-option-icon">

                                            <svg viewBox="0 0 24 24">

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

                                        </div>


                                        <div className="setting-option-content">

                                            <strong>
                                                Mode Tampilan
                                            </strong>

                                            <span>
                                                Gunakan tema gelap untuk tampilan dashboard.
                                            </span>

                                        </div>


                                        <label className="theme-toggle">

                                            <input
                                                type="checkbox"
                                                checked={darkMode}
                                                onChange={(e) =>
                                                    setDarkMode(
                                                        e.target.checked
                                                    )
                                                }
                                            />

                                            <span className="theme-slider"></span>

                                        </label>

                                    </div>


                                    <div className="theme-preview">

                                        <div
                                            className={
                                                darkMode
                                                    ? 'theme-preview-card dark-preview'
                                                    : 'theme-preview-card light-preview'
                                            }
                                        >

                                            <div className="preview-top"></div>

                                            <div className="preview-content">

                                                <div className="preview-sidebar"></div>

                                                <div className="preview-main">

                                                    <div className="preview-line long"></div>

                                                    <div className="preview-line"></div>

                                                    <div className="preview-boxes">

                                                        <span></span>
                                                        <span></span>
                                                        <span></span>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>


                                        <div className="theme-preview-label">

                                            {darkMode
                                                ? 'Dark Mode aktif'
                                                : 'Light Mode aktif'}

                                        </div>

                                    </div>


                                    <div className="form-actions">

                                        <button
                                            type="button"
                                            className="primary-button"
                                            onClick={saveAppearance}
                                        >
                                            Simpan Tampilan
                                        </button>

                                    </div>

                                </div>

                            )}


                            {/* =================================
                                NOTIFICATIONS
                            ================================== */}

                            {activeSection === 'notifications' && (

                                <div>

                                    <div className="settings-panel-header">

                                        <h3>
                                            Notifikasi
                                        </h3>

                                        <p>
                                            Pilih jenis notifikasi yang ingin diterima admin.
                                        </p>

                                    </div>


                                    <div className="notification-settings">


                                        <NotificationOption
                                            icon={
                                                <>
                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                    <circle
                                                        cx="9"
                                                        cy="7"
                                                        r="4"
                                                    />
                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                </>
                                            }
                                            title="Aktivitas Alumni"
                                            description="Notifikasi ketika alumni memperbarui data."
                                            checked={notifications.alumni}
                                            onChange={() =>
                                                handleNotificationChange(
                                                    'alumni'
                                                )
                                            }
                                        />


                                        <NotificationOption
                                            icon={
                                                <>
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
                                                </>
                                            }
                                            title="Tracer Study"
                                            description="Notifikasi ketika alumni mengisi tracer study."
                                            checked={notifications.tracer}
                                            onChange={() =>
                                                handleNotificationChange(
                                                    'tracer'
                                                )
                                            }
                                        />


                                        <NotificationOption
                                            icon={
                                                <>
                                                    <path d="M3 21h18" />
                                                    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                                                    <path d="M9 7h1" />
                                                    <path d="M14 7h1" />
                                                    <path d="M9 11h1" />
                                                    <path d="M14 11h1" />
                                                    <path d="M9 15h1" />
                                                    <path d="M14 15h1" />
                                                </>
                                            }
                                            title="Perusahaan"
                                            description="Notifikasi ketika perusahaan baru terdaftar."
                                            checked={notifications.company}
                                            onChange={() =>
                                                handleNotificationChange(
                                                    'company'
                                                )
                                            }
                                        />


                                        <NotificationOption
                                            icon={
                                                <>
                                                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                                                    <path d="M10 21h4" />
                                                </>
                                            }
                                            title="Notifikasi Sistem"
                                            description="Informasi penting mengenai sistem."
                                            checked={notifications.system}
                                            onChange={() =>
                                                handleNotificationChange(
                                                    'system'
                                                )
                                            }
                                        />

                                    </div>


                                    <div className="form-actions">

                                        <button
                                            type="button"
                                            className="primary-button"
                                            onClick={saveNotifications}
                                        >
                                            Simpan Notifikasi
                                        </button>

                                    </div>

                                </div>

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


// =========================================
// NOTIFICATION OPTION
// =========================================

function NotificationOption({
    icon,
    title,
    description,
    checked,
    onChange,
}) {

    return (

        <div className="setting-option">

            <div className="setting-option-icon">

                <svg viewBox="0 0 24 24">
                    {icon}
                </svg>

            </div>


            <div className="setting-option-content">

                <strong>
                    {title}
                </strong>

                <span>
                    {description}
                </span>

            </div>


            <label className="theme-toggle">

                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />

                <span className="theme-slider"></span>

            </label>

        </div>
    )
}