"use client";

import { useState, useEffect, useRef } from "react";

interface NavbarProps {
    yolName?: string;
    yolLevel?: number;
    yolXp?: number;
    yolXpToNextLevel?: number;
    userName?: string;
}

const Navbar = ({
    yolName = "Mini Yol",
    yolLevel = 1,
    yolXp = 10,
    yolXpToNextLevel = 350,
    userName = "Yol'anda",
}: NavbarProps) => {
    const progressBarPercentage: string = yolXp === 0 ? "w-0" : `w-[${Math.round((yolXp / yolXpToNextLevel) * 100)}%]`;
    const firstLetterOfUserName: string = userName.charAt(0).toUpperCase();
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    const menuItems = [
        {
            name: "Profil",
            link: "/profile",
        },
        {
            name: "Déconnexion",
            link: "/",
        },
    ];

    const menuRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (event: MouseEvent) => {
        if (menuIsOpen && !menuRef.current?.contains(event.target as Node)) {
            setMenuIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [menuIsOpen]);

    return (
        <nav className="relative bg-blue text-[#FFFFFF]">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="relative flex items-center gap-2 sm:gap-8">
                        <div className="flex-shrink-0">
                            <div className="bg-purple w-[40px] h-[40px]" />
                        </div>
                        <div className="flex flex-col">
                            <div className="">
                                <span className="sm:text-3xl">Level {yolLevel}</span>
                            </div>
                            <div className="">
                                <span className="text-sm sm:text-base">{yolName}</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-[75px] sm:w-[150px]">
                                <div className="h-[10px] bg-[#FFFFFF] mt-2">
                                    <div className={`${progressBarPercentage} h-full bg-orange`} />
                                </div>
                            </div>
                            <div className="flex items-center text-sm sm:text-lg">
                                <span className=" mr-2">{yolXp} XP</span>
                                <span className="">/ {yolXpToNextLevel} XP</span>
                            </div>
                        </div>
                        <img className="absolute h-[64px] left-[80%] select-none" src="assets/cloud-with-moon.png" />
                    </div>

                    <div
                        ref={menuRef}
                        className="ml-3 relative flex gap-3 items-center"
                        onClick={() => {
                            setMenuIsOpen(!menuIsOpen);
                        }}
                    >
                        <div className="bg-purple w-[40px] h-[40px] grid place-items-center text-4xl cursor-pointer select-none">
                            {firstLetterOfUserName}
                        </div>
                        <div className="rotate-90 text-2xl select-none cursor-pointer">&gt;</div>
                        {menuIsOpen && (
                            <ul className="absolute top-[51px] left-[-80px]">
                                {menuItems.map((item, index) => (
                                    <a className="cursor-pointer" href={item.link}>
                                        <li key={index} className="w-[150px] border-2 p-1 text-xl border-purple bg-blue">
                                            {item.name}
                                        </li>
                                    </a>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
