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

function getNextPage($) {
    const nextPage = $('.next[rel="next"]').attr('href');
    return nextPage ? `https://bulldogjob.pl${$('.next[rel="next"]').attr('href')}` : null;
}

async function getDataFromUrl (url) {
    const html = await getHTML(url);
    const $ = cheerio.load(html);
    const tags = $('.results-list.content .results-list-item');
    const offerData = [];

    for (let i = 0; i < tags.length; i++) {
        offerData.push(getOfferData($(tags[i])));
    }

    const nextPageUrl = getNextPage($);

    if (nextPageUrl) {
       return offerData.concat(await getDataFromUrl(nextPageUrl));
    } else {
        return offerData;
    }
};

async function start() {
    const offerData = await getDataFromUrl('https://bulldogjob.pl/companies/jobs/s/skills,JavaScript');
    console.log(offerData.length);
}

start();