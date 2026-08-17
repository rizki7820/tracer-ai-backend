import React, { useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'

export default function TracerStudy() {

    // =========================================================
    // STATE
    // =========================================================

    const [search, setSearch] = useState('')
    const [yearFilter, setYearFilter] = useState('Semua Tahun')
    const [statusFilter, setStatusFilter] = useState('Semua Status')
    const [responseFilter, setResponseFilter] = useState('Semua Respon')

    const [currentPage, setCurrentPage] = useState(1)
    const [selectedRespondent, setSelectedRespondent] = useState(null)

    const itemsPerPage = 6


    // =========================================================
    // DATA RESPONDEN
    // =========================================================

    const respondents = [

        // =====================================================
        // 1. AHMAD FAUZAN
        // =====================================================

        {
            id: 1,
            name: 'Ahmad Fauzan',
            nisn: '0057283912',
            year: '2025',
            status: 'Bekerja',

            // -------------------------------------------------
            // PEKERJAAN
            // -------------------------------------------------

            company: 'PT Telkom Indonesia',
            position: 'Junior Web Developer',
            waitingTime: '< 3 Bulan',
            suitability: 'Sangat Sesuai',

            // -------------------------------------------------
            // PENDIDIKAN
            // -------------------------------------------------

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: '-',
                studyProgram: '-'
            },

            educationS1: {
                university: 'Universitas Telkom',
                studyProgram: 'Sistem Informasi'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: true,

            phone: '081234567890',
            email: 'ahmad.fauzan@email.com',
            location: 'Bandung, Jawa Barat',

            // -------------------------------------------------
            // KEPUASAN
            // -------------------------------------------------

            satisfaction: {
                learning: 4.8,
                teacher: 4.7,
                facility: 4.5,
                environment: 4.6,
                administration: 4.4
            }
        },


        // =====================================================
        // 2. SITI AISYAH
        // =====================================================

        {
            id: 2,
            name: 'Siti Aisyah',
            nisn: '0057283913',
            year: '2025',
            status: 'Kuliah',

            company: '-',
            position: '-',
            waitingTime: '-',
            suitability: '-',

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: '-',
                studyProgram: '-'
            },

            educationS1: {
                university: 'Universitas Gadjah Mada',
                studyProgram: 'Informatika'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: true,

            phone: '081234567891',
            email: 'siti.aisyah@email.com',
            location: 'Yogyakarta',

            satisfaction: {
                learning: 4.9,
                teacher: 4.8,
                facility: 4.6,
                environment: 4.7,
                administration: 4.5
            }
        },


        // =====================================================
        // 3. RIZKY PRATAMA
        // =====================================================

        {
            id: 3,
            name: 'Rizky Pratama',
            nisn: '0057283914',
            year: '2024',
            status: 'Wirausaha',

            company: 'Rizky Digital Studio',
            position: 'Owner',
            waitingTime: '3 - 6 Bulan',
            suitability: 'Sesuai',

            educationD3: {
                university: 'Politeknik Negeri Semarang',
                studyProgram: 'Teknik Informatika'
            },

            educationD4: {
                university: '-',
                studyProgram: '-'
            },

            educationS1: {
                university: 'Universitas Negeri Semarang',
                studyProgram: 'Teknik Informatika'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: true,

            phone: '081234567892',
            email: 'rizky.pratama@email.com',
            location: 'Semarang, Jawa Tengah',

            satisfaction: {
                learning: 4.4,
                teacher: 4.3,
                facility: 4.1,
                environment: 4.2,
                administration: 4.5
            }
        },


        // =====================================================
        // 4. NABILA PUTRI
        // =====================================================

        {
            id: 4,
            name: 'Nabila Putri',
            nisn: '0057283915',
            year: '2024',
            status: 'Bekerja',

            company: 'PT Astra International',
            position: 'IT Support',
            waitingTime: '< 3 Bulan',
            suitability: 'Sesuai',

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: 'Politeknik Negeri Jakarta',
                studyProgram: 'Teknologi Rekayasa Perangkat Lunak'
            },

            educationS1: {
                university: 'Universitas Indonesia',
                studyProgram: 'Sistem Informasi'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: true,

            phone: '081234567893',
            email: 'nabila.putri@email.com',
            location: 'Jakarta',

            satisfaction: {
                learning: 4.6,
                teacher: 4.5,
                facility: 4.3,
                environment: 4.4,
                administration: 4.6
            }
        },


        // =====================================================
        // 5. DIMAS SAPUTRA
        // =====================================================

        {
            id: 5,
            name: 'Dimas Saputra',
            nisn: '0057283916',
            year: '2024',
            status: 'Kuliah',

            company: '-',
            position: '-',
            waitingTime: '-',
            suitability: '-',

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: '-',
                studyProgram: '-'
            },

            educationS1: {
                university: 'Universitas Diponegoro',
                studyProgram: 'Sistem Informasi'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: true,

            phone: '081234567894',
            email: 'dimas.saputra@email.com',
            location: 'Semarang, Jawa Tengah',

            satisfaction: {
                learning: 4.7,
                teacher: 4.6,
                facility: 4.5,
                environment: 4.6,
                administration: 4.4
            }
        },


        // =====================================================
        // 6. FAJAR MAULANA
        // =====================================================

        {
            id: 6,
            name: 'Fajar Maulana',
            nisn: '0057283917',
            year: '2023',
            status: 'Bekerja',

            company: 'PT Shopee Indonesia',
            position: 'Frontend Developer',
            waitingTime: '< 3 Bulan',
            suitability: 'Sangat Sesuai',

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: '-',
                studyProgram: '-'
            },

            educationS1: {
                university: 'Universitas Brawijaya',
                studyProgram: 'Teknik Informatika'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: true,

            phone: '081234567895',
            email: 'fajar.maulana@email.com',
            location: 'Jakarta',

            satisfaction: {
                learning: 5.0,
                teacher: 4.9,
                facility: 4.8,
                environment: 4.9,
                administration: 4.7
            }
        },


        // =====================================================
        // 7. INTAN PERMATA
        // =====================================================

        {
            id: 7,
            name: 'Intan Permata',
            nisn: '0057283918',
            year: '2023',
            status: 'Belum Bekerja',

            company: '-',
            position: '-',
            waitingTime: '-',
            suitability: 'Belum Dinilai',

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: '-',
                studyProgram: '-'
            },

            educationS1: {
                university: '-',
                studyProgram: '-'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: true,

            phone: '081234567896',
            email: 'intan.permata@email.com',
            location: 'Bekasi, Jawa Barat',

            satisfaction: {
                learning: 4.0,
                teacher: 3.9,
                facility: 3.8,
                environment: 4.0,
                administration: 3.8
            }
        },


        // =====================================================
        // 8. BAGAS RAMADHAN
        // =====================================================

        {
            id: 8,
            name: 'Bagas Ramadhan',
            nisn: '0057283919',
            year: '2023',
            status: 'Bekerja',

            company: 'PT Bank Central Asia',
            position: 'IT Support',
            waitingTime: '-',
            suitability: '-',

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: '-',
                studyProgram: '-'
            },

            educationS1: {
                university: 'Universitas Padjadjaran',
                studyProgram: 'Teknik Informatika'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: false,

            phone: '081234567897',
            email: 'bagas.ramadhan@email.com',
            location: 'Jakarta',

            satisfaction: null
        },


        // =====================================================
        // 9. DEWI LESTARI
        // =====================================================

        {
            id: 9,
            name: 'Dewi Lestari',
            nisn: '0057283920',
            year: '2022',
            status: 'Kuliah',

            company: '-',
            position: '-',
            waitingTime: '-',
            suitability: '-',

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: '-',
                studyProgram: '-'
            },

            educationS1: {
                university: 'Institut Teknologi Bandung',
                studyProgram: 'Teknik Informatika'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: true,

            phone: '081234567898',
            email: 'dewi.lestari@email.com',
            location: 'Bandung, Jawa Barat',

            satisfaction: {
                learning: 4.9,
                teacher: 4.8,
                facility: 4.7,
                environment: 4.8,
                administration: 4.6
            }
        },


        // =====================================================
        // 10. YOGA PRASETYO
        // =====================================================

        {
            id: 10,
            name: 'Yoga Prasetyo',
            nisn: '0057283921',
            year: '2022',
            status: 'Wirausaha',

            company: 'Yoga Creative',
            position: 'Founder',
            waitingTime: '3 - 6 Bulan',
            suitability: 'Sesuai',

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: 'Politeknik Negeri Bandung',
                studyProgram: 'Desain Grafis'
            },

            educationS1: {
                university: 'Universitas Sebelas Maret',
                studyProgram: 'Desain Komunikasi Visual'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: true,

            phone: '081234567899',
            email: 'yoga.prasetyo@email.com',
            location: 'Surakarta, Jawa Tengah',

            satisfaction: {
                learning: 4.5,
                teacher: 4.4,
                facility: 4.2,
                environment: 4.3,
                administration: 4.5
            }
        },


        // =====================================================
        // 11. AULIA RAHMA
        // =====================================================

        {
            id: 11,
            name: 'Aulia Rahma',
            nisn: '0057283922',
            year: '2022',
            status: 'Bekerja',

            company: 'PT PLN',
            position: 'Junior Programmer',
            waitingTime: '3 - 6 Bulan',
            suitability: 'Sangat Sesuai',

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: '-',
                studyProgram: '-'
            },

            educationS1: {
                university: 'Universitas Negeri Semarang',
                studyProgram: 'Teknik Informatika'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: true,

            phone: '081234567800',
            email: 'aulia.rahma@email.com',
            location: 'Semarang, Jawa Tengah',

            satisfaction: {
                learning: 4.7,
                teacher: 4.8,
                facility: 4.5,
                environment: 4.6,
                administration: 4.7
            }
        },


        // =====================================================
        // 12. GALIH NUGRAHA
        // =====================================================

        {
            id: 12,
            name: 'Galih Nugraha',
            nisn: '0057283923',
            year: '2021',
            status: 'Belum Bekerja',

            company: '-',
            position: '-',
            waitingTime: '-',
            suitability: '-',

            educationD3: {
                university: '-',
                studyProgram: '-'
            },

            educationD4: {
                university: '-',
                studyProgram: '-'
            },

            educationS1: {
                university: '-',
                studyProgram: '-'
            },

            educationS2: {
                university: '-',
                studyProgram: '-'
            },

            educationS3: {
                university: '-',
                studyProgram: '-'
            },

            response: false,

            phone: '081234567801',
            email: 'galih.nugraha@email.com',
            location: 'Depok, Jawa Barat',

            satisfaction: null
        }

    ]


    // =========================================================
    // STATISTICS
    // =========================================================

    const totalAlumni = 1245
    const totalResponded = 987
    const totalNotResponded = 258

    const responseRate = (
        (totalResponded / totalAlumni) * 100
    ).toFixed(1)


    // =========================================================
    // SATISFACTION DATA
    // =========================================================

    const satisfactionData = [
        {
            key: 'learning',
            label: 'Kualitas Pembelajaran',
            description: 'Kepuasan terhadap proses pembelajaran.'
        },
        {
            key: 'teacher',
            label: 'Kualitas Guru',
            description: 'Kepuasan terhadap guru dan tenaga pengajar.'
        },
        {
            key: 'facility',
            label: 'Fasilitas Sekolah',
            description: 'Kepuasan terhadap fasilitas sekolah.'
        },
        {
            key: 'environment',
            label: 'Lingkungan Sekolah',
            description: 'Kepuasan terhadap lingkungan sekolah.'
        },
        {
            key: 'administration',
            label: 'Pelayanan Administrasi',
            description: 'Kepuasan terhadap pelayanan administrasi.'
        }
    ]


    // =========================================================
    // SATISFACTION AVERAGE
    // =========================================================

    const satisfactionAverage = useMemo(() => {

        const validRespondents = respondents.filter(
            item =>
                item.response &&
                item.satisfaction
        )

        if (!validRespondents.length) {
            return {
                overall: 0,
                learning: 0,
                teacher: 0,
                facility: 0,
                environment: 0,
                administration: 0
            }
        }

        const result = {}

        satisfactionData.forEach(aspect => {

            const total = validRespondents.reduce(
                (sum, item) =>
                    sum + (
                        Number(
                            item.satisfaction?.[aspect.key]
                        ) || 0
                    ),
                0
            )

            result[aspect.key] = (
                total / validRespondents.length
            )

        })

        result.overall = (
            satisfactionData.reduce(
                (sum, aspect) =>
                    sum + result[aspect.key],
                0
            ) / satisfactionData.length
        )

        return result

    }, [])


    // =========================================================
    // FILTER DATA
    // =========================================================

    const filteredRespondents = useMemo(() => {

        return respondents.filter(item => {

            const searchValue = search.toLowerCase().trim()

            const searchMatch =
                item.name.toLowerCase().includes(searchValue) ||
                item.nisn.includes(searchValue) ||
                item.company.toLowerCase().includes(searchValue) ||
                item.position.toLowerCase().includes(searchValue) ||

                item.educationD3.university.toLowerCase().includes(searchValue) ||
                item.educationD3.studyProgram.toLowerCase().includes(searchValue) ||

                item.educationD4.university.toLowerCase().includes(searchValue) ||
                item.educationD4.studyProgram.toLowerCase().includes(searchValue) ||

                item.educationS1.university.toLowerCase().includes(searchValue) ||
                item.educationS1.studyProgram.toLowerCase().includes(searchValue) ||

                item.educationS2.university.toLowerCase().includes(searchValue) ||
                item.educationS2.studyProgram.toLowerCase().includes(searchValue) ||

                item.educationS3.university.toLowerCase().includes(searchValue) ||
                item.educationS3.studyProgram.toLowerCase().includes(searchValue)


            const yearMatch =
                yearFilter === 'Semua Tahun' ||
                item.year === yearFilter


            const statusMatch =
                statusFilter === 'Semua Status' ||
                item.status === statusFilter


            const responseMatch =
                responseFilter === 'Semua Respon' ||
                (
                    responseFilter === 'Sudah Mengisi' &&
                    item.response
                ) ||
                (
                    responseFilter === 'Belum Mengisi' &&
                    !item.response
                )


            return (
                searchMatch &&
                yearMatch &&
                statusMatch &&
                responseMatch
            )

        })

    }, [
        search,
        yearFilter,
        statusFilter,
        responseFilter
    ])


    // =========================================================
    // PAGINATION
    // =========================================================

    const totalPages = Math.ceil(
        filteredRespondents.length / itemsPerPage
    )

    const paginatedRespondents =
        filteredRespondents.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )


    // =========================================================
    // RESET FILTER
    // =========================================================

    const resetFilter = () => {

        setSearch('')
        setYearFilter('Semua Tahun')
        setStatusFilter('Semua Status')
        setResponseFilter('Semua Respon')
        setCurrentPage(1)

    }


    // =========================================================
    // FILTER CHANGE
    // =========================================================

    const handleSearch = (value) => {

        setSearch(value)
        setCurrentPage(1)

    }


    const handleYearFilter = (value) => {

        setYearFilter(value)
        setCurrentPage(1)

    }


    const handleStatusFilter = (value) => {

        setStatusFilter(value)
        setCurrentPage(1)

    }


    const handleResponseFilter = (value) => {

        setResponseFilter(value)
        setCurrentPage(1)

    }


    // =========================================================
    // STATUS CLASS
    // =========================================================

    const getStatusClass = (status) => {

        switch (status) {

            case 'Bekerja':
                return 'working'

            case 'Kuliah':
                return 'study'

            case 'Wirausaha':
                return 'business'

            default:
                return 'unknown'

        }

    }


    // =========================================================
    // RESPONSE CLASS
    // =========================================================

    const getResponseClass = (response) => {

        return response
            ? 'responded'
            : 'not-responded'

    }


    // =========================================================
    // STAR RATING
    // =========================================================

    const renderStars = (rating) => {

        if (
            rating === null ||
            rating === undefined ||
            rating === 0
        ) {

            return (
                <span className="tracer-rating-empty">
                    Belum dinilai
                </span>
            )

        }


        const roundedRating = Math.round(rating)

        return (

            <div className="tracer-rating">

                <span className="tracer-stars">
                    {'★'.repeat(roundedRating)}
                    {'☆'.repeat(5 - roundedRating)}
                </span>

                <strong>
                    {Number(rating).toFixed(1)}
                </strong>

                <span>
                    / 5
                </span>

            </div>

        )

    }


    // =========================================================
    // EDUCATION VALUE
    // =========================================================

    const educationValue = (education) => {

        if (
            !education ||
            education.university === '-' ||
            education.university === ''
        ) {

            return '—'

        }

        return education.university

    }


    const studyProgramValue = (education) => {

        if (
            !education ||
            education.studyProgram === '-' ||
            education.studyProgram === ''
        ) {

            return '—'

        }

        return education.studyProgram

    }


    // =========================================================
    // COMPONENT
    // =========================================================

    return (

        <AdminLayout>

            <div className="tracer-page">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="tracer-page-header">

                    <div>

                        <span className="tracer-page-badge">
                            TRACER STUDY
                        </span>

                        <h2>
                            Dashboard Tracer Study
                        </h2>

                        <p>
                            Pantau dan analisis perkembangan alumni setelah lulus.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="tracer-export-button"
                    >

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M12 3v12" />
                            <path d="m7 10 5 5 5-5" />
                            <path d="M5 21h14" />
                        </svg>

                        Export Data

                    </button>

                </div>


                {/* =================================================
                    MAIN STATISTICS
                ================================================= */}

                <div className="tracer-stats-grid">

                    <div className="tracer-stat-card">

                        <div className="tracer-stat-icon red">

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
                            {totalAlumni.toLocaleString('id-ID')}
                        </strong>

                        <span>
                            Total Alumni
                        </span>

                    </div>


                    <div className="tracer-stat-card">

                        <div className="tracer-stat-icon blue">

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
                            {totalResponded.toLocaleString('id-ID')}
                        </strong>

                        <span>
                            Sudah Mengisi
                        </span>

                    </div>


                    <div className="tracer-stat-card">

                        <div className="tracer-stat-icon orange">

                            <svg
                                width="20"
                                height="20"
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

                                <path d="M12 7v5l3 2" />

                            </svg>

                        </div>

                        <strong>
                            {totalNotResponded.toLocaleString('id-ID')}
                        </strong>

                        <span>
                            Belum Mengisi
                        </span>

                    </div>


                    <div className="tracer-stat-card">

                        <div className="tracer-stat-icon purple">

                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M3 12a9 9 0 1 0 9-9" />
                                <path d="M3 4v8h8" />
                            </svg>

                        </div>

                        <strong>
                            {responseRate}%
                        </strong>

                        <span>
                            Response Rate
                        </span>

                    </div>

                </div>


                {/* =================================================
                    ANALYSIS GRID
                ================================================= */}

                <div className="tracer-analysis-grid">


                    {/* STATUS ALUMNI */}

                    <div className="tracer-analysis-card">

                        <div className="tracer-card-header">

                            <div>

                                <h3>
                                    Status Alumni
                                </h3>

                                <p>
                                    Kondisi alumni setelah lulus
                                </p>

                            </div>

                            <span className="tracer-card-icon">

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


                        <div className="tracer-status-list">

                            <div className="tracer-status-item">

                                <div className="tracer-status-label">

                                    <span className="tracer-dot working"></span>

                                    Bekerja

                                </div>

                                <strong>
                                    62%
                                </strong>

                            </div>


                            <div className="tracer-progress">

                                <span
                                    className="working"
                                    style={{ width: '62%' }}
                                ></span>

                            </div>


                            <div className="tracer-status-item">

                                <div className="tracer-status-label">

                                    <span className="tracer-dot study"></span>

                                    Kuliah

                                </div>

                                <strong>
                                    24%
                                </strong>

                            </div>


                            <div className="tracer-progress">

                                <span
                                    className="study"
                                    style={{ width: '24%' }}
                                ></span>

                            </div>


                            <div className="tracer-status-item">

                                <div className="tracer-status-label">

                                    <span className="tracer-dot business"></span>

                                    Wirausaha

                                </div>

                                <strong>
                                    9%
                                </strong>

                            </div>


                            <div className="tracer-progress">

                                <span
                                    className="business"
                                    style={{ width: '9%' }}
                                ></span>

                            </div>


                            <div className="tracer-status-item">

                                <div className="tracer-status-label">

                                    <span className="tracer-dot unknown"></span>

                                    Belum Bekerja

                                </div>

                                <strong>
                                    5%
                                </strong>

                            </div>


                            <div className="tracer-progress">

                                <span
                                    className="unknown"
                                    style={{ width: '5%' }}
                                ></span>

                            </div>

                        </div>

                    </div>


                    {/* MASA TUNGGU */}

                    <div className="tracer-analysis-card">

                        <div className="tracer-card-header">

                            <div>

                                <h3>
                                    Masa Tunggu Kerja
                                </h3>

                                <p>
                                    Waktu alumni mendapatkan pekerjaan
                                </p>

                            </div>

                            <span className="tracer-card-icon orange-icon">

                                <svg
                                    width="17"
                                    height="17"
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

                                    <path d="M12 7v5l3 2" />

                                </svg>

                            </span>

                        </div>


                        <div className="tracer-waiting-list">

                            <div className="tracer-waiting-item">

                                <span>
                                    &lt; 3 Bulan
                                </span>

                                <strong>
                                    54%
                                </strong>

                            </div>


                            <div className="tracer-waiting-item">

                                <span>
                                    3 - 6 Bulan
                                </span>

                                <strong>
                                    28%
                                </strong>

                            </div>


                            <div className="tracer-waiting-item">

                                <span>
                                    6 - 12 Bulan
                                </span>

                                <strong>
                                    12%
                                </strong>

                            </div>


                            <div className="tracer-waiting-item">

                                <span>
                                    &gt; 1 Tahun
                                </span>

                                <strong>
                                    6%
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    SECOND ANALYSIS
                ================================================= */}

                <div className="tracer-secondary-grid">


                    {/* KESESUAIAN */}

                    <div className="tracer-wide-card">

                        <div className="tracer-card-header">

                            <div>

                                <h3>
                                    Kesesuaian Pekerjaan dengan Kompetensi
                                </h3>

                                <p>
                                    Tingkat kesesuaian pekerjaan alumni dengan kompetensi yang dipelajari
                                </p>

                            </div>

                        </div>


                        <div className="tracer-compatibility">

                            <div className="tracer-compatibility-item">

                                <div>

                                    <span>
                                        Sangat Sesuai
                                    </span>

                                    <strong>
                                        38%
                                    </strong>

                                </div>

                                <div className="tracer-progress large">

                                    <span
                                        className="red"
                                        style={{ width: '38%' }}
                                    ></span>

                                </div>

                            </div>


                            <div className="tracer-compatibility-item">

                                <div>

                                    <span>
                                        Sesuai
                                    </span>

                                    <strong>
                                        41%
                                    </strong>

                                </div>

                                <div className="tracer-progress large">

                                    <span
                                        className="blue"
                                        style={{ width: '41%' }}
                                    ></span>

                                </div>

                            </div>


                            <div className="tracer-compatibility-item">

                                <div>

                                    <span>
                                        Cukup Sesuai
                                    </span>

                                    <strong>
                                        14%
                                    </strong>

                                </div>

                                <div className="tracer-progress large">

                                    <span
                                        className="purple"
                                        style={{ width: '14%' }}
                                    ></span>

                                </div>

                            </div>


                            <div className="tracer-compatibility-item">

                                <div>

                                    <span>
                                        Tidak Sesuai
                                    </span>

                                    <strong>
                                        7%
                                    </strong>

                                </div>

                                <div className="tracer-progress large">

                                    <span
                                        className="gray"
                                        style={{ width: '7%' }}
                                    ></span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* PENDIDIKAN */}

                    <div className="tracer-small-card">

                        <div className="tracer-card-header">

                            <div>

                                <h3>
                                    Pendidikan Lanjutan
                                </h3>

                                <p>
                                    Alumni yang melanjutkan pendidikan
                                </p>

                            </div>

                            <span className="tracer-card-icon purple-icon">

                                <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="m3 10 9-5 9 5-9 5-9-5Z" />
                                    <path d="M7 12.5V17c3 2 7 2 10 0v-4.5" />
                                </svg>

                            </span>

                        </div>


                        <div className="tracer-education-number">
                            24%
                        </div>

                        <span className="tracer-education-label">
                            Alumni melanjutkan pendidikan
                        </span>


                        <div className="tracer-education-info">

                            <div>

                                <span>
                                    Sesuai jurusan
                                </span>

                                <strong>
                                    68%
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Tidak sesuai
                                </span>

                                <strong>
                                    32%
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    SATISFACTION
                ================================================= */}

                <div className="tracer-satisfaction-card">

                    <div className="tracer-satisfaction-main">

                        <div className="tracer-card-header">

                            <div>

                                <h3>
                                    Kepuasan Alumni
                                </h3>

                                <p>
                                    Penilaian alumni terhadap pengalaman selama bersekolah
                                </p>

                            </div>

                            <span className="tracer-card-icon yellow-icon">

                                <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>

                            </span>

                        </div>


                        <div className="tracer-satisfaction-rating">

                            <strong>
                                {satisfactionAverage.overall.toFixed(1)}
                            </strong>

                            <div>

                                <div className="tracer-big-stars">
                                    ★★★★★
                                </div>

                                <span>
                                    dari 5.0 penilaian
                                </span>

                            </div>

                        </div>

                    </div>


                    <div className="tracer-satisfaction-items">

                        {satisfactionData.map(aspect => (

                            <div key={aspect.key}>

                                <span>
                                    {aspect.label}
                                </span>

                                <strong>
                                    {satisfactionAverage[
                                        aspect.key
                                    ].toFixed(1)} / 5
                                </strong>

                            </div>

                        ))}

                    </div>

                </div>


                {/* =================================================
                    RESPONDENT TABLE
                ================================================= */}

                <div className="tracer-respondent-card">

                    <div className="tracer-respondent-header">

                        <div>

                            <h3>
                                Data Responden
                            </h3>

                            <p>
                                Daftar alumni yang mengisi tracer study
                            </p>

                        </div>

                    </div>


                    {/* FILTER */}

                    <div className="tracer-filter-area">

                        <div className="tracer-search">

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
                                placeholder="Cari nama, NISN, perusahaan, atau kampus..."
                                value={search}
                                onChange={(e) =>
                                    handleSearch(e.target.value)
                                }
                            />

                        </div>


                        <select
                            value={yearFilter}
                            onChange={(e) =>
                                handleYearFilter(e.target.value)
                            }
                            className="tracer-filter-select"
                        >

                            <option>
                                Semua Tahun
                            </option>

                            <option value="2025">
                                2025
                            </option>

                            <option value="2024">
                                2024
                            </option>

                            <option value="2023">
                                2023
                            </option>

                            <option value="2022">
                                2022
                            </option>

                            <option value="2021">
                                2021
                            </option>

                        </select>


                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                handleStatusFilter(e.target.value)
                            }
                            className="tracer-filter-select"
                        >

                            <option>
                                Semua Status
                            </option>

                            <option value="Bekerja">
                                Bekerja
                            </option>

                            <option value="Kuliah">
                                Kuliah
                            </option>

                            <option value="Wirausaha">
                                Wirausaha
                            </option>

                            <option value="Belum Bekerja">
                                Belum Bekerja
                            </option>

                        </select>


                        <select
                            value={responseFilter}
                            onChange={(e) =>
                                handleResponseFilter(e.target.value)
                            }
                            className="tracer-filter-select"
                        >

                            <option>
                                Semua Respon
                            </option>

                            <option value="Sudah Mengisi">
                                Sudah Mengisi
                            </option>

                            <option value="Belum Mengisi">
                                Belum Mengisi
                            </option>

                        </select>


                        <button
                            type="button"
                            className="tracer-reset-button"
                            onClick={resetFilter}
                        >
                            Reset
                        </button>

                    </div>


                    {/* TABLE */}

                    <div className="tracer-table-wrapper">

                        <table className="tracer-table">

                            <thead>

                                <tr>

                                    <th>
                                        NO
                                    </th>

                                    <th>
                                        ALUMNI
                                    </th>

                                    <th>
                                        TAHUN
                                    </th>

                                    <th>
                                        STATUS
                                    </th>

                                    <th>
                                        INFORMASI
                                    </th>

                                    <th>
                                        RESPONSE
                                    </th>

                                    <th>
                                        AKSI
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {paginatedRespondents.length > 0 ? (

                                    paginatedRespondents.map(
                                        (item, index) => (

                                            <tr key={item.id}>

                                                <td className="tracer-number">

                                                    {(currentPage - 1) *
                                                        itemsPerPage +
                                                        index +
                                                        1}

                                                </td>


                                                <td>

                                                    <div className="tracer-alumni-cell">

                                                        <div className="tracer-avatar">

                                                            {item.name
                                                                .split(' ')
                                                                .map(
                                                                    word =>
                                                                        word[0]
                                                                )
                                                                .slice(0, 2)
                                                                .join('')
                                                                .toUpperCase()}

                                                        </div>


                                                        <div>

                                                            <strong>
                                                                {item.name}
                                                            </strong>

                                                            <span>
                                                                NISN {item.nisn}
                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>


                                                <td>

                                                    <span className="tracer-year">
                                                        {item.year}
                                                    </span>

                                                </td>


                                                <td>

                                                    <span
                                                        className={`tracer-status ${getStatusClass(
                                                            item.status
                                                        )}`}
                                                    >

                                                        <i></i>

                                                        {item.status}

                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="tracer-information">

                                                        {item.status === 'Kuliah' ? (

                                                            <>

                                                                <strong>
                                                                    {item.educationS1.studyProgram !== '-'
                                                                        ? `S1 · ${item.educationS1.studyProgram}`
                                                                        : 'Belum ada data'}
                                                                </strong>

                                                                <span>
                                                                    {item.educationS1.university !== '-'
                                                                        ? item.educationS1.university
                                                                        : '—'}
                                                                </span>

                                                            </>

                                                        ) : (

                                                            <>

                                                                <strong>
                                                                    {item.position !== '-'
                                                                        ? item.position
                                                                        : 'Belum ada data'}
                                                                </strong>

                                                                <span>
                                                                    {item.company !== '-'
                                                                        ? item.company
                                                                        : '—'}
                                                                </span>

                                                            </>

                                                        )}

                                                    </div>

                                                </td>


                                                <td>

                                                    <span
                                                        className={`tracer-response ${getResponseClass(
                                                            item.response
                                                        )}`}
                                                    >

                                                        <i></i>

                                                        {item.response
                                                            ? 'Sudah Mengisi'
                                                            : 'Belum Mengisi'}

                                                    </span>

                                                </td>


                                                <td>

                                                    <button
                                                        type="button"
                                                        className="tracer-detail-button"
                                                        onClick={() =>
                                                            setSelectedRespondent(
                                                                item
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

                                                </td>

                                            </tr>

                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="tracer-empty-row"
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

                    <div className="tracer-pagination">

                        <span>

                            Menampilkan{' '}

                            <strong>
                                {paginatedRespondents.length}
                            </strong>{' '}

                            dari{' '}

                            <strong>
                                {filteredRespondents.length}
                            </strong>{' '}

                            data

                        </span>


                        <div className="tracer-pagination-buttons">

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

            {selectedRespondent && (

                <div
                    className="tracer-modal-overlay"
                    onClick={() =>
                        setSelectedRespondent(null)
                    }
                >

                    <div
                        className="tracer-detail-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >


                        {/* =================================================
                            MODAL HEADER
                        ================================================= */}

                        <div className="tracer-modal-header">

                            <div className="tracer-modal-profile">

                                <div className="tracer-modal-avatar">

                                    {selectedRespondent.name
                                        .split(' ')
                                        .map(
                                            word =>
                                                word[0]
                                        )
                                        .slice(0, 2)
                                        .join('')
                                        .toUpperCase()}

                                </div>


                                <div>

                                    <span>
                                        RESPONDEN TRACER STUDY
                                    </span>

                                    <h3>
                                        {selectedRespondent.name}
                                    </h3>

                                    <p>
                                        Alumni tahun {selectedRespondent.year}
                                    </p>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="tracer-modal-close"
                                onClick={() =>
                                    setSelectedRespondent(null)
                                }
                            >

                                ×

                            </button>

                        </div>


                        {/* =================================================
                            MODAL STATUS
                        ================================================= */}

                        <div className="tracer-modal-status">

                            <span
                                className={`tracer-status ${getStatusClass(
                                    selectedRespondent.status
                                )}`}
                            >

                                <i></i>

                                {selectedRespondent.status}

                            </span>


                            <span className="tracer-modal-nisn">
                                NISN {selectedRespondent.nisn}
                            </span>

                        </div>


                        {/* =================================================
                            MODAL CONTENT
                        ================================================= */}

                        <div className="tracer-modal-content">


                            {/* =================================================
                                INFORMASI ALUMNI
                            ================================================= */}

                            <div className="tracer-modal-section">

                                <div className="tracer-modal-section-title">

                                    <div>

                                        <h4>
                                            Informasi Alumni
                                        </h4>

                                        <p>
                                            Informasi dasar responden
                                        </p>

                                    </div>

                                </div>


                                <div className="tracer-detail-grid">

                                    <div>

                                        <span>
                                            Tahun Lulus
                                        </span>

                                        <strong>
                                            {selectedRespondent.year}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Status
                                        </span>

                                        <strong>
                                            {selectedRespondent.status}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            NISN
                                        </span>

                                        <strong>
                                            {selectedRespondent.nisn}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Lokasi
                                        </span>

                                        <strong>
                                            {selectedRespondent.location}
                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                PENDIDIKAN
                            ================================================= */}

                            <div className="tracer-modal-section">

                                <div className="tracer-modal-section-title">

                                    <div>

                                        <h4>
                                            Pendidikan
                                        </h4>

                                        <p>
                                            Riwayat pendidikan lanjutan alumni
                                        </p>

                                    </div>


                                    <span className="tracer-section-badge education">
                                        PENDIDIKAN
                                    </span>

                                </div>


                                <div className="tracer-education-detail">


                                    {/* D3 */}

                                    <div className="tracer-education-level">

                                        <div className="tracer-education-heading">

                                            <span>
                                                D3
                                            </span>

                                            <strong>
                                                Diploma 3
                                            </strong>

                                        </div>


                                        <div className="tracer-detail-grid">

                                            <div>

                                                <span>
                                                    Perguruan Tinggi
                                                </span>

                                                <strong>
                                                    {educationValue(
                                                        selectedRespondent.educationD3
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Program Studi
                                                </span>

                                                <strong>
                                                    {studyProgramValue(
                                                        selectedRespondent.educationD3
                                                    )}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* D4 */}

                                    <div className="tracer-education-level">

                                        <div className="tracer-education-heading">

                                            <span>
                                                D4
                                            </span>

                                            <strong>
                                                Diploma 4 / Sarjana Terapan
                                            </strong>

                                        </div>


                                        <div className="tracer-detail-grid">

                                            <div>

                                                <span>
                                                    Perguruan Tinggi
                                                </span>

                                                <strong>
                                                    {educationValue(
                                                        selectedRespondent.educationD4
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Program Studi
                                                </span>

                                                <strong>
                                                    {studyProgramValue(
                                                        selectedRespondent.educationD4
                                                    )}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* S1 */}

                                    <div className="tracer-education-level">

                                        <div className="tracer-education-heading">

                                            <span>
                                                S1
                                            </span>

                                            <strong>
                                                Strata 1
                                            </strong>

                                        </div>


                                        <div className="tracer-detail-grid">

                                            <div>

                                                <span>
                                                    Perguruan Tinggi
                                                </span>

                                                <strong>
                                                    {educationValue(
                                                        selectedRespondent.educationS1
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Program Studi
                                                </span>

                                                <strong>
                                                    {studyProgramValue(
                                                        selectedRespondent.educationS1
                                                    )}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* S2 */}

                                    <div className="tracer-education-level">

                                        <div className="tracer-education-heading">

                                            <span>
                                                S2
                                            </span>

                                            <strong>
                                                Strata 2
                                            </strong>

                                        </div>


                                        <div className="tracer-detail-grid">

                                            <div>

                                                <span>
                                                    Perguruan Tinggi
                                                </span>

                                                <strong>
                                                    {educationValue(
                                                        selectedRespondent.educationS2
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Program Studi
                                                </span>

                                                <strong>
                                                    {studyProgramValue(
                                                        selectedRespondent.educationS2
                                                    )}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* S3 */}

                                    <div className="tracer-education-level">

                                        <div className="tracer-education-heading">

                                            <span>
                                                S3
                                            </span>

                                            <strong>
                                                Strata 3
                                            </strong>

                                        </div>


                                        <div className="tracer-detail-grid">

                                            <div>

                                                <span>
                                                    Perguruan Tinggi
                                                </span>

                                                <strong>
                                                    {educationValue(
                                                        selectedRespondent.educationS3
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Program Studi
                                                </span>

                                                <strong>
                                                    {studyProgramValue(
                                                        selectedRespondent.educationS3
                                                    )}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                PEKERJAAN
                            ================================================= */}

                            <div className="tracer-modal-section">

                                <div className="tracer-modal-section-title">

                                    <div>

                                        <h4>
                                            Pekerjaan
                                        </h4>

                                        <p>
                                            Informasi pekerjaan dan perjalanan karier alumni
                                        </p>

                                    </div>


                                    <span className="tracer-section-badge work">
                                        PEKERJAAN
                                    </span>

                                </div>


                                <div className="tracer-detail-grid">

                                    <div>

                                        <span>
                                            Status
                                        </span>

                                        <strong>
                                            {selectedRespondent.status}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Posisi / Jabatan
                                        </span>

                                        <strong>
                                            {selectedRespondent.position !== '-'
                                                ? selectedRespondent.position
                                                : 'Belum ada data'}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Perusahaan / Instansi
                                        </span>

                                        <strong>
                                            {selectedRespondent.company !== '-'
                                                ? selectedRespondent.company
                                                : 'Belum ada data'}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Masa Tunggu
                                        </span>

                                        <strong>
                                            {selectedRespondent.waitingTime !== '-'
                                                ? selectedRespondent.waitingTime
                                                : 'Belum ada data'}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Kesesuaian Kompetensi
                                        </span>

                                        <strong>
                                            {selectedRespondent.suitability !== '-'
                                                ? selectedRespondent.suitability
                                                : 'Belum Dinilai'}
                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                KEPUASAN
                            ================================================= */}

                            <div className="tracer-modal-section">

                                <div className="tracer-modal-section-title">

                                    <div>

                                        <h4>
                                            Kepuasan Alumni
                                        </h4>

                                        <p>
                                            Penilaian alumni terhadap pengalaman selama bersekolah
                                        </p>

                                    </div>

                                </div>


                                {selectedRespondent.satisfaction ? (

                                    <div className="tracer-modal-satisfaction">

                                        {satisfactionData.map(aspect => (

                                            <div
                                                className="tracer-modal-satisfaction-item"
                                                key={aspect.key}
                                            >

                                                <div>

                                                    <span>
                                                        {aspect.label}
                                                    </span>

                                                    <small>
                                                        {aspect.description}
                                                    </small>

                                                </div>

                                                {renderStars(
                                                    selectedRespondent.satisfaction[
                                                        aspect.key
                                                    ]
                                                )}

                                            </div>

                                        ))}


                                        <div className="tracer-modal-satisfaction-total">

                                            <span>
                                                Rata-rata Kepuasan
                                            </span>

                                            <strong>
                                                {(
                                                    satisfactionData.reduce(
                                                        (sum, aspect) =>
                                                            sum +
                                                            (
                                                                Number(
                                                                    selectedRespondent
                                                                        .satisfaction[
                                                                        aspect.key
                                                                    ]
                                                                ) || 0
                                                            ),
                                                        0
                                                    ) /
                                                    satisfactionData.length
                                                ).toFixed(1)} / 5
                                            </strong>

                                        </div>

                                    </div>

                                ) : (

                                    <span className="tracer-rating-empty">
                                        Belum mengisi penilaian kepuasan
                                    </span>

                                )}

                            </div>


                            {/* =================================================
                                KONTAK
                            ================================================= */}

                            <div className="tracer-modal-section">

                                <div className="tracer-modal-section-title">

                                    <div>

                                        <h4>
                                            Kontak
                                        </h4>

                                        <p>
                                            Informasi kontak responden
                                        </p>

                                    </div>

                                </div>


                                <div className="tracer-contact-list">

                                    <div>

                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <rect
                                                width="20"
                                                height="16"
                                                x="2"
                                                y="4"
                                                rx="2"
                                            />

                                            <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />

                                        </svg>


                                        <span>
                                            {selectedRespondent.email}
                                        </span>

                                    </div>


                                    <div>

                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />

                                        </svg>


                                        <span>
                                            {selectedRespondent.phone}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            MODAL FOOTER
                        ================================================= */}

                        <div className="tracer-modal-footer">

                            <button
                                type="button"
                                className="tracer-close-button"
                                onClick={() =>
                                    setSelectedRespondent(null)
                                }
                            >
                                Tutup
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </AdminLayout>
    )
}