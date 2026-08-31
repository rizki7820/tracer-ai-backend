import React from 'react'
import UserNavbar from './UserNavbar'

export default function UserLayout({ children }) {

    return (
        <div className="user-layout">

            <UserNavbar />

            <main className="user-main">
                {children}
            </main>

            <footer className="user-footer">
                <p>
                    © 2026 Tracer Alumni - Telkom Schools
                </p>
            </footer>

        </div>
    )
}