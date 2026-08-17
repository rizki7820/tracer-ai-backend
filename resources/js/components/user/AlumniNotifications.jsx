import React, { useState } from 'react'
import UserLayout from './UserLayout'

export default function AlumniNotification() {

    // =========================================================
    // DEFAULT NOTIFICATIONS
    // =========================================================

    const defaultNotifications = [
        {
            id: 1,
            type: 'kampus',
            title: 'Informasi kampus terbaru tersedia',
            description:
                'Informasi terbaru mengenai kampus dan program studi kini tersedia untuk kamu.',
            source: 'Telkom University',
            date: '13 Agustus 2026',
            time: '10:30',
            read: false,
            link: '/alumni/kampus',
        },
        {
            id: 2,
            type: 'lowongan',
            title: 'Lowongan kerja baru tersedia',
            description:
                'Ada lowongan Frontend Developer yang sesuai dengan bidang dan jurusanmu.',
            source: 'PT Teknologi Nusantara',
            date: '13 Agustus 2026',
            time: '09:15',
            read: false,
            link: '/alumni/lowongan',
        },
        {
            id: 3,
            type: 'beasiswa',
            title: 'Beasiswa baru telah ditambahkan',
            description:
                'Beasiswa Unggulan kini tersedia. Segera cek informasi dan persyaratan pendaftarannya.',
            source: 'Kementerian Pendidikan',
            date: '12 Agustus 2026',
            time: '14:20',
            read: true,
            link: '/alumni/beasiswa',
        },
        {
            id: 4,
            type: 'kampus',
            title: 'Program studi baru tersedia',
            description:
                'Temukan informasi program studi terbaru yang mungkin sesuai dengan minatmu.',
            source: 'Universitas Indonesia',
            date: '11 Agustus 2026',
            time: '11:45',
            read: true,
            link: '/alumni/kampus',
        },
        {
            id: 5,
            type: 'lowongan',
            title: 'Lowongan Web Developer tersedia',
            description:
                'Kamu mungkin tertarik dengan lowongan Web Developer yang baru ditambahkan.',
            source: 'Kreatif Teknologi',
            date: '10 Agustus 2026',
            time: '16:10',
            read: true,
            link: '/alumni/lowongan',
        },
    ]


    // =========================================================
    // LOAD NOTIFICATIONS
    // =========================================================

    const getInitialNotifications = () => {

        try {

            const savedNotifications =
                localStorage.getItem(
                    'alumniNotifications'
                )

            if (savedNotifications) {

                const parsed =
                    JSON.parse(savedNotifications)

                if (Array.isArray(parsed)) {
                    return parsed
                }

            }

        } catch (error) {

            console.error(
                'Gagal membaca notifikasi:',
                error
            )

        }

        return defaultNotifications
    }


    // =========================================================
    // STATE
    // =========================================================

    const [notifications, setNotifications] =
        useState(getInitialNotifications)


    const [activeFilter, setActiveFilter] =
        useState('semua')


    // =========================================================
    // SAVE NOTIFICATIONS
    // =========================================================

    const saveNotifications = updatedNotifications => {

        setNotifications(updatedNotifications)

        localStorage.setItem(
            'alumniNotifications',
            JSON.stringify(
                updatedNotifications
            )
        )

    }


    // =========================================================
    // MARK AS READ
    // =========================================================

    const handleNotificationClick = notification => {

        const updatedNotifications =
            notifications.map(item =>
                item.id === notification.id
                    ? {
                        ...item,
                        read: true
                    }
                    : item
            )

        saveNotifications(
            updatedNotifications
        )

        window.location.href =
            notification.link

    }


    // =========================================================
    // MARK ALL AS READ
    // =========================================================

    const handleMarkAllAsRead = () => {

        const updatedNotifications =
            notifications.map(item => ({
                ...item,
                read: true
            }))

        saveNotifications(
            updatedNotifications
        )

    }


    // =========================================================
    // FILTER
    // =========================================================

    const filteredNotifications =
        notifications.filter(notification => {

            if (activeFilter === 'belum') {
                return !notification.read
            }

            if (activeFilter === 'dibaca') {
                return notification.read
            }

            return true

        })


    // =========================================================
    // UNREAD COUNT
    // =========================================================

    const unreadCount =
        notifications.filter(
            notification =>
                !notification.read
        ).length


    // =========================================================
    // TYPE CONFIG
    // =========================================================

    const getNotificationType = type => {

        if (type === 'kampus') {

            return {
                label: 'Kampus',
                icon: '🎓',
                className: 'notification-campus'
            }

        }

        if (type === 'lowongan') {

            return {
                label: 'Lowongan',
                icon: '💼',
                className: 'notification-job'
            }

        }

        return {
            label: 'Beasiswa',
            icon: '🎓',
            className: 'notification-scholarship'
        }

    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <UserLayout>

            <div className="alumni-notification-page">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="notification-page-header">

                    <div>

                        <span className="notification-label">
                            PEMBERITAHUAN
                        </span>

                        <h1>
                            Notifikasi
                        </h1>

                        <p>
                            Informasi terbaru seputar kampus,
                            beasiswa, dan peluang kerja untukmu.
                        </p>

                    </div>


                    {unreadCount > 0 && (

                        <button
                            type="button"
                            className="notification-mark-all"
                            onClick={
                                handleMarkAllAsRead
                            }
                        >
                            Tandai semua sudah dibaca
                        </button>

                    )}

                </div>


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div className="notification-summary">

                    <div className="notification-summary-icon">
                        🔔
                    </div>

                    <div>

                        <strong>
                            {unreadCount > 0
                                ? `${unreadCount} notifikasi belum dibaca`
                                : 'Semua notifikasi sudah dibaca'}
                        </strong>

                        <span>
                            Jangan lewatkan informasi terbaru
                            yang mungkin bermanfaat untukmu.
                        </span>

                    </div>

                </div>


                {/* =================================================
                    FILTER
                ================================================= */}

                <div className="notification-filter">

                    <button
                        type="button"
                        className={
                            activeFilter === 'semua'
                                ? 'active'
                                : ''
                        }
                        onClick={() =>
                            setActiveFilter('semua')
                        }
                    >
                        Semua
                    </button>


                    <button
                        type="button"
                        className={
                            activeFilter === 'belum'
                                ? 'active'
                                : ''
                        }
                        onClick={() =>
                            setActiveFilter('belum')
                        }
                    >
                        Belum dibaca

                        {unreadCount > 0 && (

                            <span className="filter-count">
                                {unreadCount}
                            </span>

                        )}

                    </button>


                    <button
                        type="button"
                        className={
                            activeFilter === 'dibaca'
                                ? 'active'
                                : ''
                        }
                        onClick={() =>
                            setActiveFilter('dibaca')
                        }
                    >
                        Sudah dibaca
                    </button>

                </div>


                {/* =================================================
                    NOTIFICATION LIST
                ================================================= */}

                <div className="notification-list">

                    {filteredNotifications.length > 0 ? (

                        filteredNotifications.map(
                            notification => {

                                const type =
                                    getNotificationType(
                                        notification.type
                                    )

                                return (

                                    <button
                                        type="button"
                                        key={notification.id}
                                        className={
                                            notification.read
                                                ? 'notification-item'
                                                : 'notification-item unread'
                                        }
                                        onClick={() =>
                                            handleNotificationClick(
                                                notification
                                            )
                                        }
                                    >

                                        {/* ICON */}

                                        <div
                                            className={
                                                `notification-icon ${type.className}`
                                            }
                                        >
                                            {type.icon}
                                        </div>


                                        {/* CONTENT */}

                                        <div className="notification-content">

                                            <div className="notification-top">

                                                <span
                                                    className={
                                                        `notification-type ${type.className}`
                                                    }
                                                >
                                                    {type.label}
                                                </span>

                                                {!notification.read && (

                                                    <span className="notification-unread-dot">
                                                    </span>

                                                )}

                                            </div>


                                            <h3>
                                                {notification.title}
                                            </h3>


                                            <p>
                                                {
                                                    notification.description
                                                }
                                            </p>


                                            <div className="notification-meta">

                                                <span>
                                                    {notification.source}
                                                </span>

                                                <span>
                                                    •
                                                </span>

                                                <span>
                                                    {notification.date}
                                                </span>

                                                <span>
                                                    •
                                                </span>

                                                <span>
                                                    {notification.time}
                                                </span>

                                            </div>

                                        </div>


                                        {/* ARROW */}

                                        <span className="notification-arrow">
                                            →
                                        </span>

                                    </button>

                                )

                            }
                        )

                    ) : (

                        /* =================================================
                           EMPTY STATE
                        ================================================= */

                        <div className="notification-empty">

                            <div className="notification-empty-icon">
                                🔔
                            </div>

                            <h3>
                                Tidak ada notifikasi
                            </h3>

                            <p>
                                Belum ada informasi baru untuk
                                kategori yang kamu pilih.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </UserLayout>
    )
}