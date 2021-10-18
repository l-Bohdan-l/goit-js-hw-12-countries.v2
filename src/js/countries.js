import refs from './refs'
import fetchCountries from './fetchCountries'
import countryTemplate from '../templates/counrtyMarkup.hbs'



const { inputEl, countryList, body, countryCard } = refs;
const debounce = require('lodash.debounce')
inputEl.addEventListener('input', debounce(findCountry, 500));
countryList.addEventListener('click', createCountryCard)

function clearCountries() {
    countryCard.innerHTML = '';
    countryList.innerHTML = '';
}

function findCountry(e) {
    clearCountries();
    let searchQuery = e.target.value;
    fetchCountries(searchQuery);    
}

function createCountryCard(e) {
    e.preventDefault()
    clearCountries();    
    let tagretCountry = e.target.textContent;
    fetchCountries(tagretCountry);    
}
