// Custom Mobile Dropdown Logic (Handles Multiple Dropdowns)
const mobileTriggers = document.querySelectorAll('.m-trigger');

mobileTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        const submenu = this.nextElementSibling; // Finds the m-submenu directly after this link
        
        // If the clicked submenu is not active yet
        if (!submenu.classList.contains('active')) {
            e.preventDefault(); // Stop navigation
            
            // OPTIONAL: Close other open submenus first (Accordion style)
            document.querySelectorAll('.m-submenu').forEach(m => m.classList.remove('active'));
            document.querySelectorAll('.m-trigger i').forEach(i => i.style.transform = 'rotate(0deg)');

            // Open this one
            submenu.classList.add('active');
            this.querySelector('i').style.transform = 'rotate(180deg)';
        } 
        // If it is already active, the link (href) will follow normally on the next click
    });
});


    document.addEventListener('DOMContentLoaded', function() {
    // Select the Practice Areas link
    const practiceLink = document.querySelector('.dropdown-toggle[href="nri-services.html"]');

    if (practiceLink && window.innerWidth > 992) {
        practiceLink.addEventListener('click', function(e) {
            // Redirect to the page immediately on click
            window.location.href = this.getAttribute('href');
        });
    }
});

    document.addEventListener('DOMContentLoaded', function() {
    // Select the Practice Areas link
    const practiceLink = document.querySelector('.dropdown-toggle[href="sectors.html"]');

    if (practiceLink && window.innerWidth > 992) {
        practiceLink.addEventListener('click', function(e) {
            // Redirect to the page immediately on click
            window.location.href = this.getAttribute('href');
        });
    }
});

    document.addEventListener('DOMContentLoaded', function() {
    // Select the Practice Areas link
    const practiceLink = document.querySelector('.dropdown-toggle[href="practiceareas.html"]');

    if (practiceLink && window.innerWidth > 992) {
        practiceLink.addEventListener('click', function(e) {
            // Redirect to the page immediately on click
            window.location.href = this.getAttribute('href');
        });
    }
});