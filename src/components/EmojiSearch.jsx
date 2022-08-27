import { useState } from "react"
import styles from "./emojiPicker/emojiPicker.module.css"

export default function EmojiSearch({onSearch}){

    const[value, setValue] = useState('');

    let handleChange = (e) => {
        setValue(e.target.value);
        onSearch(e);
    }

    return(
        <input className={styles.search} onChange={handleChange} />
    )
}