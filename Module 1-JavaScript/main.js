// ============================================
// 1. Welcome message + console & alert
// ============================================
console.log("Welcome to the Community Portal");
window.addEventListener("DOMContentLoaded", () => {
    alert("Welcome to Neighborly! Explore local events and connect with your community.");
    initEventSystem();
    setupEventHandlers();
    setupVideoListener();
    setupLocalStoragePref();
});

// ============================================
// 2. MOCK EVENT DATA (Arrays + objects)
// ============================================
let eventsData = [
    { id: 1, name: "Jazz under the stars", category: "Music", date: "2025-06-15", seats: 45, fee: "$12", description: "Outdoor jazz concert with local artists" },
    { id: 2, name: "Intro to urban gardening", category: "Workshop", date: "2025-06-18", seats: 20, fee: "Free", description: "Learn to grow your own vegetables" },
    { id: 3, name: "Community potluck", category: "Food", date: "2025-06-22", seats: 60, fee: "$5", description: "Share a dish and meet your neighbors" },
    { id: 4, name: "River cleanup drive", category: "Volunteer", date: "2025-06-25", seats: 35, fee: "Free", description: "Help keep our river clean" },
    { id: 5, name: "Folk music workshop", category: "Music", date: "2025-07-01", seats: 25, fee: "$8", description: "Bring your instruments and learn folk tunes" }
];

