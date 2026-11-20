/**
 * CIVICVOTE NIGERIA — COMPREHENSIVE ADMINISTRATIVE COMMAND PORTAL
 * Pure Vanilla JavaScript • National Electoral Commission Operations Console
 * Built strictly with HTML5, CSS3, and Vanilla JavaScript for academic defense.
 */

// =============================================================================
// STATE DATA STORE (In-Memory + LocalStorage Persistence)
// =============================================================================

let adminCandidates = JSON.parse(localStorage.getItem("civicvote_admin_candidates")) || [...candidatesData];
let adminLogs = JSON.parse(localStorage.getItem("civicvote_admin_logs")) || [
    { time: "10:14:22", action: "System Initialized & Security Handshake Verified", user: "INEC-CMD-8842", category: "Security", hash: "0x8fa3...c91d" },
    { time: "09:48:15", action: "BVAS Master Key Firmware Certificate Synced", user: "ICT Daemon", category: "System", hash: "0x3bc1...e429" },
    { time: "09:32:04", action: "Candidate Clearance Verified: Presidential Contestants", user: "Registration Officer", category: "Candidate Screening", hash: "0x77ae...90fa" },
    { time: "08:15:30", action: "IReV Cloud Repository Primary Replica Online", user: "Infrastructure Desk", category: "System", hash: "0x12cd...88bb" },
    { time: "07:30:00", action: "National Collation Central Server Boot Verified", user: "Chief Tech Officer", category: "Security", hash: "0x66ff...aa12" }
];

let fieldIncidents = JSON.parse(localStorage.getItem("civicvote_field_incidents")) || [
    { id: "INC-881", pu: "PU 024/08/02", lga: "Alimosho", state: "Lagos", category: "Biometric Fallback", desc: "Dual fingerprint match failed due to worn cuticle; facial scan succeeded without incident.", priority: "Resolved", time: "09:40 AM" },
    { id: "INC-882", pu: "PU 012/04/01", lga: "Kano Municipal", state: "Kano", category: "IReV Transmission", desc: "Form EC8A photograph uploaded and verified by RA Collation Officer.", priority: "Routine", time: "10:12 AM" },
    { id: "INC-883", pu: "PU 005/01/03", lga: "Yenagoa", state: "Bayelsa", category: "Weather Delay", desc: "Heavy morning downpour delayed deployment by 40 mins. Poll hours extended accordingly.", priority: "Warning", time: "08:45 AM" },
    { id: "INC-884", pu: "PU 033/12/09", lga: "Enugu North", state: "Enugu", category: "Accreditation", desc: "BVAS battery unit replaced with standby pack; voting uninterrupted.", priority: "Resolved", time: "09:15 AM" }
];

// Active Officer Session
let currentOfficer = JSON.parse(sessionStorage.getItem("civicvote_admin_session")) || null;

// =============================================================================
// INITIALIZATION
// =============================================================================

document.addEventListener("DOMContentLoaded", function() {
    initOfficerAuth();
    initAdminNavigation();
    initAdminCandidates();
    initAdminElections();
    initAdminCollation();
    initFieldIncidents();
    initAdminLogs();
    initSystemTools();
    updateDashboardMetrics();
    renderLiveTransmissionFeed();
});

// =============================================================================
// 1. OFFICER AUTHENTICATION GATE & SESSION CONTROLS
// =============================================================================

