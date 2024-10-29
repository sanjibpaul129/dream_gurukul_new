/* ===================================== banner lazy load ============================================*/
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('bannerVideo');
    const bannerImage = document.querySelector('.banner_image');
    const muteToggle = document.getElementById('muteToggle');
    const muteButtonIcon = document.getElementById('mute_button');

    const loadVideoSources = () => {
        const sources = video.querySelectorAll('source[data-src]');
        sources.forEach(source => {
            source.src = source.getAttribute('data-src');
        });
        video.load();
    };

    const handleVideoPlay = () => {
        // Fade out the image and fade in the video
        bannerImage.style.opacity = '0';
        video.classList.add('playing');
        if (bannerImage.style.opacity == '0') {
            setTimeout(function () {
                // Select the welcome section
                var welcomeSection = document.getElementById('welcome');
                console.log('====================================');
                console.log(window.scrollY);
                console.log('====================================');
                if (welcomeSection && window.scrollY < 150) {
                    // Calculate the position to scroll to, subtracting the offset (70px)
                    var offset = 85; // Offset in pixels
                    var elementPosition = welcomeSection.getBoundingClientRect().top + window.pageYOffset;
                    var offsetPosition = elementPosition - offset;

                    // Scroll to the calculated position smoothly
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.warn('Element with id "welcome" not found.');
                }
            }, 31000); // 30000 milliseconds = 30 seconds
        }
    };

    const handleVideoCanPlay = () => {
        video.play().then(() => {
            handleVideoPlay();
        }).catch(error => {
            console.error("Error attempting to play the video:", error);
            // Optionally, keep showing the image if video fails to play
        });
    };

    const setupIntersectionObserver = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.25
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadVideoSources();
                    video.addEventListener('canplaythrough', handleVideoCanPlay, { once: true });
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(video);
    };

    const toggleMute = () => {
        video.muted = !video.muted;
        muteButtonIcon.textContent = video.muted ? 'volume_off' : 'volume_up';
    };

    muteToggle.addEventListener('click', toggleMute);

    // Initialize
    setupIntersectionObserver();
});

// ================================================ side nav ================================================

var sideNavCall = document.querySelector('.side-nav-call');
var phoneNumber = document.getElementById('side-nav-phone-number');

sideNavCall.addEventListener('mouseover', function () {
    phoneNumber.classList.add('revealed');
});

sideNavCall.addEventListener('mouseout', function () {
    phoneNumber.classList.remove('revealed');
});

document.addEventListener('DOMContentLoaded', function () {
    const sideNavbar = document.querySelector('.side-nav');

    window.addEventListener('scroll', function () {
        var scrollAmount = window.scrollY;
        if (scrollAmount > 300) {
            sideNavbar.classList.add('show');
            sideNavbar.classList.remove('side-nav-hide');
        } else {
            sideNavbar.classList.remove('show');
            sideNavbar.classList.add('side-nav-hide');
        }
    });
});


//============================================== bottom-nav================================

// document.addEventListener('DOMContentLoaded', function () {
//     const bottom = document.querySelector('.bottom-nav');

//     window.addEventListener('scroll', function () {
//         var scrollAmount = window.scrollY;
//         if (scrollAmount > 300) {
//             bottom.classList.add('show');
//             bottom.classList.remove('bottom-nav-hide');
//         } else {
//             bottom.classList.remove('show');
//             bottom.classList.add('bottom-nav-hide');
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var mobile = getParameterByName('cellno');
    console.log(`cell no: ${mobile}`); // Debugging log

    var callLink = document.getElementById('click_to_call');
    var phoneNumberElement = document.getElementById('phone_number');
    var sideNavPhoneNumber = document.getElementById('side-nav-phone-number');

    console.log(`callLink: ${callLink}`);
    console.log(`phoneNumberElement: ${phoneNumberElement}`);
    console.log(`sideNavPhoneNumber: ${sideNavPhoneNumber}`);

    if (mobile) {
        var phoneNumber = mobile.startsWith('+91') ? mobile : '+91' + mobile;
        callLink.href = "tel:" + phoneNumber;
        var formattedNumber = phoneNumber.slice(0, 3) + " " + phoneNumber.slice(3, 7) + " " + phoneNumber.slice(7, 10) + " " + phoneNumber.slice(10);
        console.log(`Formatted Number: ${formattedNumber}`); // Debugging log
        phoneNumberElement.textContent = formattedNumber;
        sideNavPhoneNumber.textContent = formattedNumber;
    }
});





