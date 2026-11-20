/**
 * CIVICVOTE NIGERIA — ADMINISTRATIVE PORTAL CONTROLLER
 * Pure Vanilla JavaScript • Client-side Interactive Management Console
 */

document.addEventListener("DOMContentLoaded", function() {
    initAdminNavigation();
    initAdminCandidates();
    initAdminElections();
    initAdminCollation();
    initAdminLogs();
    updateDashboardMetrics();
});

// State Store (in-memory + localStorage for persistence)
let adminCandidates = JSON.parse(localStorage.getItem("civicvote_admin_candidates")) || [...candidatesData];
let adminLogs = JSON.parse(localStorage.getItem("civicvote_admin_logs")) || [
    { time: "Just now", action: "System Initialized", user: "Admin (Chief Returning Officer)", status: "Success" },
    { time: "10 mins ago", action: "BVAS Firmware Accreditation Check Passed", user: "System Daemon", status: "Success" },
    { time: "25 mins ago", action: "Pre-election Candidate Registry Synced", user: "Registration Officer", status: "Success" },
    { time: "1 hour ago", action: "Cryptographic Seed Initialized for 2026 Simulation", user: "Security Officer", status: "Success" }
];

function showAdminToast(message) {
    const toast = document.getElementById("adminToast");
    const toastMsg = document.getElementById("adminToastMsg");
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

function logAdminAction(action, user = "Admin (Superuser)", status = "Success") {
    const entry = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        action: action,
        user: user,
        status: status
    };
    adminLogs.unshift(entry);
    if (adminLogs.length > 30) adminLogs.pop();
    localStorage.setItem("civicvote_admin_logs", JSON.stringify(adminLogs));
    renderAdminLogs();
}

/**
 * 1. SIDEBAR & VIEW ROUTING
 */
function initAdminNavigation() {
    const sidebar = document.getElementById("adminSidebar");
    const toggleBtn = document.getElementById("adminSidebarToggle");
    const navLinks = document.querySelectorAll(".admin-nav-link[data-view]");
    const pageTitle = document.getElementById("adminCurrentPageTitle");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            sidebar.classList.toggle("open");
        });

        document.addEventListener("click", function(e) {
            if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && e.target !== toggleBtn) {
                sidebar.classList.remove("open");
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetView = this.getAttribute("data-view");
            switchAdminView(targetView);

            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            if (pageTitle) {
                pageTitle.textContent = this.textContent.trim();
            }

            if (sidebar && window.innerWidth <= 992) {
                sidebar.classList.remove("open");
            }
        });
    });
}

function switchAdminView(viewId) {
    const views = document.querySelectorAll(".admin-view-panel");
    views.forEach(v => v.classList.remove("active"));
    const activeView = document.getElementById("view-" + viewId);
    if (activeView) {
        activeView.classList.add("active");
    }
}

/**
 * 2. CANDIDATE MANAGEMENT
 */
