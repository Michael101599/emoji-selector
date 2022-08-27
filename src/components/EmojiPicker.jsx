import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { forwardRef } from "react"
import EmojiButton from "./EmojiButton";
import {data as emojiList} from "./emojiPicker/data"
import EmojiSearch from "./EmojiSearch";
import styles from "./emojiPicker/emojiPicker.module.css"

export function EmojiPicker(props, refInput){

    const [isOpen, setIsOpen] = useState(false);
    const [emojis, setEmojis] = useState(emojiList);
    const containerRef = useRef(null);

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if(!containerRef.current.contains(e.target)){
                setIsOpen(false);
                setEmojis(emojiList)
            }
        })
    }, [])

    let handleClickOpen = () => {
        setIsOpen(!isOpen);
    }

    let handleSearch = (e) => {
        const q = e.target.value;

        if(!!q){
            const search = emojiList.filter(emoji => {
                return (emoji.name.toLocaleLowerCase().includes(q) || 
                emoji.keywords.toLowerCase().includes(q)
                );
            });
            setEmojis(search);
        }else{
            setEmojis(emojiList);
        }
    }

    // function EmojiPickerContainer(){
    //     return(
    //         <div>
    //             <EmojiSearch onSearch={handleSearch} />
    //             <div>
    //                 {
    //                     emojis.map(emoji => (
    //                         <div key={emoji.symbol}>{emoji.symbol}</div>
    //                     ))
    //                 }
    //             </div>
    //         </div>
    //     )
    // }

    let handleClickEmoji = (emoji) => {
        const cursorPosition = refInput.current.selectionStart;

        const text = refInput.current.value;
        const prev = text.slice(0, cursorPosition);
        const next = text.slice(cursorPosition);

        refInput.current.value = prev + emoji.symbol + next;
        refInput.current.selectionStart = cursorPosition + emoji.symbol.length;
        refInput.current.selectionEnd = cursorPosition + emoji.symbol.length;
        refInput.current.focus();
    }

    return(
        <div ref={containerRef} className={styles.inputContainer} >
            <button onClick={handleClickOpen}  className={styles.emojiPickerButton}>😀</button>
            {isOpen ? (
                <div className={styles.emojiPickerContainer} >
                    <EmojiSearch onSearch={handleSearch} />
                    <div className={styles.emojiList} >
                        {
                            emojis.map(emoji => (
                                <EmojiButton key={emoji.symbol} emoji={emoji} onClick={handleClickEmoji}/>
                            ))
                        }
                    </div>
                </div>
            ) : ("")}
        </div>
    )
}

export default forwardRef(EmojiPicker);