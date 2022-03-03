import PageWrapper from "@/components/space/common/PageWrapper";
import Navigations from "@/components/space/common/navigation/Navigations";
import NavTransitionProvider from "@/components/space/transitions/NavTransitionProvider";
import { NavButtonProps } from "@/components/space/common/navigation/NavButton";
import data from "@/assets/data/space/data.json";
import kebabCase from "lodash/kebabCase"
import { Route } from "react-router-dom";
import useImportImage from "@/helpers/space/useImportImage";
import { Ref, useState } from "react";
import useColumnNav from "@/helpers/space/useColumnNav";
import AnimatedNavBorder from "@/components/space/transitions/AnimatedNavBorder";
import { AnimatedElementProps } from "@/helpers/types";
import AnimatedPill from "@/components/space/transitions/AnimatedPill";

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

type TechnologyProps = {
    name: string,
    images: {
        portrait: string,
        landscape: string,
    },
    description: string,
};

const Technology = ({ name, images: { landscape, portrait }, description }: TechnologyProps) => {
    const [portraitImage, setPortraitImage] = useState<string>('');
    const [landscapeImage, setLandscapeImage] = useState<string>('');

    const [columnNav, setColumnNav] = useState(false);

    useImportImage(portrait, 'technology/', setPortraitImage);
    useImportImage(landscape, 'technology/', setLandscapeImage);

    const negativeColumnSetter = (flag: boolean) => setColumnNav(!flag);
    useColumnNav(768, negativeColumnSetter);

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
                        src={landscapeImage}
                        alt="technologyImage"
                        className="w-screen lg:hidden"
                    />
                    <img
                        src={portraitImage}
                        alt="technologyImage"
                        className="hidden lg:block lg:w-full lg:max-w-[25rem] xl:min-w-[25rem] xl:max-w-[45rem]"
                    />
                </div>
                <NavTransitionProvider>
                    <nav className="relative flex justify-center gap-4 mt-2 md:mt-3 lg:col-start-1 lg:row-start-2 lg:flex-col lg:gap-8 lg:justify-start">
                        <AnimatedNavBorder column={columnNav} render={(props: AnimatedElementProps, ref: Ref<HTMLDivElement>) => <AnimatedPill {...props} ref={ref} />} />
                        <Navigations navigationData={technologiesNavigationData} />
                    </nav>
                </NavTransitionProvider>
                <div className="flex flex-col items-center px-6 md:px-10 md:w-full md:max-w-[29rem] lg:col-start-2 lg:row-start-2 lg:px-0 lg:max-w-full lg:items-start">
                    <span className="text-heading-color text-sm uppercase md:text-base lg:text-start">The technology ...</span>
                    <span className="font-[Bellefair] text-xl text-white uppercase mt-2 md:text-[2.5rem] md:mt-4">{name}</span>
                    <p className="body-text text-heading-color text-center mt-4 lg:text-left">{description}</p>
                </div>
            </div>
        </PageWrapper>
    );
};

const technologies = data.technology.map((technology) => {
    return (
        <Route
            path={kebabCase(technology.name)}
            key={kebabCase(technology.name)}
            element={<Technology {...technology} />}
        />
    );
});

export default technologies;