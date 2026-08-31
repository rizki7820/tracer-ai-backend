import React, { useMemo, useState } from 'react'
import UserLayout from './UserLayout'

/* =========================================================
   DATA KAMPUS
   ========================================================= */

const campusData = [
    {
        id: 1,
        name: 'Universitas Telkom',
        type: 'Universitas',
        city: 'Bandung',
        province: 'Jawa Barat',
        alumni: 38,
        status: 'Aktif',
        website: 'https://telkomuniversity.ac.id',
        instagram: 'https://www.instagram.com/telkomuniversity/',
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
        instagram: 'https://www.instagram.com/univ_indonesia/',
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
        instagram: 'https://www.instagram.com/ugm.yogyakarta/',
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
        instagram:
            'https://www.instagram.com/universitaslambungmangkurat/',
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
        instagram: 'https://www.instagram.com/poliban_official/',
    },
    {
        id: 6,
        name: 'Institut Teknologi Sepuluh Nopember',
        type: 'Institut',
        city: 'Surabaya',
        province: 'Jawa Timur',
        alumni: 19,
        status: 'Aktif',
        website: 'https://www.its.ac.id',
        instagram: 'https://www.instagram.com/its_campus/',
    },
    {
        id: 7,
        name: 'Universitas Negeri Yogyakarta',
        type: 'Universitas',
        city: 'Sleman',
        province: 'DI Yogyakarta',
        alumni: 14,
        status: 'Aktif',
        website: 'https://uny.ac.id',
        instagram:
            'https://www.instagram.com/universitasnegeriyogyakarta/',
    },
    {
        id: 8,
        name: 'Politeknik Elektronika Negeri Surabaya',
        type: 'Politeknik',
        city: 'Surabaya',
        province: 'Jawa Timur',
        alumni: 16,
        status: 'Aktif',
        website: 'https://www.pens.ac.id',
        instagram: 'https://www.instagram.com/pensofficial/',
    },
]


/* =========================================================
   DATA TRACER ALUMNI
   ========================================================= */

