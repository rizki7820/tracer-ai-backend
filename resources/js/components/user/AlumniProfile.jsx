import React, { useState } from 'react'
import UserLayout from './UserLayout'

export default function AlumniProfile() {

    // =========================================================
    // DEFAULT PROFILE
    // =========================================================

    const defaultProfile = {
        nama: 'Aulia',
        nisn: '',
        jurusan: '',
        angkatan: '',
        email: '',
        noHp: '',
        alamat: ''
    }


    // =========================================================
    // LOAD PROFILE
    // =========================================================

    const getInitialProfile = () => {

        try {

            const savedProfile =
                localStorage.getItem('alumniProfile')

            if (savedProfile) {

                return {
                    ...defaultProfile,
                    ...JSON.parse(savedProfile)
                }
            }

        } catch (error) {

            console.error(
                'Gagal membaca data profile:',
                error
            )

        }

        return defaultProfile
    }


    // =========================================================
    // STATE
    // =========================================================

    const [profile, setProfile] =
        useState(getInitialProfile)

    const [formData, setFormData] =
        useState(getInitialProfile)

    const [isEditing, setIsEditing] =
        useState(false)


    // =========================================================
    // HANDLE INPUT
    // =========================================================

    const handleChange = (field, value) => {

        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

    }


    // =========================================================
    // EDIT PROFILE
    // =========================================================

    const handleEdit = () => {

        setFormData(profile)

        setIsEditing(true)

    }


    // =========================================================
    // CANCEL EDIT
    // =========================================================

    const handleCancel = () => {

        setFormData(profile)

        setIsEditing(false)

    }


    // =========================================================
    // SAVE PROFILE
    // =========================================================

    const handleSave = e => {

        e.preventDefault()

        const updatedProfile = {
            ...formData
        }

        setProfile(updatedProfile)

        localStorage.setItem(
            'alumniProfile',
            JSON.stringify(updatedProfile)
        )

        setIsEditing(false)

        alert(
            'Profil berhasil diperbarui.'
        )

    }


    // =========================================================
    // AVATAR INITIAL
    // =========================================================

    const getInitial = () => {

        if (!profile.nama) {
            return 'A'
        }

        return profile.nama
            .trim()
            .charAt(0)
            .toUpperCase()

    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <UserLayout>

            <div className="alumni-profile-page">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="profile-page-header">

                    <div>

                        <span className="profile-label">
                            PROFIL ALUMNI
                        </span>

                        <h1>
                            Profil Saya
                        </h1>

                        <p>
                            Kelola informasi pribadi Anda
                            yang digunakan pada akun alumni.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    PROFILE CONTENT
                ================================================= */}

                <div className="profile-content">

                    {/* =================================================
                        PROFILE CARD
                    ================================================= */}

                    <section className="profile-card">

                        {/* PROFILE HERO */}

                        <div className="profile-card-header">

                            <div className="profile-avatar-large">
                                {getInitial()}
                            </div>

                            <div className="profile-identity">

                                <h2>
                                    {profile.nama ||
                                        'Nama Alumni'}
                                </h2>

                                <span>
                                    Informasi Pribadi
                                </span>

                            </div>

                        </div>


                        {/* =================================================
                            INFORMATION
                        ================================================= */}

                        {!isEditing ? (

                            <div className="profile-information">

                                {/* NISN */}

                                <div className="profile-info-item">

                                    <span className="profile-info-label">
                                        NIS / NISN
                                    </span>

                                    <strong>
                                        {profile.nisn ||
                                            'Belum diisi'}
                                    </strong>

                                </div>


                                {/* JURUSAN */}

                                <div className="profile-info-item">

                                    <span className="profile-info-label">
                                        Jurusan
                                    </span>

                                    <strong>
                                        {profile.jurusan ||
                                            'Belum diisi'}
                                    </strong>

                                </div>


                                {/* TAHUN ANGKATAN */}

                                <div className="profile-info-item">

                                    <span className="profile-info-label">
                                        Tahun Angkatan
                                    </span>

                                    <strong>
                                        {profile.angkatan ||
                                            'Belum diisi'}
                                    </strong>

                                </div>


                                {/* EMAIL */}

                                <div className="profile-info-item">

                                    <span className="profile-info-label">
                                        Email
                                    </span>

                                    <strong>
                                        {profile.email ||
                                            'Belum diisi'}
                                    </strong>

                                </div>


                                {/* NOMOR HP */}

                                <div className="profile-info-item">

                                    <span className="profile-info-label">
                                        Nomor HP
                                    </span>

                                    <strong>
                                        {profile.noHp ||
                                            'Belum diisi'}
                                    </strong>

                                </div>


                                {/* ALAMAT */}

                                <div className="profile-info-item profile-info-full">

                                    <span className="profile-info-label">
                                        Alamat
                                    </span>

                                    <strong>
                                        {profile.alamat ||
                                            'Belum diisi'}
                                    </strong>

                                </div>

                            </div>

                        ) : (

                            /* =================================================
                               EDIT FORM
                            ================================================= */

                            <form
                                className="profile-edit-form"
                                onSubmit={handleSave}
                            >

                                {/* NAMA */}

                                <div className="profile-form-group">

                                    <label htmlFor="profile-nama">
                                        Nama Lengkap
                                    </label>

                                    <input
                                        id="profile-nama"
                                        type="text"
                                        value={
                                            formData.nama
                                        }
                                        onChange={e =>
                                            handleChange(
                                                'nama',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan nama lengkap"
                                    />

                                </div>


                                {/* NISN */}

                                <div className="profile-form-group">

                                    <label htmlFor="profile-nisn">
                                        NIS / NISN
                                    </label>

                                    <input
                                        id="profile-nisn"
                                        type="text"
                                        value={
                                            formData.nisn
                                        }
                                        onChange={e =>
                                            handleChange(
                                                'nisn',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan NIS / NISN"
                                    />

                                </div>


                                {/* JURUSAN */}

                                <div className="profile-form-group">

                                    <label htmlFor="profile-jurusan">
                                        Jurusan
                                    </label>

                                    <input
                                        id="profile-jurusan"
                                        type="text"
                                        value={
                                            formData.jurusan
                                        }
                                        onChange={e =>
                                            handleChange(
                                                'jurusan',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Contoh: Rekayasa Perangkat Lunak"
                                    />

                                </div>


                                {/* TAHUN ANGKATAN */}

                                <div className="profile-form-group">

                                    <label htmlFor="profile-angkatan">
                                        Tahun Angkatan
                                    </label>

                                    <input
                                        id="profile-angkatan"
                                        type="text"
                                        inputMode="numeric"
                                        value={
                                            formData.angkatan
                                        }
                                        onChange={e =>
                                            handleChange(
                                                'angkatan',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Contoh: 2024"
                                    />

                                </div>


                                {/* EMAIL */}

                                <div className="profile-form-group">

                                    <label htmlFor="profile-email">
                                        Email
                                    </label>

                                    <input
                                        id="profile-email"
                                        type="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={e =>
                                            handleChange(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan alamat email"
                                    />

                                </div>


                                {/* NOMOR HP */}

                                <div className="profile-form-group">

                                    <label htmlFor="profile-nohp">
                                        Nomor HP
                                    </label>

                                    <input
                                        id="profile-nohp"
                                        type="tel"
                                        value={
                                            formData.noHp
                                        }
                                        onChange={e =>
                                            handleChange(
                                                'noHp',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Contoh: 081234567890"
                                    />

                                </div>


                                {/* ALAMAT */}

                                <div className="profile-form-group profile-form-full">

                                    <label htmlFor="profile-alamat">
                                        Alamat
                                    </label>

                                    <textarea
                                        id="profile-alamat"
                                        value={
                                            formData.alamat
                                        }
                                        onChange={e =>
                                            handleChange(
                                                'alamat',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan alamat lengkap"
                                        rows="4"
                                    />

                                </div>


                                {/* FORM ACTION */}

                                <div className="profile-form-actions">

                                    <button
                                        type="button"
                                        className="profile-btn-cancel"
                                        onClick={
                                            handleCancel
                                        }
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        className="profile-btn-save"
                                    >
                                        Simpan Perubahan
                                    </button>

                                </div>

                            </form>

                        )}


                        {/* =================================================
                            EDIT BUTTON
                        ================================================= */}

                        {!isEditing && (

                            <div className="profile-card-footer">

                                <button
                                    type="button"
                                    className="profile-btn-edit"
                                    onClick={
                                        handleEdit
                                    }
                                >
                                    Edit Profil
                                </button>

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        SIDE INFORMATION
                    ================================================= */}

                    <aside className="profile-side-card">

                        <div className="profile-side-icon">
                            ✓
                        </div>

                        <h3>
                            Informasi Profil
                        </h3>

                        <p>
                            Pastikan informasi pribadi
                            yang Anda masukkan sudah benar
                            dan masih aktif.
                        </p>

                        <div className="profile-side-note">

                            <span>
                               
                            </span>

                            <p>
                                Data profil digunakan untuk
                                kebutuhan administrasi dan
                                komunikasi alumni.
                            </p>

                        </div>

                    </aside>

                </div>

            </div>

        </UserLayout>
    )
}