// ===================================== Add shadow in nav ================================
const nav = document.querySelector('nav');
function addShadowOnScroll() {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
        nav.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.backgroundColor = 'rgba(249, 237, 216, 0.5)';
    } else {
        nav.style.boxShadow = "none";
        nav.style.backdropFilter = 'none';
        nav.style.backgroundColor = 'transparent';
    }
}
window.addEventListener('scroll', addShadowOnScroll);
// ================================================== scroll to section =========================================================


document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const offset = 70;
            window.scrollTo({
                top: targetSection.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });
});
function openMenu() {
    var checkbox = document.getElementById('hamburger-checkbox');
    const mobileNav = document.querySelector('.mobile-nav');
    if (checkbox.checked) {
        mobileNav.style.display = 'flex';
        mobileNav.style.animationName = 'fadeIn';
    } else {
        mobileNav.style.animationName = 'fadeOut';
        setTimeout(() => {
            mobileNav.style.display = 'none';
        }, 500);  // Delay hiding the menu to allow the animation to complete
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('#nav-links a');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    const mobileNav = document.querySelector('.mobile-nav');
    var checkbox = document.getElementById('hamburger-checkbox');

    // Function to set the active section
    function setActiveSection(sectionId) {
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === sectionId) {
                link.classList.add('active');
            }
        });
    }

    // Function to handle scroll event
    function handleScroll() {
        let fromTop = window.scrollY + 80;
        let activeSet = false;
        mobileNavLinks.forEach(link => {
            let section = document.getElementById(link.getAttribute('href').substring(1));
            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add('active');
                activeSet = true;
            } else {
                link.classList.remove('active');
            }
        });
        return activeSet;
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            mobileNav.style.display = 'none';
            checkbox.checked = false;
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const offset = 70;
            window.scrollTo({
                top: targetSection.offsetTop - offset,
                behavior: 'smooth'
            });
            setActiveSection(targetId);
        });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            mobileNav.style.display = 'none';
            checkbox.checked = false;
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const offset = 70;
            window.scrollTo({
                top: targetSection.offsetTop - offset,
                behavior: 'smooth'
            });
            setActiveSection(targetId);
        });
    });

    // Check initial scroll position on load
    window.addEventListener('load', function () {
        const activeSet = handleScroll();
        if (!activeSet) {
            mobileNavLinks[0].classList.add('active');
        }
    });

    // Handle scroll event
    window.addEventListener('scroll', handleScroll);
});
// ================================================== nav items animation =========================================================

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('#nav-links li');

    navLinks.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('animate');
        }, 200 * index);
    });
});

// ============================================= Banner images ================================================

document.addEventListener('DOMContentLoaded', function () {
    function createCarousel(carouselContainer, intervalTime) {
        let currentIndex = 0;
        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;

        function goToSlide(index) {
            if (index >= totalSlides) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalSlides - 1;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * 100;
            carouselContainer.style.transform = `translateX(${offset}%)`;
        }

        let slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, intervalTime);

        let startX, endX;

        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            clearInterval(slideInterval);  // Stop auto-sliding when swiping starts
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', () => {
            if (startX > endX + 50) {
                goToSlide(currentIndex + 1);
            } else if (startX < endX - 50) {
                goToSlide(currentIndex - 1);
            }
            slideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, intervalTime);  // Resume auto-sliding
        });
    }

    // Initialize carousel for both desktop and mobile
    const desktopCarousel = document.querySelector('#desktop-main');
    const mobileCarousel = document.querySelector('#mobile-main');

    if (desktopCarousel) {
        createCarousel(desktopCarousel, 3000);
    }

    if (mobileCarousel) {
        createCarousel(mobileCarousel, 3000);
    }
});



// ================================================== about the project animation =========================================================


const aboutProjectSection = document.querySelector('#about-the-project');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
});
observer.observe(aboutProjectSection);

