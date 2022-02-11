import NavTransitionProvider from "@/components/space/transitions/NavTransitionProvider";
import PageWrapper from "@/components/space/common/PageWrapper";
import imageMoon from "@/assets/images/space/destination/image-moon.png";
import Navigations from "@/components/space/common/navigation/Navigations";
import { NavButtonProps } from "@/components/space/common/navigation/NavButton";

const destiantionsNavigationData: NavButtonProps[] = [
    {
        to: '/space/destinations/moon',
        number: 0,
        title: 'moon',
        small: true,
        showNumber: false,
    },
    {
        to: '/space/destinations/mars',
        number: 1,
        title: 'mars',
        small: true,
        showNumber: false,
    },
    {
        to: '/space/destinations/europa',
        number: 2,
        title: 'europa',
        small: true,
        showNumber: false,
    },
    {
        to: '/space/destinations/titan',
        number: 3,
        title: 'titan',
        small: true,
        showNumber: false,
    },
];

const Destinations = () => {
    return (
        <PageWrapper className="lg:flex lg:justify-center h-screen bg-space-destination-mobile md:bg-space-destination-tablet lg:space-destination-desktop text-white">
            <div className="flex flex-col lg:flex-row lg:w-full lg:max-w-[69.5rem] lg:justify-between lg:pt-20">
                <div className="flex flex-col items-center">
                    <div className="flex nav-text w-full justify-center md:justify-start">
                        <span className="text-white/25 mr-[1.125rem] md:text-xl lg:space-heading5">01</span>
                        <span className="md:text-xl lg:space-heading5">Pick your destination</span>
                    </div>
                    <img
                        src={imageMoon}
                        alt="moon"
                        className="w-[10.5rem] h-[10.5rem] md:w-[18.75rem] md:h-[18.75rem] lg:w-[28rem] lg:h-[28rem] mt-8 md:mt-[3.75rem] lg:mt-24 lg:ml-16"
                    />
                </div>
                <div className="flex flex-col items-center mt-4 md:mt-10 md:px-14 md:pb-14 lg:p-0 lg:w-full lg:max-w-[28rem] lg:items-start lg:mt-20">
                    <NavTransitionProvider>
                        <nav className="flex gap-x-6 md:gap-x-9">
                            <Navigations navigationData={destiantionsNavigationData} />
                        </nav>
                    </NavTransitionProvider>
                    <h3 className="space-heading3 mt-5 md:text-[5rem] md:mt-8 lg:space-heading2">Moon</h3>
                    <p className="text-heading-color text-center lg:text-left md:mt-2 lg:mt-3">See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.</p>
                    <div className="flex w-full flex-col md:flex-row md:justify-evenly lg:justify-start lg:flex-row border-t border-[#383B4B] mt-8 lg:mt-[3.375rem] pt-8 gap-8 lg:gap-x-20">
                        <div className="flex flex-col items-center lg:items-start">
                            <span className="space-subheading2 text-heading-color">Avg. Distance</span>
                            <span className="space-subheading1 mt-3">384,400 Km</span>
                        </div>
                        <div className="flex flex-col items-center lg:items-start">
                            <span className="space-subheading2 text-heading-color">Est. travel time</span>
                            <span className="space-subheading1 mt-3">3 Days</span>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Destinations;