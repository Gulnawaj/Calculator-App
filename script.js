//Calculator-App

// Calculator Elements
const input = document.getElementById("inputbox");
const buttons = document.querySelectorAll(".calculator .row button");
const toggleBtn = document.getElementById("themeToggle");

let string = "";

// Operators Array
const operators = ["+", "-", "*", "/", "%"];

// Calculator Logic
buttons.forEach(button => {
    button.addEventListener("click", (e) => {

        const buttonText = e.target.textContent;

        // Equal Button
        if (buttonText === "=") {

            if (string.trim() === "") return;

            try {

                // Convert percentage to decimal
                let expression = string.replace(/%/g, "/100");

                let result = eval(expression);

                // Remove unnecessary decimal places
                if (!Number.isInteger(result)) {
                    result = parseFloat(result.toFixed(8));
                }

                string = result.toString();
                input.value = string;

            } catch {

                input.value = "Error";
                string = "";

            }

        }

        // AC Button
        else if (buttonText === "AC") {

            string = "";
            input.value = "0";

        }

        // Delete Button
        else if (buttonText === "DEL") {

            string = string.slice(0, -1);

            input.value = string || "0";

        }

        // Number / Operator Buttons
        else {

            // Prevent starting with + * / %
            if (string === "" && ["+", "*", "/", "%"].includes(buttonText))
                return;

            // Prevent starting with 00
            if (string === "" && buttonText === "00")
                return;

            // Convert "." to "0."
            if (string === "" && buttonText === ".") {
                string = "0.";
                input.value = string;
                return;
            }

            // Prevent consecutive operators
            if (
                operators.includes(buttonText) &&
                operators.includes(string.slice(-1))
            ) {
                return;
            }

            // Prevent multiple decimals in one number
            if (buttonText === ".") {

                const lastNumber = string.split(/[+\-*/%]/).pop();

                if (lastNumber.includes(".")) {
                    return;
                }

            }

            string += buttonText;
            input.value = string;

        }

    });
});

// Theme Logic

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");
    toggleBtn.textContent = "☀️";

} 
else {
    toggleBtn.textContent = "🌙";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {

    const isLight = document.body.classList.toggle("light");
    toggleBtn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");

});