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
  console.log({
    isPlaying,
    play,
    pause,
    next,
  });
  return (
    <div>
      <div>
        {!isPlaying ? (
          <BiPlayCircle onClick={play} />
        ) : (
          <BiPauseCircle onClick={pause} />
        )}
      </div>
      <div>
        <BiSkipNext onClick={next} />
      </div>
    </div>
  );
};

export default ControlButtons;
