const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggleBtn.querySelector('i');

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.replace('bx-moon', 'bx-sun');
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light');
    }
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const scrollLinks = document.querySelectorAll('.scroll-link');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const menuIcon = mobileMenuBtn.querySelector('i');
    if(navLinks.classList.contains('active')) {
        menuIcon.classList.replace('bx-menu', 'bx-x');
    } else {
        menuIcon.classList.replace('bx-x', 'bx-menu');
    }
});

scrollLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.replace('bx-x', 'bx-menu');
    });
});

const realEstateImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1cde2d9d0d9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&w=800&q=80'
];

const properties = [];
const locs = ['Laguna', 'Cavite', 'Batangas', 'Makati', 'BGC', 'Cebu', 'Davao'];
const propTypes = ['lot', 'house', 'condo'];
const typeLabels = { lot: 'For Sale Residential Lot', house: 'For Sale House & Lot', condo: 'For Sale Condominium' };
const prefixes = ['Luxury', 'Modern', 'Spacious', 'Premium', 'Cozy', 'Elegant'];

for(let i=1; i<=54; i++) {
    let typeVal = propTypes[Math.floor(Math.random() * propTypes.length)];
    let locVal = locs[Math.floor(Math.random() * locs.length)];
    let priceNum = Math.floor(Math.random() * 25) + 3;
    let priceStr = '₱ ' + priceNum + '.00 million';
    let sqm = Math.floor(Math.random() * 400) + 40;
    let pps = '(₱ ' + Math.floor((priceNum*1000000)/sqm).toLocaleString('en-US') + '/sqm)';
    let title = prefixes[Math.floor(Math.random() * prefixes.length)] + ' ' + typeLabels[typeVal];
    let bedsHtml = typeVal === 'lot' ? sqm + ' sqm.' : Math.floor(Math.random()*4+1) + ' Beds • ' + sqm + ' sqm.';
    let propImg = realEstateImages[i % realEstateImages.length];
    
    properties.push({
        id: i,
        priceVal: priceNum * 1000000,
        price: priceStr,
        pricePerSqm: pps,
        type: typeLabels[typeVal],
        specs: bedsHtml,
        sqm: sqm,
        location: locVal + ', Philippines',
        desc: title + ' located in ' + locVal + '.',
        updated: 'Updated ' + Math.floor(Math.random()*24+1) + ' hours ago',
        image: propImg,
        photosCount: Math.floor(Math.random() * 25) + 3,
        filterType: typeVal,
        filterLoc: locVal.toLowerCase(),
        timestamp: new Date().getTime() - Math.floor(Math.random()*10000000)
    });
}

const grid = document.getElementById('propertyGrid');
const paginationControls = document.getElementById('paginationControls');
let currentPage = 1;
const itemsPerPage = 6;
let currentFilteredProperties = [];

window.resetFilters = function() {
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('locFilter').value = 'all';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchBtn').click();
};

window.triggerLocationSearch = function(val) {
    document.getElementById('locFilter').value = val;
    document.getElementById('searchBtn').click();
    document.getElementById('infoModal').classList.remove('active');
};

