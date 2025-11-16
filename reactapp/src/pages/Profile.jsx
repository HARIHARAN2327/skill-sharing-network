import React, { useEffect, useRef, useState } from "react";
import "../styles/Profile.css";

export default function Profile({ userData }) {
  const defaultData = {
    personal: {
      name: "",
      profilePicture: "",
      bannerPicture: "",
      status: "",
      location: "",
      email: "",
      phone: "",
      website: "",
      linkedin: "",
      github: "",
      primarySkill: "",
      joined: "",
      latitude: null,
      longitude: null,
    },
    tags: [],
    sections: {
      overview: { title: "Overview", bio: "", highlights: [] },
      skillsProjects: { title: "Skills & Projects", skills: [], projects: [] },
      community: { title: "Community", followers: 0, following: 0, endorsements: [], contributions: [], testimonials: [] },
    },
  };

  // Initialize with defaultData if userData is not provided
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("profile");
      if (saved) return JSON.parse(saved);
    } catch {}
    return userData || defaultData;
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [editing, setEditing] = useState(false);
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // Update form if userData changes
  useEffect(() => {
    if (userData) setForm(userData);
  }, [userData]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("profile", JSON.stringify(form));
    } catch {}
  }, [form]);

  // Migrate old sections structure to new 3-tab schema if detected
  useEffect(() => {
    const s = form.sections || {};
    const hasOld = s.skills || s.projects || s.experience || s.reviews || s.settings;
    if (!hasOld) return;
    const overview = { title: "Overview", bio: s.experience?.bio || "", highlights: [] };
    const skillsProjects = {
      title: "Skills & Projects",
      skills: Array.isArray(s.skills?.list) ? s.skills.list : [],
      projects: Array.isArray(s.projects?.list) ? s.projects.list : [],
    };
    const community = {
      title: "Community",
      followers: 0,
      following: 0,
      endorsements: [],
      contributions: [],
      testimonials: Array.isArray(s.reviews?.list) ? s.reviews.list : [],
    };
    setForm((prev) => ({ ...prev, sections: { overview, skillsProjects, community } }));
    setActiveTab("overview");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Safe handlers
  const handleChange = (section, key, index, value) => {
    if (section === "sections") {
      const updatedSections = { ...form.sections };
      const currentSection = updatedSections[activeTab];

      if (currentSection.list) {
        const updatedList = [...currentSection.list];
        updatedList[index] = { ...updatedList[index], [key]: value };
        updatedSections[activeTab].list = updatedList;
      } else if (currentSection.history) {
        const updatedHistory = [...currentSection.history];
        updatedHistory[index] = { ...updatedHistory[index], [key]: value };
        updatedSections[activeTab].history = updatedHistory;
      } else if (currentSection.options) {
        const updatedOptions = [...currentSection.options];
        updatedOptions[index] = value;
        updatedSections[activeTab].options = updatedOptions;
      } else if (currentSection.bio) {
        updatedSections[activeTab].bio = value;
      }

      setForm({ ...form, sections: updatedSections });
    } else {
      setForm({
        ...form,
        [section]: {
          ...form[section],
          [key]: value,
        },
      });
    }
  };

  const handleSave = () => {
    alert("✅ Profile updated successfully!");
    setEditing(false);
  };

  // ------- Geocoding helpers (OpenStreetMap Nominatim) -------
  async function geocodeLocation(query) {
    if (!query) return null;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`, {
        headers: { "Accept": "application/json" },
      });
      const data = await res.json();
      if (Array.isArray(data) && data[0]) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      }
    } catch {}
    return null;
  }

  async function reverseGeocode(lat, lon) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      return data?.display_name || "";
    } catch { return ""; }
  }

  const handleFindOnMap = async () => {
    const q = form.personal.location;
    const result = await geocodeLocation(q);
    if (result) {
      setForm((prev) => ({
        ...prev,
        personal: { ...prev.personal, latitude: result.lat, longitude: result.lon },
      }));
      // map state removed
    } else {
      alert("Location not found. Try a more specific address.");
    }
  };

  const handleUseMyLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const display = await reverseGeocode(latitude, longitude);
        setForm((prev) => ({
          ...prev,
          personal: { ...prev.personal, latitude, longitude, location: display || prev.personal.location },
        }));
        // map state removed
      },
      () => alert("Unable to fetch your location."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // File helpers
  async function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const onAvatarSelected = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const dataUrl = await fileToDataUrl(f);
      setForm((prev) => ({ ...prev, personal: { ...prev.personal, profilePicture: dataUrl } }));
    } catch {}
  };

  const onBannerSelected = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const dataUrl = await fileToDataUrl(f);
      setForm((prev) => ({ ...prev, personal: { ...prev.personal, bannerPicture: dataUrl } }));
    } catch {}
  };

  const addItem = (tabKey, template) => {
    const updated = { ...form.sections };
    if (tabKey === "overview") {
      updated.overview.highlights = [...(updated.overview.highlights || []), template || "New highlight"];
    } else if (tabKey === "skillsProjects") {
      if (template?.__type === "project") {
        updated.skillsProjects.projects = [...(updated.skillsProjects.projects || []), { name: "New Project", role: "Contributor" }];
      } else {
        updated.skillsProjects.skills = [...(updated.skillsProjects.skills || []), { name: "New Skill", level: "Beginner" }];
      }
    } else if (tabKey === "community") {
      if (template?.__type === "endorsement") {
        updated.community.endorsements = [...(updated.community.endorsements || []), { by: "Member", skill: "Skill" }];
      } else if (template?.__type === "contribution") {
        updated.community.contributions = [...(updated.community.contributions || []), { title: "New Share", date: new Date().toISOString().slice(0,10) }];
      } else {
        updated.community.testimonials = [...(updated.community.testimonials || []), { author: "Anonymous", comment: "Great!" }];
      }
    }
    setForm({ ...form, sections: updated });
  };

  const removeItem = (tabKey, idx, listKey) => {
    const updated = { ...form.sections };
    if (tabKey === "overview") {
      updated.overview.highlights = (updated.overview.highlights || []).filter((_, i) => i !== idx);
    } else if (tabKey === "skillsProjects") {
      updated.skillsProjects[listKey] = (updated.skillsProjects[listKey] || []).filter((_, i) => i !== idx);
    } else if (tabKey === "community") {
      updated.community[listKey] = (updated.community[listKey] || []).filter((_, i) => i !== idx);
    }
    setForm({ ...form, sections: updated });
  };

  // ------------------ RENDER ------------------
  if (!form || !form.personal) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="user-profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-card">
            {/* Profile Picture */}
            <div className="avatar-wrap">
              <img
                src={form.personal.profilePicture || "https://via.placeholder.com/150"}
                alt="Profile"
                className="profile-avatar"
              />
              {editing && (
                <>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={onAvatarSelected}
                  />
                  <button className="btn-upload" onClick={() => avatarInputRef.current?.click()}>Upload Photo</button>
                </>
              )}
            </div>

            {/* Name */}
            {editing ? (
              <input
                type="text"
                value={form.personal.name || ""}
                onChange={(e) => handleChange("personal", "name", null, e.target.value)}
                className="form-control mb-1"
                placeholder="Full Name"
              />
            ) : (
              <h3 className="profile-name">{form.personal.name}</h3>
            )}

            {/* Status */}
            <span className="status-badge">{form.personal.status}</span>
            <hr />

            <div className="personal-info-header">
              <h5>Personal Information</h5>
              {!editing && (
                <button className="edit-btn" onClick={() => setEditing(true)}>
                  Edit ✏️
                </button>
              )}
            </div>

            <div className="personal-info">
              {Object.keys(form.personal).map((key) => {
                if (["profilePicture", "bannerPicture", "name", "status"].includes(key)) return null;
                return editing ? (
                  <input
                    key={key}
                    type="text"
                    value={form.personal[key] || ""}
                    onChange={(e) => handleChange("personal", key, null, e.target.value)}
                    className="form-control mb-1"
                    placeholder={key}
                  />
                ) : (
                  <div key={key}>
                    <span className="label">{key.replace(/([A-Z])/g, " $1")}:</span> {form.personal[key]}
                  </div>
                );
              })}
              {editing && (
                <div className="inline-actions" style={{ gap: 8, justifyContent: "flex-start" }}>
                  <button className="btn-save" type="button" onClick={handleUseMyLocation}>Use my location</button>
                  <button className="btn-save" type="button" onClick={handleFindOnMap}>Find on Map</button>
                </div>
              )}
              {(form.personal.latitude && form.personal.longitude) && (
                <div className="map-embed" style={{ marginTop: 10 }}>
                  <iframe
                    title="profile-location-map"
                    width="100%"
                    height="240"
                    frameBorder="0"
                    style={{ border: 0, borderRadius: 8 }}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${(form.personal.longitude-0.01)}%2C${(form.personal.latitude-0.01)}%2C${(form.personal.longitude+0.01)}%2C${(form.personal.latitude+0.01)}&layer=mapnik&marker=${form.personal.latitude}%2C${form.personal.longitude}`}
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {editing && (
              <div className="edit-actions">
                <button className="btn-save" onClick={handleSave}>Save</button>
                <button className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className="profile-content">
          <div className="banner">
            <img
              src={form.personal.bannerPicture || "https://via.placeholder.com/1200x220.png?text=Profile+Banner"}
              alt="Banner"
              className="banner-img"
            />
            {editing && (
              <>
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onBannerSelected}
                />
                <button className="btn-upload banner" onClick={() => bannerInputRef.current?.click()}>
                  Upload Banner
                </button>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="info-tags">
            {(form.tags || []).map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
            {editing && (
              <button className="tag add" onClick={() => setForm({ ...form, tags: [...(form.tags||[]), "New Tag"] })}>+ Add Tag</button>
            )}
          </div>

          {/* Tabs */}
          <div className="profile-tabs">
            {(["overview","skillsProjects","community"]).map((key) => (
              <div
                key={key}
                className={`tab ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                {form.sections?.[key]?.title || key}
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content-card">
            <div className="tab-header">
              <h5>{form.sections[activeTab]?.title || ""}</h5>
              {!editing && <button className="edit-btn" onClick={() => setEditing(true)}>Edit ✏️</button>}
            </div>

            <div className="tab-info">
              {activeTab === "overview" && (
                <>
                  {editing ? (
                    <textarea
                      value={form.sections.overview?.bio || ""}
                      onChange={(e) => setForm({ ...form, sections: { ...form.sections, overview: { ...form.sections.overview, bio: e.target.value } } })}
                      className="form-control mb-1"
                    />
                  ) : (
                    <p>{form.sections.overview?.bio}</p>
                  )}
                  {editing && (
                    <div className="inline-actions">
                      <button className="btn-save" onClick={() => addItem("overview")}>+ Add Highlight</button>
                    </div>
                  )}
                  {(form.sections.overview?.highlights || []).map((h, i) => (
                    <div key={i} className="tab-row">
                      <span className="row-title">{h}</span>
                      {editing && <button className="btn-cancel sm" onClick={() => removeItem("overview", i)}>Remove</button>}
                    </div>
                  ))}
                </>
              )}

              {activeTab === "skillsProjects" && (
                <>
                  {editing && (
                    <div className="inline-actions">
                      <button className="btn-save" onClick={() => addItem("skillsProjects", { __type: "skill" })}>+ Add Skill</button>
                      <button className="btn-save" onClick={() => addItem("skillsProjects", { __type: "project" })}>+ Add Project</button>
                    </div>
                  )}
                  {(form.sections.skillsProjects?.skills || []).map((item, i) => (
                    editing ? (
                      <input
                        key={`sk-${i}`}
                        type="text"
                        value={item.name || ""}
                        onChange={(e) => {
                          const skills = [...(form.sections.skillsProjects?.skills || [])];
                          skills[i] = { ...skills[i], name: e.target.value };
                          setForm({ ...form, sections: { ...form.sections, skillsProjects: { ...form.sections.skillsProjects, skills } } });
                        }}
                        className="form-control mb-1"
                      />
                    ) : (
                      <div key={`sk-${i}`} className="tab-row">
                        <span className="row-title">{item.name}</span>
                        <span className="row-meta">{item.level}</span>
                        {editing && <button className="btn-cancel sm" onClick={() => removeItem("skillsProjects", i, "skills")}>Remove</button>}
                      </div>
                    )
                  ))}
                  {(form.sections.skillsProjects?.projects || []).map((item, i) => (
                    editing ? (
                      <input
                        key={`pr-${i}`}
                        type="text"
                        value={item.name || ""}
                        onChange={(e) => {
                          const projects = [...(form.sections.skillsProjects?.projects || [])];
                          projects[i] = { ...projects[i], name: e.target.value };
                          setForm({ ...form, sections: { ...form.sections, skillsProjects: { ...form.sections.skillsProjects, projects } } });
                        }}
                        className="form-control mb-1"
                      />
                    ) : (
                      <div key={`pr-${i}`} className="tab-row">
                        <span className="row-title">{item.name}</span>
                        <span className="row-meta">{item.role}</span>
                        {editing && <button className="btn-cancel sm" onClick={() => removeItem("skillsProjects", i, "projects")}>Remove</button>}
                      </div>
                    )
                  ))}
                </>
              )}

              {activeTab === "community" && (
                <>
                  <div className="tab-row">
                    <span className="row-title">Followers</span>
                    {editing ? (
                      <input
                        type="number"
                        className="form-control"
                        value={form.sections.community?.followers || 0}
                        onChange={(e) => setForm({ ...form, sections: { ...form.sections, community: { ...form.sections.community, followers: Number(e.target.value) } } })}
                      />
                    ) : (
                      <span className="row-meta">{form.sections.community?.followers || 0}</span>
                    )}
                  </div>
                  <div className="tab-row">
                    <span className="row-title">Following</span>
                    {editing ? (
                      <input
                        type="number"
                        className="form-control"
                        value={form.sections.community?.following || 0}
                        onChange={(e) => setForm({ ...form, sections: { ...form.sections, community: { ...form.sections.community, following: Number(e.target.value) } } })}
                      />
                    ) : (
                      <span className="row-meta">{form.sections.community?.following || 0}</span>
                    )}
                  </div>
                  {editing && (
                    <div className="inline-actions">
                      <button className="btn-save" onClick={() => addItem("community", { __type: "endorsement" })}>+ Add Endorsement</button>
                      <button className="btn-save" onClick={() => addItem("community", { __type: "contribution" })}>+ Add Contribution</button>
                      <button className="btn-save" onClick={() => addItem("community", { __type: "testimonial" })}>+ Add Testimonial</button>
                    </div>
                  )}
                  {(form.sections.community?.endorsements || []).map((item, i) => (
                    editing ? (
                      <input
                        key={`en-${i}`}
                        type="text"
                        value={item.skill || ""}
                        onChange={(e) => {
                          const endorsements = [...(form.sections.community?.endorsements || [])];
                          endorsements[i] = { ...endorsements[i], skill: e.target.value };
                          setForm({ ...form, sections: { ...form.sections, community: { ...form.sections.community, endorsements } } });
                        }}
                        className="form-control mb-1"
                      />
                    ) : (
                      <div key={`en-${i}`} className="tab-row">
                        <span className="row-title">Endorsed for {item.skill}</span>
                        <span className="row-meta">by {item.by}</span>
                        {editing && <button className="btn-cancel sm" onClick={() => removeItem("community", i, "endorsements")}>Remove</button>}
                      </div>
                    )
                  ))}
                  {(form.sections.community?.contributions || []).map((item, i) => (
                    editing ? (
                      <input
                        key={`co-${i}`}
                        type="text"
                        value={item.title || ""}
                        onChange={(e) => {
                          const contributions = [...(form.sections.community?.contributions || [])];
                          contributions[i] = { ...contributions[i], title: e.target.value };
                          setForm({ ...form, sections: { ...form.sections, community: { ...form.sections.community, contributions } } });
                        }}
                        className="form-control mb-1"
                      />
                    ) : (
                      <div key={`co-${i}`} className="tab-row">
                        <span className="row-title">{item.title}</span>
                        <span className="row-meta">{item.date}</span>
                        {editing && <button className="btn-cancel sm" onClick={() => removeItem("community", i, "contributions")}>Remove</button>}
                      </div>
                    )
                  ))}
                  {(form.sections.community?.testimonials || []).map((item, i) => (
                    editing ? (
                      <input
                        key={`te-${i}`}
                        type="text"
                        value={item.comment || ""}
                        onChange={(e) => {
                          const testimonials = [...(form.sections.community?.testimonials || [])];
                          testimonials[i] = { ...testimonials[i], comment: e.target.value };
                          setForm({ ...form, sections: { ...form.sections, community: { ...form.sections.community, testimonials } } });
                        }}
                        className="form-control mb-1"
                      />
                    ) : (
                      <div key={`te-${i}`} className="tab-row">
                        <span className="row-title">{item.author}</span>
                        <span className="row-meta">{item.comment}</span>
                        {editing && <button className="btn-cancel sm" onClick={() => removeItem("community", i, "testimonials")}>Remove</button>}
                      </div>
                    )
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
