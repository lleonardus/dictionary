export default function Footer({ sourceUrl }) {
  return (
    <footer className="flex flex-col gap-3 pt-8 underline-offset-2 sm:flex-row sm:pt-6">
      <p className="text-gray-500 underline decoration-gray-500">Source</p>
      <span className="flex items-center gap-[10px] underline decoration-black dark:decoration-white">
        <a
          className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-700 dark:text-white"
          href={sourceUrl}
          target="_blank"
        >
          {sourceUrl}
        </a>
        <img src="images/icon-new-window.svg" alt="window icon" />
      </span>
    </footer>
  );
}
