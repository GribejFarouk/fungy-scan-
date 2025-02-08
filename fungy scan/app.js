document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const previewContainer = document.querySelector('.preview-container');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsSection = document.querySelector('.results-section');
    const confidenceFill = document.getElementById('confidenceFill');
    const confidenceScore = document.getElementById('confidenceScore');
    const diseaseName = document.getElementById('diseaseName');
    const recommendationsList = document.getElementById('recommendationsList');

    // Drag and drop handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#2ecc71';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ddd';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ddd';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner une image valide.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            previewContainer.hidden = false;
            resultsSection.hidden = true;
        };
        reader.readAsDataURL(file);
    }

    analyzeBtn.addEventListener('click', async () => {
        // Simulate loading state
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyse en cours...';

        // Simulate API call delay
        setTimeout(() => {
            // Mock results - In production, this would be replaced with actual API calls
            const mockResults = {
                disease: 'Mildiou de la tomate',
                confidence: 89,
                recommendations: [
                    'Appliquer un fongicide biologique',
                    'Améliorer la circulation d\'air entre les plants',
                    'Réduire l\'arrosage au niveau des feuilles',
                    'Surveiller les plants voisins pour éviter la propagation'
                ]
            };

            displayResults(mockResults);
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyser l\'image';
        }, 2000);
    });

    function displayResults(results) {
        resultsSection.hidden = false;
        
        // Update disease name
        diseaseName.textContent = results.disease;
        
        // Update confidence score
        confidenceFill.style.width = `${results.confidence}%`;
        confidenceScore.textContent = `${results.confidence}%`;
        
        // Update recommendations
        recommendationsList.innerHTML = '';
        results.recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
});
