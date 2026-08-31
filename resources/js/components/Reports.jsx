import React, { useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'

export default function Reports() {

    // =========================================================
    // STATE
    // =========================================================

    const [period, setPeriod] = useState('Semua Periode')
    const [search, setSearch] = useState('')

    // =========================================================
    // DUMMY DATA
    // =========================================================

    const reportStats = [
        {
            title: 'Total Alumni',
            value: '1,248',
            change: '+12.5%',
            description: 'dibanding periode sebelumnya',
            type: 'alumni',
        },
        {
            title: 'Respons Tracer Study',
            value: '986',
            change: '+8.4%',
            description: 'alumni telah mengisi',
            type: 'response',
        },
        {
            title: 'Total Perusahaan',
            value: '184',
            change: '+6.2%',
            description: 'perusahaan terdata',
            type: 'company',
        },
        {
            title: 'Tingkat Respons',
            value: '79.0%',
            change: '+4.8%',
            description: 'dari total alumni',
            type: 'rate',
        },
    ]

    const employmentData = [
        {
            label: 'Bekerja',
            value: 612,
            percentage: 62,
            className: 'working',
        },
        {
            label: 'Wirausaha',
            value: 154,
            percentage: 16,
            className: 'entrepreneur',
        },
        {
            label: 'Melanjutkan Pendidikan',
            value: 146,
            percentage: 15,
            className: 'education',
        },
        {
            label: 'Belum Bekerja',
            value: 74,
            percentage: 7,
            className: 'unemployed',
        },
    ]

    const activities = [
        {
            id: 1,
            title: 'Tracer Study baru masuk',
            description: 'Andi Pratama telah mengisi tracer study.',
            time: '10 menit yang lalu',
            type: 'tracer',
        },
        {
            id: 2,
            title: 'Alumni baru terdaftar',
            description: 'Siti Rahma telah ditambahkan ke data alumni.',
            time: '35 menit yang lalu',
            type: 'alumni',
        },
        {
            id: 3,
            title: 'Data perusahaan diperbarui',
            description: 'Data PT Telkom Indonesia berhasil diperbarui.',
            time: '1 jam yang lalu',
            type: 'company',
        },
        {
            id: 4,
            title: 'Tracer Study baru masuk',
            description: 'Budi Santoso telah mengisi tracer study.',
            time: '2 jam yang lalu',
            type: 'tracer',
        },
        {
            id: 5,
            title: 'Data alumni diperbarui',
            description: 'Data alumni Rina Amelia telah diperbarui.',
            time: '3 jam yang lalu',
            type: 'update',
        },
        {
            id: 6,
            title: 'Perusahaan baru ditambahkan',
            description: 'PT Digital Nusantara telah ditambahkan.',
            time: '5 jam yang lalu',
            type: 'company',
        },
    ]

    // =========================================================
    // FILTER ACTIVITY
    // =========================================================

    const filteredActivities = useMemo(() => {

        const keyword = search.toLowerCase().trim()

        if (!keyword) {
            return activities
        }

        return activities.filter((activity) =>
            activity.title.toLowerCase().includes(keyword) ||
            activity.description.toLowerCase().includes(keyword)
        )

    }, [search])

    // =========================================================
    // ICON
    // =========================================================

    function StatIcon({ type }) {

        if (type === 'alumni') {
            return (
                <svg viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        }

        if (type === 'response') {
            return (
                <svg viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.5 8.5 0 0 1-4-.98L3 21l1.98-4A8.5 8.5 0 1 1 21 11.5Z" />
                    <polyline points="8 11 11 14 16 8" />
                </svg>
            )
        }

        if (type === 'company') {
            return (
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
            )
        }

        return (
            <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </svg>
        )
    }

    function ActivityIcon({ type }) {

        if (type === 'tracer') {
            return (
                <svg viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <polyline points="8 13 10 15 16 9" />
                </svg>
            )
        }

        if (type === 'alumni') {
            return (
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
            )
        }

        if (type === 'company') {
            return (
                <svg viewBox="0 0 24 24">
                    <path d="M3 21h18" />
                    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                    <path d="M9 7h1" />
                    <path d="M14 7h1" />
                    <path d="M9 11h1" />
                    <path d="M14 11h1" />
                </svg>
            )
        }

        return (
            <svg viewBox="0 0 24 24">
                <path d="M20 7 10 17l-5-5" />
            </svg>
        )
    }

    // =========================================================
    // RENDER
    // =========================================================

    return (

        <AdminLayout>

        <div className="reports-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <section className="reports-header">

                <div className="reports-header-left">

                    <div className="reports-title-icon">
                        <svg viewBox="0 0 24 24">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                    </div>

                    <div>
                        <h2>
                            Laporan & Aktivitas
                        </h2>

                        <p>
                            Pantau perkembangan data alumni dan tracer study.
                        </p>
                    </div>

                </div>

                <div className="reports-period">

                    <svg viewBox="0 0 24 24">
                        <rect
                            x="3"
                            y="4"
                            width="18"
                            height="17"
                            rx="2"
                        />

                        <line
                            x1="16"
                            y1="2"
                            x2="16"
                            y2="6"
                        />

                        <line
                            x1="8"
                            y1="2"
                            x2="8"
                            y2="6"
                        />

                        <line
                            x1="3"
                            y1="10"
                            x2="21"
                            y2="10"
                        />
                    </svg>

                    <select
                        value={period}
                        onChange={(event) =>
                            setPeriod(event.target.value)
                        }
                    >
                        <option>
                            Semua Periode
                        </option>

                        <option>
                            Tahun 2026
                        </option>

                        <option>
                            Tahun 2025
                        </option>

                        <option>
                            Tahun 2024
                        </option>

                        <option>
                            Tahun 2023
                        </option>
                    </select>

                </div>

            </section>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <section className="reports-stat-grid">

                {reportStats.map((stat) => (

                    <div
                        className="report-stat-card"
                        key={stat.title}
                    >

                        <div className={`report-stat-icon ${stat.type}`}>
                            <StatIcon type={stat.type} />
                        </div>

                        <div className="report-stat-content">

                            <span className="report-stat-title">
                                {stat.title}
                            </span>

                            <strong className="report-stat-value">
                                {stat.value}
                            </strong>

                            <div className="report-stat-footer">

                                <span className="report-stat-change">
                                    {stat.change}
                                </span>

                                <span>
                                    {stat.description}
                                </span>

                            </div>

                        </div>

                    </div>

                ))}

            </section>


            {/* =================================================
                MAIN REPORT GRID
            ================================================= */}

            <section className="reports-main-grid">


                {/* =================================================
                    TRACER SUMMARY
                ================================================= */}

                <div className="report-card tracer-summary-card">

                    <div className="report-card-header">

                        <div>
                            <h3>
                                Status Tracer Study
                            </h3>

                            <p>
                                Perbandingan alumni yang telah mengisi tracer study.
                            </p>
                        </div>

                    </div>


                    <div className="tracer-summary-content">

                        <div className="tracer-circle">

                            <div className="tracer-circle-inner">

                                <strong>
                                    79%
                                </strong>

                                <span>
                                    Respons
                                </span>

                            </div>

                        </div>


                        <div className="tracer-legend">

                            <div className="legend-item">

                                <span className="legend-dot completed"></span>

                                <div>
                                    <strong>
                                        Sudah Mengisi
                                    </strong>

                                    <span>
                                        986 alumni
                                    </span>
                                </div>

                            </div>


                            <div className="legend-item">

                                <span className="legend-dot pending"></span>

                                <div>
                                    <strong>
                                        Belum Mengisi
                                    </strong>

                                    <span>
                                        262 alumni
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    EMPLOYMENT
                ================================================= */}

                <div className="report-card employment-card">

                    <div className="report-card-header">

                        <div>
                            <h3>
                                Status Alumni
                            </h3>

                            <p>
                                Kondisi alumni berdasarkan tracer study.
                            </p>
                        </div>

                    </div>


                    <div className="employment-list">

                        {employmentData.map((item) => (

                            <div
                                className="employment-item"
                                key={item.label}
                            >

                                <div className="employment-info">

                                    <div className="employment-label">

                                        <span
                                            className={`employment-dot ${item.className}`}
                                        ></span>

                                        <span>
                                            {item.label}
                                        </span>

                                    </div>

                                    <strong>
                                        {item.value}
                                    </strong>

                                </div>


                                <div className="employment-progress">

                                    <div
                                        className={`employment-progress-fill ${item.className}`}
                                        style={{
                                            width: `${item.percentage}%`,
                                        }}
                                    ></div>

                                </div>


                                <span className="employment-percentage">
                                    {item.percentage}%
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* =================================================
                ACTIVITY SECTION
            ================================================= */}

            <section className="report-card activity-card">

                <div className="report-card-header activity-header">

                    <div>

                        <h3>
                            Aktivitas Terbaru
                        </h3>

                        <p>
                            Riwayat aktivitas terbaru pada sistem.
                        </p>

                    </div>


                    <div className="activity-search">

                        <svg viewBox="0 0 24 24">

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

                        <input
                            type="text"
                            placeholder="Cari aktivitas..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                    </div>

                </div>


                <div className="activity-list">

                    {filteredActivities.length > 0 ? (

                        filteredActivities.map((activity) => (

                            <div
                                className="activity-item"
                                key={activity.id}
                            >

                                <div
                                    className={`activity-icon ${activity.type}`}
                                >
                                    <ActivityIcon
                                        type={activity.type}
                                    />
                                </div>


                                <div className="activity-content">

                                    <strong>
                                        {activity.title}
                                    </strong>

                                    <span>
                                        {activity.description}
                                    </span>

                                </div>


                                <time>
                                    {activity.time}
                                </time>

                            </div>

                        ))

                    ) : (

                        <div className="activity-empty">

                            <svg viewBox="0 0 24 24">

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

                            <strong>
                                Aktivitas tidak ditemukan
                            </strong>

                            <span>
                                Coba gunakan kata kunci lainnya.
                            </span>

                        </div>

                    )}

                </div>

            </section>


            {/* =================================================
                REPORT FOOTER INFO
            ================================================= */}

            <section className="report-info-banner">

                <div className="report-info-icon">

                    <svg viewBox="0 0 24 24">

                        <circle
                            cx="12"
                            cy="12"
                            r="9"
                        />

                        <line
                            x1="12"
                            y1="10"
                            x2="12"
                            y2="16"
                        />

                        <circle
                            cx="12"
                            cy="7"
                            r=".8"
                            fill="currentColor"
                            stroke="none"
                        />

                    </svg>

                </div>

                <div>

                    <strong>
                        Informasi Laporan
                    </strong>

                    <p>
                        Data pada halaman ini merupakan ringkasan
                        aktivitas dan statistik alumni berdasarkan
                        data tracer study yang tersimpan di sistem.
                    </p>

                </div>

            </section>

        </div>
        </AdminLayout>
    )
}