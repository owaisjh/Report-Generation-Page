const express = require('express');
const router = express.Router();

const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');

pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post('/pdf', (req, res, next)=>{
    //res.send('PDF');

    const landmark_one = req.body.landmark_one;
    const village_one = req.body.village_one;

    const landmark_two = req.body.landmark_two;
    const village_two = req.body.village_two;

    const name = req.body.name;

    const contact = req.body.number;

    const email = req.body.email;

    /*

    var documentDefinition = {
        content: [
            `7th December 2020`,
            `\n`,
            `The chairman`,
            `District Road Council`,
            `\n`,
            `Subject: application for construction of a metalled road.`,
            `\n`,
            `Dear Sir/Madam,`,
            `\n`,
            `I, on behalf of the people of ${village_one} and ${village_two}, would like to draw your kind attention to the fact that there is no road connecting the landmarks ${landmark_one} and ${landmark_two}. People from all walks have to use it every day to reach their respective fields. But these unmetalled roads become incovenient to commute, especially in rainy season.`,
            `In the above circumstances, I would request you construct a road between ${landmark_one} and ${landmark_two} at earliest.I hope you take the necessary steps to do so.`,
            `\n`,
            `Yours truly,`,
            `${name}`,
            `+91 ${contact}`
        ]        
    };
    */
   var today=new Date();
   const d=today.toDateString();
   const de=today.toTimeString();

   var documentDefinition = {
       content: [
           `${d}`,
           `\n`,
           `The chairman`,
           `District Road Council`,
           `\n`,
           `Subject: application for construction of a metalled road.`,
           `\n`,
           `Dear Sir/Madam,`,
           `\n`,
           `I, on behalf of the people of ${village_one} and ${village_two}, would like to draw your kind attention to the fact that there is no road connecting the landmarks ${landmark_one} and ${landmark_two}. People from all walks have to use it every day to reach their respective fields. But these unmetalled roads become incovenient to commute, especially in rainy season.`,
           `In the above circumstances, I would request you construct a road between ${landmark_one} and ${landmark_two} at earliest.I hope you take the necessary steps to do so.`,
           `\n`,
           `To Note: New Route captured using the mapify mapping algorithm and system is available, and a system image acquired from embedded data URL is attached for reference on the next pdf`,
           `\n`,
           `Yours truly,`,
           `${name}`,
           `+91 ${contact}`,
           `Email ${email}`,
           `\n`,
           `\n`,
           `\n`,
           `Timestamp: ${de}`
       ]
   };


    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data)=>{
        res.writeHead(200, 
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="filename.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });

});


module.exports = router;