// ============================================== form ============================================
function enquiryForm(value) {
    var utmFormNameInput = document.getElementById('utm_form_name');
    if (utmFormNameInput) {
        utmFormNameInput.value = value;
    }
    const formContainer = document.getElementById('form-container');
    const body = document.getElementsByTagName('body')[0];
    const form = document.querySelector('.enquiry-form');

    // Remove any existing hidden input for enquiry_type
    const existingHiddenInput = document.getElementById('enquiryType');
    if (existingHiddenInput) {
        existingHiddenInput.remove();
    }

    console.log(`Form origin: ${value}`);

    // Create and add the hidden input for enquiry_type
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'enquiry_type';
    hiddenInput.id = 'enquiryType';
    hiddenInput.value = value;
    form.appendChild(hiddenInput);

    formContainer.style.display = 'grid';
    formContainer.classList.add('fade-in');
    formContainer.classList.remove('fade-out');
    body.style.overflow = 'hidden';
    formContainer.dataset.closed = 'false';
}

const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', closeForm);

function closeForm() {
    const formContainer = document.getElementById('form-container');
    const body = document.getElementsByTagName('body')[0];
    formContainer.classList.remove('fade-in');
    formContainer.classList.add('fade-out');

    formContainer.addEventListener('animationend', function handleAnimationEnd() {
        formContainer.style.display = 'none';
        formContainer.classList.remove('fade-out');
        formContainer.removeEventListener('animationend', handleAnimationEnd);
    });

    body.style.overflow = 'auto';
    formContainer.dataset.closed = 'true';
}

document.getElementById('nameInput').setCustomValidity('Please enter your full name');
document.getElementById('phoneInput').setCustomValidity('Please enter a valid 10-digit mobile number');
document.getElementById('emailInput').setCustomValidity('');

function clearValidityMessage(element) {
    element.setCustomValidity('');
    const value = element.value.toString();
    if (value !== '' && value !== '-' && value !== '+' && value !== 'e' && value !== '-e' && value !== '+e') {
        element.classList.add('has-value');
    } else {
        element.classList.remove('has-value');
    }
}

document.getElementById('phoneInput').addEventListener('input', function () {
    let phoneValue = this.value;
    let regex = /^\d{10}$/;
    if (!regex.test(phoneValue)) {
        this.setCustomValidity('Please enter a valid 10-digit mobile number');
    } else {
        this.setCustomValidity('');
    }
});

window.addEventListener('scroll', function () {
    var scrollAmount = window.scrollY;
    const formContainer = document.getElementById('form-container');
    const body = document.getElementsByTagName('body')[0];
    if (scrollAmount > 1500 && formContainer.dataset.closed !== 'true') {
        enquiryForm('registration');
        formContainer.style.display = 'grid';
        formContainer.classList.add('fade-in');
        body.style.overflow = 'hidden';
    } else if (formContainer.dataset.closed !== 'true') {
        formContainer.style.display = 'none';
        formContainer.classList.remove('fade-in');
        body.style.overflow = 'auto';
    }
});


//========================================== enquiry form after few section ================================

// document.addEventListener('DOMContentLoaded', function () {
//     const sections = document.querySelectorAll('section'); // Select all sections within the main content
//     let sectionCounter = 0;

//     window.addEventListener('scroll', function () {
//         sections.forEach((section, index) => {
//             if (section.getBoundingClientRect().top < window.innerHeight && !section.classList.contains('viewed')) {
//                 section.classList.add('viewed');
//                 sectionCounter++;
//                 console.log(`section count: ${sectionCounter}`)

//                 if (sectionCounter>4 && sectionCounter % 4 === 0) { // Check if two sections have been viewed
//                     enquiryForm('registration');
//                 }
//             }
//         });
//     });
// });

// ================================================ form submission =============================================

// function formSubmit(e) {
//     e.preventDefault();
//     const name = document.getElementById('nameInput').value;
//     const phone = document.getElementById('phoneInput').value;
//     const email = document.getElementById('emailInput').value;
//     const enquiryType = document.getElementById('enquiryType').value;
//     // const utm_form_name  = document.getElementById('utm_form_name').value;
//     // console.log(`utm_form_name value: ${utm_form_name}`);
//     console.log("name: " + name + ", phone: " + phone + ", email: " + email);
//     // window.location.assign(`https://thejaingroup.co.in/dream_world_city/form_submit.php?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&enquiryType=${encodeURIComponent(enquiryType)}&utm_form_nam=${encodeURIComponent(utmFormNameValue)}`);
// }


