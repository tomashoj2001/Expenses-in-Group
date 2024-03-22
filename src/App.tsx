import { useState } from "react";
import Header from "./components/Header";
import Participants from "./components/participants/Participants";
import Expenses from "./components/expenses/Expenses";
import Closure from "./components/closure/Closure";
import Meetings from "./components/home/Meetings";
import useClosure from "./hooks/useClosure";
import useExpenses from "./hooks/useExpenses";
import useParticipants from "./hooks/useParticipants";

export type PageProp = "home" | "participants" | "expenses" | "closure";

function App() {
  const { transfers, setTransfers } = useClosure();
  const { expenses, setExpenses } = useExpenses();
  const { participants, setParticipants } = useParticipants();
  const [page, setPage] = useState<PageProp>("home");

  const changePage = (page: PageProp) => {
    setPage(page);
  };

  return (
    <body>
      <div className="min-h-screen">
        <Header page={page} changePage={changePage} />
        <main className="container flex flex-col items-center justify-center pt-8">
          {page === "home" && <Meetings changePage={changePage} />}
          {page === "participants" && (
            <Participants
              participants={participants}
              setParticipants={setParticipants}
            />
          )}
          {page === "expenses" && (
            <Expenses
              participants={participants}
              expenses={expenses}
              setExpenses={setExpenses}
            />
          )}
          {page === "closure" && (
            <Closure
              participants={participants}
              expenses={expenses}
              transfers={transfers}
              setTransfers={setTransfers}
            />
          )}
        </main>
      </div>
    </body>
  );
}

export default App;
