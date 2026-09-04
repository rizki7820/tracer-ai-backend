import React, { useEffect, useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'

const API_BASE = 'backend/api/v1/admin/jobs'

function authHeaders() {
    const token = localStorage.getItem('tracer_token')
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
}

const emptyForm = {
    company_name: '',
    position: '',
    location: '',
    type: 'Full Time',
    major: '',
    salary_min: '',
    salary_max: '',
    description: '',
    requirements: '',
    skills: '',
    apply_url: '',
    deadline: '',
    status: 'published',
}

export default function AdminJobs() {

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('Semua Status')

    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState(emptyForm)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8


    async function loadJobs() {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}?per_page=100`, {
                headers: authHeaders(),
            })
            const json = await res.json()
            if (json?.success) {
                setJobs(json.data.data || [])
            }
        } catch (err) {
            console.warn('Gagal memuat lowongan:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadJobs()
    }, [])


    const filteredJobs = useMemo(() => {
        const keyword = search.toLowerCase().trim()

        return jobs.filter((job) => {
            const matchesSearch =
                !keyword ||
                job.position?.toLowerCase().includes(keyword) ||
                job.company?.toLowerCase().includes(keyword)

            const matchesStatus =
                statusFilter === 'Semua Status' || job.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [jobs, search, statusFilter])


    const totalPages = Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage))
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )


    function openCreateModal() {
        setEditingId(null)
        setFormData(emptyForm)
        setError('')
        setSuccess('')
        setShowModal(true)
    }

    function openEditModal(job) {
        setEditingId(job.id)
        setFormData({
            company_name: job.company || '',
            position: job.position || '',
            location: job.location || '',
            type: job.type || 'Full Time',
            major: job.major || '',
            salary_min: job.salary_min || '',
            salary_max: job.salary_max || '',
            description: job.description || '',
            requirements: (job.requirements || []).join('\n'),
            skills: (job.skills || []).join(', '),
            apply_url: job.apply_url || '',
            deadline: job.deadline ? String(job.deadline).slice(0, 10) : '',
            status: job.status || 'published',
        })
        setError('')
        setSuccess('')
        setShowModal(true)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true)
        setError('')

        const payload = {
            ...formData,
            requirements: formData.requirements
                .split('\n')
                .map((r) => r.trim())
                .filter(Boolean),
            skills: formData.skills
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
        }

        try {
            const url = editingId ? `${API_BASE}/${editingId}` : API_BASE
            const method = editingId ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: authHeaders(),
                body: JSON.stringify(payload),
            })

            const json = await res.json()

            if (!res.ok) {
                const msg = json.errors
                    ? Object.values(json.errors).flat().join(' ')
                    : json.message || 'Gagal menyimpan data.'
                throw new Error(msg)
            }

            setSuccess(json.message || 'Berhasil disimpan.')
            setShowModal(false)
            loadJobs()
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(job) {
        if (!window.confirm(`Hapus lowongan "${job.position}"?`)) return

        try {
            const res = await fetch(`${API_BASE}/${job.id}`, {
                method: 'DELETE',
                headers: authHeaders(),
            })
            const json = await res.json()

            if (json?.success) {
                setJobs((prev) => prev.filter((j) => j.id !== job.id))
            }
        } catch (err) {
            console.warn('Gagal menghapus lowongan:', err)
        }
    }

    return (
        <AdminLayout>
            <div className="crud-page">

                <div className="crud-header">
                    <div>
                        <h1>Kelola Lowongan Kerja</h1>
                        <p>Tambah, ubah, dan hapus lowongan kerja untuk alumni.</p>
                    </div>

                    <button type="button" className="crud-add-button" onClick={openCreateModal}>
                        + Tambah Lowongan
                    </button>
                </div>

                <div className="crud-filter-bar">
                    <input
                        type="text"
                        className="crud-search-input"
                        placeholder="Cari posisi atau perusahaan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="crud-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>Semua Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>

                <div className="crud-table-card">
                    <div className="crud-table-wrapper">
                        <table className="crud-table">
                            <thead>
                                <tr>
                                    <th>Posisi</th>
                                    <th>Perusahaan</th>
                                    <th>Lokasi</th>
                                    <th>Jurusan</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="crud-loading">Memuat data...</td>
                                    </tr>
                                ) : paginatedJobs.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="crud-empty">Belum ada lowongan.</td>
                                    </tr>
                                ) : (
                                    paginatedJobs.map((job) => (
                                        <tr key={job.id}>
                                            <td><strong>{job.position}</strong></td>
                                            <td>{job.company || '-'}</td>
                                            <td>{job.location || '-'}</td>
                                            <td>{job.major || '-'}</td>
                                            <td>
                                                {job.deadline
                                                    ? new Date(job.deadline).toLocaleDateString('id-ID')
                                                    : '-'}
                                            </td>
                                            <td>
                                                <span className={`crud-badge ${job.status}`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="crud-actions">
                                                    <button
                                                        type="button"
                                                        className="crud-icon-button"
                                                        title="Edit"
                                                        onClick={() => openEditModal(job)}
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="crud-icon-button danger"
                                                        title="Hapus"
                                                        onClick={() => handleDelete(job)}
                                                    >
                                                        🗑
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="crud-pagination">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                            >
                                ‹
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className={currentPage === i + 1 ? 'active' : ''}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => p + 1)}
                            >
                                ›
                            </button>
                        </div>
                    )}
                </div>

                {showModal && (
                    <div className="crud-modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="crud-modal" onClick={(e) => e.stopPropagation()}>
                            <h2>{editingId ? 'Edit Lowongan' : 'Tambah Lowongan'}</h2>

                            {error && <div className="crud-alert error">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="crud-form-grid">

                                    {!editingId && (
                                        <div className="crud-field full">
                                            <label>Nama Perusahaan</label>
                                            <input
                                                name="company_name"
                                                value={formData.company_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="crud-field">
                                        <label>Posisi</label>
                                        <input
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Lokasi</label>
                                        <input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Tipe</label>
                                        <select name="type" value={formData.type} onChange={handleChange}>
                                            <option>Full Time</option>
                                            <option>Part Time</option>
                                            <option>Internship</option>
                                            <option>Remote</option>
                                        </select>
                                    </div>

                                    <div className="crud-field">
                                        <label>Jurusan</label>
                                        <input
                                            name="major"
                                            value={formData.major}
                                            onChange={handleChange}
                                            placeholder="RPL / TKJ / Multimedia"
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Gaji Minimum</label>
                                        <input
                                            name="salary_min"
                                            value={formData.salary_min}
                                            onChange={handleChange}
                                            placeholder="Rp4.000.000"
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Gaji Maksimum</label>
                                        <input
                                            name="salary_max"
                                            value={formData.salary_max}
                                            onChange={handleChange}
                                            placeholder="Rp7.000.000"
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Deadline</label>
                                        <input
                                            type="date"
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Status</label>
                                        <select name="status" value={formData.status} onChange={handleChange}>
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>

                                    <div className="crud-field full">
                                        <label>Link Lamar (opsional)</label>
                                        <input
                                            name="apply_url"
                                            value={formData.apply_url}
                                            onChange={handleChange}
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="crud-field full">
                                        <label>Deskripsi</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="crud-field full">
                                        <label>Persyaratan (satu per baris)</label>
                                        <textarea
                                            name="requirements"
                                            value={formData.requirements}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="crud-field full">
                                        <label>Skill (pisahkan dengan koma)</label>
                                        <input
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            placeholder="HTML, CSS, JavaScript"
                                        />
                                    </div>

                                </div>

                                <div className="crud-modal-footer">
                                    <button
                                        type="button"
                                        className="crud-btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Batal
                                    </button>
                                    <button type="submit" className="crud-btn-primary" disabled={saving}>
                                        {saving ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </AdminLayout>
    )
}
