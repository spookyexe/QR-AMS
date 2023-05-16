const gradeLevelSelector = document.getElementById('gradeLevel')
const studentName = document.getElementById('studentName');
const registerButton = document.getElementById('registerButton');

let isGradeSelected = false
let isSectionSelected = false

gradeLevelSelector.addEventListener('change', () => {
  isGradeSelected = true
  const currentSection = document.getElementById(gradeLevelSelector.value)
  const currentSectionVisibility = currentSection.getAttribute('data-visible')

  const allSections = document.querySelectorAll('.sections');
  allSections.forEach(section => section.setAttribute('data-visible', 'false'));

  if (currentSectionVisibility === 'false') {
    isSectionSelected = true
    currentSection.setAttribute('data-visible', 'true')
  }

  if (isGradeSelected && isSectionSelected) {
    studentName.addEventListener('input', () => {
      if (studentName.value !== '') {
        registerButton.disabled = false;
      }
    });
    
    registerButton.addEventListener('click', () => {
      try {
        console.log(`${studentName.value} | ${gradeLevelSelector.value} | ${currentSection.value}`);
        window.location.href = '/register/successful'

      } catch {
        console.log('ERROR')
      }
    });
  }
})