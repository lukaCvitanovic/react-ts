import PageWrapper from "@/components/space/common/PageWrapper";
import crewImage from "@/assets/images/space/crew/image-douglas-hurley.png";
import NavTransitionProvider from "@/components/space/transitions/NavTransitionProvider";
import Navigations from "@/components/space/common/navigation/Navigations";
import { NavButtonProps } from "@/components/space/common/navigation/NavButton";

const crewsNavigationData: NavButtonProps[] = [
    {
        to: '/space/crews/douglas-hurley',
        number: 0,
        title: 'douglas hurley',
        circle: true,
    },
    {
        to: '/space/crews/mark-shuttleworth',
        number: 1,
        title: 'mark shuttleworth',
        circle: true,
    },
    {
        to: '/space/crews/victor-glover',
        number: 2,
        title: 'victor glover',
        circle: true,
    },
    {
        to: '/space/crews/anousheh-ansari',
        number: 3,
        title: 'anousheh ansari',
        circle: true,
    },
];

// type CrewProp = {
//     number: number,
//     name: string,
//     images: { png: string },
//     role: string,
//     bio: string,
// };

const Crews = () => {
    return (
        <PageWrapper className="h-screen bg-space-home-desktop text-white lg:flex lg:justify-center lg:items-start xl:px-[10.5rem]">
            <div className="grid grid-rows-[repeat(4, minmax(0, auto))] grid-cols-1 grid-flow-row auto-rows-auto gap-y-8 md:gap-y-10 items-center justify-center md:w-full md:justify-items-center lg:grid-rows-[min-content_min-content_1fr] lg:grid-cols-[auto_1fr] lg:gap-x-20 lg:justify-items-start lg:mt-[3.5rem] lg:h-full lg:max-w-[60.5625rem] xl:max-w-[78.5rem]">
                <div className="flex w-full justify-center md:justify-start">
                    <span className="nav-text text-white/25 font-bold md:text-xl lg:space-heading5 mr-4">02</span>
                    <span className="nav-text text-white md:text-xl lg:space-heading5">Meet your crew</span>
                </div>
                <div className="flex w-full justify-center md:row-start-4 lg:row-span-3 lg:col-start-2 lg:self-end">
                    <img
                        src={crewImage}
                        alt="crewImage"
                        className="px-[4.75rem] h-56 border-b border-[#383B4B] md:h-[35.75rem] md:border-none md:px-0 lg:w-full lg:h-full lg:max-w-[25rem] xl:min-w-[25rem] xl:max-w-[43rem]"
                    />
                </div>
                <NavTransitionProvider>
                    <nav className="flex justify-center gap-x-4 lg:mb-24 lg:self-end">
                        <Navigations navigationData={crewsNavigationData} />
                    </nav>
                </NavTransitionProvider>
                <div className="flex flex-col items-center md:row-start-2 md:mt-5 md:w-full md:max-w-[29rem] lg:row-start-2 lg:max-w-[30.5rem] lg:items-start lg:self-end lg:mt-28">
                    <span className="font-[Bellefair] text-white/50 md:text-2xl lg:space-heading4 uppercase">Commander</span>
                    <span className="font-[Bellefair] text-xl text-white md:text-[2.5rem] lg:space-heading3 uppercase mt-2 lg:mt-4 lg:leading-[4rem]">Douglas Hurley</span>
                    <p className="body-text text-heading-color text-center mt-4 lg:text-lg lg:text-left lg:w-full lg:max-w-[85%] lg:mt-7">Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.</p>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Crews;