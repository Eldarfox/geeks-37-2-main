import React, {useState} from 'react';
import Todo from "../todo/Todo";
import classes from "./List.module.css";


const List = ({list,
                      handleDelete,
                      handleDone,
                      handleEdit
                  }) => {

    const [currentEdit, setCurrentEdit] = useState('')
    return (
        <ul className={classes.todo_list}>
            {
                list.map(item=> <Todo
                    key={item.id}
                    todo={item}
                    handleDelete={handleDelete}
                    handleDone={handleDone}
                    handleEdit={handleEdit}
                    handleCurrentEdit={setCurrentEdit}
                    isEdit={currentEdit === item.id}
                /> )
            }
        </ul>
    );
};

export default List;