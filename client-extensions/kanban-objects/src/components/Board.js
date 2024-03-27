import { useEffect, useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";

import LiferayService from '../services/liferay';
import '../styles/Board.css';
import State from './State';
import { camelCaseToWords, findObjectById, objectIsNotEmpty, updateObjectInList } from '../services/utils';
import Icon from './Icon';

const Board = ({ objectDefinition }) => {
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
      let stateField = {};
      for (let i = 0; i < objectDefinition.objectFields.length; i++) {
        if (objectDefinition.objectFields[i].state) {
          stateField = objectDefinition.objectFields[i];
          break;
        }
      }
      if (objectIsNotEmpty(stateField)) {
        let response = await LiferayService.get(`/o/object-admin/v1.0/object-fields/${stateField.id}`);
        setStates(response.objectFieldSettings[0].value.objectStates);
        let searchParams = new URLSearchParams();
        searchParams.set("pageSize", 1);
        searchParams.set("fields", `id,state,${objectDefinition.titleObjectFieldName}`);
        response = await LiferayService.get(`${objectDefinition.restContextPath}?${searchParams.toString()}`);
        searchParams.set("pageSize", response.totalCount);
        response = await LiferayService.get(`${objectDefinition.restContextPath}?${searchParams.toString()}`);
        setObjects(response.items);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [objectDefinition]);

  return (
    <>
      {!isLoading &&
        <DragDropContext onDragEnd={onDragEnd}>
          <h1>{objectDefinition.name}</h1>
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