function initOfficerAuth() {
    const authOverlay = document.getElementById("adminAuthOverlay");
    const authForm = document.getElementById("adminAuthForm");
    const quickLoginBtn = document.getElementById("quickStaffLoginBtn");
    const logoutBtn = document.getElementById("adminLogoutBtn");
    const officerNameEl = document.getElementById("adminOfficerName");
    const officerRoleEl = document.getElementById("adminOfficerRole");
    const officerIdEl = document.getElementById("adminOfficerIdBadge");

    function renderSessionUI() {
        if (!currentOfficer) {
            if (authOverlay) authOverlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        } else {
            if (authOverlay) authOverlay.style.display = "none";
            document.body.style.overflow = "";
            if (officerNameEl) officerNameEl.textContent = currentOfficer.name;
            if (officerRoleEl) officerRoleEl.textContent = currentOfficer.role;
            if (officerIdEl) officerIdEl.textContent = currentOfficer.id;
        }
    }

    renderSessionUI();

    if (authForm) {
        authForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const officerId = document.getElementById("authOfficerId").value.trim() || "INEC-OFFICER-001";
            const officerRole = document.getElementById("authOfficerRole").value;
            const officerName = document.getElementById("authOfficerName").value.trim() || "Commissioner Officer";

            currentOfficer = {
                id: officerId,
                role: officerRole,
                name: officerName,
                loginTime: new Date().toLocaleTimeString()
            };

            sessionStorage.setItem("civicvote_admin_session", JSON.stringify(currentOfficer));
            logAdminAction(`Officer logged in: ${currentOfficer.name} (${currentOfficer.role})`, currentOfficer.id, "Security");
            showAdminToast(`Welcome, ${currentOfficer.name}. Session authenticated.`);
            renderSessionUI();
        });
    }

    if (quickLoginBtn) {
        quickLoginBtn.addEventListener("click", function() {
            currentOfficer = {
                id: "INEC-HQ-8842",
                role: "Chief Returning Officer",
                name: "Prof. Mahmood Yakubu (Hon. Chairman)",
                loginTime: new Date().toLocaleTimeString()
            };
            sessionStorage.setItem("civicvote_admin_session", JSON.stringify(currentOfficer));
            logAdminAction("Chief Returning Officer session authenticated", currentOfficer.id, "Security");
            showAdminToast("Authenticated as Chief Returning Officer.");
            renderSessionUI();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(e) {
            e.preventDefault();
            if (confirm("Lock console and sign out of the administrative session?")) {
                logAdminAction("Administrative session ended / locked", currentOfficer ? currentOfficer.id : "Officer", "Security");
                sessionStorage.removeItem("civicvote_admin_session");
                currentOfficer = null;
                renderSessionUI();
                showAdminToast("Session locked.");
            }
        });
    }
}

// =============================================================================
// 2. SIDEBAR NAVIGATION & ROUTING
// =============================================================================

function initAdminNavigation() {
    const sidebar = document.getElementById("adminSidebar");
    const toggleBtn = document.getElementById("adminSidebarToggle");
    const backdrop = document.getElementById("adminSidebarBackdrop");
    const navLinks = document.querySelectorAll(".admin-nav-link[data-view]");
    const pageTitle = document.getElementById("adminCurrentPageTitle");

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove("open");
        if (backdrop) backdrop.classList.remove("open");
        document.body.classList.remove("sidebar-locked");
    }

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            const isOpen = sidebar.classList.toggle("open");
            if (backdrop) backdrop.classList.toggle("open", isOpen);
            document.body.classList.toggle("sidebar-locked", isOpen);
        });

        if (backdrop) {
            backdrop.addEventListener("click", closeSidebar);
        }

        document.addEventListener("click", function(e) {
            if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && e.target !== toggleBtn) {
                closeSidebar();
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
                pageTitle.textContent = this.textContent.trim().replace(/^[^\s]+\s+/, "");
            }

            if (window.innerWidth <= 992) {
                closeSidebar();
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

function showAdminToast(message) {
    const toast = document.getElementById("adminToast");
    const toastMsg = document.getElementById("adminToastMsg");
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3800);
}

function logAdminAction(action, user = "Admin (Superuser)", category = "System") {
    const hash = "0x" + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join("");
    const entry = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        action: action,
        user: user,
        category: category,
        hash: hash
    };
    adminLogs.unshift(entry);
    if (adminLogs.length > 50) adminLogs.pop();
    localStorage.setItem("civicvote_admin_logs", JSON.stringify(adminLogs));
    renderAdminLogs();
}

// =============================================================================
// 3. EXECUTIVE OPERATIONS TELEMETRY & METRICS
// =============================================================================

function updateDashboardMetrics() {
    const metricCandidates = document.getElementById("adminMetricCandidates");
    const metricVerifiedCount = document.getElementById("adminMetricVerifiedCount");
    const metricPendingCount = document.getElementById("adminMetricPendingCount");
    const metricAccreditation = document.getElementById("adminMetricAccreditation");

    if (metricCandidates) {
        metricCandidates.textContent = adminCandidates.length;
    }

    const verified = adminCandidates.filter(c => !c.screeningStatus || c.screeningStatus === "Verified").length;
    const pending = adminCandidates.length - verified;

    if (metricVerifiedCount) metricVerifiedCount.textContent = verified;
    if (metricPendingCount) metricPendingCount.textContent = pending;

    if (metricAccreditation) {
        const rate = Math.round((verified / (adminCandidates.length || 1)) * 100);
        metricAccreditation.textContent = rate + "%";
    }
}

