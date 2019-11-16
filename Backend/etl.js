import axios from 'axios';
import cheerio from 'cheerio';

const URL = 'https://bulldogjob.pl/companies/jobs/s/skills,JavaScript';

async function getHTML(url) {
    const { data } = await axios.get(url);
    return data;
}

function getOfferData(html) {
    const $ = cheerio.load(html);
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
        const selectorText = $(SELECTORS[key]).text();
 
        if (key === 'salary') {
            const salary = selectorText.replace(/\n|Od|/g, '').split('-');
            let salaryTopWithCurrency = '';
            let currency = '';
            let salaryTop = '';
            offerData.salaryLow = salary[0].trim();

            if (salary[1]) {
                salaryTopWithCurrency = salary[1].trim().split(' ');
                currency = salaryTopWithCurrency.pop();
                salaryTop = salaryTopWithCurrency.join(' ');
            }

            offerData.salaryTop = salaryTop;
            offerData.currency = currency;
        } else if (key === 'city') {
            offerData[key] = selectorText.replace(/\n/g, '').split(',');
        } else if (key !== 'tags') {
            offerData[key] = selectorText.replace(/\n/g, '');
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
    getDataFromUrl,
    getOfferData
};