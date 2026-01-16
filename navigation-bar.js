function toggleMenu() {
    const menu = document.getElementById("menu-content");
    //const overlay = document.getElementById("menu-overlay");
    
    menu.classList.toggle("active");
    //overlay.classList.toggle("active");
}

// Adicionar overlay ao HTML
// document.addEventListener('DOMContentLoaded', function() {
//    // const overlay = document.createElement('div');
//     overlay.className = 'menu-overlay';
//     overlay.id = 'menu-overlay';
//     overlay.onclick = toggleMenu;
//     document.body.appendChild(overlay);
// });

// Adicionar ícones aos links (opcional)
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu-content a');
    const icons = ['fa-chart-line', 'fa-calculator', 'fa-graduation-cap', 'fa-trophy', 'fa-balance-scale-right'];
    
    menuLinks.forEach((link, index) => {
        if (index < icons.length) {
            const icon = document.createElement('i');
            icon.className = `fas ${icons[index]}`;
            link.prepend(icon);
        }
    });
});