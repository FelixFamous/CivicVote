/**
 * CIVICVOTE NIGERIA — PUBLIC PORTAL CONTROLLER
 * Pure Vanilla JavaScript • Multi-page & Component Orchestrator
 */

document.addEventListener("DOMContentLoaded", function() {
    initSharedNavigation();
    initModals();
    
    // Page-specific initializers based on present DOM elements
    if (document.getElementById("candidatesGrid")) {
        initCandidatesPage();
    }

    if (document.getElementById("homeCandidatesPreview")) {
        renderHomeCandidatesPreview();
    }

    if (document.getElementById("statesGridContainer")) {
        initStatesPage();
    }

    if (document.getElementById("ballotInteractiveForm")) {
        initBallotSimulation();
    }

    if (document.getElementById("resultsSummaryRow")) {
        initResultsDashboard();
    }

    if (document.querySelector(".accordion-item")) {
        initAccordions();
    }

    if (document.getElementById("civicContactForm")) {
        initContactForm();
    }
});

/**
 * 1. SHARED NAVIGATION & MOBILE MENU
 */
function initSharedNavigation() {
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            navMenu.classList.toggle("active");
        });

        document.addEventListener("click", function(e) {
            if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && e.target !== mobileBtn) {
                navMenu.classList.remove("active");
            }
        });
    }

    // Notice Bar Close
    const closeNoticeBtn = document.querySelector(".notice-close-btn");
    if (closeNoticeBtn) {
        closeNoticeBtn.addEventListener("click", function() {
            const bar = document.querySelector(".top-official-notice-bar");
            if (bar) bar.style.display = "none";
        });
    }
}

/**
 * 2. MODAL SYSTEM
 */
function initModals() {
    window.addEventListener("click", function(event) {
        if (event.target.classList.contains("modal-overlay")) {
            event.target.classList.remove("open");
            document.body.style.overflow = "";
        }
    });

    window.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
            document.body.style.overflow = "";
        }
    });
}

/**
 * 3. CANDIDATES DIRECTORY (candidates.html)
 */
function initCandidatesPage() {
    const searchInput = document.getElementById("candidateSearch");
    const partyFilter = document.getElementById("candidatePartyFilter");
    const positionFilter = document.getElementById("candidatePositionFilter");
    const stateFilter = document.getElementById("candidateStateFilter");
    const resetBtn = document.getElementById("resetCandidateFiltersBtn");

    // Populate Party Dropdown
    if (partyFilter && partyFilter.options.length <= 1) {
        politicalParties.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.code;
            opt.textContent = `${p.code} — ${p.name}`;
            partyFilter.appendChild(opt);
        });
    }

    // Populate State Dropdown
    if (stateFilter && stateFilter.options.length <= 1) {
        nigerianStates.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s.name;
            opt.textContent = s.name;
            stateFilter.appendChild(opt);
        });
    }

    function applyCandidateFilters() {
        const query = searchInput ? searchInput.value : "";
        const party = partyFilter ? partyFilter.value : "all";
        const position = positionFilter ? positionFilter.value : "all";
        const state = stateFilter ? stateFilter.value : "all";

        renderCandidates({
            search: query,
            party: party,
            position: position,
            state: state
        });
    }

    if (searchInput) searchInput.addEventListener("input", applyCandidateFilters);
    if (partyFilter) partyFilter.addEventListener("change", applyCandidateFilters);
    if (positionFilter) positionFilter.addEventListener("change", applyCandidateFilters);
    if (stateFilter) stateFilter.addEventListener("change", applyCandidateFilters);

    if (resetBtn) {
        resetBtn.addEventListener("click", function() {
            if (searchInput) searchInput.value = "";
            if (partyFilter) partyFilter.value = "all";
            if (positionFilter) positionFilter.value = "all";
            if (stateFilter) stateFilter.value = "all";
            renderCandidates();
        });
    }

    renderCandidates();
}

