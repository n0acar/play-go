import {
  BiPlayCircle,
  BiPauseCircle,
  BiSkipNext,
  BiPlus,
} from "react-icons/bi";

export interface ControlButtonProps {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  next: () => void;
  addToPlaylist: () => void;
}

const ControlButtons: React.FC<ControlButtonProps> = ({
  isPlaying,
  play,
  pause,
  next,
  addToPlaylist,
}) => {
  return (
    <div className="flex flex-row text-6xl w-2/5 sm:w-1/5 justify-center">
      <div>
        <BiPlus
          className="hover:text-lime-400 active:text-lime-200"
          onClick={addToPlaylist}
        />
      </div>
      <div className="hover:text-lime-400 active:text-lime-200">
        {!isPlaying ? (
          <BiPlayCircle onClick={play} />
        ) : (
          <BiPauseCircle onClick={pause} />
        )}
      </div>
      <div className="hover:text-lime-400 active:text-lime-200">
        <BiSkipNext onClick={next} />
      </div>
    </div>
  );
};
export default ControlButtons;
