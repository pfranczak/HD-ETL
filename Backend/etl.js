import axios from 'axios';
import cheerio from 'cheerio';

const URL = 'https://bulldogjob.pl/companies/jobs/s/skills,JavaScript';

async function getHTML(url) {
    const { data } = await axios.get(url);
    return data;
}

function getOfferData($) {
    const SELECTORS = {
        position: '.result-header-name',
        company: '.result-desc-meta .pop-black',
        city: '.result-desc-meta .pop-mobile',
        date: '.result-desc-meta .inline-block',
        salary: '.result-desc-meta .pop-green',
        tags: '.tags'
    }

    const offerData = [];

    Object.keys(SELECTORS).forEach((key) => {
        const selectorText = $.find(SELECTORS[key]).text();

        if (key !== 'tags') {
            offerData[key] = selectorText.replace(/\n/g, '');
        } else {
            offerData[key] = selectorText.replace(/\n{2,}/g, ';').split(';').slice(1, -1);
        }

        offerData.push();
    });

    return offerData;
}

function getNextPage($) {
    const nextPage = $('.next[rel="next"]').attr('href');
    return nextPage ? `https://bulldogjob.pl${$('.next[rel="next"]').attr('href')}` : null;
}

async function getDataFromUrl(url = URL) {
    const html = await getHTML(url);
    const $ = cheerio.load(html);
    const tags = $('.results-list.content .results-list-item');
    const offerData = [];

    for (let i = 0; i < tags.length; i++) {
        offerData.push($(tags[i]).html());
    }

    const nextPageUrl = getNextPage($);

    if (nextPageUrl) {
        return offerData.concat(await getDataFromUrl(nextPageUrl));
    } else {
        return offerData;
    }
};

export {
    getDataFromUrl
};