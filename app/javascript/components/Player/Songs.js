import React from "react";
import { TrashIcon } from "./icons";
import { formatSeconds } from "../../utils";
import { usePlayerState } from "../Context/PlayerContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorder } from "../../utils";

function Song({ song, index }) {
  const {
    currentSong,
    setCurrentSong,
    setPlaying,
    removeSong,
  } = usePlayerState();

  function handleClick() {
    setCurrentSong(song);
    setPlaying(true);
  }

  return (
    <Draggable draggableId={song.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className="flex p-3 py-2 text-sm cursor-pointer w-full"
            style={{
              letterSpacing: "0.1px",
              color: song.id == currentSong.id && "#f9556bad",
            }}
          >
            <div className="flex-shrink-0 mr-3 relative" onClick={handleClick}>
              <img
                src={song.attributes.image}
                alt=""
                className="object-cover w-24 h-full"
                style={{ filter: "opacity(0.75) grayscale(.75)" }}
              />
              <div className="w-13 absolute bottom-0 right-0 text-white">
                {formatSeconds(song.attributes.duration)}
              </div>
            </div>
            <span
              className="overflow-ellipsis overflow-hidden mr-3"
              onClick={handleClick}
            >
              {song.attributes.name}
            </span>
            <div className="flex-shrink-0 ml-auto">
              <TrashIcon
                stroke="#f56565"
                fillColor="#fff"
                onClick={() => removeSong(song)}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

function Songs() {
  const { songs, setSongs } = usePlayerState();

  if (songs.length === 0) {
    return (
      <div className="bg-white mt-8 p-3 text-gray-700 rounded shadow-card">
        No song has been added yet - ʕ◉ᴥ◉ʔ
      </div>
    );
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderSongs = reorder(
      songs,
      result.source.index,
      result.destination.index
    );

    setSongs(reorderSongs);
  }

  return (
    <div
      className="bg-white mt-8 text-gray-700 rounded shadow-card overflow-y-auto"
      style={{ maxHeight: "460px" }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {songs.map((song, index) => (
                <Song song={song} index={index} key={song.id} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Songs;
