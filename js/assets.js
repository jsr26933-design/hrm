/* ===== WorkPilot HR — Asset Management Module ===== */

function renderAssets(container) {
  const assets = [
    { id:'AST001', name:'Dell Laptop XPS 15', category:'Laptop', assignee:'Priya Sharma', initials:'PS', color:'#7C3AED', serial:'DL-XPS-2024-001', value:95000, status:'assigned', condition:'Good', date:'Jan 15, 2024' },
    { id:'AST002', name:'iPhone 14 Pro', category:'Mobile', assignee:'Rahul Mehta', initials:'RM', color:'#059669', serial:'APL-IP14-2023-042', value:80000, status:'assigned', condition:'Excellent', date:'Mar 10, 2023' },
    { id:'AST003', name:'MacBook Pro M3', category:'Laptop', assignee:'Neha Gupta', initials:'NG', color:'#EA580C', serial:'APL-MBP-2024-018', value:220000, status:'assigned', condition:'Excellent', date:'Feb 1, 2024' },
    { id:'AST004', name:'Office Chair – Ergonomic', category:'Furniture', assignee:'Arjun Kumar', initials:'AK', color:'#2563EB', serial:'FRN-CHR-2022-005', value:15000, status:'assigned', condition:'Good', date:'Aug 20, 2022' },
    { id:'AST005', name:'HP LaserJet Printer', category:'Printer', assignee:'Unassigned', initials:'', color:'#94A3B8', serial:'HP-LJ-2023-011', value:35000, status:'available', condition:'Good', date:'Jul 5, 2023' },
    { id:'AST006', name:'Samsung 32" Monitor', category:'Monitor', assignee:'Kiran Reddy', initials:'KR', color:'#0891B2', serial:'SAM-MN-2024-033', value:28000, status:'assigned', condition:'Excellent', date:'Apr 12, 2024' },
    { id:'AST007', name:'Lenovo ThinkPad', category:'Laptop', assignee:'Unassigned', initials:'', color:'#94A3B8', serial:'LN-TP-2022-019', value:72000, status:'maintenance', condition:'Under Repair', date:'Nov 8, 2022' },
    { id:'AST008', name:'Logitech MX Keys Keyboard', category:'Accessories', assignee:'Deepak Kumar', initials:'DK', color:'#2563EB', serial:'LGT-KB-2024-007', value:8500, status:'assigned', condition:'Excellent', date:'May 20, 2024' }
  ];

  const categories = ['All', 'Laptop', 'Mobile', 'Monitor', 'Printer', 'Furniture', 'Accessories'];

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Asset Management</h1>
        <p>${assets.length} assets tracked · ₹${(assets.reduce((a,b)=>a+b.value,0)/100000).toFixed(1)}L total value</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Exporting asset register…','success')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>
          Export
        </button>
        <button class="btn btn-primary" onclick="openModal('add-asset-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Asset
        </button>
      </div>
    </div>

    <!-- KPI Row -->
    <div class="grid grid-4" style="margin-bottom:24px">
      ${[
        {label:'Total Assets', val:assets.length, color:'var(--primary)', icon:'💻'},
        {label:'Assigned', val:assets.filter(a=>a.status==='assigned').length, color:'var(--success)', icon:'✅'},
        {label:'Available', val:assets.filter(a=>a.status==='available').length, color:'var(--warning)', icon:'📦'},
        {label:'In Maintenance', val:assets.filter(a=>a.status==='maintenance').length, color:'var(--danger)', icon:'🔧'}
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

    <!-- Category filter chips -->
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px" id="cat-filters">
      ${categories.map((c,i)=>`
        <button class="btn ${i===0?'btn-primary':'btn-secondary'} btn-sm" onclick="filterAssets('${c}',this)">${c}</button>
      `).join('')}
    </div>

    <!-- Asset Table -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">Asset Register</div>
        <div class="filter-search" style="max-width:260px">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search asset, serial…" style="border:none;background:transparent;font-size:13px;outline:none;flex:1" oninput="searchAssets(this.value)"/>
        </div>
      </div>
      <div class="table-container" id="asset-table">
        ${buildAssetTable(assets)}
      </div>
    </div>

    <!-- Summary Charts -->
    <div class="grid grid-2" style="margin-top:20px">
      <div class="card">
        <div class="card-header"><div class="card-title">Assets by Category</div></div>
        <div class="card-body"><div class="chart-wrap" style="height:220px"><canvas id="assetCatChart"></canvas></div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Asset Value Distribution (₹)</div></div>
        <div class="card-body"><div class="chart-wrap" style="height:220px"><canvas id="assetValChart"></canvas></div></div>
      </div>
    </div>

    <!-- Add Asset Modal -->
    <div class="modal-backdrop" id="add-asset-modal">
      <div class="modal modal-lg">
        <div class="modal-header">
          <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Add New Asset</div><div class="modal-subtitle">Register an asset in the system</div></div>
          <button class="modal-close" onclick="closeModal('add-asset-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Asset Name *</label><input type="text" class="form-control" placeholder="e.g. Dell Laptop XPS 15"/></div>
            <div class="form-group"><label class="form-label">Category *</label>
              <select class="form-control">${['Laptop','Mobile','Monitor','Printer','Furniture','Accessories','Vehicle','Other'].map(c=>`<option>${c}</option>`).join('')}</select>
            </div>
          </div>
          <div class="form-row cols-3" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Serial Number</label><input type="text" class="form-control" placeholder="SN-XXXX-XXXX"/></div>
            <div class="form-group"><label class="form-label">Purchase Value (₹)</label><input type="number" class="form-control" placeholder="0"/></div>
            <div class="form-group"><label class="form-label">Purchase Date</label><input type="date" class="form-control"/></div>
          </div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Assign To</label>
              <select class="form-control"><option value="">Unassigned</option>${WP.employees.map(e=>`<option>${e.name}</option>`).join('')}</select>
            </div>
            <div class="form-group"><label class="form-label">Condition</label>
              <select class="form-control"><option>Excellent</option><option>Good</option><option>Fair</option><option>Under Repair</option></select>
            </div>
          </div>
          <div class="form-group"><label class="form-label">Notes</label><textarea class="form-control" rows="2" placeholder="Additional details…"></textarea></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('add-asset-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('add-asset-modal');showToast('Asset added to register!','success')">Add Asset</button>
        </div>
      </div>
    </div>
  `;
  setTimeout(()=>initAssetCharts(assets), 100);
}

function buildAssetTable(assets) {
  if (!assets.length) return `<div class="empty-state" style="padding:40px"><div class="empty-state-icon">📦</div><h3>No assets found</h3><p>Try adjusting your filters</p></div>`;
  const statusStyle = s => s==='assigned'?'badge-green':s==='available'?'badge-blue':'badge-yellow';
  return `
    <table class="data-table">
      <thead><tr><th>Asset</th><th>Category</th><th>Serial No.</th><th>Assigned To</th><th>Value</th><th>Condition</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${assets.map(a=>`
          <tr>
            <td><div style="font-size:13px;font-weight:600;color:var(--gray-800)">${a.name}</div><div style="font-size:11px;color:var(--gray-400)">${a.id}</div></td>
            <td><span class="badge badge-gray">${a.category}</span></td>
            <td style="font-size:12px;font-family:monospace;color:var(--gray-600)">${a.serial}</td>
            <td>
              ${a.assignee !== 'Unassigned'
                ? `<div class="emp-cell"><div class="emp-avatar" style="background:${a.color};width:26px;height:26px;font-size:10px">${a.initials}</div><span style="font-size:13px">${a.assignee}</span></div>`
                : '<span style="color:var(--gray-400);font-size:12px">— Unassigned —</span>'}
            </td>
            <td style="font-weight:700">₹${a.value.toLocaleString()}</td>
            <td><span style="font-size:12px;color:var(--gray-600)">${a.condition}</span></td>
            <td><span class="badge ${statusStyle(a.status)} badge-dot">${a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span></td>
            <td>
              <div class="actions">
                <button class="btn-icon" title="Reassign" onclick="showToast('Reassigning ${a.name}…')"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg></button>
                <button class="btn-icon" title="Edit" onclick="showToast('Editing ${a.name}')"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}

function filterAssets(cat, btn) {
  document.querySelectorAll('#cat-filters .btn').forEach(b=>{
    b.classList.remove('btn-primary'); b.classList.add('btn-secondary');
  });
  btn.classList.remove('btn-secondary'); btn.classList.add('btn-primary');
  showToast(`Showing ${cat} assets`);
}

function searchAssets(q) {
  if (!q) return;
  showToast(`Searching for "${q}"…`);
}

function initAssetCharts(assets) {
  const cats = {};
  assets.forEach(a=>{ cats[a.category]=(cats[a.category]||0)+1; });
  const c = document.getElementById('assetCatChart');
  if (c && !c._done) {
    c._done = true;
    new Chart(c, {
      type:'pie',
      data:{
        labels:Object.keys(cats),
        datasets:[{ data:Object.values(cats),
          backgroundColor:['#2563EB','#7C3AED','#059669','#F97316','#0891B2','#9333EA','#EA580C'],
          borderWidth:2, borderColor:'white' }]
      },
      options:{ responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ position:'right', labels:{ font:{family:'Inter',size:11}, usePointStyle:true } } } }
    });
  }
  const catVals = {};
  assets.forEach(a=>{ catVals[a.category]=(catVals[a.category]||0)+a.value; });
  const v = document.getElementById('assetValChart');
  if (v && !v._done) {
    v._done = true;
    new Chart(v, {
      type:'bar',
      data:{
        labels:Object.keys(catVals),
        datasets:[{ label:'Value (₹)',
          data:Object.values(catVals),
          backgroundColor:['#2563EB','#7C3AED','#059669','#F97316','#0891B2','#9333EA','#EA580C'].map(c=>c+'CC'),
          borderRadius:6 }]
      },
      options:{ responsive:true, maintainAspectRatio:false,
        plugins:{legend:{display:false}},
        scales:{
          x:{grid:{display:false},ticks:{font:{family:'Inter',size:11}}},
          y:{grid:{color:'rgba(0,0,0,0.04)'},ticks:{font:{family:'Inter',size:11},callback:v=>'₹'+(v/1000)+'K'}}
        }
      }
    });
  }
}
