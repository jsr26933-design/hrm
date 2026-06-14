/* ===== WorkPilot HR — Roles & Access Control Module ===== */

function renderRBAC(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Roles & Access Control</h1>
        <p>Manage user roles, permissions, and access levels</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="openModal('add-role-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Role
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-4" style="margin-bottom:24px">
      <div class="stat-card">
        <div class="stat-icon blue"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
        <div class="stat-body"><div class="stat-label">Total Roles</div><div class="stat-value">${WP.roles.length}</div></div>
      </div>
      <div class="stat-card success">
        <div class="stat-icon green"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
        <div class="stat-body"><div class="stat-label">Total Users</div><div class="stat-value">248</div></div>
      </div>
      <div class="stat-card danger">
        <div class="stat-icon red"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <div class="stat-body"><div class="stat-label">Admin Users</div><div class="stat-value">7</div></div>
      </div>
      <div class="stat-card warning">
        <div class="stat-icon yellow"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
        <div class="stat-body"><div class="stat-label">Pending Invites</div><div class="stat-value">3</div></div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
      <!-- Roles Cards -->
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:14px">Defined Roles</div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${WP.roles.map(r => `
            <div class="role-card">
              <div class="role-card-header">
                <div class="role-icon" style="background:${r.bgColor}">
                  <svg width="20" height="20" fill="none" stroke="${r.color}" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div>
                  <div class="role-name">${r.name}</div>
                  <div class="role-members">${r.members} member${r.members !== 1 ? 's' : ''} · ${r.desc}</div>
                </div>
                <div style="margin-left:auto;display:flex;gap:6px">
                  <button class="btn-icon" onclick="editRole('${r.id}')" title="Edit">
                    <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </div>
              </div>
              <div class="permission-grid">
                ${r.permissions.map((p,i) => `
                  <div class="permission-item">
                    <svg class="permission-check" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    ${p}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Permissions Matrix -->
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:14px">Permissions Matrix</div>
        <div class="card">
          <div class="table-container">
            <table class="data-table" style="font-size:12px">
              <thead>
                <tr>
                  <th>Module</th>
                  ${WP.roles.slice(0,4).map(r=>`<th style="text-align:center">${r.name.split(' ')[0]}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${['Employee Mgmt','Attendance','Leave Mgmt','Payroll','Tasks','GPS Track','Reports','Settings','User Admin'].map((mod,i)=>`
                  <tr>
                    <td style="font-weight:600">${mod}</td>
                    ${WP.roles.slice(0,4).map((r,j)=>{
                      const has = (i<=2&&j<=2)||(i===3&&(j===0||j===4))||(j===0)||(i<=5&&j<=1)||(i===6&&j<=2);
                      return `<td style="text-align:center">${has?'<span style="color:var(--success);font-size:16px">✓</span>':'<span style="color:var(--gray-200);font-size:16px">✕</span>'}`;
                    }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- User List -->
        <div style="font-size:15px;font-weight:700;color:var(--gray-800);margin-top:20px;margin-bottom:14px">User Access List</div>
        <div class="card">
          <div class="card-header" style="padding:14px 20px">
            <div class="filter-search" style="flex:1">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search users…" style="border:none;background:transparent;font-size:13px;outline:none;flex:1"/>
            </div>
            <button class="btn btn-primary btn-sm" onclick="openModal('invite-modal')" style="margin-left:8px">Invite User</button>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead><tr><th>User</th><th>Role</th><th>Last Login</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                ${WP.employees.slice(0,6).map((e,i) => `
                  <tr>
                    <td>
                      <div class="emp-cell">
                        <div class="emp-avatar" style="background:${e.color};width:28px;height:28px;font-size:10px">${e.initials}</div>
                        <div>
                          <div style="font-size:13px;font-weight:600">${e.name}</div>
                          <div style="font-size:11px;color:var(--gray-400)">${e.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge" style="background:${WP.roles[Math.min(i,WP.roles.length-1)].bgColor};color:${WP.roles[Math.min(i,WP.roles.length-1)].color}">
                        ${WP.roles[Math.min(i,WP.roles.length-1)].name}
                      </span>
                    </td>
                    <td style="font-size:12px;color:var(--gray-500)">${i===0?'Just now':i===1?'2 hrs ago':i===2?'Yesterday':'${(i)}d ago'}</td>
                    <td>${statusBadge('active')}</td>
                    <td>
                      <button class="btn btn-ghost btn-sm" onclick="showToast('Editing access for ${e.name}')">Edit</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Role Modal -->
    <div class="modal-backdrop" id="add-role-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Create New Role</div><div class="modal-subtitle">Define permissions for the new role</div></div>
          <button class="modal-close" onclick="closeModal('add-role-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Role Name *</label>
            <input type="text" class="form-control" placeholder="e.g. Branch Manager"/>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Description</label>
            <input type="text" class="form-control" placeholder="Brief role description"/>
          </div>
          <div style="font-size:13px;font-weight:700;color:var(--gray-700);margin-bottom:10px">Module Permissions</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${['Employee Management','Attendance','Leave Management','Payroll','Task Management','GPS Tracking','Reports','Settings'].map(m=>`
              <label class="checkbox-label" style="font-size:13px;color:var(--gray-700);justify-content:space-between">
                ${m}
                <label class="toggle-switch">
                  <input type="checkbox"/>
                  <span class="toggle-slider"></span>
                </label>
              </label>
            `).join('')}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('add-role-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('add-role-modal');showToast('Role created!','success')">Create Role</button>
        </div>
      </div>
    </div>

    <!-- Invite Modal -->
    <div class="modal-backdrop" id="invite-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon green"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Invite User</div><div class="modal-subtitle">Send an invitation email</div></div>
          <button class="modal-close" onclick="closeModal('invite-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px"><label class="form-label">Email Address *</label><input type="email" class="form-control" placeholder="user@company.com"/></div>
          <div class="form-group"><label class="form-label">Assign Role *</label>
            <select class="form-control">${WP.roles.map(r=>`<option>${r.name}</option>`).join('')}</select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('invite-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('invite-modal');showToast('Invitation sent!','success')">Send Invite</button>
        </div>
      </div>
    </div>
  `;
}

function editRole(id) {
  showToast('Opening role editor…', 'success');
}
