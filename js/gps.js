/* ===== WorkPilot HR — GPS & Selfie Attendance Module ===== */

function renderGPS(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>GPS & Selfie Attendance</h1>
        <p>Real-time employee location tracking and geo-fencing</p>
      </div>
      <div class="page-header-right">
        <span class="badge badge-green badge-dot" style="font-size:12px;padding:6px 12px">
          ${WP.gpsEmployees.length} employees tracked live
        </span>
        <button class="btn btn-primary" onclick="showToast('Opening geo-fence setup…','success')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Setup Geo-fence
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-4" style="margin-bottom:24px">
      ${[
        {label:'Live Tracking', val:WP.gpsEmployees.length, color:'var(--success)', icon:'📍', desc:'Employees being tracked'},
        {label:'At Office', val:'3', color:'var(--primary)', icon:'🏢', desc:'Within geo-fence radius'},
        {label:'Field Employees', val:'2', color:'var(--accent)', icon:'🚶', desc:'Outside office radius'},
        {label:'Geo-fence Alerts', val:'1', color:'var(--warning)', icon:'🔔', desc:'Boundary violations today'}
      ].map(s=>`
        <div class="stat-card">
          <div style="font-size:28px;width:48px;height:48px;display:flex;align-items:center;justify-content:center">${s.icon}</div>
          <div class="stat-body">
            <div class="stat-label">${s.label}</div>
            <div class="stat-value" style="color:${s.color}">${s.val}</div>
            <div style="font-size:11px;color:var(--gray-400);margin-top:3px">${s.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="grid" style="grid-template-columns:1fr 320px;gap:20px">
      <!-- Map View -->
      <div>
        <div class="card">
          <div class="card-header">
            <div class="card-title">Live Employee Map</div>
            <div style="display:flex;gap:8px;align-items:center">
              <span style="font-size:12px;color:var(--gray-500)">Last updated: Just now</span>
              <button class="btn btn-outline btn-sm" onclick="showToast('Map refreshed','success')">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                Refresh
              </button>
            </div>
          </div>
          <div class="card-body" style="padding:0">
            <div class="map-container">
              <!-- Map grid background -->
              <div class="map-grid"></div>
              <!-- India map SVG placeholder with cities -->
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0.15">
                <svg width="400" height="340" viewBox="0 0 400 340" fill="none">
                  <ellipse cx="200" cy="170" rx="160" ry="150" stroke="#2563EB" stroke-width="2" fill="none"/>
                  <text x="200" y="100" text-anchor="middle" font-size="14" fill="#2563EB">INDIA</text>
                </svg>
              </div>
              <!-- City labels -->
              <div style="position:absolute;font-size:10px;color:var(--gray-400);font-weight:600;top:${36}%;left:${48}%">MUMBAI</div>
              <div style="position:absolute;font-size:10px;color:var(--gray-400);font-weight:600;top:${55}%;left:${35}%">DELHI</div>
              <div style="position:absolute;font-size:10px;color:var(--gray-400);font-weight:600;top:${68}%;left:${62}%">BENGALURU</div>
              <div style="position:absolute;font-size:10px;color:var(--gray-400);font-weight:600;top:${70}%;left:${48}%">CHENNAI</div>
              <div style="position:absolute;font-size:10px;color:var(--gray-400);font-weight:600;top:${56}%;left:${60}%">HYDERABAD</div>
              <!-- Map pins for employees -->
              ${WP.gpsEmployees.map((e,i) => `
                <div class="map-pin" style="left:${e.lng}%;top:${e.lat}%" onclick="focusEmployee('${e.id}')">
                  <div style="position:relative">
                    <div class="map-pulse" style="width:40px;height:40px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:${e.color}20;border-radius:50%;animation:pulse 2.${i}s infinite"></div>
                    <div style="width:36px;height:36px;border-radius:50%;background:${e.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;border:2px solid white;box-shadow:0 2px 8px ${e.color}66;cursor:pointer;position:relative;z-index:1">${e.initials}</div>
                    <div style="position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:8px;height:8px;background:${e.color};border-radius:50% 50% 0 50%;transform:translateX(-50%) rotate(-45deg)"></div>
                  </div>
                </div>
              `).join('')}
              <!-- Office geo-fence circle -->
              <div style="position:absolute;left:${46}%;top:${33}%;width:80px;height:80px;border-radius:50%;border:2px dashed var(--primary);background:rgba(37,99,235,0.05);transform:translate(-50%,-50%)">
                <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:9px;font-weight:700;color:var(--primary);white-space:nowrap">OFFICE ZONE</div>
              </div>
              <!-- Map Controls -->
              <div class="map-controls">
                <div class="map-control-btn" onclick="showToast('Zoom in')">+</div>
                <div class="map-control-btn" onclick="showToast('Zoom out')">−</div>
                <div class="map-control-btn" title="My Location" onclick="showToast('Locating…')">◎</div>
              </div>
              <!-- Legend -->
              <div style="position:absolute;bottom:12px;left:12px;background:white;border-radius:8px;padding:8px 12px;box-shadow:var(--shadow);display:flex;gap:12px;font-size:11px;color:var(--gray-600)">
                <div style="display:flex;align-items:center;gap:5px"><div style="width:10px;height:10px;background:var(--success);border-radius:50%"></div>Checked In</div>
                <div style="display:flex;align-items:center;gap:5px"><div style="width:10px;height:10px;background:var(--accent);border-radius:50%"></div>Field</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div style="display:flex;flex-direction:column;gap:16px">
        <!-- Live Trackers -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Live Employees</div>
            <span class="badge badge-green badge-dot">Live</span>
          </div>
          <div class="card-body" style="padding:12px">
            ${WP.gpsEmployees.map(e => `
              <div class="live-tracker-item" id="track-${e.id}">
                <div class="live-dot"></div>
                <div class="emp-avatar" style="background:${e.color};width:32px;height:32px;font-size:11px;flex-shrink:0">${e.initials}</div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:13px;font-weight:600;color:var(--gray-800)">${e.name}</div>
                  <div style="font-size:11px;color:var(--gray-500);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                    <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${e.location}
                  </div>
                </div>
                <div style="text-align:right">
                  <div style="font-size:11px;font-weight:600;color:${e.status==='field'?'var(--accent)':'var(--success)'}">${e.status==='field'?'Field':'Office'}</div>
                  <div style="font-size:10px;color:var(--gray-400)">${e.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Selfie Attendance -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Selfie Attendance</div>
            <span class="badge badge-blue">Today</span>
          </div>
          <div class="card-body">
            <div style="text-align:center;margin-bottom:14px">
              <div style="width:80px;height:80px;background:var(--gray-100);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-size:32px">📸</div>
              <p style="font-size:13px;color:var(--gray-600)">Take a selfie to mark attendance. Face verification powered by AI.</p>
              <button class="btn btn-primary" style="margin-top:10px;width:100%" onclick="triggerSelfie()">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                Take Selfie
              </button>
            </div>
            <div style="font-size:12px;font-weight:600;color:var(--gray-500);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Recent Selfie Check-ins</div>
            ${WP.gpsEmployees.slice(0,3).map(e=>`
              <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--gray-50)">
                <div class="emp-avatar" style="background:${e.color};width:28px;height:28px;font-size:10px">${e.initials}</div>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600">${e.name}</div>
                  <div style="font-size:10px;color:var(--gray-400)">${e.time}</div>
                </div>
                <span style="font-size:16px" title="Verified">✅</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Geo-fence Settings -->
        <div class="card">
          <div class="card-header"><div class="card-title">Geo-fence Zones</div></div>
          <div class="card-body" style="padding:0">
            ${[
              {name:'HQ Mumbai', radius:'500m', active:true},
              {name:'Delhi Branch', radius:'300m', active:true},
              {name:'Bengaluru Office', radius:'400m', active:false}
            ].map(z=>`
              <div style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--gray-50)">
                <svg width="14" height="14" fill="none" stroke="var(--primary)" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600">${z.name}</div>
                  <div style="font-size:11px;color:var(--gray-400)">Radius: ${z.radius}</div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${z.active?'checked':''} onchange="showToast('Geo-fence ${z.name} ${z.active?'disabled':'enabled'}','success')"/>
                  <span class="toggle-slider"></span>
                </label>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function focusEmployee(id) {
  const emp = WP.gpsEmployees.find(e=>e.id===id);
  if (emp) showToast(`Focusing on ${emp.name} · ${emp.location}`, 'success');
}

function triggerSelfie() {
  showToast('Camera access required. Opening selfie capture…', 'warning');
  setTimeout(() => showToast('Selfie captured and verified ✓', 'success'), 1500);
}
