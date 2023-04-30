const button = document.querySelector(".btn");

button.addEventListener("click", () => {
    let day = document.getElementById("day").value;
    let month = document.getElementById("month").value;
    let year = document.getElementById("year").value;
    const errorMsg = document.querySelector(".error-msg");
    const labelList = document.querySelectorAll("#form label");
    const inputList = document.querySelectorAll("#form input");
    let years = document.getElementById("years");
    let months = document.getElementById("months");
    let days = document.getElementById("days");

    const valid = validate(day, month, year);
    if (valid){
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth()+1;
        const currentYear = currentDate.getFullYear();
        year = parseInt(year);
        month = parseInt(month);
        day = parseInt(day);

        let y;
        let m;
        let d;
        if ((month > currentMonth) || (month == currentMonth && day > currentDay)){
            y = currentYear - year - 1;
            m = 11 - (month - currentMonth);
        }
        else{
            y = currentYear - year;
            m = currentMonth - month - 1;
        }
        if (day <= currentDay){
            m += 1;
            d = currentDay - day;
        }
        else if ([1, 3, 5, 7, 8, 10, 12].includes(month)){
            d = 31 - day + currentDay;
        }
        else if (month == 2){
            d = (isLeapYear(year) ? 29 : 28) - day + currentDay;
        }
        else{
            d = 30 - day + currentDay;
        }
        
        years.innerText = String(y);
        months.innerText = String(m);
        days.innerText = String(d);

        errorMsg.classList.remove("error-state");
        errorMsg.style.display = "none";
        labelList.forEach(label => label.classList = "");
        inputList.forEach(input => input.classList = "");
    }
    else {
        errorMsg.classList += " error-state";
        errorMsg.style.display = "block"
        labelList.forEach(label => label.classList += " error-state");
        inputList.forEach(input => input.classList += " error-state");
        years.innerText = "--";
        months.innerText = "--";
        days.innerHTML = "--";
    }
});

// Validate the input entries
function validate(day, month, year){
    // are the inputs numeric?
    day = isNaN(day) ? false : parseInt(day);
    month = isNaN(month) ? false : parseInt(month);
    year = isNaN(year) ? false : parseInt(year);
    // if not, return false
    if (!(day && month && year)) return false;

    // are the inputs integer? If not, return false
    if (!(Number.isInteger(day) && Number.isInteger(month) && Number.isInteger(year))) return false;

    const currentDate = new Date();
    // is year valid?
    if (year < 0 || year > currentDate.getFullYear()) return false;
    // is month valid?
    if (month < 1 || month > 12) return false;
    if (year == currentDate.getFullYear() && month > (currentDate.getMonth()+1)) return false;
    // is day valid?
    if (day < 1) return false;
    if (month == (currentDate.getMonth()+1) && day > currentDate.getDay()) return false;
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)){
        if (day > 31) return false;
    }
    else if (day > 30) return false;
    // if February, check for leap year    
    if (month == 2){
        if (day > (isLeapYear(year) ? 29 : 28)) return false;
    }

    return true;
};

// Verify if the year is a leap year
function isLeapYear(year){
    if (year % 100 == 0 && year % 400 == 0) 
        return true;
    else if (year % 100 != 0 && year % 4 == 0)
         return true
    return false
}