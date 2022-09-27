// Import stylesheets
import './style.css';
import { Colours, ColourHelper } from './models/colours.enum';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum';
import { SpinRecord } from './models/spin';

// used to make the spinner spin
let spinnerCounter = 0;

// container for the spinner
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 0;

// used to keep track of the results of the spin
let ColorChosen: string;
let ChosenBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];

const colourDiv = document.getElementById('colourResult');

const colourInput = document.getElementById(
  'colourSelect'
) as HTMLSelectElement;
const bodyPartInput = document.getElementById(
  'bodyPartSelect'
) as HTMLSelectElement;

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);
    let option = document.createElement('option');
    option.text = colour;
    colourInput.add(option);
  }
}

const bodyPartP = document.getElementById('bodyPartText');

// TODO see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];

for (let bodyPart in BodyParts) {
  if (isNaN(Number(bodyPart))) {
    bodyPartsArray.push(bodyPart);
    let option = document.createElement('option');
    option.text = bodyPart;
    bodyPartInput.add(option);
  }
}

// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement>document.getElementById('spin-btn');
const statsBtn = <HTMLButtonElement>document.getElementById('statsBtn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100));
statsBtn.addEventListener('click', () => statsBtnHandler());

// TODO handles the spin button click
// time in ms, interval in msstatsBtn
function spinBtnHandler(time: number, interval: number) {
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);

  // TODO randomly select colour from array
  let ColorIndicator: number = Math.floor(Math.random() * coloursArray.length);
  ColorChosen = coloursArray[ColorIndicator];

  // TODO randomly select bodyPart from array
  let PartOfBody: number = Math.floor(Math.random() * bodyPartsArray.length);
  ChosenBodyPart = bodyPartsArray[PartOfBody];

  spinBtn.disabled = true;

  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
}

// rotates between the colours in Colours.enum.
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor =
    coloursArray[spinnerCounter % coloursArray.length];

  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter % bodyPartsArray.length];
}

// stops spinner after time parameter, time in ms
function stopSpinners() {
  clearInterval(spinnerCycle);
  // TODO set colourDiv and bodyPartP to the randomly spun results
  colourDiv.style.backgroundColor = ColorChosen;
  bodyPartP.innerHTML = ChosenBodyPart;
  spinBtn.disabled = false;
  addToHistory();
}

const historyTableBody: HTMLTableElement = <HTMLTableElement>(
  document.getElementById('historyTableBody')
);

// TODO add the newly spun result to the history table
function addToHistory() {
  spinHistoryArray.push(
    new SpinRecord(
      spinHistoryArray.length + 1,
      ColourHelper.get(ColorChosen),
      BodyPartsHelper.get(ChosenBodyPart)
    )
  );
  let newRow: HTMLTableRowElement = <HTMLTableRowElement>(
    historyTableBody.insertRow()
  );
  let numCell: HTMLTableCellElement = <HTMLTableCellElement>newRow.insertCell();
  let colourCell: HTMLTableCellElement = <HTMLTableCellElement>(
    newRow.insertCell()
  );
  let bodyPartCell: HTMLTableCellElement = <HTMLTableCellElement>(
    newRow.insertCell()
  );

  let numText = document.createTextNode(
    spinHistoryArray[spinHistoryArray.length - 1].num.toString()
  );

  let colourText = document.createTextNode(
    coloursArray[spinHistoryArray[spinHistoryArray.length - 1].colour]
  );
  let bodyPartText = document.createTextNode(
    bodyPartsArray[spinHistoryArray[spinHistoryArray.length - 1].bodyPart]
  );

  numCell.appendChild(numText);
  colourCell.appendChild(colourText);
  bodyPartCell.appendChild(bodyPartText);
}

const statsResults: HTMLDivElement = <HTMLDivElement>(
  document.getElementById('statsResults')
);

function statsBtnHandler() {
  // TODO set the statsResults div innerHTML to the amount and last spun number that the user has chosen
  // eg. Red LeftHand spun 10 times
  //     Red LeftHand last spun at num 23

  let ColorChosen: Colours = ColourHelper.get(
    colourInput.options[colourInput.selectedIndex].text
  );

  let ChosenBodyPart: BodyParts = BodyPartsHelper.get(
    bodyPartInput.options[bodyPartInput.selectedIndex].text
  );

  let colText = Colours[ColorChosen];

  let amount = SumAmount(ColorChosen, ChosenBodyPart);
  let lastTime = getLastSpun(ColorChosen, ChosenBodyPart);

  if (amount > 0) {
    statsResults.innerHTML = `These results have been spun ${amount} times; combination happend ${lastTime} spins ago`;
  } else {
    statsResults.innerHTML = `Nothing has been spun `;
  }
}

// TODO returns the amount of times the combination of selected of colour and body part have been spun
function SumAmount(colour, bodyPart): number {
  let amount = 0;
  for (let i = 0; i < spinHistoryArray.length; i++) {
    let tempHistory = spinHistoryArray[i];
    if (tempHistory.colour == colour && tempHistory.bodyPart == bodyPart)
      amount++;
  }
  return amount;
}

// TODO return the last num which the combination of selected of colour and body part have been spun
function getLastSpun(colour, bodyPart): number {
  for (let i = spinHistoryArray.length - 1; i >= 0; i--) {
    let tempHistory = spinHistoryArray[i];
    if (tempHistory.colour == colour && tempHistory.bodyPart == bodyPart)
      return tempHistory.num;
  }
  return -1;
}
