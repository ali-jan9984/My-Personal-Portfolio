import Link from 'next/link';

function Navbar() {
  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <button className="text-2xl font-semibold tracking-tight text-yellow-400 hover:text-white transition duration-300">
            Ali Jan
          </button>
        </Link>
        <div className="space-x-8">
          <Link href="/">
            <button className="text-lg hover:text-yellow-300 transition duration-300">Home</button>
          </Link>
          <Link href="#about">
            <button className="text-lg hover:text-yellow-300 transition duration-300">About</button>
          </Link>
          <Link href="#skills">
            <button className="text-lg hover:text-yellow-300 transition duration-300">Skills</button>
          </Link>
          <Link href="#contact">
            <button className="text-lg hover:text-yellow-300 transition duration-300">Contact</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

