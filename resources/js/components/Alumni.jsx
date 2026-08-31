import React, { useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'

export default function Alumni() {

    // =========================================================
    // CONSTANT
    // =========================================================

    const itemsPerPage = 8

    const statusOptions = [
        {
            value: 'Kuliah',
            label: 'Kuliah',
            icon: '🎓',
            description: 'Melanjutkan pendidikan ke perguruan tinggi.'
        },
        {
            value: 'Bekerja',
            label: 'Bekerja',
            icon: '💼',
            description: 'Bekerja di perusahaan atau instansi.'
        },
        {
            value: 'Wirausaha',
            label: 'Wirausaha',
            icon: '🚀',
            description: 'Menjalankan usaha sendiri.'
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
            description: 'Kepuasan terhadap proses pembelajaran.'
        },
        {
            key: 'guru',
            label: 'Kualitas Guru',
            description: 'Kepuasan terhadap guru dan tenaga pengajar.'
        },
        {
            key: 'fasilitas',
            label: 'Fasilitas Sekolah',
            description: 'Kepuasan terhadap fasilitas sekolah.'
        },
        {
            key: 'lingkungan',
            label: 'Lingkungan Sekolah',
            description: 'Kepuasan terhadap lingkungan sekolah.'
        },
        {
            key: 'administrasi',
            label: 'Pelayanan Administrasi',
            description: 'Kepuasan terhadap pelayanan administrasi.'
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

    const createEmptyForm = () => ({
        nama: '',
        nisn: '',
        angkatan: '',
        jurusan: '',
        email: '',
        telepon: '',
        alamat: '',

        tracerStatus: 'Sudah Mengisi',

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

        statusSekarang: [],

        pendidikan: [],

        pekerjaan: [],

        wirausaha: {
            namaUsaha: ''
        },

        kepuasan: {
            pembelajaran: 0,
            guru: 0,
            fasilitas: 0,
            lingkungan: 0,
            administrasi: 0
        }
    })

    // =========================================================
    // DUMMY DATA
    // =========================================================

    const initialAlumni = [
        {
            id: 1,
            nama: 'Aulia Rahma',
            nisn: '0067823412',
            angkatan: 2022,
            jurusan: 'Rekayasa Perangkat Lunak',
            email: 'aulia@gmail.com',
            telepon: '081234567890',
            alamat: 'Bandung, Jawa Barat',

            tracerStatus: 'Sudah Mengisi',

            statusAwal: 'Kuliah',

            pendidikanAwal: {
                universitas: 'Universitas Telkom',
                programStudi: 'Informatika',
                jenjang: 'S1'
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

            statusSekarang: ['Kuliah', 'Bekerja'],

            pendidikan: [
                {
                    id: 101,
                    universitas: 'Universitas Telkom',
                    programStudi: 'Informatika',
                    jenjang: 'S1'
                }
            ],

            pekerjaan: [
                {
                    id: 102,
                    perusahaan: 'PT Digital Nusantara',
                    posisi: 'Software Developer',
                    bidang: 'Teknologi Informasi',
                    waktuTunggu: 'Kurang dari 3 bulan',
                    kesesuaian: 'Sangat Sesuai'
                },
                {
                    id: 103,
                    perusahaan: 'Freelance',
                    posisi: 'Web Developer',
                    bidang: 'Teknologi Informasi',
                    waktuTunggu: 'Kurang dari 3 bulan',
                    kesesuaian: 'Sangat Sesuai'
                }
            ],

            wirausaha: {
                namaUsaha: ''
            },

            kepuasan: {
                pembelajaran: 5,
                guru: 5,
                fasilitas: 4,
                lingkungan: 5,
                administrasi: 4
            }
        },

        {
            id: 2,
            nama: 'Rizky Maulana',
            nisn: '0067823413',
            angkatan: 2021,
            jurusan: 'Teknik Komputer Jaringan',
            email: 'rizky@gmail.com',
            telepon: '081298765432',
            alamat: 'Jakarta',

            tracerStatus: 'Sudah Mengisi',

            statusAwal: 'Bekerja',

            pendidikanAwal: {
                universitas: '',
                programStudi: '',
                jenjang: ''
            },

            pekerjaanAwal: {
                perusahaan: 'PT Telkom Indonesia',
                posisi: 'Network Engineer',
                bidang: 'Teknologi Informasi',
                waktuTunggu: 'Kurang dari 3 bulan',
                kesesuaian: 'Sangat Sesuai'
            },

            wirausahaAwal: {
                namaUsaha: ''
            },

            statusSekarang: ['Bekerja'],

            pendidikan: [],

            pekerjaan: [
                {
                    id: 201,
                    perusahaan: 'PT Telkom Indonesia',
                    posisi: 'Network Engineer',
                    bidang: 'Teknologi Informasi',
                    waktuTunggu: 'Kurang dari 3 bulan',
                    kesesuaian: 'Sangat Sesuai'
                }
            ],

            wirausaha: {
                namaUsaha: ''
            },

            kepuasan: {
                pembelajaran: 4,
                guru: 5,
                fasilitas: 4,
                lingkungan: 4,
                administrasi: 4
            }
        },

        {
            id: 3,
            nama: 'Siti Nurhaliza',
            nisn: '0067823414',
            angkatan: 2023,
            jurusan: 'Multimedia',
            email: 'siti@gmail.com',
            telepon: '082112345678',
            alamat: 'Bekasi',

            tracerStatus: 'Sudah Mengisi',

            statusAwal: 'Wirausaha',

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
                namaUsaha: 'Siti Creative Studio'
            },

            statusSekarang: ['Wirausaha'],

            pendidikan: [],

            pekerjaan: [],

            wirausaha: {
                namaUsaha: 'Siti Creative Studio'
            },

            kepuasan: {
                pembelajaran: 5,
                guru: 4,
                fasilitas: 5,
                lingkungan: 5,
                administrasi: 5
            }
        },

        {
            id: 4,
            nama: 'Fajar Ramadhan',
            nisn: '0067823415',
            angkatan: 2020,
            jurusan: 'Rekayasa Perangkat Lunak',
            email: 'fajar@gmail.com',
            telepon: '083123456789',
            alamat: 'Depok',

            tracerStatus: 'Belum Mengisi',

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

            statusSekarang: [],

            pendidikan: [],

            pekerjaan: [],

            wirausaha: {
                namaUsaha: ''
            },

            kepuasan: {
                pembelajaran: 0,
                guru: 0,
                fasilitas: 0,
                lingkungan: 0,
                administrasi: 0
            }
        }
    ]

    // =========================================================
    // STATE
    // =========================================================

    const [alumni, setAlumni] = useState(initialAlumni)

    const [search, setSearch] = useState('')
    const [yearFilter, setYearFilter] = useState('Semua Tahun')
    const [statusFilter, setStatusFilter] = useState('Semua Status')

    const [currentPage, setCurrentPage] = useState(1)

    const [showModal, setShowModal] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [modalMode, setModalMode] = useState('add')

    const [selectedAlumni, setSelectedAlumni] = useState(null)
    const [deleteTarget, setDeleteTarget] = useState(null)

    const [formData, setFormData] = useState(
        createEmptyForm()
    )

    // =========================================================
    // FILTER
    // =========================================================

    const filteredAlumni = useMemo(() => {

        return alumni.filter(item => {

            const keyword = search.toLowerCase()

            const matchesSearch =
                item.nama.toLowerCase().includes(keyword) ||
                item.nisn.toLowerCase().includes(keyword) ||
                item.jurusan.toLowerCase().includes(keyword)

            const matchesYear =
                yearFilter === 'Semua Tahun' ||
                String(item.angkatan) === String(yearFilter)

            const matchesStatus =
                statusFilter === 'Semua Status' ||
                item.tracerStatus === statusFilter

            return (
                matchesSearch &&
                matchesYear &&
                matchesStatus
            )
        })

    }, [
        alumni,
        search,
        yearFilter,
        statusFilter
    ])

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredAlumni.length / itemsPerPage
        )
    )

    const paginatedAlumni = filteredAlumni.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    // =========================================================
    // INPUT HANDLER
    // =========================================================

    const handleInputChange = e => {

        const {
            name,
            value
        } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }

    // =========================================================
    // INITIAL STATUS
    // =========================================================

    const handleStatusAwalChange = value => {

        setFormData(prev => ({
            ...prev,
            statusAwal: value
        }))

    }

    // =========================================================
    // CURRENT STATUS
    // =========================================================

    const handleStatusSekarangChange = value => {

        setFormData(prev => {

            const exists =
                prev.statusSekarang.includes(value)

            if (exists) {

                return {
                    ...prev,
                    statusSekarang:
                        prev.statusSekarang.filter(
                            item => item !== value
                        )
                }

            }

            return {
                ...prev,
                statusSekarang: [
                    ...prev.statusSekarang,
                    value
                ]
            }

        })

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
    // CURRENT EDUCATION
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

    const renderStars = (
        value,
        editable = false,
        key = null
    ) => {

        return (
            <div className="rating-stars">

                {[1, 2, 3, 4, 5].map(star => (

                    <button
                        key={star}
                        type={
                            editable
                                ? 'button'
                                : 'button'
                        }
                        className={
                            star <= value
                                ? 'star active'
                                : 'star'
                        }
                        onClick={() => {

                            if (
                                editable &&
                                key
                            ) {
                                handleSatisfactionChange(
                                    key,
                                    star
                                )
                            }

                        }}
                        disabled={!editable}
                    >
                        ★
                    </button>

                ))}

            </div>
        )

    }

    // =========================================================
    // STATUS BADGES
    // =========================================================

    const renderStatusBadges = status => {

        if (!status) {
            return (
                <span className="status-badge empty">
                    Belum ada status
                </span>
            )
        }

        const statuses = Array.isArray(status)
            ? status
            : [status]

        return (
            <div className="status-badge-list">

                {statuses.map(item => {

                    const option =
                        statusOptions.find(
                            option =>
                                option.value === item
                        )

                    return (
                        <span
                            className="status-badge"
                            key={item}
                        >
                            {option?.icon} {item}
                        </span>
                    )

                })}

            </div>
        )

    }

    // =========================================================
    // SATISFACTION DETAIL
    // =========================================================

    const renderDetailSatisfaction = data => {

        return (
            <div className="detail-satisfaction-list">

                {satisfactionOptions.map(option => (

                    <div
                        className="detail-satisfaction-item"
                        key={option.key}
                    >

                        <div>
                            <strong>
                                {option.label}
                            </strong>

                            <span>
                                {option.description}
                            </span>
                        </div>

                        {renderStars(
                            data.kepuasan?.[
                                option.key
                            ] || 0
                        )}

                    </div>

                ))}

            </div>
        )

    }

    // =========================================================
    // ADD
    // =========================================================

    const handleAdd = () => {

        setModalMode('add')

        setFormData(
            createEmptyForm()
        )

        setShowModal(true)

    }

    // =========================================================
    // EDIT
    // =========================================================

    const handleEdit = item => {

        setModalMode('edit')

        setFormData({
            ...createEmptyForm(),
            ...item,

            pendidikanAwal: {
                ...createEmptyForm()
                    .pendidikanAwal,
                ...(item.pendidikanAwal || {})
            },

            pekerjaanAwal: {
                ...createEmptyForm()
                    .pekerjaanAwal,
                ...(item.pekerjaanAwal || {})
            },

            wirausahaAwal: {
                ...createEmptyForm()
                    .wirausahaAwal,
                ...(item.wirausahaAwal || {})
            },

            pendidikan:
                item.pendidikan || [],

            pekerjaan:
                item.pekerjaan || [],

            wirausaha: {
                ...createEmptyForm()
                    .wirausaha,
                ...(item.wirausaha || {})
            },

            statusSekarang:
                item.statusSekarang || [],

            kepuasan: {
                ...createEmptyForm()
                    .kepuasan,
                ...(item.kepuasan || {})
            }
        })

        setShowModal(true)

    }

    // =========================================================
    // DETAIL
    // =========================================================

    const handleShowDetail = item => {

        setSelectedAlumni(item)
        setShowDetailModal(true)

    }

    const handleCloseDetail = () => {

        setShowDetailModal(false)
        setSelectedAlumni(null)

    }

    // =========================================================
    // MODAL CLOSE
    // =========================================================

    const handleCloseModal = () => {

        setShowModal(false)

        setFormData(
            createEmptyForm()
        )

    }

    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit = e => {

        e.preventDefault()

        const newData = {
            ...formData,

            id:
                modalMode === 'edit'
                    ? formData.id
                    : Date.now()
        }

        if (
            modalMode === 'add'
        ) {

            setAlumni(prev => [
                newData,
                ...prev
            ])

        } else {

            setAlumni(prev =>
                prev.map(item =>
                    item.id === formData.id
                        ? newData
                        : item
                )
            )

        }

        handleCloseModal()

    }

    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = item => {

        setDeleteTarget(item)
        setShowDeleteModal(true)

    }

    const handleDeleteConfirm = () => {

        if (!deleteTarget) {
            return
        }

        setAlumni(prev =>
            prev.filter(
                item =>
                    item.id !==
                    deleteTarget.id
            )
        )

        setDeleteTarget(null)
        setShowDeleteModal(false)

    }

    // =========================================================
    // PAGINATION
    // =========================================================

    const handlePageChange = page => {

        if (
            page < 1 ||
            page > totalPages
        ) {
            return
        }

        setCurrentPage(page)

    }

    // =========================================================
    // RENDER
    // =========================================================

    return (

        <AdminLayout>

            <div className="alumni-page">

                {/* =====================================================
                    PAGE HEADER
                ===================================================== */}

                <div className="page-header">

                    <div>

                        <h1>
                            Data Alumni
                        </h1>

                        <p>
                            Kelola data alumni dan informasi tracer alumni.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="btn-primary"
                        onClick={handleAdd}
                    >
                        + Tambah Alumni
                    </button>

                </div>

                {/* =====================================================
                    FILTER
                ===================================================== */}

                <div className="filter-card">

                    <div className="search-box">

                        <span>
                            🔍
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={e => {

                                setSearch(
                                    e.target.value
                                )

                                setCurrentPage(1)

                            }}
                            placeholder="Cari nama, NISN, atau jurusan..."
                        />

                    </div>

                    <select
                        value={yearFilter}
                        onChange={e => {

                            setYearFilter(
                                e.target.value
                            )

                            setCurrentPage(1)

                        }}
                    >

                        <option value="Semua Tahun">
                            Semua Tahun
                        </option>

                        {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map(
                            year => (

                                <option
                                    value={year}
                                    key={year}
                                >
                                    {year}
                                </option>

                            )
                        )}

                    </select>

                    <select
                        value={statusFilter}
                        onChange={e => {

                            setStatusFilter(
                                e.target.value
                            )

                            setCurrentPage(1)

                        }}
                    >

                        <option value="Semua Status">
                            Semua Status
                        </option>

                        <option value="Sudah Mengisi">
                            Sudah Mengisi
                        </option>

                        <option value="Belum Mengisi">
                            Belum Mengisi
                        </option>

                    </select>

                </div>

                {/* =====================================================
                    TABLE
                ===================================================== */}

                <div className="table-card">

                    <div className="table-wrapper">

                        <table className="alumni-table">

                            <thead>

                                <tr>

                                    <th>
                                        Alumni
                                    </th>

                                    <th>
                                        NISN
                                    </th>

                                    <th>
                                        Angkatan
                                    </th>

                                    <th>
                                        Jurusan
                                    </th>

                                    <th>
                                        Status Tracer
                                    </th>

                                    <th>
                                        Status Sekarang
                                    </th>

                                    <th>
                                        Aksi
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {paginatedAlumni.length > 0 ? (

                                    paginatedAlumni.map(item => (

                                        <tr key={item.id}>

                                            <td>

                                                <div className="alumni-name">

                                                    <div className="alumni-avatar">
                                                        {item.nama
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {item.nama}
                                                        </strong>

                                                        <span>
                                                            {item.email || '-'}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>
                                                {item.nisn}
                                            </td>

                                            <td>
                                                {item.angkatan}
                                            </td>

                                            <td>
                                                {item.jurusan}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        item.tracerStatus ===
                                                        'Sudah Mengisi'
                                                            ? 'tracer-status filled'
                                                            : 'tracer-status empty'
                                                    }
                                                >
                                                    {item.tracerStatus}
                                                </span>

                                            </td>

                                            <td>

                                                {renderStatusBadges(
                                                    item.statusSekarang
                                                )}

                                            </td>

                                            <td>

                                                <div className="table-actions">

                                                    <button
                                                        type="button"
                                                        className="action-btn detail"
                                                        onClick={() =>
                                                            handleShowDetail(
                                                                item
                                                            )
                                                        }
                                                        title="Detail"
                                                    >
                                                        👁
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="action-btn edit"
                                                        onClick={() =>
                                                            handleEdit(
                                                                item
                                                            )
                                                        }
                                                        title="Edit"
                                                    >
                                                        ✎
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="action-btn delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item
                                                            )
                                                        }
                                                        title="Hapus"
                                                    >
                                                        🗑
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="table-empty"
                                        >

                                            <div>
                                                📭
                                            </div>

                                            <strong>
                                                Data alumni tidak ditemukan
                                            </strong>

                                            <span>
                                                Coba ubah pencarian atau filter.
                                            </span>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* PAGINATION */}

                    {filteredAlumni.length > 0 && (

                        <div className="pagination">

                            <span>
                                Menampilkan{' '}
                                {
                                    Math.min(
                                        (currentPage - 1) *
                                            itemsPerPage +
                                            1,
                                        filteredAlumni.length
                                    )
                                }
                                –
                                {
                                    Math.min(
                                        currentPage *
                                            itemsPerPage,
                                        filteredAlumni.length
                                    )
                                }{' '}
                                dari{' '}
                                {filteredAlumni.length}{' '}
                                alumni
                            </span>

                            <div className="pagination-buttons">

                                <button
                                    type="button"
                                    disabled={
                                        currentPage === 1
                                    }
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage - 1
                                        )
                                    }
                                >
                                    ‹
                                </button>

                                {Array.from(
                                    {
                                        length: totalPages
                                    },
                                    (_, index) => index + 1
                                ).map(page => (

                                    <button
                                        type="button"
                                        key={page}
                                        className={
                                            currentPage === page
                                                ? 'active'
                                                : ''
                                        }
                                        onClick={() =>
                                            handlePageChange(
                                                page
                                            )
                                        }
                                    >
                                        {page}
                                    </button>

                                ))}

                                <button
                                    type="button"
                                    disabled={
                                        currentPage ===
                                        totalPages
                                    }
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage + 1
                                        )
                                    }
                                >
                                    ›
                                </button>

                            </div>

                        </div>

                    )}

                </div>

                {/* =====================================================
                    DETAIL MODAL
                ===================================================== */}

                {showDetailModal &&
                    selectedAlumni && (

                    <div
                        className="modal-overlay"
                        onClick={
                            handleCloseDetail
                        }
                    >

                        <div
                            className="alumni-modal detail-modal"
                            onClick={e =>
                                e.stopPropagation()
                            }
                        >

                            <div className="modal-header">

                                <div>

                                    <h2>
                                        Detail Alumni
                                    </h2>

                                    <p>
                                        Informasi lengkap data alumni dan tracer.
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="modal-close"
                                    onClick={
                                        handleCloseDetail
                                    }
                                >
                                    ×
                                </button>

                            </div>

                            <div className="modal-body">

                                {/* DATA ALUMNI */}

                                <div className="detail-section">

                                    <div className="detail-profile">

                                        <div className="detail-avatar">
                                            {selectedAlumni.nama
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>

                                            <h2>
                                                {selectedAlumni.nama}
                                            </h2>

                                            <p>
                                                {selectedAlumni.jurusan}
                                                {' • '}
                                                Angkatan{' '}
                                                {selectedAlumni.angkatan}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="detail-grid">

                                        <div className="detail-item">

                                            <span>
                                                NISN
                                            </span>

                                            <strong>
                                                {selectedAlumni.nisn || '-'}
                                            </strong>

                                        </div>

                                        <div className="detail-item">

                                            <span>
                                                Email
                                            </span>

                                            <strong>
                                                {selectedAlumni.email || '-'}
                                            </strong>

                                        </div>

                                        <div className="detail-item">

                                            <span>
                                                Nomor Telepon
                                            </span>

                                            <strong>
                                                {selectedAlumni.telepon || '-'}
                                            </strong>

                                        </div>

                                        <div className="detail-item">

                                            <span>
                                                Alamat
                                            </span>

                                            <strong>
                                                {selectedAlumni.alamat || '-'}
                                            </strong>

                                        </div>

                                    </div>

                                </div>

                                {/* BELUM MENGISI */}

                                {selectedAlumni.tracerStatus ===
                                    'Belum Mengisi' && (

                                    <div className="detail-tracer-empty">

                                        <div className="detail-tracer-empty-icon">
                                            📝
                                        </div>

                                        <div>

                                            <h3>
                                                Belum Mengisi Tracer
                                            </h3>

                                            <p>
                                                Alumni ini sudah
                                                terdaftar dalam
                                                database alumni,
                                                tetapi belum
                                                mengisi data
                                                tracer.
                                            </p>

                                        </div>

                                    </div>

                                )}

                                {/* STATUS AWAL */}

                                {selectedAlumni.tracerStatus ===
                                    'Sudah Mengisi' && (

                                    <div className="detail-section">

                                        <div className="detail-section-title">

                                            <h3>
                                                Status Sesaat Setelah Lulus
                                            </h3>

                                            <p>
                                                Kondisi alumni ketika pertama kali
                                                setelah lulus.
                                            </p>

                                        </div>

                                        <div className="detail-status-large">

                                            {renderStatusBadges(
                                                selectedAlumni.statusAwal
                                            )}

                                        </div>

                                        {/* KULIAH AWAL */}

                                        {selectedAlumni.statusAwal ===
                                            'Kuliah' && (

                                            <div className="detail-sub-card">

                                                <h4>
                                                    🎓 Pendidikan
                                                </h4>

                                                <div className="detail-grid">

                                                    <div className="detail-item">

                                                        <span>
                                                            Universitas /
                                                            Perguruan Tinggi
                                                        </span>

                                                        <strong>
                                                            {
                                                                selectedAlumni
                                                                    .pendidikanAwal
                                                                    ?.universitas ||
                                                                '-'
                                                            }
                                                        </strong>

                                                    </div>

                                                    <div className="detail-item">

                                                        <span>
                                                            Program Studi
                                                        </span>

                                                        <strong>
                                                            {
                                                                selectedAlumni
                                                                    .pendidikanAwal
                                                                    ?.programStudi ||
                                                                '-'
                                                            }
                                                        </strong>

                                                    </div>

                                                    <div className="detail-item">

                                                        <span>
                                                            Jenjang
                                                        </span>

                                                        <strong>
                                                            {
                                                                selectedAlumni
                                                                    .pendidikanAwal
                                                                    ?.jenjang ||
                                                                '-'
                                                            }
                                                        </strong>

                                                    </div>

                                                </div>

                                            </div>

                                        )}

                                        {/* BEKERJA AWAL */}

                                        {selectedAlumni.statusAwal ===
                                            'Bekerja' && (

                                            <div className="detail-sub-card">

                                                <h4>
                                                    💼 Informasi Pekerjaan
                                                </h4>

                                                <div className="detail-grid">

                                                    <div className="detail-item">

                                                        <span>
                                                            Nama Perusahaan
                                                        </span>

                                                        <strong>
                                                            {
                                                                selectedAlumni
                                                                    .pekerjaanAwal
                                                                    ?.perusahaan ||
                                                                '-'
                                                            }
                                                        </strong>

                                                    </div>

                                                    <div className="detail-item">

                                                        <span>
                                                            Posisi / Jabatan
                                                        </span>

                                                        <strong>
                                                            {
                                                                selectedAlumni
                                                                    .pekerjaanAwal
                                                                    ?.posisi ||
                                                                '-'
                                                            }
                                                        </strong>

                                                    </div>

                                                    <div className="detail-item">

                                                        <span>
                                                            Bidang Pekerjaan
                                                        </span>

                                                        <strong>
                                                            {
                                                                selectedAlumni
                                                                    .pekerjaanAwal
                                                                    ?.bidang ||
                                                                '-'
                                                            }
                                                        </strong>

                                                    </div>

                                                    <div className="detail-item">

                                                        <span>
                                                            Waktu Tunggu Kerja
                                                        </span>

                                                        <strong>
                                                            {
                                                                selectedAlumni
                                                                    .pekerjaanAwal
                                                                    ?.waktuTunggu ||
                                                                '-'
                                                            }
                                                        </strong>

                                                    </div>

                                                    <div className="detail-item">

                                                        <span>
                                                            Kesesuaian Pekerjaan
                                                        </span>

                                                        <strong>
                                                            {
                                                                selectedAlumni
                                                                    .pekerjaanAwal
                                                                    ?.kesesuaian ||
                                                                '-'
                                                            }
                                                        </strong>

                                                    </div>

                                                </div>

                                            </div>

                                        )}

                                        {/* WIRAUSAHA AWAL */}

                                        {selectedAlumni.statusAwal ===
                                            'Wirausaha' && (

                                            <div className="detail-sub-card">

                                                <h4>
                                                    🚀 Informasi Wirausaha
                                                </h4>

                                                <div className="detail-grid">

                                                    <div className="detail-item">

                                                        <span>
                                                            Nama Wirausaha
                                                        </span>

                                                        <strong>
                                                            {
                                                                selectedAlumni
                                                                    .wirausahaAwal
                                                                    ?.namaUsaha ||
                                                                '-'
                                                            }
                                                        </strong>

                                                    </div>

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                )}

                                {/* STATUS SEKARANG */}

                                {selectedAlumni.tracerStatus ===
                                    'Sudah Mengisi' && (

                                    <div className="detail-section">

                                        <div className="detail-section-title">

                                            <h3>
                                                Status Sekarang
                                            </h3>

                                            <p>
                                                Aktivitas atau kondisi alumni
                                                saat ini.
                                            </p>

                                        </div>

                                        <div className="detail-status-large">

                                            {renderStatusBadges(
                                                selectedAlumni.statusSekarang
                                            )}

                                        </div>

                                        {/* CURRENT EDUCATION */}

                                        {selectedAlumni.statusSekarang.includes(
                                            'Kuliah'
                                        ) && (

                                            <div className="detail-sub-card">

                                                <h4>
                                                    🎓 Pendidikan
                                                </h4>

                                                {selectedAlumni.pendidikan?.length >
                                                0 ? (

                                                    <div className="detail-education-list">

                                                        {selectedAlumni.pendidikan.map(
                                                            (
                                                                education,
                                                                index
                                                            ) => (

                                                                <div
                                                                    className="detail-education-card"
                                                                    key={
                                                                        education.id ||
                                                                        index
                                                                    }
                                                                >

                                                                    <div className="detail-education-number">
                                                                        {index + 1}
                                                                    </div>

                                                                    <div className="detail-education-content">

                                                                        <strong>
                                                                            {
                                                                                education.universitas ||
                                                                                '-'
                                                                            }
                                                                        </strong>

                                                                        <span>
                                                                            {
                                                                                education.programStudi ||
                                                                                '-'
                                                                            }
                                                                        </span>

                                                                        <small>
                                                                            Jenjang:{' '}
                                                                            {
                                                                                education.jenjang ||
                                                                                '-'
                                                                            }
                                                                        </small>

                                                                    </div>

                                                                </div>

                                                            )
                                                        )}

                                                    </div>

                                                ) : (

                                                    <div className="detail-no-data">
                                                        🎓 Belum ada data pendidikan.
                                                    </div>

                                                )}

                                            </div>

                                        )}

                                        {/* CURRENT WORK - MULTIPLE */}

                                        {selectedAlumni.statusSekarang.includes(
                                            'Bekerja'
                                        ) && (

                                            <div className="detail-sub-card">

                                                <h4>
                                                    💼 Informasi Pekerjaan
                                                </h4>

                                                {selectedAlumni.pekerjaan?.length >
                                                0 ? (

                                                    <div className="detail-work-list">

                                                        {selectedAlumni.pekerjaan.map(
                                                            (
                                                                work,
                                                                index
                                                            ) => (

                                                                <div
                                                                    className="detail-work-card"
                                                                    key={
                                                                        work.id ||
                                                                        index
                                                                    }
                                                                >

                                                                    <div className="detail-work-number">
                                                                        {index + 1}
                                                                    </div>

                                                                    <div className="detail-work-content">

                                                                        <h4>
                                                                            Pekerjaan{' '}
                                                                            {index + 1}
                                                                        </h4>

                                                                        <div className="detail-grid">

                                                                            <div className="detail-item">

                                                                                <span>
                                                                                    Nama Perusahaan
                                                                                </span>

                                                                                <strong>
                                                                                    {
                                                                                        work.perusahaan ||
                                                                                        '-'
                                                                                    }
                                                                                </strong>

                                                                            </div>

                                                                            <div className="detail-item">

                                                                                <span>
                                                                                    Posisi / Jabatan
                                                                                </span>

                                                                                <strong>
                                                                                    {
                                                                                        work.posisi ||
                                                                                        '-'
                                                                                    }
                                                                                </strong>

                                                                            </div>

                                                                            <div className="detail-item">

                                                                                <span>
                                                                                    Bidang Pekerjaan
                                                                                </span>

                                                                                <strong>
                                                                                    {
                                                                                        work.bidang ||
                                                                                        '-'
                                                                                    }
                                                                                </strong>

                                                                            </div>

                                                                            <div className="detail-item">

                                                                                <span>
                                                                                    Waktu Tunggu Kerja
                                                                                </span>

                                                                                <strong>
                                                                                    {
                                                                                        work.waktuTunggu ||
                                                                                        '-'
                                                                                    }
                                                                                </strong>

                                                                            </div>

                                                                            <div className="detail-item">

                                                                                <span>
                                                                                    Kesesuaian Pekerjaan
                                                                                </span>

                                                                                <strong>
                                                                                    {
                                                                                        work.kesesuaian ||
                                                                                        '-'
                                                                                    }
                                                                                </strong>

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            )
                                                        )}

                                                    </div>

                                                ) : (

                                                    <div className="detail-no-data">
                                                        💼 Belum ada data pekerjaan.
                                                    </div>

                                                )}

                                            </div>

                                        )}

                                        {/* CURRENT BUSINESS */}

                                        {selectedAlumni.statusSekarang.includes(
                                            'Wirausaha'
                                        ) && (

                                            <div className="detail-sub-card">

                                                <h4>
                                                    🚀 Informasi Wirausaha
                                                </h4>

                                                <div className="detail-grid">

                                                    <div className="detail-item">

                                                        <span>
                                                            Nama Wirausaha
                                                        </span>

                                                        <strong>
                                                            {
                                                                selectedAlumni
                                                                    .wirausaha
                                                                    ?.namaUsaha ||
                                                                '-'
                                                            }
                                                        </strong>

                                                    </div>

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                )}

                                {/* SATISFACTION */}

                                {selectedAlumni.tracerStatus ===
                                    'Sudah Mengisi' && (

                                    <div className="detail-section">

                                        <div className="detail-section-title">

                                            <h3>
                                                Kepuasan Alumni
                                            </h3>

                                            <p>
                                                Penilaian alumni terhadap
                                                pengalaman selama di sekolah.
                                            </p>

                                        </div>

                                        {renderDetailSatisfaction(
                                            selectedAlumni
                                        )}

                                    </div>

                                )}

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={
                                        handleCloseDetail
                                    }
                                >
                                    Tutup
                                </button>

                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => {

                                        handleCloseDetail()

                                        handleEdit(
                                            selectedAlumni
                                        )

                                    }}
                                >
                                    ✎ Edit Data
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                {/* =====================================================
                    ADD / EDIT MODAL
                ===================================================== */}

                {showModal && (

                    <div
                        className="modal-overlay"
                        onClick={
                            handleCloseModal
                        }
                    >

                        <div
                            className="alumni-modal"
                            onClick={e =>
                                e.stopPropagation()
                            }
                        >

                            <div className="modal-header">

                                <div>

                                    <h2>
                                        {
                                            modalMode ===
                                            'add'
                                                ? 'Tambah Alumni'
                                                : 'Edit Data Alumni'
                                        }
                                    </h2>

                                    <p>
                                        Lengkapi informasi alumni dengan benar.
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="modal-close"
                                    onClick={
                                        handleCloseModal
                                    }
                                >
                                    ×
                                </button>

                            </div>

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                                className="alumni-form"
                            >

                                <div className="modal-body">

                                    {/* =================================================
                                        DATA ALUMNI
                                    ================================================= */}

                                    <div className="form-section">

                                        <div className="form-section-title">

                                            <h3>
                                                Data Alumni
                                            </h3>

                                            <p>
                                                Informasi dasar alumni.
                                            </p>

                                        </div>

                                        <div className="form-grid">

                                            <div className="form-group">

                                                <label>
                                                    Nama Lengkap
                                                </label>

                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={
                                                        formData.nama
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    placeholder="Masukkan nama lengkap"
                                                    required
                                                />

                                            </div>

                                            <div className="form-group">

                                                <label>
                                                    NISN
                                                </label>

                                                <input
                                                    type="text"
                                                    name="nisn"
                                                    value={
                                                        formData.nisn
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    placeholder="Masukkan NISN"
                                                    required
                                                />

                                            </div>

                                            <div className="form-group">

                                                <label>
                                                    Angkatan
                                                </label>

                                                <select
                                                    name="angkatan"
                                                    value={
                                                        formData.angkatan
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    required
                                                >

                                                    <option value="">
                                                        Pilih angkatan
                                                    </option>

                                                    {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map(
                                                        year => (

                                                            <option
                                                                key={year}
                                                                value={year}
                                                            >
                                                                {year}
                                                            </option>

                                                        )
                                                    )}

                                                </select>

                                            </div>

                                            <div className="form-group">

                                                <label>
                                                    Jurusan
                                                </label>

                                                <select
                                                    name="jurusan"
                                                    value={
                                                        formData.jurusan
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    required
                                                >

                                                    <option value="">
                                                        Pilih jurusan
                                                    </option>

                                                    <option value="Rekayasa Perangkat Lunak">
                                                        Rekayasa Perangkat Lunak
                                                    </option>

                                                    <option value="Teknik Komputer Jaringan">
                                                        Teknik Komputer Jaringan
                                                    </option>

                                                    <option value="Multimedia">
                                                        Multimedia
                                                    </option>

                                                </select>

                                            </div>

                                            <div className="form-group">

                                                <label>
                                                    Email
                                                </label>

                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={
                                                        formData.email
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    placeholder="contoh@email.com"
                                                />

                                            </div>

                                            <div className="form-group">

                                                <label>
                                                    Nomor Telepon
                                                </label>

                                                <input
                                                    type="text"
                                                    name="telepon"
                                                    value={
                                                        formData.telepon
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    placeholder="08xxxxxxxxxx"
                                                />

                                            </div>

                                            <div className="form-group full">

                                                <label>
                                                    Alamat Lengkap
                                                </label>

                                                <textarea
                                                    name="alamat"
                                                    value={
                                                        formData.alamat
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    placeholder="Masukkan alamat lengkap alumni"
                                                    rows="3"
                                                />

                                            </div>

                                        </div>

                                    </div>

                                    {/* =================================================
                                        STATUS TRACER
                                    ================================================= */}

                                    <div className="form-section">

                                        <div className="form-section-title">

                                            <h3>
                                                Status Pengisian Tracer
                                            </h3>

                                            <p>
                                                Tentukan apakah alumni sudah
                                                mengisi tracer atau belum.
                                            </p>

                                        </div>

                                        <div className="tracer-input-options">

                                            <label
                                                className={`tracer-input-option ${
                                                    formData.tracerStatus ===
                                                    'Sudah Mengisi'
                                                        ? 'selected'
                                                        : ''
                                                }`}
                                            >

                                                <input
                                                    type="radio"
                                                    name="tracerStatus"
                                                    value="Sudah Mengisi"
                                                    checked={
                                                        formData.tracerStatus ===
                                                        'Sudah Mengisi'
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                />

                                                <div>

                                                    <strong>
                                                        Sudah Mengisi
                                                    </strong>

                                                    <small>
                                                        Alumni telah mengisi
                                                        data tracer.
                                                    </small>

                                                </div>

                                            </label>

                                            <label
                                                className={`tracer-input-option ${
                                                    formData.tracerStatus ===
                                                    'Belum Mengisi'
                                                        ? 'selected'
                                                        : ''
                                                }`}
                                            >

                                                <input
                                                    type="radio"
                                                    name="tracerStatus"
                                                    value="Belum Mengisi"
                                                    checked={
                                                        formData.tracerStatus ===
                                                        'Belum Mengisi'
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                />

                                                <div>

                                                    <strong>
                                                        Belum Mengisi
                                                    </strong>

                                                    <small>
                                                        Alumni belum mengisi
                                                        data tracer.
                                                    </small>

                                                </div>

                                            </label>

                                        </div>

                                    </div>

                                    {/* =================================================
                                        TRACER DATA
                                    ================================================= */}

                                    {formData.tracerStatus ===
                                        'Sudah Mengisi' && (

                                        <>

                                            {/* STATUS AWAL */}

                                            <div className="form-section">

                                                <div className="form-section-title">

                                                    <h3>
                                                        Status Sesaat Setelah Lulus
                                                    </h3>

                                                    <p>
                                                        Pilih satu aktivitas alumni
                                                        ketika pertama kali setelah
                                                        lulus.
                                                    </p>

                                                </div>

                                                <div className="status-options">

                                                    {statusOptions.map(
                                                        option => (

                                                            <label
                                                                key={`awal-${option.value}`}
                                                                className={`status-option ${
                                                                    formData.statusAwal ===
                                                                    option.value
                                                                        ? 'selected'
                                                                        : ''
                                                                }`}
                                                            >

                                                                <input
                                                                    type="radio"
                                                                    name="statusAwal"
                                                                    value={
                                                                        option.value
                                                                    }
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

                                                                <div className="status-option-content">

                                                                    <span className="status-option-icon">
                                                                        {
                                                                            option.icon
                                                                        }
                                                                    </span>

                                                                    <div>

                                                                        <strong>
                                                                            {
                                                                                option.label
                                                                            }
                                                                        </strong>

                                                                        <small>
                                                                            {
                                                                                option.description
                                                                            }
                                                                        </small>

                                                                    </div>

                                                                </div>

                                                            </label>

                                                        )
                                                    )}

                                                </div>

                                                {!formData.statusAwal && (

                                                    <p className="status-helper">
                                                        Pilih satu status setelah
                                                        lulus.
                                                    </p>

                                                )}

                                            </div>

                                            {/* =================================================
                                                INITIAL EDUCATION
                                            ================================================= */}

                                            {formData.statusAwal ===
                                                'Kuliah' && (

                                                <div className="form-section nested-form-section">

                                                    <div className="form-section-title">

                                                        <h3>
                                                            🎓 Pendidikan Setelah Lulus
                                                        </h3>

                                                        <p>
                                                            Masukkan satu pendidikan
                                                            yang ditempuh setelah lulus.
                                                        </p>

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
                                                                ].map(
                                                                    jenjang => (

                                                                        <option
                                                                            key={
                                                                                jenjang
                                                                            }
                                                                            value={
                                                                                jenjang
                                                                            }
                                                                        >
                                                                            {
                                                                                jenjang
                                                                            }
                                                                        </option>

                                                                    )
                                                                )}

                                                            </select>

                                                        </div>

                                                    </div>

                                                </div>

                                            )}

                                            {/* =================================================
                                                INITIAL WORK
                                            ================================================= */}

                                            {formData.statusAwal ===
                                                'Bekerja' && (

                                                <div className="form-section nested-form-section">

                                                    <div className="form-section-title">

                                                        <h3>
                                                            💼 Informasi Pekerjaan
                                                        </h3>

                                                        <p>
                                                            Informasi pekerjaan
                                                            pertama setelah lulus.
                                                        </p>

                                                    </div>

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

                                                                {waitingOptions.map(
                                                                    option => (

                                                                        <option
                                                                            key={
                                                                                option
                                                                            }
                                                                            value={
                                                                                option
                                                                            }
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </option>

                                                                    )
                                                                )}

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

                                                                {suitabilityOptions.map(
                                                                    option => (

                                                                        <option
                                                                            key={
                                                                                option
                                                                            }
                                                                            value={
                                                                                option
                                                                            }
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </option>

                                                                    )
                                                                )}

                                                            </select>

                                                        </div>

                                                    </div>

                                                </div>

                                            )}

                                            {/* =================================================
                                                INITIAL BUSINESS
                                            ================================================= */}

                                            {formData.statusAwal ===
                                                'Wirausaha' && (

                                                <div className="form-section nested-form-section">

                                                    <div className="form-section-title">

                                                        <h3>
                                                            🚀 Informasi Wirausaha
                                                        </h3>

                                                        <p>
                                                            Masukkan nama wirausaha
                                                            yang dijalankan setelah
                                                            lulus.
                                                        </p>

                                                    </div>

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

                                            {/* =================================================
                                                CURRENT STATUS
                                            ================================================= */}

                                            <div className="form-section">

                                                <div className="form-section-title">

                                                    <h3>
                                                        Status Sekarang
                                                    </h3>

                                                    <p>
                                                        Pilih semua aktivitas
                                                        alumni yang sedang
                                                        dijalankan saat ini.
                                                    </p>

                                                </div>

                                                <div className="status-options">

                                                    {statusOptions.map(
                                                        option => (

                                                            <label
                                                                key={`sekarang-${option.value}`}
                                                                className={`status-option ${
                                                                    formData.statusSekarang.includes(
                                                                        option.value
                                                                    )
                                                                        ? 'selected'
                                                                        : ''
                                                                }`}
                                                            >

                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        formData.statusSekarang.includes(
                                                                            option.value
                                                                        )
                                                                    }
                                                                    onChange={() =>
                                                                        handleStatusSekarangChange(
                                                                            option.value
                                                                        )
                                                                    }
                                                                />

                                                                <div className="status-option-content">

                                                                    <span className="status-option-icon">
                                                                        {
                                                                            option.icon
                                                                        }
                                                                    </span>

                                                                    <div>

                                                                        <strong>
                                                                            {
                                                                                option.label
                                                                            }
                                                                        </strong>

                                                                        <small>
                                                                            {
                                                                                option.description
                                                                            }
                                                                        </small>

                                                                    </div>

                                                                </div>

                                                            </label>

                                                        )
                                                    )}

                                                </div>

                                                {formData.statusSekarang.length ===
                                                    0 && (

                                                    <p className="status-helper">
                                                        Pilih minimal satu
                                                        status saat ini.
                                                    </p>

                                                )}

                                            </div>

                                            {/* =================================================
                                                CURRENT EDUCATION - MULTIPLE
                                            ================================================= */}

                                            {formData.statusSekarang.includes(
                                                'Kuliah'
                                            ) && (

                                                <div className="form-section education-section">

                                                    <div className="education-header">

                                                        <div className="form-section-title">

                                                            <h3>
                                                                🎓 Pendidikan
                                                            </h3>

                                                            <p>
                                                                Tambahkan pendidikan
                                                                yang sedang atau
                                                                pernah ditempuh
                                                                saat ini.
                                                            </p>

                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="btn-add-education"
                                                            onClick={
                                                                handleAddEducation
                                                            }
                                                        >
                                                            <span>
                                                                +
                                                            </span>
                                                            Tambah Pendidikan
                                                        </button>

                                                    </div>

                                                    <div className="education-list">

                                                        {formData.pendidikan.length ===
                                                            0 && (

                                                            <div className="education-empty">

                                                                <span>
                                                                    🎓
                                                                </span>

                                                                <p>
                                                                    Belum ada data
                                                                    pendidikan.
                                                                </p>

                                                                <button
                                                                    type="button"
                                                                    onClick={
                                                                        handleAddEducation
                                                                    }
                                                                >
                                                                    + Tambah Pendidikan
                                                                </button>

                                                            </div>

                                                        )}

                                                        {formData.pendidikan.map(
                                                            (
                                                                education,
                                                                index
                                                            ) => (

                                                                <div
                                                                    className="education-card"
                                                                    key={
                                                                        education.id
                                                                    }
                                                                >

                                                                    <div className="education-card-header">

                                                                        <div className="education-number">
                                                                            {index + 1}
                                                                        </div>

                                                                        <div>

                                                                            <strong>
                                                                                Pendidikan{' '}
                                                                                {index + 1}
                                                                            </strong>

                                                                            <span>
                                                                                Informasi perguruan tinggi
                                                                            </span>

                                                                        </div>

                                                                        <button
                                                                            type="button"
                                                                            className="education-remove"
                                                                            onClick={() =>
                                                                                handleRemoveEducation(
                                                                                    education.id
                                                                                )
                                                                            }
                                                                        >
                                                                            ×
                                                                        </button>

                                                                    </div>

                                                                    <div className="education-form-grid">

                                                                        <div className="form-group">

                                                                            <label>
                                                                                Universitas /
                                                                                Perguruan Tinggi
                                                                            </label>

                                                                            <input
                                                                                type="text"
                                                                                value={
                                                                                    education.universitas
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
                                                                                    education.programStudi
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
                                                                                    education.jenjang
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
                                                                                ].map(
                                                                                    jenjang => (

                                                                                        <option
                                                                                            key={
                                                                                                jenjang
                                                                                            }
                                                                                            value={
                                                                                                jenjang
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                jenjang
                                                                                            }
                                                                                        </option>

                                                                                    )
                                                                                )}

                                                                            </select>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            )
                                                        )}

                                                    </div>

                                                    {formData.pendidikan.length >
                                                        0 && (

                                                        <button
                                                            type="button"
                                                            className="education-add-more"
                                                            onClick={
                                                                handleAddEducation
                                                            }
                                                        >
                                                            <span>
                                                                ＋
                                                            </span>
                                                            Tambah Pendidikan
                                                        </button>

                                                    )}

                                                </div>

                                            )}

                                            {/* =================================================
                                                CURRENT WORK - MULTIPLE
                                            ================================================= */}

                                            {formData.statusSekarang.includes(
                                                'Bekerja'
                                            ) && (

                                                <div className="form-section work-section">

                                                    <div className="work-header">

                                                        <div className="form-section-title">

                                                            <h3>
                                                                💼 Informasi Pekerjaan
                                                            </h3>

                                                            <p>
                                                                Tambahkan seluruh
                                                                pekerjaan yang
                                                                sedang dijalankan
                                                                alumni saat ini.
                                                            </p>

                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="btn-add-work"
                                                            onClick={
                                                                handleAddWork
                                                            }
                                                        >
                                                            <span>
                                                                +
                                                            </span>
                                                            Tambah Pekerjaan
                                                        </button>

                                                    </div>

                                                    <div className="work-list">

                                                        {formData.pekerjaan.length ===
                                                            0 && (

                                                            <div className="work-empty">

                                                                <span>
                                                                    💼
                                                                </span>

                                                                <p>
                                                                    Belum ada data
                                                                    pekerjaan.
                                                                </p>

                                                                <button
                                                                    type="button"
                                                                    onClick={
                                                                        handleAddWork
                                                                    }
                                                                >
                                                                    + Tambah Pekerjaan
                                                                </button>

                                                            </div>

                                                        )}

                                                        {formData.pekerjaan.map(
                                                            (
                                                                work,
                                                                index
                                                            ) => (

                                                                <div
                                                                    className="work-card"
                                                                    key={
                                                                        work.id
                                                                    }
                                                                >

                                                                    <div className="work-card-header">

                                                                        <div className="work-number">
                                                                            {index + 1}
                                                                        </div>

                                                                        <div>

                                                                            <strong>
                                                                                Pekerjaan{' '}
                                                                                {index + 1}
                                                                            </strong>

                                                                            <span>
                                                                                Informasi pekerjaan alumni
                                                                            </span>

                                                                        </div>

                                                                        <button
                                                                            type="button"
                                                                            className="work-remove"
                                                                            onClick={() =>
                                                                                handleRemoveWork(
                                                                                    work.id
                                                                                )
                                                                            }
                                                                        >
                                                                            ×
                                                                        </button>

                                                                    </div>

                                                                    <div className="work-form-grid">

                                                                        <div className="form-group">

                                                                            <label>
                                                                                Nama Perusahaan
                                                                            </label>

                                                                            <input
                                                                                type="text"
                                                                                value={
                                                                                    work.perusahaan
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
                                                                                    work.posisi
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
                                                                                    work.bidang
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
                                                                                    work.waktuTunggu
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

                                                                                {waitingOptions.map(
                                                                                    option => (

                                                                                        <option
                                                                                            key={
                                                                                                option
                                                                                            }
                                                                                            value={
                                                                                                option
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                option
                                                                                            }
                                                                                        </option>

                                                                                    )
                                                                                )}

                                                                            </select>

                                                                        </div>

                                                                        <div className="form-group">

                                                                            <label>
                                                                                Kesesuaian Pekerjaan
                                                                            </label>

                                                                            <select
                                                                                value={
                                                                                    work.kesesuaian
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

                                                                                {suitabilityOptions.map(
                                                                                    option => (

                                                                                        <option
                                                                                            key={
                                                                                                option
                                                                                            }
                                                                                            value={
                                                                                                option
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                option
                                                                                            }
                                                                                        </option>

                                                                                    )
                                                                                )}

                                                                            </select>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            )
                                                        )}

                                                    </div>

                                                    {formData.pekerjaan.length >
                                                        0 && (

                                                        <button
                                                            type="button"
                                                            className="work-add-more"
                                                            onClick={
                                                                handleAddWork
                                                            }
                                                        >
                                                            <span>
                                                                ＋
                                                            </span>
                                                            Tambah Pekerjaan
                                                        </button>

                                                    )}

                                                </div>

                                            )}

                                            {/* =================================================
                                                CURRENT BUSINESS
                                            ================================================= */}

                                            {formData.statusSekarang.includes(
                                                'Wirausaha'
                                            ) && (

                                                <div className="form-section">

                                                    <div className="form-section-title">

                                                        <h3>
                                                            🚀 Informasi Wirausaha
                                                        </h3>

                                                        <p>
                                                            Masukkan nama wirausaha
                                                            yang sedang dijalankan.
                                                        </p>

                                                    </div>

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

                                            {/* =================================================
                                                SATISFACTION
                                            ================================================= */}

                                            <div className="form-section satisfaction-section">

                                                <div className="form-section-title">

                                                    <h3>
                                                        ⭐ Kepuasan Alumni
                                                    </h3>

                                                    <p>
                                                        Berikan penilaian terhadap
                                                        pengalaman selama bersekolah.
                                                    </p>

                                                </div>

                                                <div className="satisfaction-list">

                                                    {satisfactionOptions.map(
                                                        option => (

                                                            <div
                                                                className="satisfaction-item"
                                                                key={
                                                                    option.key
                                                                }
                                                            >

                                                                <div className="satisfaction-info">

                                                                    <strong>
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </strong>

                                                                    <span>
                                                                        {
                                                                            option.description
                                                                        }
                                                                    </span>

                                                                </div>

                                                                {renderStars(
                                                                    formData
                                                                        .kepuasan[
                                                                        option.key
                                                                    ] || 0,
                                                                    true,
                                                                    option.key
                                                                )}

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                                <p className="rating-helper">
                                                    Pilih 1–5 bintang sesuai tingkat
                                                    kepuasan alumni.
                                                </p>

                                            </div>

                                        </>

                                    )}

                                </div>

                                {/* =================================================
                                    MODAL FOOTER
                                ================================================= */}

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={
                                            handleCloseModal
                                        }
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn-primary"
                                    >
                                        {
                                            modalMode ===
                                            'add'
                                                ? 'Simpan Alumni'
                                                : 'Simpan Perubahan'
                                        }
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

                {/* =====================================================
                    DELETE MODAL
                ===================================================== */}

                {showDeleteModal && (

                    <div
                        className="modal-overlay"
                        onClick={() =>
                            setShowDeleteModal(
                                false
                            )
                        }
                    >

                        <div
                            className="delete-modal"
                            onClick={e =>
                                e.stopPropagation()
                            }
                        >

                            <div className="delete-icon">
                                🗑
                            </div>

                            <h2>
                                Hapus Data Alumni?
                            </h2>

                            <p>
                                Apakah kamu yakin ingin
                                menghapus data alumni{' '}
                                <strong>
                                    {deleteTarget?.nama}
                                </strong>
                                ?
                            </p>

                            <span className="delete-warning">
                                Data yang sudah dihapus tidak dapat
                                dikembalikan.
                            </span>

                            <div className="delete-actions">

                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() =>
                                        setShowDeleteModal(
                                            false
                                        )
                                    }
                                >
                                    Batal
                                </button>

                                <button
                                    type="button"
                                    className="btn-delete-confirm"
                                    onClick={
                                        handleDeleteConfirm
                                    }
                                >
                                    Ya, Hapus
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </AdminLayout>
    )
}