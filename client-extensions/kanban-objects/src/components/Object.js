import { Draggable } from "react-beautiful-dnd";

const Object = ({ index, object, definition }) => {
  // https://github.com/atlassian/react-beautiful-dnd/issues/374#issuecomment-569817782
  function getStyle(style, snapshot) {
    if (!snapshot.isDragging) return {};
    if (!snapshot.isDropAnimating) {
      return style;
    }

    return {
      ...style,
      transitionDuration: `0.001s`
    };
  }
  return (
    <Draggable key={object.id} draggableId={object.id.toString()} index={index}>
      {(provided, snapshot) => (
        <p
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style, snapshot)}
          className={"card-text" + (snapshot.isDragging ? " dragging" : "")}>
          {object[definition.titleObjectFieldName]}
        </p>
      )}
    </Draggable>
  )
}

export default Object;