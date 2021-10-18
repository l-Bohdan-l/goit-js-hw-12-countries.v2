import countryTemplate from '../templates/counrtyMarkup.hbs'
import refs from './refs'
import counrtyListMarkup from '../templates/counrtyListMarkup.hbs'
import { alert, notice, info, success, error, Stack } from '@pnotify/core';
import "../styles.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const { body, countryCard, countryList } = refs;




export default function fetchCountries(searchQuery) {
    const base_url = `https://restcountries.com/v3.1/`;
    let end_point = `name`
    let query_params = `${searchQuery}`
    const url = base_url + end_point + '/' + query_params;
    const myStack = new Stack({
                    delay: 1000,
                    dir1: 'down',
                    dir2: 'left',
                    mode: 'light',
                    firstpos1: 25,
                    firstpos2: 25,
                    spacing1: 36,
                    spacing2: 36,
                    push: 'top',
                    context: document.body,
                    positioned: true,
                    maxStrategy: 'close'                    
                });
    fetch(url)
        .then((result) => {
            if (result.status === 404) {
                const myError = error({
                    title: '404',
                    text: 'Not Found.',
                    stack: myStack,
                });
            }
            // console.log("result", result)
            return result.json()
        })
        .then((data) => {
            if (data.length === 1) {
                // console.log('data', data)
                let counrtyMarkup = countryTemplate(data);
                countryCard.insertAdjacentHTML('beforeend', counrtyMarkup)
            } else if (data.length >= 2 && data.length <= 10) {
                // console.log('data else if', data)
                let countriesListMarkup = counrtyListMarkup(data);
                countryList.insertAdjacentHTML('beforeend', countriesListMarkup)
            } else if (data.length > 10) {
                // console.log('data else', data)                
                const manycountriesError = error({
                    title: 'Oh no!',
                    text: "Too many matches fond. Please enter a more specific query",
                    type: 'error',
                    stack: myStack,
                    
                });
            }

            return data
        })
        .catch((error) => {
            console.log('err', error)           

        })
    
    }
