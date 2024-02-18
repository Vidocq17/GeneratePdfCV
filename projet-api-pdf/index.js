const express = require ('express')
const puppeteer = require ('puppeteer')
const Handlebars = require ('handlebars')
const fs = require('fs');
const path = require('path');
const cors = require ('cors')
const app = express()
const port = 3000;

app.use(express.json())

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

const htmlPath = path.join(__dirname, 'template.html');
const htmlTemplate = fs.readFileSync(htmlPath, 'utf8');


app.post('/generate-pdf', async (req, res) => {
    console.log('Donnéeds reçues:', req.body)

    // Utilisation de Handlebars pour générer dynamiquement le HTML à partir du modèle et des données reçues
    const template = Handlebars.compile(htmlTemplate);
    const htmlContent = template(req.body);

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({format: 'A4'})

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');

        res.send(pdfBuffer);

    } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
        res.status(500).send('Erreur lors de la génération du PDF');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})