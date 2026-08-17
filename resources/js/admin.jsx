// import React from 'react'
// import { createRoot } from 'react-dom/client'

// import AdminDashboard from './components/AdminDashboard'
// import Alumni from './components/Alumni'
// import Settings from './components/Settings'

// const rootEl = document.getElementById('admin-root')

// if (rootEl) {

//     const root = createRoot(rootEl)

//     const path = window.location.pathname

//     let component = <AdminDashboard />

//     // Dashboard
//     if (path === '/admin-page') {
//         component = <AdminDashboard />
//     }

//     // Data Alumni
//     if (path === '/admin-page/alumni') {
//         component = <Alumni />
//     }

//     // Pengaturan
//     if (path === '/admin-page/settings') {
//         component = <Settings />
//     }

//     root.render(
//         <React.StrictMode>
//             {component}
//         </React.StrictMode>
//     )
// }