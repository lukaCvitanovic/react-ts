import Score from "@/components/RPS/Score";
import ButtonRPS from "@/components/RPS/ButtonRPS";
import ModalPortal from "@/components/common/ModalPortal";
import Modal from '@/components/common/Modal';
import Rules from "@/components/RPS/Rules";
import { useState } from "react";

const RockPaperScissors = () => {
    const [open, setOpen] = useState(false);

    const openRulesModal = () => setOpen(true);
    const closeRulesModal = () => setOpen(false);

    return (
        <div className="flex flex-col justify-between items-center p-8 h-full bg-gradient-radial">
            <Score score={12} />
            {open &&
                <ModalPortal>
                    <Modal>
                        <Rules
                            onClose={closeRulesModal}
                        />
                    </Modal>
                </ModalPortal>
            }
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