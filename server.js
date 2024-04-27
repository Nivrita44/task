const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


let tasks = []

const generateTaskId = () => {
    return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
};

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/tasks', (req, res) => {
    res.render('tasks', { tasks: tasks })
})

// app.post('/task', (req, res) => {
//     const newTask = req.body.task
//    // console.log(newTask)
//     tasks.push(newTask)
//     res.redirect('/')
// })
app.post('/task', (req, res) => {
    const newTask = {
        id: generateTaskId(),
        name: req.body.task
    };
    //console.log(tasks);
    tasks.push(newTask);
    res.redirect('/');
});

app.get('/task/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.redirect('/tasks');
})
app.get('/task/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        res.status(404).send('Task not found');
    } else {
        res.render('edit', { task: task });
    }
});

app.post('/task/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTaskName = req.body.task;
    const taskToUpdate = tasks.find(task => task.id === taskId);

    if (taskToUpdate) {
        taskToUpdate.name = updatedTaskName;
        res.redirect('/tasks');
    } else {
        res.status(404).send('Task not found');
    }
});


app.listen(3000, () => {
    console.log("Server is running");
})