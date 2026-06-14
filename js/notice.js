/* ===== WorkPilot HR — Notice Board Module ===== */

// Initialize global notices array on WP if not already present
if (!WP.notices) {
  WP.notices = [
    { 
      id: 'NT001', 
      title: 'Q2 Performance Appraisal Cycle Now Open', 
      body: 'The performance appraisal for April–June 2026 has been initiated. All employees must complete their self-assessment by June 25th, 2026. Your participation and detailed feedback are critical for our planning and development process. Please navigate to the Performance Appraisal section to fill out your form.', 
      category: 'Appraisal', 
      pinned: true, 
      date: 'Jun 13, 2026', 
      author: 'Arjun Kumar', 
      role: 'HR Manager', 
      icon: '🎯' 
    },
    { 
      id: 'NT002', 
      title: 'Annual Company Picnic — Lonavala Trip', 
      body: 'Get ready for our annual company outing at Lonavala on June 20th! Registration is mandatory and deadline is June 16. Transport, snacks, and lunch are arranged by the company. Buses will depart from the HQ parking lot at 7:30 AM sharp. Don\'t miss out on team bonding games and a fun-filled day!', 
      category: 'Event', 
      pinned: true, 
      date: 'Jun 12, 2026', 
      author: 'HR Team', 
      role: 'HR Department', 
      icon: '🎉' 
    },
    { 
      id: 'NT003', 
      title: 'Updated Leave & Remote Work Policy', 
      body: 'An updated leave policy will be effective starting July 1, 2026. Key updates include the provisioning of 2 hybrid remote work days per week and a streamlined approval workflow for sick leaves. The comprehensive document has been uploaded to the Self Service Portal under the Policies tab. Please review it carefully.', 
      category: 'Policy', 
      pinned: false, 
      date: 'Jun 10, 2026', 
      author: 'Arjun Kumar', 
      role: 'HR Manager', 
      icon: '📋' 
    },
    { 
      id: 'NT004', 
      title: 'Salary Disbursement Schedule for June 2026', 
      body: 'Please note that the June 2026 salaries will be disbursed and credited to your registered bank accounts on Tuesday, June 30th, 2026. We advise all employees to verify and update their bank details (IFSC, Account Number) in the Self Service Portal by June 20th to prevent any processing delays.', 
      category: 'Payroll', 
      pinned: false, 
      date: 'Jun 09, 2026', 
      author: 'Finance Team', 
      role: 'Finance', 
      icon: '💰' 
    },
    { 
      id: 'NT005', 
      title: 'Mandatory POSH & Compliance Training', 
      body: 'As part of our commitment to maintaining a safe, inclusive, and professional workplace, all employees must complete the annual POSH and cyber-security compliance training. The deadline for completion is June 28, 2026. The training portal can be accessed directly through the link provided in your corporate email.', 
      category: 'Compliance', 
      pinned: false, 
      date: 'Jun 07, 2026', 
      author: 'HR Team', 
      role: 'Compliance Office', 
      icon: '🎓' 
    }
  ];
}

// Keep track of current filter state
let noticeSearchQuery = '';
let noticeActiveCategory = 'All';
let noticeSortOrder = 'newest';

