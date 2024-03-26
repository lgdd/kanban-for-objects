import { useEffect, useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";

import LiferayService from '../services/liferay';
import '../styles/Board.css';
import State from './State';
import { objectIsNotEmpty } from '../services/utils';
import Icon from './Icon';

const Board = ({ objectDefinition }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [objects, setObjects] = useState([]);

  const onDragEnd = async (result) => {
    if (result.destination != null) {
      const objectId = result.draggableId;
      const objectURL = objectDefinition.restContextPath;
      const objectCurrentState = result.source.droppableId;
      const objectNewState = result.destination.droppableId;
      if (objectNewState !== objectCurrentState) {
        const payload = { "state": { "key": objectNewState } };
        await LiferayService.patch(`${objectURL}/${objectId}`, payload);
        let searchParams = new URLSearchParams();
        searchParams.set("pageSize", 1);
        searchParams.set("fields", `id,state,${objectDefinition.titleObjectFieldName}`);
        let response = await LiferayService.get(`${objectDefinition.restContextPath}?${searchParams.toString()}`);
        searchParams.set("pageSize", response.totalCount);
        response = await LiferayService.get(`${objectDefinition.restContextPath}?${searchParams.toString()}`);
        setObjects(response.items);
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
          <h1>{objectDefinition[objectDefinition.titleObjectFieldName]}</h1>
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