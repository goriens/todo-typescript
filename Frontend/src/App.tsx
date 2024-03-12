import axios from "axios";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";

const API_URL = "https://type-todo-dep.onrender.com/api";
interface TodoItem {
  _id: string;
  title: string;
  task: string;
  completed: boolean;
}
interface FormChangeEvent {
  target: {
    name: string;
    value: string;
  };
}

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TodoItem[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    task: "",
  });

  const handleDeleteTodo = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setLoading(false);
      setData(data.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handlePostRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setLoading(false);
      console.log("Data posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  const completePostRequest = async (id: string, completed: boolean) => {
    try {
      setLoading(true);
      const response = await axios.patch(`${API_URL}/${id}`, {
        completed: !completed,
      });
      getData();
      setLoading(false);
      console.log("Data posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleChange = (event: FormChangeEvent) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const getData = async () => {
    try {
      setLoading(true);
      await axios.get(`${API_URL}`).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="border-solid border-2 w-1/2 m-auto mt-4 px-2 py-4">
        <div className="w-full">
          <form action="">
            <label htmlFor="title">Task Title</label>
            <input
              id="title"
              type="text"
              className="border rounded px-3 py-2 text-sky-700 w-full outline-none"
              placeholder="Task Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <label htmlFor="task">Task</label>
            <input
              id="task"
              type="text"
              className="border rounded px-3 py-2 text-sky-700 w-full outline-none"
              placeholder="Your Task..."
              name="task"
              value={formData.task}
              onChange={handleChange}
            />
            <button
              onClick={handlePostRequest}
              className="bg-black text-white w-full rounded-sm py-1 font-medium mt-2"
            >
              ADD TASK
            </button>
          </form>
          {loading && <p className="text-center">Loading...</p>}
        </div>
        <div className=" h-96 overflow-auto">
          {data.map((e, i) => (
            <div className="mt-4 border py-2 px-4  relative" key={e._id}>
              <h2
                className={
                  e.completed ? "opacity-40 line-through" : "font-medium"
                }
              >
                {i + 1}. {e.title}
              </h2>
              <p className={e.completed ? "opacity-40 line-through" : ""}>
                {e.task}
              </p>
              <p
                className="absolute top-4 right-0  cursor-pointer h-7 w-7 flex justify-center items-center"
                onClick={() => handleDeleteTodo(e._id)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                  alt=""
                  className="w-5 h-5"
                />
              </p>
              <p
                className="absolute top-4 right-7  cursor-pointer h-7 w-7 flex justify-center items-center"
                onClick={() => completePostRequest(e._id, e.completed)}
              >
                {e.completed ? (
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/generic-interaction/143/yes-tick-success-done-complete-check-allow-512.png"
                    alt=""
                    className="w-5 h-5"
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Small-dark-green-circle.svg/768px-Small-dark-green-circle.svg.png"
                    alt=""
                    className="w-5 h-5"
                  />
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
