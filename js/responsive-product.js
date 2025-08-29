const filterToggle = document.getElementById('filterToggle');
const closeFilters = document.getElementById('closeFilters');
const filtersOverlay = document.getElementById('filtersOverlay');

filterToggle.addEventListener('click', function() {
    filtersOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeFilters.addEventListener('click', function() {
    filtersOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});