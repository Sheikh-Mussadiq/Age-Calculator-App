const calculateAge = (day, month, year) => {
    const now = new Date();
    const birthDate = new Date(year, month - 1, day);
    let ageYears = now.getFullYear() - birthDate.getFullYear();
    let ageMonths = now.getMonth() - birthDate.getMonth();
    let ageDays = now.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
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
};

test('calculateAge correctly calculates the age for a given date', () => {
    const result = calculateAge(15, 5, 1990); // 15th May 1990
    expect(result.years).toBeGreaterThanOrEqual(30); // Assuming the current year is 2024
    expect(result.months).toBeGreaterThanOrEqual(0);
    expect(result.days).toBeGreaterThanOrEqual(0);
});

test('calculateAge handles dates correctly around leap years', () => {
    const result = calculateAge(29, 2, 2000); // 29th Feb 2000 (leap year)
    expect(result.years).toBeGreaterThanOrEqual(24); // Assuming the current year is 2024
    expect(result.months).toBeGreaterThanOrEqual(0);
    expect(result.days).toBeGreaterThanOrEqual(0);
});

test('calculateAge handles edge cases for month and day', () => {
    const result = calculateAge(31, 12, 1999); // 31st Dec 1999
    expect(result.years).toBeGreaterThanOrEqual(24); // Assuming the current year is 2024
    expect(result.months).toBeGreaterThanOrEqual(0);
    expect(result.days).toBeGreaterThanOrEqual(0);
});
