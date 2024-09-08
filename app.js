function checkConsumption() {
  
    const userFuel = parseFloat(document.getElementById('fuel').value);
    const userHours = parseFloat(document.getElementById('hours').value);

    const averageFuel = 40000; 
    const averageHours = 1800; 

    // Validate input
    if (isNaN(userFuel) || userFuel <= 0 || isNaN(userHours) || userHours <= 0) {
        alert("Please enter valid values for both fuel consumption and work hours.");
        return;
    }
    document.getElementById('chart-container').style.display = 'block';

    // Chart.js data: Compare both fuel consumption and machine work hours
    const data = {
        labels: ['Your Fuel Consumption', 'Average Fuel Consumption', 'Your Work Hours', 'Average Work Hours'],
        datasets: [{
            label: 'Comparison',
            data: [userFuel, averageFuel, userHours, averageHours],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 2
        }]
    };

    
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
        }
    };

    // Destroy the previous chart instance if it exists
    if (window.consumptionChartInstance) {
        window.consumptionChartInstance.destroy();
    }

    
    const ctx = document.getElementById('consumptionChart').getContext('2d');
    window.consumptionChartInstance = new Chart(ctx, config);

    const tipsContainer = document.getElementById('tips');
    tipsContainer.style.display = 'block';

    if (userFuel > averageFuel || userHours > averageHours) {
        let message = '<h3>Tips to Reduce Fuel Consumption and Optimize Machine Usage</h3><ul>';
        if (userFuel > averageFuel) {
            message += '<li>Reduce fuel consumption by using more efficient vehicles and optimizing routes.</li>';
        }
        if (userHours > averageHours) {
            message += '<li>Optimize machine work hours by scheduling maintenance and improving task efficiency.</li>';
        }
        message += '</ul><p>Your fuel consumption or work hours are <strong>above average</strong>. Consider the tips above to reduce usage and improve efficiency.</p>';
        tipsContainer.innerHTML = message;
    } else {
        tipsContainer.innerHTML = `
            <h3>Great Job!</h3>
            <p>Your fuel consumption and machine work hours are <strong>below the industry average</strong>. Keep up the good work and continue exploring energy-efficient options!</p>
        `;
    }
}
