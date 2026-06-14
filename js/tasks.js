/* ===== WorkPilot HR — Task Management Module ===== */

function renderTasks(container) {
  const cols = [
    { id: 'todo', label: 'To Do', color: '#94A3B8', tasks: WP.tasks.filter(t=>t.status==='todo') },
    { id: 'inprogress', label: 'In Progress', color: '#2563EB', tasks: WP.tasks.filter(t=>t.status==='inprogress') },
    { id: 'review', label: 'In Review', color: '#F97316', tasks: WP.tasks.filter(t=>t.status==='review') },
    { id: 'done', label: 'Done', color: '#10B981', tasks: WP.tasks.filter(t=>t.status==='done') }
  ];
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Task Management</h1>
        <p>${WP.tasks.length} total tasks · ${WP.tasks.filter(t=>t.status==='inprogress').length} in progress</p>
      </div>
      <div class="page-header-right">
        <div class="tab-bar">
          <div class="tab-btn active" onclick="switchTaskView(this,'board-view')">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Board
          </div>
          <div class="tab-btn" onclick="switchTaskView(this,'list-view')">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>
            List
          </div>
        </div>
        <button class="btn btn-primary" onclick="openModal('add-task-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Task
        </button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-4" style="margin-bottom:20px">
      ${cols.map(c=>`
        <div class="stat-card">
          <div class="stat-icon" style="background:${c.color}22;color:${c.color}">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-label">${c.label}</div>
            <div class="stat-value" style="color:${c.color}">${c.tasks.length}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Board View -->
    <div id="board-view" class="tab-content active">
      <div class="kanban-board">
        ${cols.map(col => `
          <div class="kanban-col">
            <div class="kanban-col-header">
              <div class="kanban-col-title">
                <div style="width:10px;height:10px;border-radius:50%;background:${col.color}"></div>
                ${col.label}
                <span class="kanban-count">${col.tasks.length}</span>
              </div>
              <button class="btn-icon" style="width:26px;height:26px" onclick="openModal('add-task-modal')">
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <div class="kanban-tasks">
              ${col.tasks.map(t => `
                <div class="kanban-task" onclick="openTaskDetail('${t.id}')">
                  <div class="kanban-task-title">${t.title}</div>
                  <div style="font-size:11px;color:var(--gray-400);margin:4px 0">${t.desc}</div>
                  ${t.tags.length ? `<div class="kanban-task-tags">${t.tags.map(g=>`<span class="kanban-tag">${g}</span>`).join('')}</div>` : ''}
                  ${t.status==='inprogress'?`<div class="progress-bar" style="margin:8px 0 0"><div class="progress-fill" style="width:${t.progress}%"></div></div><div style="font-size:11px;color:var(--gray-400);margin-top:2px">${t.progress}% complete</div>`:''}
                  <div class="kanban-task-meta">
                    <span class="kanban-task-priority ${t.priority==='high'?'priority-high':t.priority==='medium'?'priority-medium':'priority-low'}">${t.priority}</span>
                    <div style="display:flex;align-items:center;gap:6px">
                      <div class="emp-avatar" style="background:${avatarColors(t.assigneeInitials)};width:22px;height:22px;font-size:9px">${t.assigneeInitials}</div>
                      <span class="kanban-task-due">${t.due.split('-').slice(1).join('/')}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="kanban-col-add" onclick="openModal('add-task-modal')">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Task
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- List View -->
    <div id="list-view" class="tab-content">
      <div class="card">
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr><th>Task</th><th>Assignee</th><th>Priority</th><th>Status</th><th>Due Date</th><th>Progress</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${WP.tasks.map(t => `
                <tr>
                  <td>
                    <div style="font-size:13px;font-weight:600;color:var(--gray-800)">${t.title}</div>
                    <div style="font-size:11px;color:var(--gray-400);margin-top:2px">${t.tags.join(' · ')}</div>
                  </td>
                  <td>
                    <div style="display:flex;align-items:center;gap:6px">
                      <div class="emp-avatar" style="background:${avatarColors(t.assigneeInitials)};width:26px;height:26px;font-size:10px">${t.assigneeInitials}</div>
                      <span style="font-size:13px">${t.assignee}</span>
                    </div>
                  </td>
                  <td><span class="kanban-task-priority ${t.priority==='high'?'priority-high':t.priority==='medium'?'priority-medium':'priority-low'}">${t.priority}</span></td>
                  <td>${statusBadge(t.status)}</td>
                  <td style="font-size:13px;color:var(--gray-600)">${formatDate(t.due)}</td>
                  <td style="min-width:100px">
                    <div style="display:flex;align-items:center;gap:6px">
                      <div class="progress-bar" style="flex:1"><div class="progress-fill ${t.status==='done'?'success':''}" style="width:${t.progress}%"></div></div>
                      <span style="font-size:11px;font-weight:600;color:var(--gray-500)">${t.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <div class="actions">
                      <button class="btn-icon" onclick="openTaskDetail('${t.id}')"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Task Detail Modal -->
    <div class="modal-backdrop" id="task-detail-modal">
      <div class="modal modal-lg" id="task-detail-body"></div>
    </div>

    <!-- Add Task Modal -->
    <div class="modal-backdrop" id="add-task-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
          <div class="modal-header-text">
            <div class="modal-title">Create New Task</div>
            <div class="modal-subtitle">Assign and track HR tasks</div>
          </div>
          <button class="modal-close" onclick="closeModal('add-task-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Task Title *</label>
            <input type="text" class="form-control" placeholder="Enter task title…"/>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Description</label>
            <textarea class="form-control" rows="3" placeholder="Task description…"></textarea>
          </div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group">
              <label class="form-label">Assign To</label>
              <select class="form-control">${WP.employees.filter(e=>e.status==='active').map(e=>`<option>${e.name}</option>`).join('')}</select>
            </div>
            <div class="form-group">
              <label class="form-label">Priority</label>
              <select class="form-control"><option>High</option><option>Medium</option><option>Low</option></select>
            </div>
          </div>
          <div class="form-row cols-2">
            <div class="form-group">
              <label class="form-label">Due Date</label>
              <input type="date" class="form-control"/>
            </div>
            <div class="form-group">
              <label class="form-label">Tags (comma-separated)</label>
              <input type="text" class="form-control" placeholder="HR, Payroll…"/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('add-task-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="saveTask()">Create Task</button>
        </div>
      </div>
    </div>
  `;
}

function switchTaskView(btn, viewId) {
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
}

function openTaskDetail(id) {
  const t = WP.tasks.find(x => x.id === id);
  if (!t) return;
  const body = document.getElementById('task-detail-body');
  body.innerHTML = `
    <div class="modal-header">
      <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/></svg></div>
      <div class="modal-header-text">
        <div class="modal-title">${t.title}</div>
        <div class="modal-subtitle">${t.tags.join(' · ')}</div>
      </div>
      <button class="modal-close" onclick="closeModal('task-detail-modal')">✕</button>
    </div>
    <div class="modal-body">
      <div class="grid grid-2" style="gap:20px">
        <div>
          <div style="font-size:13px;color:var(--gray-500);margin-bottom:8px">Description</div>
          <p style="font-size:14px;color:var(--gray-700)">${t.desc}</p>
          <div style="margin-top:16px">
            <div style="font-size:13px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Progress</div>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="progress-bar" style="flex:1;height:10px"><div class="progress-fill" style="width:${t.progress}%"></div></div>
              <span style="font-weight:700;font-size:14px">${t.progress}%</span>
            </div>
          </div>
        </div>
        <div>
          ${[['Status',statusBadge(t.status)],['Priority',`<span class="kanban-task-priority ${t.priority==='high'?'priority-high':t.priority==='medium'?'priority-medium':'priority-low'}">${t.priority}</span>`],['Assignee',`<div style="display:flex;align-items:center;gap:6px"><div class="emp-avatar" style="background:${avatarColors(t.assigneeInitials)};width:24px;height:24px;font-size:9px">${t.assigneeInitials}</div>${t.assignee}</div>`],['Due Date',formatDate(t.due)]].map(([k,v])=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--gray-100);font-size:13px">
              <span style="color:var(--gray-500)">${k}</span>
              <span>${v}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('task-detail-modal')">Close</button>
      <button class="btn btn-primary" onclick="closeModal('task-detail-modal');showToast('Task updated!','success')">Update Task</button>
    </div>
  `;
  openModal('task-detail-modal');
}

function saveTask() {
  closeModal('add-task-modal');
  showToast('Task created and assigned!', 'success');
}
