let currentStep = 0;

function showStep(stepIndex) {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach((step, index) => {
        step.classList.toggle('form-step-active', index === stepIndex);
    });

    const sidebarSteps = document.querySelectorAll('.sidebar .step');
    sidebarSteps.forEach((step, index) => {
        step.classList.toggle('step-active', index === stepIndex);
    });
}

function nextStep() {
    const steps = document.querySelectorAll('.form-step');
    if (validateStep(currentStep)) {
        currentStep = Math.min(currentStep + 1, steps.length - 1);
        showStep(currentStep);
    }
}

function prevStep() {
    currentStep = Math.max(currentStep - 1, 0);
    showStep(currentStep);
}

function validateStep(stepIndex) {
    const stepElement = document.querySelectorAll('.form-step')[stepIndex];
    const inputs = stepElement.querySelectorAll('input');
    for (const input of inputs) {
        if (!input.checkValidity()) {
            input.reportValidity();
            return false;
        }
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    showStep(currentStep);
    document.getElementById('multiStepForm').addEventListener('submit', (e) => {
        if (!validateStep(currentStep)) {
            e.preventDefault();
        } else {
            displaySummary();
        }
    });
});

function displaySummary() {
    const summaryElement = document.getElementById('summary');
    const formData = new FormData(document.getElementById('multiStepForm'));
    summaryElement.innerHTML = '';
    for (const [name, value] of formData) {
        summaryElement.innerHTML += `<p>${name}: ${value}</p>`;
    }
}
