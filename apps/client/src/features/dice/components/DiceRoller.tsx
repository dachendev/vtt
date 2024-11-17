import { useState } from "react";

type DiceType = (typeof diceTypes)[number];

type Operation = (typeof operations)[number];

const diceTypes = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"] as const;

const operations = ["add", "subtract"] as const;

const operationSymbols: Record<Operation, string> = {
  add: "+",
  subtract: "-",
};

const isDiceType = (value: string): value is DiceType => {
  return diceTypes.indexOf(value as DiceType) !== -1;
};

const isOperation = (value: string): value is Operation => {
  return operations.indexOf(value as Operation) !== -1;
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const sumValues = (values: number[]) => {
  return values.reduce((sum, current) => sum + current, 0);
};

const roll = (sides: number) => {
  return getRandomNumber(1, sides);
};

const rollMultiple = (count: number, sides: number) => {
  return Array.from({ length: count }, () => roll(sides));
};

export const DiceRoller = () => {
  const [diceCount, setDiceCount] = useState("");
  const [selectedDiceType, setSelectedDiceType] = useState<DiceType>("d4");
  const [selectedOperation, setSelectedOperation] = useState<Operation>("add");
  const [modifier, setModifier] = useState("");
  const [rollValues, setRollValues] = useState<number[]>([]);
  const [rollResult, setRollResult] = useState<number>();

  const onDiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const diceType = e.target.value;
    if (!isDiceType(diceType)) {
      console.warn("Invalid diceType:", diceType);
      return;
    }
    setSelectedDiceType(diceType);
  };

  const onOperationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const operation = e.target.value;
    if (!isOperation(operation)) {
      console.warn("Invalid operation:", operation);
      return;
    }
    setSelectedOperation(operation);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedDiceCount = parseInt(diceCount) || 1;
    const parsedModifier = parseInt(modifier) || 0;
    const diceSides = parseInt(selectedDiceType.slice(1));
    const rollValues = rollMultiple(parsedDiceCount, diceSides);

    let rollResult = sumValues(rollValues);
    switch (selectedOperation) {
      case "add":
        rollResult += parsedModifier;
        break;
      case "subtract":
        rollResult -= parsedModifier;
        break;
    }

    setRollValues(rollValues);
    setRollResult(rollResult);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="count">Count</label>
          <input
            id="count"
            type="number"
            value={diceCount}
            onChange={(e) => setDiceCount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={selectedDiceType}
            onChange={onDiceTypeChange}
          >
            {diceTypes.map((diceType) => (
              <option key={diceType} value={diceType}>
                {diceType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="operation">Operation</label>
          <select
            id="operation"
            value={selectedOperation}
            onChange={onOperationChange}
          >
            {operations.map((operation) => (
              <option key={operation} value={operation}>
                {operationSymbols[operation]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="modifier">Modifier</label>
          <input
            id="modifier"
            type="number"
            value={modifier}
            onChange={(e) => setModifier(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Roll</button>
        </div>
      </form>
      <div>
        <p>Values: [{rollValues.join(", ")}]</p>
        <p>Result: {rollResult}</p>
      </div>
    </div>
  );
};