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

// const eventListeners = [
//     inputForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//         this.blur();
//     }),
//     window.addEventListener("click", function (e) {
//         e.target.focus();
//     }),
//     inputs.submitBtn.addEventListener("click", function () {
//         addItem();
//         this.blur();
//     }),
//     inputs.cases.addEventListener("click", () => emptyField(inputs.cases)),
//     inputs.units.addEventListener("click", () => emptyField(inputs.units)),
//     inputs.companyField.addEventListener("change", function () {
//         createBrands(inputs.companyField.value);
//         this.blur();
//     }),
//     inputs.brandField.addEventListener("change", function () {
//         createInputFields(inputs.companyField.value)
//         this.blur();
//     }),
//     inputs.varietyField.addEventListener("change", function () {
//         this.blur();
//     }),
//     inputs.flavorField.addEventListener("change", function () {
//         this.blur();
//     }),
//     inputs.sizeField.addEventListener("change", function () {
//         this.blur();
//     }),
//     inputs.resetBtn.addEventListener("click", () => {
//         resetList();
//     })
// ];