import { useEffect, useState } from "react";
import Calculator from "./Calculator";
import History from "./History";

function App() {
    const [exprHistory, setExpressionHistory] = useState([]);
    const [currentEntry, setCurrentEntry] = useState({});

    useEffect(
        () => console.log("data has changed somewhere", currentEntry),
        [currentEntry]
    );
    return (
        <>
            <div className=" bg-slate-600  min-h-screen place-items-center grid">
                <div className="flex flex-row h-[60vh] w-[60vw]">
                    <Calculator
                        onExpressionHistory={setExpressionHistory}
                        entryFromHistory={currentEntry}
                        expressionHistory={exprHistory}
                    ></Calculator>
                    <History
                        onExpressionHistory={setExpressionHistory}
                        expressionHistory={exprHistory}
                        onCurrentEntry={setCurrentEntry}
                    ></History>
                </div>
            </div>
        </>
    );
}

export default App;