// ===================================== project configuration ==============================

document.addEventListener('DOMContentLoaded', function () {
    const unitCards = document.querySelectorAll('.unit-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    unitCards.forEach(card => {
        card.classList.add('hidden');
        observer.observe(card);
    });
});


// ================================================ amenities ==============================
let currentSlide = 0;
let slideInterval;
const slideIntervalTime = 3000;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const amenitiesListItems = document.querySelectorAll('.amenities-list li');

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;

    amenitiesListItems.forEach((item, idx) => {
        if (idx === currentSlide) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function nextSlide() {
    resetInterval();
    showSlide(currentSlide + 1);
}

function prevSlide() {
    resetInterval();
    showSlide(currentSlide - 1);
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideIntervalTime);
}

function startSlider() {
    showSlide(currentSlide); // Initial call to display the first slide
    slideInterval = setInterval(nextSlide, slideIntervalTime);
}

function stopSlider() {
    clearInterval(slideInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    const amenitiesListItems = document.querySelectorAll('.amenities-list li');
    if (amenitiesListItems.length > 0) {
        amenitiesListItems[0].classList.add('active');
    }
    amenitiesListItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            resetInterval();
            showSlide(index);
        });
    });

    const amenitiesSection = document.querySelector('.amenities');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startSlider();
            } else {
                stopSlider();
            }
        });
    }, observerOptions);

    observer.observe(amenitiesSection);
});

// ================================== floor plan ===============================================

let current = 0;
let floorPlanInterval;
//   const slideIntervalTime = 3000;

function floorPlansShowSlide(index) {
    const slides = document.querySelectorAll('.floor-plans-item');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        current = 0;
    } else if (index < 0) {
        current = totalSlides - 1;
    } else {
        current = index;
    }
    const offset = -current * 100;
    document.querySelector('.floor-plans-container').style.transform = `translateX(${offset}%)`;
}

function floorPlansnextSlide() {
    resetFloorPlanInterval();
    floorPlansShowSlide(current + 1);
}

function floorPlansprevSlide() {
    resetFloorPlanInterval();
    floorPlansShowSlide(current - 1);
}

function resetFloorPlanInterval() {
    clearInterval(floorPlanInterval);
    floorPlanInterval = setInterval(floorPlansnextSlide, 5000);
}

function startFloorPlanSlider() {
    floorPlansShowSlide(current); // Initial call to display the first slide
    floorPlanInterval = setInterval(floorPlansnextSlide, 5000);
}

function stopFloorPlanSlider() {
    clearInterval(floorPlanInterval);
}

// Master Plan
// let masterPlanCurrent = 0;
// let masterPlanInterval;

// function masterfloorPlansShowSlide(masterPlanIndex) {
//     const masterSlides = document.querySelectorAll('.master-floor-plans-item');
//     const mastertotalSlides = masterSlides.length;
//     if (masterPlanIndex >= mastertotalSlides) {
//         masterPlanCurrent = 0;
//     } else if (masterPlanIndex < 0) {
//         masterPlanCurrent = mastertotalSlides - 1;
//     } else {
//         masterPlanCurrent = masterPlanIndex;
//     }
//     const masterPlanOffset = -masterPlanCurrent * 100;
//     document.querySelector('.master-floor-plans-container').style.transform = `translateX(${masterPlanOffset}%)`;
// }

// function masterFloorPlansNextSlide() {
//     resetMasterPlanInterval();
//     masterfloorPlansShowSlide(masterPlanCurrent + 1);
// }

// function masterFloorPlansprevSlide() {
//     resetMasterPlanInterval();
//     masterfloorPlansShowSlide(masterPlanCurrent - 1);
// }

// function resetMasterPlanInterval() {
//     clearInterval(masterPlanInterval);
//     masterPlanInterval = setInterval(masterFloorPlansNextSlide, slideIntervalTime);
// }

// function startMasterPlanSlider() {
//     masterfloorPlansShowSlide(masterPlanCurrent); // Initial call to display the first slide
//     masterPlanInterval = setInterval(masterFloorPlansNextSlide, slideIntervalTime);
// }

// function stopMasterPlanSlider() {
//     clearInterval(masterPlanInterval);
// }

// Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const floorPlansSection = document.querySelector('.floor-plans-section');
    const masterPlanSection = document.querySelector('.floor-plans-tab-content');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startFloorPlanSlider();
            } else {
                stopFloorPlanSlider();
            }
        });
    }, observerOptions);

    const masterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startMasterPlanSlider();
            } else {
                stopMasterPlanSlider();
            }
        });
    }, observerOptions);

    observer.observe(floorPlansSection);
    masterObserver.observe(masterPlanSection);
});

// Floor Plan Tabs
const floorPlansTabs = document.getElementsByClassName('floor-plans-tab');
const floorPlansTabContents = document.getElementsByClassName('floor-plans-tab-content');

function floorPlanShowTab(tabIndex) {
    for (let content of floorPlansTabContents) {
        content.classList.remove('active');
        content.classList.add('hidden');
    }

    setTimeout(() => {
        floorPlansTabContents[tabIndex - 1].classList.remove('hidden');
        floorPlansTabContents[tabIndex - 1].classList.add('active');
    }, 300);
    for (let tab of floorPlansTabs) {
        tab.classList.remove('focus');
    }
    floorPlansTabs[tabIndex - 1].classList.add('focus');
}

floorPlansTabs[0].classList.add('focus');
floorPlanShowTab(1);

// Get the modal
var floorPlanModal = document.getElementById("imageModal");

// Get the modal image
var modalImg = document.getElementById("modalImage");

// Function to open the modal and display the image
function openModal(src) {
    floorPlanModal.style.display = "block";
    modalImg.src = src;
}

// Function to close the modal
function closeModal() {
    floorPlanModal.style.display = "none";
}

// Add click event listeners to all floor plan images

// ======================================== Floor Plan and Gallery image zoom ===================================
document.querySelectorAll('.floor-plans-item img, .master-floor-plans-item img, .gallery-images .img-container img').forEach(function (img) {
    img.addEventListener('click', function () {
        console.log(this.src); // Log the src of the clicked image
        openModal(this.src);
    });
});


// ================================= Gallery ========================================
const tabs = document.getElementsByClassName('gallery-tab');
const tabContents = document.getElementsByClassName('gallery-tab-content');

function showTab(tabIndex) {
    for (let content of tabContents) {
        content.classList.remove('active');
        content.classList.add('hidden');
    }

    setTimeout(() => {
        tabContents[tabIndex - 1].classList.remove('hidden');
        tabContents[tabIndex - 1].classList.add('active');
    }, 300);

    for (let tab of tabs) {
        tab.classList.remove('focus');
    }
    tabs[tabIndex - 1].classList.add('focus');
}

tabs[0].classList.add('focus');
showTab(1);

// ==================================== Map ===========================================
// var mapLoaded = false;
// var loadingMap = false;

// document.getElementById('view-map-btn').addEventListener('click', function () {
//     var skeletonLoader = document.getElementById('skeleton-loader');

//     if (screenWidth > 768) {
//         document.getElementById('map-image-desktop').classList.add('hidden');
//         setTimeout(() => {
//             document.getElementById('map-image-desktop').style.display = 'none';
//             document.getElementById('google-map').style.display = 'block';
//             document.getElementById('google-map').classList.remove('hidden');
//             document.getElementById('view-map-btn').style.display = 'none';
//             document.getElementById('go-back-btn').style.display = 'block';
//         }, 500);
//     } else {
//         document.getElementById('map-image-mobile').classList.add('hidden');
//         setTimeout(() => {
//             document.getElementById('map-image-mobile').style.display = 'none';
//             document.getElementById('google-map').style.display = 'block';
//             document.getElementById('google-map').classList.remove('hidden');
//             document.getElementById('view-map-btn').style.display = 'none';
//             document.getElementById('go-back-btn').style.display = 'block';
//         }, 500);
//     }
//     if (!mapLoaded && !loadingMap) {
//         skeletonLoader.style.display = 'block';
//         loadingMap = true;
//     }

//     document.getElementById('google-map').addEventListener('load', function () {
//         skeletonLoader.style.display = 'none';
//         mapLoaded = true;
//         loadingMap = false;
//     });
// });

// document.getElementById('go-back-btn').addEventListener('click', function () {
//     var skeletonLoader = document.getElementById('skeleton-loader');

