import React, { useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'

export default function Perusahaan() {

    // =========================================================
    // STATE
    // =========================================================

    const [search, setSearch] = useState('')
    const [industryFilter, setIndustryFilter] = useState('Semua Industri')
    const [cityFilter, setCityFilter] = useState('Semua Kota')
    const [statusFilter, setStatusFilter] = useState('Semua Status')

    const [currentPage, setCurrentPage] = useState(1)

    const [selectedCompany, setSelectedCompany] = useState(null)

    const [showCompanyModal, setShowCompanyModal] = useState(false)

    const [editingCompany, setEditingCompany] = useState(null)

    const itemsPerPage = 6


    // =========================================================
    // FORM STATE
    // =========================================================

    const emptyForm = {
        name: '',
        industry: '',
        city: '',
        address: '',
        website: '',
        status: 'Aktif'
    }

    const [formData, setFormData] = useState(emptyForm)


    // =========================================================
    // DATA PERUSAHAAN
    // =========================================================

    const [companies, setCompanies] = useState([
        {
            id: 1,
            name: 'PT Telkom Indonesia',
            industry: 'Telekomunikasi',
            city: 'Jakarta',
            address: 'Jl. Japati No. 1, Bandung',
            website: 'https://www.telkom.co.id',
            status: 'Aktif',
            alumni: 86,
            founded: '1965'
        },
        {
            id: 2,
            name: 'PT Astra International',
            industry: 'Otomotif',
            city: 'Jakarta',
            address: 'Jl. Gaya Motor Raya No. 8, Jakarta',
            website: 'https://www.astra.co.id',
            status: 'Aktif',
            alumni: 54,
            founded: '1957'
        },
        {
            id: 3,
            name: 'PT Bank Central Asia',
            industry: 'Perbankan',
            city: 'Jakarta',
            address: 'Menara BCA, Jl. M.H. Thamrin No. 1',
            website: 'https://www.bca.co.id',
            status: 'Aktif',
            alumni: 39,
            founded: '1957'
        },
        {
            id: 4,
            name: 'PT Shopee Indonesia',
            industry: 'E-Commerce',
            city: 'Jakarta',
            address: 'Sopo Del Tower, Jakarta',
            website: 'https://shopee.co.id',
            status: 'Aktif',
            alumni: 31,
            founded: '2015'
        },
        {
            id: 5,
            name: 'PT PLN',
            industry: 'Energi',
            city: 'Jakarta',
            address: 'Jl. Trunojoyo Blok M I No. 135',
            website: 'https://www.pln.co.id',
            status: 'Aktif',
            alumni: 27,
            founded: '1945'
        },
        {
            id: 6,
            name: 'PT Pertamina',
            industry: 'Energi',
            city: 'Jakarta',
            address: 'Grha Pertamina, Jakarta',
            website: 'https://www.pertamina.com',
            status: 'Aktif',
            alumni: 24,
            founded: '1957'
        },
        {
            id: 7,
            name: 'PT Tokopedia',
            industry: 'E-Commerce',
            city: 'Jakarta',
            address: 'Tokopedia Tower, Jakarta',
            website: 'https://www.tokopedia.com',
            status: 'Aktif',
            alumni: 21,
            founded: '2009'
        },
        {
            id: 8,
            name: 'PT Kereta Api Indonesia',
            industry: 'Transportasi',
            city: 'Bandung',
            address: 'Jl. Perintis Kemerdekaan No. 1, Bandung',
            website: 'https://www.kai.id',
            status: 'Aktif',
            alumni: 18,
            founded: '1945'
        },
        {
            id: 9,
            name: 'PT Djarum',
            industry: 'Manufaktur',
            city: 'Kudus',
            address: 'Jl. A. Yani No. 28, Kudus',
            website: 'https://www.djarum.com',
            status: 'Aktif',
            alumni: 15,
            founded: '1951'
        },
        {
            id: 10,
            name: 'PT Gojek Indonesia',
            industry: 'Teknologi',
            city: 'Jakarta',
            address: 'Pasaraya Blok M, Jakarta',
            website: 'https://www.gojek.com',
            status: 'Aktif',
            alumni: 14,
            founded: '2010'
        },
        {
            id: 11,
            name: 'PT Indosat Ooredoo Hutchison',
            industry: 'Telekomunikasi',
            city: 'Jakarta',
            address: 'Jl. Medan Merdeka Barat No. 21',
            website: 'https://ioh.co.id',
            status: 'Aktif',
            alumni: 12,
            founded: '1967'
        },
        {
            id: 12,
            name: 'CV Digital Kreatif',
            industry: 'Teknologi',
            city: 'Semarang',
            address: 'Jl. Pandanaran, Semarang',
            website: '-',
            status: 'Tidak Aktif',
            alumni: 8,
            founded: '2019'
        }
    ])


    // =========================================================
    // STATISTICS
    // =========================================================

    const totalCompanies = companies.length

    const activeCompanies = companies.filter(
        company => company.status === 'Aktif'
    ).length

    const inactiveCompanies = companies.filter(
        company => company.status === 'Tidak Aktif'
    ).length

    const totalAlumniWorking = companies.reduce(
        (total, company) => total + company.alumni,
        0
    )


    // =========================================================
    // INDUSTRY ANALYSIS
    // =========================================================

    const industryData = useMemo(() => {

        const counts = {}

        companies.forEach(company => {

            if (!counts[company.industry]) {
                counts[company.industry] = 0
            }

            counts[company.industry] += company.alumni

        })

        const total = Object.values(counts).reduce(
            (sum, value) => sum + value,
            0
        )

        return Object.entries(counts)
            .map(([name, value]) => ({
                name,
                value,
                percentage: total
                    ? Math.round((value / total) * 100)
                    : 0
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5)

    }, [companies])


    // =========================================================
    // TOP COMPANIES
    // =========================================================

    const topCompanies = useMemo(() => {

        return [...companies]
            .sort((a, b) => b.alumni - a.alumni)
            .slice(0, 5)

    }, [companies])


    // =========================================================
    // FILTER DATA
    // =========================================================

    const filteredCompanies = useMemo(() => {

        return companies.filter(company => {

            const searchValue = search.toLowerCase()

            const searchMatch =
                company.name.toLowerCase().includes(searchValue) ||
                company.industry.toLowerCase().includes(searchValue) ||
                company.city.toLowerCase().includes(searchValue)

            const industryMatch =
                industryFilter === 'Semua Industri' ||
                company.industry === industryFilter

            const cityMatch =
                cityFilter === 'Semua Kota' ||
                company.city === cityFilter

            const statusMatch =
                statusFilter === 'Semua Status' ||
                company.status === statusFilter

            return (
                searchMatch &&
                industryMatch &&
                cityMatch &&
                statusMatch
            )

        })

    }, [
        companies,
        search,
        industryFilter,
        cityFilter,
        statusFilter
    ])


    // =========================================================
    // PAGINATION
    // =========================================================

    const totalPages = Math.ceil(
        filteredCompanies.length / itemsPerPage
    )

    const paginatedCompanies = filteredCompanies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )


    // =========================================================
    // RESET FILTER
    // =========================================================

    const resetFilter = () => {

        setSearch('')
        setIndustryFilter('Semua Industri')
        setCityFilter('Semua Kota')
        setStatusFilter('Semua Status')
        setCurrentPage(1)

    }


    // =========================================================
    // FILTER HANDLERS
    // =========================================================

    const handleSearch = value => {
        setSearch(value)
        setCurrentPage(1)
    }

    const handleIndustryFilter = value => {
        setIndustryFilter(value)
        setCurrentPage(1)
    }

    const handleCityFilter = value => {
        setCityFilter(value)
        setCurrentPage(1)
    }

    const handleStatusFilter = value => {
        setStatusFilter(value)
        setCurrentPage(1)
    }


    // =========================================================
    // STATUS CLASS
    // =========================================================

    const getStatusClass = status => {

        return status === 'Aktif'
            ? 'active'
            : 'inactive'

    }


    // =========================================================
    // OPEN ADD MODAL
    // =========================================================

    const openAddModal = () => {

        setEditingCompany(null)
        setFormData(emptyForm)
        setShowCompanyModal(true)

    }


    // =========================================================
    // OPEN EDIT MODAL
    // =========================================================

    const openEditModal = company => {

        setEditingCompany(company)

        setFormData({
            name: company.name,
            industry: company.industry,
            city: company.city,
            address: company.address,
            website: company.website,
            status: company.status
        })

        setShowCompanyModal(true)

    }


    // =========================================================
    // CLOSE COMPANY MODAL
    // =========================================================

    const closeCompanyModal = () => {

        setShowCompanyModal(false)
        setEditingCompany(null)
        setFormData(emptyForm)

    }


    // =========================================================
    // FORM CHANGE
    // =========================================================

    const handleFormChange = event => {

        const {
            name,
            value
        } = event.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }


    // =========================================================
    // SAVE COMPANY
    // =========================================================

    const handleSaveCompany = event => {

        event.preventDefault()

        if (!formData.name.trim()) {
            return
        }

        if (editingCompany) {

            setCompanies(prev =>
                prev.map(company =>
                    company.id === editingCompany.id
                        ? {
                            ...company,
                            ...formData
                        }
                        : company
                )
            )

        } else {

            const newCompany = {

                id: Date.now(),

                ...formData,

                alumni: 0,

                founded: new Date()
                    .getFullYear()
                    .toString()

            }

            setCompanies(prev => [
                newCompany,
                ...prev
            ])

        }

        closeCompanyModal()

    }


    // =========================================================
    // DELETE COMPANY
    // =========================================================

    const handleDeleteCompany = company => {

        const confirmed = window.confirm(
            `Hapus perusahaan "${company.name}"?`
        )

        if (!confirmed) {
            return
        }

        setCompanies(prev =>
            prev.filter(item =>
                item.id !== company.id
            )
        )

        if (
            selectedCompany &&
            selectedCompany.id === company.id
        ) {
            setSelectedCompany(null)
        }

    }


    // =========================================================
    // COMPONENT
    // =========================================================

    return (

        <AdminLayout>

            <div className="company-page">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="company-page-header">

                    <div>

                        <span className="company-page-badge">
                            PERUSAHAAN
                        </span>

                        <h2>
                            Data Perusahaan & Instansi
                        </h2>

                        <p>
                            Kelola informasi perusahaan dan instansi tempat alumni bekerja.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="company-add-button"
                        onClick={openAddModal}
                    >

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                        </svg>

                        Tambah Perusahaan

                    </button>

                </div>


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <div className="company-stats-grid">

                    <div className="company-stat-card">

                        <div className="company-stat-icon red">

                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M3 21h18" />
                                <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                                <path d="M9 7h2" />
                                <path d="M13 7h2" />
                                <path d="M9 11h2" />
                                <path d="M13 11h2" />
                                <path d="M9 15h2" />
                                <path d="M13 15h2" />
                            </svg>

                        </div>

                        <strong>
                            {totalCompanies}
                        </strong>

                        <span>
                            Total Perusahaan
                        </span>

                    </div>


                    <div className="company-stat-card">

                        <div className="company-stat-icon blue">

                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M20 6 9 17l-5-5" />
                            </svg>

                        </div>

                        <strong>
                            {activeCompanies}
                        </strong>

                        <span>
                            Perusahaan Aktif
                        </span>

                    </div>


                    <div className="company-stat-card">

                        <div className="company-stat-icon orange">

                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M12 3v18" />
                                <path d="M5 12h14" />
                            </svg>

                        </div>

                        <strong>
                            {inactiveCompanies}
                        </strong>

                        <span>
                            Tidak Aktif
                        </span>

                    </div>


                    <div className="company-stat-card">

                        <div className="company-stat-icon purple">

                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>

                        </div>

                        <strong>
                            {totalAlumniWorking}
                        </strong>

                        <span>
                            Alumni Bekerja
                        </span>

                    </div>

                </div>


                {/* =================================================
                    ANALYSIS
                ================================================= */}

                <div className="company-analysis-grid">


                    {/* TOP COMPANIES */}

                    <div className="company-analysis-card">

                        <div className="company-card-header">

                            <div>

                                <h3>
                                    Perusahaan dengan Alumni Terbanyak
                                </h3>

                                <p>
                                    Perusahaan dengan jumlah alumni terbanyak
                                </p>

                            </div>

                            <span className="company-card-icon">

                                <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M3 3v18h18" />
                                    <path d="m7 16 4-5 3 3 5-7" />
                                </svg>

                            </span>

                        </div>


                        <div className="company-top-list">

                            {topCompanies.map((company, index) => (

                                <div
                                    className="company-top-item"
                                    key={company.id}
                                >

                                    <div className="company-top-number">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    <div className="company-top-info">

                                        <strong>
                                            {company.name}
                                        </strong>

                                        <span>
                                            {company.industry}
                                        </span>

                                        <div className="company-mini-progress">

                                            <span
                                                style={{
                                                    width: `${Math.max(
                                                        15,
                                                        (company.alumni /
                                                            topCompanies[0].alumni) *
                                                        100
                                                    )}%`
                                                }}
                                            ></span>

                                        </div>

                                    </div>

                                    <strong className="company-top-count">
                                        {company.alumni}
                                    </strong>

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* INDUSTRY */}

                    <div className="company-analysis-card">

                        <div className="company-card-header">

                            <div>

                                <h3>
                                    Distribusi Industri
                                </h3>

                                <p>
                                    Bidang industri tempat alumni bekerja
                                </p>

                            </div>

                            <span className="company-card-icon purple-icon">

                                <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M4 19V5" />
                                    <path d="M4 19h16" />
                                    <path d="M8 16v-5" />
                                    <path d="M12 16V8" />
                                    <path d="M16 16v-3" />
                                </svg>

                            </span>

                        </div>


                        <div className="company-industry-list">

                            {industryData.map(industry => (

                                <div
                                    className="company-industry-item"
                                    key={industry.name}
                                >

                                    <div className="company-industry-label">

                                        <span>
                                            {industry.name}
                                        </span>

                                        <strong>
                                            {industry.percentage}%
                                        </strong>

                                    </div>

                                    <div className="company-industry-progress">

                                        <span
                                            style={{
                                                width: `${industry.percentage}%`
                                            }}
                                        ></span>

                                    </div>

                                    <small>
                                        {industry.value} alumni
                                    </small>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>


                {/* =================================================
                    COMPANY TABLE
                ================================================= */}

                <div className="company-table-card">

                    <div className="company-table-header">

                        <div>

                            <h3>
                                Data Perusahaan
                            </h3>

                            <p>
                                Daftar perusahaan dan instansi tempat alumni bekerja
                            </p>

                        </div>

                    </div>


                    {/* FILTER */}

                    <div className="company-filter-area">

                        <div className="company-search">

                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle
                                    cx="11"
                                    cy="11"
                                    r="7"
                                />

                                <path d="m20 20-3.5-3.5" />

                            </svg>

                            <input
                                type="text"
                                placeholder="Cari nama perusahaan, industri, atau kota..."
                                value={search}
                                onChange={e =>
                                    handleSearch(e.target.value)
                                }
                            />

                        </div>


                        <select
                            value={industryFilter}
                            onChange={e =>
                                handleIndustryFilter(e.target.value)
                            }
                            className="company-filter-select"
                        >

                            <option>
                                Semua Industri
                            </option>

                            <option value="Teknologi">
                                Teknologi
                            </option>

                            <option value="Telekomunikasi">
                                Telekomunikasi
                            </option>

                            <option value="Perbankan">
                                Perbankan
                            </option>

                            <option value="E-Commerce">
                                E-Commerce
                            </option>

                            <option value="Energi">
                                Energi
                            </option>

                            <option value="Otomotif">
                                Otomotif
                            </option>

                            <option value="Transportasi">
                                Transportasi
                            </option>

                            <option value="Manufaktur">
                                Manufaktur
                            </option>

                        </select>


                        <select
                            value={cityFilter}
                            onChange={e =>
                                handleCityFilter(e.target.value)
                            }
                            className="company-filter-select"
                        >

                            <option>
                                Semua Kota
                            </option>

                            <option value="Jakarta">
                                Jakarta
                            </option>

                            <option value="Bandung">
                                Bandung
                            </option>

                            <option value="Semarang">
                                Semarang
                            </option>

                            <option value="Kudus">
                                Kudus
                            </option>

                        </select>


                        <select
                            value={statusFilter}
                            onChange={e =>
                                handleStatusFilter(e.target.value)
                            }
                            className="company-filter-select"
                        >

                            <option>
                                Semua Status
                            </option>

                            <option value="Aktif">
                                Aktif
                            </option>

                            <option value="Tidak Aktif">
                                Tidak Aktif
                            </option>

                        </select>


                        <button
                            type="button"
                            className="company-reset-button"
                            onClick={resetFilter}
                        >
                            Reset
                        </button>

                    </div>


                    {/* TABLE */}

                    <div className="company-table-wrapper">

                        <table className="company-table">

                            <thead>

                                <tr>

                                    <th>
                                        NO
                                    </th>

                                    <th>
                                        PERUSAHAAN
                                    </th>

                                    <th>
                                        INDUSTRI
                                    </th>

                                    <th>
                                        LOKASI
                                    </th>

                                    <th>
                                        ALUMNI
                                    </th>

                                    <th>
                                        STATUS
                                    </th>

                                    <th>
                                        AKSI
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {paginatedCompanies.length > 0 ? (

                                    paginatedCompanies.map(
                                        (company, index) => (

                                            <tr key={company.id}>

                                                <td className="company-number">

                                                    {(currentPage - 1) *
                                                        itemsPerPage +
                                                        index +
                                                        1}

                                                </td>


                                                <td>

                                                    <div className="company-name-cell">

                                                        <div className="company-logo">

                                                            {company.name
                                                                .split(' ')
                                                                .filter(word =>
                                                                    word.length > 1
                                                                )
                                                                .slice(0, 2)
                                                                .map(word =>
                                                                    word[0]
                                                                )
                                                                .join('')
                                                                .toUpperCase()}

                                                        </div>

                                                        <div>

                                                            <strong>
                                                                {company.name}
                                                            </strong>

                                                            <span>
                                                                Berdiri {company.founded}
                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>


                                                <td>

                                                    <span className="company-industry-badge">
                                                        {company.industry}
                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="company-location">

                                                        <svg
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                        >
                                                            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                                                            <circle
                                                                cx="12"
                                                                cy="10"
                                                                r="2.5"
                                                            />
                                                        </svg>

                                                        <span>
                                                            {company.city}
                                                        </span>

                                                    </div>

                                                </td>


                                                <td>

                                                    <strong className="company-alumni-count">
                                                        {company.alumni}
                                                    </strong>

                                                </td>


                                                <td>

                                                    <span
                                                        className={`company-status ${getStatusClass(
                                                            company.status
                                                        )}`}
                                                    >

                                                        <i></i>

                                                        {company.status}

                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="company-action-buttons">

                                                        <button
                                                            type="button"
                                                            className="company-detail-button"
                                                            onClick={() =>
                                                                setSelectedCompany(
                                                                    company
                                                                )
                                                            }
                                                        >

                                                            <svg
                                                                width="15"
                                                                height="15"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <circle
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="9"
                                                                />

                                                                <path d="M12 11v5" />

                                                                <path d="M12 8h.01" />

                                                            </svg>

                                                            Detail

                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="company-edit-button"
                                                            onClick={() =>
                                                                openEditModal(
                                                                    company
                                                                )
                                                            }
                                                        >

                                                            <svg
                                                                width="15"
                                                                height="15"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <path d="M12 20h9" />
                                                                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                                                            </svg>

                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="company-delete-button"
                                                            onClick={() =>
                                                                handleDeleteCompany(
                                                                    company
                                                                )
                                                            }
                                                        >

                                                            <svg
                                                                width="15"
                                                                height="15"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <path d="M3 6h18" />
                                                                <path d="M8 6V4h8v2" />
                                                                <path d="M19 6l-1 15H6L5 6" />
                                                                <path d="M10 11v6" />
                                                                <path d="M14 11v6" />
                                                            </svg>

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="company-empty-row"
                                        >

                                            <div>

                                                <svg
                                                    width="38"
                                                    height="38"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                >
                                                    <circle
                                                        cx="11"
                                                        cy="11"
                                                        r="7"
                                                    />

                                                    <path d="m20 20-3.5-3.5" />

                                                </svg>

                                                <strong>
                                                    Data tidak ditemukan
                                                </strong>

                                                <span>
                                                    Coba ubah kata pencarian atau filter.
                                                </span>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* PAGINATION */}

                    <div className="company-pagination">

                        <span>

                            Menampilkan{' '}

                            <strong>
                                {paginatedCompanies.length}
                            </strong>{' '}

                            dari{' '}

                            <strong>
                                {filteredCompanies.length}
                            </strong>{' '}

                            perusahaan

                        </span>


                        <div className="company-pagination-buttons">

                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(prev =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                            >
                                ‹
                            </button>


                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map(page => (

                                <button
                                    key={page}
                                    type="button"
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

                            ))}


                            <button
                                type="button"
                                disabled={
                                    currentPage === totalPages ||
                                    totalPages === 0
                                }
                                onClick={() =>
                                    setCurrentPage(prev =>
                                        Math.min(
                                            prev + 1,
                                            totalPages
                                        )
                                    )
                                }
                            >
                                ›
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                DETAIL MODAL
            ===================================================== */}

            {selectedCompany && (

                <div
                    className="company-modal-overlay"
                    onClick={() =>
                        setSelectedCompany(null)
                    }
                >

                    <div
                        className="company-detail-modal"
                        onClick={e =>
                            e.stopPropagation()
                        }
                    >

                        <div className="company-modal-header">

                            <div className="company-modal-profile">

                                <div className="company-modal-logo">

                                    {selectedCompany.name
                                        .split(' ')
                                        .filter(word =>
                                            word.length > 1
                                        )
                                        .slice(0, 2)
                                        .map(word =>
                                            word[0]
                                        )
                                        .join('')
                                        .toUpperCase()}

                                </div>


                                <div>

                                    <span>
                                        DATA PERUSAHAAN
                                    </span>

                                    <h3>
                                        {selectedCompany.name}
                                    </h3>

                                    <p>
                                        {selectedCompany.city}
                                    </p>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="company-modal-close"
                                onClick={() =>
                                    setSelectedCompany(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="company-modal-status">

                            <span
                                className={`company-status ${getStatusClass(
                                    selectedCompany.status
                                )}`}
                            >

                                <i></i>

                                {selectedCompany.status}

                            </span>


                            <span className="company-modal-industry">
                                {selectedCompany.industry}
                            </span>

                        </div>


                        <div className="company-modal-content">


                            {/* INFORMATION */}

                            <div className="company-modal-section">

                                <h4>
                                    Informasi Perusahaan
                                </h4>


                                <div className="company-detail-grid">

                                    <div>

                                        <span>
                                            Industri
                                        </span>

                                        <strong>
                                            {selectedCompany.industry}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Tahun Berdiri
                                        </span>

                                        <strong>
                                            {selectedCompany.founded}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Lokasi
                                        </span>

                                        <strong>
                                            {selectedCompany.city}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Total Alumni
                                        </span>

                                        <strong>
                                            {selectedCompany.alumni}
                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* ADDRESS */}

                            <div className="company-modal-section">

                                <h4>
                                    Alamat
                                </h4>

                                <div className="company-address">

                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                                        <circle
                                            cx="12"
                                            cy="10"
                                            r="2.5"
                                        />
                                    </svg>

                                    <span>
                                        {selectedCompany.address}
                                    </span>

                                </div>

                            </div>


                            {/* WEBSITE */}

                            <div className="company-modal-section">

                                <h4>
                                    Website
                                </h4>

                                <div className="company-website">

                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="9"
                                        />
                                        <path d="M3 12h18" />
                                        <path d="M12 3a14 14 0 0 1 0 18" />
                                        <path d="M12 3a14 14 0 0 0 0 18" />
                                    </svg>

                                    <span>
                                        {selectedCompany.website}
                                    </span>

                                </div>

                            </div>


                            {/* ALUMNI */}

                            <div className="company-modal-section">

                                <h4>
                                    Ringkasan Alumni
                                </h4>

                                <div className="company-alumni-summary">

                                    <div>

                                        <strong>
                                            {selectedCompany.alumni}
                                        </strong>

                                        <span>
                                            Alumni bekerja
                                        </span>

                                    </div>

                                    <div>

                                        <strong>
                                            {selectedCompany.status === 'Aktif'
                                                ? 'Aktif'
                                                : 'Tidak Aktif'}
                                        </strong>

                                        <span>
                                            Status perusahaan
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="company-modal-footer">

                            <button
                                type="button"
                                className="company-modal-edit"
                                onClick={() => {

                                    const company =
                                        selectedCompany

                                    setSelectedCompany(null)

                                    openEditModal(company)

                                }}
                            >

                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                                </svg>

                                Edit

                            </button>


                            <button
                                type="button"
                                className="company-modal-close-button"
                                onClick={() =>
                                    setSelectedCompany(null)
                                }
                            >
                                Tutup
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =====================================================
                ADD / EDIT MODAL
            ===================================================== */}

            {showCompanyModal && (

                <div
                    className="company-modal-overlay"
                    onClick={closeCompanyModal}
                >

                    <div
                        className="company-form-modal"
                        onClick={e =>
                            e.stopPropagation()
                        }
                    >

                        <div className="company-form-header">

                            <div>

                                <span>
                                    DATA PERUSAHAAN
                                </span>

                                <h3>
                                    {editingCompany
                                        ? 'Edit Perusahaan'
                                        : 'Tambah Perusahaan'}
                                </h3>

                                <p>
                                    {editingCompany
                                        ? 'Perbarui informasi perusahaan.'
                                        : 'Tambahkan perusahaan atau instansi baru.'}
                                </p>

                            </div>


                            <button
                                type="button"
                                className="company-modal-close"
                                onClick={closeCompanyModal}
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={handleSaveCompany}
                            className="company-form"
                        >

                            <div className="company-form-grid">


                                <div className="company-form-group full">

                                    <label>
                                        Nama Perusahaan
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        placeholder="Contoh: PT Telkom Indonesia"
                                        required
                                    />

                                </div>


                                <div className="company-form-group">

                                    <label>
                                        Industri
                                    </label>

                                    <select
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleFormChange}
                                        required
                                    >

                                        <option value="">
                                            Pilih industri
                                        </option>

                                        <option value="Teknologi">
                                            Teknologi
                                        </option>

                                        <option value="Telekomunikasi">
                                            Telekomunikasi
                                        </option>

                                        <option value="Perbankan">
                                            Perbankan
                                        </option>

                                        <option value="E-Commerce">
                                            E-Commerce
                                        </option>

                                        <option value="Energi">
                                            Energi
                                        </option>

                                        <option value="Otomotif">
                                            Otomotif
                                        </option>

                                        <option value="Transportasi">
                                            Transportasi
                                        </option>

                                        <option value="Manufaktur">
                                            Manufaktur
                                        </option>

                                    </select>

                                </div>


                                <div className="company-form-group">

                                    <label>
                                        Kota / Lokasi
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleFormChange}
                                        placeholder="Contoh: Jakarta"
                                        required
                                    />

                                </div>


                                <div className="company-form-group full">

                                    <label>
                                        Alamat
                                    </label>

                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleFormChange}
                                        placeholder="Masukkan alamat perusahaan"
                                        rows="3"
                                    ></textarea>

                                </div>


                                <div className="company-form-group">

                                    <label>
                                        Website
                                    </label>

                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleFormChange}
                                        placeholder="https://..."
                                    />

                                </div>


                                <div className="company-form-group">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleFormChange}
                                    >

                                        <option value="Aktif">
                                            Aktif
                                        </option>

                                        <option value="Tidak Aktif">
                                            Tidak Aktif
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div className="company-form-footer">

                                <button
                                    type="button"
                                    className="company-cancel-button"
                                    onClick={closeCompanyModal}
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className="company-save-button"
                                >

                                    {editingCompany
                                        ? 'Simpan Perubahan'
                                        : 'Simpan Perusahaan'}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </AdminLayout>
    )
}
