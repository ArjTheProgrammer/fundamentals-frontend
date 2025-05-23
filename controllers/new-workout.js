window.getSelectedDrills = function() {
    const drills = [];
    document.querySelectorAll('.drill-list .drill').forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            const name = label.querySelector('strong').textContent;
            const desc = label.querySelector('input[type="text"]').value;
            drills.push({ name, desc });
        }
    });
    return drills;
};

window.createWorkout = function() {
    const workoutName = document.getElementById('workoutName').value;
    const drills = window.getSelectedDrills();
    let html = `<strong>Name:</strong> ${workoutName || '(No name)'}<br><strong>Drills:</strong><ul>`;
    drills.forEach(d => {
        html += `<li><strong>${d.name}</strong>: ${d.desc}</li>`;
    });
    html += '</ul>';
    document.getElementById('previewContent').innerHTML = html;
    document.getElementById('previewModal').style.display = 'block';
};

window.cancelWorkout = function() {
    window.location.href = '/';
};

document.addEventListener('DOMContentLoaded', function() {
    // Set up modal close button
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.onclick = function() {
            document.getElementById('previewModal').style.display = 'none';
        };
    }

    // Set up confirm create button
    const confirmCreate = document.getElementById('confirmCreate');
    if (confirmCreate) {
        confirmCreate.onclick = function() {
            // Simulate recording the workout (e.g., send to server)
            document.getElementById('previewModal').style.display = 'none';
            window.location.href = 'myworkouts.html';
        };
    }
});