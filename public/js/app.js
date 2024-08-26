const inputForm = document.querySelector("#inputContainer");
const inputs = {
    companyField: inputContainer.elements.company,
    brandField: inputContainer.elements.brand,
    flavorField: inputContainer.elements.flavor,
    varietyField: inputContainer.elements.variety,
    sizeField: inputContainer.elements.size,
    cases: inputContainer.elements.cases,
    units: inputContainer.elements.units,
    submitBtn: inputContainer.elements.add,
    resetBtn: inputContainer.elements.reset
};

const eventListeners = [
    inputForm.addEventListener("submit", function (e) {
        e.preventDefault();
        this.blur();
    }),
    window.addEventListener("click", function (e) {
        e.target.focus();
    }),
    inputs.submitBtn.addEventListener("click", function () {
        // addItem();
        this.blur();
    }),
    // inputs.cases.addEventListener("click", () => emptyField(inputs.cases)),
    // inputs.units.addEventListener("click", () => emptyField(inputs.units)),
    inputs.companyField.addEventListener("change", function () {
        inputToggles()
        this.blur();
    }),
    inputs.brandField.addEventListener("change", function () {
        inputToggles()
        this.blur();
    }),
    inputs.varietyField.addEventListener("change", function () {
        this.blur();
    }),
    inputs.flavorField.addEventListener("change", function () {
        this.blur();
    }),
    inputs.sizeField.addEventListener("change", function () {
        this.blur();
    }),
    inputs.resetBtn.addEventListener("click", () => {
        resetList();
    })
];

function inputToggles() {
    if (inputs.companyField.value != "") {
        inputs.brandField.removeAttribute("disabled");
    } else if (inputs.companyField.value === "") {
        inputs.brandField.setAttribute("disabled", "");
    }

    if (inputs.brandField.value != "") {
        // If the brand field input has a brand selected this will loop through the inputs and remove
        // the disabled attribute to enable them.
        for (let key in inputs) {
            inputs[key].removeAttribute("disabled");
        }
    } else if (inputs.brandField.value === "") {
        // Destructures the inputs object to pull out the key value pairs I really
        // want to access.
        const { companyField, brandField, ...remainingInputs } = inputs
        for (let key in remainingInputs) {
            // Does the opposite of above. Adds disabled attribute to the input fields
            // if the brand is left unselected
            remainingInputs[key].setAttribute("disabled", "")
        }
    }
}

console.log(companies)
console.log(brands)
console.log(beverages)