import React, { useState } from 'react'
import UserLayout from './UserLayout'

export default function AlumniTracer() {

    // =========================================================
    // CONSTANT
    // =========================================================

    const totalSteps = 3

    const statusOptions = [
        {
            value: 'Kuliah',
            label: 'Kuliah',
            icon: '🎓',
            description:
                'Melanjutkan pendidikan ke perguruan tinggi.'
        },
        {
            value: 'Bekerja',
            label: 'Bekerja',
            icon: '💼',
            description:
                'Bekerja di perusahaan atau instansi.'
        },
        {
            value: 'Wirausaha',
            label: 'Wirausaha',
            icon: '🚀',
            description:
                'Menjalankan usaha sendiri.'
        }
    ]

    const waitingOptions = [
        'Kurang dari 3 bulan',
        '3–6 bulan',
        '6–12 bulan',
        'Lebih dari 12 bulan'
    ]

    const suitabilityOptions = [
        'Sangat Sesuai',
        'Sesuai',
        'Kurang Sesuai',
        'Tidak Sesuai'
    ]

    const satisfactionOptions = [
        {
            key: 'pembelajaran',
            label: 'Kualitas Pembelajaran',
            description:
                'Kepuasan terhadap proses pembelajaran.'
        },
        {
            key: 'guru',
            label: 'Kualitas Guru',
            description:
                'Kepuasan terhadap guru dan tenaga pengajar.'
        },
        {
            key: 'fasilitas',
            label: 'Fasilitas Sekolah',
            description:
                'Kepuasan terhadap fasilitas sekolah.'
        },
        {
            key: 'lingkungan',
            label: 'Lingkungan Sekolah',
            description:
                'Kepuasan terhadap lingkungan sekolah.'
        },
        {
            key: 'administrasi',
            label: 'Pelayanan Administrasi',
            description:
                'Kepuasan terhadap pelayanan administrasi.'
        }
    ]


    // =========================================================
    // HELPER
    // =========================================================

    const createEducation = () => ({
        id: Date.now() + Math.random(),
        universitas: '',
        programStudi: '',
        jenjang: ''
    })

    const createWork = () => ({
        id: Date.now() + Math.random(),
        perusahaan: '',
        posisi: '',
        bidang: '',
        waktuTunggu: '',
        kesesuaian: ''
    })


    // =========================================================
    // STATE
    // =========================================================

    const [currentStep, setCurrentStep] = useState(1)

    const [formData, setFormData] = useState({

        // =====================================================
        // STATUS AWAL
        // =====================================================

        statusAwal: '',

        pendidikanAwal: {
            universitas: '',
            programStudi: '',
            jenjang: ''
        },

        pekerjaanAwal: {
            perusahaan: '',
            posisi: '',
            bidang: '',
            waktuTunggu: '',
            kesesuaian: ''
        },

        wirausahaAwal: {
            namaUsaha: ''
        },


        // =====================================================
        // STATUS SEKARANG
        // =====================================================

        statusSekarang: [],

        pendidikan: [],

        pekerjaan: [],

        wirausaha: {
            namaUsaha: ''
        },


        // =====================================================
        // KEPUASAN
        // =====================================================

        kepuasan: {
            pembelajaran: 0,
            guru: 0,
            fasilitas: 0,
            lingkungan: 0,
            administrasi: 0
        }

    })


    // =========================================================
    // STATUS AWAL
    // =========================================================

    const handleStatusAwalChange = status => {

        setFormData(prev => ({
            ...prev,
            statusAwal: status
        }))
    }


    // =========================================================
    // INITIAL EDUCATION
    // =========================================================

    const handleInitialEducationChange = (
        field,
        value
    ) => {

        setFormData(prev => ({
            ...prev,

            pendidikanAwal: {
                ...prev.pendidikanAwal,
                [field]: value
            }
        }))
    }


    // =========================================================
    // INITIAL WORK
    // =========================================================

    const handleInitialWorkChange = (
        field,
        value
    ) => {

        setFormData(prev => ({
            ...prev,

            pekerjaanAwal: {
                ...prev.pekerjaanAwal,
                [field]: value
            }
        }))
    }


    // =========================================================
    // INITIAL BUSINESS
    // =========================================================

    const handleInitialBusinessChange = (
        field,
        value
    ) => {

        setFormData(prev => ({
            ...prev,

            wirausahaAwal: {
                ...prev.wirausahaAwal,
                [field]: value
            }
        }))
    }


    // =========================================================
    // STATUS SEKARANG
    // CHECKBOX - MULTIPLE
    // =========================================================

    const handleStatusSekarangChange = status => {

        setFormData(prev => {

            const current =
                prev.statusSekarang

            if (current.includes(status)) {

                return {
                    ...prev,

                    statusSekarang:
                        current.filter(
                            item => item !== status
                        )
                }
            }

            return {
                ...prev,

                statusSekarang: [
                    ...current,
                    status
                ]
            }
        })
    }


    // =========================================================
    // CURRENT EDUCATION
    // MULTIPLE
    // =========================================================

    const handleAddEducation = () => {

        setFormData(prev => ({
            ...prev,

            pendidikan: [
                ...prev.pendidikan,
                createEducation()
            ]
        }))
    }


    const handleRemoveEducation = id => {

        setFormData(prev => ({
            ...prev,

            pendidikan:
                prev.pendidikan.filter(
                    item => item.id !== id
                )
        }))
    }


    const handleEducationChange = (
        id,
        field,
        value
    ) => {

        setFormData(prev => ({
            ...prev,

            pendidikan:
                prev.pendidikan.map(item =>
                    item.id === id
                        ? {
                            ...item,
                            [field]: value
                        }
                        : item
                )
        }))
    }


    // =========================================================
    // CURRENT WORK
    // MULTIPLE
    // =========================================================

    const handleAddWork = () => {

        setFormData(prev => ({
            ...prev,

            pekerjaan: [
                ...prev.pekerjaan,
                createWork()
            ]
        }))
    }


    const handleRemoveWork = id => {

        setFormData(prev => ({
            ...prev,

            pekerjaan:
                prev.pekerjaan.filter(
                    item => item.id !== id
                )
        }))
    }


    const handleWorkChange = (
        id,
        field,
        value
    ) => {

        setFormData(prev => ({
            ...prev,

            pekerjaan:
                prev.pekerjaan.map(item =>
                    item.id === id
                        ? {
                            ...item,
                            [field]: value
                        }
                        : item
                )
        }))
    }


    // =========================================================
    // CURRENT BUSINESS
    // =========================================================

    const handleBusinessChange = (
        field,
        value
    ) => {

        setFormData(prev => ({
            ...prev,

            wirausaha: {
                ...prev.wirausaha,
                [field]: value
            }
        }))
    }


    // =========================================================
    // SATISFACTION
    // =========================================================

    const handleSatisfactionChange = (
        key,
        value
    ) => {

        setFormData(prev => ({
            ...prev,

            kepuasan: {
                ...prev.kepuasan,
                [key]: value
            }
        }))
    }


    // =========================================================
    // NEXT
    // =========================================================

    const nextStep = () => {

        if (currentStep < totalSteps) {

            setCurrentStep(
                prev => prev + 1
            )

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }


    // =========================================================
    // PREVIOUS
    // =========================================================

    const previousStep = () => {

        if (currentStep > 1) {

            setCurrentStep(
                prev => prev - 1
            )

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }


    // =========================================================
    // SIMPAN DRAFT
    // =========================================================

    const handleDraft = () => {

        localStorage.setItem(
            'alumniTracerDraft',
            JSON.stringify(formData)
        )

        alert(
            'Data tracer berhasil disimpan sebagai draft.'
        )
    }


    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit = e => {

        e.preventDefault()

        const incompleteRating =
            satisfactionOptions.some(
                option =>
                    !formData.kepuasan[
                        option.key
                    ]
            )

        if (!formData.statusAwal) {

            alert(
                'Silakan pilih status sesaat setelah lulus.'
            )

            setCurrentStep(1)

            return
        }

        if (
            formData.statusSekarang.length === 0
        ) {

            alert(
                'Silakan pilih minimal satu status saat ini.'
            )

            setCurrentStep(2)

            return
        }

        if (incompleteRating) {

            alert(
                'Silakan lengkapi seluruh penilaian kepuasan alumni.'
            )

            setCurrentStep(3)

            return
        }


        localStorage.setItem(
            'alumniTracerData',
            JSON.stringify(formData)
        )

        localStorage.removeItem(
            'alumniTracerDraft'
        )

        alert(
            'Tracer Study berhasil dikirim. Terima kasih sudah mengisi data alumni!'
        )

        window.location.href =
            '/alumni'
    }


    // =========================================================
    // STEP TITLES
    // =========================================================

    const stepTitles = {
        1: 'Setelah Lulus',
        2: 'Status Sekarang',
        3: 'Kepuasan Alumni'
    }


    // =========================================================
    // PROGRESS CALCULATION
    // =========================================================

    const progressWidth =
        ((currentStep - 1) / (totalSteps - 1)) * 100


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <UserLayout>

            <div className="alumni-tracer-page">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="tracer-header">

                    <div>

                        <span className="tracer-label">
                            TRACER ALUMNI
                        </span>

                        <h1>
                            Tracer Study
                        </h1>

                        <p>
                            Isi informasi perjalanan Anda
                            setelah lulus dari sekolah.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    PROGRESS
                ================================================= */}

                <div className="tracer-step-progress">

                    <div className="tracer-step-line">

                        <div
                            className="tracer-step-line-active"
                            style={{
                                width: `${progressWidth}%`
                            }}
                        />

                    </div>


                    {[1, 2, 3].map(step => (

                        <div
                            key={step}
                            className={
                                `tracer-step-item ${
                                    currentStep >= step
                                        ? 'is-active'
                                        : ''
                                }`
                            }
                        >

                            <div className="tracer-step-number">
                                {step}
                            </div>

                            <span className="tracer-step-label">
                                {stepTitles[step]}
                            </span>

                        </div>

                    ))}

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    className="tracer-form"
                    onSubmit={handleSubmit}
                >


                    {/* =================================================
                        STEP 1
                    ================================================= */}

                    {currentStep === 1 && (

                        <section className="tracer-section">

                            <div className="section-title">

                                <span>
                                    01
                                </span>

                                <div>

                                    <h2>
                                        Status Sesaat Setelah Lulus
                                    </h2>

                                    <p>
                                        Pilih satu aktivitas Anda
                                        ketika pertama kali setelah lulus.
                                    </p>

                                </div>

                            </div>


                            <div className="choice-grid">

                                {statusOptions.map(option => (

                                    <label
                                        key={option.value}
                                        className={
                                            `choice-card ${
                                                formData.statusAwal ===
                                                option.value
                                                    ? 'selected'
                                                    : ''
                                            }`
                                        }
                                    >

                                        <input
                                            type="radio"
                                            name="statusAwal"
                                            value={option.value}
                                            checked={
                                                formData.statusAwal ===
                                                option.value
                                            }
                                            onChange={() =>
                                                handleStatusAwalChange(
                                                    option.value
                                                )
                                            }
                                        />

                                        <div>

                                            <strong>
                                                {option.icon}{' '}
                                                {option.label}
                                            </strong>

                                            <small>
                                                {
                                                    option.description
                                                }
                                            </small>

                                        </div>

                                    </label>

                                ))}

                            </div>


                            {/* KULIAH AWAL */}

                            {formData.statusAwal === 'Kuliah' && (

                                <div className="conditional-box">

                                    <h3>
                                        🎓 Pendidikan Setelah Lulus
                                    </h3>

                                    <p className="conditional-description">
                                        Masukkan satu pendidikan
                                        yang ditempuh setelah lulus.
                                    </p>

                                    <div className="form-grid">

                                        <div className="form-group">

                                            <label>
                                                Universitas /
                                                Perguruan Tinggi
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    formData
                                                        .pendidikanAwal
                                                        .universitas
                                                }
                                                onChange={e =>
                                                    handleInitialEducationChange(
                                                        'universitas',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: Universitas Telkom"
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Program Studi
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    formData
                                                        .pendidikanAwal
                                                        .programStudi
                                                }
                                                onChange={e =>
                                                    handleInitialEducationChange(
                                                        'programStudi',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: Informatika"
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Jenjang
                                            </label>

                                            <select
                                                value={
                                                    formData
                                                        .pendidikanAwal
                                                        .jenjang
                                                }
                                                onChange={e =>
                                                    handleInitialEducationChange(
                                                        'jenjang',
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="">
                                                    Pilih jenjang
                                                </option>

                                                {[
                                                    'D1',
                                                    'D2',
                                                    'D3',
                                                    'D4',
                                                    'S1',
                                                    'S2',
                                                    'S3'
                                                ].map(jenjang => (

                                                    <option
                                                        key={jenjang}
                                                        value={jenjang}
                                                    >
                                                        {jenjang}
                                                    </option>

                                                ))}

                                            </select>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* BEKERJA AWAL */}

                            {formData.statusAwal === 'Bekerja' && (

                                <div className="conditional-box">

                                    <h3>
                                        💼 Informasi Pekerjaan
                                    </h3>

                                    <p className="conditional-description">
                                        Informasi pekerjaan pertama
                                        setelah lulus.
                                    </p>

                                    <div className="form-grid">

                                        <div className="form-group">

                                            <label>
                                                Nama Perusahaan
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    formData
                                                        .pekerjaanAwal
                                                        .perusahaan
                                                }
                                                onChange={e =>
                                                    handleInitialWorkChange(
                                                        'perusahaan',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: PT Telkom Indonesia"
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Posisi / Jabatan
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    formData
                                                        .pekerjaanAwal
                                                        .posisi
                                                }
                                                onChange={e =>
                                                    handleInitialWorkChange(
                                                        'posisi',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: Software Developer"
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Bidang Pekerjaan
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    formData
                                                        .pekerjaanAwal
                                                        .bidang
                                                }
                                                onChange={e =>
                                                    handleInitialWorkChange(
                                                        'bidang',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: Teknologi Informasi"
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Waktu Tunggu Kerja
                                            </label>

                                            <select
                                                value={
                                                    formData
                                                        .pekerjaanAwal
                                                        .waktuTunggu
                                                }
                                                onChange={e =>
                                                    handleInitialWorkChange(
                                                        'waktuTunggu',
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="">
                                                    Pilih waktu tunggu
                                                </option>

                                                {waitingOptions.map(option => (

                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>

                                                ))}

                                            </select>

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Kesesuaian Pekerjaan
                                            </label>

                                            <select
                                                value={
                                                    formData
                                                        .pekerjaanAwal
                                                        .kesesuaian
                                                }
                                                onChange={e =>
                                                    handleInitialWorkChange(
                                                        'kesesuaian',
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="">
                                                    Pilih kesesuaian
                                                </option>

                                                {suitabilityOptions.map(option => (

                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>

                                                ))}

                                            </select>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* WIRAUSAHA AWAL */}

                            {formData.statusAwal === 'Wirausaha' && (

                                <div className="conditional-box">

                                    <h3>
                                        🚀 Informasi Wirausaha
                                    </h3>

                                    <p className="conditional-description">
                                        Masukkan nama wirausaha
                                        yang dijalankan setelah lulus.
                                    </p>

                                    <div className="form-grid">

                                        <div className="form-group">

                                            <label>
                                                Nama Wirausaha
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    formData
                                                        .wirausahaAwal
                                                        .namaUsaha
                                                }
                                                onChange={e =>
                                                    handleInitialBusinessChange(
                                                        'namaUsaha',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: Aulia Creative Studio"
                                            />

                                        </div>

                                    </div>

                                </div>

                            )}

                        </section>

                    )}


                    {/* =================================================
                        STEP 2
                    ================================================= */}

                    {currentStep === 2 && (

                        <section className="tracer-section">

                            <div className="section-title">

                                <span>
                                    02
                                </span>

                                <div>

                                    <h2>
                                        Status Sekarang
                                    </h2>

                                    <p>
                                        Pilih semua aktivitas yang
                                        sedang dijalankan saat ini.
                                    </p>

                                </div>

                            </div>


                            <div className="checkbox-grid">

                                {statusOptions.map(option => (

                                    <label
                                        key={option.value}
                                        className={
                                            `checkbox-card ${
                                                formData
                                                    .statusSekarang
                                                    .includes(
                                                        option.value
                                                    )
                                                    ? 'checked'
                                                    : ''
                                            }`
                                        }
                                    >

                                        <input
                                            type="checkbox"
                                            checked={
                                                formData
                                                    .statusSekarang
                                                    .includes(
                                                        option.value
                                                    )
                                            }
                                            onChange={() =>
                                                handleStatusSekarangChange(
                                                    option.value
                                                )
                                            }
                                        />

                                        <span>
                                            {option.icon}{' '}
                                            {option.label}
                                        </span>

                                    </label>

                                ))}

                            </div>


                            {formData.statusSekarang.length === 0 && (

                                <p className="status-helper">
                                    Pilih minimal satu status saat ini.
                                </p>

                            )}


                            {/* PENDIDIKAN */}

                            {formData.statusSekarang.includes('Kuliah') && (

                                <div className="conditional-box">

                                    <div className="conditional-header">

                                        <div>

                                            <h3>
                                                🎓 Pendidikan
                                            </h3>

                                            <p>
                                                Tambahkan pendidikan yang
                                                sedang atau pernah ditempuh.
                                            </p>

                                        </div>

                                        <button
                                            type="button"
                                            className="btn-add"
                                            onClick={handleAddEducation}
                                        >
                                            + Tambah Pendidikan
                                        </button>

                                    </div>


                                    {formData.pendidikan.length === 0 && (

                                        <div className="empty-state">

                                            <span>
                                                🎓
                                            </span>

                                            <p>
                                                Belum ada data pendidikan.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={handleAddEducation}
                                            >
                                                + Tambah Pendidikan
                                            </button>

                                        </div>

                                    )}


                                    {formData.pendidikan.map(
                                        (education, index) => (

                                            <div
                                                className="dynamic-card"
                                                key={education.id}
                                            >

                                                <div className="dynamic-card-header">

                                                    <h4>
                                                        Pendidikan {index + 1}
                                                    </h4>

                                                    <button
                                                        type="button"
                                                        className="btn-delete"
                                                        onClick={() =>
                                                            handleRemoveEducation(
                                                                education.id
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </button>

                                                </div>

                                                <div className="form-grid">

                                                    <div className="form-group">

                                                        <label>
                                                            Universitas /
                                                            Perguruan Tinggi
                                                        </label>

                                                        <input
                                                            type="text"
                                                            value={
                                                                education
                                                                    .universitas
                                                            }
                                                            onChange={e =>
                                                                handleEducationChange(
                                                                    education.id,
                                                                    'universitas',
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="Contoh: Universitas Telkom"
                                                        />

                                                    </div>

                                                    <div className="form-group">

                                                        <label>
                                                            Program Studi
                                                        </label>

                                                        <input
                                                            type="text"
                                                            value={
                                                                education
                                                                    .programStudi
                                                            }
                                                            onChange={e =>
                                                                handleEducationChange(
                                                                    education.id,
                                                                    'programStudi',
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="Contoh: Informatika"
                                                        />

                                                    </div>

                                                    <div className="form-group">

                                                        <label>
                                                            Jenjang
                                                        </label>

                                                        <select
                                                            value={
                                                                education
                                                                    .jenjang
                                                            }
                                                            onChange={e =>
                                                                handleEducationChange(
                                                                    education.id,
                                                                    'jenjang',
                                                                    e.target.value
                                                                )
                                                            }
                                                        >

                                                            <option value="">
                                                                Pilih jenjang
                                                            </option>

                                                            {[
                                                                'D1',
                                                                'D2',
                                                                'D3',
                                                                'D4',
                                                                'S1',
                                                                'S2',
                                                                'S3'
                                                            ].map(jenjang => (

                                                                <option
                                                                    key={jenjang}
                                                                    value={jenjang}
                                                                >
                                                                    {jenjang}
                                                                </option>

                                                            ))}

                                                        </select>

                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}


                            {/* PEKERJAAN */}

                            {formData.statusSekarang.includes('Bekerja') && (

                                <div className="conditional-box">

                                    <div className="conditional-header">

                                        <div>

                                            <h3>
                                                💼 Informasi Pekerjaan
                                            </h3>

                                            <p>
                                                Tambahkan seluruh pekerjaan
                                                yang sedang dijalankan.
                                            </p>

                                        </div>

                                        <button
                                            type="button"
                                            className="btn-add"
                                            onClick={handleAddWork}
                                        >
                                            + Tambah Pekerjaan
                                        </button>

                                    </div>


                                    {formData.pekerjaan.length === 0 && (

                                        <div className="empty-state">

                                            <span>
                                                💼
                                            </span>

                                            <p>
                                                Belum ada data pekerjaan.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={handleAddWork}
                                            >
                                                + Tambah Pekerjaan
                                            </button>

                                        </div>

                                    )}


                                    {formData.pekerjaan.map(
                                        (work, index) => (

                                            <div
                                                className="dynamic-card"
                                                key={work.id}
                                            >

                                                <div className="dynamic-card-header">

                                                    <h4>
                                                        Pekerjaan {index + 1}
                                                    </h4>

                                                    <button
                                                        type="button"
                                                        className="btn-delete"
                                                        onClick={() =>
                                                            handleRemoveWork(
                                                                work.id
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </button>

                                                </div>

                                                <div className="form-grid">

                                                    <div className="form-group">

                                                        <label>
                                                            Nama Perusahaan
                                                        </label>

                                                        <input
                                                            type="text"
                                                            value={
                                                                work
                                                                    .perusahaan
                                                            }
                                                            onChange={e =>
                                                                handleWorkChange(
                                                                    work.id,
                                                                    'perusahaan',
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="Contoh: PT Telkom Indonesia"
                                                        />

                                                    </div>

                                                    <div className="form-group">

                                                        <label>
                                                            Posisi / Jabatan
                                                        </label>

                                                        <input
                                                            type="text"
                                                            value={
                                                                work
                                                                    .posisi
                                                            }
                                                            onChange={e =>
                                                                handleWorkChange(
                                                                    work.id,
                                                                    'posisi',
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="Contoh: Software Developer"
                                                        />

                                                    </div>

                                                    <div className="form-group">

                                                        <label>
                                                            Bidang Pekerjaan
                                                        </label>

                                                        <input
                                                            type="text"
                                                            value={
                                                                work
                                                                    .bidang
                                                            }
                                                            onChange={e =>
                                                                handleWorkChange(
                                                                    work.id,
                                                                    'bidang',
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="Contoh: Teknologi Informasi"
                                                        />

                                                    </div>

                                                    <div className="form-group">

                                                        <label>
                                                            Waktu Tunggu Kerja
                                                        </label>

                                                        <select
                                                            value={
                                                                work
                                                                    .waktuTunggu
                                                            }
                                                            onChange={e =>
                                                                handleWorkChange(
                                                                    work.id,
                                                                    'waktuTunggu',
                                                                    e.target.value
                                                                )
                                                            }
                                                        >

                                                            <option value="">
                                                                Pilih waktu tunggu
                                                            </option>

                                                            {waitingOptions.map(option => (

                                                                <option
                                                                    key={option}
                                                                    value={option}
                                                                >
                                                                    {option}
                                                                </option>

                                                            ))}

                                                        </select>

                                                    </div>

                                                    <div className="form-group">

                                                        <label>
                                                            Kesesuaian Pekerjaan
                                                        </label>

                                                        <select
                                                            value={
                                                                work
                                                                    .kesesuaian
                                                            }
                                                            onChange={e =>
                                                                handleWorkChange(
                                                                    work.id,
                                                                    'kesesuaian',
                                                                    e.target.value
                                                                )
                                                            }
                                                        >

                                                            <option value="">
                                                                Pilih kesesuaian
                                                            </option>

                                                            {suitabilityOptions.map(option => (

                                                                <option
                                                                    key={option}
                                                                    value={option}
                                                                >
                                                                    {option}
                                                                </option>

                                                            ))}

                                                        </select>

                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}


                            {/* WIRAUSAHA */}

                            {formData.statusSekarang.includes('Wirausaha') && (

                                <div className="conditional-box">

                                    <h3>
                                        🚀 Informasi Wirausaha
                                    </h3>

                                    <p className="conditional-description">
                                        Masukkan nama wirausaha
                                        yang sedang dijalankan.
                                    </p>

                                    <div className="form-grid">

                                        <div className="form-group">

                                            <label>
                                                Nama Wirausaha
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    formData
                                                        .wirausaha
                                                        .namaUsaha
                                                }
                                                onChange={e =>
                                                    handleBusinessChange(
                                                        'namaUsaha',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: Aulia Creative Studio"
                                            />

                                        </div>

                                    </div>

                                </div>

                            )}

                        </section>

                    )}


                    {/* =================================================
                        STEP 3
                    ================================================= */}

                    {currentStep === 3 && (

                        <section className="tracer-section">

                            <div className="section-title">

                                <span>
                                    03
                                </span>

                                <div>

                                    <h2>
                                        Kepuasan Alumni
                                    </h2>

                                    <p>
                                        Berikan penilaian terhadap
                                        pengalaman Anda selama bersekolah.
                                    </p>

                                </div>

                            </div>


                            <div className="rating-list">

                                {satisfactionOptions.map(option => (

                                    <div
                                        className="rating-row"
                                        key={option.key}
                                    >

                                        <div>

                                            <strong>
                                                {option.label}
                                            </strong>

                                            <span>
                                                {
                                                    option.description
                                                }
                                            </span>

                                        </div>

                                        <div className="rating-options">

                                            {[1, 2, 3, 4, 5].map(star => (

                                                <label
                                                    key={star}
                                                    className={
                                                        Number(
                                                            formData
                                                                .kepuasan[
                                                                    option.key
                                                                ]
                                                        ) >= star
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >

                                                    <input
                                                        type="radio"
                                                        name={
                                                            `rating-${option.key}`
                                                        }
                                                        value={star}
                                                        checked={
                                                            Number(
                                                                formData
                                                                    .kepuasan[
                                                                        option.key
                                                                    ]
                                                            ) === star
                                                        }
                                                        onChange={() =>
                                                            handleSatisfactionChange(
                                                                option.key,
                                                                star
                                                            )
                                                        }
                                                    />

                                                    ★

                                                </label>

                                            ))}

                                        </div>

                                    </div>

                                ))}

                            </div>


                            <p className="rating-helper">
                                Pilih 1–5 bintang sesuai tingkat
                                kepuasan Anda.
                            </p>

                        </section>

                    )}


                    {/* =================================================
                        ACTION
                    ================================================= */}

                    <div className="tracer-actions">

                        <button
                            type="button"
                            className="btn-draft"
                            onClick={handleDraft}
                        >
                            Simpan Draft
                        </button>


                        <div className="action-right">

                            {currentStep > 1 && (

                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={previousStep}
                                >
                                    Kembali
                                </button>

                            )}


                            {currentStep < totalSteps ? (

                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={nextStep}
                                >
                                    Lanjutkan
                                </button>

                            ) : (

                                <button
                                    type="submit"
                                    className="btn-primary"
                                >
                                    Kirim Tracer Study
                                </button>

                            )}

                        </div>

                    </div>

                </form>

            </div>

        </UserLayout>
    )
}