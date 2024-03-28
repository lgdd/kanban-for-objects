import { useEffect, useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";

import LiferayService from '../services/liferay';
import '../styles/Board.css';
import State from './State';
import { camelCaseToWords, findObjectById, updateObjectInList } from '../services/utils';
import Icon from './Icon';

const Board = ({ objectDefinition, objectStates, numberOfStateFields, stateFieldName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [objects, setObjects] = useState([]);

  const onDragEnd = async (result) => {
    if (result.destination != null) {
      const objectId = parseInt(result.draggableId);
      const objectURL = objectDefinition.restContextPath;
      const objectCurrentState = result.source.droppableId;
      const objectNewState = result.destination.droppableId;
      const currentObject = findObjectById(objectId, objects);
      if (objectNewState !== objectCurrentState) {
        const newObject = {
          "id": currentObject.id,
          "state": { "key": objectNewState }
        };
        newObject[objectDefinition.titleObjectFieldName] = currentObject[objectDefinition.titleObjectFieldName];
        const updatedObjects = updateObjectInList(newObject, objects);
        setObjects(updatedObjects);
        const data = await LiferayService.patch(`${objectURL}/${objectId}`, newObject, {
          message: {
            success: `${newObject[objectDefinition.titleObjectFieldName]} is now '${camelCaseToWords(newObject.state.key)}'`,
          }
        });
        if (!data) {
          const updatedObjects = updateObjectInList(currentObject, objects);
          setObjects(updatedObjects);
        }
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (objectStates && objectStates.length > 0) {
        setStates(objectStates);
        let searchParams = new URLSearchParams();
        searchParams.set("pageSize", 1);
        searchParams.set("fields", `id,state,${objectDefinition.titleObjectFieldName}`);
        let response = await LiferayService.get(`${objectDefinition.restContextPath}?${searchParams.toString()}`);
        searchParams.set("pageSize", response.totalCount);
        response = await LiferayService.get(`${objectDefinition.restContextPath}?${searchParams.toString()}`);
        setObjects(response.items);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [objectDefinition, objectStates]);

  return (
    <>
      {!isLoading &&
        <DragDropContext onDragEnd={onDragEnd}>
          {numberOfStateFields > 1 && <h2>{stateFieldName}</h2>}
          <div className="kanban-board-for-objects d-flex flex-row align-items-start justify-content-between">
            {states && states.map((state, index) => {
              return <State
                key={index}
                state={state}
                numberOfStates={states.length}
                objectDefinition={objectDefinition}
                objects={objects} />
            })}
            {states.length === 0 &&
              <div className="alert alert-warning" role="alert">
                <span className="alert-indicator">
                  <Icon name="warning-full" />
                </span>
                <strong className="lead">Warning:</strong>This object definition doesn't contain states.
              </div>
            }
          </div>
        </DragDropContext>}
    </>
  )
}

export default Board;