function renderProperties(data, page = 1) {
    grid.innerHTML = '';
    currentFilteredProperties = data;
    
    if (data.length === 0) {
        grid.innerHTML = `
            <div class='no-results-box'>
                <h3>No properties found matching your criteria.</h3>
                <p>Try adjusting your search filters or keyword to find what you are looking for.</p>
                <button class='btn-primary' onclick='resetFilters()'>View All Properties</button>
            </div>
        `;
        paginationControls.innerHTML = '';
        return;
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = data.slice(startIndex, endIndex);

    paginatedItems.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'prop-card';
        card.innerHTML = `
            <div class='prop-img-wrap'>
                <img src='${prop.image}' alt='Property'>
                <div class='img-count'><i class='bx bx-image-alt'></i> ${prop.photosCount}</div>
            </div>
            <div class='prop-content'>
                <div class='prop-price'>${prop.price}</div>
                <div class='prop-sqm-price'>${prop.pricePerSqm}</div>
                <div class='prop-desc'><i class='bx bx-home'></i> ${prop.type}</div>
                <div class='prop-loc'><i class='bx bx-area'></i> ${prop.specs}</div>
                <div class='prop-loc'><i class='bx bx-map'></i> ${prop.location}</div>
                <p style='font-size: 0.95rem; margin-bottom: 1rem; font-weight: 600;'>${prop.desc}</p>
                <div class='prop-footer'>
                    <span class='update-time'>${prop.updated}</span>
                    <button class='contact-btn trigger-modal' data-target='contactModal'><i class='bx bx-message-square-dots'></i> Contact</button>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if(e.target.closest('.contact-btn')) return;
            openInfoModal('Property Details', prop.image, prop.desc, `
                <div class='detail-grid'>
                    <div class='detail-item'>
                        <div class='detail-label'>Listing Type</div>
                        <div class='detail-value'>For Sale</div>
                    </div>
                    <div class='detail-item'>
                        <div class='detail-label'>Category</div>
                        <div class='detail-value'>${prop.type.replace('For Sale ', '')}</div>
                    </div>
                    <div class='detail-item'>
                        <div class='detail-label'>Total Area</div>
                        <div class='detail-value'>${prop.sqm} sqm</div>
                    </div>
                    <div class='detail-item'>
                        <div class='detail-label'>Turnover Condition</div>
                        <div class='detail-value'>Fully Fitted</div>
                    </div>
                </div>

                <p class='justified-text'>Discover premium living in this highly sought-after location in ${prop.location}. This property is meticulously designed to offer a perfect blend of luxury, comfort, and security. Surrounded by lush landscapes and modern conveniences, it stands as an exceptional choice for both families and strategic investors.</p>
                
                <div class='financing-box'>
                    <div class='financing-title'><i class='bx bx-building-house'></i> Financing Options</div>
                    <p><strong>Bank Financing:</strong> 20% Downpayment | Up to 20 years @ 7% interest</p>
                    <p><strong>Pag-IBIG Fund:</strong> Applicable for verified members up to 30 years</p>
                    <p><strong>In-House:</strong> 5 years @ 10% interest</p>
                </div>

                <p style='margin-bottom: 15px;'><strong>Community Features:</strong> 24/7 Security, Clubhouse, Playground, Parks</p>

                <button class='btn-primary' style='margin-top:20px;' onclick='document.getElementById("infoModal").classList.remove("active"); document.getElementById("contactModal").classList.add("active");'>Inquire About This Property</button>
            `);
        });

        grid.appendChild(card);
    });

    renderPagination(data.length, page);
}

function renderPagination(totalItems, page) {
    paginationControls.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    currentPage = page;
    
    if(totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '<i class="bx bx-chevron-left"></i>';
    prevBtn.disabled = currentPage === 1;
    if(currentPage === 1) prevBtn.style.opacity = '0.5';
    prevBtn.addEventListener('click', () => {
        if(currentPage > 1) {
            renderProperties(currentFilteredProperties, currentPage - 1);
            document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
        }
    });
    paginationControls.appendChild(prevBtn);

    for(let i = 1; i <= totalPages; i++) {
        if(i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            btn.innerText = i;
            btn.addEventListener('click', () => {
                renderProperties(currentFilteredProperties, i);
                document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
            });
            paginationControls.appendChild(btn);
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            const dots = document.createElement('span');
            dots.innerText = '...';
            dots.style.padding = '8px';
            paginationControls.appendChild(dots);
        }
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '<i class="bx bx-chevron-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    if(currentPage === totalPages) nextBtn.style.opacity = '0.5';
    nextBtn.addEventListener('click', () => {
        if(currentPage < totalPages) {
            renderProperties(currentFilteredProperties, currentPage + 1);
            document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
        }
    });
    paginationControls.appendChild(nextBtn);
}

function sortData(data, sortType) {
    let sorted = [...data];
    if(sortType === 'price-low') {
        sorted.sort((a, b) => a.priceVal - b.priceVal);
    } else if(sortType === 'price-high') {
        sorted.sort((a, b) => b.priceVal - a.priceVal);
    } else {
        sorted.sort((a, b) => b.timestamp - a.timestamp);
    }
    return sorted;
}

renderProperties(sortData(properties, 'newest'), 1);

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
    const typeVal = document.getElementById('typeFilter').value;
    const locVal = document.getElementById('locFilter').value;
    const keyword = document.getElementById('searchInput').value.toLowerCase();

    const filtered = properties.filter(prop => {
        const matchType = typeVal === 'all' || prop.filterType === typeVal;
        const matchLoc = locVal === 'all' || prop.filterLoc === locVal;
        const matchKey = prop.desc.toLowerCase().includes(keyword) || prop.location.toLowerCase().includes(keyword);
        return matchType && matchLoc && matchKey;
    });

    renderProperties(sortData(filtered, 'newest'), 1);
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        const val = tag.getAttribute('data-val');
        if(val === 'all') {
            document.getElementById('typeFilter').value = 'all';
        } else {
            document.getElementById('typeFilter').value = val;
        }
        document.getElementById('locFilter').value = 'all';
        document.getElementById('searchInput').value = '';
        searchBtn.click();
    });
});

const contactModal = document.getElementById('contactModal');
const infoModal = document.getElementById('infoModal');
const infoContentBody = document.getElementById('infoContentBody');
const inquiryForm = document.getElementById('inquiryForm');

document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.trigger-modal');
    if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        const targetId = trigger.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    }
});

function openInfoModal(title, imgUrl, headline, bodyHtml, bgPos = 'center') {
    let heroHtml = '';
    if (imgUrl) {
        heroHtml = `<div class='info-hero active' style='background-image: url(${imgUrl}); background-position: ${bgPos};'></div>`;
    }

    infoContentBody.innerHTML = `
        <button class='close-modal' data-close='infoModal'><i class='bx bx-x'></i></button>
        ${heroHtml}
        <div class='info-body'>
            <h2>${title}</h2>
            <h3>${headline}</h3>
            <div class='content-wrapper'>
                ${bodyHtml}
            </div>
        </div>
    `;
    infoModal.classList.add('active');
}

const angelBioBtn = document.getElementById('angelBioBtn');
if (angelBioBtn) {
    angelBioBtn.addEventListener('click', () => {
        openInfoModal(
            'Founder Profile', 
            null, 
            'Angel May O. Ticsay', 
            `
            <p class='justified-text'>Angel May Ticsay is a founder and proud owner of Seraphina Heights Realty, a company built with the vision of creating elegant, secure, and high-quality communities where individuals and families can truly feel at home. My passion for real estate began with the belief that properties are more than investments they are spaces where dreams, memories, and futures are built.</p>
            <p class='justified-text'>With dedication, integrity, and a strong commitment to excellence, I established Seraphina Heights Realty to provide reliable and professional real estate services that prioritize customer satisfaction and long-term value. I strive to lead the company with innovation and purpose, ensuring that every property we offer reflects comfort, sophistication, and modern living.</p>
            <p class='justified-text'>My experience in real estate has allowed me to understand the different needs of homeowners, investors, and business clients. Through this, I continue to guide Seraphina Heights Realty in delivering exceptional service, strategic property solutions, and communities designed to inspire growth and peaceful living.</p>
            <p class='justified-text'>At Seraphina Heights Realty, my mission is to help people find not only beautiful properties but also opportunities that will secure their future and improve their quality of life. I believe that with trust, dedication, and visionary leadership, we can create developments that leave a lasting impact for generations to come.</p>
            `,
            'top center'
        );
    });
}

const marcusBioBtn = document.getElementById('marcusBioBtn');
if (marcusBioBtn) {
    marcusBioBtn.addEventListener('click', () => {
        openInfoModal(
            'Executive Team', 
            null, 
            'Marcus Reyes', 
            `<p class='justified-text'>Marcus Reyes brings over 15 years of elite property planning experience to Seraphina Heights. Known for his sharp market insights and unparalleled negotiation skills, Marcus ensures that every client secures the best possible value for their investments. He specializes in high-end commercial estates and sprawling residential lots.</p>`,
            'top center'
        );
    });
}

const elenaBioBtn = document.getElementById('elenaBioBtn');
if (elenaBioBtn) {
    elenaBioBtn.addEventListener('click', () => {
        openInfoModal(
            'Executive Team', 
            null, 
            'Elena Cruz', 
            `<p class='justified-text'>As our premier Luxury Condo Specialist, Elena Cruz is the bridge between modern professionals and their dream city-center lifestyles. Her impeccable taste in modern architecture and deep understanding of metropolitan real estate makes her the perfect guide for navigating high-rise investments.</p>`,
            'top center'
        );
    });
}

document.querySelectorAll('.seller-trigger').forEach(card => {
    card.addEventListener('click', () => {
        openInfoModal('Seller Program', null, 'Post your property for free', `
            <p class='justified-text'>Join over 400,000+ buyers looking for properties exactly like yours. Our platform auto-generates your listings into professional video ads to speed up your sales.</p>
            <p><strong>Benefits:</strong></p>
            <ul style='margin-left: 20px; margin-bottom: 15px;'>
                <li>Zero upfront posting fees</li>
                <li>Access to our exclusive CRM</li>
                <li>Professional online business card</li>
            </ul>
            <button class='btn-primary' style='margin-top:15px;' onclick='document.getElementById("infoModal").classList.remove("active"); document.getElementById("contactModal").classList.add("active");'>Get Started Now</button>
        `);
    });
});

document.querySelectorAll('.loc-trigger').forEach(card => {
    card.addEventListener('click', () => {
        const city = card.getAttribute('data-city');
        const desc = card.getAttribute('data-desc');
        const filterVal = card.getAttribute('data-filter');
        openInfoModal('Location Spotlight', null, city, `
            <p class='justified-text'>${desc}</p>
            <p class='justified-text'>Our market insights indicate a high return on investment for properties situated in this area. It boasts an excellent combination of accessibility, secure neighborhoods, and rapid commercial growth.</p>
            <button class='btn-primary' style='margin-top:15px;' onclick='triggerLocationSearch("${filterVal}")'>View Properties Here</button>
        `);
    });
});

const legalContent = {
    'privacy': { title: 'Privacy Policy', text: 'We value your absolute privacy. Seraphina Heights Realty ensures that all your data, contact information, and property inquiries are securely encrypted and never shared with third parties without your explicit consent.' },
    'terms': { title: 'Terms of Service', text: 'By using the Seraphina Heights Realty platform, you agree to our standard terms of service. All property prices, availabilities, and listed features are subject to change without prior notice. Project reservations and initial downpayments are strictly non-refundable.' },
    'cookie': { title: 'Cookie Policy', text: 'Our platform utilizes essential cookies to ensure you get the absolute best browsing experience, optimize your localized property searches, and keep your session completely secure while browsing our exclusive listings.' },
    'license': { title: 'Brokerage License', text: 'Seraphina Heights Realty operates under strict compliance with the laws of the Republic of the Philippines. We are fully licensed under the Professional Regulation Commission (PRC) and the Department of Human Settlements and Urban Development (DHSUD).' }
};

document.querySelectorAll('.legal-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const type = link.getAttribute('data-legal');
        openInfoModal('Legal Information', null, legalContent[type].title, `<p class='justified-text'>${legalContent[type].text}</p>`);
    });
});

document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.close-modal');
    if (closeBtn) {
        const targetId = closeBtn.getAttribute('data-close');
        document.getElementById(targetId).classList.remove('active');
    }
});

window.addEventListener('click', (e) => {
    if (e.target === contactModal) contactModal.classList.remove('active');
    if (e.target === infoModal) infoModal.classList.remove('active');
});

inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent successfully! Our agent will contact you soon.');
    contactModal.classList.remove('active');
    inquiryForm.reset();
});