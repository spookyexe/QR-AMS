const sectionButtons = document.querySelectorAll('.sect-button');
let currentTableMenu = null;

let currentButton = null;

sectionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tableMenu = document.getElementById(`tableMenu-${button.id}`);
    currentTable = button.textContent;

    if (currentTableMenu && currentTableMenu !== tableMenu) {
      currentTableMenu.setAttribute('data-visible', false);
    }
    
    const isTableOpen = tableMenu.getAttribute('data-visible');
    
    if (isTableOpen === 'false') {
      tableMenu.setAttribute('data-visible', true);
      button.classList.remove('clicked')
      currentTableMenu = tableMenu;
    } else if (isTableOpen === 'true') {
      tableMenu.setAttribute('data-visible', false);
      currentTableMenu = null;
    }
    
  });
});