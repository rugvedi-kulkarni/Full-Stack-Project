// script.js - Hospital Appointment Booking System

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");
  const doctorSelect = document.getElementById("doctorSelect");
  const dateSelect = document.getElementById("dateSelect");
  const timeSelect = document.getElementById("timeSelect");
  const confirmationMessage = document.getElementById("confirmationMessage");

 form.addEventListener("submit", async (event) => { // Added 'async'
    event.preventDefault();

    const appointmentData = {
        patientName: document.getElementById("patientName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        doctor: doctorSelect.options[doctorSelect.selectedIndex].text,
        date: dateSelect.value,
        time: timeSelect.value
    };

    try {
        // SENDING DATA TO BACKEND
        const response = await fetch("/api/book", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });

        const result = await response.json();

        if (response.ok) {
            confirmationMessage.innerHTML = `<p style="color: green;">✅ Success: ${result.message}</p>`;
            form.reset();
            fetchAppointments();
        } else {
            confirmationMessage.innerHTML = `<p style="color: red;">❌ Error: ${result.message || "Unable to book appointment."}</p>`;
        }
    } catch (error) {
        confirmationMessage.innerHTML = `<p style="color: red;">❌ Server Error. Is the backend running?</p>`;
    }
});
});

function escapeHtml(value) {
    if (value == null) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

async function fetchAppointments() {
    const tableBody = document.getElementById("tableBody");
    if (!tableBody) return;

    try {
        const response = await fetch("/api/appointments");
        const data = await response.json();

        if (!response.ok || !Array.isArray(data)) {
            const msg =
                typeof data.message === "string"
                    ? data.message
                    : "Unable to load appointments. Is the server running?";
            tableBody.innerHTML = `<tr><td colspan="4" class="tableMessage tableMessage--error">${escapeHtml(
                msg
            )}</td></tr>`;
            return;
        }

        tableBody.innerHTML =
            data.length === 0
                ? `<tr><td colspan="4" class="tableMessage tableMessage--empty">No bookings yet.</td></tr>`
                : data
                      .map(
                          (app) =>
                              `<tr>
                <td>${escapeHtml(app.patientName)}</td>
                <td>${escapeHtml(app.doctor)}</td>
                <td>${escapeHtml(app.date)}</td>
                <td>${escapeHtml(app.time)}</td>
            </tr>`
                      )
                      .join("");
    } catch (_error) {
        tableBody.innerHTML = `<tr><td colspan="4" class="tableMessage tableMessage--error">Server error — check connection and try Refresh.</td></tr>`;
    }
}

// Load the table automatically when the page opens
window.onload = fetchAppointments;