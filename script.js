document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input values
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    // Clear previous errors
    clearErrors();
    
    // Validate inputs
    if (!isValidDate(day, month, year)) {
        displayErrors(day, month, year);
        return;
    }

    // Calculate age
    const age = calculateAge(day, month, year);
    
    // Display results
    document.querySelector('.form__result--day').innerText = age.years;
    document.querySelector('.form__result--month').innerText = age.months;
    document.querySelector('.form__result--year').innerText = age.days;
});

function clearErrors() {
    document.querySelector('.error--day').classList.add('hidden');
    document.querySelector('.error--month').classList.add('hidden');
    document.querySelector('.error--year').classList.add('hidden');
}

function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}

function displayErrors(day, month, year) {
    if (isNaN(day) || day < 1 || day > 31) {
        document.querySelector('.error--day').classList.remove('hidden');
        document.querySelector('.error--day').innerText = 'Invalid day';
    }
    if (isNaN(month) || month < 1 || month > 12) {
        document.querySelector('.error--month').classList.remove('hidden');
        document.querySelector('.error--month').innerText = 'Invalid month';
    }
    if (isNaN(year) || year.toString().length !== 4) {
        document.querySelector('.error--year').classList.remove('hidden');
        document.querySelector('.error--year').innerText = 'Invalid year';
    }
}

function calculateAge(day, month, year) {
    const todayDate = new Date();
    const birthDate = new Date(year, month - 1, day);
    let ageYears = todayDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = todayDate.getMonth() - birthDate.getMonth();
    let ageDays = todayDate.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    return {
        years: ageYears,
        months: ageMonths,
        days: ageDays
    };
}
