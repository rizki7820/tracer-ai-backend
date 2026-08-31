import React, { useEffect, useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'

const API_BASE = '/api/v1/admin/scholarships'

function authHeaders() {
    const token = localStorage.getItem('tracer_token')
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
}

const emptyForm = {
    title: '',
    provider: '',
    level: '',
    field: '',
    location: '',
    funding_type: 'Penuh',
    description: '',
    requirements: '',
    benefits: '',
    registration_url: '',
    deadline: '',
    status: 'published',
}

export default function AdminScholarships() {

    const [scholarships, setScholarships] = useState([])
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


    async function loadScholarships() {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}?per_page=100`, {
                headers: authHeaders(),
            })
            const json = await res.json()
            if (json?.success) {
                setScholarships(json.data.data || [])
            }
        } catch (err) {
            console.warn('Gagal memuat beasiswa:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadScholarships()
    }, [])


    const filteredScholarships = useMemo(() => {
        const keyword = search.toLowerCase().trim()

        return scholarships.filter((s) => {
            const matchesSearch =
                !keyword ||
                s.title?.toLowerCase().includes(keyword) ||
                s.provider?.toLowerCase().includes(keyword)

            const matchesStatus =
                statusFilter === 'Semua Status' || s.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [scholarships, search, statusFilter])


    const totalPages = Math.max(1, Math.ceil(filteredScholarships.length / itemsPerPage))
    const paginated = filteredScholarships.slice(
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

    function openEditModal(s) {
        setEditingId(s.id)
        setFormData({
            title: s.title || '',
            provider: s.provider || '',
            level: s.level || '',
            field: s.field || '',
            location: s.location || '',
            funding_type: s.funding_type || 'Penuh',
            description: s.description || '',
            requirements: (s.requirements || []).join('\n'),
            benefits: (s.benefits || []).join('\n'),
            registration_url: s.registration_url || '',
            deadline: s.deadline ? String(s.deadline).slice(0, 10) : '',
            status: s.status || 'published',
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
            benefits: formData.benefits
                .split('\n')
                .map((b) => b.trim())
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
            loadScholarships()
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(s) {
        if (!window.confirm(`Hapus beasiswa "${s.title}"?`)) return

        try {
            const res = await fetch(`${API_BASE}/${s.id}`, {
                method: 'DELETE',
                headers: authHeaders(),
            })
            const json = await res.json()

            if (json?.success) {
                setScholarships((prev) => prev.filter((item) => item.id !== s.id))
            }
        } catch (err) {
            console.warn('Gagal menghapus beasiswa:', err)
        }
    }

    return (
        <AdminLayout>
            <div className="crud-page">

                <div className="crud-header">
                    <div>
                        <h1>Kelola Beasiswa</h1>
                        <p>Tambah, ubah, dan hapus informasi beasiswa untuk alumni.</p>
                    </div>

                    <button type="button" className="crud-add-button" onClick={openCreateModal}>
                        + Tambah Beasiswa
                    </button>
                </div>

                <div className="crud-filter-bar">
                    <input
                        type="text"
                        className="crud-search-input"
                        placeholder="Cari judul atau penyelenggara..."
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
                                    <th>Judul</th>
                                    <th>Penyelenggara</th>
                                    <th>Jenjang</th>
                                    <th>Pendanaan</th>
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
                                ) : paginated.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="crud-empty">Belum ada beasiswa.</td>
                                    </tr>
                                ) : (
                                    paginated.map((s) => (
                                        <tr key={s.id}>
                                            <td><strong>{s.title}</strong></td>
                                            <td>{s.provider || '-'}</td>
                                            <td>{s.level || '-'}</td>
                                            <td>{s.funding_type || '-'}</td>
                                            <td>
                                                {s.deadline
                                                    ? new Date(s.deadline).toLocaleDateString('id-ID')
                                                    : '-'}
                                            </td>
                                            <td>
                                                <span className={`crud-badge ${s.status}`}>
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="crud-actions">
                                                    <button
                                                        type="button"
                                                        className="crud-icon-button"
                                                        title="Edit"
                                                        onClick={() => openEditModal(s)}
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="crud-icon-button danger"
                                                        title="Hapus"
                                                        onClick={() => handleDelete(s)}
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
                            <h2>{editingId ? 'Edit Beasiswa' : 'Tambah Beasiswa'}</h2>

                            {error && <div className="crud-alert error">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="crud-form-grid">

                                    <div className="crud-field full">
                                        <label>Judul Beasiswa</label>
                                        <input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Penyelenggara</label>
                                        <input
                                            name="provider"
                                            value={formData.provider}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Jenjang</label>
                                        <input
                                            name="level"
                                            value={formData.level}
                                            onChange={handleChange}
                                            placeholder="S1 / S2 / S3"
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Bidang</label>
                                        <input
                                            name="field"
                                            value={formData.field}
                                            onChange={handleChange}
                                            placeholder="Semua Bidang"
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Lokasi</label>
                                        <input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Dalam Negeri / Luar Negeri"
                                        />
                                    </div>

                                    <div className="crud-field">
                                        <label>Jenis Pendanaan</label>
                                        <select
                                            name="funding_type"
                                            value={formData.funding_type}
                                            onChange={handleChange}
                                        >
                                            <option>Penuh</option>
                                            <option>Parsial</option>
                                        </select>
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
                                        <label>Link Pendaftaran</label>
                                        <input
                                            name="registration_url"
                                            value={formData.registration_url}
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
                                        <label>Manfaat (satu per baris)</label>
                                        <textarea
                                            name="benefits"
                                            value={formData.benefits}
                                            onChange={handleChange}
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