const tracerData = [
    {
        id: 1,
        nama: 'Aulia Rahma',
        jurusan: 'Rekayasa Perangkat Lunak',
        statusSekarang: ['Kuliah', 'Bekerja'],
        pendidikan: [
            {
                universitas: 'Universitas Telkom',
                programStudi: 'Informatika',
                jenjang: 'S1',
            },
        ],
    },
    {
        id: 2,
        nama: 'Rizky Maulana',
        jurusan: 'Teknik Komputer Jaringan',
        statusSekarang: ['Bekerja'],
        pendidikan: [],
    },
    {
        id: 3,
        nama: 'Siti Aisyah',
        jurusan: 'Teknik Komputer Jaringan',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas: 'Universitas Indonesia',
                programStudi: 'Sistem Informasi',
                jenjang: 'S1',
            },
        ],
    },
    {
        id: 4,
        nama: 'Ahmad Fauzan',
        jurusan: 'Rekayasa Perangkat Lunak',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas: 'Universitas Telkom',
                programStudi: 'Informatika',
                jenjang: 'S1',
            },
        ],
    },
    {
        id: 5,
        nama: 'Putri Maharani',
        jurusan: 'Teknik Komputer Jaringan',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas: 'Universitas Bina Nusantara',
                programStudi: 'Sistem Informasi',
                jenjang: 'S1',
            },
        ],
    },
    {
        id: 6,
        nama: 'Aulia Putri',
        jurusan: 'Multimedia',
        statusSekarang: ['Kuliah', 'Wirausaha'],
        pendidikan: [
            {
                universitas:
                    'Institut Teknologi Sepuluh Nopember',
                programStudi: 'Desain Produk',
                jenjang: 'S1',
            },
        ],
    },
    {
        id: 7,
        nama: 'Fajar Nugraha',
        jurusan: 'Rekayasa Perangkat Lunak',
        statusSekarang: ['Bekerja'],
        pendidikan: [],
    },
    {
        id: 8,
        nama: 'Dinda Permata',
        jurusan: 'Rekayasa Perangkat Lunak',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas: 'Universitas Gadjah Mada',
                programStudi: 'Ilmu Komputer',
                jenjang: 'S1',
            },
        ],
    },
    {
        id: 9,
        nama: 'Bagas Pratama',
        jurusan: 'Teknik Komputer Jaringan',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas:
                    'Politeknik Negeri Banjarmasin',
                programStudi:
                    'Teknologi Rekayasa Komputer',
                jenjang: 'D4',
            },
        ],
    },
    {
        id: 10,
        nama: 'Nabila Sari',
        jurusan: 'Multimedia',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas:
                    'Universitas Negeri Yogyakarta',
                programStudi:
                    'Desain Komunikasi Visual',
                jenjang: 'S1',
            },
        ],
    },
    {
        id: 11,
        nama: 'Rafi Akbar',
        jurusan: 'Teknik Komputer Jaringan',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas:
                    'Politeknik Elektronika Negeri Surabaya',
                programStudi: 'Teknik Informatika',
                jenjang: 'D4',
            },
        ],
    },
    {
        id: 12,
        nama: 'Maya Lestari',
        jurusan: 'Rekayasa Perangkat Lunak',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas:
                    'Universitas Lambung Mangkurat',
                programStudi: 'Teknik Informatika',
                jenjang: 'S1',
            },
        ],
    },
    {
        id: 13,
        nama: 'Andi Saputra',
        jurusan: 'Rekayasa Perangkat Lunak',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas: 'Universitas Telkom',
                programStudi: 'Sistem Informasi',
                jenjang: 'S1',
            },
        ],
    },
    {
        id: 14,
        nama: 'Nadia Putri',
        jurusan: 'Teknik Komputer Jaringan',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas: 'Universitas Telkom',
                programStudi: 'Teknologi Informasi',
                jenjang: 'D4',
            },
        ],
    },
    {
        id: 15,
        nama: 'Rian Prakoso',
        jurusan: 'Rekayasa Perangkat Lunak',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas: 'Universitas Telkom',
                programStudi: 'Teknik Informatika',
                jenjang: 'D4',
            },
        ],
    },
    {
        id: 16,
        nama: 'Laras Wulandari',
        jurusan: 'Rekayasa Perangkat Lunak',
        statusSekarang: ['Kuliah'],
        pendidikan: [
            {
                universitas: 'Universitas Telkom',
                programStudi: 'Magister Informatika',
                jenjang: 'S2',
            },
        ],
    },
]


/* =========================================================
   URUTAN JENJANG
   ========================================================= */

const LEVEL_ORDER = [
    'D1',
    'D2',
    'D3',
    'D4',
    'S1',
    'S2',
    'S3',
]


/* =========================================================
   HELPER
   ========================================================= */

function sortLevels(a, b) {
    const indexA = LEVEL_ORDER.indexOf(a.level)
    const indexB = LEVEL_ORDER.indexOf(b.level)

    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB
}


function getCampusTracerData(campus) {
    return tracerData.flatMap(alumni => {
        if (!Array.isArray(alumni.pendidikan)) {
            return []
        }

        return alumni.pendidikan
            .filter(
                education =>
                    education.universitas
                        ?.trim()
                        .toLowerCase() ===
                    campus.name
                        ?.trim()
                        .toLowerCase()
            )
            .map(education => ({
                alumniId: alumni.id,
                jurusan: alumni.jurusan,
                statusSekarang: alumni.statusSekarang,
                education,
            }))
    })
}


/* =========================================================
   GROUP DATA BERDASARKAN JENJANG
   ========================================================= */