function renderCandidates(filterOptions = {}) {
    const container = document.getElementById("candidatesGrid");
    const countDisplay = document.getElementById("candidateCountText");
    if (!container) return;

    const searchTerm = (filterOptions.search || "").toLowerCase().trim();
    const selectedParty = filterOptions.party || "all";
    const selectedPosition = filterOptions.position || "all";
    const selectedState = filterOptions.state || "all";

    const filtered = candidatesData.filter(cand => {
        const matchesSearch = cand.name.toLowerCase().includes(searchTerm) ||
                              cand.constituency.toLowerCase().includes(searchTerm) ||
                              cand.party.toLowerCase().includes(searchTerm);
        
        const matchesParty = (selectedParty === "all") || (cand.party === selectedParty);
        const matchesPosition = (selectedPosition === "all") || (cand.position === selectedPosition);
        const matchesState = (selectedState === "all") || (cand.state === selectedState);

        return matchesSearch && matchesParty && matchesPosition && matchesState;
    });

    if (countDisplay) {
        countDisplay.textContent = `Showing ${filtered.length} Verified Candidate${filtered.length === 1 ? "" : "s"}`;
    }

    container.innerHTML = "";

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; background: #ffffff; border: 2px dashed #e5e7eb; border-radius: 8px; padding: 3rem 1.5rem; text-align: center;">
                <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🔍</div>
                <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">No Candidates Match Your Filter</h3>
                <p style="color: #6b7280; margin-bottom: 1.25rem;">Try adjusting your keywords, party selection, or state filter.</p>
                <button class="btn-official-outline" onclick="document.getElementById('resetCandidateFiltersBtn')?.click()">Reset All Filters</button>
            </div>
        `;
        return;
    }

    filtered.forEach(cand => {
        const partyInfo = politicalParties.find(p => p.code === cand.party) || {
            color: "#4B5563",
            name: cand.party
        };

        const card = document.createElement("div");
        card.className = "candidate-card";
        card.innerHTML = `
            <div class="card-candidate-photo-wrap">
                <img src="${cand.photo}" alt="${cand.name}" class="card-candidate-img" 
                     onerror="if (!this.dataset.fb && '${cand.wikiFile || ''}') { this.dataset.fb='1'; this.src='https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(cand.wikiFile)}'; } else { this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0a4023&color=fff&size=256'; }">
                <div class="card-party-overlay-pill" style="border-left: 3px solid ${partyInfo.color};">
                    <span style="color: ${partyInfo.color};">${cand.party}</span>
                </div>
            </div>
            <div class="card-body-content">
                <span class="card-candidate-role">${cand.position}</span>
                <h3 class="card-candidate-name">${cand.name}</h3>
                <p class="card-party-subname">${partyInfo.name}</p>
                
                <div class="card-meta-row">
                    <span>📍</span>
                    <span>${cand.constituency} (${cand.state})</span>
                </div>

                ${cand.runningMate !== "N/A (Legislative Seat)" ? `
                    <div class="card-running-mate-box">
                        <span style="color: #6b7280;">Running Mate:</span> <strong>${cand.runningMate}</strong>
                    </div>
                ` : ""}

                <div class="card-footer-action">
                    <span class="status-badge-dot">● Official Candidate</span>
                    <button class="btn-official-green view-profile-btn" style="padding: 0.4rem 0.85rem; font-size: 0.82rem;" data-candidate-id="${cand.id}">
                        View Profile
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll(".view-profile-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const cId = this.getAttribute("data-candidate-id");
            viewCandidateProfile(cId);
        });
    });
}

