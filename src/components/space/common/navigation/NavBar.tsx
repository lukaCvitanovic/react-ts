import NavTransitionProvider from "@/components/space/transitions/NavTransitionProvider";
import Navigations from "@/components/space/common/navigation/Navigations";
import AnimatedNavBorder from "@/components/space/transitions/AnimatedNavBorder";
import SpaceLogo from "@/components/space/common/SpaceLogo";
import SideNavButton from "@/components/space/common/navigation/SideNavButton";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
    const [columnNav, setColumnNav] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => setColumnNav(window.innerWidth < 768));
    });

    return (
        <div className="h-screen relative overflow-hidden">
            <NavTransitionProvider>
                <div className="absolute lg:top-10 flex w-full pl-6 md:pl-10 lg:pl-[3.375rem] justify-between items-center">
                    <SpaceLogo />
                    <div className="absolute w-full h-full hidden lg:flex items-center top-0">
                        <div className="absolute left-[6.375rem]  z-10 h-px w-1/3 pr-3 bg-white/[.25] mix-blend-normal"></div>
                    </div>
                    <nav className="hidden md:flex px-12 lg:pl-[7.5rem] md:w-fit lg:w-full shrink lg:max-w-[60%] gap-x-12 text-white backdrop-blur-[5.125rem] bg-white/[.04]">
                        <Navigations />
                        {!columnNav &&
                            <AnimatedNavBorder />
                        }
                    </nav>
                    <div className="md:hidden p-6 h-24 flex items-center justify-center">
                        <SideNavButton />
                    </div>
                </div>
            </NavTransitionProvider>
            <Outlet />
        </div>
    );
};

export default NavBar;