import React from 'react'
import AdminLayout from './AdminLayout'

export default function AdminDashboard() {

    // =========================================================
    // DUMMY DATA
    // =========================================================

    const stats = [
        {
            title: 'Total Alumni',
            value: '2,458',
            change: '+12.5%',
            description: 'dari bulan lalu',
            icon: 'users',
            type: 'red',
        },
        {
            title: 'Alumni Bekerja',
            value: '1,842',
            change: '+8.2%',
            description: 'dari bulan lalu',
            icon: 'briefcase',
            type: 'blue',
        },
        {
            title: 'Alumni Melanjutkan Studi',
            value: '426',
            change: '+5.4%',
            description: 'dari bulan lalu',
            icon: 'book',
            type: 'purple',
        },
        {
            title: 'Belum Terdata',
            value: '190',
            change: '-2.1%',
            description: 'dari bulan lalu',
            icon: 'user',
            type: 'orange',
        },
    ]


    // =========================================================
    // PERKEMBANGAN DATA ALUMNI
    // =========================================================

    const monthlyData = [
        { month: 'Jan', value: 55 },
        { month: 'Feb', value: 62 },
        { month: 'Mar', value: 58 },
        { month: 'Apr', value: 72 },
        { month: 'Mei', value: 68 },
        { month: 'Jun', value: 80 },
        { month: 'Jul', value: 74 },
        { month: 'Agu', value: 92 },
    ]


    // =========================================================
    // STATUS ALUMNI SETELAH LULUS
    // =========================================================

    const afterGraduationStatus = [
        {
            label: 'Bekerja',
            value: 52,
            count: 1278,
            className: 'working',
        },
        {
            label: 'Kuliah',
            value: 28,
            count: 688,
            className: 'study',
        },
        {
            label: 'Wirausaha',
            value: 12,
            count: 295,
            className: 'business',
        },
        {
            label: 'Belum Terdata',
            value: 8,
            count: 197,
            className: 'unknown',
        },
    ]


    // =========================================================
    // STATUS ALUMNI SAAT INI
    // =========================================================

    const currentStatus = [
        {
            label: 'Bekerja',
            value: 75,
            count: 1842,
            className: 'working',
        },
        {
            label: 'Kuliah',
            value: 17,
            count: 426,
            className: 'study',
        },
        {
            label: 'Wirausaha',
            value: 0,
            count: 0,
            className: 'business',
        },
        {
            label: 'Belum Terdata',
            value: 8,
            count: 190,
            className: 'unknown',
        },
    ]


    // =========================================================
    // ALUMNI PER TAHUN
    // =========================================================

    const alumniByYear = [
        { year: '2020', value: 285 },
        { year: '2021', value: 312 },
        { year: '2022', value: 348 },
        { year: '2023', value: 391 },
        { year: '2024', value: 426 },
        { year: '2025', value: 482 },
    ]


    // =========================================================
    // ICON
    // =========================================================

    function getIcon(icon) {

        const icons = {

            users: (
                <svg viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),

            briefcase: (
                <svg viewBox="0 0 24 24">
                    <rect
                        x="3"
                        y="7"
                        width="18"
                        height="13"
                        rx="2"
                    />
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M3 12h18" />
                    <path d="M10 12v2h4v-2" />
                </svg>
            ),

            book: (
                <svg viewBox="0 0 24 24">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
            ),

            user: (
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
            ),

        }

        return icons[icon]
    }


    // =========================================================
    // HELPER DIAGRAM DONUT
    // =========================================================

    const createDonutGradient = (data) => {

        let currentPosition = 0

        const colors = {
            working: '#d71920',
            study: '#6c63ff',
            business: '#f59e0b',
            unknown: '#d1d5db',
        }

        const segments = data
            .filter((item) => item.value > 0)
            .map((item) => {

                const start = currentPosition

                currentPosition += item.value

                return `${colors[item.className]} ${start}% ${currentPosition}%`
            })

        return `conic-gradient(${segments.join(', ')})`
    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <AdminLayout
            activeMenu="Dashboard"
            pageTitle="Dashboard"
            pageDescription="Selamat datang kembali, Admin."
        >

            <div className="dashboard-content">


                {/* =================================================
                    WELCOME
                ================================================= */}

                <section className="welcome-card">

                    <div>

                        <span className="welcome-badge">
                            ADMIN DASHBOARD
                        </span>

                        <h2>
                            Selamat Datang di Tracer Alumni 👋
                        </h2>

                        <p>
                            Pantau perkembangan data alumni,
                            tracer study, dan informasi terkait
                            alumni Telkom Schools dalam satu tempat.
                        </p>

                    </div>


                    <div className="welcome-decoration">

                        <div className="decoration-circle circle-one"></div>
                        <div className="decoration-circle circle-two"></div>
                        <div className="decoration-circle circle-three"></div>

                    </div>

                </section>


                {/* =================================================
                    STATS
                ================================================= */}

                <section className="stats-grid">

                    {stats.map((stat) => (

                        <div
                            className="stat-card"
                            key={stat.title}
                        >

                            <div className="stat-top">

                                <div
                                    className={`stat-icon ${stat.type}`}
                                >
                                    {getIcon(stat.icon)}
                                </div>


                                <span
                                    className={
                                        stat.change.startsWith('-')
                                            ? 'stat-change negative'
                                            : 'stat-change'
                                    }
                                >
                                    {stat.change}
                                </span>

                            </div>


                            <div className="stat-value">
                                {stat.value}
                            </div>


                            <div className="stat-title">
                                {stat.title}
                            </div>


                            <div className="stat-description">
                                {stat.description}
                            </div>

                        </div>

                    ))}

                </section>


                {/* =================================================
                    BARIS 1
                    STATUS SETELAH LULUS + STATUS SAAT INI
                ================================================= */}

                <section className="dashboard-grid">


                    {/* =================================================
                        STATUS ALUMNI SETELAH LULUS
                    ================================================= */}

                    <div className="dashboard-card status-card">

                        <div className="card-header">

                            <div>

                                <h3>
                                    Status Setelah Lulus
                                </h3>

                                <p>
                                    Kondisi alumni tepat setelah menyelesaikan pendidikan
                                </p>

                            </div>

                        </div>


                        <StatusDonut
                            data={afterGraduationStatus}
                            total="2,458"
                            gradient={createDonutGradient(
                                afterGraduationStatus
                            )}
                        />

                    </div>


                    {/* =================================================
                        STATUS ALUMNI SAAT INI
                    ================================================= */}

                    <div className="dashboard-card status-card">

                        <div className="card-header">

                            <div>

                                <h3>
                                    Status Alumni Saat Ini
                                </h3>

                                <p>
                                    Kondisi alumni berdasarkan data terbaru
                                </p>

                            </div>

                        </div>


                        <StatusDonut
                            data={currentStatus}
                            total="2,458"
                            gradient={createDonutGradient(currentStatus)}
                        />

                    </div>

                </section>


                {/* =================================================
                    BARIS 2
                    PERKEMBANGAN DATA + PERBANDINGAN STATUS
                ================================================= */}

                <section className="dashboard-grid">


                    {/* =================================================
                        PERKEMBANGAN DATA ALUMNI
                    ================================================= */}

                    <div className="dashboard-card chart-card">

                        <div className="card-header">

                            <div>

                                <h3>
                                    Perkembangan Data Alumni
                                </h3>

                                <p>
                                    Data alumni yang terdaftar setiap bulan
                                </p>

                            </div>


                            <select className="chart-select">

                                <option>
                                    2026
                                </option>

                                <option>
                                    2025
                                </option>

                                <option>
                                    2024
                                </option>

                            </select>

                        </div>


                        <div className="chart-container">

                            <div className="chart-y-axis">

                                <span>100</span>
                                <span>75</span>
                                <span>50</span>
                                <span>25</span>
                                <span>0</span>

                            </div>


                            <div className="chart-area">

                                <div className="chart-grid-lines">

                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>

                                </div>


                                <div className="bars">

                                    {monthlyData.map(
                                        (item, index) => {

                                            const isCurrentMonth =
                                                index ===
                                                monthlyData.length - 1

                                            return (

                                                <div
                                                    className="bar-wrapper"
                                                    key={item.month}
                                                >

                                                    <div
                                                        className={
                                                            isCurrentMonth
                                                                ? 'bar current'
                                                                : 'bar previous'
                                                        }
                                                        style={{
                                                            height:
                                                                `${item.value}%`,
                                                        }}
                                                    >

                                                        <span>
                                                            {item.value}
                                                        </span>

                                                    </div>


                                                    <small>
                                                        {item.month}
                                                    </small>

                                                </div>

                                            )

                                        }
                                    )}

                                </div>

                            </div>

                        </div>


                        <div className="chart-legend">

                            <span>
                                <i className="legend-current"></i>
                                Bulan ini
                            </span>

                            <span>
                                <i className="legend-previous"></i>
                                Bulan sebelumnya
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        PERBANDINGAN STATUS
                    ================================================= */}

                    <div className="dashboard-card status-summary-card">

                        <div className="card-header">

                            <div>

                                <h3>
                                    Perbandingan Status
                                </h3>

                                <p>
                                    Ringkasan data alumni
                                </p>

                            </div>

                        </div>


                        <div className="comparison-list">

                            <div className="comparison-item">

                                <div className="comparison-icon working">
                                    {getIcon('briefcase')}
                                </div>

                                <div className="comparison-content">

                                    <span>
                                        Bekerja setelah lulus
                                    </span>

                                    <strong>
                                        52%
                                    </strong>

                                </div>

                            </div>


                            <div className="comparison-item">

                                <div className="comparison-icon study">
                                    {getIcon('book')}
                                </div>

                                <div className="comparison-content">

                                    <span>
                                        Melanjutkan studi
                                    </span>

                                    <strong>
                                        28%
                                    </strong>

                                </div>

                            </div>


                            <div className="comparison-item">

                                <div className="comparison-icon business">
                                    {getIcon('users')}
                                </div>

                                <div className="comparison-content">

                                    <span>
                                        Wirausaha
                                    </span>

                                    <strong>
                                        12%
                                    </strong>

                                </div>

                            </div>


                            <div className="comparison-item">

                                <div className="comparison-icon unknown">
                                    {getIcon('user')}
                                </div>

                                <div className="comparison-content">

                                    <span>
                                        Belum terdata
                                    </span>

                                    <strong>
                                        8%
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    DATA ALUMNI PER TAHUN
                ================================================= */}

                <section className="dashboard-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                Data Alumni per Tahun
                            </h3>

                            <p>
                                Jumlah alumni berdasarkan tahun kelulusan
                            </p>

                        </div>

                    </div>


                    <div className="year-list">

                        {alumniByYear.map((item) => (

                            <div
                                className="year-item"
                                key={item.year}
                            >

                                <div className="year-info">

                                    <span>
                                        Angkatan {item.year}
                                    </span>

                                    <strong>
                                        {item.value} alumni
                                    </strong>

                                </div>


                                <div className="year-progress">

                                    <span
                                        style={{
                                            width:
                                                `${(item.value / 482) * 100}%`,
                                        }}
                                    ></span>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            </div>

        </AdminLayout>
    )
}


// =====================================================================
// STATUS DONUT COMPONENT
// =====================================================================

function StatusDonut({
    data,
    total,
    gradient,
}) {

    return (

        <div className="status-donut-wrapper">


            {/* =================================================
                DONUT
            ================================================= */}

            <div
                className="donut"
                style={{
                    background: gradient,
                }}
            >

                <div className="donut-center">

                    <strong>
                        {total}
                    </strong>

                    <span>
                        Total Alumni
                    </span>

                </div>

            </div>


            {/* =================================================
                STATUS LIST
            ================================================= */}

            <div className="status-list">

                {data.map((item) => (

                    <div
                        className="status-item"
                        key={item.label}
                    >

                        <span>

                            <i
                                className={`status-dot ${item.className}`}
                            ></i>

                            {item.label}

                        </span>


                        <div className="status-item-value">

                            <strong>
                                {item.value}%
                            </strong>

                            <small>
                                {item.count.toLocaleString('id-ID')}
                            </small>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}