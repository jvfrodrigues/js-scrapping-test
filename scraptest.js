const axios = require('axios')
const cheerio = require('cheerio')
// const url = 'https://www.bcb.gov.br/estabilidadefinanceira/cotacoestodas';
const url = 'https://www.x-rates.com/table/?from=BRL&amount=1';
const dictionary = [{ name: 'US Dollar', nom: 'USD' }, { name: 'Euro', nom: 'EUR' }, { name: 'Indian Rupee', nom: 'INR' }]
const acceptedValues = []

axios(url).then(response => {
  const html = response.data;
  console.log(typeof html)
  const $ = cheerio.load(html)
  const ratesTable = $('.tablesorter')
  const ratesRow = ratesTable.find('tr')
  ratesRow.each((index, element) => {
    ratesData = $(element).find('td')
    const coinIndex = dictionary.findIndex((item) => item.name.match($(ratesData[0]).text().trim()) && $(ratesData[0]).text().trim() !== '')
    if (coinIndex !== -1) {
      acceptedValues.push({
        coin: dictionary[coinIndex].nom,
        exchange: Number($(ratesData[1]).text())
      })
    }
  })
  console.log(acceptedValues)
}).catch(err => console.log(err))
