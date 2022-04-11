import Logo from '@/components/space/common/Logo';
import ExplorationController from '@/components/space/exploration/ExplorationController';

const SpaceLogo = () => {
    return (
        <div className="flex items-center z-20">
            <Logo className='shrink-0' />
            <div className='flex w-full overflow-hidden px-4'>
                <ExplorationController />
            </div>
        </div>
    );
};

export default SpaceLogo;