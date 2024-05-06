export default function History(props: any) {
    function onEntryClick(e: any) {
        props.onCurrentEntry(props.expressionHistory[e.target.id]);
    }
    function deleteHistory() {
        props.onExpressionHistory([]);
    }
    return (
        <>
            <div className="flex flex-col h-full w-[60%]  relative">
                <div className="grow bg-slate-700 rounded-lg  overflow-hidden flex flex-col overflow-y-scroll scroll-pl-6">
                    {props.expressionHistory.map(
                        (expression: any, idx: any) => (
                            <button
                                onClick={onEntryClick}
                                className="bg-slate-800  hover:bg-slate-600  transition ease-in-out delay-50 duration-100 select-text"
                                key={idx}
                                id={idx}
                            >
                                <div className="bg-slate-900 pointer-events-none text-slate-400 text-left py-2 px-2">
                                    {expression.expression}
                                </div>
                                <div className="pointer-events-none p-2 text-xl text-slate-100 text-left">
                                    {expression.result}
                                </div>
                            </button>
                        )
                    )}
                </div>
                <button
                    onClick={deleteHistory}
                    className="bg-red-500 text-white font-bold p-1 rounded-lg shadow-xl shadow-slate-900 absolute top-2 right-2"
                >
                    {" "}
                    Delete all records
                </button>
            </div>
        </>
    );
}
