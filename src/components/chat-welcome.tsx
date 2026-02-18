export function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 animate-in fade-in zoom-in-95 duration-700">
      <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] flex items-center justify-center mb-6 shadow-xl ring-4 ring-white">
        <span className="text-white font-bold text-2xl">V</span>
      </div>
      <h2 className="text-3xl font-headline font-bold text-neutral-900 mb-3 tracking-tight">Hello everyone, welcome to Vorgawall Shop 👋🏻 😀.</h2>
      <p className="text-neutral-500 max-w-md mx-auto leading-relaxed">
        All conversations are saved in your device storage.
      </p>
    </div>
  );
}