//     if (screenWidth > 768) {
//         document.getElementById('google-map').classList.add('hidden');
//         setTimeout(() => {
//             document.getElementById('google-map').style.display = 'none';
//             document.getElementById('map-image-desktop').style.display = 'block';
//             document.getElementById('map-image-desktop').classList.remove('hidden');
//             document.getElementById('view-map-btn').style.display = 'block';
//             document.getElementById('go-back-btn').style.display = 'none';
//         }, 500);
//     } else {
//         document.getElementById('google-map').classList.add('hidden');
//         setTimeout(() => {
//             document.getElementById('google-map').style.display = 'none';
//             document.getElementById('map-image-mobile').style.display = 'block';
//             document.getElementById('map-image-mobile').classList.remove('hidden');
//             document.getElementById('view-map-btn').style.display = 'block';
//             document.getElementById('go-back-btn').style.display = 'none';
//         }, 500);
//     }

//     if (loadingMap) {
//         skeletonLoader.style.display = 'none';
//         loadingMap = false;
//     }
// });

// ==================================== Location advantage ===========================================


let currentLocation = 0;
let locationInterval;
//   const slideIntervalTime = 3000;

function showLocation(index) {
    const locations = document.querySelectorAll('.map-item');
    const totalLocations = locations.length;
    const locationListItems = document.querySelectorAll('.location-list li');

    if (index >= totalLocations) {
        currentLocation = 0;
    } else if (index < 0) {
        currentLocation = totalLocations - 1;
    } else {
        currentLocation = index;
    }

    const offset = -currentLocation * 100;
    document.querySelector('.map-container').style.transform = `translateX(${offset}%)`;

    locationListItems.forEach((item, idx) => {
        if (idx === currentLocation) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function nextLocation() {
    resetLocationInterval();
    showLocation(currentLocation + 1);
}

function prevLocation() {
    resetLocationInterval();
    showLocation(currentLocation - 1);
}

function resetLocationInterval() {
    clearInterval(locationInterval);
    locationInterval = setInterval(nextLocation, 100000000000);
}

function startLocationSlider() {
    showLocation(currentLocation); // Initial call to display the first slide
    locationInterval = setInterval(nextLocation, 100000000000);
}

function stopLocationSlider() {
    clearInterval(locationInterval);
}

// Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const locationMapSection = document.querySelector('.location-map');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startLocationSlider();
            } else {
                stopLocationSlider();
            }
        });
    }, observerOptions);

    observer.observe(locationMapSection);
});

// ============================ project video ===============================

document.getElementById('video-thumbnail').addEventListener('click', function () {
    var iframe = document.getElementById('video-iframe');
    var src = iframe.src;
    iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';

    document.getElementById('video-thumbnail').style.display = 'none';
    document.getElementById('video-wrapper').style.display = 'block';
});

// ======================================= home loan ================================

document.addEventListener('DOMContentLoaded', () => {
    const homeLoanSection = document.querySelector('.home-loan');
    const bankLogos = document.querySelectorAll('.bank-logos img');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bankLogos.forEach((img, index) => {
                    setTimeout(() => {
                        img.classList.add('visible');
                        img.classList.remove('hidden');
                    }, index * 100); // Stagger the animations
                });
                observer.unobserve(homeLoanSection); // Stop observing after the first trigger
            }
        });
    }, observerOptions);

    bankLogos.forEach(img => {
        img.classList.add('hidden');
    });

    observer.observe(homeLoanSection);
});

// ======================================== legacy =====================================

document.addEventListener('DOMContentLoaded', () => {
    const legacySection = document.querySelector('.legacy');
    const stats = document.querySelectorAll('.stat');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.classList.add('visible');
                        stat.classList.remove('hidden');
                    }, index * 200); // Increase the delay to 300ms
                });
                observer.unobserve(legacySection); // Stop observing after the first trigger
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        stat.classList.add('hidden');
    });

    observer.observe(legacySection);
});

// ============================================= footer =========================================

document.addEventListener('DOMContentLoaded', () => {
    const footerSection = document.querySelector('footer');
    const elements = footerSection.querySelectorAll('.developer-office, .site-address');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                        element.classList.remove('hidden');
                    }, index * 600); // Stagger the animations with 300ms delay
                });
                observer.unobserve(footerSection); // Stop observing after the first trigger
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        element.classList.add('hidden');
    });

    observer.observe(footerSection);
});


