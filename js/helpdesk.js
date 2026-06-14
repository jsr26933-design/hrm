/* ===== WorkPilot HR — Help Desk & Announcements Module ===== */

function renderHelpDesk(container) {
  const tickets = [
    { id:'TK001', subject:'Salary not credited for May', emp:'Rahul Mehta', initials:'RM', color:'#059669', priority:'high', status:'open', category:'Payroll', date:'Jun 12, 2025', replies:2 },
    { id:'TK002', subject:'Unable to apply for leave on portal', emp:'Neha Gupta', initials:'NG', color:'#EA580C', priority:'medium', status:'in-progress', category:'Technical', date:'Jun 11, 2025', replies:3 },
    { id:'TK003', subject:'Request for work-from-home policy copy', emp:'Kiran Reddy', initials:'KR', color:'#0891B2', priority:'low', status:'resolved', category:'Policy', date:'Jun 10, 2025', replies:1 },
    { id:'TK004', subject:'PF account not linked properly', emp:'Sneha Patel', initials:'SP', color:'#F97316', priority:'high', status:'open', category:'Compliance', date:'Jun 13, 2025', replies:0 },
    { id:'TK005', subject:'Laptop charger replacement request', emp:'Deepak Kumar', initials:'DK', color:'#2563EB', priority:'low', status:'in-progress', category:'Assets', date:'Jun 9, 2025', replies:4 },
    { id:'TK006', subject:'Form 16 for FY 2024-25 needed', emp:'Priya Sharma', initials:'PS', color:'#7C3AED', priority:'medium', status:'resolved', category:'Payroll', date:'Jun 8, 2025', replies:2 }
  ];

  const announcements = [
    { id:'AN001', title:'Q2 Appraisal Cycle Now Open', body:'The performance appraisal for April–June 2025 has been initiated. All employees must complete self-assessment by June 25th.', author:'Arjun Kumar', date:'Jun 13, 2025', category:'Appraisal', pinned:true, icon:'🎯' },
    { id:'AN002', title:'Company Picnic — June 17', body:'Join us for the annual company outing at Lonavala! Registration deadline is June 14. Transport arranged from HQ at 8 AM.', author:'HR Team', date:'Jun 12, 2025', category:'Event', pinned:true, icon:'🎉' },
    { id:'AN003', title:'New Leave Policy Effective July 1', body:'The updated leave policy including remote work provisions will be effective from July 1, 2025. Please review the policy document in HR portal.', author:'Arjun Kumar', date:'Jun 10, 2025', category:'Policy', pinned:false, icon:'📋' },
    { id:'AN004', title:'Salary Disbursement — June 30', body:'June 2025 salaries will be credited on June 30th. Ensure your bank details are up-to-date in the self-service portal.', author:'Finance Team', date:'Jun 9, 2025', category:'Payroll', pinned:false, icon:'💰' },
    { id:'AN005', title:'Mandatory Compliance Training', body:'All employees must complete the POSH and workplace safety training modules by June 28. Access via Learning section.', author:'HR Team', date:'Jun 7, 2025', category:'Compliance', pinned:false, icon:'🎓' }
  ];

  const priColor = p => p==='high'?'var(--danger)':p==='medium'?'var(--warning)':'var(--success)';
  const priClass = p => p==='high'?'badge-red':p==='medium'?'badge-yellow':'badge-green';
  const stClass  = s => s==='open'?'badge-red':s==='in-progress'?'badge-yellow':'badge-green';

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Help Desk & Announcements</h1>
        <p>Employee support tickets and company-wide communications</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="openModal('new-announce-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
          Post Announcement
        </button>
        <button class="btn btn-primary" onclick="openModal('new-ticket-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Raise Ticket
        </button>
      </div>
    </div>

    <!-- KPI Row -->
    <div class="grid grid-4" style="margin-bottom:24px">
      ${[
        {label:'Open Tickets', val:tickets.filter(t=>t.status==='open').length, color:'var(--danger)', icon:'🎫'},
        {label:'In Progress', val:tickets.filter(t=>t.status==='in-progress').length, color:'var(--warning)', icon:'⚙️'},
        {label:'Resolved Today', val:2, color:'var(--success)', icon:'✅'},
        {label:'Announcements', val:announcements.length, color:'var(--primary)', icon:'📢'}
      ].map(s=>`
        <div class="stat-card">
          <div style="font-size:28px;width:48px;height:48px;display:flex;align-items:center;justify-content:center">${s.icon}</div>
          <div class="stat-body">
            <div class="stat-label">${s.label}</div>
            <div class="stat-value" style="color:${s.color}">${s.val}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="grid" style="grid-template-columns:1fr 380px;gap:20px">
      <!-- Help Desk Tickets -->
      <div>
        <div class="tab-bar" style="margin-bottom:16px">
          <div class="tab-btn active" onclick="switchHDTab(this,'hd-tickets')">Support Tickets</div>
          <div class="tab-btn" onclick="switchHDTab(this,'hd-faq')">FAQ</div>
        </div>

        <div id="hd-tickets" class="tab-content active">
          <div class="filter-bar" style="margin-bottom:14px">
            <div class="filter-search">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search tickets…" style="border:none;background:transparent;font-size:13px;outline:none;flex:1"/>
            </div>
            <select class="filter-select">
              <option>All Status</option><option>Open</option><option>In Progress</option><option>Resolved</option>
            </select>
            <select class="filter-select">
              <option>All Priority</option><option>High</option><option>Medium</option><option>Low</option>
            </select>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${tickets.map(t=>`
              <div class="card hover-lift" style="cursor:pointer" onclick="openTicket('${t.id}')">
                <div class="card-body" style="padding:16px 20px">
                  <div style="display:flex;align-items:flex-start;gap:12px">
                    <div class="emp-avatar" style="background:${t.color};width:36px;height:36px;font-size:12px;flex-shrink:0">${t.initials}</div>
                    <div style="flex:1;min-width:0">
                      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
                        <span style="font-size:14px;font-weight:700;color:var(--gray-800)">${t.subject}</span>
                        ${t.status==='open'?'<span style="width:8px;height:8px;border-radius:50%;background:var(--danger);animation:livePulse 1.5s infinite;flex-shrink:0"></span>':''}
                      </div>
                      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                        <span style="font-size:12px;color:var(--gray-500)">${t.emp}</span>
                        <span class="badge badge-gray" style="font-size:10px">${t.category}</span>
                        <span class="badge ${priClass(t.priority)}" style="font-size:10px">${t.priority}</span>
                        <span class="badge ${stClass(t.status)} badge-dot" style="font-size:10px">${t.status}</span>
                      </div>
                    </div>
                    <div style="text-align:right;flex-shrink:0">
                      <div style="font-size:11px;color:var(--gray-400)">${t.date}</div>
                      <div style="font-size:11px;color:var(--gray-500);margin-top:3px">💬 ${t.replies} repl${t.replies===1?'y':'ies'}</div>
                      <div style="display:flex;gap:4px;margin-top:6px">
                        ${t.status==='open'?`<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();assignTicket('${t.id}')">Assign</button>`:''}
                        ${t.status==='in-progress'?`<button class="btn btn-success btn-sm" onclick="event.stopPropagation();resolveTicket('${t.id}',this)">Resolve</button>`:''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div id="hd-faq" class="tab-content">
          <div style="display:flex;flex-direction:column;gap:8px">
            ${[
              {q:'How do I apply for leave?', a:'Go to Leave Management → Apply Leave. Fill in the dates and reason, then submit for manager approval.'},
              {q:'When is salary credited?', a:'Salaries are credited on the 30th of every month. For months with 31 days, it\'s still the 30th.'},
              {q:'How do I download my payslip?', a:'Navigate to Self Service Portal → My Payslips. Click the PDF download button next to the month.'},
              {q:'How do I update my bank details?', a:'Go to Self Service → Edit Profile → Bank Details section. Changes require HR verification.'},
              {q:'Who approves my leave requests?', a:'Your direct reporting manager approves leaves. HR admins can override if needed.'},
              {q:'How to apply for Work From Home?', a:'Use the Leave Management module and select "WFH" as leave type. Prior approval required.'}
            ].map((f,i)=>`
              <div class="card" onclick="toggleFAQ(this)" style="cursor:pointer">
                <div style="padding:14px 20px;display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:13px;font-weight:600;color:var(--gray-800)">${f.q}</span>
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="faq-arrow" style="flex-shrink:0;transition:var(--transition)"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="faq-body" style="display:none;padding:0 20px 14px;font-size:13px;color:var(--gray-600);border-top:1px solid var(--gray-100)">${f.a}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Announcements Panel -->
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:14px">📢 Announcements</div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${announcements.map(a=>`
            <div class="card" style="border-left:3px solid ${a.pinned?'var(--accent)':'var(--gray-200)'}">
              <div class="card-body" style="padding:14px 16px">
                ${a.pinned?'<div style="font-size:10px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px">📌 PINNED</div>':''}
                <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px">
                  <span style="font-size:20px;flex-shrink:0">${a.icon}</span>
                  <div>
                    <div style="font-size:13px;font-weight:700;color:var(--gray-800)">${a.title}</div>
                    <div style="font-size:11px;color:var(--gray-400);margin-top:2px">${a.author} · ${a.date}</div>
                  </div>
                  <span class="badge badge-gray" style="margin-left:auto;font-size:10px;flex-shrink:0">${a.category}</span>
                </div>
                <p style="font-size:12px;color:var(--gray-600);line-height:1.5;margin:0">${a.body}</p>
                <div style="display:flex;gap:6px;margin-top:10px">
                  <button class="btn btn-ghost btn-sm" onclick="showToast('Viewing full announcement')">Read more</button>
                  <button class="btn btn-ghost btn-sm" onclick="showToast('Announcement shared!')">Share</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- New Announcement Modal -->
    <div class="modal-backdrop" id="new-announce-modal">
      <div class="modal modal-lg">
        <div class="modal-header">
          <div class="modal-icon orange"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Post Announcement</div><div class="modal-subtitle">Broadcast a message to employees</div></div>
          <button class="modal-close" onclick="closeModal('new-announce-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px"><label class="form-label">Title *</label><input type="text" class="form-control" placeholder="Announcement title…"/></div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Category</label>
              <select class="form-control"><option>General</option><option>Policy</option><option>Payroll</option><option>Event</option><option>Compliance</option><option>Appraisal</option></select>
            </div>
            <div class="form-group"><label class="form-label">Audience</label>
              <select class="form-control"><option>All Employees</option>${WP.departments.map(d=>`<option>${d.name} Dept</option>`).join('')}</select>
            </div>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Message *</label>
            <textarea class="form-control" rows="4" placeholder="Write your announcement…"></textarea>
          </div>
          <label class="checkbox-label" style="font-size:13px;color:var(--gray-700)">
            <input type="checkbox"/> Pin this announcement to the top
          </label>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('new-announce-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('new-announce-modal');showToast('Announcement posted to all employees!','success')">Post Now</button>
        </div>
      </div>
    </div>

    <!-- Raise Ticket Modal -->
    <div class="modal-backdrop" id="new-ticket-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Raise Support Ticket</div><div class="modal-subtitle">Submit an HR support request</div></div>
          <button class="modal-close" onclick="closeModal('new-ticket-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px"><label class="form-label">Subject *</label><input type="text" class="form-control" placeholder="Brief description of issue…"/></div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Category</label>
              <select class="form-control"><option>Payroll</option><option>Leave</option><option>Technical</option><option>Policy</option><option>Assets</option><option>Compliance</option><option>Other</option></select>
            </div>
            <div class="form-group"><label class="form-label">Priority</label>
              <select class="form-control"><option>Low</option><option>Medium</option><option>High</option></select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Description *</label>
            <textarea class="form-control" rows="3" placeholder="Describe your issue in detail…"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('new-ticket-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('new-ticket-modal');showToast('Ticket TK007 raised successfully!','success')">Submit Ticket</button>
        </div>
      </div>
    </div>
  `;
}

function switchHDTab(btn, tabId) {
  btn.closest('.tab-bar').querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#hd-tickets,#hd-faq').forEach(t=>t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

function openTicket(id) { showToast(`Opening ticket ${id}…`); }

function assignTicket(id) {
  showToast(`Ticket ${id} assigned to you!`, 'success');
  event.stopPropagation();
}

function resolveTicket(id, btn) {
  const card = btn.closest('.card');
  if (card) { card.style.opacity='0.5'; setTimeout(()=>card.remove(), 400); }
  showToast(`Ticket ${id} resolved!`, 'success');
}

function toggleFAQ(el) {
  const body = el.querySelector('.faq-body');
  const arrow = el.querySelector('.faq-arrow');
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  if (arrow) arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
}
