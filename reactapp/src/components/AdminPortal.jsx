import React, { useEffect, useMemo, useState } from "react";
import { getAllUsers, deleteUserById, getAllSkills, getAllSkillShares } from "../services/userApi";

function AdminPortal() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillShares, setSkillShares] = useState([]);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [usersRes, skillsRes, skillSharesRes] = await Promise.all([
          getAllUsers(),
          getAllSkills().catch(() => ({ data: [] })),
          getAllSkillShares().catch(() => ({ data: [] })),
        ]);
        const uData = Array.isArray(usersRes?.data) ? usersRes.data : usersRes?.data?.users || [];
        const sData = Array.isArray(skillsRes?.data) ? skillsRes.data : skillsRes?.data?.skills || [];
        const ssData = Array.isArray(skillSharesRes?.data) ? skillSharesRes.data : skillSharesRes?.data?.skillShares || [];
        if (active) {
          setUsers(uData);
          setSkills(sData);
          setSkillShares(ssData);
        }
      } catch (e) {
        if (active) setError(e?.response?.data?.message || e?.message || "Failed to load users");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query) return users;
    const q = query.toLowerCase();
    return users.filter((u) =>
      [u?.id, u?.username, u?.email, u?.role, String(u?.active)]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [users, query]);

  async function handleDelete(id) {
    if (!id) return;
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;
    try {
      await deleteUserById(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Failed to delete user");
    }
  }

  return (
    <div className="container my-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Admin Portal</h2>
        <input
          type="search"
          className="form-control w-auto"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && (
        <div className="d-flex align-items-center gap-2">
          <div className="spinner-border" role="status" aria-hidden="true"></div>
          <span>Loading users...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-2">Total Users</h5>
                  <p className="display-6 mb-0">{users.length}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-2">Total Skills</h5>
                  <p className="display-6 mb-0">{skills.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive mb-4">
            <h4 className="mb-3">Users</h4>
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Active</th>
                  <th scope="col">Created</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">No users found.</td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>{u.role || "USER"}</td>
                      <td>
                        {String(u.active ?? u.enabled ?? u.isActive ?? false) === "true" ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-secondary">Inactive</span>
                        )}
                      </td>
                      <td>{u.createdDate ? new Date(u.createdDate).toLocaleString() : "-"}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(u.id)}
                          aria-label={`Delete user ${u.username}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          

          <div className="table-responsive mt-4">
            <h4 className="mb-3">Skill Shares</h4>
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Skill</th>
                  <th scope="col">Category</th>
                  <th scope="col">Level</th>
                  <th scope="col">Availability</th>
                  <th scope="col">User Email</th>
                </tr>
              </thead>
              <tbody>
                {skillShares.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">No skill shares found.</td>
                  </tr>
                ) : (
                  skillShares.map((ss) => (
                    <tr key={ss.id}>
                      <td>{ss.id}</td>
                      <td>{ss.skillName}</td>
                      <td>{ss.category}</td>
                      <td>{ss.skillLevel || '-'}</td>
                      <td>{ss.availability || '-'}</td>
                      <td>{ss.userEmail || ss.user_email || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPortal;
