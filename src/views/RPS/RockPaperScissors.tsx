import Score from "@/components/RPS/Score";
import ButtonRPS from "@/components/RPS/ButtonRPS";
import ModalPortal from "@/components/common/ModalPortal";
import Modal from '@/components/common/Modal';

const RockPaperScissors = () => {
    const openRulesModal = () => console.log('open');

    return (
        <div className="flex flex-col justify-between items-center p-8 h-full bg-gradient-radial">
            <Score score={12} />
            <ModalPortal>
                <Modal>
                    <span className="text-white">hej</span>
                </Modal>
            </ModalPortal>
            <ButtonRPS
                className="mb-8"
                onClick={openRulesModal}
            >
                <span>Rules</span>
            </ButtonRPS>
        </div>
    );
};

export default RockPaperScissors;