/* ===== WorkPilot HR — Recruitment Module ===== */

function renderRecruitment(container) {
  const jobs = [
    { id:'J001', title:'Senior React Developer', dept:'Engineering', location:'Bengaluru / Remote', type:'Full-time', applicants:24, stage:'Interviewing', posted:'Jun 1, 2025', urgent:true },
    { id:'J002', title:'HR Executive', dept:'Human Resources', location:'Mumbai', type:'Full-time', applicants:18, stage:'Screening', posted:'Jun 5, 2025', urgent:false },
    { id:'J003', title:'Sales Manager – North', dept:'Sales', location:'Delhi', type:'Full-time', applicants:31, stage:'Offer', posted:'May 28, 2025', urgent:true },
    { id:'J004', title:'UI/UX Designer', dept:'Design', location:'Bengaluru', type:'Contract', applicants:15, stage:'Applied', posted:'Jun 8, 2025', urgent:false },
    { id:'J005', title:'DevOps Engineer', dept:'Engineering', location:'Remote', type:'Full-time', applicants:9, stage:'Applied', posted:'Jun 10, 2025', urgent:false },
    { id:'J006', title:'Finance Analyst', dept:'Finance', location:'Mumbai', type:'Full-time', applicants:22, stage:'Screening', posted:'Jun 3, 2025', urgent:false }
  ];

  const candidates = [
    { name:'Aryan Mehta', initials:'AM', role:'Senior React Dev', stage:'Technical Round', score:88, exp:'5 yrs', color:'#2563EB' },
    { name:'Deepika Rao', initials:'DR', role:'HR Executive', stage:'HR Interview', score:92, exp:'3 yrs', color:'#7C3AED' },
    { name:'Sameer Khan', initials:'SK', role:'Sales Manager', stage:'Final Round', score:85, exp:'8 yrs', color:'#059669' },
    { name:'Nisha Pillai', initials:'NP', role:'UI/UX Designer', stage:'Portfolio Review', score:91, exp:'4 yrs', color:'#F97316' },
    { name:'Rohit Jain', initials:'RJ', role:'DevOps Engineer', stage:'Screening', score:78, exp:'6 yrs', color:'#0891B2' }
  ];

  const stages = ['Applied','Screening','Interviewing','Technical Round','HR Interview','Final Round','Offer','Hired'];

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Recruitment</h1>
        <p>${jobs.length} open positions · ${candidates.length} active candidates</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Exporting recruitment data…','success')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
        <button class="btn btn-primary" onclick="openModal('add-job-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Post Job
        </button>
      </div>
    </div>

    <!-- KPI Row -->
    <div class="grid grid-4" style="margin-bottom:24px">
      ${[
        {label:'Open Positions', val:6, icon:'📋', color:'var(--primary)'},
        {label:'Total Applicants', val:119, icon:'👥', color:'var(--accent)'},
        {label:'Interviews This Week', val:8, icon:'🎙️', color:'var(--success)'},
        {label:'Avg. Time to Hire', val:'18 days', icon:'⏱️', color:'var(--warning)'}
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

    <!-- Tabs -->
    <div class="tab-bar" style="margin-bottom:20px">
      <div class="tab-btn active" onclick="switchRecruitTab(this,'rt-jobs')">Job Openings</div>
      <div class="tab-btn" onclick="switchRecruitTab(this,'rt-pipeline')">Candidate Pipeline</div>
      <div class="tab-btn" onclick="switchRecruitTab(this,'rt-analytics')">Analytics</div>
    </div>

    <!-- Job Openings Tab -->
    <div id="rt-jobs" class="tab-content active">
      <div class="grid grid-3">
        ${jobs.map(j=>`
          <div class="card hover-lift" style="cursor:pointer" onclick="viewJobDetail('${j.id}')">
            <div class="card-body">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px">
                <div>
                  ${j.urgent ? '<span class="badge badge-red" style="font-size:10px;margin-bottom:6px">Urgent</span><br/>' : ''}
                  <div style="font-size:15px;font-weight:700;color:var(--gray-900)">${j.title}</div>
                  <div style="font-size:12px;color:var(--gray-500);margin-top:3px">${j.dept} · ${j.location}</div>
                </div>
                <span class="badge badge-gray">${j.type}</span>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0">
                <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--gray-500)">
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  ${j.applicants} applicants
                </div>
                <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--gray-500)">
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/></svg>
                  Posted ${j.posted}
                </div>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                ${statusBadge(j.stage.toLowerCase().replace(' ','-'))||`<span class="badge badge-blue">${j.stage}</span>`}
                <div style="display:flex;gap:4px">
                  <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();showToast('Viewing applicants for ${j.title}')">View ${j.applicants}</button>
                  <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();showToast('Editing ${j.title}')">Edit</button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Candidate Pipeline Tab -->
    <div id="rt-pipeline" class="tab-content">
      <div class="card" style="margin-bottom:20px">
        <!-- Pipeline funnel -->
        <div class="card-header"><div class="card-title">Hiring Pipeline</div></div>
        <div class="card-body">
          <div style="display:flex;gap:4px;overflow-x:auto;padding-bottom:4px">
            ${stages.map((s,i)=>{
              const count = [22,15,9,5,4,3,2,1][i];
              const width = Math.max(30, 100 - i*10);
              const colors = ['#94A3B8','#2563EB','#7C3AED','#F97316','#059669','#0891B2','#EAB308','#10B981'];
              return `
                <div style="flex:1;min-width:80px;text-align:center">
                  <div style="font-size:11px;font-weight:600;color:var(--gray-500);margin-bottom:6px;white-space:nowrap">${s}</div>
                  <div style="height:${30+count*3}px;background:${colors[i]};border-radius:6px;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;font-weight:800;transition:var(--transition);cursor:pointer"
                       onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">${count}</div>
                </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Candidates Table -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Active Candidates</div>
          <div class="filter-search" style="max-width:220px">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search candidates…" style="border:none;background:transparent;font-size:13px;outline:none;flex:1"/>
          </div>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead><tr><th>Candidate</th><th>Applied For</th><th>Stage</th><th>Score</th><th>Experience</th><th>Actions</th></tr></thead>
            <tbody>
              ${candidates.map(c=>`
                <tr>
                  <td><div class="emp-cell">
                    <div class="emp-avatar" style="background:${c.color}">${c.initials}</div>
                    <div><div class="emp-name">${c.name}</div></div>
                  </div></td>
                  <td style="font-size:13px">${c.role}</td>
                  <td>
                    <span class="badge badge-blue">${c.stage}</span>
                  </td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div class="progress-bar" style="width:60px">
                        <div class="progress-fill ${c.score>=90?'success':c.score>=80?'':c.score>=70?'warning':'danger'}" style="width:${c.score}%"></div>
                      </div>
                      <span style="font-size:12px;font-weight:700">${c.score}%</span>
                    </div>
                  </td>
                  <td style="font-size:13px">${c.exp}</td>
                  <td>
                    <div class="actions">
                      <button class="btn btn-success btn-sm" onclick="showToast('Moving ${c.name} to next stage','success')">Next →</button>
                      <button class="btn btn-secondary btn-sm" onclick="showToast('Scheduling interview…')">Schedule</button>
                      <button class="btn btn-danger btn-sm" onclick="showToast('${c.name} rejected','error')">Reject</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Analytics Tab -->
    <div id="rt-analytics" class="tab-content">
      <div class="grid grid-2">
        <div class="card">
          <div class="card-header"><div class="card-title">Applications by Source</div></div>
          <div class="card-body"><div class="chart-wrap" style="height:240px"><canvas id="sourceChart"></canvas></div></div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Hiring Funnel Conversion</div></div>
          <div class="card-body"><div class="chart-wrap" style="height:240px"><canvas id="funnelChart"></canvas></div></div>
        </div>
      </div>
    </div>

    <!-- Add Job Modal -->
    <div class="modal-backdrop" id="add-job-modal">
      <div class="modal modal-lg">
        <div class="modal-header">
          <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Post New Job</div><div class="modal-subtitle">Create a job opening for recruitment</div></div>
          <button class="modal-close" onclick="closeModal('add-job-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Job Title *</label>
            <input type="text" class="form-control" placeholder="e.g. Senior Software Engineer"/>
          </div>
          <div class="form-row cols-3" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Department</label>
              <select class="form-control">${WP.departments.map(d=>`<option>${d.name}</option>`).join('')}</select>
            </div>
            <div class="form-group"><label class="form-label">Job Type</label>
              <select class="form-control"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Intern</option></select>
            </div>
            <div class="form-group"><label class="form-label">Location</label>
              <input type="text" class="form-control" placeholder="Mumbai / Remote"/>
            </div>
          </div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Min Experience</label>
              <input type="text" class="form-control" placeholder="e.g. 3 years"/>
            </div>
            <div class="form-group"><label class="form-label">Salary Range (₹)</label>
              <input type="text" class="form-control" placeholder="e.g. 8L – 14L"/>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Job Description *</label>
            <textarea class="form-control" rows="4" placeholder="Describe the role, responsibilities, and requirements…"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('add-job-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('add-job-modal');showToast('Job posted successfully!','success')">Post Job</button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => initRecruitCharts(), 100);
}

function switchRecruitTab(btn, tabId) {
  btn.closest('.tab-bar').querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#rt-jobs,#rt-pipeline,#rt-analytics').forEach(t=>t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  if (tabId === 'rt-analytics') initRecruitCharts();
}

function viewJobDetail(id) {
  showToast(`Opening job ${id} details…`);
}

function initRecruitCharts() {
  const s = document.getElementById('sourceChart');
  if (s && !s._done) {
    s._done = true;
    new Chart(s, {
      type: 'doughnut',
      data: {
        labels: ['LinkedIn', 'Naukri', 'Indeed', 'Referral', 'Walk-in', 'Website'],
        datasets: [{
          data: [35, 28, 18, 10, 5, 4],
          backgroundColor: ['#2563EB','#F97316','#059669','#9333EA','#0891B2','#94A3B8'],
          borderWidth: 2, borderColor: 'white'
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'right', labels: { font: { family:'Inter', size:11 }, usePointStyle:true } } },
        cutout: '60%'
      }
    });
  }
  const f = document.getElementById('funnelChart');
  if (f && !f._done) {
    f._done = true;
    new Chart(f, {
      type: 'bar',
      data: {
        labels: ['Applied','Screened','Interviewed','Technical','Offered','Hired'],
        datasets: [{
          label: 'Candidates',
          data: [119, 68, 42, 24, 8, 5],
          backgroundColor: ['#2563EB','#7C3AED','#F97316','#059669','#0891B2','#10B981'].map(c=>c+'CC'),
          borderRadius: 6
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display:false } },
        scales: {
          x: { grid:{display:false}, ticks:{font:{family:'Inter',size:11}} },
          y: { grid:{color:'rgba(0,0,0,0.04)'}, ticks:{font:{family:'Inter',size:11}} }
        }
      }
    });
  }
}
