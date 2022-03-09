import PageWrapper from "@/components/space/common/PageWrapper";
import { ExplorationContext } from "@/components/space/ExplorationProvider";
import LandingPageButton from "@/components/space/LandingButton";
import { useContext, useEffect } from "react";

const spaceRoutes = [
    'destinations/moon',
    'destinations/mars',
    'destinations/europa',
    'destinations/titan',
    'crews/douglas-hurley',
    'crews/mark-shuttleworth',
    'crews/victor-glover',
    'crews/anousheh-ansari',
    'technologies/launch-vehicle',
    'technologies/spaceport',
    'technologies/space-capsule',
    'home',
  ];

const SpaceLanding = () => {
    const { state: { routes }, dispatch } = useContext(ExplorationContext);

    useEffect(() => {
        if (!routes.length) dispatch({ type: 'setRoutes', payload: spaceRoutes });
    }, []);

    const triggerExploration = () => dispatch({ type: 'setExplore', payload: true });

    return (
        <PageWrapper className="h-screen flex md:items-end bg-space-home-mobile md:bg-space-home-tablet lg:bg-space-home-desktop text-white">
            <div className="flex flex-col lg:flex-row items-center md:justify-between w-full lg:px-[7.8125rem] lg:pb-28">
                <div className="flex flex-col w-full items-center max-w-md gap-y-4 sm:gap-y-6">
                    <h5 className="nav-text text-heading-color md:space-heading5">So, you want to travel to</h5>
                    <h1 className="hidden md:block space-heading1">Space</h1>
                    <h2 className="md:hidden space-heading2">Space</h2>
                    <p className="md:body-text text-heading-color text-center">
                        Let’s face it; if you want to go to space, you might as well genuinely go to 
                        outer space and not hover kind of on the edge of it. Well sit back, and relax 
                        because we’ll give you a truly out of this world experience!
                    </p>
                </div>
                <div className="flex justify-center items-end pb-6 md:pb-[4.125rem] mt-20 md:mt-[9.5rem]">
                    <LandingPageButton
                        onClick={triggerExploration}
                    />
                </div>
            </div>
        </PageWrapper>
    );
};

export default SpaceLanding;