import hamburger from '@/assets/images/space/shared/icon-hamburger.svg';
import Modal from '@/components/common/Modal';
import ModalPortal from '@/components/common/ModalPortal';
import SideNav from '@/components/space/common/navigation/SideNav';
import { BaseProps } from '@/helpers/types';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SideNavButton = ({ className }: BaseProps) => {
    const [sidebarFlag, setSidebarFlag] = useState(false);
    const [transitionFlag, setTransitionFlag] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const duration = 0.5;
    const ease = 'power2.inOut'

    const sidenavToogleAnimation = (flag: boolean) => {
        if (flag) {
            setTransitionFlag(true);
            gsap.to(ref.current, { x: '0', duration, ease });
        } else {
            gsap.to(ref.current, { x: '100%', duration, ease, onComplete: () => setSidebarFlag(false)});
        }
    };

    useEffect(() => {
        if (sidebarFlag) setTransitionFlag(true);
    }, [sidebarFlag]);
    useEffect(() => sidenavToogleAnimation(transitionFlag), [transitionFlag]);

    return (
        <div
            className={className}
        >
            <button
                onClick={() => setSidebarFlag(true)}
            >
                <img
                    src={hamburger}
                    alt='sidenav button'
                    className="w-6"
                />
            </button>
            {sidebarFlag &&
                <ModalPortal>
                    <Modal>
                        <SideNav
                            onClose={() => setTransitionFlag(false)}
                            ref={ref}
                        />
                    </Modal>
                </ModalPortal>
            }
        </div>
    );
};

export default SideNavButton;