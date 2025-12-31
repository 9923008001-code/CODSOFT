// Smooth Scroll
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll-to-top button
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = function() { scrollFunction(); updateActiveNav(); };

function scrollFunction(){
    if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200){
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}

scrollBtn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
});

// Active link highlighting
const sections = document.querySelectorAll('section');
function updateActiveNav(){
    let scrollPos = window.scrollY + 200;
    sections.forEach(sec => {
        const id = sec.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if(sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos){
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