// Function to display events using DOM manipulation (map, filter)
function renderEventCards(filterCategory = "all", searchTerm = "") {
    const container = document.getElementById("eventGallery");
    if (!container) return;
    
    let filtered = eventsData.filter(ev => filterCategory === "all" || ev.category === filterCategory);
    if (searchTerm.trim() !== "") {
        filtered = filtered.filter(ev => 
            ev.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            ev.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (filtered.length === 0) {
        container.innerHTML = `<div class="eventCard">No events match your criteria. Try a different filter.</div>`;
        return;
    }
    
    // Using map to create HTML string
    container.innerHTML = filtered.map(event => `
        <div class="eventCard" data-id="${event.id}">
            <h3>${event.name}</h3>
            <p>Date: ${event.date} | Category: ${event.category}</p>
            <p>Seats left: ${event.seats} | Fee: ${event.fee}</p>
            <p>${event.description}</p>
            <button class="btn-register register-event-btn" data-id="${event.id}">Register</button>
        </div>
    `).join("");
    
    // Attach event listeners to dynamic buttons
    document.querySelectorAll(".register-event-btn").forEach(btn => {
        btn.removeEventListener("click", handleRegisterClick);
        btn.addEventListener("click", handleRegisterClick);
    });
    updateRegistrationSelect();
}

function handleRegisterClick(e) {
    const card = e.target.closest(".eventCard");
    const eventId = parseInt(card.dataset.id);
    const ev = eventsData.find(e => e.id === eventId);
    if (ev && ev.seats > 0) {
        ev.seats--;
        const currentFilter = document.getElementById("eventFilterSelect")?.value || "all";
        const currentSearch = document.getElementById("quickSearchInput")?.value || "";
        renderEventCards(currentFilter, currentSearch);
        const outputMsg = document.getElementById("formOutputMessage");
        if (outputMsg) {
            outputMsg.innerText = `Registered for ${ev.name}! Remaining seats: ${ev.seats}`;
            setTimeout(() => {
                if(document.getElementById("formOutputMessage")) 
                    document.getElementById("formOutputMessage").innerText = "";
            }, 3000);
        }
    } else {
        alert("Sorry, no seats available for this event.");
    }
}

function updateRegistrationSelect() {
    const selectEl = document.getElementById("regEventSelect");
    if(selectEl) {
        selectEl.innerHTML = '<option value="">-- Choose an event --</option>' + 
            eventsData.map(ev => `<option value="${ev.id}">${ev.name} (${ev.date}) - ${ev.fee}</option>`).join("");
        
        // Restore saved localStorage preference
        const savedPref = localStorage.getItem("preferredEventType");
        if(savedPref && eventsData.some(ev => ev.id == savedPref)) {
            selectEl.value = savedPref;
            updateFeeDisplay(savedPref);
        }
    }
}

function updateFeeDisplay(eventId) {
    const ev = eventsData.find(e => e.id == eventId);
    const feeSpan = document.getElementById("eventFeeDisplay");
    if(ev && feeSpan) {
        feeSpan.innerText = `${ev.fee} - ${ev.name}`;
    } else if(feeSpan) {
        feeSpan.innerText = "Select event to see fee";
    }
}

// ============================================
// 3. FORM HANDLING + VALIDATION
// ============================================
function setupFormValidation() {
    const form = document.getElementById("registrationForm");
    if(!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const selectedEventId = document.getElementById("regEventSelect").value;
        const phone = document.getElementById("phoneNumber").value.trim();
        
        if(!name) {
            document.getElementById("formOutputMessage").innerText = "Please enter your full name.";
            return;
        }
        if(!email) {
            document.getElementById("formOutputMessage").innerText = "Please enter your email address.";
            return;
        }
        if(!email.includes('@')) {
            document.getElementById("formOutputMessage").innerText = "Please enter a valid email address.";
            return;
        }
        if(!selectedEventId) {
            document.getElementById("formOutputMessage").innerText = "Please select an event to register.";
            return;
        }
        
        // Phone validation
        if(phone && !/^[\d\s\+\-\(\)]{7,}$/.test(phone)) {
            document.getElementById("phoneError").innerText = "Please enter a valid phone number.";
            return;
        }
        
        // Mock POST using fetch (simulate API call)
        const payload = { 
            name, 
            email, 
            eventId: selectedEventId, 
            eventName: eventsData.find(e => e.id == selectedEventId)?.name,
            phone: phone,
            message: document.getElementById("regMessage").value 
        };
        
        // Show loading state
        const outputDiv = document.getElementById("formOutputMessage");
        outputDiv.innerHTML = "Processing your registration...";
        
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(() => {
            outputDiv.innerHTML = "Registration submitted successfully! You will receive a confirmation email.";
            // Reset only the message field, keep user info
            document.getElementById("regMessage").value = "";
            // Update seat count for the registered event
            const event = eventsData.find(e => e.id == selectedEventId);
            if(event && event.seats > 0) {
                event.seats--;
                const currentFilter = document.getElementById("eventFilterSelect")?.value || "all";
                const currentSearch = document.getElementById("quickSearchInput")?.value || "";
                renderEventCards(currentFilter, currentSearch);
            }
        })
        .catch(() => {
            outputDiv.innerHTML = "Demo mode: Registration recorded (mock API). Thank you!";
        });
    });
    
    // onchange for dropdown fee preview + saving to localStorage
    const regSelect = document.getElementById("regEventSelect");
    if(regSelect) {
        regSelect.addEventListener("change", (e) => {
            const val = e.target.value;
            if(val) {
                updateFeeDisplay(val);
                localStorage.setItem("preferredEventType", val);
                const storageInfo = document.getElementById("storageInfo");
                if(storageInfo) storageInfo.innerText = "Preference saved!";
            } else {
                localStorage.removeItem("preferredEventType");
            }
        });
    }
    
    // onblur phone validation
    const phoneInput = document.getElementById("phoneNumber");
    const phoneError = document.getElementById("phoneError");
    if(phoneInput && phoneError) {
        phoneInput.addEventListener("blur", () => {
            const phone = phoneInput.value.trim();
            const phoneRegex = /^[\d\s\+\-\(\)]{7,}$/;
            if(phone && !phoneRegex.test(phone)) {
                phoneError.innerText = "Please enter a valid phone number (digits, spaces, +, -).";
            } else {
                phoneError.innerText = "";
            }
        });
    }
}

// ============================================
// 4. GEOLOCATION
// ============================================
function initGeolocation() {
    const btn = document.getElementById("findNearbyBtn");
    const outputDiv = document.getElementById("geoOutput");
    if(btn && outputDiv) {
        btn.addEventListener("click", () => {
            if(!navigator.geolocation) {
                outputDiv.innerText = "Geolocation is not supported by your browser.";
                return;
            }
            outputDiv.innerText = "Fetching your location...";
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    outputDiv.innerHTML = `Nearby events found near latitude ${pos.coords.latitude.toFixed(4)}, longitude ${pos.coords.longitude.toFixed(4)}. Community hall is just 0.3 miles away!`;
                },
                (err) => {
                    if(err.code === err.PERMISSION_DENIED) {
                        outputDiv.innerText = "Location permission denied. Please enable location to find nearby events.";
                    } else if(err.code === err.TIMEOUT) {
                        outputDiv.innerText = "Location request timed out. Please try again.";
                    } else {
                        outputDiv.innerText = "Unable to retrieve your location.";
                    }
                },
                { enableHighAccuracy: true, timeout: 8000 }
            );
        });
    }
}

// ============================================
// 5. LOCALSTORAGE / SESSIONSTORAGE
// ============================================
function setupLocalStoragePref() {
    const clearBtn = document.getElementById("clearPrefsBtn");
    if(clearBtn) {
        clearBtn.addEventListener("click", () => {
            localStorage.removeItem("preferredEventType");
            sessionStorage.clear();
            const storageInfo = document.getElementById("storageInfo");
            if(storageInfo) storageInfo.innerText = "Preferences cleared (local + session storage).";
            const eventSelect = document.getElementById("regEventSelect");
            if(eventSelect) eventSelect.value = "";
            const feeDisplay = document.getElementById("eventFeeDisplay");
            if(feeDisplay) feeDisplay.innerText = "Select event to see fee";
        });
    }
    
    // Store session data
    sessionStorage.setItem("lastVisit", new Date().toLocaleString());
    const infoDiv = document.getElementById("storageInfo");
    if(infoDiv && sessionStorage.getItem("lastVisit")) {
        infoDiv.innerHTML = `Last session: ${sessionStorage.getItem("lastVisit")}`;
    }
}

