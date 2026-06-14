/* ===== WorkPilot HR — Performance Appraisal Module ===== */

function renderAppraisal(container) {
  const cycles = [
    { id:'AC001', name:'Q2 2025 Appraisal', period:'Apr–Jun 2025', status:'active', total:248, completed:186, due:'Jun 30, 2025' },
    { id:'AC002', name:'Annual Review 2024', period:'Jan–Dec 2024', status:'closed', total:242, completed:242, due:'Jan 15, 2025' },
    { id:'AC003', name:'Q4 2024 Appraisal', period:'Oct–Dec 2024', status:'closed', total:240, completed:235, due:'Jan 10, 2025' }
  ];

  const myReviews = [
    { emp:'Priya Sharma', initials:'PS', role:'Sr. Developer', score:92, rating:'Exceptional', color:'#7C3AED', trend:'up' },
    { emp:'Rahul Mehta', initials:'RM', role:'Sales Executive', score:78, rating:'Meets Expectations', color:'#059669', trend:'up' },
    { emp:'Sneha Patel', initials:'SP', role:'Marketing Lead', score:85, rating:'Exceeds Expectations', color:'#F97316', trend:'stable' },
    { emp:'Kiran Reddy', initials:'KR', role:'DevOps Engineer', score:88, rating:'Exceeds Expectations', color:'#0891B2', trend:'up' },
    { emp:'Neha Gupta', initials:'NG', role:'UI/UX Designer', score:94, rating:'Exceptional', color:'#EA580C', trend:'up' },
    { emp:'Deepak Kumar', initials:'DK', role:'Backend Developer', score:72, rating:'Needs Improvement', color:'#2563EB', trend:'down' }
  ];

  const ratingColor = r =>
    r==='Exceptional'?'var(--success)':r==='Exceeds Expectations'?'var(--primary)':r==='Meets Expectations'?'var(--warning)':'var(--danger)';
  const ratingBadge = r =>
    r==='Exceptional'?'badge-green':r==='Exceeds Expectations'?'badge-blue':r==='Meets Expectations'?'badge-yellow':'badge-red';

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Performance Appraisal</h1>
        <p>Manage reviews, ratings, and growth plans</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Exporting appraisal data…','success')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
        <button class="btn btn-primary" onclick="openModal('new-cycle-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Cycle
        </button>
      </div>
    </div>

    <!-- KPI Row -->
    <div class="grid grid-4" style="margin-bottom:24px">
      ${[
        {label:'Active Cycle', val:'Q2 2025', sub:'Due Jun 30', color:'var(--primary)', icon:'🎯'},
        {label:'Reviews Completed', val:'186/248', sub:'75% complete', color:'var(--success)', icon:'✅'},
        {label:'Avg Rating Score', val:'84.2%', sub:'+3.1% vs last cycle', color:'var(--accent)', icon:'⭐'},
        {label:'Promotions Due', val:'12', sub:'Pending HR action', color:'var(--warning)', icon:'🚀'}
      ].map(s=>`
        <div class="stat-card">
          <div style="font-size:28px;width:48px;height:48px;display:flex;align-items:center;justify-content:center">${s.icon}</div>
          <div class="stat-body">
            <div class="stat-label">${s.label}</div>
            <div class="stat-value" style="color:${s.color}">${s.val}</div>
            <div style="font-size:11px;color:var(--gray-400);margin-top:3px">${s.sub}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Tabs -->
    <div class="tab-bar" style="margin-bottom:20px">
      <div class="tab-btn active" onclick="switchAppraisalTab(this,'ap-cycles')">Appraisal Cycles</div>
      <div class="tab-btn" onclick="switchAppraisalTab(this,'ap-reviews')">Employee Reviews</div>
      <div class="tab-btn" onclick="switchAppraisalTab(this,'ap-analytics')">Analytics</div>
      <div class="tab-btn" onclick="switchAppraisalTab(this,'ap-goals')">Goals & OKRs</div>
    </div>

    <!-- Appraisal Cycles -->
    <div id="ap-cycles" class="tab-content active">
      ${cycles.map(c=>`
        <div class="card" style="margin-bottom:14px">
          <div class="card-body">
            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <div style="flex:1;min-width:200px">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">
                  <h3 style="font-size:15px;font-weight:700;color:var(--gray-800)">${c.name}</h3>
                  ${c.status==='active'
                    ? '<span class="badge badge-green badge-dot">Active</span>'
                    : '<span class="badge badge-gray">Closed</span>'}
                </div>
                <div style="font-size:12px;color:var(--gray-500)">${c.period} · Due: ${c.due}</div>
              </div>
              <div style="min-width:200px;flex:2">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px">
                  <span style="color:var(--gray-500)">Completion Progress</span>
                  <span style="font-weight:700">${c.completed}/${c.total}</span>
                </div>
                <div class="progress-bar" style="height:10px">
                  <div class="progress-fill ${c.status==='closed'?'success':''}" style="width:${Math.round(c.completed/c.total*100)}%"></div>
                </div>
                <div style="font-size:11px;color:var(--gray-400);margin-top:3px">${Math.round(c.completed/c.total*100)}% complete</div>
              </div>
              <div style="display:flex;gap:8px">
                ${c.status==='active'
                  ? `<button class="btn btn-primary btn-sm" onclick="showToast('Opening ${c.name}…','success')">Manage →</button>`
                  : `<button class="btn btn-secondary btn-sm" onclick="showToast('Viewing ${c.name} report')">View Report</button>`}
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Employee Reviews -->
    <div id="ap-reviews" class="tab-content">
      <div class="filter-bar" style="margin-bottom:16px">
        <div class="filter-search" style="max-width:280px">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search employee…" style="border:none;background:transparent;font-size:13px;outline:none;flex:1"/>
        </div>
        <select class="filter-select">
          <option>All Departments</option>
          ${WP.departments.map(d=>`<option>${d.name}</option>`).join('')}
        </select>
        <select class="filter-select">
          <option>All Ratings</option>
          <option>Exceptional</option>
          <option>Exceeds Expectations</option>
          <option>Meets Expectations</option>
          <option>Needs Improvement</option>
        </select>
      </div>
      <div class="grid grid-3">
        ${myReviews.map(r=>`
          <div class="card hover-lift" style="cursor:pointer" onclick="openAppraisalForm('${r.emp}')">
            <div class="card-body">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
                <div class="emp-avatar" style="background:${r.color};width:44px;height:44px;font-size:15px">${r.initials}</div>
                <div style="flex:1">
                  <div style="font-size:14px;font-weight:700;color:var(--gray-800)">${r.emp}</div>
                  <div style="font-size:12px;color:var(--gray-500)">${r.role}</div>
                </div>
                <span style="font-size:18px">${r.trend==='up'?'📈':r.trend==='down'?'📉':'➡️'}</span>
              </div>
              <!-- Score Ring -->
              <div style="text-align:center;margin:16px 0">
                <div style="position:relative;width:88px;height:88px;margin:0 auto">
                  <svg width="88" height="88" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" r="36" fill="none" stroke="var(--gray-200)" stroke-width="8"/>
                    <circle cx="44" cy="44" r="36" fill="none" stroke="${ratingColor(r.rating)}" stroke-width="8"
                      stroke-dasharray="${r.score*2.26} 226" stroke-linecap="round"
                      transform="rotate(-90 44 44)"/>
                  </svg>
                  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
                    <span style="font-size:18px;font-weight:800;color:var(--gray-800)">${r.score}</span>
                    <span style="font-size:10px;color:var(--gray-400)">/100</span>
                  </div>
                </div>
              </div>
              <div style="text-align:center">
                <span class="badge ${ratingBadge(r.rating)}" style="font-size:11px">${r.rating}</span>
              </div>
              <!-- Rating Bars -->
              <div style="margin-top:14px;display:flex;flex-direction:column;gap:6px">
                ${[
                  {label:'Performance', val: Math.round(r.score*0.95)},
                  {label:'Collaboration', val: Math.round(r.score*1.02)},
                  {label:'Innovation', val: Math.round(r.score*0.88)}
                ].map(b=>`
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--gray-500);margin-bottom:3px">
                      <span>${b.label}</span><span style="font-weight:600">${Math.min(b.val,100)}%</span>
                    </div>
                    <div class="progress-bar" style="height:5px">
                      <div class="progress-fill" style="width:${Math.min(b.val,100)}%;background:${ratingColor(r.rating)}"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <button class="btn btn-outline" style="width:100%;margin-top:14px;font-size:12px" onclick="event.stopPropagation();openAppraisalForm('${r.emp}')">
                Review & Rate
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Analytics -->
    <div id="ap-analytics" class="tab-content">
      <div class="grid grid-2" style="margin-bottom:20px">
        <div class="card">
          <div class="card-header"><div class="card-title">Rating Distribution</div></div>
          <div class="card-body"><div class="chart-wrap" style="height:250px"><canvas id="apRatingChart"></canvas></div></div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Dept-wise Avg Score</div></div>
          <div class="card-body"><div class="chart-wrap" style="height:250px"><canvas id="apDeptChart"></canvas></div></div>
        </div>
      </div>
      <div class="grid grid-3">
        ${[
          {title:'Top Performers', emps:[
            {name:'Neha Gupta', score:94, dept:'Design'},
            {name:'Priya Sharma', score:92, dept:'Engineering'},
            {name:'Anita Desai', score:90, dept:'Finance'}
          ], icon:'🏆', color:'var(--warning)'},
          {title:'Most Improved', emps:[
            {name:'Rahul Mehta', score:'+12', dept:'Sales'},
            {name:'Kiran Reddy', score:'+8', dept:'Engineering'},
            {name:'Sunita Rao', score:'+6', dept:'Sales'}
          ], icon:'📈', color:'var(--success)'},
          {title:'Promotions Recommended', emps:[
            {name:'Priya Sharma', score:'L3→L4', dept:'Engineering'},
            {name:'Neha Gupta', score:'L2→L3', dept:'Design'},
            {name:'Kiran Reddy', score:'L3→L4', dept:'Engineering'}
          ], icon:'🚀', color:'var(--primary)'}
        ].map(g=>`
          <div class="card">
            <div class="card-header">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:20px">${g.icon}</span>
                <div class="card-title">${g.title}</div>
              </div>
            </div>
            <div class="card-body" style="padding:0">
              ${g.emps.map((e,i)=>`
                <div style="display:flex;align-items:center;gap:10px;padding:10px 20px;border-bottom:1px solid var(--gray-50)">
                  <div style="font-size:18px;font-weight:800;color:var(--gray-200);width:20px">${i+1}</div>
                  <div style="flex:1">
                    <div style="font-size:13px;font-weight:600">${e.name}</div>
                    <div style="font-size:11px;color:var(--gray-400)">${e.dept}</div>
                  </div>
                  <span style="font-weight:800;color:${g.color};font-size:14px">${e.score}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Goals & OKRs -->
    <div id="ap-goals" class="tab-content">
      <div class="grid grid-2">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <div style="font-size:15px;font-weight:700;color:var(--gray-800)">Company OKRs — Q2 2025</div>
            <button class="btn btn-primary btn-sm" onclick="openModal('add-goal-modal')">+ Add Goal</button>
          </div>
          ${[
            {obj:'Grow Revenue to ₹50Cr', krs:['Acquire 20 new enterprise clients','Increase upsell revenue by 35%'], progress:68, color:'#2563EB'},
            {obj:'Improve Product Quality', krs:['Reduce bug count by 40%','Ship 3 major features per month'], progress:82, color:'#059669'},
            {obj:'Build High-Performance Team', krs:['Hire 15 engineers','Achieve 90% retention rate'], progress:55, color:'#F97316'},
            {obj:'Expand to 3 New Markets', krs:['Launch in Delhi & Chennai','Hire regional sales managers'], progress:40, color:'#9333EA'}
          ].map(g=>`
            <div class="card" style="margin-bottom:12px">
              <div class="card-body">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px">
                  <div style="font-size:14px;font-weight:700;color:var(--gray-800);flex:1">${g.obj}</div>
                  <span style="font-size:16px;font-weight:800;color:${g.color};margin-left:12px">${g.progress}%</span>
                </div>
                ${g.krs.map(kr=>`
                  <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--gray-500);margin-bottom:4px">
                    <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/></svg>
                    ${kr}
                  </div>
                `).join('')}
                <div class="progress-bar" style="margin-top:10px;height:6px">
                  <div class="progress-fill" style="width:${g.progress}%;background:${g.color}"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div>
          <div style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:14px">My Personal Goals</div>
          ${[
            {title:'Complete AWS Certification', due:'Jul 15', progress:70, category:'Learning'},
            {title:'Mentor 2 junior HR executives', due:'Jun 30', progress:50, category:'Leadership'},
            {title:'Reduce hiring TAT to 14 days', due:'Jul 31', progress:35, category:'Process'},
            {title:'Implement automated payroll', due:'Aug 15', progress:20, category:'Tech'}
          ].map(g=>`
            <div class="card" style="margin-bottom:12px">
              <div class="card-body">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                  <div>
                    <div style="font-size:13px;font-weight:600;color:var(--gray-800)">${g.title}</div>
                    <div style="font-size:11px;color:var(--gray-400);margin-top:2px">Due: ${g.due} · <span class="badge badge-gray" style="font-size:10px">${g.category}</span></div>
                  </div>
                  <span style="font-size:14px;font-weight:800;color:var(--primary)">${g.progress}%</span>
                </div>
                <div class="progress-bar" style="height:6px">
                  <div class="progress-fill" style="width:${g.progress}%"></div>
                </div>
              </div>
            </div>
          `).join('')}
          <button class="btn btn-outline" style="width:100%" onclick="openModal('add-goal-modal')">+ Add Personal Goal</button>
        </div>
      </div>
    </div>

    <!-- New Cycle Modal -->
    <div class="modal-backdrop" id="new-cycle-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Create Appraisal Cycle</div><div class="modal-subtitle">Set up a new review period</div></div>
          <button class="modal-close" onclick="closeModal('new-cycle-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px"><label class="form-label">Cycle Name *</label><input type="text" class="form-control" placeholder="e.g. Q3 2025 Appraisal"/></div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Start Date</label><input type="date" class="form-control"/></div>
            <div class="form-group"><label class="form-label">End Date</label><input type="date" class="form-control"/></div>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Review Type</label>
            <select class="form-control"><option>360° Review</option><option>Manager Review</option><option>Self Assessment</option><option>Peer Review</option></select>
          </div>
          <div class="form-group"><label class="form-label">Applicable To</label>
            <select class="form-control"><option>All Employees</option>${WP.departments.map(d=>`<option>${d.name}</option>`).join('')}</select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('new-cycle-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('new-cycle-modal');showToast('Appraisal cycle created!','success')">Create Cycle</button>
        </div>
      </div>
    </div>

    <!-- Add Goal Modal -->
    <div class="modal-backdrop" id="add-goal-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Add Goal / OKR</div><div class="modal-subtitle">Set a measurable objective</div></div>
          <button class="modal-close" onclick="closeModal('add-goal-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px"><label class="form-label">Goal Title *</label><input type="text" class="form-control" placeholder="e.g. Complete AWS Certification"/></div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Category</label><select class="form-control"><option>Learning</option><option>Leadership</option><option>Process</option><option>Tech</option><option>Business</option></select></div>
            <div class="form-group"><label class="form-label">Due Date</label><input type="date" class="form-control"/></div>
          </div>
          <div class="form-group"><label class="form-label">Key Results (one per line)</label><textarea class="form-control" rows="3" placeholder="- Achieve score ≥80% in exam&#10;- Complete all modules"></textarea></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('add-goal-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('add-goal-modal');showToast('Goal added!','success')">Add Goal</button>
        </div>
      </div>
    </div>
  `;
  setTimeout(()=>initAppraisalCharts(), 100);
}

function openAppraisalForm(name) {
  showToast(`Opening review form for ${name}…`, 'success');
}

function switchAppraisalTab(btn, tabId) {
  btn.closest('.tab-bar').querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#ap-cycles,#ap-reviews,#ap-analytics,#ap-goals').forEach(t=>t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  if (tabId==='ap-analytics') initAppraisalCharts();
}

function initAppraisalCharts() {
  const rc = document.getElementById('apRatingChart');
  if (rc && !rc._done) {
    rc._done = true;
    new Chart(rc, {
      type: 'doughnut',
      data: {
        labels: ['Exceptional','Exceeds','Meets','Needs Improvement'],
        datasets: [{ data: [18, 42, 32, 8],
          backgroundColor: ['#10B981','#2563EB','#F59E0B','#EF4444'],
          borderWidth: 2, borderColor: 'white' }]
      },
      options: { responsive:true, maintainAspectRatio:false,
        plugins: { legend: { position:'right', labels:{ font:{family:'Inter',size:11}, usePointStyle:true } } },
        cutout:'60%' }
    });
  }
  const dc = document.getElementById('apDeptChart');
  if (dc && !dc._done) {
    dc._done = true;
    new Chart(dc, {
      type: 'bar',
      data: {
        labels: WP.departments.map(d=>d.name),
        datasets: [{ label:'Avg Score', data:[88,75,86,82,79,91,90,85],
          backgroundColor: WP.departments.map(d=>d.color+'CC'),
          borderColor: WP.departments.map(d=>d.color),
          borderWidth:1.5, borderRadius:6 }]
      },
      options: { responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false} },
        scales:{
          x:{ grid:{display:false}, ticks:{font:{family:'Inter',size:10}} },
          y:{ min:60, max:100, grid:{color:'rgba(0,0,0,0.04)'}, ticks:{font:{family:'Inter',size:11}, callback:v=>v+'%'} }
        }
      }
    });
  }
}
