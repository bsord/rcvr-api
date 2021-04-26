
import { Todo } from "../entity/Todo";
import { define } from 'typeorm-seeding'

define(Todo, () => {

    const todo = new Todo()
    todo.action = "Add Dmarc Record"
    todo.ref = "dmarc"

    return todo
})