// ============================================
// 6. VIDEO MEDIA EVENT (YouTube iframe)
// ============================================
function setupVideoListener() {
    const videoIframe = document.getElementById("promoVideo");
    const msg = document.getElementById("videoStatusMsg");
    
    if(videoIframe && msg) {
        // YouTube iframe doesn't have standard 'canplay' event
        // We'll simulate using load event and add a message
        msg.innerText = "Video loaded and ready to play. Click play to watch!";
        
        // Optional: Listen for iframe load
        videoIframe.addEventListener("load", () => {
            msg.innerText = "Video ready to play!";
        });
    }
}

// ============================================
// 7. FEEDBACK SECTION: key events + character count, double-click enlarge
// ============================================
function setupFeedbackEvents() {
    const feedbackTextarea = document.getElementById("feedbackText");
    const charSpan = document.getElementById("charCount");
    
    if(feedbackTextarea && charSpan) {
        feedbackTextarea.addEventListener("keyup", (e) => {
            const len = feedbackTextarea.value.length;
            charSpan.innerText = `${len} / 200 characters`;
            if(len >= 200) {
                charSpan.style.color = "#c73e2b";
            } else {
                charSpan.style.color = "#7a7a77";
            }
        });
        
        feedbackTextarea.addEventListener("keydown", (e) => {
            // Just for demo - keyboard event capture
            console.log(`Key pressed: ${e.key}`);
        });
    }
    
    // Quick search keyup event
    const searchInput = document.getElementById("quickSearchInput");
    if(searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            const filter = document.getElementById("eventFilterSelect")?.value || "all";
            renderEventCards(filter, e.target.value);
        });
    }
    
    // Enlarge images on double-click
    const imgs = document.querySelectorAll(".enlarge-img");
    imgs.forEach(img => {
        img.addEventListener("dblclick", () => {
            img.classList.toggle("enlarged");
        });
    });
}

// ============================================
// 8. FILTER dropdown and initialization
// ============================================
async function initEventSystem() {
    // Simulate async loading
    const loadingDiv = document.getElementById("eventGallery");
    if(loadingDiv) {
        loadingDiv.innerHTML = "<p>Loading events...</p>";
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    renderEventCards("all", "");
    
    const filterSelect = document.getElementById("eventFilterSelect");
    if(filterSelect) {
        filterSelect.addEventListener("change", (e) => {
            const searchVal = document.getElementById("quickSearchInput")?.value || "";
            renderEventCards(e.target.value, searchVal);
        });
    }
    
    setupFormValidation();
    initGeolocation();
    setupFeedbackEvents();
}

// ============================================
// 9. ADDITIONAL EVENT HANDLERS
// ============================================
function setupEventHandlers() {
    // Onclick handler for submit button confirmation
    const submitBtn = document.getElementById("submitRegBtn");
    if(submitBtn) {
        submitBtn.addEventListener("click", () => {
            console.log("Register button clicked - form validation will handle submission");
        });
    }
    
    // Add double-click handler for any future dynamic elements
    const demoImgs = document.querySelectorAll(".enlarge-img");
    demoImgs.forEach(img => {
        img.addEventListener("dblclick", function() {
            this.classList.toggle("enlarged");
        });
    });
    
    // Filter dropdown change event for fee display (already covered, but additional)
    const regSelect = document.getElementById("regEventSelect");
    if(regSelect) {
        regSelect.addEventListener("change", () => {
            // Additional logic if needed
        });
    }
}

// Export/initialize everything
window.initEventSystem = initEventSystem;

// ============================================
// 10. BEFOREUNLOAD WARNING (form dirty check)
// ============================================
(function setupBeforeUnloadWarning() {
    let formDirty = false;
    const form = document.getElementById("registrationForm");
    if(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => { formDirty = true; });
            input.addEventListener('change', () => { formDirty = true; });
        });
        
        window.addEventListener('beforeunload', (e) => {
            if(formDirty) {
                e.preventDefault();
                e.returnValue = 'You have unsaved registration information. Are you sure you want to leave?';
                return e.returnValue;
            }
        });
        
        // Reset dirty flag after successful registration
        form.addEventListener('submit', () => {
            setTimeout(() => { formDirty = false; }, 100);
        });
    }
})();