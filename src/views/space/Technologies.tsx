import PageWrapper from "@/components/space/common/PageWrapper";
import technologyImageLandscape from "@/assets/images/space/technology/image-launch-vehicle-landscape.jpg";
import technologyImagePortrait from "@/assets/images/space/technology/image-launch-vehicle-portrait.jpg";
import Navigations from "@/components/space/common/navigation/Navigations";
import NavTransitionProvider from "@/components/space/transitions/NavTransitionProvider";
import { NavButtonProps } from "@/components/space/common/navigation/NavButton";

const technologiesNavigationData: NavButtonProps[] = [
    {
        to: '/space/technologies/launch-vehicle',
        number: 1,
        title: 'launch vehicle',
        numbered: true,
    },
    {
        to: '/space/technologies/spaceport',
        number: 2,
        title: 'spaceport',
        numbered: true,
    },
    {
        to: '/space/technologies/space-capsule',
        number: 3,
        title: 'space capsule',
        numbered: true,
    },
];

const Technologies = () => {
    return (
        <PageWrapper
            paddingX={false}
            className="h-screen text-white bg-space-technology-mobile md:bg-space-technology-tablet lg:bg-space-technology-desktop lg:flex lg:items-start lg:justify-end"
        >
            <div className="grid grid-rows-[repeat(4, minmax(0, auto))] gap-y-6 md:justify-items-center md:gap-y-10 lg:mt-16 lg:ml-10 lg:grid-rows-[min-content_1fr] lg:grid-cols-[min-content_auto_25rem] lg:h-full lg:w-full lg:gap-x-20 lg:gap-y-[8.5rem] lg:max-w-[70rem] xl:grid-cols-[min-content_30rem_auto] xl:max-w-full xl:ml-[10.375rem]">
                <div className="px-6 flex w-full justify-center md:px-10 md:justify-start lg:col-span-2 lg:row-start-1 lg:px-0">
                    <span className="nav-text text-white/25 font-bold md:text-xl lg:space-heading5 mr-4">03</span>
                    <span className="nav-text text-white md:text-xl lg:space-heading5">Space launch 101</span>
                </div>
                <div className="flex w-screen justify-center mt-2 md:mt-4 lg:row-span-2 lg:col-start-3 lg:w-full lg:mt-0 lg:self-start lg:pt-[3.5rem]">
                    <img
                        src={technologyImageLandscape}
                        alt="technologyImage"
                        className="w-screen lg:hidden"
                    />
                    <img
                        src={technologyImagePortrait}
                        alt="technologyImage"
                        className="hidden lg:block lg:w-full lg:max-w-[25rem] xl:min-w-[25rem] xl:max-w-[45rem]"
                    />
                </div>
                <NavTransitionProvider>
                    <nav className="flex justify-center gap-4 mt-2 md:mt-3 lg:col-start-1 lg:row-start-2 lg:flex-col lg:gap-8 lg:justify-start">
                        <Navigations navigationData={technologiesNavigationData} />
                    </nav>
                </NavTransitionProvider>
                <div className="flex flex-col items-center px-6 md:px-10 md:w-full md:max-w-[29rem] lg:col-start-2 lg:row-start-2 lg:px-0 lg:max-w-full lg:items-start">
                    <span className="text-heading-color text-sm uppercase md:text-base lg:text-start">The technology ...</span>
                    <span className="font-[Bellefair] text-xl text-white uppercase mt-2 md:text-[2.5rem] md:mt-4">Launch vehicle</span>
                    <p className="body-text text-heading-color text-center mt-4 lg:text-left">A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!</p>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Technologies;