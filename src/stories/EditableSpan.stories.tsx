import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    changeTitle: {
      description: "Value EditableSpan changed"
    },
    value: {
      defaultValue: "HTML",
      description: "Start value EditableSpan"
    }
  }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  title: "Hi",
  changeTitle: action("Value EditableSpan changed")
}