import EmojiPicker from "emoji-picker-react";

function ReactionSelector({ onEmojiSelect }) {
  const EmojiClick = (emojiData) => {
    onEmojiSelect(emojiData.emoji);
  };
  return <EmojiPicker onEmojiClick={EmojiClick} />;
}

export default ReactionSelector;
