/* ===== WorkPilot HR — Onboarding Wizard ===== */

function renderOnboardingWizard(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Onboarding Wizard</h1>
        <p>Set up WorkPilot HR for your organization in a few steps</p>
      </div>
    </div>

    <!-- Stepper -->
    <div class="stepper" id="ob-stepper">
      ${['Company Setup','Departments','Pay Structure','Policies','Done'].map((s,i)=>`
        <div class="step ${i===0?'active':''}` + `" id="ob-step-${i}">
          <div class="step-circle">${i+1}</div>
          <div class="step-label">${s}</div>
        </div>
      `).join('')}
    </div>

    <!-- Step Content -->
    <div class="card">
      <div id="ob-content">
        ${obStep0()}
      </div>
      <div class="modal-footer" style="border-top:1px solid var(--gray-100);padding:20px 28px">
        <button class="btn btn-secondary" id="ob-back" onclick="obBack()" style="display:none">← Back</button>
        <div style="flex:1"></div>
        <button class="btn btn-primary" id="ob-next" onclick="obNext()">Continue →</button>
      </div>
    </div>
  `;
}

let obCurrentStep = 0;

function obStep0() {
  return `
    <div class="modal-body" style="padding:28px">
      <h2 style="font-size:18px;font-weight:700;margin-bottom:6px">Tell us about your company</h2>
      <p style="font-size:13px;color:var(--gray-500);margin-bottom:24px">Basic information to configure your workspace</p>
      <div class="form-row cols-2" style="margin-bottom:14px">
        <div class="form-group"><label class="form-label">Company Name *</label><input type="text" class="form-control" value="TechCorp India Pvt. Ltd."/></div>
        <div class="form-group"><label class="form-label">Industry *</label>
          <select class="form-control"><option>Technology</option><option>Manufacturing</option><option>Retail</option><option>Logistics</option><option>Services</option></select>
        </div>
      </div>
      <div class="form-row cols-3" style="margin-bottom:14px">
        <div class="form-group"><label class="form-label">Employee Count</label>
          <select class="form-control"><option>1-50</option><option>51-200</option><option selected>201-500</option><option>500+</option></select>
        </div>
        <div class="form-group"><label class="form-label">Country</label>
          <select class="form-control"><option>India</option><option>UAE</option><option>Singapore</option></select>
        </div>
        <div class="form-group"><label class="form-label">Currency</label>
          <select class="form-control"><option>INR (₹)</option><option>USD ($)</option></select>
        </div>
      </div>
      <div class="form-row cols-2">
        <div class="form-group"><label class="form-label">Financial Year Start</label>
          <select class="form-control"><option>April (Apr–Mar)</option><option>January (Jan–Dec)</option></select>
        </div>
        <div class="form-group"><label class="form-label">Weekly Off Days</label>
          <select class="form-control"><option>Saturday & Sunday</option><option>Sunday only</option></select>
        </div>
      </div>
    </div>`;
}

function obStep1() {
  return `
    <div class="modal-body" style="padding:28px">
      <h2 style="font-size:18px;font-weight:700;margin-bottom:6px">Add Departments</h2>
      <p style="font-size:13px;color:var(--gray-500);margin-bottom:24px">Configure your organizational structure</p>
      <div id="dept-list">
        ${['Engineering','HR','Finance','Sales','Operations','Marketing'].map((d,i)=>`
          <div style="display:flex;gap:10px;margin-bottom:10px;align-items:center" id="drow-${i}">
            <input type="text" class="form-control" value="${d}" style="flex:1"/>
            <select class="form-control" style="width:160px">
              ${WP.employees.map(e=>`<option>${e.name}</option>`).join('')}
            </select>
            <button class="btn btn-ghost btn-sm" style="color:var(--danger)" onclick="this.closest('[id^=drow]').remove()">✕</button>
          </div>
        `).join('')}
      </div>
      <button class="btn btn-outline btn-sm" onclick="addDeptRow()" style="margin-top:6px">+ Add Department</button>
    </div>`;
}

function obStep2() {
  return `
    <div class="modal-body" style="padding:28px">
      <h2 style="font-size:18px;font-weight:700;margin-bottom:6px">Configure Pay Structure</h2>
      <p style="font-size:13px;color:var(--gray-500);margin-bottom:24px">Set your default salary components</p>
      <div class="settings-group">
        <div class="settings-group-header">Earnings Components</div>
        ${[
          {name:'Basic Salary', pct:'40%', fixed:true},
          {name:'HRA', pct:'20%', fixed:false},
          {name:'Medical Allowance', pct:'5%', fixed:false},
          {name:'Conveyance Allowance', pct:'5%', fixed:false},
          {name:'Special Allowance', pct:'Balance', fixed:false}
        ].map(c=>`
          <div style="display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--gray-50)">
            <div style="flex:1;font-size:13px;font-weight:600">${c.name}</div>
            <input type="text" class="form-control" style="width:80px" value="${c.pct}" ${c.fixed?'readonly':''}/>
            <label class="toggle-switch"><input type="checkbox" checked/><span class="toggle-slider"></span></label>
          </div>
        `).join('')}
      </div>
      <div class="settings-group" style="margin-top:12px">
        <div class="settings-group-header">Statutory Deductions</div>
        ${[
          {name:'Provident Fund (PF)', val:'12% of Basic'},
          {name:'ESI', val:'0.75% (Employee)'},
          {name:'Professional Tax', val:'State-specific'},
          {name:'TDS', val:'As per IT slabs'}
        ].map(d=>`
          <div style="display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--gray-50)">
            <div style="flex:1;font-size:13px;font-weight:600">${d.name}</div>
            <span style="font-size:12px;color:var(--gray-500)">${d.val}</span>
            <label class="toggle-switch"><input type="checkbox" checked/><span class="toggle-slider"></span></label>
          </div>
        `).join('')}
      </div>
    </div>`;
}

function obStep3() {
  return `
    <div class="modal-body" style="padding:28px">
      <h2 style="font-size:18px;font-weight:700;margin-bottom:6px">HR Policies</h2>
      <p style="font-size:13px;color:var(--gray-500);margin-bottom:24px">Configure leave and attendance policies</p>
      <div class="grid grid-2" style="gap:16px">
        <div class="settings-group">
          <div class="settings-group-header">Leave Entitlements</div>
          ${[
            {name:'Casual Leave', days:10},
            {name:'Sick Leave', days:12},
            {name:'Earned Leave', days:24},
            {name:'Maternity Leave', days:90},
            {name:'Paternity Leave', days:15}
          ].map(l=>`
            <div style="display:flex;align-items:center;gap:10px;padding:10px 20px;border-bottom:1px solid var(--gray-50)">
              <span style="font-size:13px;flex:1">${l.name}</span>
              <input type="number" class="form-control" style="width:70px" value="${l.days}"/>
              <span style="font-size:12px;color:var(--gray-400)">days/yr</span>
            </div>
          `).join('')}
        </div>
        <div class="settings-group">
          <div class="settings-group-header">Attendance Rules</div>
          ${[
            {label:'Work Start Time', type:'time', val:'09:00'},
            {label:'Work End Time', type:'time', val:'18:00'},
            {label:'Late Buffer (mins)', type:'number', val:'15'},
            {label:'Min Hours/Day', type:'number', val:'8'},
            {label:'OT Threshold (hrs)', type:'number', val:'9'}
          ].map(r=>`
            <div style="display:flex;align-items:center;gap:10px;padding:10px 20px;border-bottom:1px solid var(--gray-50)">
              <span style="font-size:13px;flex:1">${r.label}</span>
              <input type="${r.type}" class="form-control" style="width:100px" value="${r.val}"/>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function obStep4() {
  return `
    <div class="modal-body" style="padding:40px;text-align:center">
      <div style="font-size:64px;margin-bottom:16px">🎉</div>
      <h2 style="font-size:24px;font-weight:800;color:var(--gray-900);margin-bottom:8px">You're all set!</h2>
      <p style="font-size:14px;color:var(--gray-500);max-width:420px;margin:0 auto 28px">
        WorkPilot HR has been configured for <strong>TechCorp India</strong>.
        Your workspace is ready for 248 employees.
      </p>
      <div class="grid grid-3" style="max-width:500px;margin:0 auto 28px;text-align:center">
        ${[
          {icon:'👥', val:'248', label:'Employees Ready'},
          {icon:'🏢', val:'8', label:'Departments Set'},
          {icon:'📋', val:'5', label:'Policies Configured'}
        ].map(s=>`
          <div style="padding:16px;background:var(--gray-50);border-radius:10px">
            <div style="font-size:28px">${s.icon}</div>
            <div style="font-size:22px;font-weight:800;color:var(--primary);margin:4px 0">${s.val}</div>
            <div style="font-size:11px;color:var(--gray-500)">${s.label}</div>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;justify-content:center;gap:10px">
        <button class="btn btn-primary btn-lg" onclick="navigate('dashboard');showToast('WorkPilot HR is ready!','success')">
          Go to Dashboard →
        </button>
        <button class="btn btn-secondary btn-lg" onclick="showToast('Sending invite emails…','success')">
          Invite Team Members
        </button>
      </div>
    </div>`;
}

function obNext() {
  obCurrentStep = Math.min(obCurrentStep + 1, 4);
  updateObView();
}

function obBack() {
  obCurrentStep = Math.max(obCurrentStep - 1, 0);
  updateObView();
}

function updateObView() {
  const steps = [obStep0, obStep1, obStep2, obStep3, obStep4];
  document.getElementById('ob-content').innerHTML = steps[obCurrentStep]();

  // Update stepper UI
  document.querySelectorAll('.step').forEach((el, i) => {
    el.classList.remove('active', 'done');
    if (i < obCurrentStep) el.classList.add('done');
    if (i === obCurrentStep) el.classList.add('active');
    const circle = el.querySelector('.step-circle');
    if (circle) circle.textContent = i < obCurrentStep ? '✓' : i + 1;
  });

  const back = document.getElementById('ob-back');
  const next = document.getElementById('ob-next');
  if (back) back.style.display = obCurrentStep > 0 ? 'flex' : 'none';
  if (next) {
    if (obCurrentStep === 4) {
      next.style.display = 'none';
    } else {
      next.style.display = 'flex';
      next.textContent = obCurrentStep === 3 ? 'Finish Setup ✓' : 'Continue →';
    }
  }
}

function addDeptRow() {
  const list = document.getElementById('dept-list');
  if (!list) return;
  const idx = Date.now();
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:10px;margin-bottom:10px;align-items:center';
  row.id = `drow-${idx}`;
  row.innerHTML = `
    <input type="text" class="form-control" placeholder="Department name" style="flex:1"/>
    <select class="form-control" style="width:160px">${WP.employees.map(e=>`<option>${e.name}</option>`).join('')}</select>
    <button class="btn btn-ghost btn-sm" style="color:var(--danger)" onclick="this.closest('[id^=drow]').remove()">✕</button>
  `;
  list.appendChild(row);
}
