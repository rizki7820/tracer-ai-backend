import React from 'react'
import { createRoot } from 'react-dom/client'

import Profile from './components/Profile'

import '../css/profile.css'

const rootEl = document.getElementById('root')

if (rootEl) {
    const root = createRoot(rootEl)

    root.render(
        <React.StrictMode>
            <Profile />
        </React.StrictMode>
    )
}