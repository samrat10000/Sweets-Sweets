import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#fffdf9] border-t border-black py-20 mt-20">
      <div className="max-w-2xl mx-auto px-6 text-center">

        <Link to="/" className="inline-block mb-10">
          <h2 className="text-3xl text-black lowercase tracking-tighter italic" style={{ fontFamily: 'Playfair Display, serif' }}>
            sweetshop.
          </h2>
        </Link>

        <nav className="flex flex-wrap justify-center mb-12" style={{ gap: '80px', rowGap: '16px' }}>
          {['Shop', 'Cart', 'Top Rated', 'Contact'].map((item, idx) => {
            const path = item === 'Shop' ? '/' : item === 'Cart' ? '/cart' : '/';
            return (
              <Link key={idx} to={path} className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black font-mono">
                {item}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-4">
            {['IG', 'TW', 'FB'].map((social) => (
              <span key={social} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-[9px] font-bold text-gray-400 hover:border-black hover:text-black font-mono cursor-pointer">
                {social}
              </span>
            ))}
          </div>

          <div className="w-8 h-px bg-gray-200"></div>

          <p className="text-[9px] uppercase tracking-widest text-gray-300 font-mono">
            © 2025 SweetShop · Est. 2024
          </p>
        </div>

      </div>
    </footer>
  );
}