function extractCalibrationValue(line) {
    const digits = line.match(/\d/g);
    if (!digits || digits.length === 0) return 0;
    const firstDigit = digits[0];
    const lastDigit = digits[digits.length - 1];
    return parseInt(firstDigit + lastDigit, 10);
}

function sumCalibrationValues(fileContent) {
    const lines = fileContent.trim().split('\n');
    let output = "";


    lines.forEach(line => {
        const value = extractCalibrationValue(line);
        output += `<div class="result-item">Ligne : <span class="line">${line}</span> → Valeur : <span class="value">${value}</span></div>`;
    });

    const totalSum = lines.reduce((sum, line) => sum + extractCalibrationValue(line), 0);
    output += `<div class="total-sum">La somme des valeurs d'étalonnage est : <span class="value">${totalSum}</span></div>`;


    document.getElementById("results").innerHTML = output;
}


function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target.result;
        sumCalibrationValues(content);
    };
    reader.readAsText(file);
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('file-input').addEventListener('change', handleFileSelect, false);
});