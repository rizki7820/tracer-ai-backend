
import React, { useEffect, useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'

export default function Campus() {

    // =========================================================
    // STATE
    // =========================================================

    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('Semua Jenis')
    const [statusFilter, setStatusFilter] = useState('Semua Status')

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 6

    // =========================================================
    // MODAL
    // =========================================================

    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('detail')
    const [selectedCampus, setSelectedCampus] = useState(null)

    // =========================================================
    // DUMMY DATA
    // =========================================================

    const [campuses, setCampuses] = useState([
        {
            id: 1,
            name: 'Telkom University',
            type: 'Universitas',
            city: 'Bandung',
            province: 'Jawa Barat',
            alumni: 38,
            status: 'Aktif',
            website: 'https://telkomuniversity.ac.id',
            instagram: 'https://www.instagram.com/telkomuniversity',
        },
        {
            id: 2,
            name: 'Universitas Indonesia',
            type: 'Universitas',
            city: 'Depok',
            province: 'Jawa Barat',
            alumni: 24,
            status: 'Aktif',
            website: 'https://ui.ac.id',
            instagram: 'https://www.instagram.com/univ_indonesia',
        },
        {
            id: 3,
            name: 'Universitas Gadjah Mada',
            type: 'Universitas',
            city: 'Sleman',
            province: 'DI Yogyakarta',
            alumni: 21,
            status: 'Aktif',
            website: 'https://ugm.ac.id',
            instagram: 'https://www.instagram.com/ugm.yogyakarta',
        },
        {
            id: 4,
            name: 'Universitas Lambung Mangkurat',
            type: 'Universitas',
            city: 'Banjarmasin',
            province: 'Kalimantan Selatan',
            alumni: 29,
            status: 'Aktif',
            website: 'https://ulm.ac.id',
            instagram: 'https://www.instagram.com/ulmofficial',
        },
        {
            id: 5,
            name: 'Politeknik Negeri Banjarmasin',
            type: 'Politeknik',
            city: 'Banjarmasin',
            province: 'Kalimantan Selatan',
            alumni: 17,
            status: 'Aktif',
            website: 'https://poliban.ac.id',
            instagram: 'https://www.instagram.com/polibanofficial',
        },
        {
            id: 6,
            name: 'Institut Teknologi Sepuluh Nopember',
            type: 'Institut',
            city: 'Surabaya',
            province: 'Jawa Timur',
            alumni: 15,
            status: 'Aktif',
            website: 'https://www.its.ac.id',
            instagram: 'https://www.instagram.com/its_campus',
        },
        {
            id: 7,
            name: 'Universitas Negeri Yogyakarta',
            type: 'Universitas',
            city: 'Sleman',
            province: 'DI Yogyakarta',
            alumni: 12,
            status: 'Aktif',
            website: 'https://uny.ac.id',
            instagram: 'https://www.instagram.com/unyofficial',
        },
        {
            id: 8,
            name: 'Politeknik Elektronika Negeri Surabaya',
            type: 'Politeknik',
            city: 'Surabaya',
            province: 'Jawa Timur',
            alumni: 9,
            status: 'Nonaktif',
            website: 'https://www.pens.ac.id',
            instagram: 'https://www.instagram.com/pensofficial',
        },
    ])

    // =========================================================
    // FILTER
    // =========================================================

    const filteredCampuses = useMemo(() => {
        const keyword = search.toLowerCase().trim()

        return campuses.filter((campus) => {

            const matchesSearch =
                campus.name.toLowerCase().includes(keyword) ||
                campus.city.toLowerCase().includes(keyword) ||
                campus.province.toLowerCase().includes(keyword)

            const matchesType =
                typeFilter === 'Semua Jenis' ||
                campus.type === typeFilter

            const matchesStatus =
                statusFilter === 'Semua Status' ||
                campus.status === statusFilter

            return (
                matchesSearch &&
                matchesType &&
                matchesStatus
            )
        })

    }, [
        campuses,
        search,
        typeFilter,
        statusFilter,
    ])

    // =========================================================
    // PAGINATION
    // =========================================================

    const totalPages = Math.max(
        1,
        Math.ceil(filteredCampuses.length / itemsPerPage)
    )

    const paginatedCampuses = filteredCampuses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    // =========================================================
    // KEEP PAGE VALID
    // =========================================================

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    // =========================================================
    // FILTER HANDLERS
    // =========================================================

    function handleSearch(value) {
        setSearch(value)
        setCurrentPage(1)
    }

    function handleTypeFilter(value) {
        setTypeFilter(value)
        setCurrentPage(1)
    }

    function handleStatusFilter(value) {
        setStatusFilter(value)
        setCurrentPage(1)
    }

    // =========================================================
    // MODAL
    // =========================================================

    function openModal(type, campus = null) {
        setModalType(type)
        setSelectedCampus(campus)
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
        setSelectedCampus(null)
    }

    // =========================================================
    // DELETE
    // =========================================================

    function handleDelete(id) {

        const campus = campuses.find(
            (item) => item.id === id
        )

        if (!campus) return

        const confirmed = window.confirm(
            `Apakah kamu yakin ingin menghapus ${campus.name}?`
        )

        if (!confirmed) return

        setCampuses((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
        )

        closeModal()
    }

    // =========================================================
    // SAVE CAMPUS
    // =========================================================

    function handleSaveCampus(data) {

        if (modalType === 'add') {

            setCampuses((prev) => [
                ...prev,
                {
                    ...data,
                    id: Date.now(),
                },
            ])

        } else if (
            modalType === 'edit' &&
            selectedCampus
        ) {

            setCampuses((prev) =>
                prev.map((item) =>
                    item.id === selectedCampus.id
                        ? {
                            ...item,
                            ...data,
                        }
                        : item
                )
            )
        }

        closeModal()
    }

    // =========================================================
    // STATISTICS
    // =========================================================

    const totalCampuses = campuses.length

    const activeCampuses = campuses.filter(
        (campus) => campus.status === 'Aktif'
    ).length

    const totalAlumni = campuses.reduce(
        (total, campus) =>
            total + Number(campus.alumni || 0),
        0
    )

    const universityCount = campuses.filter(
        (campus) => campus.type === 'Universitas'
    ).length

    // =========================================================
    // ICONS
    // =========================================================

    function CampusIcon() {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 10 12 4l9 6" />
                <path d="M5 10v9" />
                <path d="M9 10v9" />
                <path d="M15 10v9" />
                <path d="M19 10v9" />
                <path d="M3 19h18" />
            </svg>
        )
    }

    function SearchIcon() {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle
                    cx="11"
                    cy="11"
                    r="7"
                />
                <line
                    x1="16.5"
                    y1="16.5"
                    x2="21"
                    y2="21"
                />
            </svg>
        )
    }

    function PlusIcon() {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <line
                    x1="12"
                    y1="5"
                    x2="12"
                    y2="19"
                />
                <line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                />
            </svg>
        )
    }

    function EyeIcon() {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                <circle
                    cx="12"
                    cy="12"
                    r="2.5"
                />
            </svg>
        )
    }

    function EditIcon() {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
            </svg>
        )
    }

    function TrashIcon() {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
        )
    }

    function WebsiteIcon() {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle
                    cx="12"
                    cy="12"
                    r="9"
                />
                <path d="M3 12h18" />
                <path d="M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9" />
                <path d="M12 3c-2.2 2.4-3.3 5.4-3.3 9s1.1 6.6 3.3 9" />
            </svg>
        )
    }

    function InstagramIcon() {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                />
                <circle
                    cx="12"
                    cy="12"
                    r="4"
                />
                <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                />
            </svg>
        )
    }

    function ExternalLinkIcon() {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 3h7v7" />
                <path d="M10 14 21 3" />
                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
            </svg>
        )
    }

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <AdminLayout
            title="Kampus"
            description="Kelola data perguruan tinggi tujuan alumni."
        >

            <div className="campus-page">

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section className="campus-header">

                    <div className="campus-header-left">

                        <div className="campus-title-icon">
                            <CampusIcon />
                        </div>

                        <div>
                            <h2>Data Kampus</h2>

                            <p>
                                Kelola data perguruan tinggi
                                tempat alumni melanjutkan pendidikan.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="campus-add-button"
                        onClick={() => openModal('add')}
                    >
                        <PlusIcon />
                        <span>Tambah Kampus</span>
                    </button>

                </section>

                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="campus-stat-grid">

                    <div className="campus-stat-card">

                        <div className="campus-stat-icon total">
                            <CampusIcon />
                        </div>

                        <div className="campus-stat-content">
                            <span>Total Kampus</span>

                            <strong className="campus-stat-value">
                                {totalCampuses}
                            </strong>

                            <small>kampus terdata</small>
                        </div>

                    </div>

                    <div className="campus-stat-card">

                        <div className="campus-stat-icon active">
                            <svg viewBox="0 0 24 24">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>

                        <div className="campus-stat-content">
                            <span>Kampus Aktif</span>

                            <strong className="campus-stat-value">
                                {activeCampuses}
                            </strong>

                            <small>status aktif</small>
                        </div>

                    </div>

                    <div className="campus-stat-card">

                        <div className="campus-stat-icon alumni">
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
                        </div>

                        <div className="campus-stat-content">
                            <span>Alumni Melanjutkan</span>

                            <strong className="campus-stat-value">
                                {totalAlumni}
                            </strong>

                            <small>alumni terdata</small>
                        </div>

                    </div>

                    <div className="campus-stat-card">

                        <div className="campus-stat-icon university">
                            <CampusIcon />
                        </div>

                        <div className="campus-stat-content">
                            <span>Universitas</span>

                            <strong className="campus-stat-value">
                                {universityCount}
                            </strong>

                            <small>dari seluruh kampus</small>
                        </div>

                    </div>

                </section>

                {/* =================================================
                    TABLE CARD
                ================================================= */}

                <section className="campus-table-card">

                    <div className="campus-table-header">

                        <div>
                            <h3>Daftar Kampus</h3>

                            <p>
                                Daftar perguruan tinggi tujuan alumni.
                            </p>
                        </div>

                    </div>

                    {/* =================================================
                        TOOLBAR
                    ================================================= */}

                    <div className="campus-toolbar">

                        <div className="campus-toolbar-left">

                            <div className="campus-search">

                                <SearchIcon />

                                <input
                                    type="text"
                                    value={search}
                                    placeholder="Cari nama kampus, kota, atau provinsi..."
                                    onChange={(event) =>
                                        handleSearch(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        <div className="campus-filter">

                            <div className="campus-filter-item">

                                <label htmlFor="campus-type-filter">
                                    Jenis
                                </label>

                                <select
                                    id="campus-type-filter"
                                    value={typeFilter}
                                    onChange={(event) =>
                                        handleTypeFilter(
                                            event.target.value
                                        )
                                    }
                                >
                                    <option>Semua Jenis</option>
                                    <option>Universitas</option>
                                    <option>Institut</option>
                                    <option>Politeknik</option>
                                    <option>Akademi</option>
                                </select>

                            </div>

                            <div className="campus-filter-item">

                                <label htmlFor="campus-status-filter">
                                    Status
                                </label>

                                <select
                                    id="campus-status-filter"
                                    value={statusFilter}
                                    onChange={(event) =>
                                        handleStatusFilter(
                                            event.target.value
                                        )
                                    }
                                >
                                    <option>Semua Status</option>
                                    <option>Aktif</option>
                                    <option>Nonaktif</option>
                                </select>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        TABLE
                    ================================================= */}

                    <div className="campus-table-wrapper">

                        <table className="campus-table">

                            <thead>
                                <tr>
                                    <th>KAMPUS</th>
                                    <th>JENIS</th>
                                    <th>LOKASI</th>
                                    <th>ALUMNI</th>
                                    <th>STATUS</th>
                                    <th>AKSI</th>
                                </tr>
                            </thead>

                            <tbody>

                                {paginatedCampuses.length > 0 ? (

                                    paginatedCampuses.map((campus) => (

                                        <tr key={campus.id}>

                                            <td>

                                                <div className="campus-name-cell">

                                                    <div className="campus-avatar">
                                                        <CampusIcon />
                                                    </div>

                                                    <div className="campus-name-content">

                                                        <strong>
                                                            {campus.name}
                                                        </strong>

                                                        <span>
                                                            Kampus #
                                                            {String(
                                                                campus.id
                                                            ).padStart(3, '0')}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>
                                                <span className="campus-type-badge">
                                                    {campus.type}
                                                </span>
                                            </td>

                                            <td>

                                                <div className="campus-location">

                                                    <strong>
                                                        {campus.city || '-'}
                                                    </strong>

                                                    <span>
                                                        {campus.province || '-'}
                                                    </span>

                                                </div>

                                            </td>

                                            <td>
                                                <strong className="campus-alumni-count">
                                                    {campus.alumni}
                                                </strong>
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        campus.status === 'Aktif'
                                                            ? 'campus-status active'
                                                            : 'campus-status inactive'
                                                    }
                                                >
                                                    <i />
                                                    {campus.status}
                                                </span>

                                            </td>

                                            <td>

                                                <div className="campus-actions">

                                                    <button
                                                        type="button"
                                                        className="campus-action-button"
                                                        title="Lihat detail"
                                                        aria-label={`Lihat detail ${campus.name}`}
                                                        onClick={() =>
                                                            openModal(
                                                                'detail',
                                                                campus
                                                            )
                                                        }
                                                    >
                                                        <EyeIcon />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="campus-action-button edit"
                                                        title="Edit"
                                                        aria-label={`Edit ${campus.name}`}
                                                        onClick={() =>
                                                            openModal(
                                                                'edit',
                                                                campus
                                                            )
                                                        }
                                                    >
                                                        <EditIcon />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="campus-action-button delete"
                                                        title="Hapus"
                                                        aria-label={`Hapus ${campus.name}`}
                                                        onClick={() =>
                                                            handleDelete(
                                                                campus.id
                                                            )
                                                        }
                                                    >
                                                        <TrashIcon />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="campus-empty"
                                        >

                                            <div className="campus-empty-icon">
                                                <SearchIcon />
                                            </div>

                                            <strong>
                                                Data kampus tidak ditemukan
                                            </strong>

                                            <span>
                                                Coba ubah kata kunci
                                                atau filter pencarian.
                                            </span>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div className="campus-table-footer">

                        <span>
                            Menampilkan{' '}
                            <strong>
                                {paginatedCampuses.length}
                            </strong>{' '}
                            dari{' '}
                            <strong>
                                {filteredCampuses.length}
                            </strong>{' '}
                            kampus
                        </span>

                        {filteredCampuses.length > 0 && (

                            <div className="campus-pagination">

                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage(
                                            (page) =>
                                                Math.max(1, page - 1)
                                        )
                                    }
                                    aria-label="Halaman sebelumnya"
                                >
                                    ‹
                                </button>

                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => {

                                        const page = index + 1

                                        return (
                                            <button
                                                type="button"
                                                key={page}
                                                className={
                                                    currentPage === page
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                            >
                                                {page}
                                            </button>
                                        )
                                    }
                                )}

                                <button
                                    type="button"
                                    disabled={
                                        currentPage === totalPages
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            (page) =>
                                                Math.min(
                                                    totalPages,
                                                    page + 1
                                                )
                                        )
                                    }
                                    aria-label="Halaman berikutnya"
                                >
                                    ›
                                </button>

                            </div>

                        )}

                    </div>

                </section>

                {/* =================================================
                    MODAL
                ================================================= */}

                {showModal && (

                    <div
                        className="campus-modal-overlay"
                        onMouseDown={(event) => {

                            if (
                                event.target ===
                                event.currentTarget
                            ) {
                                closeModal()
                            }

                        }}
                    >

                        <div
                            className="campus-modal"
                            role="dialog"
                            aria-modal="true"
                        >

                            {/* MODAL HEADER */}

                            <div className="campus-modal-header">

                                <div>

                                    <h3>
                                        {modalType === 'add'
                                            ? 'Tambah Kampus'
                                            : modalType === 'edit'
                                                ? 'Edit Kampus'
                                                : 'Detail Kampus'}
                                    </h3>

                                    <p>
                                        {modalType === 'detail'
                                            ? 'Informasi lengkap perguruan tinggi.'
                                            : 'Lengkapi informasi kampus.'}
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="campus-modal-close"
                                    onClick={closeModal}
                                    aria-label="Tutup modal"
                                >
                                    ×
                                </button>

                            </div>

                            {/* =================================================
                                DETAIL
                            ================================================= */}

                            {modalType === 'detail' &&
                                selectedCampus && (

                                    <div className="campus-detail">

                                        <div className="campus-detail-header">

                                            <div className="campus-detail-avatar">
                                                <CampusIcon />
                                            </div>

                                            <div>

                                                <h4>
                                                    {selectedCampus.name}
                                                </h4>

                                                <span>
                                                    {selectedCampus.type}
                                                </span>

                                            </div>

                                        </div>

                                        <div className="campus-detail-grid">

                                            <div>
                                                <span>Kota</span>
                                                <strong>
                                                    {selectedCampus.city || '-'}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Provinsi</span>
                                                <strong>
                                                    {selectedCampus.province || '-'}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Alumni</span>
                                                <strong>
                                                    {selectedCampus.alumni}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Status</span>

                                                <strong
                                                    className={
                                                        selectedCampus.status === 'Aktif'
                                                            ? 'campus-detail-status active'
                                                            : 'campus-detail-status inactive'
                                                    }
                                                >
                                                    {selectedCampus.status}
                                                </strong>
                                            </div>

                                        </div>

                                        <div className="campus-detail-links">

                                            <div className="campus-detail-link-item">

                                                <div className="campus-detail-link-icon website">
                                                    <WebsiteIcon />
                                                </div>

                                                <div className="campus-detail-link-content">

                                                    <span>
                                                        Website Kampus
                                                    </span>

                                                    {selectedCampus.website ? (

                                                        <a
                                                            href={selectedCampus.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="campus-detail-link"
                                                        >

                                                            <span>
                                                                {selectedCampus.website
                                                                    .replace(
                                                                        /^https?:\/\//,
                                                                        ''
                                                                    )
                                                                    .replace(
                                                                        /\/$/,
                                                                        ''
                                                                    )}
                                                            </span>

                                                            <ExternalLinkIcon />

                                                        </a>

                                                    ) : (
                                                        <strong>-</strong>
                                                    )}

                                                </div>

                                            </div>

                                            <div className="campus-detail-link-item">

                                                <div className="campus-detail-link-icon instagram">
                                                    <InstagramIcon />
                                                </div>

                                                <div className="campus-detail-link-content">

                                                    <span>
                                                        Instagram
                                                    </span>

                                                    {selectedCampus.instagram ? (

                                                        <a
                                                            href={selectedCampus.instagram}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="campus-detail-link"
                                                        >

                                                            <span>
                                                                {selectedCampus.instagram
                                                                    .replace(
                                                                        /^https?:\/\//,
                                                                        ''
                                                                    )
                                                                    .replace(
                                                                        /\/$/,
                                                                        ''
                                                                    )}
                                                            </span>

                                                            <ExternalLinkIcon />

                                                        </a>

                                                    ) : (
                                                        <strong>-</strong>
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            className="campus-modal-close-button"
                                            onClick={closeModal}
                                        >
                                            Tutup
                                        </button>

                                    </div>

                                )}

                            {/* =================================================
                                ADD / EDIT
                            ================================================= */}

                            {(modalType === 'add' ||
                                modalType === 'edit') && (

                                <CampusForm
                                    campus={
                                        modalType === 'edit'
                                            ? selectedCampus
                                            : null
                                    }
                                    onClose={closeModal}
                                    onSave={handleSaveCampus}
                                />

                            )}

                        </div>

                    </div>

                )}

            </div>

        </AdminLayout>
    )
}


// =========================================================
// CAMPUS FORM
// =========================================================

function CampusForm({
    campus,
    onClose,
    onSave,
}) {

    const [name, setName] = useState(
        campus?.name || ''
    )

    const [type, setType] = useState(
        campus?.type || 'Universitas'
    )

    const [city, setCity] = useState(
        campus?.city || ''
    )

    const [province, setProvince] = useState(
        campus?.province || ''
    )

    const [alumni, setAlumni] = useState(
        campus?.alumni ?? 0
    )

    const [status, setStatus] = useState(
        campus?.status || 'Aktif'
    )

    const [website, setWebsite] = useState(
        campus?.website || ''
    )

    const [instagram, setInstagram] = useState(
        campus?.instagram || ''
    )

    // =========================================================
    // SUBMIT
    // =========================================================

    function handleSubmit(event) {

        event.preventDefault()

        if (!name.trim()) {
            alert('Nama kampus wajib diisi.')
            return
        }

        let websiteValue = website.trim()

        if (
            websiteValue &&
            !/^https?:\/\//i.test(websiteValue)
        ) {
            websiteValue = `https://${websiteValue}`
        }

        let instagramValue = instagram.trim()

        if (
            instagramValue &&
            !/^https?:\/\//i.test(instagramValue)
        ) {
            instagramValue =
                `https://instagram.com/${instagramValue.replace(/^@/, '')}`
        }

        onSave({
            name: name.trim(),
            type,
            city: city.trim(),
            province: province.trim(),
            alumni: Number(alumni) || 0,
            status,
            website: websiteValue,
            instagram: instagramValue,
        })
    }

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <form
            className="campus-form"
            onSubmit={handleSubmit}
        >

            <div className="campus-form-grid">

                <label>
                    <span>Nama Kampus</span>

                    <input
                        type="text"
                        value={name}
                        placeholder="Contoh: Telkom University"
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                    />
                </label>

                <label>
                    <span>Jenis Kampus</span>

                    <select
                        value={type}
                        onChange={(event) =>
                            setType(event.target.value)
                        }
                    >
                        <option>Universitas</option>
                        <option>Institut</option>
                        <option>Politeknik</option>
                        <option>Akademi</option>
                    </select>
                </label>

                <label>
                    <span>Kota</span>

                    <input
                        type="text"
                        value={city}
                        placeholder="Contoh: Bandung"
                        onChange={(event) =>
                            setCity(event.target.value)
                        }
                    />
                </label>

                <label>
                    <span>Provinsi</span>

                    <input
                        type="text"
                        value={province}
                        placeholder="Contoh: Jawa Barat"
                        onChange={(event) =>
                            setProvince(event.target.value)
                        }
                    />
                </label>

                <label>
                    <span>Jumlah Alumni</span>

                    <input
                        type="number"
                        min="0"
                        value={alumni}
                        onChange={(event) =>
                            setAlumni(event.target.value)
                        }
                    />
                </label>

                <label>
                    <span>Status</span>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(event.target.value)
                        }
                    >
                        <option>Aktif</option>
                        <option>Nonaktif</option>
                    </select>
                </label>

                <label className="campus-form-full">
                    <span>Website Kampus</span>

                    <input
                        type="text"
                        value={website}
                        placeholder="Contoh: https://telkomuniversity.ac.id"
                        onChange={(event) =>
                            setWebsite(event.target.value)
                        }
                    />

                    <small>
                        Masukkan alamat website resmi kampus.
                    </small>
                </label>

                <label className="campus-form-full">
                    <span>Instagram</span>

                    <input
                        type="text"
                        value={instagram}
                        placeholder="Contoh: @telkomuniversity"
                        onChange={(event) =>
                            setInstagram(event.target.value)
                        }
                    />

                    <small>
                        Bisa menggunakan username atau link Instagram.
                    </small>
                </label>

            </div>

            <div className="campus-form-actions">

                <button
                    type="button"
                    className="campus-form-button cancel"
                    onClick={onClose}
                >
                    Batal
                </button>

                <button
                    type="submit"
                    className="campus-form-button save"
                >
                    {campus ? 'Simpan Perubahan' : 'Simpan'}
                </button>

            </div>

        </form>
    )
}
