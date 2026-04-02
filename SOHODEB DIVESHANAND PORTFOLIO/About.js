const skillsBtn = document.getElementById('skillsBtn');
const skillsBox = document.getElementById('skillsBox');

skillsBtn.addEventListener('click', function () {
    skillsBox.classList.toggle('hidden');

    if (skillsBox.classList.contains('hidden')) {
        skillsBtn.textContent = 'Show Skills';
    } else {
        skillsBtn.textContent = 'Hide Skills';
    }
});