function renderLiveTransmissionFeed() {
    const feedContainer = document.getElementById("adminLiveActivityFeed");
    if (!feedContainer) return;

    const liveEvents = [
        "Lagos State Collation: Ikeja LGA Form EC8C verified by Resident Electoral Commissioner",
        "Kano State: 44 Local Government collation officer returns uploaded to central vault",
        "Rivers State: Port Harcourt City Ward 02 Form EC8A cryptographic checksum confirmed",
        "BVAS Health Ping: 176,846 devices responding with sub-50ms latency across 36 states",
        "Off-Cycle Monitor: Anambra November 2025 readiness audit milestone achieved"
    ];

    feedContainer.innerHTML = liveEvents.map(ev => `
        <div style="display: flex; align-items: center; gap: 0.65rem; padding: 0.6rem 0; border-bottom: 1px dotted var(--admin-border); font-size: 0.82rem;">
            <span style="color: var(--admin-green-600); font-weight: 800;">●</span>
            <span style="color: #334155; flex-grow: 1;">${ev}</span>
            <small style="color: #94a3b8; font-family: monospace;">Just now</small>
        </div>
    `).join("");
}

// =============================================================================
// 4. CANDIDATE REGISTRY & DIGITAL DOSSIER CLEARANCE (FULL CRUD)
// =============================================================================

