import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { AddTask } from "./components/AddTask";
import { ListTasks } from "./components/ListTasks";

function App() {
    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-12">
                            <div className="card">
                                <div className="card-body p-4">
                                    <AddTask />
                                    <ListTasks />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;
