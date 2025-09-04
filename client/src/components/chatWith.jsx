import { useEffect, useRef, useState } from "react";
import useUserStore from "../store/user";
import useMessageStore from "../store/message";
import { useParams } from "react-router-dom";
import { CircleIcon, CircleX, Image, Send } from "lucide-react";

const ChatWith = () => {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const { recieverId } = useParams();
  const { chatWith, onlineUsers } = useUserStore();
  const {
    messages,
    getMessages,
    sendMessage,
    unSubscribeToMessage,
    subscribeToMessage,
  } = useMessageStore();

  useEffect(() => {
    getMessages(recieverId);
    subscribeToMessage();

    return () => unSubscribeToMessage();
  }, [recieverId, subscribeToMessage, getMessages, unSubscribeToMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, preview]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !preview) return;

    sendMessage({
      text: text.trim(),
      image: preview,
      recieverId: recieverId,
    });

    // Clear form
    setText("");
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent newline
      handleSend(e);
    }
  };
  return (
    <>
      {/* Chat Messages */}
      <div className="flex-1 flex flex-col bg-gray-50 self-stretch">
        {/* Chat Header */}
        <div className="p-4 border-b bg-white flex items-center">
          {(chatWith.picturePath && (
            <div>
              <img
                className="w-8 h-8 rounded-full"
                src={chatWith.picturePath}
                alt=""
              />
              {onlineUsers.includes(chatWith._id) && (
                <span className="absolute z-30 left-3 -bottom-1">
                  <CircleIcon
                    style={{ fill: "green", width: "16px", zIndex: 100 }}
                  />
                </span>
              )}
            </div>
          )) || (
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
              {chatWith.fullName.slice(0, 1)}
            </div>
          )}
          <h3 className="ml-3 text-gray-700 font-semibold">
            {chatWith.fullName}
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {(messages.length === 0 && (
            <div className="bg-white shadow-xl mx-auto rounded-2xl p-8 w-full max-w-md h-fit text-center">
              <h1 className="text-2xl font-bold mb-2">Say Hello 👋</h1>
            </div>
          )) ||
            messages?.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === recieverId ? "chat-start" : "chat-end"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.senderId === recieverId
                      ? "chat-bubble-primary"
                      : "chat-bubble-success"
                  }`}
                >
                  {msg.text}
                  {msg.img && (
                    <img
                      src={msg.img}
                      alt="uploaded"
                      className="max-w-[150px] rounded-lg"
                    />
                  )}
                </div>
                {/* 👇 dummy div always at the bottom */}
              </div>
            ))}
            <div ref={bottomRef}></div>
        </div>
        {/* Preview */}
        {preview && (
          <div className=" relative border-dotted rounded-t-xl border-2 border-b-0 flex justify-center items-center bg-amber-100 ml-4 h-[9rem] w-[9rem]">
            <CircleX
              className="absolute -top-2 -right-2"
              fill="black"
              color="white"
              size={20}
              onClick={removeImage}
            />
            <img className="w-28 h-28 rounded-md" src={preview} alt="" />
          </div>
        )}

        {/* Message Input */}
        <div className="p-3 border-t bg-white flex items-center space-x-2">
          {/* Image Upload */}
          <label className="btn btn-ghost">
            <Image className="w-5 h-5 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </label>

          {/* Input text*/}

          <input
            name="text"
            type="text"
            placeholder="Type a message..."
            className="input input-bordered flex-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <button
            className="btn btn-success"
            disabled={!text.trim() && !preview}
            onClick={(e) => handleSend(e)}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWith;
