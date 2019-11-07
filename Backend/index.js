import axios from 'axios';
import cheerio from 'cheerio';

async function getHTML(url) {
    const {data} = await axios.get(url);
    return data;
}

function getOfferData ($) {
    const SELECTORS = {
        position: '.result-header-name',
        company: '.result-desc-meta .pop-black',
        city: '.result-desc-meta .pop-mobile',
        date: '.result-desc-meta .inline-block',
        salary: '.result-desc-meta .pop-green',
        tags: '.tags'
    }

    const offerData = {};

    Object.keys(SELECTORS).forEach((key) => {
        const selectorText = $.find(SELECTORS[key]).text();
        if (key !== 'tags') {
            offerData[key] = selectorText.replace(/\n/g,'');
        } else {
            offerData[key] = selectorText.replace(/\n{2,}/g, ';').split(';').slice(1, -1);
        }
    });

    return offerData;
}

async function start() {
    const html = await getHTML('https://bulldogjob.pl/companies/jobs/s/skills,JavaScript');
    const $ = cheerio.load(html);
    const tags = $('.results-list.content .results-list-item');
    const offerData = [];

    for (let i = 0; i < tags.length; i++) {
        offerData.push(getOfferData($(tags[i])));
    }

    console.log(offerData);
}

start();