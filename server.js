const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Example applistening on port ${PORT}`);
});

app.use(express.json());

const todos = [
    {
        id: 1,
        title: "Basuh kaki",
        complete: false
    }
];

app.get("/", function (request, response) {
    response.json({ message: "Welcome to Todo App" });
});

// Index / List
app.get("/todo", function (request, response) {
    response.json(todos);
});

// Create
app.post("/todo", function (request, response) {
    const title = request.body.title;
    todos.push({
        id: 1,
        title: title,
        complete: false
    });

    response.status(201).json({ message: "Successfully added todo" });
});

// Read
app.get("/todo/:id", function (request, response) {
    const id = request.params.id;

    const todo = todos.find(todo => todo.id === Number(id));

    if(!todo) {
        response.status(404).json({ message: `Todo ${id} not found` });
    }

    response.json(todo);
});

// Update
app.put("/todo/:id", function (request, response) {
    const id = request.params.id;
    const requestId = request.body.id;

    const todo = todos.find(todo => todo.id === Number(id));

    if(!todo) {
        response.status(404).json({ message: `Todo ${requestId} not found` });
    }

    const title = request.body.title;
    const updatedTodos = todos.map(todo => {
        if(todo.id === id) {
            return {
                ...todo,
                title: title
            }
        }
    });

    todos = updatedTodos;

    response.status(200).json({ message: `Successfully updated todo ${requestId}` });
});

// Delete
app.delete("/todo/:id", function (request, response) {
    const id = request.params.id;

    const todo = todos.find(todo => todo.id === Number(id));

    if(!todo) {
        response.status(404).json({ message: `Todo ${id} not found` });
    }

    const newTodos = todos.filter(todo => {
        if(todo.id === Number(id)) {
            return todo;
        }
    });

    todos = newTodos;

    response.status(200).json({ message: `Successfully deleted todo ${id}` });
});