function getCampusLevels(campus) {
    const tracer = getCampusTracerData(campus)

    const grouped = {}

    tracer.forEach(item => {
        const level =
            item.education?.jenjang || 'Lainnya'

        const program =
            item.education?.programStudi ||
            'Program Studi tidak tersedia'

        if (!grouped[level]) {
            grouped[level] = {
                level,
                alumniIds: new Set(),
                programs: {},
            }
        }

        grouped[level].alumniIds.add(item.alumniId)

        if (!grouped[level].programs[program]) {
            grouped[level].programs[program] = {
                name: program,
                alumniIds: new Set(),
            }
        }

        grouped[level]
            .programs[program]
            .alumniIds
            .add(item.alumniId)
    })

    return Object.values(grouped)
        .map(group => ({
            level: group.level,

            totalAlumni:
                group.alumniIds.size,

            programs:
                Object.values(group.programs)
                    .map(program => ({
                        name: program.name,
                        totalAlumni:
                            program.alumniIds.size,
                    }))
                    .sort(
                        (a, b) =>
                            b.totalAlumni -
                            a.totalAlumni
                    ),
        }))
        .sort(sortLevels)
}


/* =========================================================
   CAMPUS STATS
   ========================================================= */

function getCampusStats(campus) {
    const tracer = getCampusTracerData(campus)

    const levels = getCampusLevels(campus)

    const uniqueAlumni = new Set(
        tracer.map(item => item.alumniId)
    )

    const majors = [
        ...new Set(
            tracer.map(item => item.jurusan)
        ),
    ]

    return {
        totalAlumni: uniqueAlumni.size,
        levels,
        majors,
    }
}


