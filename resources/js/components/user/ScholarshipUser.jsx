import React, { useEffect, useMemo, useState } from 'react'
import UserLayout from './UserLayout'

/* =========================================================
   API HELPERS
   ========================================================= */

const API_BASE = 'backend/api/v1'

function mapScholarshipFromApi(s) {
    return {
        id: s.id,
        slug: s.slug,
        name: s.title,
        provider: s.provider,
        type: s.funding_type === 'Penuh' ? 'Beasiswa Pemerintah' : 'Beasiswa Kampus',
        level: s.level || '-',
        coverage: s.funding_type || '-',
        deadline: s.deadline
            ? new Date(s.deadline).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
              })
            : '-',
        location: s.location || '-',
        category: s.field || 'Umum',
        description: s.description || '',
        requirements: s.requirements || [],
        website: s.registration_url || '#',
        status:
            s.status === 'published' &&
            (!s.deadline || new Date(s.deadline) >= new Date())
                ? 'Dibuka'
                : 'Ditutup',
    }
}

/* =========================================================
   DATA BEASISWA (fallback jika API belum terhubung)
   ========================================================= */

const fallbackScholarships = [
    {
        id: 1,

        name: 'Beasiswa Telkom University',
        provider: 'Telkom University',
        type: 'Beasiswa Kampus',
        level: 'S1',
        coverage: 'Penuh',
        deadline: '30 September 2026',
        location: 'Bandung',
        category: 'Prestasi',
        description:
            'Program beasiswa bagi calon mahasiswa berprestasi yang ingin melanjutkan pendidikan di Telkom University.',
        requirements: [
            'Lulusan SMA/SMK sederajat',
            'Memiliki prestasi akademik atau nonakademik',
            'Memenuhi persyaratan pendaftaran Telkom University',
            'Mengikuti proses seleksi beasiswa',
        ],
        website: 'https://telkomuniversity.ac.id',
        status: 'Dibuka',
    },
    {
        id: 2,
        name: 'Beasiswa Unggulan',
        provider: 'Kementerian Pendidikan',
        type: 'Beasiswa Pemerintah',
        level: 'S1 / S2 / S3',
        coverage: 'Penuh',
        deadline: '15 Oktober 2026',
        location: 'Nasional',
        category: 'Prestasi',
        description:
            'Beasiswa pendidikan untuk masyarakat Indonesia berprestasi yang ingin melanjutkan pendidikan tinggi.',
        requirements: [
            'Warga Negara Indonesia',
            'Memiliki prestasi akademik atau nonakademik',
            'Memiliki rekam jejak prestasi yang baik',
            'Memenuhi persyaratan administrasi program',
        ],
        website: 'https://beasiswaunggulan.kemdikbud.go.id',
        status: 'Dibuka',
    },
    {
        id: 3,
        name: 'KIP Kuliah',
        provider: 'Kementerian Pendidikan',
        type: 'Beasiswa Pemerintah',
        level: 'S1 / D4 / D3',
        coverage: 'Penuh',
        deadline: '25 September 2026',
        location: 'Nasional',
        category: 'Ekonomi',
        description:
            'Bantuan pendidikan bagi lulusan SMA/SMK sederajat yang memiliki potensi akademik tetapi memiliki keterbatasan ekonomi.',
        requirements: [
            'Lulusan SMA/SMK sederajat',
            'Memiliki potensi akademik yang baik',
            'Memiliki keterbatasan ekonomi sesuai ketentuan',
            'Memiliki dokumen pendukung sesuai persyaratan',
        ],
        website: 'https://kip-kuliah.kemdikbud.go.id',
        status: 'Dibuka',
    },
    {
        id: 4,
        name: 'Beasiswa Bank Indonesia',
        provider: 'Bank Indonesia',
        type: 'Beasiswa Perusahaan',
        level: 'S1 / D4',
        coverage: 'Sebagian',
        deadline: '10 Oktober 2026',
        location: 'Nasional',
        category: 'Prestasi',
        description:
            'Program beasiswa bagi mahasiswa berprestasi yang disertai pembinaan dan pengembangan komunitas Generasi Baru Indonesia.',
        requirements: [
            'Mahasiswa aktif pada perguruan tinggi',
            'Memiliki prestasi akademik yang baik',
            'Memenuhi ketentuan usia dan semester',
            'Bersedia mengikuti program pembinaan',
        ],
        website: 'https://www.bi.go.id',
        status: 'Dibuka',
    },
    {
        id: 5,
        name: 'Beasiswa BCA Finance',
        provider: 'BCA Finance',
        type: 'Beasiswa Perusahaan',
        level: 'S1',
        coverage: 'Sebagian',
        deadline: '20 Oktober 2026',
        location: 'Nasional',
        category: 'Prestasi',
        description:
            'Beasiswa pendidikan bagi mahasiswa S1 berprestasi dari berbagai perguruan tinggi di Indonesia.',
        requirements: [
            'Mahasiswa aktif program S1',
            'Memiliki prestasi akademik yang baik',
            'Memiliki IPK sesuai ketentuan program',
            'Tidak sedang menerima beasiswa lain',
        ],
        website: 'https://www.bcafinance.co.id',
        status: 'Dibuka',
    },
    {
        id: 6,
        name: 'Beasiswa Djarum Plus',
        provider: 'Djarum Foundation',
        type: 'Beasiswa Perusahaan',
        level: 'S1',
        coverage: 'Sebagian',
        deadline: '31 Oktober 2026',
        location: 'Nasional',
        category: 'Prestasi',
        description:
            'Program beasiswa yang memberikan bantuan finansial sekaligus berbagai pelatihan soft skill bagi mahasiswa berprestasi.',
        requirements: [
            'Mahasiswa aktif program S1',
            'Memiliki IPK sesuai ketentuan',
            'Aktif mengikuti kegiatan organisasi',
            'Bersedia mengikuti rangkaian program Djarum Beasiswa Plus',
        ],
        website: 'https://www.djarumfoundation.org',
        status: 'Dibuka',
    },
    {
        id: 7,
        name: 'Beasiswa LPDP',
        provider: 'LPDP',
        type: 'Beasiswa Pemerintah',
        level: 'S2 / S3',
        coverage: 'Penuh',
        deadline: '15 November 2026',
        location: 'Nasional',
        category: 'Akademik',
        description:
            'Beasiswa pendidikan tinggi untuk jenjang magister dan doktor bagi warga negara Indonesia.',
        requirements: [
            'Warga Negara Indonesia',
            'Telah menyelesaikan pendidikan sesuai jenjang yang dipilih',
            'Memenuhi persyaratan akademik',
            'Memenuhi persyaratan administrasi dan seleksi LPDP',
        ],
        website: 'https://lpdp.kemenkeu.go.id',
        status: 'Dibuka',
    },
    {
        id: 8,
        name: 'Beasiswa Prestasi Akademik',
        provider: 'Universitas Indonesia',
        type: 'Beasiswa Kampus',
        level: 'S1',
        coverage: 'Sebagian',
        deadline: '5 Oktober 2026',
        location: 'Depok',
        category: 'Akademik',
        description:
            'Program beasiswa bagi mahasiswa dengan prestasi akademik yang baik selama masa studi.',
        requirements: [
            'Mahasiswa aktif Universitas Indonesia',
            'Memiliki prestasi akademik yang baik',
            'Memenuhi ketentuan IPK minimum',
            'Memenuhi persyaratan administrasi kampus',
        ],
        website: 'https://ui.ac.id',
        status: 'Dibuka',
    },
    {
        id: 9,
        name: 'Beasiswa UGM',
        provider: 'Universitas Gadjah Mada',
        type: 'Beasiswa Kampus',
        level: 'S1',
        coverage: 'Sebagian',
        deadline: '12 Oktober 2026',
        location: 'Yogyakarta',
        category: 'Prestasi',
        description:
            'Berbagai program bantuan pendidikan untuk mahasiswa Universitas Gadjah Mada.',
        requirements: [
            'Mahasiswa aktif Universitas Gadjah Mada',
            'Memiliki prestasi akademik atau nonakademik',
            'Memenuhi persyaratan program beasiswa',
            'Mengikuti proses seleksi sesuai ketentuan',
        ],
        website: 'https://ugm.ac.id',
        status: 'Dibuka',
    },
    {
        id: 10,
        name: 'Beasiswa Mahasiswa Berprestasi',
        provider: 'Universitas Lambung Mangkurat',
        type: 'Beasiswa Kampus',
        level: 'S1 / D4',
        coverage: 'Sebagian',
        deadline: '18 Oktober 2026',
        location: 'Banjarmasin',
        category: 'Prestasi',
        description:
            'Program bantuan pendidikan bagi mahasiswa berprestasi di lingkungan Universitas Lambung Mangkurat.',
        requirements: [
            'Mahasiswa aktif Universitas Lambung Mangkurat',
            'Memiliki prestasi akademik atau nonakademik',
            'Memenuhi persyaratan akademik',
            'Melengkapi dokumen administrasi yang dibutuhkan',
        ],
        website: 'https://ulm.ac.id',
        status: 'Dibuka',
    },
    {
        id: 11,
        name: 'Beasiswa Talenta Digital',
        provider: 'Program Talenta Digital',
        type: 'Beasiswa Program',
        level: 'S1 / D4 / D3',
        coverage: 'Sebagian',
        deadline: '5 November 2026',
        location: 'Nasional',
        category: 'Teknologi',
        description:
            'Program pengembangan talenta digital untuk generasi muda yang memiliki minat di bidang teknologi.',
        requirements: [
            'Memiliki minat di bidang teknologi digital',
            'Memenuhi ketentuan peserta program',
            'Memiliki kemampuan dasar sesuai bidang yang dipilih',
            'Mengikuti rangkaian program yang ditentukan',
        ],
        website: 'https://digitalent.komdigi.go.id',
        status: 'Dibuka',
    },
    {
        id: 12,
        name: 'Beasiswa Industri Kreatif',
        provider: 'Telkom Indonesia',
        type: 'Beasiswa Perusahaan',
        level: 'S1 / D4',
        coverage: 'Sebagian',
        deadline: '20 November 2026',
        location: 'Nasional',
        category: 'Kreatif',
        description:
            'Program beasiswa untuk mahasiswa yang memiliki minat dan prestasi di bidang industri kreatif dan teknologi.',
        requirements: [
            'Mahasiswa aktif program S1 atau D4',
            'Memiliki minat di bidang industri kreatif atau teknologi',
            'Memiliki prestasi atau portofolio yang relevan',
            'Memenuhi persyaratan administrasi program',
        ],
        website: 'https://www.telkom.co.id',
        status: 'Dibuka',
    },
]


