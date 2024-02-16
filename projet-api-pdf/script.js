document.getElementById('cvForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nom = document.getElementById('nom').value;
    const age = document.getElementById('age').value;
    const adresse = document.getElementById('adresse').value;

    const data = {
        nom, age, adresse
    };

    console.log(data)

    try {
        const response = await fetch('http://localhost:3000/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'cv.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            console.error('Erreur lors de la génération du PDF');
            alert('Une erreur est survenue lors de la génération du PDF.');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la communication avec le serveur.');
    }
});