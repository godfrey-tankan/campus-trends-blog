import React, { useState, ChangeEvent } from "react";
import ErrorBox from "./ErrorBox";

interface EditorProps {}

const Disperse: React.FC<EditorProps> = () => {
  const [text, setText] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const [duplicateErr, setduplicateErr] = useState<Array<Array<number>>>([]);
  const [invalidEthereum, setInvalidEthereum] = useState<Array<string>>([]);
  const [invalidAmount, setinvalidAmount] = useState<Array<string>>([]);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setinvalidAmount([]);
    setInvalidEthereum([]);
    setduplicateErr([]);
    setDisabled(false);
  };

  const ids = text.split("\n");

  const calculateLineNumbers = (): number[] => {
    const numLines = ids.length;
    return Array.from({ length: numLines }, (_, index) => index + 1);
  };

  const validator = () => {
    const duplicates: { [key: string]: number[] } = {};
    let amountErr: string[] = [];
    let ethereumInvalid: string[] = [];
    let duplicatesArr: number[][] = [];
    setinvalidAmount([]);
    setInvalidEthereum([]);
    setduplicateErr([]);

    ids.forEach((id, i) => {
      const address = id.split(/[,= ]/)[0];
      const amount = id.split(/[,= ]/)[1];

      if (address.length !== 42 || !address.match(/^0x[a-fA-F0-9]{40}$/)) {
        ethereumInvalid.push(`Line ${i + 1} invalid Ethereum address`);
      } else {
        if (amount?.length === 0 || amount?.match(/[a-zA-Z]/)) {
          amountErr.push(`Line ${i + 1} wrong amount`);
        } else {
          if (duplicates[address]) {
            duplicates[address].push(i);
          } else {
            duplicates[address] = [i];
          }
          duplicatesArr = Object.values(duplicates).filter(
            (indexes) => indexes.length > 1
          );
        }
      }
      if (ids.length - 1 === i) {
        setDisabled(true);
        setduplicateErr(duplicatesArr);
        setinvalidAmount(amountErr);
        setInvalidEthereum(ethereumInvalid);
      }
    });
  };
  const handleKeepFirst = () => {
    const modified = keepFirstDuplicates(ids);
    setText(modified.join("\n"));
    setduplicateErr([]);
    setDisabled(false);
  };

  const handleCombineBalance = () => {
    const modified = combineBalanceDuplicates(ids);
    setText(modified.join("\n"));
    setduplicateErr([]);
    setDisabled(false);
  };

  const keepFirstDuplicates = (inputValue: string[]): string[] => {
    const uniqueAddresses: Set<string> = new Set();
    const result: string[] = [];

    for (let i = 0; i < inputValue.length; i++) {
      const line = inputValue[i];
      const address = line.split(/[,= ]/)[0];

      if (!uniqueAddresses.has(address)) {
        uniqueAddresses.add(address);
        result.push(line);
      }
    }

    return result;
  };
  const combineBalanceDuplicates = (inputValue: string[]): string[] => {
    const addressToBalanceMap: { [address: string]: number } = {};
    const result: string[] = [];

    for (let i = 0; i < inputValue.length; i++) {
      const line = inputValue[i];
      const parts = line.split(/[,= ]/);
      const address = parts[0];
      const balance = parseFloat(parts[1]);

      if (isNaN(balance)) {
        result.push(line);
      } else {
        if (address in addressToBalanceMap) {
          addressToBalanceMap[address] += balance;
        } else {
          addressToBalanceMap[address] = balance;
        }
      }
    }

    for (const address in addressToBalanceMap) {
      const combinedLine = `${address}=${addressToBalanceMap[address]}`;
      result.push(combinedLine);
    }
    return result;
  };

  return (
    <div>
      <div className=" m-3 flex justify-between text-gray-300 font-bold text-sm">
        <span>Addresses with Amounts</span>
        <span className="cursor-pointer">Upload File</span>
      </div>
      <div className="line-counter-container">
        <div className="line-numbers">
          {calculateLineNumbers().map((lineNumber, index) => (
            <div key={index} className="line-number">
              {lineNumber}
            </div>
          ))}
        </div>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder=""
          rows={10}
          className="text-input w-full"
        />
      </div>
      <div className=" m-3 flex justify-between text-gray-300 font-bold text-sm items-center">
        <span>Separated by ',' or ' ' or '=' </span>
        <span className="text-lg font-extralight text-gray-500 hover:text-gray-400 cursor-pointer">
          Show Example
        </span>
      </div>
      {duplicateErr.length > 0 && (
        <div className=" m-3 flex justify-between text-gray-300 font-bold text-sm items-center">
          <span>Duplicated</span>
          <span className="flex flex-wrap xs:justify-end sm: text-base font-extralight text-red-600">
            <span
              onClick={handleKeepFirst}
              className="hover:text-red-700 cursor-pointer "
            >
              Keep the first one
            </span>{" "}
            <span className="xs:hidden sm:block">&nbsp;&nbsp;|</span>
            <span
              onClick={handleCombineBalance}
              className="hover:text-red-700 cursor-pointer "
            >
              &nbsp;&nbsp;Combine Balance
            </span>
          </span>
        </div>
      )}
      {(invalidAmount.length > 0 ||
        duplicateErr.length > 0 ||
        invalidEthereum.length > 0) && (
        <ErrorBox>
          <div className="flex flex-col break-all xs:text-sm sm:text-base">
            {invalidEthereum?.map((ethe, e_ind) => (
              <div key={e_ind}>{ethe}</div>
            ))}
            {invalidAmount.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
            {duplicateErr?.map((el, ind) => (
              <div className="flex flex-wrap" key={ind}>
                {ids[el[0]]?.split(/[,= ]/)[0]} :
                {el.map((idInd, i) => (
                  <span key={i}>&nbsp;{idInd + 1},</span>
                ))}
              </div>
            ))}
          </div>
        </ErrorBox>
      )}
      <button
        disabled={disabled}
        onClick={validator}
        className="gradient-button"
      >
        Next
      </button>
    </div>
  );
};

export default Disperse;