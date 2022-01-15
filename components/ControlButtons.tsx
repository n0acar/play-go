import { BiPlayCircle, BiPauseCircle, BiSkipNext } from "react-icons/bi";

export interface ControlButtonProps {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  next: () => void;
}

const ControlButtons: React.FC<ControlButtonProps> = ({
  isPlaying,
  play,
  pause,
  next,
}) => {
  return (
    <div className="flex flex-row text-6xl w-2/5 sm:w-1/5 justify-center">
      <div>
        <BiPlayCircle className="text-transparent" />
      </div>
      <div className="active:text-amber-200">
        {!isPlaying ? (
          <BiPlayCircle onClick={play} />
        ) : (
          <BiPauseCircle onClick={pause} />
        )}
      </div>
      <div className="active:text-amber-200">
        <BiSkipNext onClick={next} />
      </div>
    </div>
  );
};
export default ControlButtons;
