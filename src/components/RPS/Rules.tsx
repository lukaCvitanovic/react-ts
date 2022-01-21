import rulesImg from '@/assets/images/image-rules.svg';
import ButtonRPS from '@/components/RPS/ButtonRPS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MouseEventHandler } from 'react';

const Rules = ({ onClose }: { onClose: MouseEventHandler }) => {
    return (
        <div className="bg-white h-full flex flex-col items-center justify-between p-10">
            <span className="mt-10 text-dark text-4xl font-bold uppercase">Rules</span>
            <img
                src={rulesImg}
                alt="rules"
            />
            <ButtonRPS
                variant="gray"
                onClick={onClose}
            >
                <FontAwesomeIcon
                    icon={faTimes}
                    className="fa-2x"
                />
            </ButtonRPS>
        </div>
    );
};

export default Rules;