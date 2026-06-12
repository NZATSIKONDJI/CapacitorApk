const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let expression = "";

const safeEvaluate = (expr) => {
  try {
    const sanitized = expr.replace(/[^0-9.+\-*/()%]/g, "");
    const result = Function(`"use strict"; return (${sanitized})`)();
    return Number.isFinite(result) ? result : "Erreur";
  } catch {
    return "Erreur";
  }
};

const updateDisplay = (value) => {
  display.textContent = value || "0";
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
      expression = "";
      updateDisplay(expression);
      return;
    }

    if (action === "backspace") {
      expression = expression.slice(0, -1);
      updateDisplay(expression);
      return;
    }

    if (action === "percent") {
      if (expression) {
        expression = `${safeEvaluate(expression)}/100`;
        expression = String(safeEvaluate(expression));
        updateDisplay(expression);
      }
      return;
    }

    if (action === "equals") {
      if (!expression) return;
      expression = String(safeEvaluate(expression));
      updateDisplay(expression);
      return;
    }

    if (value) {
      if (value === "." && expression.slice(-1) === ".") return;
      expression += value;
      updateDisplay(expression);
    }
  });
});
