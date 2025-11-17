export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm text-gray-500 bg-black/20 backdrop-blur-md border-t border-white/10">
      <p>
        Разработано{' '}
        <a
          href="https://t.me/winterstudiomc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-hover transition-colors"
        >
          Winter Studio
        </a>
      </p>
    </footer>
  );
}
