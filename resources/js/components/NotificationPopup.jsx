import React from 'react'

export default function NotificationPopup({
    notifications = [],
    onViewAll,
}) {

    const defaultNotifications = [
        {
            id: 1,
            type: 'alumni',
            title: 'Alumni baru terdaftar',
            message: 'Ada alumni baru yang baru saja ditambahkan ke sistem.',
            time: '5 menit yang lalu',
            unread: true,
        },
        {
            id: 2,
            type: 'tracer',
            title: 'Tracer Study baru',
            message: 'Terdapat respons Tracer Study yang perlu diperiksa.',
            time: '25 menit yang lalu',
            unread: true,
        },
        {
            id: 3,
            type: 'company',
            title: 'Data perusahaan diperbarui',
            message: 'Informasi perusahaan tempat alumni bekerja telah diperbarui.',
            time: '1 jam yang lalu',
            unread: true,
        },
        {
            id: 4,
            type: 'report',
            title: 'Laporan siap diperiksa',
            message: 'Laporan Tracer Alumni terbaru telah tersedia.',
            time: '2 jam yang lalu',
            unread: false,
        },
    ]

    const data =
        notifications.length > 0
            ? notifications
            : defaultNotifications

    function getIcon(type) {

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

        if (type === 'tracer') {
            return (
                <svg viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="16" y2="17" />
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
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        )
    }

    function getIconClass(type) {
        return `notification-icon ${type || 'report'}`
    }

    return (
        <div className="notification-popup">

            {/* HEADER */}

            <div className="notification-popup-header">

                <div>
                    <h3>
                        Notifikasi
                    </h3>

                    <span>
                        {data.filter(
                            (item) => item.unread
                        ).length}{' '}
                        belum dibaca
                    </span>
                </div>

            </div>


            {/* LIST */}

            <div className="notification-list">

                {data.length === 0 ? (

                    <div className="notification-empty">

                        <div className="notification-empty-icon">

                            <svg viewBox="0 0 24 24">

                                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

                                <path d="M10 21h4" />

                            </svg>

                        </div>

                        <strong>
                            Tidak ada notifikasi
                        </strong>

                        <span>
                            Semua aktivitas sudah diperiksa.
                        </span>

                    </div>

                ) : (

                    data.map((notification) => (

                        <button
                            key={notification.id}
                            type="button"
                            className={
                                notification.unread
                                    ? 'notification-item unread'
                                    : 'notification-item'
                            }
                        >

                            <div
                                className={getIconClass(
                                    notification.type
                                )}
                            >
                                {getIcon(
                                    notification.type
                                )}
                            </div>


                            <div className="notification-content">

                                <div className="notification-title-row">

                                    <strong>
                                        {notification.title}
                                    </strong>

                                    {notification.unread && (
                                        <span className="notification-unread-dot"></span>
                                    )}

                                </div>

                                <p>
                                    {notification.message}
                                </p>

                                <span className="notification-time">
                                    {notification.time}
                                </span>

                            </div>

                        </button>

                    ))

                )}

            </div>


            {/* FOOTER */}

            <div className="notification-popup-footer">

                <button
                    type="button"
                    onClick={onViewAll}
                >
                    Lihat semua notifikasi

                    <svg
                        viewBox="0 0 24 24"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>

                </button>

            </div>

        </div>
    )
}