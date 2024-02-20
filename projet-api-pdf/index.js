const express = require ('express')
const puppeteer = require ('puppeteer')
const Handlebars = require ('handlebars')
const fs = require('fs');
const path = require('path');
const cors = require ('cors')
// const mysql = require('mysql2')
require('dotenv').config()

const app = express()
const port = 3000;

app.use(express.json())

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(express.static('public'))

const htmlPath = path.join(__dirname, 'template.html');
const htmlTemplate = fs.readFileSync(htmlPath, 'utf8');

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });


app.post('/generate-pdf', async (req, res) => {
    console.log('Donnéeds reçues:', req.body)

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

function savePDF(buffer, filename) {
    const pdfPath = path.join(__dirname, 'path/to/pdfs', filename);
    fs.writeFile(pdfPath, buffer, err => {
        if (err) {
            console.error('Erreur lors de la sauvegarde du fichier PDF:', err);
        } else {
            console.log('PDF sauvegardé avec succès:', pdfPath);
        }
    });
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})