import React, { useEffect, useState } from 'react'
import UserLayout from './UserLayout'

export default function AlumniSettings() {

    // =========================================================
    // STATE
    // =========================================================

    const [darkMode, setDarkMode] = useState(() => {

        try {

            return (
                localStorage.getItem('alumniDarkMode') === 'true'
            )

        } catch (error) {

            return false

        }

    })


    const [notifications, setNotifications] = useState(() => {

        try {

            const saved =
                localStorage.getItem('alumniNotificationSettings')

            if (saved) {
                return JSON.parse(saved)
            }

        } catch (error) {

            console.error(
                'Gagal membaca pengaturan notifikasi:',
                error
            )

        }

        return {
            general: true,
            tracer: true,
            information: true
        }

    })


    const [showPassword, setShowPassword] =
        useState(false)


    const [passwordData, setPasswordData] = useState({
        passwordLama: '',
        passwordBaru: '',
        konfirmasiPassword: ''
    })


    // =========================================================
    // DARK MODE
    // =========================================================

    useEffect(() => {

        try {

            localStorage.setItem(
                'alumniDarkMode',
                darkMode
            )

        } catch (error) {

            console.error(
                'Gagal menyimpan mode tampilan:',
                error
            )

        }

        /*
         * Class ini dipasang pada body supaya
         * halaman UserLayout juga dapat mengikuti
         * mode gelap.
         */

        if (darkMode) {

            document.body.classList.add(
                'alumni-dark-mode'
            )

        } else {

            document.body.classList.remove(
                'alumni-dark-mode'
            )

        }

        return () => {

            document.body.classList.remove(
                'alumni-dark-mode'
            )

        }

    }, [darkMode])


    // =========================================================
    // NOTIFICATION
    // =========================================================

    const handleNotificationChange = (
        field,
        value
    ) => {

        const updated = {
            ...notifications,
            [field]: value
        }

        setNotifications(updated)

        try {

            localStorage.setItem(
                'alumniNotificationSettings',
                JSON.stringify(updated)
            )

        } catch (error) {

            console.error(
                'Gagal menyimpan pengaturan notifikasi:',
                error
            )

        }

    }


    // =========================================================
    // PASSWORD INPUT
    // =========================================================

    const handlePasswordChange = (
        field,
        value
    ) => {

        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }))

    }


    // =========================================================
    // SAVE PASSWORD
    // =========================================================

    const handleSavePassword = e => {

        e.preventDefault()

        if (
            !passwordData.passwordLama ||
            !passwordData.passwordBaru ||
            !passwordData.konfirmasiPassword
        ) {

            alert(
                'Silakan lengkapi semua field password.'
            )

            return

        }


        if (
            passwordData.passwordBaru !==
            passwordData.konfirmasiPassword
        ) {

            alert(
                'Konfirmasi password baru tidak sesuai.'
            )

            return

        }


        if (
            passwordData.passwordBaru.length < 8
        ) {

            alert(
                'Password baru minimal 8 karakter.'
            )

            return

        }


        /*
         * Untuk sementara hanya simulasi.
         * Nantinya bagian ini dapat dihubungkan
         * ke API backend Laravel.
         */

        alert(
            'Password berhasil diperbarui.'
        )


        setPasswordData({
            passwordLama: '',
            passwordBaru: '',
            konfirmasiPassword: ''
        })

    }


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        const confirmLogout =
            window.confirm(
                'Apakah Anda yakin ingin keluar dari akun?'
            )

        if (!confirmLogout) {
            return
        }


        /*
         * Untuk sementara arahkan ke halaman login.
         * Nantinya dapat diganti dengan proses logout API.
         */

        window.location.href = '/login'

    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <UserLayout>

            <div className="alumni-settings-page">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="settings-page-header">

                    <div>

                        <span className="settings-label">
                            PENGATURAN AKUN
                        </span>

                        <h1>
                            Pengaturan
                        </h1>

                        <p>
                            Kelola tampilan, notifikasi,
                            dan keamanan akun alumni Anda.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    SETTINGS CONTENT
                ================================================= */}

                <div className="settings-content">


                    {/* =================================================
                        APPEARANCE
                    ================================================= */}

                    <section className="settings-card">

                        <div className="settings-card-header">

                            <div className="settings-card-icon">
                                ◐
                            </div>

                            <div>

                                <h2>
                                    Tampilan
                                </h2>

                                <p>
                                    Sesuaikan tampilan aplikasi
                                    sesuai kenyamanan Anda.
                                </p>

                            </div>

                        </div>


                        <div className="settings-option">

                            <div className="settings-option-info">

                                <strong>
                                    Dark Mode
                                </strong>

                                <span>
                                    Gunakan tampilan gelap
                                    untuk mengurangi cahaya
                                    layar.
                                </span>

                            </div>


                            <label className="settings-switch">

                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={e =>
                                        setDarkMode(
                                            e.target.checked
                                        )
                                    }
                                />

                                <span className="settings-slider"></span>

                            </label>

                        </div>

                    </section>


                    {/* =================================================
                        NOTIFICATIONS
                    ================================================= */}

                    <section className="settings-card">

                        <div className="settings-card-header">

                            <div className="settings-card-icon">
                                🔔
                            </div>

                            <div>

                                <h2>
                                    Notifikasi
                                </h2>

                                <p>
                                    Atur informasi apa saja
                                    yang ingin Anda terima.
                                </p>

                            </div>

                        </div>


                        <div className="settings-list">


                            {/* GENERAL */}

                            <div className="settings-option">

                                <div className="settings-option-info">

                                    <strong>
                                        Notifikasi Umum
                                    </strong>

                                    <span>
                                        Terima informasi dan
                                        pemberitahuan umum.
                                    </span>

                                </div>


                                <label className="settings-switch">

                                    <input
                                        type="checkbox"
                                        checked={
                                            notifications.general
                                        }
                                        onChange={e =>
                                            handleNotificationChange(
                                                'general',
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span className="settings-slider"></span>

                                </label>

                            </div>


                            {/* TRACER */}

                            <div className="settings-option">

                                <div className="settings-option-info">

                                    <strong>
                                        Pengingat Tracer Study
                                    </strong>

                                    <span>
                                        Terima pengingat untuk
                                        mengisi atau memperbarui
                                        tracer study.
                                    </span>

                                </div>


                                <label className="settings-switch">

                                    <input
                                        type="checkbox"
                                        checked={
                                            notifications.tracer
                                        }
                                        onChange={e =>
                                            handleNotificationChange(
                                                'tracer',
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span className="settings-slider"></span>

                                </label>

                            </div>


                            {/* INFORMATION */}

                            <div className="settings-option">

                                <div className="settings-option-info">

                                    <strong>
                                        Lowongan & Beasiswa
                                    </strong>

                                    <span>
                                        Terima informasi terbaru
                                        mengenai lowongan dan
                                        beasiswa.
                                    </span>

                                </div>


                                <label className="settings-switch">

                                    <input
                                        type="checkbox"
                                        checked={
                                            notifications.information
                                        }
                                        onChange={e =>
                                            handleNotificationChange(
                                                'information',
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span className="settings-slider"></span>

                                </label>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        SECURITY
                    ================================================= */}

                    <section className="settings-card">

                        <div className="settings-card-header">

                            <div className="settings-card-icon">
                                🔒
                            </div>

                            <div>

                                <h2>
                                    Keamanan Akun
                                </h2>

                                <p>
                                    Perbarui password secara
                                    berkala untuk menjaga
                                    keamanan akun.
                                </p>

                            </div>

                        </div>


                        <form
                            className="settings-password-form"
                            onSubmit={
                                handleSavePassword
                            }
                        >


                            {/* OLD PASSWORD */}

                            <div className="settings-form-group">

                                <label htmlFor="password-lama">
                                    Password Saat Ini
                                </label>

                                <div className="settings-password-input">

                                    <input
                                        id="password-lama"
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={
                                            passwordData.passwordLama
                                        }
                                        onChange={e =>
                                            handlePasswordChange(
                                                'passwordLama',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan password saat ini"
                                    />

                                </div>

                            </div>


                            {/* NEW PASSWORD */}

                            <div className="settings-form-group">

                                <label htmlFor="password-baru">
                                    Password Baru
                                </label>

                                <div className="settings-password-input">

                                    <input
                                        id="password-baru"
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={
                                            passwordData.passwordBaru
                                        }
                                        onChange={e =>
                                            handlePasswordChange(
                                                'passwordBaru',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Minimal 8 karakter"
                                    />

                                </div>

                            </div>


                            {/* CONFIRM PASSWORD */}

                            <div className="settings-form-group">

                                <label htmlFor="password-konfirmasi">
                                    Konfirmasi Password Baru
                                </label>

                                <div className="settings-password-input">

                                    <input
                                        id="password-konfirmasi"
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={
                                            passwordData.konfirmasiPassword
                                        }
                                        onChange={e =>
                                            handlePasswordChange(
                                                'konfirmasiPassword',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Ulangi password baru"
                                    />

                                </div>

                            </div>


                            {/* SHOW PASSWORD */}

                            <label className="settings-show-password">

                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={e =>
                                        setShowPassword(
                                            e.target.checked
                                        )
                                    }
                                />

                                <span>
                                    Tampilkan password
                                </span>

                            </label>


                            {/* PASSWORD ACTION */}

                            <div className="settings-form-actions">

                                <button
                                    type="submit"
                                    className="settings-btn-primary"
                                >
                                    Simpan Password
                                </button>

                            </div>

                        </form>

                    </section>


                    {/* =================================================
                        ACCOUNT
                    ================================================= */}

                    <section className="settings-card settings-account-card">

                        <div className="settings-card-header">

                            <div className="settings-card-icon settings-danger-icon">
                                !
                            </div>

                            <div>

                                <h2>
                                    Akun
                                </h2>

                                <p>
                                    Kelola sesi akun Anda.
                                </p>

                            </div>

                        </div>


                        <div className="settings-logout-row">

                            <div className="settings-option-info">

                                <strong>
                                    Keluar dari Akun
                                </strong>

                                <span>
                                    Anda akan diarahkan ke
                                    halaman login.
                                </span>

                            </div>


                            <button
                                type="button"
                                className="settings-btn-logout"
                                onClick={
                                    handleLogout
                                }
                            >
                                Logout
                            </button>

                        </div>

                    </section>


                </div>

            </div>

        </UserLayout>

    )
}