function renderNotice(container) {
  // Inject component-specific styles once (if not already done)
  if (!document.getElementById('notice-board-styles')) {
    const style = document.createElement('style');
    style.id = 'notice-board-styles';
    style.innerHTML = `
      .notice-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      .notice-card {
        background: #fff;
        border-radius: var(--border-radius, 12px);
        border: 1px solid var(--gray-200, #E2E8F0);
        box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
        transition: var(--transition, all 0.2s ease);
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .notice-card.pinned {
        border-left: 4px solid var(--accent, #F59E0B);
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.08);
      }
      .notice-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1));
        border-color: var(--gray-300, #CBD5E1);
      }
      .notice-category-badge {
        font-size: 11px;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 9999px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .badge-appraisal { background-color: var(--primary-light, #E6F4F0); color: var(--primary, #024B37); }
      .badge-event { background-color: var(--accent-light, #FEF3C7); color: var(--accent, #F59E0B); }
      .badge-policy { background-color: #ECFDF5; color: #10B981; }
      .badge-payroll { background-color: #ECFEFF; color: #06B6D4; }
      .badge-compliance { background-color: #FEF2F2; color: #EF4444; }
      .badge-general { background-color: var(--gray-100, #F1F5F9); color: var(--gray-600, #475569); }

      .notice-pills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 8px;
      }
      .notice-filter-pill {
        padding: 8px 16px;
        border-radius: 9999px;
        font-size: 13px;
        font-weight: 600;
        background: #fff;
        border: 1.5px solid var(--gray-200, #E2E8F0);
        color: var(--gray-600, #475569);
        cursor: pointer;
        transition: var(--transition, all 0.2s ease);
      }
      .notice-filter-pill:hover {
        background: var(--gray-50, #F8FAFC);
        color: var(--gray-800, #1E293B);
      }
      .notice-filter-pill.active {
        background: var(--primary, #024B37);
        color: #fff;
        border-color: var(--primary, #024B37);
        box-shadow: 0 2px 6px rgba(2, 75, 55, 0.2);
      }
      .pinned-badge-card {
        position: absolute;
        top: 16px;
        right: 16px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: var(--accent-light, #FEF3C7);
        color: var(--accent, #F59E0B);
        font-size: 10px;
        font-weight: 800;
        padding: 3px 8px;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .notice-card-header {
        padding: 20px 20px 10px;
      }
      .notice-card-body {
        padding: 0 20px 16px;
        flex: 1;
      }
      .notice-card-footer {
        padding: 14px 20px;
        border-top: 1px solid var(--gray-100, #F1F5F9);
        background: var(--gray-50, #F8FAFC);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .author-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }
      
      .empty-state {
        text-align: center;
        padding: 40px 20px;
        border: 2px dashed var(--gray-200, #E2E8F0);
        border-radius: var(--border-radius, 12px);
        background: #fff;
        color: var(--gray-400, #94A3B8);
        margin-top: 20px;
      }
      .empty-state-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      .empty-state-title {
        font-size: 16px;
        font-weight: 700;
        color: var(--gray-700, #334155);
        margin-bottom: 8px;
      }
      .empty-state-desc {
        font-size: 13px;
        max-width: 400px;
        margin: 0 auto;
      }
    `;
    document.head.appendChild(style);
  }

  // Generate layouts
  container.innerHTML = `
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-left">
        <h1>Notice Board</h1>
        <p>Official company announcements, policy updates, and team communications</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="openModal('new-notice-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Post Notice
        </button>
      </div>
    </div>

    <!-- KPI Summary Row -->
    <div class="grid grid-4" style="margin-bottom:24px" id="notice-kpi-row">
      <!-- Will be updated dynamically by updateNoticeKPIs() -->
    </div>

    <!-- Filters & Search Controls -->
    <div style="background: #fff; padding: 20px; border-radius: var(--border-radius, 12px); border: 1px solid var(--gray-200, #E2E8F0); margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
        <!-- Categories pills -->
        <div class="notice-pills-container" id="category-pills">
          <!-- Rendered dynamically -->
        </div>

        <!-- Sort Control -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 13px; font-weight: 600; color: var(--gray-500, #64748B);">Sort By:</span>
          <select class="filter-select" id="notice-sort-select" onchange="changeNoticeSort(this.value)" style="padding: 6px 12px; font-size: 13px; border-radius: var(--border-radius-sm, 8px); border: 1px solid var(--gray-200, #E2E8F0); background: #fff; font-weight: 600; outline: none; color: var(--gray-700, #334155);">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
            <option value="pinned">Pinned First</option>
          </select>
        </div>
      </div>

      <div class="filter-bar" style="margin-bottom:0px; display: flex; width: 100%; border: 1px solid var(--gray-200, #E2E8F0); border-radius: var(--border-radius-sm, 8px); overflow: hidden; background: var(--gray-50, #F8FAFC); padding: 4px 12px; align-items: center;">
        <div class="filter-search" style="display:flex; align-items:center; gap:8px; flex:1">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color: var(--gray-400, #94A3B8);">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="notice-search-input" placeholder="Search notices by title, content or category..." style="border:none; background:transparent; font-size:13px; outline:none; width: 100%; padding: 8px 0; color: var(--gray-800, #1E293B);" onkeyup="handleNoticeSearch(this.value)" />
        </div>
        <button onclick="clearNoticeFilters()" style="font-size: 12px; color: var(--primary, #024B37); font-weight: 600; cursor: pointer; display: none;" id="clear-search-btn">
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Notices Grid -->
    <div class="notice-grid" id="notices-grid">
      <!-- Notice cards populated here -->
    </div>

    <!-- View Notice Detail Modal -->
    <div class="modal-backdrop" id="notice-detail-modal">
      <div class="modal modal-lg">
        <div class="modal-header" style="border-bottom: 1px solid var(--gray-100, #F1F5F9);">
          <div class="modal-icon" style="background-color: var(--primary-light, #E6F4F0); color: var(--primary, #024B37);" id="detail-modal-icon">🎯</div>
          <div class="modal-header-text">
            <div class="modal-title" id="detail-modal-title">Notice Title</div>
            <div class="modal-subtitle" id="detail-modal-subtitle">Posted by Arjun Kumar on Jun 13, 2026</div>
          </div>
          <button class="modal-close" onclick="closeModal('notice-detail-modal')">✕</button>
        </div>
        <div class="modal-body" style="padding: 24px;">
          <div style="display: flex; gap: 8px; margin-bottom: 16px;" id="detail-modal-tags">
            <!-- Badges like Category, Pinned -->
          </div>
          <div style="font-size: 14px; color: var(--gray-700, #334155); line-height: 1.7; white-space: pre-line; background: var(--gray-50, #F8FAFC); padding: 20px; border-radius: var(--border-radius, 12px); border: 1px solid var(--gray-200, #E2E8F0);" id="detail-modal-body">
            Notice Body Content
          </div>
          <div style="margin-top: 20px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--gray-100, #F1F5F9); padding-top: 16px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="author-avatar" id="detail-modal-author-avatar" style="background-color: var(--primary, #024B37);">AK</div>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--gray-800, #1E293B);" id="detail-modal-author-name">Arjun Kumar</div>
                <div style="font-size: 11px; color: var(--gray-500, #64748B);" id="detail-modal-author-role">HR Manager</div>
              </div>
            </div>
            <div style="font-size: 12px; color: var(--gray-400, #94A3B8);" id="detail-modal-date">
              Posted: Jun 13, 2026
            </div>
          </div>
        </div>
        <div class="modal-footer" style="background: var(--gray-50, #F8FAFC); display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" onclick="shareNoticeFromModal()" style="font-size: 12px;">
              📢 Share Notice
            </button>
            <button class="btn btn-secondary" onclick="printNoticeFromModal()" style="font-size: 12px;">
              🖨️ Print
            </button>
          </div>
          <div style="display: flex; gap: 8px;" id="detail-admin-actions">
            <!-- Admin features: Toggle Pin / Delete Notice -->
          </div>
        </div>
      </div>
    </div>

    <!-- New Notice Post Modal -->
    <div class="modal-backdrop" id="new-notice-modal">
      <div class="modal modal-lg">
        <div class="modal-header">
          <div class="modal-icon" style="background-color: var(--accent-light, #FEF3C7); color: var(--accent, #F59E0B);">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </div>
          <div class="modal-header-text">
            <div class="modal-title">Post New Notice</div>
            <div class="modal-subtitle">Publish a new announcement to the company notice board</div>
          </div>
          <button class="modal-close" onclick="closeModal('new-notice-modal')">✕</button>
        </div>
        <div class="modal-body" style="padding: 24px;">
          <form id="new-notice-form" onsubmit="submitNoticeForm(event)">
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" style="font-weight: 600; margin-bottom: 6px; display: block; color: var(--gray-700, #334155);">Title *</label>
              <input type="text" class="form-control" id="notice-form-title" placeholder="Enter notice title..." required style="width: 100%; padding: 10px; border-radius: var(--border-radius-sm, 8px); border: 1.5px solid var(--gray-200, #E2E8F0); font-size: 13px;" />
            </div>

            <div class="form-row cols-2" style="margin-bottom: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" style="font-weight: 600; margin-bottom: 6px; display: block; color: var(--gray-700, #334155);">Category *</label>
                <select class="form-control" id="notice-form-category" required style="width: 100%; padding: 10px; border-radius: var(--border-radius-sm, 8px); border: 1.5px solid var(--gray-200, #E2E8F0); font-size: 13px; background: #fff;">
                  <option value="Appraisal">🎯 Appraisal</option>
                  <option value="Event">🎉 Event / Holiday</option>
                  <option value="Policy">📋 Policy Update</option>
                  <option value="Payroll">💰 Payroll & Finance</option>
                  <option value="Compliance">🎓 Compliance & Safety</option>
                  <option value="General" selected>📢 General Announcement</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight: 600; margin-bottom: 6px; display: block; color: var(--gray-700, #334155);">Pin Notice</label>
                <select class="form-control" id="notice-form-pinned" style="width: 100%; padding: 10px; border-radius: var(--border-radius-sm, 8px); border: 1.5px solid var(--gray-200, #E2E8F0); font-size: 13px; background: #fff;">
                  <option value="no">No, standard sorting</option>
                  <option value="yes">Yes, pin to top</option>
                </select>
              </div>
            </div>

            <div class="form-row cols-2" style="margin-bottom: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" style="font-weight: 600; margin-bottom: 6px; display: block; color: var(--gray-700, #334155);">Author Name *</label>
                <input type="text" class="form-control" id="notice-form-author" value="${WP.currentUser.name}" required style="width: 100%; padding: 10px; border-radius: var(--border-radius-sm, 8px); border: 1.5px solid var(--gray-200, #E2E8F0); font-size: 13px;" />
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight: 600; margin-bottom: 6px; display: block; color: var(--gray-700, #334155);">Author Role *</label>
                <input type="text" class="form-control" id="notice-form-role" value="${WP.currentUser.role}" required style="width: 100%; padding: 10px; border-radius: var(--border-radius-sm, 8px); border: 1.5px solid var(--gray-200, #E2E8F0); font-size: 13px;" />
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" style="font-weight: 600; margin-bottom: 6px; display: block; color: var(--gray-700, #334155);">Notice Content *</label>
              <textarea class="form-control" id="notice-form-body" rows="6" placeholder="Write details about this announcement..." required style="width: 100%; padding: 10px; border-radius: var(--border-radius-sm, 8px); border: 1.5px solid var(--gray-200, #E2E8F0); font-size: 13px; line-height: 1.5; resize: vertical;"></textarea>
            </div>

            <div style="display:flex; justify-content: flex-end; gap: 12px; margin-top: 24px; border-top: 1px solid var(--gray-100, #F1F5F9); padding-top: 16px;">
              <button type="button" class="btn btn-secondary" onclick="closeModal('new-notice-modal')">Cancel</button>
              <button type="submit" class="btn btn-primary">Publish Notice</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Draw KPIs
  updateNoticeKPIs();

  // Draw filter pills
  renderCategoryFilterPills();

  // Draw notices grid
  filterAndRenderCards();
}

// Update the KPIs cards based on current notices data
function updateNoticeKPIs() {
  const kpiContainer = document.getElementById('notice-kpi-row');
  if (!kpiContainer) return;

  const total = WP.notices.length;
  const pinned = WP.notices.filter(n => n.pinned).length;
  
  // Calculate unique categories
  const cats = new Set(WP.notices.map(n => n.category)).size;

  // Let's count "Recent" notices (posted in the last 7 days)
  // Since our mock data is set around Jun 2026, let's say notices within June 10-14, 2026 (or last 4 notices)
  // Let's just define a count of notices posted in June 2026
  const june2026Count = WP.notices.filter(n => n.date.includes('2026')).length;

  kpiContainer.innerHTML = [
    { label: 'Total Announcements', val: total, color: 'var(--primary, #024B37)', icon: '📢' },
    { label: 'Pinned Alerts', val: pinned, color: 'var(--accent, #F59E0B)', icon: '📌' },
    { label: 'Active Categories', val: cats, color: 'var(--info, #06B6D4)', icon: '🏷️' },
    { label: 'Posted this Month', val: june2026Count, color: 'var(--success, #10B981)', icon: '📅' }
  ].map(s => `
    <div class="stat-card">
      <div style="font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; background-color: var(--gray-50, #F8FAFC); border-radius: 50%">${s.icon}</div>
      <div class="stat-body" style="margin-left: 12px;">
        <div class="stat-label" style="font-size: 12px; color: var(--gray-500, #64748B); font-weight: 500;">${s.label}</div>
        <div class="stat-value" style="font-size: 24px; font-weight: 700; color:${s.color}; margin-top: 2px;">${s.val}</div>
      </div>
    </div>
  `).join('');
}

// Render category filter pills
function renderCategoryFilterPills() {
  const pillsContainer = document.getElementById('category-pills');
  if (!pillsContainer) return;

  // Gather categories
  const categories = ['All', 'Appraisal', 'Event', 'Policy', 'Payroll', 'Compliance', 'General'];

  pillsContainer.innerHTML = categories.map(cat => {
    const isActive = noticeActiveCategory === cat;
    const count = cat === 'All' ? WP.notices.length : WP.notices.filter(n => n.category === cat).length;
    return `
      <button class="notice-filter-pill ${isActive ? 'active' : ''}" onclick="selectNoticeCategory('${cat}')">
        ${cat} <span style="font-size: 11px; opacity: 0.8; margin-left: 4px;">(${count})</span>
      </button>
    `;
  }).join('');
}

// Handle select category
window.selectNoticeCategory = function(cat) {
  noticeActiveCategory = cat;
  renderCategoryFilterPills();
  filterAndRenderCards();
  toggleClearSearchBtn();
};

// Handle sorting order changes
window.changeNoticeSort = function(order) {
  noticeSortOrder = order;
  filterAndRenderCards();
};

// Real-time search handler
window.handleNoticeSearch = function(query) {
  noticeSearchQuery = query;
  filterAndRenderCards();
  toggleClearSearchBtn();
};

// Clear filters
window.clearNoticeFilters = function() {
  noticeSearchQuery = '';
  noticeActiveCategory = 'All';
  noticeSortOrder = 'newest';
  
  const searchInput = document.getElementById('notice-search-input');
  if (searchInput) searchInput.value = '';
  
  const sortSelect = document.getElementById('notice-sort-select');
  if (sortSelect) sortSelect.value = 'newest';

  renderCategoryFilterPills();
  filterAndRenderCards();
  toggleClearSearchBtn();
};

function toggleClearSearchBtn() {
  const clearBtn = document.getElementById('clear-search-btn');
  if (!clearBtn) return;
  if (noticeSearchQuery || noticeActiveCategory !== 'All') {
    clearBtn.style.display = 'block';
  } else {
    clearBtn.style.display = 'none';
  }
}

// Main logic for filtering and sorting notice items, then drawing the grid
function filterAndRenderCards() {
  const grid = document.getElementById('notices-grid');
  if (!grid) return;

  // 1. Filter
  let filtered = WP.notices.filter(notice => {
    // Category check
    const matchesCategory = noticeActiveCategory === 'All' || notice.category === noticeActiveCategory;
    
    // Search query check
    const q = noticeSearchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      notice.title.toLowerCase().includes(q) || 
      notice.body.toLowerCase().includes(q) ||
      notice.category.toLowerCase().includes(q) ||
      notice.author.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  // 2. Sort
  filtered.sort((a, b) => {
    if (noticeSortOrder === 'pinned') {
      // Pinned first, then date descending
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date) - new Date(a.date);
    } else if (noticeSortOrder === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (noticeSortOrder === 'alphabetical') {
      return a.title.localeCompare(b.title);
    } else {
      // newest first (default)
      return new Date(b.date) - new Date(a.date);
    }
  });

  // 3. Render
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-title">No Notices Found</div>
        <p class="empty-state-desc">We couldn't find any announcements matching your search query or filters. Try checking spelling or selecting another category.</p>
        <button class="btn btn-outline" style="margin-top:16px; margin-inline:auto;" onclick="clearNoticeFilters()">
          Clear Filters
        </button>
      </div>
    `;
    return;
  }

  const categoryIcons = {
    Appraisal: '🎯',
    Event: '🎉',
    Policy: '📋',
    Payroll: '💰',
    Compliance: '🎓',
    General: '📢'
  };

  grid.innerHTML = filtered.map(notice => {
    const isPinned = notice.pinned;
    const catClass = `badge-${notice.category.toLowerCase()}`;
    const initials = getInitials(notice.author);
    const color = avatarColors(initials);
    const summary = notice.body.length > 130 ? notice.body.substring(0, 130) + '...' : notice.body;
    const catIcon = categoryIcons[notice.category] || '📢';

    return `
      <div class="notice-card ${isPinned ? 'pinned' : ''} hover-lift" onclick="openNoticeDetail('${notice.id}')" style="cursor: pointer;">
        ${isPinned ? `<span class="pinned-badge-card">📌 Pinned</span>` : ''}
        
        <div class="notice-card-header">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span style="font-size: 18px;">${catIcon}</span>
            <span class="notice-category-badge ${catClass}">${notice.category}</span>
          </div>
          <h3 style="font-size: 15px; font-weight: 700; color: var(--gray-800, #1E293B); line-height: 1.4; margin: 0; padding-right: ${isPinned ? '80px' : '0px'};">
            ${notice.title}
          </h3>
        </div>

        <div class="notice-card-body">
          <p style="font-size: 13px; color: var(--gray-600, #475569); line-height: 1.5; margin: 0;">
            ${summary}
          </p>
        </div>

        <div class="notice-card-footer">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="author-avatar" style="background:${color}; width:24px; height:24px; font-size:9px;">${initials}</div>
            <div style="font-size: 11px; font-weight: 600; color: var(--gray-600, #475569);">${notice.author}</div>
          </div>
          <div style="font-size: 11px; color: var(--gray-400, #94A3B8); font-weight: 500;">
            ${notice.date}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Open detail modal with fully populated data
window.openNoticeDetail = function(id) {
  const notice = WP.notices.find(n => n.id === id);
  if (!notice) return;

  const categoryIcons = {
    Appraisal: '🎯',
    Event: '🎉',
    Policy: '📋',
    Payroll: '💰',
    Compliance: '🎓',
    General: '📢'
  };

  const catIcon = categoryIcons[notice.category] || '📢';
  const initials = getInitials(notice.author);
  const avatarBg = avatarColors(initials);

  // Set header
  document.getElementById('detail-modal-icon').textContent = catIcon;
  document.getElementById('detail-modal-title').textContent = notice.title;
  document.getElementById('detail-modal-subtitle').innerHTML = `Posted by <strong>${notice.author}</strong> on ${notice.date}`;

  // Set tags
  const tagsContainer = document.getElementById('detail-modal-tags');
  const catClass = `badge-${notice.category.toLowerCase()}`;
  tagsContainer.innerHTML = `
    <span class="notice-category-badge ${catClass}">${notice.category}</span>
    ${notice.pinned ? `<span class="notice-category-badge" style="background-color: var(--accent-light, #FEF3C7); color: var(--accent, #F59E0B); border: 1px solid var(--accent, #F59E0B)">📌 Pinned</span>` : ''}
  `;

  // Set body
  document.getElementById('detail-modal-body').textContent = notice.body;

  // Set author footer details
  document.getElementById('detail-modal-author-avatar').textContent = initials;
  document.getElementById('detail-modal-author-avatar').style.backgroundColor = avatarBg;
  document.getElementById('detail-modal-author-name').textContent = notice.author;
  document.getElementById('detail-modal-author-role').textContent = notice.role;
  document.getElementById('detail-modal-date').textContent = `Published: ${notice.date}`;

  // Setup admin actions if HR Administrator
  const adminContainer = document.getElementById('detail-admin-actions');
  if (WP.currentUser.role === 'HR Administrator' || WP.currentUser.role === 'HR Manager') {
    adminContainer.innerHTML = `
      <button class="btn btn-ghost" onclick="togglePinNotice('${notice.id}')" style="font-size: 12px; color: var(--accent, #F59E0B); font-weight: 600;">
        ${notice.pinned ? '📌 Unpin Notice' : '📌 Pin Notice'}
      </button>
      <button class="btn btn-danger btn-sm" onclick="deleteNotice('${notice.id}')" style="font-size: 12px;">
        🗑️ Delete Notice
      </button>
    `;
  } else {
    adminContainer.innerHTML = '';
  }

  openModal('notice-detail-modal');
};

// Share notice action
window.shareNoticeFromModal = function() {
  showToast('Announcement link copied to clipboard! 🔗', 'success');
};

// Print notice action
window.printNoticeFromModal = function() {
  const title = document.getElementById('detail-modal-title').innerText;
  const subtitle = document.getElementById('detail-modal-subtitle').innerText;
  const content = document.getElementById('detail-modal-body').innerText;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
    <head>
      <title>Notice: ${title}</title>
      <style>
        body { font-family: sans-serif; padding: 40px; color: #333; line-height: 1.6; }
        h1 { border-bottom: 2px solid #024B37; padding-bottom: 10px; color: #024B37; }
        .subtitle { color: #666; font-size: 14px; margin-bottom: 30px; }
        .content { font-size: 16px; white-space: pre-wrap; background: #f9f9f9; padding: 20px; border-radius: 8px; }
        .footer { margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 10px; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="subtitle">${subtitle}</div>
      <div class="content">${content}</div>
      <div class="footer">Printed from WorkPilot HR Dashboard on ${new Date().toLocaleString()}</div>
      <script>window.print();</script>
    </body>
    </html>
  `);
  printWindow.document.close();
};

