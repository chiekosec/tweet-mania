import TweetReply from "../tweet/tweet-reply";

export default function ModalWrapper({ children, hC }) {
  return (
    <div
      className="absolute top-0 bg-black bg-opacity-40 z-20 min-h-screen w-full text-sm"
      onClick={hC}
    >
      <div
        className="mx-auto my-8 max-h-90vh overflow-y-auto max-w-xl bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b-1 border-twgray-lt p-4 relative h-10">
          <button
            className="w-8 h-8 text-blue-500 transition-all hover:bg-twblue hover:bg-opacity-20 rounded-full absolute top-1 left-2 right-0 bottom-0 flex justify-center items-center"
            onClick={hC}
          >
            <i className="fal fa-times text-blue-500 block pointer-events-none"></i>
          </button>
        </div>
        {children}
        <TweetReply />
      </div>
    </div>
  );
}
