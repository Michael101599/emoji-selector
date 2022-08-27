import styles from "./emojiPicker/emojiPicker.module.css"

export default function EmojiButton({emoji, onClick}){

    let handleClick = () => {
        onClick(emoji);
    }
    return(
        <button className={styles.emojiButton} onClick={handleClick}>{emoji.symbol}</button>
    )
}