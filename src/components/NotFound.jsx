export default function NotFound({ errorMessage }) {
  return (
    <div className="pt-14 text-center sm:pt-32">
      <div className="pb-10 text-2xl">😕</div>
      <h1 className="pb-9 text-xl font-bold">{errorMessage.title}</h1>
      <p className="text-base text-gray-500">{errorMessage.message}</p>
    </div>
  );
}
