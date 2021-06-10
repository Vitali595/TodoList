import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";

export default {
  title: 'Todolist/Task',
  component: Task,
} as Meta;

const changeTaskStatusCallback = action("Status changed inside Task")
const changeTaskTitleCallback = action("Title changed inside Task")
const removeTaskCallback = action("Remove /button inside Task clicked")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
  changeTaskStatus: changeTaskStatusCallback,
  changeTaskTitle: changeTaskTitleCallback,
  removeTask: removeTaskCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  task: {
    id: "1", title: "CSS", status: TaskStatuses.Completed,
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    priority: TaskPriorities.Low,
    startDate: "",
    todoListId: "todolistId1"
  }
};

export const TaskIsNoteDoneExample = Template.bind({});
TaskIsNoteDoneExample.args = {
  ...baseArgs,
  task: {
    id: "1", status: TaskStatuses.New, title: "JS",
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    priority: TaskPriorities.Low,
    startDate: "",
    todoListId: "todolistId1"
  }
};