const express = require ('express')
const puppeteer = require ('puppeteer')
const Handlebars = require ('handlebars')
const fs = require('fs');
const path = require('path');
const app = express()
const port = 3000;

const htmlPath = path.join(__dirname, 'index.html');
const htmlTemplate = fs.readFileSync(htmlPath, 'utf8');

app.use(express.json())

app.post('/generate-pdf', async (req, res) => {
    const { nom, experiences, educations, competences } = req.body;
    console.log('generating')

    // Utilisation de Handlebars pour générer dynamiquement le HTML à partir du modèle et des données reçues
    const template = Handlebars.compile(htmlTemplate);
    const htmlContent = template({ nom, experiences, educations, competences });


    console.log(htmlContent); // Afficher le contenu HTML généré dans la console

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({format: 'A4'})

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');

        res.send(pdfBuffer);
    } catch(error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
    console.log(`Server listening at http://localhost:${port}`)
})