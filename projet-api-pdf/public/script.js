document.getElementById('cvForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const data = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value,
        profil: document.getElementById('profil').value,
        experiences: document.getElementById('experiences').value.split(",").map(item => item.trim()), // Assurez-vous de traiter correctement les listes
        parcours_professionnel: document.getElementById('parcours_professionnel').value.split(",").map(item => item.trim()),
        competences: document.getElementById('competences').value.split(",").map(item => item.trim())
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