/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function CampusUser() {

    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [levelFilter, setLevelFilter] = useState('')
    const [majorFilter, setMajorFilter] = useState('')
    const [cityFilter, setCityFilter] = useState('')

    const [selectedCampus, setSelectedCampus] =
        useState(null)

    const [currentPage, setCurrentPage] =
        useState(1)

    const itemsPerPage = 6


    /* =====================================================
       FILTER OPTIONS
       ===================================================== */

    const typeOptions = useMemo(() => {
        return [
            ...new Set(
                campusData.map(
                    campus => campus.type
                )
            ),
        ]
    }, [])


    const cityOptions = useMemo(() => {
        return [
            ...new Set(
                campusData.map(
                    campus => campus.city
                )
            ),
        ]
    }, [])


    const majorOptions = useMemo(() => {
        return [
            ...new Set(
                tracerData.map(
                    alumni => alumni.jurusan
                )
            ),
        ]
    }, [])


    const levelOptions = useMemo(() => {
        const levels = []

        tracerData.forEach(alumni => {
            if (!Array.isArray(alumni.pendidikan)) {
                return
            }

            alumni.pendidikan.forEach(education => {
                if (
                    education.jenjang &&
                    !levels.includes(
                        education.jenjang
                    )
                ) {
                    levels.push(
                        education.jenjang
                    )
                }
            })
        })

        return levels.sort(
            (a, b) =>
                LEVEL_ORDER.indexOf(a) -
                LEVEL_ORDER.indexOf(b)
        )
    }, [])


    /* =====================================================
       FILTER CAMPUS
       ===================================================== */

    const filteredCampuses = useMemo(() => {

        const keyword =
            search.trim().toLowerCase()

        return campusData.filter(campus => {

            const tracer =
                getCampusTracerData(campus)

            const matchesSearch =
                !keyword ||
                campus.name
                    .toLowerCase()
                    .includes(keyword) ||
                campus.city
                    .toLowerCase()
                    .includes(keyword) ||
                campus.province
                    .toLowerCase()
                    .includes(keyword) ||
                tracer.some(item =>
                    item.education
                        ?.programStudi
                        ?.toLowerCase()
                        .includes(keyword)
                )

            const matchesType =
                !typeFilter ||
                campus.type === typeFilter

            const matchesCity =
                !cityFilter ||
                campus.city === cityFilter

            const matchesLevel =
                !levelFilter ||
                tracer.some(
                    item =>
                        item.education?.jenjang ===
                        levelFilter
                )

            const matchesMajor =
                !majorFilter ||
                tracer.some(
                    item =>
                        item.jurusan ===
                        majorFilter
                )

            return (
                matchesSearch &&
                matchesType &&
                matchesCity &&
                matchesLevel &&
                matchesMajor
            )
        })

    }, [
        search,
        typeFilter,
        levelFilter,
        majorFilter,
        cityFilter,
    ])


    /* =====================================================
       RECOMMENDED CAMPUS
       ===================================================== */

    const recommendedCampuses = useMemo(() => {

        return campusData
            .map(campus => {

                const stats =
                    getCampusStats(campus)

                return {
                    ...campus,
                    tracerCount:
                        stats.totalAlumni,
                }
            })
            .filter(
                campus =>
                    campus.tracerCount > 0
            )
            .sort(
                (a, b) =>
                    b.tracerCount -
                    a.tracerCount
            )
            .slice(0, 3)

    }, [])


    /* =====================================================
       PAGINATION
       ===================================================== */

    const totalPages = Math.ceil(
        filteredCampuses.length /
            itemsPerPage
    )

    const paginatedCampuses =
        filteredCampuses.slice(
            (currentPage - 1) *
                itemsPerPage,
            currentPage *
                itemsPerPage
        )


    /* =====================================================
       HANDLERS
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
        setMajorFilter('')
        setCityFilter('')
        setCurrentPage(1)
    }


    /* =====================================================
       SELECTED CAMPUS
       ===================================================== */

    const selectedStats =
        selectedCampus
            ? getCampusStats(selectedCampus)
            : null


    /* =====================================================
       RENDER
       ===================================================== */

    return (
        <UserLayout>

            <div className="campus-user-page">

                {/* =================================================
                    HERO
                   ================================================= */}

                <section className="campus-user-hero">

                    <div className="campus-hero-content">

                        <span className="campus-hero-badge">
                            INFORMASI KAMPUS
                        </span>

                        <h1>
                            Temukan Kampus
                            <br />
                            yang Tepat untukmu
                        </h1>

                        <p>
                            Cari perguruan tinggi berdasarkan
                            jenis kampus, tingkat pendidikan,
                            jurusan SMK, dan kota yang kamu inginkan.
                        </p>

                    </div>

                    <div className="campus-hero-icon">
                        🎓
                    </div>

                </section>


                {/* =================================================
                    SEARCH & FILTER
                   ================================================= */}

                <section className="campus-search-section">

                    <div className="campus-search-box">

                        <span className="campus-search-icon">
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
                            placeholder="Cari nama kampus, program studi, kota..."
                        />

                    </div>


                    <div className="campus-filter-grid">

                        <FilterSelect
                            label="Jenis Kampus"
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
                            label="Tingkat Pendidikan"
                            value={levelFilter}
                            options={levelOptions}
                            placeholder="Semua Tingkat"
                            onChange={value =>
                                handleFilterChange(
                                    setLevelFilter,
                                    value
                                )
                            }
                        />

                        <FilterSelect
                            label="Jurusan SMK"
                            value={majorFilter}
                            options={majorOptions}
                            placeholder="Semua Jurusan"
                            onChange={value =>
                                handleFilterChange(
                                    setMajorFilter,
                                    value
                                )
                            }
                        />

                        <FilterSelect
                            label="Kota"
                            value={cityFilter}
                            options={cityOptions}
                            placeholder="Semua Kota"
                            onChange={value =>
                                handleFilterChange(
                                    setCityFilter,
                                    value
                                )
                            }
                        />

                    </div>


                    {(
                        search ||
                        typeFilter ||
                        levelFilter ||
                        majorFilter ||
                        cityFilter
                    ) && (

                        <button
                            type="button"
                            className="campus-reset-filter"
                            onClick={resetFilters}
                        >
                            ↻ Reset Filter
                        </button>

                    )}

                </section>


                {/* =================================================
                    RECOMMENDATION
                   ================================================= */}

                {!search &&
                    !typeFilter &&
                    !levelFilter &&
                    !majorFilter &&
                    !cityFilter && (

                    <section className="campus-recommendation-section">

                        <div className="campus-section-heading">

                            <div>
                                <span className="campus-section-label">
                                    REKOMENDASI
                                </span>

                                <h2>
                                    Kampus Pilihan Alumni
                                </h2>

                                <p>
                                    Kampus yang sudah menjadi
                                    pilihan alumni Telkom Schools.
                                </p>
                            </div>

                            <span className="campus-section-icon">
                                ⭐
                            </span>

                        </div>


                        <div className="campus-recommendation-grid">

                            {recommendedCampuses.map(
                                campus => (

                                <CampusCard
                                    key={campus.id}
                                    campus={campus}
                                    onDetail={() =>
                                        setSelectedCampus(
                                            campus
                                        )
                                    }
                                    recommendation
                                />

                            ))}

                        </div>

                    </section>

                )}


                {/* =================================================
                    ALL CAMPUS
                   ================================================= */}

                <section className="campus-all-section">

                    <div className="campus-section-heading">

                        <div>

                            <span className="campus-section-label">
                                DAFTAR KAMPUS
                            </span>

                            <h2>
                                Semua Kampus
                            </h2>

                            <p>
                                {filteredCampuses.length}{' '}
                                kampus ditemukan
                            </p>

                        </div>

                        <span className="campus-total-badge">
                            {filteredCampuses.length}
                        </span>

                    </div>


                    {paginatedCampuses.length > 0 ? (

                        <div className="campus-card-grid">

                            {paginatedCampuses.map(
                                campus => (

                                <CampusCard
                                    key={campus.id}
                                    campus={campus}
                                    onDetail={() =>
                                        setSelectedCampus(
                                            campus
                                        )
                                    }
                                />

                            ))}

                        </div>

                    ) : (

                        <div className="campus-empty-state">

                            <div>
                                🔎
                            </div>

                            <h3>
                                Kampus tidak ditemukan
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

                    <div className="campus-pagination">

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

            {selectedCampus && (

                <div
                    className="campus-modal-overlay"
                    onClick={() =>
                        setSelectedCampus(null)
                    }
                >

                    <div
                        className="campus-modal"
                        onClick={e =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            type="button"
                            className="campus-modal-close"
                            onClick={() =>
                                setSelectedCampus(null)
                            }
                        >
                            ×
                        </button>


                        {/* =================================================
                            MODAL HEADER
                           ================================================= */}

                        <div className="campus-modal-header">

                            <div className="campus-modal-logo">
                                🎓
                            </div>

                            <div className="campus-modal-header-info">

                                <span className="campus-type-badge">
                                    {selectedCampus.type}
                                </span>

                                <h2>
                                    {selectedCampus.name}
                                </h2>

                                <p>
                                    📍{' '}
                                    {selectedCampus.city},{' '}
                                    {selectedCampus.province}
                                </p>

                            </div>

                        </div>


                        {/* =================================================
                            MODAL STATS
                           ================================================= */}

                        <div className="campus-modal-stats">

                            <div className="campus-modal-stat">

                                <strong>
                                    {
                                        selectedStats?.totalAlumni ||
                                        0
                                    }
                                </strong>

                                <span>
                                    Alumni Kuliah
                                </span>

                            </div>


                            <div className="campus-modal-stat">

                                <strong>
                                    {
                                        selectedStats?.levels
                                            ?.length || 0
                                    }
                                </strong>

                                <span>
                                    Jenjang
                                </span>

                            </div>


                            <div className="campus-modal-stat">

                                <strong>
                                    {
                                        selectedStats?.majors
                                            ?.length || 0
                                    }
                                </strong>

                                <span>
                                    Jurusan SMK
                                </span>

                            </div>

                        </div>


                        {/* =================================================
                            PROGRAM PENDIDIKAN
                           ================================================= */}

                        <section className="campus-modal-section">

                            <div className="campus-modal-section-heading">

                                <div>

                                    <span className="campus-modal-section-label">
                                        PENDIDIKAN ALUMNI
                                    </span>

                                    <h3>
                                        🎓 Jenjang Pendidikan
                                    </h3>

                                </div>

                            </div>


                            {selectedStats?.levels?.length > 0 ? (

                                <div className="campus-modal-levels">

                                    {selectedStats.levels.map(
                                        level => (

                                        <div
                                            className="campus-modal-level"
                                            key={level.level}
                                        >

                                            {/* JENJANG HEADER */}

                                            <div className="campus-modal-level-header">

                                                <div className="campus-modal-level-title">

                                                    <span className="campus-modal-level-badge">
                                                        {level.level}
                                                    </span>

                                                    <div>
                                                        <strong>
                                                            Jenjang{' '}
                                                            {level.level}
                                                        </strong>

                                                        <span>
                                                            {
                                                                level.totalAlumni
                                                            }{' '}
                                                            alumni
                                                        </span>
                                                    </div>

                                                </div>

                                            </div>


                                            {/* PROGRAM STUDI */}

                                            <div className="campus-modal-program-list">

                                                {level.programs.map(
                                                    program => (

                                                    <div
                                                        className="campus-modal-program"
                                                        key={
                                                            program.name
                                                        }
                                                    >

                                                        <div className="campus-program-info">

                                                            <span>
                                                                PROGRAM STUDI
                                                            </span>

                                                            <strong>
                                                                {
                                                                    program.name
                                                                }
                                                            </strong>

                                                        </div>

                                                        <div className="campus-program-count">

                                                            <strong>
                                                                {
                                                                    program.totalAlumni
                                                                }
                                                            </strong>

                                                            <span>
                                                                alumni
                                                            </span>

                                                        </div>

                                                    </div>

                                                ))}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            ) : (

                                <div className="campus-no-tracer">
                                    Belum ada data pendidikan
                                    alumni yang tersedia
                                    untuk kampus ini.
                                </div>

                            )}

                        </section>


                        {/* =================================================
                            LINKS
                           ================================================= */}

                        <section className="campus-modal-section">

                            <span className="campus-modal-section-label">
                                INFORMASI KAMPUS
                            </span>

                            <h3>
                                🔗 Informasi Kampus
                            </h3>

                            <div className="campus-modal-links">

                                <a
                                    href={
                                        selectedCampus.website
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>
                                        🌐 Website Resmi
                                    </span>

                                    <span>
                                        ↗
                                    </span>

                                </a>


                                <a
                                    href={
                                        selectedCampus.instagram
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>
                                        📸 Instagram
                                    </span>

                                    <span>
                                        ↗
                                    </span>

                                </a>

                            </div>

                        </section>

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
        <div className="campus-filter-item">

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
   CAMPUS CARD
   ========================================================= */

function CampusCard({
    campus,
    onDetail,
    recommendation = false,
}) {

    const stats =
        getCampusStats(campus)

    return (

        <article
            className={
                recommendation
                    ? 'campus-recommendation-card'
                    : 'campus-card'
            }
        >

            {/* CARD HEADER */}

            <div
                className={
                    recommendation
                        ? 'campus-card-top'
                        : 'campus-card-header'
                }
            >

                <div className="campus-logo-placeholder">
                    🎓
                </div>

                <span className="campus-type-badge">
                    {campus.type}
                </span>

            </div>


            {/* NAMA */}

            <h3>
                {campus.name}
            </h3>


            {/* LOKASI */}

            <p className="campus-location">
                📍 {campus.city},{' '}
                {campus.province}
            </p>


            {/* =================================================
                TOTAL ALUMNI KULIAH
               ================================================= */}

            <div className="campus-card-study-summary">

                <div className="campus-card-study-icon">
                    🎓
                </div>

                <div className="campus-card-study-info">

                    <span>
                        Total Alumni yang Kuliah
                    </span>

                    <strong>
                        {stats.totalAlumni}
                    </strong>

                </div>

            </div>


            {/* DETAIL */}

            <button
                type="button"
                className="campus-detail-button"
                onClick={onDetail}
            >
                <span>
                    Lihat Detail
                </span>

                <span className="campus-detail-arrow">
                    →
                </span>

            </button>

        </article>
    )
}