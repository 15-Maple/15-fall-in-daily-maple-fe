import EmojiPicker from "emoji-picker-react";

function ReactionSelector({ onEmojiSelect }) {
  const EmojiClick = (emojiData) => {
    onEmojiSelect(emojiData);
  };
  return <EmojiPicker onEmojiClick={EmojiClick} />;
}

export default ReactionSelector;