function initAdminCandidates() {
    renderAdminCandidatesTable();

    const searchInput = document.getElementById("adminCandidateSearch");
    const partyFilter = document.getElementById("adminCandidatePartyFilter");
    const positionFilter = document.getElementById("adminCandidatePositionFilter");

    function applyFilters() {
        const query = (searchInput?.value || "").toLowerCase().trim();
        const party = partyFilter?.value || "all";
        const pos = positionFilter?.value || "all";

        const filtered = adminCandidates.filter(c => {
            const matchesQuery = c.name.toLowerCase().includes(query) || c.state.toLowerCase().includes(query);
            const matchesParty = party === "all" || c.party === party;
            const matchesPos = pos === "all" || c.position === pos;
            return matchesQuery && matchesParty && matchesPos;
        });

        renderAdminCandidatesTable(filtered);
    }

    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (partyFilter) partyFilter.addEventListener("change", applyFilters);
    if (positionFilter) positionFilter.addEventListener("change", applyFilters);

    // Add Candidate Modal
    const addBtn = document.getElementById("openAddCandidateModalBtn");
    const modal = document.getElementById("addCandidateModal");
    const closeBtn = document.getElementById("closeAddCandidateModalBtn");
    const form = document.getElementById("addCandidateForm");

    if (addBtn && modal) {
        addBtn.addEventListener("click", () => modal.classList.add("open"));
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    }
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("newCandName").value.trim();
            const party = document.getElementById("newCandParty").value;
            const position = document.getElementById("newCandPosition").value;
            const state = document.getElementById("newCandState").value;
            const runningMate = document.getElementById("newCandRunningMate").value.trim() || "N/A";
            const photoUrl = document.getElementById("newCandPhoto").value.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0a4023&color=fff`;
            const manifesto = document.getElementById("newCandManifesto").value.trim() || "Public manifesto awaiting gazette.";

            const newCandidate = {
                id: "cand-" + Date.now(),
                name: name,
                party: party,
                position: position,
                state: state,
                constituency: `${state} State (${position})`,
                runningMate: runningMate,
                photo: photoUrl,
                status: "Pending Official Gazette",
                verified: false,
                biography: `${name} is an accredited candidate representing ${party} for the ${position} position in ${state}.`,
                education: "Verified by Electoral Screening Board.",
                experience: ["Party Nomination Primary Winner (2026)"],
                manifesto: manifesto,
                source: "Administrative Registration Portal"
            };

            adminCandidates.unshift(newCandidate);
            localStorage.setItem("civicvote_admin_candidates", JSON.stringify(adminCandidates));

            renderAdminCandidatesTable();
            updateDashboardMetrics();
            logAdminAction(`Registered candidate: ${name} (${party})`);
            showAdminToast(`Candidate "${name}" registered successfully.`);

            form.reset();
            modal.classList.remove("open");
        });
    }
}

function renderAdminCandidatesTable(candidatesList = adminCandidates) {
    const tbody = document.getElementById("adminCandidatesTableBody");
    const countDisplay = document.getElementById("adminCandidateCountBadge");
    if (!tbody) return;

    if (countDisplay) {
        countDisplay.textContent = `${candidatesList.length} Registered`;
    }

    tbody.innerHTML = "";

    if (candidatesList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #6b7280;">No candidates matching criteria.</td></tr>`;
        return;
    }

    candidatesList.forEach(cand => {
        const party = politicalParties.find(p => p.code === cand.party) || { color: "#374151", name: cand.party };
        const isVerified = cand.verified !== false; // default true for seeded data

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <div class="table-candidate-cell">
                    <img src="${cand.photo}" alt="${cand.name}" class="table-candidate-avatar"
                         onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0a4023&color=fff';">
                    <div>
                        <strong>${cand.name}</strong>
                        <div style="font-size: 0.75rem; color: #6b7280;">Running Mate: ${cand.runningMate}</div>
                    </div>
                </div>
            </td>
            <td>
                <span style="background: ${party.color}; color: #fff; font-size: 0.75rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 4px;">
                    ${cand.party}
                </span>
            </td>
            <td><strong>${cand.position}</strong></td>
            <td>${cand.state}</td>
            <td>
                <span class="${isVerified ? 'status-badge-verified' : 'status-badge-pending'}">
                    ${isVerified ? '✓ Verified' : '⏳ In Review'}
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 0.4rem;">
                    <button class="btn-admin-secondary btn-admin-sm" onclick="toggleCandidateVerification('${cand.id}')" title="Toggle Verification">
                        ${isVerified ? 'Mark Review' : 'Approve'}
                    </button>
                    <button class="btn-admin-danger btn-admin-sm" onclick="deleteAdminCandidate('${cand.id}')" title="Delete Candidate">
                        ✕
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function toggleCandidateVerification(candId) {
    const cand = adminCandidates.find(c => c.id === candId);
    if (!cand) return;
    cand.verified = (cand.verified === false) ? true : false;
    localStorage.setItem("civicvote_admin_candidates", JSON.stringify(adminCandidates));
    renderAdminCandidatesTable();
    updateDashboardMetrics();
    logAdminAction(`Changed status for ${cand.name} to ${cand.verified ? 'Verified' : 'Pending Review'}`);
    showAdminToast(`Updated verification status for ${cand.name}.`);
}

function deleteAdminCandidate(candId) {
    const cand = adminCandidates.find(c => c.id === candId);
    if (!cand) return;
    if (confirm(`Are you sure you want to remove candidate "${cand.name}" from the administrative ledger?`)) {
        adminCandidates = adminCandidates.filter(c => c.id !== candId);
        localStorage.setItem("civicvote_admin_candidates", JSON.stringify(adminCandidates));
        renderAdminCandidatesTable();
        updateDashboardMetrics();
        logAdminAction(`Removed candidate record: ${cand.name}`, "Admin (Security)", "Warning");
        showAdminToast(`Candidate "${cand.name}" removed.`);
    }
}

/**
 * 3. ELECTIONS CONFIGURATION
 */
function initAdminElections() {
    const toggleBtns = document.querySelectorAll(".btn-toggle-election-status");
    toggleBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const row = this.closest("tr");
            const statusCell = row.querySelector(".election-status-indicator");
            if (statusCell.textContent.includes("Active")) {
                statusCell.innerHTML = `<span style="background: #fef8eb; color: #8a6114; font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 4px;">⏸️ Suspended</span>`;
                this.textContent = "Resume Cycle";
                logAdminAction("Electoral cycle temporarily suspended", "Chief Returning Officer", "Warning");
                showAdminToast("Election cycle suspended.");
            } else {
                statusCell.innerHTML = `<span style="background: #eefbf3; color: #0a4023; font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 4px;">🟢 Active / Open</span>`;
                this.textContent = "Suspend Cycle";
                logAdminAction("Electoral cycle activated and synchronized", "Chief Returning Officer");
                showAdminToast("Election cycle is now Active.");
            }
        });
    });
}

