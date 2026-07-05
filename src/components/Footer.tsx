export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.04)] px-6 py-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-[#6b6980]">
        <a href="/" className="flex items-center gap-1.5 font-space font-bold tracking-tight text-[#e8e7e9]/60 hover:text-[#e8e7e9] transition-colors">
          <span className="text-[#c8ff2e]">404</span>
          <span className="text-[rgba(255,255,255,0.12)]">/</span>
          <span>Collective</span>
        </a>

        <p>&#169; {new Date().getFullYear()} The 404 Collective</p>
      </div>
    </footer>
  );
}
