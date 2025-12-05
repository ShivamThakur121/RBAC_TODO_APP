import Todo from "../models/Todo.js";

export const getTodos = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { user: req.user.id };
    const { completed, category, search } = req.query;

    if (completed !== undefined) query.completed = completed === "true";
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    const todos = await Todo.find(query).populate("user", "username email");
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const { title, description, dueDate, category } = req.body;
    const todo = await Todo.create({
      title,
      description,
      dueDate,
      category,
      user: req.user.id,
    });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (req.user.role !== "admin" && todo.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    const updates = (({ title, description, dueDate, category, completed }) => ({
      title,
      description,
      dueDate,
      category,
      completed,
    }))(req.body);

    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    const updated = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (req.user.role !== "admin" && todo.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    await todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    next(err);
  }
};
