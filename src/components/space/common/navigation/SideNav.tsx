import close from '@/assets/images/space/shared/icon-close.svg';
import { MouseEventHandler, forwardRef, LegacyRef, useRef, useEffect } from 'react';
import Navigations from '@/components/space/common/navigation/Navigations';
import AnimatedNavBorder from "@/components/space/transitions/AnimatedNavBorder";
import { BaseProps } from '@/helpers/types';

type SideNavProps = {
    onClose: MouseEventHandler,
};
const SideNav = ({ onClose }: SideNavProps & BaseProps, ref: LegacyRef<HTMLDivElement>) => {
    return (
        <aside
            className="absolute translate-x-full right-0 flex flex-col w-full h-full max-w-[16rem] backdrop-blur-[5.125rem] bg-white/[.04]"
            ref={ref}
        >
            <div className="flex items-center justify-end p-8 pr-6">
                <button
                    onClick={onClose}
                >
                    <img
                        src={close}
                        alt='close'
                        className="w-5 h-5"
                    />
                </button>
            </div>
            <nav className='flex flex-col gap-y-8 mt-16 text-white'>
                <Navigations column />
                <AnimatedNavBorder column />
            </nav>
        </aside>
    );
};

export default forwardRef(SideNav);