// Toggle Notice Pin status
window.togglePinNotice = function(id) {
  const notice = WP.notices.find(n => n.id === id);
  if (!notice) return;

  notice.pinned = !notice.pinned;
  showToast(notice.pinned ? 'Notice pinned to top successfully!' : 'Notice unpinned successfully.', 'success');
  
  // Update view in modal
  openNoticeDetail(id);
  
  // Refresh main page grid and KPIs
  updateNoticeKPIs();
  filterAndRenderCards();
};

// Delete Notice
window.deleteNotice = function(id) {
  if (!confirm('Are you sure you want to delete this notice? This action cannot be undone.')) return;

  const index = WP.notices.findIndex(n => n.id === id);
  if (index === -1) return;

  WP.notices.splice(index, 1);
  closeModal('notice-detail-modal');
  showToast('Notice deleted successfully.', 'success');

  // Refresh lists and KPIs
  updateNoticeKPIs();
  renderCategoryFilterPills();
  filterAndRenderCards();
};

// Handle Post Notice Form submission
window.submitNoticeForm = function(event) {
  event.preventDefault();

  const title = document.getElementById('notice-form-title').value.trim();
  const category = document.getElementById('notice-form-category').value;
  const isPinned = document.getElementById('notice-form-pinned').value === 'yes';
  const author = document.getElementById('notice-form-author').value.trim();
  const role = document.getElementById('notice-form-role').value.trim();
  const body = document.getElementById('notice-form-body').value.trim();

  if (!title || !author || !role || !body) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  // Generate ID
  const lastId = WP.notices.length > 0 ? WP.notices[WP.notices.length - 1].id : 'NT000';
  const numericPart = parseInt(lastId.replace('NT', '')) + 1;
  const newId = 'NT' + String(numericPart).padStart(3, '0');

  // Create date (Jun 14, 2026 format)
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

  // Map category icons
  const categoryIcons = {
    Appraisal: '🎯',
    Event: '🎉',
    Policy: '📋',
    Payroll: '💰',
    Compliance: '🎓',
    General: '📢'
  };

  const newNotice = {
    id: newId,
    title: title,
    body: body,
    category: category,
    pinned: isPinned,
    date: dateStr,
    author: author,
    role: role,
    icon: categoryIcons[category] || '📢'
  };

  // Add to WP.notices (insert at start so it shows on top)
  WP.notices.unshift(newNotice);

  // Clean form
  document.getElementById('new-notice-form').reset();
  // reset author and role fields to defaults
  document.getElementById('notice-form-author').value = WP.currentUser.name;
  document.getElementById('notice-form-role').value = WP.currentUser.role;

  // Close modal
  closeModal('new-notice-modal');

  // Launch confetti if pinned
  if (isPinned) {
    launchConfetti();
  }

  showToast('Notice published successfully! 🚀', 'success');

  // Refresh page elements
  updateNoticeKPIs();
  renderCategoryFilterPills();
  filterAndRenderCards();
};
