import * as math from "mathjs";
import { useEffect, useRef, useState } from "react";

let savedExpressions: Array<any> = [];

function insertStringAtIndex(
    target: string,
    string: string,
    idx: number
): string {
    return target.slice(0, idx) + string + target.slice(idx);
}

export default function Calculator(props: any) {
    const [mathExpression, setMathExpression] = useState("");
    const [oldMathExpr, setOldMathExpr] = useState("");
    const [syntaxError, setSyntaxError] = useState("");
    const [requestCalculation, setRequestCalculation] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        if (props.entryFromHistory.result === undefined) {
            return;
        }
        setMathExpression(props.entryFromHistory.result);
        setOldMathExpr(props.entryFromHistory.expression);
    }, [props.entryFromHistory]);

    useEffect(() => {
        if (props.expressionHistory.length === 0) {
            savedExpressions = [];
        }
    }, [props.expressionHistory]);

    function evaluateExpression() {
        try {
            let newValue = math.evaluate(mathExpression.toString());
            setSyntaxError("");
            setOldMathExpr(mathExpression);
            savedExpressions.push({
                expression: mathExpression,
                result: newValue,
            });
            setMathExpression(newValue);
            props.onExpressionHistory([...savedExpressions]);
        } catch (err: unknown) {
            setSyntaxError("Something went wrong");
        }
    }

    function handleExpressionChange(e: any) {
        if (e.target.value == "=") {
            if (
                mathExpression.toString().length == 0 ||
                mathExpression === "sqrt"
            ) {
                return;
            }
            evaluateExpression();
        } else {
            setCaretPosition(caretPosition + e.target.value.length);
            let newValue = insertStringAtIndex(
                mathExpression,
                e.target.value,
                caretPosition
            );
            setMathExpression(newValue);
            if (inputRef.current) {
                inputRef.current.value = newValue;
            }
        }
    }
    function deleteExpression() {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        setCaretPosition(0);
        setMathExpression("");
        setOldMathExpr("");
        setSyntaxError("");
    }
    function onKeyboardTextInput(e: any) {
        if (e.key === "Enter") {
            setMathExpression(e.target.value);
            setRequestCalculation(true);
        } else {
            setCaretPosition(e.target.selectionStart + 1);
        }
    }

    function onClickCursorChange(e: any) {
        setCaretPosition(e.target.selectionStart);
    }

    useEffect(() => {
        if (mathExpression.length == 0) {
            return;
        }
        if (requestCalculation == false) {
            return;
        }
        evaluateExpression();
        setRequestCalculation(false);
    }, [requestCalculation]);

    return (
        <>
            <div className="w-[40%] h-full bg-slate-600 flex flex-col gap-3 p-2">
                <div className="h-[20%] bg-slate-900 rounded-lg flex flex-col align-middle  overflow-y-scroll shadow-lg shadow-slate-900">
                    <div className="bg-red-500 text-white text-center font-bold">
                        {syntaxError}
                    </div>
                    <div className="text-slate-400 text-2xl text-left m-2 transition ease-in-out duration-150 ">
                        {" "}
                        {oldMathExpr}
                    </div>
                    <input
                        ref={inputRef}
                        className="text-white text-4xl text-right m-2 bg-slate-900 outline-none"
                        onKeyDown={(e) => {
                            onKeyboardTextInput(e);
                        }}
                        tabIndex={0}
                        autoFocus
                        onClick={(e) => {
                            onClickCursorChange(e);
                        }}
                        onChange={(e) => {
                            setMathExpression(e.target.value);
                        }}
                    />
                </div>
                <div className="h-[80%] grid grid-rows-5 gap-2 grid-cols-5 items-stretch active:*:shadow-lg active:*:shadow-slate-900 *:overflow-hidden *:text-3xl  *:duration-300 *:ease-in-out active:*:scale-90">
                    <button
                        onClick={deleteExpression}
                        className=" bg-red-500 rounded-lg text-white text-xl font-bold "
                    >
                        {"DEL"}
                    </button>
                    <button
                        value="("
                        onClick={handleExpressionChange}
                        className=" bg-yellow-300 rounded-lg text-black text-xl font-bold"
                    >
                        {" "}
                        {"("}
                    </button>
                    <button
                        value=")"
                        onClick={handleExpressionChange}
                        className=" bg-yellow-300 rounded-lg text-black text-xl font-bold"
                    >
                        {" "}
                        {")"}
                    </button>
                    <button className=" bg-blue-500 rounded-lg text-white text-xl font-bold">
                        {" "}
                        {"mod"}
                    </button>
                    <button
                        onClick={handleExpressionChange}
                        value="pi"
                        className=" bg-pink-300 rounded-lg text-black text-xl font-bold"
                    >
                        {" "}
                        {"π"}
                    </button>
                    <button
                        value="7"
                        onClick={handleExpressionChange}
                        className=" bg-slate-300 rounded-lg text-black text-xl font-bold"
                    >
                        7
                    </button>
                    <button
                        value="8"
                        onClick={handleExpressionChange}
                        className=" bg-slate-300 rounded-lg text-black text-xl font-bold"
                    >
                        8
                    </button>
                    <button
                        value="9"
                        onClick={handleExpressionChange}
                        className=" bg-slate-300 rounded-lg text-black text-xl font-bold"
                    >
                        9
                    </button>
                    <button
                        value="/"
                        onClick={handleExpressionChange}
                        className=" bg-blue-500 rounded-lg text-white text-xl font-bold"
                    >
                        {" "}
                        {"÷"}
                    </button>
                    <button
                        value="sqrt"
                        onClick={handleExpressionChange}
                        className=" bg-blue-500 rounded-lg text-white text-xl font-bold"
                    >
                        {" "}
                        {"√"}
                    </button>
                    <button
                        value="4"
                        onClick={handleExpressionChange}
                        className=" bg-slate-300 rounded-lg text-black text-xl font-bold"
                    >
                        4
                    </button>
                    <button
                        value="5"
                        onClick={handleExpressionChange}
                        className=" bg-slate-300 rounded-lg text-black text-xl font-bold"
                    >
                        5
                    </button>
                    <button
                        value="6"
                        onClick={handleExpressionChange}
                        className=" bg-slate-300 rounded-lg text-black text-xl font-bold"
                    >
                        6
                    </button>
                    <button
                        value="*"
                        onClick={handleExpressionChange}
                        className=" bg-blue-500 rounded-lg text-white text-xl font-bold"
                    >
                        {" "}
                        {"x"}
                    </button>
                    <button
                        value="^2"
                        onClick={handleExpressionChange}
                        className=" bg-blue-500 rounded-lg text-white text-xl font-bold"
                    >
                        {" "}
                        {"x"}
                        <sup>2</sup>
                    </button>
                    <button
                        value="1"
                        onClick={handleExpressionChange}
                        className=" bg-slate-300 rounded-lg text-black text-xl font-bold"
                    >
                        1
                    </button>
                    <button
                        value="2"
                        onClick={handleExpressionChange}
                        className=" bg-slate-300 rounded-lg text-black text-xl font-bold"
                    >
                        2
                    </button>
                    <button
                        value="3"
                        onClick={handleExpressionChange}
                        className=" bg-slate-300 rounded-lg text-black text-xl font-bold"
                    >
                        3
                    </button>
                    <button
                        value="-"
                        onClick={handleExpressionChange}
                        className=" bg-blue-500 rounded-lg text-white text-xl font-bold"
                    >
                        {" "}
                        {"-"}
                    </button>
                    <button
                        value="="
                        onClick={handleExpressionChange}
                        className=" bg-green-500 rounded-lg text-white text-xl font-bold row-span-2"
                    >
                        {" "}
                        {"="}
                    </button>
                    <button
                        value="."
                        onClick={handleExpressionChange}
                        className=" bg-blue-500 rounded-lg text-white text-xl font-bold"
                    >
                        {"."}
                    </button>
                    <button
                        value="0"
                        onClick={handleExpressionChange}
                        className=" bg-slate-300 rounded-lg text-black text-xl font-bold"
                    >
                        0
                    </button>

                    <button
                        value="%"
                        onClick={handleExpressionChange}
                        className=" bg-blue-500 rounded-lg text-white text-xl font-bold"
                    >
                        {"%"}
                    </button>
                    <button
                        value="+"
                        onClick={handleExpressionChange}
                        className=" bg-blue-500 rounded-lg text-white text-xl font-bold"
                    >
                        {" "}
                        {"+"}
                    </button>
                </div>
            </div>
        </>
    );
}
