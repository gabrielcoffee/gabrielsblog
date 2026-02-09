"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
    { href: "/", label: "hi" },
    { href: "/projects", label: "projects" },
    { href: "/posts", label: "writings" },
    { href: "/reviews", label: "critiques" },
];

function MapIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            <line x1="9" y1="3" x2="9" y2="18" />
            <line x1="15" y1="6" x2="15" y2="21" />
        </svg>
    );
}

function ArrowLeftIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    );
}

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const prevPathname = useRef(pathname);

    // When the route changes, close the menu (triggers exit animation on the new page)
    useEffect(() => {
        if (prevPathname.current !== pathname) {
            prevPathname.current = pathname;
            setMenuOpen(false);
        }
    }, [pathname]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 font-hk-grotesk">
            {/* Desktop nav */}
            <nav className="hidden md:flex justify-between items-center py-4 max-w-[600px] mx-auto backdrop-blur-sm bg-background/80">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="drop-shadow-sm"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center justify-end p-4 backdrop-blur-sm bg-background/80">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="relative z-50"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {menuOpen ? (
                        <span className="text-white">
                            <ArrowLeftIcon />
                        </span>
                    ) : (
                        <MapIcon />
                    )}
                </button>
            </div>

            {/* Mobile fullscreen menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        className="fixed inset-0 z-40 bg-[#1a1a1a] flex flex-col items-center justify-center gap-10 md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{
                                    delay: 0.3 + i * 0.08,
                                    duration: 0.3,
                                }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-6xl font-bold text-white"
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
