const express = require('express');
const bodyParser = require('body-parser');
const wikipedia = require("wikipedia");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{

    res.render("index", {homepage: "Home", title: "Title", extract: "Extract...", imgurl: "https://upload.wikimedia.org/wikipedia/en/4/4a/Commons-logo.svg", alsoread: "Wikipedia"});
})
app.post('/', async (req, res) => {

    let search = req.body.search;

    try {
        let page = await wikipedia.page(search);
        let title = page.title;
        let fullUrl = page.fullurl;
        let summary = await page.summary();
        let extract = summary.extract;
        let searchTag = await wikipedia.search(title);
        let alsoread = searchTag.results[searchTag.results.length-1].title;
        let images = await page.images();
        let imgUrl = images[1].url;

        res.render("index", {homepage: title, title: title, extract: extract, fullurl: fullUrl, imgurl: imgUrl, alsoread: alsoread})
    } catch (error) {
        res.render("error404", {error: error});
    }
    

    
    
    
})

app.listen(port,()=>{

    console.log(`Running on port ${port}`);
    
})