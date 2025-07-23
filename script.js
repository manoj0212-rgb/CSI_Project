const steps = document.querySelectorAll(".form-step");
const progress = document.getElementById("progress");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const form = document.getElementById("multi-step-form");
const previewData = document.getElementById("previewData");
let currentStep = 0;
let submittedOnce = false;

function updateFormSteps() {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  document.querySelectorAll(".step").forEach((circle, idx) => {
    circle.classList.toggle("active", idx <= currentStep);
  });

  progress.style.width = `${(currentStep / (steps.length - 1)) * 100}%`;
}

function validateStep(stepIndex) {
  const stepInputs = steps[stepIndex].querySelectorAll("input, select, textarea");
  for (let input of stepInputs) {
    if (input.hasAttribute("required") && !input.value) {
      alert("Please fill all required fields.");
      return false;
    }
    if (input.type === "file" && input.files.length === 0) {
      alert("Please upload all required files.");
      return false;
    }
  }
  return true;
}

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < steps.length - 1) {
      currentStep++;
      updateFormSteps();
      if (currentStep === steps.length - 1) fillPreview();
    }
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      updateFormSteps();
    }
  });
});

function fillPreview() {
  let html = "<h4>Personal Details:</h4><ul>";
  const personalFields = [
    "fname", "lname", "father", "dob", "gender",
    "phone", "email", "address", "city", "state", "pincode"
  ];
 personalFields.forEach(id => {
  const label = document.querySelector(`label[for="${id}"]`)?.innerText || id;
  const val = document.getElementById(id).value;
  html += `
    <div style="border: 1px solid #ccc; padding: 8px; margin-bottom: 6px; border-radius: 4px;">
      <strong>${label}</strong> ${val}
    </div>
  `;
});

  html += "</ul>";

  html += "<h4>Education Details:</h4><ul>";
 
  html += `<h5>Secondary (10th) :</h5>`;
  ["secSchool", "secRoll", "secPercent"].forEach(id => {
    const label = document.querySelector(`label[for="${id}"]`)?.innerText || id;
    const val = document.getElementById(id).value;
    html += `
      <div style="border: 1px solid #ccc; padding: 8px; margin-bottom: 6px; border-radius: 4px;">
        <strong>${label}</strong> ${val}
      </div>
    `;
  });

  html += `<h5>Higher Secondary (12th) :</h5>`;
  ["hsSchool", "hsRoll", "hsPercent"].forEach(id => {
    const label = document.querySelector(`label[for="${id}"]`)?.innerText || id;
    const val = document.getElementById(id).value;
    html += `
      <div style="border: 1px solid #ccc; padding: 8px; margin-bottom: 6px; border-radius: 4px;">
        <strong>${label}</strong> ${val}
      </div>
    `;
  });

  html += `<h5>Graduation :</h5>`;
  ["gradUni", "gradRoll", "gradPercent"].forEach(id => {
    const label = document.querySelector(`label[for="${id}"]`)?.innerText || id;
    const val = document.getElementById(id).value;
    html += `
      <div style="border: 1px solid #ccc; padding: 8px; margin-bottom: 6px; border-radius: 4px;">
        <strong>${label}</strong> ${val}
      </div>
    `;
  });
  html += "</ul>";

  const photo = document.getElementById("photo").files[0];
  const sign = document.getElementById("sign").files[0];
  if (photo && sign) {
    const reader1 = new FileReader();
    const reader2 = new FileReader();
    reader1.onload = function () {
      const photoUrl = reader1.result;
      reader2.onload = function () {
        const signUrl = reader2.result;
        html += `
          <div style="text-align:center;">
            <img src="${photoUrl}" class="preview-img" alt="Photo" />
            <img src="${signUrl}" class="preview-img" alt="Signature" />
          </div>`;
        previewData.innerHTML = html;
      };
      reader2.readAsDataURL(sign);
    };
    reader1.readAsDataURL(photo);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const declaration = document.getElementById("declaration");

  if (!declaration || !declaration.checked) {
    alert("Please accept the declaration before submitting.");
    return;
  }

  if (!submittedOnce) {
    alert("After submitting, you cannot make any changes.");
    submittedOnce = true;
    return;
  }

  alert("Form submitted successfully!");
  form.reset();
  currentStep = 0;
  updateFormSteps();
  document.getElementById("downloadBtn").style.display = "inline-block";
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  alert("Simulated PDF download.");
});

// Initialize
updateFormSteps();
