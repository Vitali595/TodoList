import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    return (
        <div>
            <TextField
                color={"primary"}
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItem} color={"primary"}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm