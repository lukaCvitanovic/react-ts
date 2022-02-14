import PageWrapper from "@/components/space/common/PageWrapper";
import crewImage from "@/assets/images/space/crew/image-douglas-hurley.png";

const Crews = () => {
    return (
        <PageWrapper className="h-screen bg-space-home-desktop text-white">
            <div className="grid grid-rows-[repeat(3, minmax(0, auto))] grid-flow-row auto-rows-auto gap-y-8 items-center justify-center">
                <div className="flex justify-center">
                    <span className="nav-text text-white/25 mr-4">02</span>
                    <span className="nav-text text-white">Meet your crew</span>
                </div>
                <img
                    src={crewImage}
                    alt="crewImage"
                    className="px-[4.75rem] h-56 border-b border-[#383B4B]"
                />
                <div className="flex flex-col items-center">
                    <span className="font-[Bellefair] text-white/50 uppercase">Comander</span>
                    <span className="font-[Bellefair] text-xl text-white uppercase mt-2">Douglas Hurley</span>
                    <p className="body-text text-heading-color text-center mt-4">Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.</p>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Crews;