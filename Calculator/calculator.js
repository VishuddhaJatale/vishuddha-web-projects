const display = document.getElementById('display');
const historyEl = document.getElementById('history');
const buttons = document.querySelector('.buttons');

let current = '', previous = '', operator = null;

buttons.addEventListener('click', e => {
  if (!e.target.matches('button')) return;
  const btn = e.target;
  if (btn.dataset.number != null) handleNumber(btn.textContent);
  if (btn.dataset.decimal != null) handleDecimal();
  if (btn.dataset.operator != null) handleOperator(btn.dataset.operator);
  if (btn.dataset.clear != null) clearAll();
  if (btn.dataset.delete != null) deleteLast();
  if (btn.dataset.equals != null) calculate();
  updateDisplay();
});

document.addEventListener('keydown', e => {
  if (/\d/.test(e.key)) handleNumber(e.key);
  if (e.key === '.') handleDecimal();
  if (['+', '-', '*', '/'].includes(e.key)) handleOperator(e.key);
  if (['Enter', '='].includes(e.key)) calculate();
  if (e.key === 'Backspace') deleteLast();
  if (e.key.toLowerCase() === 'c') clearAll();
  updateDisplay();
});

function handleNumber(n) {
  if (current === '0') current = n;
  else current += n;
}

function handleDecimal() {
  if (!current.includes('.')) current += current ? '.' : '0.';
}

function handleOperator(o) {
  if (current) {
    if (previous) calculate();
    else previous = current;
    operator = o;
    current = '';
  }
}

function calculate() {
  const prev = parseFloat(previous), curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr) || !operator) return;
  const ops = { '+': (a,b)=>a+b, '-': (a,b)=>a-b, '*': (a,b)=>a*b, '/': (a,b)=>a/b };
  current = ops[operator](prev, curr).toString();
  operator = null;
  previous = '';
}

function clearAll() { current = ''; previous = ''; operator = null; }

function deleteLast() { current = current.slice(0, -1); }

function updateDisplay() {
  historyEl.textContent = previous ? `${previous} ${operator}` : '';
  display.textContent = current || (!operator && previous) || '0';
}
