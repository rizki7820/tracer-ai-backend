import React from 'react'
import { createRoot } from 'react-dom/client'

import '../css/app.css'
import '../css/admin.css'
import '../css/alumni.css'
import '../css/tracer-study.css'
import '../css/perusahaan.css'
import '../css/notificationpopup.css'
import '../css/reports.css'
import '../css/campus.css'
import '../css/admin-crud.css'

/* USER ALUMNI */
import '../css/user.css'
import '../css/user-dashboard.css'
import '../css/usertracer-study.css'
import '../css/alumniprofile.css'
import '../css/alumnisettings.css'
import '../css/alumninotification.css'
import '../css/campususer.css'
import '../css/scholarshipuser.css'
import '../css/lowonganuser.css'

import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import Settings from './components/Settings'
import Alumni from './components/Alumni'
import TracerStudy from './components/TracerStudy'
import Perusahaan from './components/Perusahaan'
import Notifications from './components/NotificationPopup'
import Reports from './components/Reports'
import Campus from './components/Campus'
import AdminJobs from './components/AdminJobs'
import AdminScholarships from './components/AdminScholarships'

/* USER ALUMNI */
import AlumniDashboard from './components/user/AlumniDashboard'
import UserTracerStudy from './components/user/UserTracerStudy'
import AlumniProfile from './components/user/AlumniProfile'
import AlumniSettings from './components/user/AlumniSettings'
import UserNotifications from './components/user/AlumniNotifications'
import CampusUser from './components/user/CampusUser'
import ScholarshipUser from './components/user/ScholarshipUser'
import LowonganUser from './components/user/LowonganUser'

const rootEl = document.getElementById('root')

if (rootEl) {

    const root = createRoot(rootEl)

    const path = window.location.pathname

    let component = <Login />

    /* USER ADMIN */
    if (path === '/admin-page') {
        component = <AdminDashboard />
    }

    if (path === '/admin-page/alumni') {
        component = <Alumni />
    }

    if (path === '/admin-page/settings') {
        component = <Settings />
    }

    if (path === '/admin-page/tracer-study') {
        component = <TracerStudy />
    }

    if (path === '/admin-page/perusahaan') {
        component = <Perusahaan />
    }

    if (path === '/admin-page/kampus') {
        component = <Campus />
    }

    if (path === '/admin-page/laporan') {
        component = <Reports />
    }

    if (path === '/admin-page/lowongan') {
        component = <AdminJobs />
    }

    if (path === '/admin-page/beasiswa') {
        component = <AdminScholarships />
    }

    /* USER ALUMNI */
    if (path === '/alumni') {
        component = <AlumniDashboard />
    }

    if (path === '/alumni/tracer-study') {
        component = <UserTracerStudy />
    }

    if (path === '/alumni/profile') {
        component = <AlumniProfile />
    }

    if (path === '/alumni/settings') {
        component = <AlumniSettings />
    }

    if (path === '/alumni/notifications') {
        component = <UserNotifications />
    }

    if (path === '/alumni/kampus') {
        component = <CampusUser />
    }

    if (path === '/alumni/beasiswa') {
        component = <ScholarshipUser />
    }

    if (path === '/alumni/lowongan') {
        component = <LowonganUser />
    }

    root.render(
        <React.StrictMode>
            {component}
        </React.StrictMode>
    )
}