/* ===== WorkPilot HR — HR Calendar Module ===== */

function renderHRCalendar(container) {
  const today = new Date();
  const year  = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  const events = [
    { date: 13, type: 'today',   label: 'Today' },
    { date: 14, type: 'leave',   label: 'Priya – CL' },
    { date: 15, type: 'leave',   label: 'Priya – CL' },
    { date: 16, type: 'leave',   label: 'Deepak – CL' },
    { date: 17, type: 'holiday', label: 'Company Outing' },
    { date: 20, type: 'leave',   label: 'Neha – EL' },
    { date: 21, type: 'leave',   label: 'Neha – EL' },
    { date: 22, type: 'event',   label: 'Payroll Due' },
    { date: 23, type: 'event',   label: 'Board Meeting' },
    { date: 25, type: 'holiday', label: 'Public Holiday' },
    { date: 30, type: 'event',   label: 'Salary Day' }
  ];

  const upcomingEvents = [
    { date: 'Jun 14–16', icon: '🌿', title: 'Priya Sharma – Casual Leave', type: 'leave' },
    { date: 'Jun 16',    icon: '📅', title: 'Deepak Kumar – Casual Leave', type: 'leave' },
    { date: 'Jun 17',    icon: '🎉', title: 'Company Outing – All Staff', type: 'holiday' },
    { date: 'Jun 20–27', icon: '✈️', title: 'Neha Gupta – Earned Leave', type: 'leave' },
    { date: 'Jun 22',    icon: '💰', title: 'Payroll Processing Deadline', type: 'event' },
    { date: 'Jun 23',    icon: '🏢', title: 'Board Meeting – Q2 Review', type: 'event' },
    { date: 'Jun 25',    icon: '🎊', title: 'Public Holiday – Observed', type: 'holiday' },
    { date: 'Jun 30',    icon: '💳', title: 'Salary Disbursement Day', type: 'event' }
  ];

  const monthName = today.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  const firstDay  = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const eventMap = {};
  events.forEach(e => { if (!eventMap[e.date]) eventMap[e.date] = []; eventMap[e.date].push(e); });

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>HR Calendar</h1>
        <p>Leaves, holidays, events and important dates</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Syncing to Google Calendar…','success')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
          Sync Calendar
        </button>
        <button class="btn btn-primary" onclick="openModal('add-event-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Event
        </button>
      </div>
    </div>

    <!-- Legend -->
    <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:20px">
      ${[
        {c:'var(--primary-light)',border:'var(--primary)',t:'var(--primary)',l:'Leave'},
        {c:'var(--success-light)', border:'var(--success)',t:'var(--success)', l:'Holiday'},
        {c:'var(--warning-light)', border:'var(--warning)',t:'var(--warning)', l:'Event'},
        {c:'var(--primary)',       border:'var(--primary)',t:'white',          l:'Today'}
      ].map(x=>`
        <div style="display:flex;align-items:center;gap:7px;font-size:12px;color:var(--gray-600)">
          <div style="width:14px;height:14px;border-radius:3px;background:${x.c};border:1.5px solid ${x.border}"></div>
          ${x.l}
        </div>
      `).join('')}
    </div>

    <div class="grid" style="grid-template-columns:1fr 320px;gap:20px">
      <!-- Calendar Grid -->
      <div class="card">
        <div class="card-header">
          <div style="display:flex;align-items:center;gap:12px">
            <button class="btn btn-secondary btn-sm" onclick="showToast('Previous month')">← May</button>
            <span style="font-size:15px;font-weight:700;color:var(--gray-800)">${monthName}</span>
            <button class="btn btn-secondary btn-sm" onclick="showToast('Next month')">Jul →</button>
          </div>
          <div class="tab-bar">
            <div class="tab-btn active" onclick="switchCalView(this,'month')">Month</div>
            <div class="tab-btn" onclick="switchCalView(this,'week')">Week</div>
          </div>
        </div>
        <div class="card-body">
          <!-- Day headers -->
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:4px">
            ${dayNames.map(d => `
              <div style="text-align:center;font-size:11px;font-weight:700;color:var(--gray-500);
                          text-transform:uppercase;letter-spacing:0.05em;padding:6px 0">${d}</div>
            `).join('')}
          </div>
          <!-- Day cells -->
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
            ${Array(firstDay).fill(0).map(()=>'<div style="min-height:80px"></div>').join('')}
            ${Array.from({length:daysInMonth}, (_,i) => {
              const d = i + 1;
              const dayOfWeek = (firstDay + i) % 7;
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
              const isToday = d === 13;
              const dayEvents = eventMap[d] || [];
              return `
                <div onclick="calDayClick(${d})" style="
                  min-height:80px;
                  border-radius:8px;
                  padding:6px;
                  background:${isToday ? 'var(--primary)' : isWeekend ? 'var(--gray-50)' : 'white'};
                  border:1px solid ${isToday ? 'var(--primary)' : 'var(--gray-100)'};
                  cursor:pointer;
                  transition:var(--transition);
                " onmouseover="if(!${isToday})this.style.background='var(--gray-50)'"
                   onmouseout="if(!${isToday})this.style.background='${isWeekend?'var(--gray-50)':'white'}'">
                  <div style="
                    font-size:12px;font-weight:${isToday?'800':'500'};
                    color:${isToday ? 'white' : isWeekend ? 'var(--gray-300)' : 'var(--gray-700)'};
                    margin-bottom:3px
                  ">${d}</div>
                  ${dayEvents.slice(0,2).map(ev => {
                    const bg = ev.type==='leave' ? 'var(--primary-light)' : ev.type==='holiday' ? 'var(--success-light)' : 'var(--warning-light)';
                    const col = ev.type==='leave' ? 'var(--primary)' : ev.type==='holiday' ? 'var(--success)' : '#D97706';
                    return `<div style="
                      background:${isToday?'rgba(255,255,255,0.2)':bg};
                      color:${isToday?'white':col};
                      font-size:10px;font-weight:600;
                      padding:2px 5px;border-radius:4px;
                      white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
                      margin-bottom:2px
                    ">${ev.label}</div>`;
                  }).join('')}
                  ${dayEvents.length > 2 ? `<div style="font-size:9px;color:var(--gray-400)">+${dayEvents.length-2} more</div>` : ''}
                </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Right Panel: Upcoming + Summary -->
      <div style="display:flex;flex-direction:column;gap:16px">

        <!-- Quick Stats -->
        <div class="card">
          <div class="card-header"><div class="card-title">This Month</div></div>
          <div class="card-body" style="padding:12px">
            ${[
              {icon:'🌿', label:'Leave Days', val:18, color:'var(--primary)'},
              {icon:'🎊', label:'Holidays', val:2, color:'var(--success)'},
              {icon:'📋', label:'Events', val:4, color:'var(--warning)'},
              {icon:'🎂', label:'Birthdays', val:3, color:'#EC4899'}
            ].map(s=>`
              <div style="display:flex;align-items:center;gap:10px;padding:8px 8px;border-radius:8px;margin-bottom:4px">
                <span style="font-size:20px">${s.icon}</span>
                <span style="font-size:13px;color:var(--gray-600);flex:1">${s.label}</span>
                <span style="font-size:16px;font-weight:800;color:${s.color}">${s.val}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="card" style="flex:1">
          <div class="card-header"><div class="card-title">Upcoming Events</div></div>
          <div class="card-body" style="padding:0;max-height:420px;overflow-y:auto">
            ${upcomingEvents.map(e => {
              const bg = e.type==='leave' ? 'var(--primary-light)' : e.type==='holiday' ? 'var(--success-light)' : 'var(--warning-light)';
              const border = e.type==='leave' ? 'var(--primary)' : e.type==='holiday' ? 'var(--success)' : 'var(--warning)';
              return `
                <div style="display:flex;gap:12px;padding:12px 16px;border-bottom:1px solid var(--gray-50);
                            border-left:3px solid ${border};cursor:pointer;transition:var(--transition)"
                     onmouseover="this.style.background='var(--gray-50)'"
                     onmouseout="this.style.background='white'">
                  <span style="font-size:20px;flex-shrink:0">${e.icon}</span>
                  <div>
                    <div style="font-size:12px;font-weight:600;color:var(--gray-800)">${e.title}</div>
                    <div style="font-size:11px;color:var(--gray-400);margin-top:2px">${e.date}</div>
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Birthdays this month -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">🎂 Birthdays</div>
            <span class="badge badge-purple">3 this month</span>
          </div>
          <div class="card-body" style="padding:0">
            ${[
              {name:'Sneha Patel', initials:'SP', date:'Jun 18', color:'#F97316'},
              {name:'Kiran Reddy', initials:'KR', date:'Jun 22', color:'#0891B2'},
              {name:'Deepak Kumar', initials:'DK', date:'Jun 29', color:'#2563EB'}
            ].map(b=>`
              <div style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--gray-50)">
                <div class="emp-avatar" style="background:${b.color};width:30px;height:30px;font-size:11px">${b.initials}</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600">${b.name}</div>
                  <div style="font-size:11px;color:var(--gray-400)">${b.date}</div>
                </div>
                <button class="btn btn-outline btn-sm" onclick="showToast('Sending birthday wishes to ${b.name}! 🎉','success')" style="font-size:11px">Wish 🎉</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Add Event Modal -->
    <div class="modal-backdrop" id="add-event-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon blue">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div class="modal-header-text">
            <div class="modal-title">Add Calendar Event</div>
            <div class="modal-subtitle">Schedule a new HR event or holiday</div>
          </div>
          <button class="modal-close" onclick="closeModal('add-event-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Event Title *</label>
            <input type="text" class="form-control" placeholder="e.g. Company Townhall"/>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Event Type</label>
            <select class="form-control">
              <option>Company Event</option>
              <option>Public Holiday</option>
              <option>Training</option>
              <option>Payroll Deadline</option>
              <option>Compliance Due</option>
            </select>
          </div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Start Date *</label><input type="date" class="form-control"/></div>
            <div class="form-group"><label class="form-label">End Date</label><input type="date" class="form-control"/></div>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Applies To</label>
            <select class="form-control">
              <option>All Employees</option>
              ${WP.departments.map(d=>`<option>${d.name} Department</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-control" rows="2" placeholder="Optional details…"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('add-event-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('add-event-modal');showToast('Event added to HR calendar!','success')">Add Event</button>
        </div>
      </div>
    </div>
  `;
}

function calDayClick(day) {
  showToast(`Viewing events for June ${day}, 2025`);
}

function switchCalView(btn, view) {
  btn.closest('.tab-bar').querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if (view === 'week') showToast('Week view coming soon!', 'warning');
}
