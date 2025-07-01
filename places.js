window.addEventListener('scroll', function () {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 0.95 * window.innerHeight) { // 90vh is equal to window.innerHeight
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');

    function showNextSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }

    // Ensure the first slide is visible on load
    slides[currentIndex].classList.add('active');

    setInterval(showNextSlide, 3000);
});

const dialog = document.querySelector('.fact');
const showbutton = document.querySelectorAll('.fact-button');
const wrapper = document.querySelector('.wrapper')
const citycont = document.querySelector('.cities')


fetch('./extras/facts.json').then(res => res.json()).then((data) => {
    citycont.addEventListener('click', (e) => {
        if (e.target.className == 'fact-button') {
            for (ft in data) {
                if (data[ft].location == e.target.id) {
                    let newfact = (data[ft].facts)[Math.round(Math.random() * ((data[ft].facts).length))]
                    if (newfact) {
                        dialog.innerHTML = newfact
                    }
                    break
                }
            }
        }
    })
})




for (btn of showbutton) {
    btn.addEventListener('mouseover', () => {
        dialog.showModal()
    })

}


dialog.addEventListener('click', (e) => {
    console.log(e.target.className)
    if (!wrapper.contains(e.target)) {
        dialog.close()
    }
})


// ct.addEventListener('click', () => {
//             if (city.location == ct.id) {
//                 console.log(city.facts)
//                 dialog.innerHTML=city.facts[Math.round(Math.random()*city.facts.length)]
//             }
//             dialog.showModal()
//         })