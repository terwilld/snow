require('dotenv').config()
const CJbearerToken = process.env.cjbearer;
const axios = require('axios');
const { application } = require('express');
// var convert = require('xml-js');
// var xml2js = require('xml2js');
// var parser = require('xml2json');
var parseString = require('xml2js').parseString;


module.exports.index = async (req, res) => {
    console.log(mockCJurl)
    res.render("cj/index.ejs", { mockCJurl: mockCJurl })
}

module.exports.linkSearch = async (req, res) => {
    console.log("Test")
    console.log(CJbearerToken)
    console.log(req.query)
    // const config = {
    //     headers: { "Authorization": `bearer ${CJbearerToken}` },
    //     params: { "website-id": 101224178, "keywords": "endurance" }
    // };

    // const bodyParameters = {};
    // const data = await axios.get(
    //     'https://link-search.api.cj.com/v2/link-search',
    //     bodyParameters,
    //     config
    // )

    const data = await axios.get(
        'https://link-search.api.cj.com/v2/link-search',
        {
            headers: { "Authorization": `Bearer ${CJbearerToken}` },
            params: { "website-id": 101224178, "keywords": req.query.keywords }
        }
    )
    // console.log(data.data)

    responseXML = data.data
    console.log(responseXML)
    // const jsonResult = parseString(responseXML, function (err, result) {
    //     console.dir(result);
    //     return(result)
    // });
    const result = await new Promise((resolve, reject) => parseString(responseXML, (err, result) => {
        if (err) reject(err);
        else resolve(result);
    }));
    const links = result["cj-api"].links[0].link
    console.log(links[0])


    //console.log(jsonResult)
    // var parser = new xml2js.Parser();
    // jsonData = xml2js.toJson(responseXML)

    // console.log(jsonData)
    // var result1 = convert.xml2json(response, { compact: true, spaces: 4 });
    // console.log(result1)
    // const links = result1['cj-api']
    // console.log(links)

    res.render('cj/linksearchresults.ejs', { links })

}