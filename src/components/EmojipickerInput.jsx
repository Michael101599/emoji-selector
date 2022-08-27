import { useRef } from "react";
import EmojiPicker from "./EmojiPicker";

export default function EmojiPickerInput(){

    const refInput = useRef(null);

    let handleClick = (e) => {
        refInput.current.focus()
    }

    return(
        <div>
            <input ref={refInput} />
            <button onClick={handleClick}>Click Aquí</button>
            <EmojiPicker ref={refInput}/>
        </div>
    )
}