function renderHomeCandidatesPreview() {
    const container = document.getElementById("homeCandidatesPreview");
    if (!container) return;

    // Pick top prominent candidates across parties (Presidential & Key Governors)
    const featuredList = candidatesData.filter(c => 
        c.position === "President" || c.id === "gov-lag-sanwoolu" || c.id === "gov-kano-abba" || c.id === "gov-abi-otti"
    ).slice(0, 6);

    container.innerHTML = "";

    featuredList.forEach(cand => {
        const partyInfo = politicalParties.find(p => p.code === cand.party) || {
            color: "#0a472e",
            name: cand.party
        };

        const card = document.createElement("div");
        card.className = "candidate-card";
        card.innerHTML = `
            <div class="card-candidate-photo-wrap">
                <img src="${cand.photo}" alt="${cand.name}" class="card-candidate-img"
                     onerror="if (!this.dataset.fb && '${cand.wikiFile || ''}') { this.dataset.fb='1'; this.src='https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(cand.wikiFile)}'; } else { this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0a4023&color=fff&size=256'; }">
                <div class="card-party-overlay-pill" style="border-left: 3px solid ${partyInfo.color};">
                    <span style="color: ${partyInfo.color}; font-weight: 800;">${cand.party}</span>
                </div>
            </div>
            
            <div class="card-body-content">
                <span class="card-candidate-role">${cand.position}</span>
                <h3 class="card-candidate-name">${cand.name}</h3>
                <p class="card-party-subname">${partyInfo.name}</p>
                
                <div class="card-meta-row">
                    <span>📍</span>
                    <span>${cand.constituency}</span>
                </div>

                ${cand.runningMate && cand.runningMate !== "N/A (Legislative Seat)" ? `
                    <div class="card-running-mate-box">
                        <span style="color: #6b7280;">Running Mate:</span> <strong>${cand.runningMate}</strong>
                    </div>
                ` : ""}

                <div class="card-footer-action">
                    <span class="status-badge-dot">● Official Candidate</span>
                    <button class="btn-official-green view-profile-btn" style="padding: 0.4rem 0.85rem; font-size: 0.82rem;" data-candidate-id="${cand.id}">
                        View Profile
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll(".view-profile-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const cId = this.getAttribute("data-candidate-id");
            viewCandidateProfile(cId);
        });
    });
}

function viewCandidateProfile(candidateId) {
    const candidate = candidatesData.find(c => c.id === candidateId);
    if (!candidate) return;

    const modal = document.getElementById("candidateModal");
    const body = document.getElementById("candidateModalBody");
    if (!modal || !body) return;

    const partyInfo = politicalParties.find(p => p.code === candidate.party) || {
        color: "#0a472e",
        name: candidate.party
    };

    let experienceListHtml = "";
    if (candidate.experience && candidate.experience.length > 0) {
        experienceListHtml = candidate.experience.map(exp => `<li>${exp}</li>`).join("");
    }

    body.innerHTML = `
        <div class="modal-profile-header-strip" style="border-top: 5px solid ${partyInfo.color};">
            <img src="${candidate.photo}" alt="${candidate.name}" class="modal-profile-img"
                 onerror="if (!this.dataset.fb && '${candidate.wikiFile || ''}') { this.dataset.fb='1'; this.src='https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(candidate.wikiFile)}'; } else { this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=0a4023&color=fff&size=256'; }">
            <div>
                <span style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; color: var(--gov-green-700);">${candidate.position} Contestant / Official</span>
                <h2 style="font-family: var(--font-heading); font-size: 1.85rem; font-weight: 900; color: #111827; margin: 0.2rem 0;">${candidate.name}</h2>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <span style="background: ${partyInfo.color}; color: #fff; font-size: 0.78rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 4px;">${candidate.party}</span>
                    <span style="font-size: 0.88rem; color: #4b5563;">${partyInfo.name}</span>
                </div>
                <p style="font-size: 0.85rem; color: #6b7280;">📍 ${candidate.constituency} (${candidate.state})</p>
            </div>
        </div>

        <div class="modal-content-body">
            <div style="margin-bottom: 1.75rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Verified Biography</h4>
                <p style="font-size: 0.95rem; line-height: 1.65; color: #374151;">${candidate.biography}</p>
            </div>

            <div class="modal-meta-grid" style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 6px; padding: 1.25rem; margin-bottom: 1.75rem;">
                <div>
                    <span style="display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #6b7280;">Education</span>
                    <span style="font-size: 0.88rem; font-weight: 600; color: #111827;">${candidate.education}</span>
                </div>
                <div>
                    <span style="display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #6b7280;">Running Mate</span>
                    <span style="font-size: 0.88rem; font-weight: 600; color: #111827;">${candidate.runningMate}</span>
                </div>
                <div>
                    <span style="display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #6b7280;">Official Status</span>
                    <span style="font-size: 0.88rem; font-weight: 600; color: #111827;">${candidate.status}</span>
                </div>
                <div>
                    <span style="display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #6b7280;">Origin / Representation</span>
                    <span style="font-size: 0.88rem; font-weight: 600; color: #111827;">${candidate.state}</span>
                </div>
            </div>

            ${experienceListHtml ? `
                <div style="margin-bottom: 1.75rem;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Public Service Track Record</h4>
                    <ul style="font-size: 0.92rem; color: #374151; display: flex; flex-direction: column; gap: 0.4rem;">
                        ${experienceListHtml}
                    </ul>
                </div>
            ` : ""}

            <div style="background: #fef8eb; border-left: 4px solid #c2902d; padding: 1.25rem; border-radius: 6px; margin-bottom: 1.5rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: #8a6114; margin-bottom: 0.5rem;">Key Policy Agenda & Manifesto Highlights</h4>
                <p style="font-size: 0.94rem; color: #374151; line-height: 1.6;">${candidate.manifesto}</p>
            </div>

            <div style="font-size: 0.76rem; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 0.75rem;">
                <strong>Source Attribution:</strong> ${candidate.source}
            </div>
        </div>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeCandidateModal() {
    const modal = document.getElementById("candidateModal");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }
}

/**
 * 4. STATES & FCT DIRECTORY (states.html)
 */
function initStatesPage() {
    const searchInput = document.getElementById("stateSearchInput");
    const zoneSelect = document.getElementById("stateZoneSelect");

    function applyStateFilters() {
        const query = searchInput ? searchInput.value : "";
        const zone = zoneSelect ? zoneSelect.value : "all";
        renderStatesGrid(zone, query);
    }

    if (searchInput) searchInput.addEventListener("input", applyStateFilters);
    if (zoneSelect) zoneSelect.addEventListener("change", applyStateFilters);

    renderStatesGrid();
}

function renderStatesGrid(zoneFilter = "all", searchQuery = "") {
    const container = document.getElementById("statesGridContainer");
    const countDisplay = document.getElementById("statesCountDisplay");
    if (!container) return;

    const cleanQuery = searchQuery.toLowerCase().trim();

    const filtered = nigerianStates.filter(st => {
        const matchesZone = (zoneFilter === "all") || (st.zone.toLowerCase().includes(zoneFilter.toLowerCase()));
        const matchesSearch = st.name.toLowerCase().includes(cleanQuery) ||
                              st.capital.toLowerCase().includes(cleanQuery);
        return matchesZone && matchesSearch;
    });

    if (countDisplay) {
        countDisplay.textContent = `Displaying ${filtered.length} of 37 Electoral Units`;
    }

    container.innerHTML = "";

    filtered.forEach(st => {
        let cycleBadgeClass = "status-regular";
        if (st.govCycle.includes("Off-Cycle")) cycleBadgeClass = "status-offcycle";
        if (st.govCycle.includes("No Governorship")) cycleBadgeClass = "status-fct";

        const card = document.createElement("div");
        card.className = "state-card";
        card.innerHTML = `
            <div class="state-card-top">
                <span class="state-code-pill">${st.code}</span>
                <span class="state-zone-label">${st.zone}</span>
            </div>
            
            <h3 class="state-title-h3">${st.name}</h3>
            <p class="state-cap-text">Capital: <strong>${st.capital}</strong></p>

            <div class="state-stat-grid-3">
                <div>
                    <span class="state-stat-val">${st.lgas}</span>
                    <span class="state-stat-sub">${st.name === "Federal Capital Territory" ? "Councils" : "LGAs"}</span>
                </div>
                <div>
                    <span class="state-stat-val">${st.regVoters.split(",")[0]}K+</span>
                    <span class="state-stat-sub">Voters</span>
                </div>
                <div>
                    <span class="state-stat-val">${st.senatorialDistricts.length}</span>
                    <span class="state-stat-sub">Districts</span>
                </div>
            </div>

            <div class="gov-cycle-status-pill ${cycleBadgeClass}">
                ${st.govCycle}
            </div>

            <button class="btn-official-outline view-state-btn" style="margin-top: auto; width: 100%; justify-content: center;" data-state-name="${st.name}">
                Explore ${st.name} →
            </button>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll(".view-state-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const sName = this.getAttribute("data-state-name");
            viewStateModal(sName);
        });
    });
}

function viewStateModal(stateName) {
    const state = nigerianStates.find(s => s.name === stateName);
    if (!state) return;

    const modal = document.getElementById("stateModal");
    const title = document.getElementById("stateModalTitle");
    const body = document.getElementById("stateModalBody");
    if (!modal || !body) return;

    if (title) title.textContent = `${state.name} State Electoral Profile`;

    const stateCandidates = candidatesData.filter(c => c.state === state.name);

    let candidateHtml = "";
    if (stateCandidates.length > 0) {
        candidateHtml = `
            <div style="margin-top: 1.5rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Verified State Candidates</h4>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${stateCandidates.map(c => `
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.75rem 1rem; border-radius: 6px;">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <img src="${c.photo}" alt="${c.name}" style="width: 44px; height: 44px; border-radius: 4px; object-fit: cover;"
                                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=0a4023&color=fff';">
                                <div>
                                    <strong style="color: #111827;">${c.name}</strong>
                                    <div style="font-size: 0.78rem; color: #6b7280;">${c.position} (${c.party})</div>
                                </div>
                            </div>
                            <button class="btn-official-outline view-profile-btn" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;" data-candidate-id="${c.id}">
                                Details
                            </button>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    } else {
        candidateHtml = `
            <div style="margin-top: 1.5rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Electoral Contestants</h4>
                <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 1rem;">View all legislative and gubernatorial candidates registered under ${state.name} State.</p>
                <a href="candidates.html" class="btn-official-green">
                    Browse National Candidates Directory &rarr;
                </a>
            </div>
        `;
    }

    body.innerHTML = `
        <div class="state-modal-stats-grid" style="margin-bottom: 1.5rem;">
            <div style="background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.85rem; border-radius: 6px; text-align: center;">
                <span style="display: block; font-size: 0.72rem; font-weight: 700; color: #6b7280; text-transform: uppercase;">Zone</span>
                <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--gov-green-900);">${state.zone}</span>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.85rem; border-radius: 6px; text-align: center;">
                <span style="display: block; font-size: 0.72rem; font-weight: 700; color: #6b7280; text-transform: uppercase;">Capital</span>
                <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--gov-green-900);">${state.capital}</span>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.85rem; border-radius: 6px; text-align: center;">
                <span style="display: block; font-size: 0.72rem; font-weight: 700; color: #6b7280; text-transform: uppercase;">${state.name === 'Federal Capital Territory' ? 'Councils' : 'LGAs'}</span>
                <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--gov-green-900);">${state.lgas}</span>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e5e7eb; padding: 0.85rem; border-radius: 6px; text-align: center;">
                <span style="display: block; font-size: 0.72rem; font-weight: 700; color: #6b7280; text-transform: uppercase;">Reg. Voters</span>
                <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--gov-green-900);">${state.regVoters}</span>
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Governorship Status</h4>
            <div style="background: #f8fafc; border-left: 3px solid var(--gov-green-700); padding: 1rem; border-radius: 6px; font-size: 0.9rem;">
                <p><strong>Cycle:</strong> ${state.govCycle}</p>
                <p><strong>Current Leadership:</strong> ${state.currentGov}</p>
                <p style="margin-top: 0.35rem; color: #4b5563;">${state.govNotes}</p>
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem; margin-bottom: 0.75rem;">Senatorial Districts (${state.senatorialDistricts.length})</h4>
            <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.4rem; font-size: 0.9rem;">
                ${state.senatorialDistricts.map(dist => `<li>📍 ${dist}</li>`).join("")}
            </ul>
        </div>

        ${candidateHtml}
    `;

    body.querySelectorAll(".view-profile-btn").forEach(b => {
        b.addEventListener("click", function() {
            const cid = this.getAttribute("data-candidate-id");
            closeStateModal();
            viewCandidateProfile(cid);
        });
    });

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeStateModal() {
    const modal = document.getElementById("stateModal");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }
}

/**
 * 5. ELECTRONIC PRACTICE BALLOT SIMULATOR (ballot.html)
 */
let selectedBallotCandidate = null;

function initBallotSimulation() {
    const electionSelect = document.getElementById("ballotElectionSelect");
    const stateSelect = document.getElementById("ballotStateSelect");
    const stepCandidatesSection = document.getElementById("ballotCandidateSection");
    const reviewBtn = document.getElementById("ballotReviewBtn");
    const reviewModal = document.getElementById("ballotReviewModal");
    const confirmCastBtn = document.getElementById("confirmCastVoteBtn");
    const cancelReviewBtn = document.getElementById("cancelReviewVoteBtn");
    const successScreen = document.getElementById("ballotSuccessScreen");
    const resetBallotBtn = document.getElementById("resetBallotBtn");

    if (stateSelect) {
        stateSelect.innerHTML = `<option value="">-- Choose Your State / FCT --</option>`;
        nigerianStates.forEach(st => {
            const opt = document.createElement("option");
            opt.value = st.name;
            opt.textContent = st.name;
            stateSelect.appendChild(opt);
        });
    }

    function updateBallotCandidateChoices() {
        selectedBallotCandidate = null;
        if (reviewBtn) {
            reviewBtn.disabled = true;
            reviewBtn.classList.add("btn-disabled");
        }

        const election = electionSelect ? electionSelect.value : "";
        const state = stateSelect ? stateSelect.value : "";

        if (!election || !state) {
            if (stepCandidatesSection) stepCandidatesSection.classList.add("hidden");
            return;
        }

        if (stepCandidatesSection) stepCandidatesSection.classList.remove("hidden");

        let eligibleCandidates = [];
        if (election === "Presidential") {
            eligibleCandidates = candidatesData.filter(c => c.position === "President");
        } else if (election === "Governorship") {
            eligibleCandidates = candidatesData.filter(c => c.position === "Governor" && c.state === state);
            if (eligibleCandidates.length === 0) {
                eligibleCandidates = candidatesData.filter(c => c.position === "Governor").slice(0, 4);
            }
        } else {
            eligibleCandidates = candidatesData.filter(c => c.state === state);
            if (eligibleCandidates.length === 0) {
                eligibleCandidates = candidatesData.filter(c => c.position === "Senator").slice(0, 4);
            }
        }

        renderBallotOptions(eligibleCandidates);
    }

    if (electionSelect) electionSelect.addEventListener("change", updateBallotCandidateChoices);
    if (stateSelect) stateSelect.addEventListener("change", updateBallotCandidateChoices);

    if (reviewBtn) {
        reviewBtn.addEventListener("click", function() {
            if (!selectedBallotCandidate) {
                alert("Please select a candidate on the ballot before proceeding.");
                return;
            }
            showBallotReviewModal();
        });
    }

    if (cancelReviewBtn) {
        cancelReviewBtn.addEventListener("click", function() {
            if (reviewModal) reviewModal.classList.remove("open");
        });
    }

    if (confirmCastBtn) {
        confirmCastBtn.addEventListener("click", function() {
            submitSimulatedVote();
        });
    }

    if (resetBallotBtn) {
        resetBallotBtn.addEventListener("click", function() {
            if (successScreen) successScreen.classList.add("hidden");
            const ballotForm = document.getElementById("ballotInteractiveForm");
            if (ballotForm) ballotForm.classList.remove("hidden");
            if (electionSelect) electionSelect.value = "Presidential";
            if (stateSelect) stateSelect.value = "";
            selectedBallotCandidate = null;
            if (stepCandidatesSection) stepCandidatesSection.classList.add("hidden");
        });
    }
}

function renderBallotOptions(candidatesList) {
    const container = document.getElementById("ballotCandidateChoices");
    const reviewBtn = document.getElementById("ballotReviewBtn");
    if (!container) return;

    container.innerHTML = "";

    candidatesList.forEach(cand => {
        const partyInfo = politicalParties.find(p => p.code === cand.party) || {
            color: "#0a4023",
            name: cand.party
        };

        const item = document.createElement("div");
        item.className = "ballot-candidate-item";
        item.setAttribute("data-cand-id", cand.id);
        item.innerHTML = `
            <div>
                <input type="radio" name="ballotCandidateChoice" id="choice-${cand.id}" value="${cand.id}" style="width: 20px; height: 20px; accent-color: #0e542f; cursor: pointer;">
            </div>
            <div>
                <img src="${cand.photo}" alt="${cand.name}" class="ballot-thumb-photo"
                     onerror="if (!this.dataset.fb && '${cand.wikiFile || ''}') { this.dataset.fb='1'; this.src='https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(cand.wikiFile)}'; } else { this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0a4023&color=fff'; }">
            </div>
            <div class="ballot-party-box" style="background-color: ${partyInfo.color};">
                ${cand.party}
            </div>
            <div>
                <h4 class="ballot-cand-title">${cand.name}</h4>
                <p class="ballot-cand-party-sub">${partyInfo.name}</p>
                <span class="ballot-cand-running">Running Mate: ${cand.runningMate}</span>
            </div>
            <div style="font-size: 1.5rem; text-align: center;">
                🗳️
            </div>
        `;

        item.addEventListener("click", function() {
            const radio = item.querySelector("input[type='radio']");
            if (radio) radio.checked = true;

            document.querySelectorAll(".ballot-candidate-item").forEach(el => el.classList.remove("selected"));
            item.classList.add("selected");

            selectedBallotCandidate = cand;

            if (reviewBtn) {
                reviewBtn.disabled = false;
                reviewBtn.classList.remove("btn-disabled");
            }
        });

        container.appendChild(item);
    });
}

function showBallotReviewModal() {
    if (!selectedBallotCandidate) return;

    const modal = document.getElementById("ballotReviewModal");
    const container = document.getElementById("ballotReviewDetails");
    const electionSelect = document.getElementById("ballotElectionSelect");
    const stateSelect = document.getElementById("ballotStateSelect");
    if (!modal || !container) return;

    const partyInfo = politicalParties.find(p => p.code === selectedBallotCandidate.party) || {
        color: "#0a4023",
        name: selectedBallotCandidate.party
    };

    container.innerHTML = `
        <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 6px; padding: 1.25rem; margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <img src="${selectedBallotCandidate.photo}" alt="${selectedBallotCandidate.name}" style="width: 60px; height: 60px; border-radius: 6px; object-fit: cover; border: 2px solid ${partyInfo.color};"
                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(selectedBallotCandidate.name)}&background=0a4023&color=fff';">
                <div>
                    <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #12683a;">Marked Choice</span>
                    <h3 style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 900; color: #111827;">${selectedBallotCandidate.name}</h3>
                    <span style="background: ${partyInfo.color}; color: #fff; font-size: 0.75rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 4px;">
                        ${selectedBallotCandidate.party} — ${partyInfo.name}
                    </span>
                </div>
            </div>

            <div style="font-size: 0.88rem; color: #374151; display: flex; flex-direction: column; gap: 0.35rem; border-top: 1px dashed #e5e7eb; padding-top: 0.75rem;">
                <div><strong>Election Category:</strong> ${electionSelect ? electionSelect.value : 'General Election'}</div>
                <div><strong>Voting Jurisdiction:</strong> ${stateSelect ? stateSelect.value : 'Federal Republic of Nigeria'}</div>
                <div><strong>Running Mate:</strong> ${selectedBallotCandidate.runningMate}</div>
            </div>
        </div>

        <p style="font-size: 0.82rem; color: #6b7280; text-align: center;">
            🛡️ <em>Notice: Clicking Confirm will register a simulated voter token in the frontend session ledger.</em>
        </p>
    `;

    modal.classList.add("open");
}

function submitSimulatedVote() {
    if (!selectedBallotCandidate) return;

    const reviewModal = document.getElementById("ballotReviewModal");
    if (reviewModal) reviewModal.classList.remove("open");

    const ballotForm = document.getElementById("ballotInteractiveForm");
    const successScreen = document.getElementById("ballotSuccessScreen");
    const receiptContainer = document.getElementById("ballotReceiptSlip");
    const electionSelect = document.getElementById("ballotElectionSelect");
    const stateSelect = document.getElementById("ballotStateSelect");

    const voteRecord = {
        id: "CVN-" + Math.floor(100000 + Math.random() * 900000),
        candidate: selectedBallotCandidate.name,
        party: selectedBallotCandidate.party,
        election: electionSelect ? electionSelect.value : "Presidential",
        state: stateSelect ? stateSelect.value : "Nationwide",
        timestamp: new Date().toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "medium" }),
        receiptHash: "0x" + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join("")
    };

    // Store in localStorage
    const existingVotes = JSON.parse(localStorage.getItem("civicvote_practice_votes")) || [];
    existingVotes.unshift(voteRecord);
    localStorage.setItem("civicvote_practice_votes", JSON.stringify(existingVotes));

    if (ballotForm) ballotForm.classList.add("hidden");
    if (successScreen) successScreen.classList.remove("hidden");

    if (receiptContainer) {
        receiptContainer.innerHTML = `
            <div class="ballot-receipt-box">
                <div class="receipt-crest-center">
                    <div style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 900; color: #0a4023;">CIVICVOTE NIGERIA</div>
                    <div style="font-size: 0.78rem; font-weight: 700; color: #6b7280; text-transform: uppercase;">Official Practice Voting Verification Slip</div>
                    <small style="color: #9ca3af;">(Educational Mock Record — Non-Legal)</small>
                </div>

                <div class="receipt-data-row">
                    <span style="color: #6b7280;">Token Serial No:</span>
                    <strong style="font-family: monospace;">${voteRecord.id}</strong>
                </div>
                <div class="receipt-data-row">
                    <span style="color: #6b7280;">Marked Candidate:</span>
                    <strong style="color: #111827;">${voteRecord.candidate}</strong>
                </div>
                <div class="receipt-data-row">
                    <span style="color: #6b7280;">Political Party:</span>
                    <strong>${voteRecord.party}</strong>
                </div>
                <div class="receipt-data-row">
                    <span style="color: #6b7280;">Election:</span>
                    <span>${voteRecord.election}</span>
                </div>
                <div class="receipt-data-row">
                    <span style="color: #6b7280;">Jurisdiction:</span>
                    <span>${voteRecord.state}</span>
                </div>
                <div class="receipt-data-row">
                    <span style="color: #6b7280;">Time of Generation:</span>
                    <span>${voteRecord.timestamp}</span>
                </div>
                <div class="receipt-data-row" style="border-bottom: none; flex-direction: column; gap: 0.2rem; margin-top: 0.5rem;">
                    <span style="color: #6b7280; font-size: 0.72rem;">Cryptographic Hash:</span>
                    <span style="font-family: monospace; font-size: 0.7rem; color: #0a4023; word-break: break-all;">${voteRecord.receiptHash}</span>
                </div>
            </div>
        `;
    }
}

/**
 * 6. RESULTS DASHBOARD (results.html)
 */
function initResultsDashboard() {
    renderCertifiedSummaryCards();
    renderStateLeadingTable();
    renderSessionPracticeVotes();
}

function renderCertifiedSummaryCards() {
    const container = document.getElementById("resultsSummaryRow");
    if (!container) return;

    container.innerHTML = "";

    certifiedResults2023.candidatesSummary.forEach(c => {
        const card = document.createElement("div");
        card.className = "result-card-box";
        card.style.borderTopColor = c.color;
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <div>
                    <span style="background: ${c.color}; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 4px;">${c.party}</span>
                    <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 900; color: #111827; margin-top: 0.35rem;">${c.candidate}</h4>
                </div>
                <span class="res-pct-val">${c.percentage}%</span>
            </div>

            <div class="res-bar-track">
                <div class="res-bar-fill" style="width: ${c.percentage}%; background-color: ${c.color};"></div>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #6b7280; margin-top: 0.5rem;">
                <span>Total Votes: <strong>${c.votes.toLocaleString()}</strong></span>
                <span>Won: <strong>${c.statesWon} States</strong></span>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderStateLeadingTable() {
    const tbody = document.getElementById("stateResultsTableBody");
    const select = document.getElementById("resultsStateSelect");
    if (!tbody) return;

    if (select && select.options.length <= 1) {
        select.innerHTML = `<option value="all">All 36 States & FCT</option>`;
        certifiedResults2023.stateLeadingData.forEach(st => {
            const opt = document.createElement("option");
            opt.value = st.state;
            opt.textContent = st.state;
            select.appendChild(opt);
        });

        select.addEventListener("change", function() {
            renderFilteredStateRows(this.value);
        });
    }

    renderFilteredStateRows("all");

    function renderFilteredStateRows(filterState) {
        tbody.innerHTML = "";
        const data = (filterState === "all")
            ? certifiedResults2023.stateLeadingData
            : certifiedResults2023.stateLeadingData.filter(d => d.state === filterState);

        data.forEach((row, idx) => {
            const tr = document.createElement("tr");
            tr.style.borderBottom = "1px solid var(--gov-border)";
            tr.innerHTML = `
                <td style="padding: 0.65rem; color: #6b7280; font-size: 0.8rem;">${idx + 1}</td>
                <td style="padding: 0.65rem; font-weight: 700; color: #111827;">${row.state}</td>
                <td style="padding: 0.65rem;">
                    <span style="background: ${row.leadingParty === 'APC' ? '#007A3D' : row.leadingParty === 'PDP' ? '#C8102E' : '#F7931E'}; color: #fff; font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.45rem; border-radius: 4px;">
                        ${row.leadingParty}
                    </span>
                </td>
                <td style="padding: 0.65rem; color: #374151;">${row.winner}</td>
                <td style="padding: 0.65rem; font-weight: 600;">${row.votes.toLocaleString()}</td>
                <td style="padding: 0.65rem;"><span style="color: #0a4023; font-weight: 700; font-size: 0.78rem;">✓ Certified</span></td>
            `;
            tbody.appendChild(tr);
        });
    }
}

function renderSessionPracticeVotes() {
    const container = document.getElementById("practiceSessionVotesList");
    const countDisplay = document.getElementById("practiceSessionCount");
    if (!container) return;

    const sessionVotes = JSON.parse(localStorage.getItem("civicvote_practice_votes")) || [];
    if (countDisplay) countDisplay.textContent = sessionVotes.length;

    container.innerHTML = "";

    if (sessionVotes.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem; color: #6b7280; font-size: 0.88rem;">
                <p>No practice votes submitted in this browser session yet.</p>
                <a href="ballot.html" class="btn-official-outline" style="margin-top: 1rem; font-size: 0.8rem;">Cast a Practice Ballot &rarr;</a>
            </div>
        `;
        return;
    }

    sessionVotes.slice(0, 8).forEach(v => {
        const item = document.createElement("div");
        item.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0; border-bottom: 1px dotted var(--gov-border); font-size: 0.84rem;";
        item.innerHTML = `
            <div>
                <strong>${v.candidate}</strong>
                <span style="font-size: 0.75rem; color: #6b7280; margin-left: 0.35rem;">(${v.party} • ${v.state})</span>
            </div>
            <span style="font-family: monospace; font-size: 0.75rem; color: #0a4023; background: #eefbf3; padding: 0.1rem 0.4rem; border-radius: 3px;">
                ${v.id}
            </span>
        `;
        container.appendChild(item);
    });
}

/**
 * 7. FAQ ACCORDIONS (about.html)
 */
function initAccordions() {
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", function() {
            const item = this.closest(".accordion-item");
            const content = item.querySelector(".accordion-content");
            const isOpen = item.classList.contains("open");

            document.querySelectorAll(".accordion-item").forEach(other => {
                other.classList.remove("open");
                const otherContent = other.querySelector(".accordion-content");
                if (otherContent) otherContent.style.display = "none";
            });

            if (!isOpen) {
                item.classList.add("open");
                if (content) content.style.display = "block";
            }
        });
    });
}

/**
 * 8. CONTACT FEEDBACK FORM (about.html)
 */
function initContactForm() {
    const form = document.getElementById("civicContactForm");
    const successMsg = document.getElementById("contactSuccessMessage");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        if (successMsg) {
            successMsg.classList.remove("hidden");
            form.reset();
            setTimeout(() => {
                successMsg.classList.add("hidden");
            }, 6000);
        }
    });
}