/* =========================================================
   COMPONENT
   ========================================================= */

export default function ScholarshipUser() {

    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [levelFilter, setLevelFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [coverageFilter, setCoverageFilter] = useState('')

    const [selectedScholarship, setSelectedScholarship] =
        useState(null)

    const [currentPage, setCurrentPage] =
        useState(1)

    const [scholarshipData, setScholarshipData] = useState(fallbackScholarships)

    const itemsPerPage = 6


    /* =====================================================
       FETCH BEASISWA DARI API
       ===================================================== */

    useEffect(() => {
        let isMounted = true

        async function fetchScholarships() {
            try {
                const res = await fetch(`${API_BASE}/scholarships?per_page=100`)
                const json = await res.json()

                if (isMounted && json?.success && json.data?.data?.length) {
                    setScholarshipData(json.data.data.map(mapScholarshipFromApi))
                }
            } catch (err) {
                console.warn('Gagal memuat beasiswa dari API:', err)
            }
        }

        fetchScholarships()

        return () => {
            isMounted = false
        }
    }, [])


    /* =====================================================
       FILTER OPTIONS
       ===================================================== */

    const typeOptions = useMemo(() => {
        return [
            ...new Set(
                scholarshipData.map(
                    scholarship =>
                        scholarship.type
                )
            ),
        ]
    }, [scholarshipData])


    const levelOptions = useMemo(() => {
        return [
            ...new Set(
                scholarshipData.map(
                    scholarship =>
                        scholarship.level
                )
            ),
        ]
    }, [scholarshipData])


    const categoryOptions = useMemo(() => {
        return [
            ...new Set(
                scholarshipData.map(
                    scholarship =>
                        scholarship.category
                )
            ),
        ]
    }, [scholarshipData])


    const coverageOptions = useMemo(() => {
        return [
            ...new Set(
                scholarshipData.map(
                    scholarship =>
                        scholarship.coverage
                )
            ),
        ]
    }, [scholarshipData])


    /* =====================================================
       FILTER BEASISWA
       ===================================================== */

    const filteredScholarships = useMemo(() => {

        const keyword =
            search.trim().toLowerCase()

        return scholarshipData.filter(
            scholarship => {

                const matchesSearch =
                    !keyword ||
                    scholarship.name
                        .toLowerCase()
                        .includes(keyword) ||
                    scholarship.provider
                        .toLowerCase()
                        .includes(keyword) ||
                    scholarship.type
                        .toLowerCase()
                        .includes(keyword) ||
                    scholarship.level
                        .toLowerCase()
                        .includes(keyword) ||
                    scholarship.category
                        .toLowerCase()
                        .includes(keyword) ||
                    scholarship.location
                        .toLowerCase()
                        .includes(keyword)

                const matchesType =
                    !typeFilter ||
                    scholarship.type ===
                        typeFilter

                const matchesLevel =
                    !levelFilter ||
                    scholarship.level ===
                        levelFilter

                const matchesCategory =
                    !categoryFilter ||
                    scholarship.category ===
                        categoryFilter

                const matchesCoverage =
                    !coverageFilter ||
                    scholarship.coverage ===
                        coverageFilter

                return (
                    matchesSearch &&
                    matchesType &&
                    matchesLevel &&
                    matchesCategory &&
                    matchesCoverage
                )
            }
        )

    }, [
        scholarshipData,
        search,
        typeFilter,
        levelFilter,
        categoryFilter,
        coverageFilter,
    ])


    /* =====================================================
       RECOMMENDED SCHOLARSHIPS
       ===================================================== */

    const recommendedScholarships =
        useMemo(() => {

            return scholarshipData
                .filter(
                    scholarship =>
                        scholarship.status ===
                        'Dibuka'
                )
                .slice(0, 3)

        }, [scholarshipData])


    /* =====================================================
       PAGINATION
       ===================================================== */

    const totalPages = Math.ceil(
        filteredScholarships.length /
            itemsPerPage
    )

    const paginatedScholarships =
        filteredScholarships.slice(
            (currentPage - 1) *
                itemsPerPage,
            currentPage *
                itemsPerPage
        )


    /* =====================================================
       HANDLER
       ===================================================== */

    const handleFilterChange = (
        setter,
        value
    ) => {
        setter(value)
        setCurrentPage(1)
    }


    const resetFilters = () => {
        setSearch('')
        setTypeFilter('')
        setLevelFilter('')
        setCategoryFilter('')
        setCoverageFilter('')
        setCurrentPage(1)
    }


    const hasFilter =
        search ||
        typeFilter ||
        levelFilter ||
        categoryFilter ||
        coverageFilter


    /* =====================================================
       RENDER
       ===================================================== */

    return (
        <UserLayout>

            <div className="scholarship-user-page">

                {/* =================================================
                    HERO
                   ================================================= */}

                <section className="scholarship-user-hero">

                    <div className="scholarship-hero-content">

                        <span className="scholarship-hero-badge">
                            BEASISWA
                        </span>

                        <h1>
                            Temukan Beasiswa
                            <br />
                            untuk Masa Depanmu
                        </h1>

                        <p>
                            Temukan berbagai informasi beasiswa
                            untuk membantu mewujudkan rencana
                            pendidikanmu setelah lulus.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    SEARCH & FILTER
                   ================================================= */}

                <section className="scholarship-search-section">

                    <div className="scholarship-search-box">

                        <span className="scholarship-search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={e =>
                                handleFilterChange(
                                    setSearch,
                                    e.target.value
                                )
                            }
                            placeholder="Cari nama beasiswa, penyelenggara, jenjang..."
                        />

                    </div>


                    <div className="scholarship-filter-grid">

                        <FilterSelect
                            label="Jenis Beasiswa"
                            value={typeFilter}
                            options={typeOptions}
                            placeholder="Semua Jenis"
                            onChange={value =>
                                handleFilterChange(
                                    setTypeFilter,
                                    value
                                )
                            }
                        />

                        <FilterSelect
                            label="Jenjang Pendidikan"
                            value={levelFilter}
                            options={levelOptions}
                            placeholder="Semua Jenjang"
                            onChange={value =>
                                handleFilterChange(
                                    setLevelFilter,
                                    value
                                )
                            }
                        />

                        <FilterSelect
                            label="Kategori"
                            value={categoryFilter}
                            options={categoryOptions}
                            placeholder="Semua Kategori"
                            onChange={value =>
                                handleFilterChange(
                                    setCategoryFilter,
                                    value
                                )
                            }
                        />

                        <FilterSelect
                            label="Cakupan"
                            value={coverageFilter}
                            options={coverageOptions}
                            placeholder="Semua Cakupan"
                            onChange={value =>
                                handleFilterChange(
                                    setCoverageFilter,
                                    value
                                )
                            }
                        />

                    </div>


                    {hasFilter && (

                        <button
                            type="button"
                            className="scholarship-reset-filter"
                            onClick={resetFilters}
                        >
                            Reset Filter
                        </button>

                    )}

                </section>


                {/* =================================================
                    RECOMMENDATION
                   ================================================= */}

                {!hasFilter && (

                    <section className="scholarship-recommendation-section">

                        <div className="scholarship-section-heading">

                            <div>

                                <span className="scholarship-section-label">
                                    REKOMENDASI
                                </span>

                                <h2>
                                    Beasiswa yang Bisa Kamu Coba
                                </h2>

                                <p>
                                    Beberapa pilihan beasiswa
                                    yang sedang dibuka.
                                </p>

                            </div>

                        </div>


                        <div className="scholarship-recommendation-grid">

                            {recommendedScholarships.map(
                                scholarship => (

                                <ScholarshipCard
                                    key={scholarship.id}
                                    scholarship={scholarship}
                                    recommendation
                                    onDetail={() =>
                                        setSelectedScholarship(
                                            scholarship
                                        )
                                    }
                                />

                            ))}

                        </div>

                    </section>

                )}


                {/* =================================================
                    ALL SCHOLARSHIPS
                   ================================================= */}

                <section className="scholarship-all-section">

                    <div className="scholarship-section-heading">

                        <div>

                            <span className="scholarship-section-label">
                                DAFTAR BEASISWA
                            </span>

                            <h2>
                                Semua Beasiswa
                            </h2>

                            <p>
                                {filteredScholarships.length}{' '}
                                beasiswa ditemukan
                            </p>

                        </div>

                        <span className="scholarship-total-badge">
                            {filteredScholarships.length}
                        </span>

                    </div>


                    {paginatedScholarships.length > 0 ? (

                        <div className="scholarship-card-grid">

                            {paginatedScholarships.map(
                                scholarship => (

                                <ScholarshipCard
                                    key={scholarship.id}
                                    scholarship={scholarship}
                                    onDetail={() =>
                                        setSelectedScholarship(
                                            scholarship
                                        )
                                    }
                                />

                            ))}

                        </div>

                    ) : (

                        <div className="scholarship-empty-state">

                            <div>
                                🔎
                            </div>

                            <h3>
                                Beasiswa tidak ditemukan
                            </h3>

                            <p>
                                Coba ubah kata pencarian
                                atau kombinasi filter.
                            </p>

                            <button
                                type="button"
                                onClick={resetFilters}
                            >
                                Reset Filter
                            </button>

                        </div>

                    )}

                </section>


                {/* =================================================
                    PAGINATION
                   ================================================= */}

                {totalPages > 1 && (

                    <div className="scholarship-pagination">

                        <button
                            type="button"
                            disabled={
                                currentPage === 1
                            }
                            onClick={() =>
                                setCurrentPage(
                                    prev =>
                                        Math.max(
                                            prev - 1,
                                            1
                                        )
                                )
                            }
                        >
                            ←
                        </button>


                        {Array.from(
                            {
                                length:
                                    totalPages,
                            },
                            (_, index) =>
                                index + 1
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
                                    setCurrentPage(
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
                                setCurrentPage(
                                    prev =>
                                        Math.min(
                                            prev + 1,
                                            totalPages
                                        )
                                )
                            }
                        >
                            →
                        </button>

                    </div>

                )}

            </div>


            {/* =====================================================
                DETAIL MODAL
               ===================================================== */}

            {selectedScholarship && (

                <div
                    className="scholarship-modal-overlay"
                    onClick={() =>
                        setSelectedScholarship(null)
                    }
                >

                    <div
                        className="scholarship-modal"
                        onClick={e =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            type="button"
                            className="scholarship-modal-close"
                            onClick={() =>
                                setSelectedScholarship(
                                    null
                                )
                            }
                        >
                            ×
                        </button>


                        {/* HEADER */}

                        <div className="scholarship-modal-header">

                            <div>

                                <span className="scholarship-type-badge">
                                    {
                                        selectedScholarship.type
                                    }
                                </span>

                                <h2>
                                    {
                                        selectedScholarship.name
                                    }
                                </h2>

                                <p>
                                    {
                                        selectedScholarship.provider
                                    }
                                </p>

                            </div>

                        </div>


                        {/* STATS */}

                        <div className="scholarship-modal-stats">

                            <div>
                                <strong>
                                    {
                                        selectedScholarship.level
                                    }
                                </strong>

                                <span>
                                    Jenjang
                                </span>
                            </div>

                            <div>
                                <strong>
                                    {
                                        selectedScholarship.coverage
                                    }
                                </strong>

                                <span>
                                    Cakupan
                                </span>
                            </div>

                            <div>
                                <strong>
                                    {
                                        selectedScholarship.deadline
                                    }
                                </strong>

                                <span>
                                    Deadline
                                </span>
                            </div>

                        </div>


                        {/* DESCRIPTION */}

                        <div className="scholarship-modal-section">

                            <span className="scholarship-modal-section-label">
                                TENTANG BEASISWA
                            </span>

                            <h3>
                                Informasi Beasiswa
                            </h3>

                            <p className="scholarship-modal-description">
                                {
                                    selectedScholarship.description
                                }
                            </p>

                        </div>


                        {/* DETAIL */}

                        <div className="scholarship-modal-section">

                            <span className="scholarship-modal-section-label">
                                DETAIL
                            </span>

                            <h3>
                                Informasi Pendaftaran
                            </h3>


                            <div className="scholarship-detail-list">

                                <div>
                                    <span>
                                        Penyelenggara
                                    </span>

                                    <strong>
                                        {
                                            selectedScholarship.provider
                                        }
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Jenjang
                                    </span>

                                    <strong>
                                        {
                                            selectedScholarship.level
                                        }
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Kategori
                                    </span>

                                    <strong>
                                        {
                                            selectedScholarship.category
                                        }
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Lokasi
                                    </span>

                                    <strong>
                                        {
                                            selectedScholarship.location
                                        }
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Cakupan
                                    </span>

                                    <strong>
                                        {
                                            selectedScholarship.coverage
                                        }
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Deadline
                                    </span>

                                    <strong>
                                        {
                                            selectedScholarship.deadline
                                        }
                                    </strong>
                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            PERSYARATAN
                           ================================================= */}

                        <div className="scholarship-modal-section">

                            <span className="scholarship-modal-section-label">
                                PERSYARATAN
                            </span>

                            <h3>
                                Persyaratan Beasiswa
                            </h3>

                            <ul className="scholarship-requirements-list">

                                {selectedScholarship.requirements?.map(
                                    (requirement, index) => (

                                    <li key={index}>
                                        {requirement}
                                    </li>

                                ))}

                            </ul>

                        </div>


                        {/* LINK */}

                        <div className="scholarship-modal-section">

                            <span className="scholarship-modal-section-label">
                                PENDAFTARAN
                            </span>

                            <h3>
                                Informasi Resmi
                            </h3>

                            <div className="scholarship-modal-links">

                                <a
                                    href={
                                        selectedScholarship.website
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>
                                        Website Resmi
                                    </span>

                                    <span>
                                        ↗
                                    </span>
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </UserLayout>
    )
}


/* =========================================================
   FILTER SELECT
   ========================================================= */

function FilterSelect({
    label,
    value,
    options,
    placeholder,
    onChange,
}) {
    return (
        <div className="scholarship-filter-item">

            <label>
                {label}
            </label>

            <select
                value={value}
                onChange={e =>
                    onChange(e.target.value)
                }
            >

                <option value="">
                    {placeholder}
                </option>

                {options.map(option => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}

            </select>

        </div>
    )
}


/* =========================================================
   SCHOLARSHIP CARD
   ========================================================= */

function ScholarshipCard({
    scholarship,
    onDetail,
    recommendation = false,
}) {

    return (

        <article
            className={
                recommendation
                    ? 'scholarship-recommendation-card'
                    : 'scholarship-card'
            }
        >

            {/* CARD HEADER */}

            <div
                className={
                    recommendation
                        ? 'scholarship-card-top'
                        : 'scholarship-card-header'
                }
            >

                <span className="scholarship-status-badge">
                    {scholarship.status}
                </span>

                <span className="scholarship-type-badge">
                    {scholarship.type}
                </span>

            </div>


            {/* TITLE */}

            <h3>
                {scholarship.name}
            </h3>


            {/* PROVIDER */}

            <p className="scholarship-provider">
                {scholarship.provider}
            </p>


            {/* DESCRIPTION */}

            <p className="scholarship-description">
                {scholarship.description}
            </p>


            {/* INFORMATION */}

            <div className="scholarship-card-info">

                <div>
                    <span>
                        Jenjang
                    </span>

                    <strong>
                        {scholarship.level}
                    </strong>
                </div>

                <div>
                    <span>
                        Deadline
                    </span>

                    <strong>
                        {scholarship.deadline}
                    </strong>
                </div>

            </div>


            {/* DETAIL */}

            <button
                type="button"
                className="scholarship-detail-button"
                onClick={onDetail}
            >
                Lihat Detail

                <span>
                    →
                </span>
            </button>

        </article>
    )
}
