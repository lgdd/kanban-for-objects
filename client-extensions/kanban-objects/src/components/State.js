import { Droppable } from "react-beautiful-dnd";

import { camelCaseToWords } from '../services/utils';
import Object from "./Object";

const State = ({ state, objects, objectDefinition, numberOfStates }) => {
  return (
    <div key={state.id} className="card" style={{ minWidth: `${100 / numberOfStates}%` }}>
      <div className="card-body">
        <h2 className="card-title" >{camelCaseToWords(state.key)}</h2>
        <Droppable droppableId={state.key}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}
              className={"droppable-container" + (snapshot.isDraggingOver ? " dragging-over" : "")}>
              {objects && objects.filter((object) => { return object.state.key === state.key }).map((object, index) => {
                return <Object
                  key={index}
                  index={index}
                  object={object}
                  definition={objectDefinition} />
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default State;