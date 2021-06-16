import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo(({disabled = false, ...props}: EditableSpanPropsType) => {
    console.log("EditableSpan called")

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        !disabled && setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)

    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <TextField
                color={"primary"}
                variant={"standard"}
                value={title}
                onBlur={offEditMode}
                onChange={changeTitle}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})