/**
 * 4. COLLATION & TABULATION AUDIT
 */
function initAdminCollation() {
    const certifyBtn = document.getElementById("adminCertifyReturnsBtn");
    const purgeBtn = document.getElementById("adminPurgeSessionVotesBtn");

    if (certifyBtn) {
        certifyBtn.addEventListener("click", function() {
            if (confirm("Proceed to lock and certify all aggregated votes in the electronic ledger?")) {
                logAdminAction("Election tally officially certified by Chief Returning Officer", "Prof. Mahmood Yakubu (Hon. Chairman)");
                showAdminToast("Collation locked. Official certificate issued.");
            }
        });
    }

    if (purgeBtn) {
        purgeBtn.addEventListener("click", function() {
            if (confirm("Reset current simulation practice ballot records? This action cannot be undone.")) {
                localStorage.removeItem("civicvote_practice_votes");
                logAdminAction("Practice ballot session tally reset", "Database Administrator", "Notice");
                showAdminToast("Practice ledger purged.");
                updateDashboardMetrics();
            }
        });
    }
}

/**
 * 5. AUDIT LOGS
 */
function initAdminLogs() {
    renderAdminLogs();
    const clearBtn = document.getElementById("adminClearLogsBtn");
    if (clearBtn) {
        clearBtn.addEventListener("click", function() {
            if (confirm("Clear local system event log?")) {
                adminLogs = [];
                localStorage.removeItem("civicvote_admin_logs");
                renderAdminLogs();
                showAdminToast("Audit log cleared.");
            }
        });
    }
}

function renderAdminLogs() {
    const tbody = document.getElementById("adminAuditLogsTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (adminLogs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #6b7280; padding: 1.5rem;">No recent events logged.</td></tr>`;
        return;
    }

    adminLogs.forEach(log => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="font-family: monospace; font-size: 0.8rem; color: #6b7280;">${log.time}</td>
            <td><strong>${log.action}</strong></td>
            <td>${log.user}</td>
            <td>
                <span style="font-size: 0.74rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 4px; ${
                    log.status === 'Warning' ? 'background: #fde8e8; color: #b91c1c;' : 'background: #eefbf3; color: #0a4023;'
                }">
                    ${log.status}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * 6. DASHBOARD METRICS
 */
function updateDashboardMetrics() {
    const candMetric = document.getElementById("adminMetricCandidates");
    const ballotMetric = document.getElementById("adminMetricBallots");
    const verifiedCandCount = adminCandidates.filter(c => c.verified !== false).length;

    if (candMetric) {
        candMetric.textContent = verifiedCandCount;
    }

    const practiceVotes = JSON.parse(localStorage.getItem("civicvote_practice_votes")) || [];
    if (ballotMetric) {
        ballotMetric.textContent = practiceVotes.length + 142; // base simulated baseline + session
    }
}

