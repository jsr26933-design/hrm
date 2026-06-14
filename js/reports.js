/* ===== WorkPilot HR — Reports & Analytics Module ===== */

function renderReports(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Reports & Analytics</h1>
        <p>Insights, trends, and data-driven workforce decisions</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Scheduling report…','success')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Schedule Report
        </button>
        <button class="btn btn-primary" onclick="showToast('Building custom report…','success')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Custom Report
        </button>
      </div>
    </div>

    <!-- Analytics Overview Charts -->
    <div class="grid grid-2" style="margin-bottom:24px">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Headcount Growth</div>
          <select class="form-control" style="width:120px;height:34px">
            <option>Last 6 Months</option><option>Last Year</option>
          </select>
        </div>
        <div class="card-body">
          <div class="chart-wrap" style="height:230px"><canvas id="headcountChart"></canvas></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">Leave Analysis</div>
          <select class="form-control" style="width:120px;height:34px">
            <option>Jun 2025</option><option>May 2025</option>
          </select>
        </div>
        <div class="card-body">
          <div class="chart-wrap" style="height:230px"><canvas id="leaveChart"></canvas></div>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-4" style="margin-bottom:24px">
      ${[
        {label:'Employee Turnover', val:'4.2%', sub:'↓ -0.8% YoY', color:'var(--success)', icon:'📉'},
        {label:'Avg. Tenure', val:'2.8 yrs', sub:'Across all depts', color:'var(--primary)', icon:'⏳'},
        {label:'Training Hours', val:'1,240h', sub:'This quarter', color:'var(--accent)', icon:'🎓'},
        {label:'Hiring TAT', val:'18 days', sub:'Avg time to hire', color:'var(--info)', icon:'🎯'}
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

    <!-- Report Templates Grid -->
    <div class="card" style="margin-bottom:24px">
      <div class="card-header">
        <div class="card-title">Report Templates</div>
        <div class="filter-search" style="max-width:240px">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search reports…" style="border:none;background:transparent;font-size:13px;outline:none;flex:1"/>
        </div>
      </div>
      <div class="card-body">
        <div class="grid grid-4">
          ${WP.reports.map(r => `
            <div class="report-card" onclick="runReport('${r.id}','${r.title}')">
              <div class="report-card-thumb" style="background:${r.color}">${r.icon}</div>
              <div class="report-card-body">
                <div class="report-card-title">${r.title}</div>
                <div class="report-card-desc">${r.desc}</div>
                <div class="report-card-footer">
                  <span class="badge badge-gray">${r.category}</span>
                  <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();runReport('${r.id}','${r.title}')">Run →</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Bottom Charts: Salary Distribution + Attendance Heatmap -->
    <div class="grid grid-2">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Salary Distribution by Dept</div>
        </div>
        <div class="card-body">
          <div class="chart-wrap" style="height:250px"><canvas id="salaryChart"></canvas></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">Monthly Attendance Heatmap</div>
        </div>
        <div class="card-body">
          <div id="heatmap-container">
            ${buildHeatmap()}
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:12px;font-size:11px;color:var(--gray-500)">
            <span>Less</span>
            ${[0.1,0.3,0.5,0.7,0.9,1].map(o=>`<div style="width:14px;height:14px;border-radius:3px;background:rgba(37,99,235,${o})"></div>`).join('')}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  `;
  setTimeout(() => initReportCharts(), 100);
}

function buildHeatmap() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const days = ['Mon','Tue','Wed','Thu','Fri'];
  let html = `<div style="display:grid;grid-template-columns:repeat(${months.length},1fr);gap:8px">`;
  months.forEach(m => {
    html += `<div style="text-align:center;font-size:11px;font-weight:600;color:var(--gray-500);margin-bottom:4px">${m}</div>`;
  });
  for (let d = 0; d < 5; d++) {
    months.forEach(m => {
      const intensity = (Math.random() * 0.6 + 0.4).toFixed(2);
      html += `<div style="height:20px;border-radius:3px;background:rgba(37,99,235,${intensity});cursor:pointer" title="${days[d]} ${m}: ${Math.round(intensity*100)}% attendance"></div>`;
    });
  }
  html += '</div>';
  return html;
}

function runReport(id, title) {
  showToast(`Generating: ${title}…`, 'success');
  setTimeout(() => showToast(`${title} ready! Opening download…`, 'success'), 2000);
}

function initReportCharts() {
  const hCtx = document.getElementById('headcountChart');
  if (hCtx) {
    new Chart(hCtx, {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [
          { label: 'New Hires', data: [8,5,12,7,6,9], backgroundColor: '#2563EB', borderRadius: 4 },
          { label: 'Attrition', data: [3,2,4,3,2,3], backgroundColor: '#EF4444', borderRadius: 4 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { font: { family: 'Inter', size: 11 }, usePointStyle: true } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { family: 'Inter', size: 11 } } }
        }
      }
    });
  }

  const lCtx = document.getElementById('leaveChart');
  if (lCtx) {
    new Chart(lCtx, {
      type: 'doughnut',
      data: {
        labels: ['Casual', 'Sick', 'Earned', 'Maternity', 'Other'],
        datasets: [{
          data: [35, 28, 22, 8, 7],
          backgroundColor: ['#2563EB','#10B981','#F97316','#9333EA','#94A3B8'],
          borderWidth: 2, borderColor: 'white'
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { font: { family: 'Inter', size: 11 }, usePointStyle: true } }
        },
        cutout: '60%'
      }
    });
  }

  const sCtx = document.getElementById('salaryChart');
  if (sCtx) {
    new Chart(sCtx, {
      type: 'bar',
      data: {
        labels: WP.departments.map(d => d.name),
        datasets: [
          { label: 'Avg Salary (₹K)', data: [95, 58, 72, 85, 52, 88, 45, 180], backgroundColor: WP.departments.map(d => d.color + 'CC'), borderColor: WP.departments.map(d => d.color), borderWidth: 1.5, borderRadius: 6 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { family: 'Inter', size: 11 }, callback: v => '₹'+v+'K' } },
          y: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } }
        }
      }
    });
  }
}
