const transportData = {
    "110011": { "city": "Mumbai", "state": "Maharashtra", "b2b": 1, "b2c": 2, "available": true },
    "220011": { "city": "Delhi", "state": "Delhi", "b2b": 1, "b2c": 2, "available": true },
    "330022": { "city": "Kolkata", "state": "West Bengal", "b2b": 1, "b2c": 3, "available": true },
    "440033": { "city": "Chennai", "state": "Tamil Nadu", "b2b": 1, "b2c": 2, "available": true },
    "221106": { "city": "Varanasi", "state": "Uttar Pradesh", "b2b": 2, "b2c": 3, "available": false },
    "467011": { "city": "Nasik", "state": "Maharashtra", "b2b": 2, "b2c": 4, "available": true },
    "786533": { "city": "Pune", "state": "Maharashtra", "b2b": 2, "b2c": 3, "available": true },
    "908765": { "city": "Dibrugarh", "state": "Assam", "b2b": 4, "b2c": 5, "available": false },
    "346789": { "city": "Guwahati", "state": "Assam", "b2b": 4, "b2c": 6, "available": true },
    "654980": { "city": "Bangalore", "state": "Karnataka", "b2b": 3, "b2c": 4, "available": true },
    "432795": { "city": "Hyderabad", "state": "Telangana", "b2b": 3, "b2c": 5, "available": true },
    "546699": { "city": "Jorhat", "state": "Assam", "b2b": 7, "b2c": 8, "available": false }
};

function showSourceDetails() {
    const pincode = document.getElementById('sourcePincode').value;
    const details = document.getElementById('sourceDetails').getElementsByTagName('tbody')[0];

    if (pincode in transportData) {
        const locationData = transportData[pincode];
        details.innerHTML = `
            <tr>
                <td>${locationData.city}</td>
                <td>${locationData.state}</td>
                <td>${locationData.available ? '✔️' : '❌'}</td>
            </tr>
        `;
    } else {
        details.innerHTML = `
            <tr>
                <td>-</td>
                <td>-</td>
                <td>❌</td>
            </tr>
        `;
    }
}

function showDestinationDetails() {
    const pincode = document.getElementById('destinationPincode').value;
    const details = document.getElementById('destinationDetails').getElementsByTagName('tbody')[0];

    if (pincode in transportData) {
        const locationData = transportData[pincode];
        details.innerHTML = `
            <tr>
                <td>${locationData.city}</td>
                <td>${locationData.state}</td>
                <td>${locationData.available ? '✔️' : '❌'}</td>
            </tr>
        `;
    } else {
        details.innerHTML = `
            <tr>
                <td>-</td>
                <td>-</td>
                <td>❌</td>
            </tr>
        `;
    }
}

function checkTransportDays() {
    const sourcePincode = document.getElementById('sourcePincode').value;
    const destinationPincode = document.getElementById('destinationPincode').value;
    const serviceType = document.getElementById('serviceType').value; // Get the selected service type
    const pickupDate = new Date(document.getElementById('pickupDate').value); // Get the pickup date

    const source = transportData[sourcePincode];
    const destination = transportData[destinationPincode];

    let resultText = '';

    // Check if source and destination exist and are available
    if (!source || !destination) {
        resultText = 'Invalid pin code(s). Please check and try again.';
    } else if (!source.available || !destination.available) {
        resultText = 'Transport is not available from the selected source or to the destination.';
    } else if (isNaN(pickupDate.getTime())) {
        resultText = 'Please select a valid pickup date.';
    } else {
        const transportDays = Math.max(source[serviceType], destination[serviceType]); // Use the selected service type
        const arrivalDate = new Date(pickupDate);
        arrivalDate.setDate(arrivalDate.getDate() + transportDays); // Add transport days

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        resultText = `Transport from ${source.city}, ${source.state} to ${destination.city}, ${destination.state} will take ${transportDays} day(s). It will arrive on ${arrivalDate.toLocaleDateString(undefined, options)}.`;
    }

    document.getElementById('result').innerText = resultText;
}
