"use client";

import { useState, useEffect, useRef } from "react";
import { SearchIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "./Icons";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ searchQuery = "", onSearchChange }: HeaderProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<Set<string>>(new Set());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [menuVisible, setMenuVisible] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection =
        currentScrollY > lastScrollY.current ? "down" : "up";

      setScrollY(currentScrollY);

      // If at top, menu should be in original position (not sticky)
      if (currentScrollY === 0) {
        setMenuVisible(true);
      } else if (currentScrollY > 200) {
        // After 200px, show/hide based on scroll direction
        if (scrollDirection === "down") {
          setMenuVisible(false);
        } else {
          setMenuVisible(true);
        }
      } else {
        // Before 200px, menu is sticky and visible
        setMenuVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setOpenMobileSubmenu(new Set());
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Блокируем скролл страницы
      document.body.style.overflow = "hidden";
    } else {
      // Разблокируем скролл страницы
      document.body.style.overflow = "";
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    {
      label: "Demos",
      href: "#",
      submenu: [
        { label: "Post Header", href: "#" },
        { label: "Post Layout", href: "#" },
        { label: "Share Buttons", href: "#" },
        { label: "Gallery Post", href: "#" },
        { label: "Video Post", href: "#" },
      ],
    },
    {
      label: "Post",
      href: "#",
      submenu: [
        { label: "Post Header", href: "#" },
        { label: "Post Layout", href: "#" },
        { label: "Share Buttons", href: "#" },
        { label: "Gallery Post", href: "#" },
        { label: "Video Post", href: "#" },
      ],
    },
    {
      label: "Features",
      href: "#",
      submenu: [
        { label: "Post Header", href: "#" },
        { label: "Post Layout", href: "#" },
        { label: "Share Buttons", href: "#" },
        { label: "Gallery Post", href: "#" },
        { label: "Video Post", href: "#" },
      ],
    },
    {
      label: "Categories",
      href: "#",
      submenu: [
        { label: "Post Header", href: "#" },
        { label: "Post Layout", href: "#" },
        { label: "Share Buttons", href: "#" },
        { label: "Gallery Post", href: "#" },
        { label: "Video Post", href: "#" },
      ],
    },
    {
      label: "Shop",
      href: "#",
      submenu: [
        { label: "Post Header", href: "#" },
        { label: "Post Layout", href: "#" },
        { label: "Share Buttons", href: "#" },
        { label: "Gallery Post", href: "#" },
        { label: "Video Post", href: "#" },
      ],
    },
    { label: "Buy Now", href: "#", submenu: null },
  ];

  const isSticky = scrollY > 0;
  const shouldShowMenu = scrollY === 0 || (scrollY > 0 && menuVisible);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  return (
    <>
      <header className="relative">
        {/* Top section with logo */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-300 mx-auto px-4 py-7">
            <div className="flex items-center justify-center relative">
              <button
                className="md:hidden absolute left-0 flex flex-col gap-1.5 w-6 h-6"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <span className="block w-full h-0.5 bg-black"></span>
                <span className="block w-full h-0.5 bg-black"></span>
                <span className="block w-full h-0.5 bg-black"></span>
              </button>
              <div className="flex items-center">
                <img 
                  src="/Logotype.svg" 
                  alt="LOGOTYPE" 
                  className="h-6 md:h-7 w-45"
                />
              </div>
              <div className="absolute right-0 flex items-center">
                {isSearchOpen ? (
                  <div className="flex items-center gap-2">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm w-48 md:w-64"
                      autoFocus
                    />
                    <button
                      onClick={handleSearchToggle}
                      className="w-6 h-6 flex items-center justify-center"
                      aria-label="Close search"
                    >
                      <CloseIcon className="w-5 h-5 text-black" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSearchToggle}
                    className="w-6 h-6 flex items-center justify-center"
                    aria-label="Search"
                  >
                    <SearchIcon className="w-4.5 h-4.5 text-black" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal menu - sticky */}
        <nav
          className={`hidden md:block bg-white border-b border-gray-200 transition-transform duration-300 ${
            isSticky
              ? "fixed top-0 left-0 right-0 z-50 shadow-md"
              : "sticky top-0 z-40"
          } ${!shouldShowMenu ? "-translate-y-full" : ""}`}
        >
          <div className="max-w-300 mx-auto px-5">
            <ul className="flex items-center justify-center gap-6 lg:gap-8 h-14">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="relative group py-3 items-center"
                  onMouseEnter={() =>
                    item.submenu && setIsSubmenuOpen(item.label)
                  }
                  onMouseLeave={() => setIsSubmenuOpen(null)}
                >
                  <a
                    href={item.href}
                    className="text-[16px] font-medium text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1"
                  >
                    {item.label}
                    {item.submenu && <ChevronDownIcon/>}
                  </a>
                  {item.submenu && (
                    <ul
                      className={`absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg min-w-[176px] p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                        isSubmenuOpen === item.label
                          ? "opacity-100 visible"
                          : ""
                      }`}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          {subIndex > 0 && (
                            <hr className="my-2 border-gray-200" />
                          )}
                          <a
                            href={subItem.href}
                            className="text-[13px] leading-[13px] font-normal text-gray-700 hover:pl-2 hover:bg-gray-50 hover:text-gray-900 flex items-center justify-between"
                          >
                            {subItem.label}
                            <ChevronRightIcon />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setOpenMobileSubmenu(new Set());
            }}
          />
          <div
            className={`fixed left-0 top-0 bottom-0 w-full max-w-90 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="/Logotype.svg" 
                  alt="LOGOTYPE" 
                  className="h-5 w-auto"
                />
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setOpenMobileSubmenu(new Set());
                }}
                className="relative w-6 h-6 flex items-center justify-center"
                aria-label="Close menu"
              >
                <CloseIcon className="w-6 h-6 text-black" />
              </button>
            </div>
            <nav className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
              <ul className="space-y-0">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {index > 0 && <hr className="my-0 border-gray-200" />}
                    {item.submenu ? (
                      <>
                        <button
                          className="w-full py-3 text-base font-medium text-black hover:text-gray-700 flex items-center gap-2"
                          onClick={() => {
                            const currentSet = openMobileSubmenu || new Set();
                            const newSet = new Set(currentSet);
                            if (newSet.has(item.label)) {
                              newSet.delete(item.label);
                            } else {
                              newSet.add(item.label);
                            }
                            setOpenMobileSubmenu(newSet);
                          }}
                        >
                          {item.label}
                          <ChevronDownIcon
                            className={`transition-transform w-2.5 h-1.5 mt-0.5 ${
                              openMobileSubmenu?.has(item.label) ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openMobileSubmenu?.has(item.label) && (
                          <ul className="ml-4 space-y-0 max-h-64 overflow-y-auto">
                            {item.submenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <a
                                  href={subItem.href}
                                  className="block py-2 text-sm text-gray-700 hover:text-gray-900"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subItem.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.href}
                        className="py-3 text-base font-medium text-black hover:text-gray-700 flex items-center justify-between"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