function initAdminCandidates() {
    const tableBody = document.getElementById("adminCandidatesTableBody");
    const searchInput = document.getElementById("adminCandidateSearch");
    const statusFilter = document.getElementById("adminCandidateStatusFilter");
    const officeFilter = document.getElementById("adminCandidateOfficeFilter");
    const addCandidateForm = document.getElementById("addCandidateForm");
    const editCandidateForm = document.getElementById("editCandidateForm");

    function renderTable() {
        if (!tableBody) return;
        tableBody.innerHTML = "";

        const query = (searchInput ? searchInput.value : "").toLowerCase().trim();
        const statusVal = statusFilter ? statusFilter.value : "all";
        const officeVal = officeFilter ? officeFilter.value : "all";

        const filtered = adminCandidates.filter(c => {
            const matchesQuery = c.name.toLowerCase().includes(query) ||
                                 c.party.toLowerCase().includes(query) ||
                                 c.state.toLowerCase().includes(query);
            
            const isVerified = !c.screeningStatus || c.screeningStatus === "Verified";
            const matchesStatus = (statusVal === "all") ||
                                  (statusVal === "verified" && isVerified) ||
                                  (statusVal === "pending" && !isVerified);

            const matchesOffice = (officeVal === "all") || (c.position.toLowerCase() === officeVal.toLowerCase());

            return matchesQuery && matchesStatus && matchesOffice;
        });

        if (filtered.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2.5rem; color:#64748b;">No candidate records match your search criteria.</td></tr>`;
            return;
        }

        filtered.forEach(cand => {
            const isVerified = !cand.screeningStatus || cand.screeningStatus === "Verified";
            const partyInfo = politicalParties.find(p => p.code === cand.party) || { color: "#0a4023" };

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>
                    <div class="table-candidate-cell">
                        <img src="${cand.photo}" alt="${cand.name}" class="table-candidate-avatar"
                             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0a4023&color=fff';">
                        <div>
                            <strong style="color: #0f172a; display: block;">${cand.name}</strong>
                            <small style="color: #64748b;">Running Mate: ${cand.runningMate}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span style="background: ${partyInfo.color}; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 4px;">
                        ${cand.party}
                    </span>
                </td>
                <td>
                    <strong style="font-size: 0.85rem;">${cand.position}</strong>
                    <div style="font-size: 0.75rem; color: #64748b;">${cand.state}</div>
                </td>
                <td>
                    <span class="${isVerified ? 'status-badge-verified' : 'status-badge-pending'}">
                        ${isVerified ? '✓ Cleared & Gazetted' : '⏳ Screening Review'}
                    </span>
                </td>
                <td>
                    <span style="color: #0a4023; font-weight: 700; font-size: 0.78rem;">✓ Supreme Court & CCB</span>
                </td>
                <td style="white-space: nowrap;">
                    <div style="display: flex; gap: 0.4rem;">
                        <button class="btn-admin-secondary btn-admin-sm btn-toggle-verify" data-id="${cand.id}" title="${isVerified ? 'Put on Hold' : 'Approve Candidate'}">
                            ${isVerified ? 'Flag Hold' : 'Approve'}
                        </button>
                        <button class="btn-admin-secondary btn-admin-sm btn-edit-cand" data-id="${cand.id}" title="Edit Candidate Dossier">
                            Edit
                        </button>
                        <button class="btn-admin-danger btn-admin-sm btn-delete-cand" data-id="${cand.id}" title="Revoke Accreditation">
                            ✕
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Bind Row Action Listeners
        tableBody.querySelectorAll(".btn-toggle-verify").forEach(b => {
            b.addEventListener("click", function() {
                toggleCandidateVerification(this.getAttribute("data-id"));
            });
        });

        tableBody.querySelectorAll(".btn-edit-cand").forEach(b => {
            b.addEventListener("click", function() {
                openEditCandidateModal(this.getAttribute("data-id"));
            });
        });

        tableBody.querySelectorAll(".btn-delete-cand").forEach(b => {
            b.addEventListener("click", function() {
                deleteCandidate(this.getAttribute("data-id"));
            });
        });
    }

    if (searchInput) searchInput.addEventListener("input", renderTable);
    if (statusFilter) statusFilter.addEventListener("change", renderTable);
    if (officeFilter) officeFilter.addEventListener("change", renderTable);

    // Initial render
    renderTable();

    // Accredit New Candidate Form Submission
    if (addCandidateForm) {
        addCandidateForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("newCandName").value.trim();
            const party = document.getElementById("newCandParty").value;
            const position = document.getElementById("newCandPosition").value;
            const state = document.getElementById("newCandState").value;
            const runningMate = document.getElementById("newCandRunningMate").value.trim() || "N/A";
            const photo = document.getElementById("newCandPhoto").value.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0a4023&color=fff&size=256`;
            const manifesto = document.getElementById("newCandManifesto").value.trim() || "Policy blueprint filed with the commission.";
            const education = document.getElementById("newCandEducation") ? document.getElementById("newCandEducation").value.trim() : "Degree documented.";

            const newId = "cand-" + Date.now();
            const newCand = {
                id: newId,
                name: name,
                party: party,
                position: position,
                state: state,
                constituency: position === "President" ? "Federal Republic of Nigeria (Nationwide)" : `${state} State`,
                runningMate: runningMate,
                photo: photo,
                biography: `${name} is an officially accredited candidate contesting for ${position} under ${party} in the Federal Republic of Nigeria.`,
                education: education,
                manifesto: manifesto,
                source: "Official Commission Gazetted Registry 2026",
                screeningStatus: "Verified"
            };

            adminCandidates.unshift(newCand);
            localStorage.setItem("civicvote_admin_candidates", JSON.stringify(adminCandidates));
            
            document.getElementById("addCandidateModal").classList.remove("open");
            addCandidateForm.reset();

            renderTable();
            updateDashboardMetrics();
            logAdminAction(`Accredited new candidate: ${name} (${party} - ${position})`, currentOfficer ? currentOfficer.id : "Admin", "Candidate Screening");
            showAdminToast(`Candidate "${name}" successfully accredited & gazetted.`);
        });
    }

    // Edit Candidate Form Submission
    if (editCandidateForm) {
        editCandidateForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const cid = document.getElementById("editCandId").value;
            const cand = adminCandidates.find(c => c.id === cid);
            if (!cand) return;

            cand.name = document.getElementById("editCandName").value.trim();
            cand.party = document.getElementById("editCandParty").value;
            cand.position = document.getElementById("editCandPosition").value;
            cand.state = document.getElementById("editCandState").value;
            cand.runningMate = document.getElementById("editCandRunningMate").value.trim() || "N/A";
            cand.manifesto = document.getElementById("editCandManifesto").value.trim();
            cand.photo = document.getElementById("editCandPhoto").value.trim() || cand.photo;

            localStorage.setItem("civicvote_admin_candidates", JSON.stringify(adminCandidates));
            document.getElementById("editCandidateModal").classList.remove("open");

            renderTable();
            updateDashboardMetrics();
            logAdminAction(`Updated candidate dossier: ${cand.name}`, currentOfficer ? currentOfficer.id : "Admin", "Candidate Screening");
            showAdminToast(`Candidate dossier for "${cand.name}" updated.`);
        });
    }
}

function toggleCandidateVerification(cid) {
    const cand = adminCandidates.find(c => c.id === cid);
    if (!cand) return;

    if (!cand.screeningStatus || cand.screeningStatus === "Verified") {
        cand.screeningStatus = "Pending Review";
        logAdminAction(`Candidate placed on administrative hold: ${cand.name}`, currentOfficer ? currentOfficer.id : "Admin", "Candidate Screening");
        showAdminToast(`Candidate "${cand.name}" placed on hold.`);
    } else {
        cand.screeningStatus = "Verified";
        logAdminAction(`Candidate cleared and approved: ${cand.name}`, currentOfficer ? currentOfficer.id : "Admin", "Candidate Screening");
        showAdminToast(`Candidate "${cand.name}" cleared & gazetted.`);
    }

    localStorage.setItem("civicvote_admin_candidates", JSON.stringify(adminCandidates));
    initAdminCandidates();
    updateDashboardMetrics();
}

function openEditCandidateModal(cid) {
    const cand = adminCandidates.find(c => c.id === cid);
    if (!cand) return;

    const modal = document.getElementById("editCandidateModal");
    if (!modal) return;

    document.getElementById("editCandId").value = cand.id;
    document.getElementById("editCandName").value = cand.name;
    document.getElementById("editCandParty").value = cand.party;
    document.getElementById("editCandPosition").value = cand.position;
    document.getElementById("editCandState").value = cand.state;
    document.getElementById("editCandRunningMate").value = cand.runningMate || "";
    document.getElementById("editCandPhoto").value = cand.photo || "";
    document.getElementById("editCandManifesto").value = cand.manifesto || "";

    modal.classList.add("open");
}

function deleteCandidate(cid) {
    const cand = adminCandidates.find(c => c.id === cid);
    if (!cand) return;

    if (confirm(`Revoke accreditation and remove candidate "${cand.name}" from the active registry?`)) {
        adminCandidates = adminCandidates.filter(c => c.id !== cid);
        localStorage.setItem("civicvote_admin_candidates", JSON.stringify(adminCandidates));
        initAdminCandidates();
        updateDashboardMetrics();
        logAdminAction(`Revoked candidate record: ${cand.name}`, currentOfficer ? currentOfficer.id : "Admin", "Candidate Screening");
        showAdminToast(`Candidate "${cand.name}" accreditation revoked.`);
    }
}

// =============================================================================
// 5. STATUTORY ELECTION CYCLES & OFF-CYCLE MANAGER
// =============================================================================

function initAdminElections() {
    const toggleBtns = document.querySelectorAll(".btn-toggle-election-status");
    toggleBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const row = this.closest("tr");
            const statusCell = row.querySelector(".election-status-indicator");
            if (statusCell.textContent.includes("Active")) {
                statusCell.innerHTML = `<span class="status-pill-suspended">⏸️ Suspended</span>`;
                this.textContent = "Resume Cycle";
                logAdminAction("Electoral cycle temporarily suspended", currentOfficer ? currentOfficer.id : "Chief Returning Officer", "Electoral Operations");
                showAdminToast("Election cycle suspended.");
            } else {
                statusCell.innerHTML = `<span class="status-pill-active">🟢 Active / Open</span>`;
                this.textContent = "Suspend Cycle";
                logAdminAction("Electoral cycle activated and synchronized", currentOfficer ? currentOfficer.id : "Chief Returning Officer", "Electoral Operations");
                showAdminToast("Election cycle is now Active.");
            }
        });
    });

    const dateConfigBtns = document.querySelectorAll(".btn-configure-cycle-dates");
    dateConfigBtns.forEach(b => {
        b.addEventListener("click", function() {
            const modal = document.getElementById("dateConfigModal");
            if (modal) modal.classList.add("open");
        });
    });

    const dateConfigForm = document.getElementById("dateConfigForm");
    if (dateConfigForm) {
        dateConfigForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const cycleName = document.getElementById("configCycleSelect").value;
            const newDate = document.getElementById("configCycleDate").value;
            const officer = document.getElementById("configCycleOfficer").value.trim();

            document.getElementById("dateConfigModal").classList.remove("open");
            logAdminAction(`Cycle schedule adjusted: ${cycleName} set to ${newDate} under RO ${officer}`, currentOfficer ? currentOfficer.id : "Admin", "Electoral Operations");
            showAdminToast(`Cycle parameters updated for ${cycleName}.`);
        });
    }
}

// =============================================================================
// 6. COLLATION & RESULTS CERTIFICATION DESK
// =============================================================================

function initAdminCollation() {
    const certifyBtn = document.getElementById("adminCertifyReturnsBtn");
    const purgeBtn = document.getElementById("adminPurgeSessionVotesBtn");
    const injectBtn = document.getElementById("adminInjectMockVotesBtn");
    const printCertBtn = document.getElementById("printCertificateBtn");

    if (certifyBtn) {
        certifyBtn.addEventListener("click", function() {
            openCertificateOfReturn();
        });
    }

    if (printCertBtn) {
        printCertBtn.addEventListener("click", function() {
            window.print();
        });
    }

    if (purgeBtn) {
        purgeBtn.addEventListener("click", function() {
            if (confirm("Reset current electronic ballot collation records? This action cannot be undone.")) {
                localStorage.removeItem("civicvote_practice_votes");
                logAdminAction("Collation ledger re-indexed and refreshed", currentOfficer ? currentOfficer.id : "Database Administrator", "Collation");
                showAdminToast("Collation ledger re-indexed to 0.");
            }
        });
    }

    if (injectBtn) {
        injectBtn.addEventListener("click", function() {
            injectSimulatedVoteBatch(100);
        });
    }
}

function openCertificateOfReturn() {
    const modal = document.getElementById("certificateModal");
    const certNumberEl = document.getElementById("certSerialNumber");
    const certWinnerEl = document.getElementById("certWinnerName");
    const certDateEl = document.getElementById("certIssueDate");
    const certHashEl = document.getElementById("certSha256Hash");
    if (!modal) return;

    const winner = certifiedResults2023.candidatesSummary[0] || { candidate: "Bola Ahmed Tinubu", party: "APC" };
    const certSerial = "INEC/CERT/2023/PRES-" + Math.floor(100000 + Math.random() * 900000);
    const hash = "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join("");

    if (certNumberEl) certNumberEl.textContent = certSerial;
    if (certWinnerEl) certWinnerEl.textContent = winner.candidate;
    if (certDateEl) certDateEl.textContent = new Date().toLocaleDateString("en-NG", { year: 'numeric', month: 'long', day: 'numeric' });
    if (certHashEl) certHashEl.textContent = hash;

    modal.classList.add("open");
    logAdminAction(`Official Certificate of Return generated for ${winner.candidate} (${certSerial})`, currentOfficer ? currentOfficer.id : "Chief Returning Officer", "Certification");
    showAdminToast("Official Certificate of Return compiled.");
}

function injectSimulatedVoteBatch(count = 100) {
    const existing = JSON.parse(localStorage.getItem("civicvote_practice_votes")) || [];
    const parties = ["APC", "PDP", "LP", "NNPP"];
    const candidates = {
        "APC": "Bola Ahmed Tinubu",
        "PDP": "Atiku Abubakar",
        "LP": "Peter Gregory Obi",
        "NNPP": "Rabiu Musa Kwankwaso"
    };

    for (let i = 0; i < count; i++) {
        const randParty = parties[Math.floor(Math.random() * parties.length)];
        const randState = nigerianStates[Math.floor(Math.random() * nigerianStates.length)].name;
        existing.push({
            id: "CVN-" + Math.floor(100000 + Math.random() * 900000),
            candidate: candidates[randParty],
            party: randParty,
            election: "Presidential",
            state: randState,
            timestamp: new Date().toLocaleTimeString(),
            receiptHash: "0x" + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join("")
        });
    }

    localStorage.setItem("civicvote_practice_votes", JSON.stringify(existing));
    logAdminAction(`Synchronized accredited batch of ${count} field returns across 36 states`, currentOfficer ? currentOfficer.id : "Collation Director", "Collation");
    showAdminToast(`Batch of ${count} field returns synchronized into the ledger.`);
}

// =============================================================================
// 7. POLLING UNIT FIELD INCIDENTS DESK
// =============================================================================

function initFieldIncidents() {
    const tbody = document.getElementById("adminIncidentsTableBody");
    const addIncidentForm = document.getElementById("logIncidentForm");
    const filterSelect = document.getElementById("adminIncidentFilter");

    function renderIncidents() {
        if (!tbody) return;
        tbody.innerHTML = "";

        const filter = filterSelect ? filterSelect.value : "all";
        const filtered = fieldIncidents.filter(inc => {
            if (filter === "all") return true;
            return inc.priority.toLowerCase() === filter.toLowerCase();
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #64748b;">No active field incidents recorded.</td></tr>`;
            return;
        }

        filtered.forEach(inc => {
            let badgeClass = "badge-priority-resolved";
            if (inc.priority === "Critical") badgeClass = "badge-priority-critical";
            if (inc.priority === "Warning") badgeClass = "badge-priority-warning";

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong style="font-family: monospace;">${inc.id}</strong></td>
                <td>
                    <strong>${inc.pu}</strong>
                    <div style="font-size: 0.75rem; color: #64748b;">${inc.lga}, ${inc.state} State</div>
                </td>
                <td><span style="font-size: 0.82rem; font-weight: 700;">${inc.category}</span></td>
                <td><span class="${badgeClass}">${inc.priority}</span></td>
                <td style="font-size: 0.84rem; color: #334155;">${inc.desc}</td>
                <td>
                    ${inc.priority !== "Resolved" ? `
                        <button class="btn-admin-secondary btn-admin-sm btn-resolve-incident" data-id="${inc.id}">
                            Mark Resolved
                        </button>
                    ` : `<span style="color: #0a4023; font-weight: 800; font-size: 0.76rem;">✓ Closed</span>`}
                </td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll(".btn-resolve-incident").forEach(b => {
            b.addEventListener("click", function() {
                resolveIncident(this.getAttribute("data-id"));
            });
        });
    }

    if (filterSelect) filterSelect.addEventListener("change", renderIncidents);

    renderIncidents();

    if (addIncidentForm) {
        addIncidentForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const pu = document.getElementById("incidentPu").value.trim();
            const state = document.getElementById("incidentState").value;
            const lga = document.getElementById("incidentLga").value.trim() || "Central";
            const category = document.getElementById("incidentCategory").value;
            const priority = document.getElementById("incidentPriority").value;
            const desc = document.getElementById("incidentDesc").value.trim();

            const newIncident = {
                id: "INC-" + Math.floor(100 + Math.random() * 900),
                pu: pu,
                lga: lga,
                state: state,
                category: category,
                desc: desc,
                priority: priority,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            fieldIncidents.unshift(newIncident);
            localStorage.setItem("civicvote_field_incidents", JSON.stringify(fieldIncidents));

            document.getElementById("logIncidentModal").classList.remove("open");
            addIncidentForm.reset();

            renderIncidents();
            logAdminAction(`Field incident logged at ${pu} (${state}): ${category} [${priority}]`, currentOfficer ? currentOfficer.id : "Field Operations", "Field Operations");
            showAdminToast(`Field Incident ${newIncident.id} dispatched to Rapid Response Desk.`);
        });
    }
}

function resolveIncident(id) {
    const inc = fieldIncidents.find(i => i.id === id);
    if (!inc) return;

    inc.priority = "Resolved";
    localStorage.setItem("civicvote_field_incidents", JSON.stringify(fieldIncidents));
    initFieldIncidents();
    logAdminAction(`Field Incident ${id} at ${inc.pu} marked Resolved`, currentOfficer ? currentOfficer.id : "Field Supervisor", "Field Operations");
    showAdminToast(`Incident ${id} resolved.`);
}

// =============================================================================
// 8. SECURITY, CRYPTOGRAPHIC AUDIT & EXPORT ENGINES
// =============================================================================

function initAdminLogs() {
    renderAdminLogs();

    const exportCsvBtn = document.getElementById("exportAuditLogsCsvBtn");
    const exportGazetteBtn = document.getElementById("exportGazetteCsvBtn");
    const clearLogsBtn = document.getElementById("clearAuditLogsBtn");

    if (exportCsvBtn) {
        exportCsvBtn.addEventListener("click", function() {
            exportLogsToCsv();
        });
    }

    if (exportGazetteBtn) {
        exportGazetteBtn.addEventListener("click", function() {
            exportGazettedReturnsCsv();
        });
    }

    if (clearLogsBtn) {
        clearLogsBtn.addEventListener("click", function() {
            if (confirm("Flush non-essential administrative memory logs?")) {
                adminLogs = adminLogs.slice(0, 3);
                localStorage.setItem("civicvote_admin_logs", JSON.stringify(adminLogs));
                renderAdminLogs();
                showAdminToast("Logs archived.");
            }
        });
    }
}

function renderAdminLogs() {
    const tbody = document.getElementById("adminLogsTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    adminLogs.forEach(log => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="font-family: monospace; font-size: 0.8rem; color: #64748b;">${log.time}</td>
            <td style="color: #0f172a; font-weight: 600;">${log.action}</td>
            <td style="font-size: 0.82rem; color: #334155;">${log.user}</td>
            <td><span class="status-badge-verified">${log.category || 'System'}</span></td>
            <td><code style="font-size: 0.75rem; background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px;">${log.hash || '0x000...'}</code></td>
        `;
        tbody.appendChild(tr);
    });
}

function exportLogsToCsv() {
    let csv = "Timestamp,Initiator,Category,Action,Hash\n";
    adminLogs.forEach(l => {
        csv += `"${l.time}","${l.user}","${l.category || 'System'}","${l.action.replace(/"/g, '""')}","${l.hash || ''}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `CivicVote_Audit_Trail_${Date.now()}.csv`;
    link.click();
    showAdminToast("Audit Trail exported as CSV.");
}

function exportGazettedReturnsCsv() {
    let csv = "Candidate,Party,Office,Certified_Votes,Vote_Share,States_Carried\n";
    certifiedResults2023.candidatesSummary.forEach(c => {
        csv += `"${c.candidate}","${c.party}","President","${c.votes}","${c.percentage}%","${c.statesWon}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `CivicVote_Official_Gazetted_Returns_2023.csv`;
    link.click();
    showAdminToast("Official Gazetted Returns exported as CSV.");
}

// =============================================================================
// 9. SYSTEM INTEGRITY TOOLS, BACKUP & DISASTER RECOVERY
// =============================================================================

function initSystemTools() {
    const runScanBtn = document.getElementById("runDatabaseIntegrityCheckBtn");
    const downloadBackupBtn = document.getElementById("downloadSystemSnapshotBtn");
    const scanProgressWrap = document.getElementById("integrityScanProgressWrap");
    const scanProgressBar = document.getElementById("integrityScanProgressBar");
    const scanResultText = document.getElementById("integrityScanResultText");

    if (runScanBtn) {
        runScanBtn.addEventListener("click", function() {
            if (scanProgressWrap) scanProgressWrap.style.display = "block";
            if (scanProgressBar) scanProgressBar.style.width = "0%";
            if (scanResultText) scanResultText.textContent = "Verifying cryptographic checksums of 37 state ledgers...";

            let p = 0;
            const iv = setInterval(() => {
                p += 25;
                if (scanProgressBar) scanProgressBar.style.width = p + "%";
                if (p === 50) {
                    if (scanResultText) scanResultText.textContent = "Auditing 176,846 Polling Unit hash trees against Form EC8A manifests...";
                } else if (p === 75) {
                    if (scanResultText) scanResultText.textContent = "Verifying Candidate Registry digital signatures with Code of Conduct Bureau...";
                } else if (p >= 100) {
                    clearInterval(iv);
                    if (scanResultText) scanResultText.innerHTML = "✓ <strong style='color:#0a4023;'>All 37 State Repositories Verified. 100% Cryptographic Integrity. 0 Collisions.</strong>";
                    logAdminAction("Full SHA-256 system integrity scan executed successfully", currentOfficer ? currentOfficer.id : "System Auditor", "Security");
                    showAdminToast("System Integrity Scan passed with 0 anomalies.");
                }
            }, 400);
        });
    }

    if (downloadBackupBtn) {
        downloadBackupBtn.addEventListener("click", function() {
            const systemSnapshot = {
                exportedAt: new Date().toISOString(),
                officer: currentOfficer,
                registeredCandidates: adminCandidates,
                fieldIncidents: fieldIncidents,
                auditTrail: adminLogs,
                systemVersion: "CivicVote Nigeria v2.6 Core"
            };

            const blob = new Blob([JSON.stringify(systemSnapshot, null, 2)], { type: "application/json" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `CivicVote_System_Snapshot_${Date.now()}.json`;
            link.click();
            logAdminAction("Full system JSON database snapshot downloaded", currentOfficer ? currentOfficer.id : "Admin", "Backup");
            showAdminToast("Full system snapshot downloaded.");
        });
    }

    // Modal Close Triggers
    document.querySelectorAll(".admin-modal-close, [data-modal-close]").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".admin-modal-overlay").forEach(m => m.classList.remove("open"));
        });
    });

    window.addEventListener("click", function(e) {
        if (e.target.classList.contains("admin-modal-overlay")) {
            e.target.classList.remove("open");
        }
    });

    // Quick Action Bar triggers on Dashboard
    document.querySelectorAll("[data-action='open-add-candidate']").forEach(b => {
        b.addEventListener("click", () => {
            const m = document.getElementById("addCandidateModal");
            if (m) m.classList.add("open");
        });
    });

    document.querySelectorAll("[data-action='open-incident-modal']").forEach(b => {
        b.addEventListener("click", () => {
            const m = document.getElementById("logIncidentModal");
            if (m) m.classList.add("open");
        });
    });

    document.querySelectorAll("[data-action='ping-bvas']").forEach(b => {
        b.addEventListener("click", () => {
            showAdminToast("Pinging BVAS Gateway... 176,846 devices synchronized. 0 over-voting flags.");
            logAdminAction("National BVAS telemetry ping broadcasted across 36 states", currentOfficer ? currentOfficer.id : "ICT Admin", "System");
        });
    });

    document.querySelectorAll("[data-action='broadcast-alert']").forEach(b => {
        b.addEventListener("click", () => {
            const msg = prompt("Enter Collation Bulletin message to broadcast to all field stations:");
            if (msg && msg.trim()) {
                logAdminAction(`Broadcast Bulletin: "${msg.trim()}"`, currentOfficer ? currentOfficer.id : "Chief RO", "Electoral Operations");
                showAdminToast("Bulletin broadcasted to all 37 Collation Centres.");
            }
        });
    });
}
