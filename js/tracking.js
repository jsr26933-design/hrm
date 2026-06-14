/* ===== WorkPilot HR — Workforce Tracking Module ===== */

function renderTracking(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Workforce Tracking</h1>
        <p>Monitor employee activities, overtime, and productivity</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Generating productivity report…','success')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>
          Export Report
        </button>
        <select class="form-control" style="width:160px;height:38px">
          <option>Today</option><option>This Week</option><option>This Month</option>
        </select>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-4" style="margin-bottom:24px">
      ${[
        {label:'Avg. Work Hours', val:'8h 42m', icon:'⏱️', color:'var(--primary)', change:'↑ vs 8h 20m last week'},
        {label:'Overtime Hours', val:'342h', icon:'🔥', color:'var(--accent)', change:'12% employees OT'},
        {label:'Productivity Score', val:'86%', icon:'📈', color:'var(--success)', change:'↑ +3% this week'},
        {label:'Absenteeism Rate', val:'3.2%', icon:'⚠️', color:'var(--warning)', change:'↓ -0.5% improvement'}
      ].map(s=>`
        <div class="stat-card">
          <div class="stat-icon" style="background:${s.color}22;font-size:22px;width:48px;height:48px;display:flex;align-items:center;justify-content:center;border-radius:12px">${s.icon}</div>
          <div class="stat-body">
            <div class="stat-label">${s.label}</div>
            <div class="stat-value" style="color:${s.color}">${s.val}</div>
            <div class="stat-change" style="color:var(--gray-400);font-size:11px;margin-top:4px">${s.change}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="grid" style="grid-template-columns:2fr 1fr;gap:20px">
      <div>
        <!-- Productivity Chart -->
        <div class="card" style="margin-bottom:20px">
          <div class="card-header">
            <div class="card-title">Department Productivity — Last 4 Weeks</div>
          </div>
          <div class="card-body">
            <div class="chart-wrap" style="height:250px"><canvas id="productivityChart"></canvas></div>
          </div>
        </div>

        <!-- Employee Hours Table -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Employee Hours — This Week</div>
            <select class="form-control" style="width:160px;height:36px">
              <option>All Departments</option>
              ${WP.departments.map(d=>`<option>${d.name}</option>`).join('')}
            </select>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr><th>Employee</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Total</th><th>OT</th><th>Status</th></tr>
              </thead>
              <tbody>
                ${WP.employees.slice(0,8).map((e,i) => {
                  const days = [9,8.5,9.5,8,9].map(h=>(h+Math.random()*2-1).toFixed(1));
                  const total = days.reduce((a,b)=>a+parseFloat(b),0).toFixed(1);
                  const ot = Math.max(0,(parseFloat(total)-40)).toFixed(1);
                  const perf=['🟢','🟢','🟡','🟢','🟢','🟡','🔴','🟢'][i];
                  return `
                    <tr>
                      <td><div class="emp-cell"><div class="emp-avatar" style="background:${e.color};width:30px;height:30px;font-size:11px">${e.initials}</div><span style="font-size:13px;font-weight:600">${e.name}</span></div></td>
                      ${days.map(d=>`<td style="font-size:12px;color:${parseFloat(d)>=9?'var(--success)':parseFloat(d)<7?'var(--danger)':'var(--gray-700)'}">${d}h</td>`).join('')}
                      <td style="font-weight:700">${total}h</td>
                      <td style="color:${parseFloat(ot)>0?'var(--accent)':'var(--gray-300)'};font-weight:600">${parseFloat(ot)>0?'+'+ot+'h':'—'}</td>
                      <td>${perf}</td>
                    </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Timeline + Late Comers -->
      <div>
        <div class="card" style="margin-bottom:20px">
          <div class="card-header">
            <div class="card-title">Today's Activity Log</div>
            <span class="badge badge-green badge-dot">Live</span>
          </div>
          <div class="card-body" style="padding-top:16px">
            <div class="tracking-timeline">
              ${[
                {t:'09:02 AM',title:'Arjun Kumar checked in',meta:'Office · Mumbai',type:'success'},
                {t:'09:28 AM',title:'Priya Sharma checked in (late)',meta:'Remote · Pune',type:'warning'},
                {t:'09:45 AM',title:'Payroll task updated',meta:'Progress: 65%',type:''},
                {t:'10:00 AM',title:'Team standup started',meta:'8 participants',type:''},
                {t:'11:30 AM',title:'Sneha Patel on field visit',meta:'Client site · Bengaluru',type:''},
                {t:'12:00 PM',title:'Rahul Mehta lunch break',meta:'Field employee',type:''},
                {t:'01:15 PM',title:'Leave approved: Kiran Reddy',meta:'Sick Leave · 1 day',type:'warning'},
                {t:'02:30 PM',title:'Task completed: Update Org Chart',meta:'Pooja Iyer',type:'success'},
              ].map(e=>`
                <div class="timeline-event">
                  <div class="timeline-dot ${e.type}"></div>
                  <div class="timeline-content">
                    <div class="timeline-time">${e.t}</div>
                    <div class="timeline-title">${e.title}</div>
                    <div class="timeline-meta">${e.meta}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Overtime Alerts -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Overtime Alerts</div>
            <span class="badge badge-orange">3 employees</span>
          </div>
          <div class="card-body" style="padding:0">
            ${[
              {name:'Priya Sharma',initials:'PS',dept:'Engineering',ot:'6.5h',color:'#7C3AED'},
              {name:'Kiran Reddy',initials:'KR',dept:'Engineering',ot:'4.2h',color:'#0891B2'},
              {name:'Deepak Kumar',initials:'DK',dept:'Engineering',ot:'3.8h',color:'#2563EB'}
            ].map(e=>`
              <div style="display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--gray-50)">
                <div class="emp-avatar" style="background:${e.color};flex-shrink:0">${e.initials}</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600">${e.name}</div>
                  <div style="font-size:11px;color:var(--gray-400)">${e.dept}</div>
                </div>
                <span style="font-size:14px;font-weight:700;color:var(--accent)">+${e.ot} OT</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  setTimeout(() => initProductivityChart(), 100);
}

function initProductivityChart() {
  const ctx = document.getElementById('productivityChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Engineering', data: [88,85,90,91], borderColor: '#2563EB', backgroundColor: 'rgba(37,99,235,0.05)', borderWidth: 2, tension: 0.4, pointRadius: 4, fill: true },
        { label: 'Sales', data: [78,80,75,82], borderColor: '#F97316', backgroundColor: 'rgba(249,115,22,0.05)', borderWidth: 2, tension: 0.4, pointRadius: 4, fill: true },
        { label: 'Operations', data: [82,84,86,85], borderColor: '#059669', backgroundColor: 'rgba(5,150,105,0.05)', borderWidth: 2, tension: 0.4, pointRadius: 4, fill: true },
        { label: 'HR', data: [91,88,92,93], borderColor: '#9333EA', backgroundColor: 'rgba(147,51,234,0.05)', borderWidth: 2, tension: 0.4, pointRadius: 4, fill: true }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'top', labels: { font: { family: 'Inter', size: 11 }, usePointStyle: true } } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } },
        y: { min: 60, max: 100, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { family: 'Inter', size: 11 }, callback: v => v + '%' } }
      }
    }
  });
}
