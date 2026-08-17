import React from 'react'
import UserLayout from './UserLayout'

export default function AlumniDashboard() {

    // =========================================================
    // REKOMENDASI KAMPUS
    // =========================================================

    const campusRecommendations = [
        {
            name: 'Telkom University',
            location: 'Bandung',
            program: 'Informatika',
            reason: 'Banyak alumni RPL melanjutkan studi di sini',
        },
        {
            name: 'Universitas Indonesia',
            location: 'Depok',
            program: 'Ilmu Komputer',
            reason: 'Program studi sesuai dengan bidangmu',
        },
        {
            name: 'Universitas Gadjah Mada',
            location: 'Yogyakarta',
            program: 'Teknologi Informasi',
            reason: 'Memiliki program studi yang relevan',
        },
    ]


    // =========================================================
    // REKOMENDASI LOWONGAN
    // =========================================================

    const jobRecommendations = [
        {
            position: 'Frontend Developer',
            company: 'PT Teknologi Nusantara',
            location: 'Jakarta',
            type: 'Hybrid',
            match: '95%',
        },
        {
            position: 'Junior Web Developer',
            company: 'Digital Kreatif Indonesia',
            location: 'Bandung',
            type: 'On-site',
            match: '91%',
        },
        {
            position: 'UI/UX Designer',
            company: 'Karya Digital',
            location: 'Remote',
            type: 'Remote',
            match: '88%',
        },
        {
            position: 'Backend Developer',
            company: 'Tech Innovate',
            location: 'Jakarta',
            type: 'Hybrid',
            match: '86%',
        },
        {
            position: 'Software Engineer',
            company: 'Nusantara Digital',
            location: 'Surabaya',
            type: 'On-site',
            match: '84%',
        },
        {
            position: 'Web Developer',
            company: 'Kreatif Teknologi',
            location: 'Yogyakarta',
            type: 'Remote',
            match: '82%',
        },
    ]


    // =========================================================
    // REKOMENDASI BEASISWA
    // =========================================================

    const scholarships = [
        {
            title: 'Beasiswa Unggulan',
            provider: 'Kementerian Pendidikan',
            deadline: '20 September 2026',
        },
        {
            title: 'Beasiswa Telkom',
            provider: 'Telkom Foundation',
            deadline: '30 September 2026',
        },
        {
            title: 'Beasiswa Prestasi Akademik',
            provider: 'Universitas Indonesia',
            deadline: '10 Oktober 2026',
        },
    ]


    return (
        <UserLayout>

            <div className="user-dashboard">

                {/* =====================================================
                    HERO
                    ===================================================== */}

                <section className="user-hero">

                    <div className="user-hero-content">

                        <span className="user-hero-greeting">
                            Selamat datang kembali 👋
                        </span>

                        <h1>
                            Halo, Aulia!
                        </h1>

                        <p>
                            Temukan kampus, beasiswa, dan peluang kerja
                            yang sesuai dengan perjalananmu.
                        </p>

                        <div className="user-search">

                            <span className="search-icon">
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Cari kampus, beasiswa, atau lowongan..."
                            />

                            <button type="button">
                                Cari
                            </button>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    CAMPUS RECOMMENDATION
                    ===================================================== */}

                <section className="user-section">

                    <div className="user-section-heading">

                        <div>

                            <span className="section-label">
                                Rekomendasi untukmu
                            </span>

                            <h2>
                                Kampus pilihan alumni
                            </h2>

                            <p>
                                Rekomendasi berdasarkan jurusan dan
                                riwayat pendidikan alumni.
                            </p>

                        </div>

                        <a href="/alumni/kampus">
                            Lihat semua →
                        </a>

                    </div>


                    <div className="campus-recommendation-grid">

                        {campusRecommendations.map((campus, index) => (

                            <article
                                className="campus-recommendation-card"
                                key={index}
                            >

                                <div className="campus-card-top">

                                    <div className="campus-logo">
                                        🎓
                                    </div>

                                    <span className="recommendation-badge">
                                        Cocok untukmu
                                    </span>

                                </div>

                                <h3>
                                    {campus.name}
                                </h3>

                                <span className="campus-location">
                                    📍 {campus.location}
                                </span>

                                <div className="campus-program">
                                    {campus.program}
                                </div>

                                <p>
                                    {campus.reason}
                                </p>

                                <a href="/alumni/kampus">
                                    Lihat kampus →
                                </a>

                            </article>

                        ))}

                    </div>

                </section>


                {/* =====================================================
                    JOB RECOMMENDATION
                    ===================================================== */}

                <section className="user-section">

                    <div className="user-section-heading">

                        <div>

                            <span className="section-label">
                                Sesuai dengan jurusanmu
                            </span>

                            <h2>
                                Lowongan yang cocok untukmu
                            </h2>

                            <p>
                                Rekomendasi pekerjaan berdasarkan
                                jurusan dan kompetensimu.
                            </p>

                        </div>

                        <a href="/alumni/lowongan">
                            Lihat semua →
                        </a>

                    </div>


                    <div className="job-recommendation-grid">

                        {jobRecommendations.map((job, index) => (

                            <article
                                className="job-recommendation-card"
                                key={index}
                            >

                                <div className="job-card-header">

                                    <div className="job-company-logo">
                                        💼
                                    </div>

                                    <span className="job-match">
                                        {job.match} cocok
                                    </span>

                                </div>


                                <h3>
                                    {job.position}
                                </h3>


                                <span className="job-company">
                                    {job.company}
                                </span>


                                <div className="job-meta">

                                    <span>
                                        📍 {job.location}
                                    </span>

                                    <span>
                                        💼 {job.type}
                                    </span>

                                </div>


                                <a
                                    href="/alumni/lowongan"
                                    className="job-view-button"
                                >
                                    Lihat lowongan →
                                </a>

                            </article>

                        ))}

                    </div>

                </section>


                {/* =====================================================
                    SCHOLARSHIP
                    ===================================================== */}

                <section className="user-section">

                    <div className="user-section-heading">

                        <div>

                            <span className="section-label">
                                Jangan lewatkan
                            </span>

                            <h2>
                                Beasiswa terbaru
                            </h2>

                            <p>
                                Informasi beasiswa dari berbagai sumber.
                            </p>

                        </div>

                        <a href="/alumni/beasiswa">
                            Lihat semua →
                        </a>

                    </div>


                    <div className="scholarship-grid">

                        {scholarships.map((scholarship, index) => (

                            <article
                                className="scholarship-card-item"
                                key={index}
                            >

                                <div className="scholarship-icon">
                                    🎓
                                </div>

                                <span className="scholarship-label">
                                    Beasiswa
                                </span>

                                <h3>
                                    {scholarship.title}
                                </h3>

                                <p>
                                    {scholarship.provider}
                                </p>


                                <div className="scholarship-deadline">

                                    <span>
                                        Deadline
                                    </span>

                                    <strong>
                                        {scholarship.deadline}
                                    </strong>

                                </div>


                                <a href="/alumni/beasiswa">
                                    Lihat detail →
                                </a>

                            </article>

                        ))}

                    </div>

                </section>


                {/* =====================================================
                    TRACER STUDY
                    ===================================================== */}

                <section className="dashboard-tracer-card">

                    <div className="dashboard-tracer-content">

                        <span className="section-label">
                            Tracer Study
                        </span>

                        <h2>
                            Lengkapi perjalananmu bersama kami
                        </h2>

                        <p>
                            Data tracer study membantu sekolah memahami
                            perjalanan alumni sekaligus memberikan
                            rekomendasi yang lebih relevan untukmu.
                        </p>

                        <a
                            href="/alumni/tracer-study"
                            className="dashboard-tracer-button"
                        >
                            Lanjutkan Tracer Study →
                        </a>

                    </div>

                </section>

            </div>

        </UserLayout>
    )
}