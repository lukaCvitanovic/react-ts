import NavTransitionProvider from "@/components/space/transitions/NavTransitionProvider";
import PageWrapper from "@/components/space/common/PageWrapper";
import Navigations from "@/components/space/common/navigation/Navigations";
import { NavButtonProps } from "@/components/space/common/navigation/NavButton";
import { Route } from "react-router-dom";
import data from "@/assets/data/space/data.json";
import { Ref, useState } from "react";
import useImportImage from "@/helpers/space/useImportImage";
import AnimatedSlider from "@/components/space/transitions/AnimatedSlider";
import { AnimatedElementProps } from "@/helpers/types";
import AnimatedBorder from "@/components/space/transitions/AnimatedBorder";

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

type DestinationProp = {
    name: string,
    images: { png: string },
    description: string,
    distance: string,
    travel: string,
};

const Destination = ({ name, images: { png }, description, distance, travel }: DestinationProp) => {
    const [image, setImage] = useState<string>('');

    useImportImage(png, 'destination/', setImage);

    return (
        <PageWrapper className="lg:flex lg:justify-center h-screen bg-space-destination-mobile md:bg-space-destination-tablet lg:space-destination-desktop text-white">
            <div className="flex flex-col lg:flex-row lg:w-full lg:max-w-[69.5rem] lg:justify-between lg:pt-20">
                <div className="flex flex-col items-center">
                    <div className="flex nav-text w-full justify-center md:justify-start">
                        <span className="text-white/25 mr-[1.125rem] font-bold md:text-xl lg:space-heading5">01</span>
                        <span className="md:text-xl lg:space-heading5">Pick your destination</span>
                    </div>
                    <img
                        src={image}
                        alt="moon"
                        className="w-[10.5rem] h-[10.5rem] md:w-[18.75rem] md:h-[18.75rem] lg:w-[28rem] lg:h-[28rem] mt-8 md:mt-[3.75rem] lg:mt-24 lg:ml-16"
                    />
                </div>
                <div className="flex flex-col items-center mt-4 md:mt-10 md:px-14 md:pb-14 lg:p-0 lg:w-full lg:max-w-[28rem] lg:items-start lg:mt-20">
                    <NavTransitionProvider>
                        <nav className="relative flex gap-x-6 md:gap-x-9">
                            <Navigations navigationData={destiantionsNavigationData} />
                            <AnimatedSlider
                                column={false}
                                render={(props: AnimatedElementProps, ref: Ref<HTMLHRElement>) => <AnimatedBorder {...props} ref={ref} />}
                            />
                        </nav>
                    </NavTransitionProvider>
                    <h3 className="space-heading3 mt-5 md:text-[5rem] md:mt-8 lg:space-heading2">{name}</h3>
                    <p className="text-heading-color text-center lg:text-left md:mt-2 lg:mt-3">{description}</p>
                    <div className="flex w-full flex-col md:flex-row md:justify-evenly lg:justify-start lg:flex-row border-t border-[#383B4B] mt-8 lg:mt-[3.375rem] pt-8 gap-8 lg:gap-x-20">
                        <div className="flex flex-col items-center lg:items-start">
                            <span className="space-subheading2 text-heading-color">Avg. Distance</span>
                            <span className="space-subheading1 mt-3">{distance}</span>
                        </div>
                        <div className="flex flex-col items-center lg:items-start">
                            <span className="space-subheading2 text-heading-color">Est. travel time</span>
                            <span className="space-subheading1 mt-3">{travel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const destinations = data.destinations.map((destination) => {
    return (
        <Route
            path={destination.name.toLowerCase()}
            key={destination.name.toLowerCase()}
            element={<Destination {...destination} />}
        />
    );
});

export default destinations;