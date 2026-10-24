const bakeryMenu = {
    breads: [
        { id: "b1", name: "Signature Sourdough Loaf", price: 8.50 },
        { id: "b2", name: "Artisan Multi-Grain", price: 7.00 }
    ],
    pastries: [
        { id: "p1", name: "Butter Croissant", price: 4.00 },
        { id: "p2", name: "Cinnamon Roll", price: 4.50 }
    ]
};

const bakeryHours = {
    weekday: "6:00 AM - 4:00 PM",
    weekend: "7:00 AM - 3:00 PM"
};

let savedFavorites = [];
let popularItems = ["Signature Sourdough Loaf", "Butter Croissant", "Cinnamon Roll"];

document.addEventListener("DOMContentLoaded", () => {
    loadStoredFavorites();
    initFavoritesFeature();
    initFormValidation();
    prefillContactForm();
});

function loadStoredFavorites() {
    const stored = localStorage.getItem("northStarFavorites");
    if (stored) {
        try {
            savedFavorites = JSON.parse(stored);
        } catch (e) {
            savedFavorites = [];
        }
    }
    updateFavoritesUI();
}

function saveFavoritesToStorage() {
    localStorage.setItem("northStarFavorites", JSON.stringify(savedFavorites));
}

function initFavoritesFeature() {
    const favButtons = document.querySelectorAll(".fav-btn");
    favButtons.forEach(btn => {
        const itemName = btn.getAttribute("data-item");
        
        if (savedFavorites.includes(itemName)) {
            btn.textContent = "Saved to Order";
            btn.classList.add("saved");
        }

        btn.addEventListener("click", () => {
            toggleFavorite(itemName, btn);
        });
    });
}

function toggleFavorite(itemName, buttonElement) {
    const index = savedFavorites.indexOf(itemName);
    if (index === -1) {
        savedFavorites.push(itemName);
        buttonElement.textContent = "Saved to Order";
        buttonElement.classList.add("saved");
    } else {
        savedFavorites.splice(index, 1);
        buttonElement.textContent = "+ Save to Order";
        buttonElement.classList.remove("saved");
    }
    
    saveFavoritesToStorage();
    updateFavoritesUI();
}

function updateFavoritesUI() {
    const countDisplay = document.getElementById("fav-count");
    const listDisplay = document.getElementById("fav-list");

    if (countDisplay) {
        countDisplay.textContent = savedFavorites.length;
    }

    if (listDisplay) {
        if (savedFavorites.length === 0) {
            listDisplay.innerHTML = "<p>No items saved yet. Click '+ Save to Order' on any item!</p>";
        } else {
            listDisplay.innerHTML = "<ul>" + 
                savedFavorites.map(item => `<li>${item}</li>`).join("") + 
                "</ul>";
        }
    }
}

function prefillContactForm() {
    const itemDetailsField = document.getElementById("item-details");
    if (itemDetailsField && savedFavorites.length > 0) {
        if (!itemDetailsField.value.trim()) {
            itemDetailsField.value = "Saved Pre-Order Items:\n- " + savedFavorites.join("\n- ");
        }
    }
}

function initFormValidation() {
    const orderForm = document.querySelector("form");
    if (!orderForm) return;

    orderForm.addEventListener("submit", (e) => {
        let isValid = true;
        clearErrors();

        const nameInput = document.getElementById("full-name");
        if (nameInput) {
            if (nameInput.value.trim().length < 2) {
                showError(nameInput, "Please enter your full name (at least 2 characters).");
                isValid = false;
            }
        }

        const emailInput = document.getElementById("email");
        if (emailInput) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, "Please enter a valid email address (e.g., name@example.com).");
                isValid = false;
            }
        }

        const dateInput = document.getElementById("pickup-date");
        if (dateInput && dateInput.value) {
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                showError(dateInput, "Pickup date cannot be in the past.");
                isValid = false;
            }
        } else if (dateInput && !dateInput.value) {
            showError(dateInput, "Please select a pickup date.");
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }
    });
}

function showError(inputElement, message) {
    inputElement.classList.add("input-error");
    
    const errorDiv = document.createElement("span");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;

    if (inputElement.nextSibling) {
        inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    } else {
        inputElement.parentNode.appendChild(errorDiv);
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => msg.remove());

    const errorInputs = document.querySelectorAll(".input-error");
    errorInputs.forEach(input => input.classList.remove("input-error"));
}