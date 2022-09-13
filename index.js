const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

const writeStream = fs.createWriteStream("quildata.csv");
writeStream.write(`Product Name,Product Price,Product Item,Model Number,Product Description, Product Category\n`);

const URL = 'https://www.quill.com/hanging-file-folders/cbl/4378.html'
axios.get(URL).then((response) => {
    const $ = cheerio.load(response.data)
   
    $('.SearchResultsNew').each(function(index,ele){
        
        if(index>9){
            return
        }
        console.log(index);
        const product_name = $(ele)
            .find('#skuName').text().trim()

        const Product_Price = $(ele).find('#SkuPriceUpdate').text()
        const Item_Number = $(ele).find('.iNumber').text()
        const Model_Number = $(ele).find('.model-number').text()
        const Product_Description = $(ele).find('.skuBrowseBullets').text().trim()
        const product_category = $(response.data).find('.ML_s').text()

        writeStream.write(`${product_name},${Product_Price},${Item_Number},${Model_Number},${Product_Description},${product_category}\n`);
        
    })
    console.log("Show Data.........!");
}).catch((err) => {
    console.log(err);
    
});
