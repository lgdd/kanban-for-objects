import { useEffect, useState } from 'react';
import LiferayService from '../services/liferay';
import Select from './Select';
import Board from './Board';
import { findObjectById, getStateFields, objectIsNotEmpty } from '../services/utils';
import Loading from './Loading';

function App({ objectDefinitionId, objectDefinitionERC }) {
  const [isLoading, setIsLoading] = useState(true);
  const [objectDefinitions, setObjectDefinitions] = useState([]);
  const [objectDefinition, setObjectDefinition] = useState({});
  const [stateFields, setStateFields] = useState([]);

  const handleSelectChange = (e) => {
    e.preventDefault();
    const objectDefinitionId = parseInt(e.target.value);
    const objectDefinition = findObjectById(objectDefinitionId, objectDefinitions);
    setObjectDefinition(objectDefinition);
    setStateFields(getStateFields(objectDefinition));
  }

  useEffect(() => {
    if (objectDefinitionId) {
      const fetchData = async () => {
        const response = await LiferayService.get(`/o/object-admin/v1.0/object-definitions/${objectDefinitionId}`);
        setObjectDefinition(response);
        setStateFields(getStateFields(response));
        setIsLoading(false);
      };
      fetchData();
    } else if (objectDefinitionERC) {
      const fetchData = async () => {
        const response = await LiferayService.get(`/o/object-admin/v1.0/object-definitions/by-external-reference-code/${objectDefinitionERC}`);
        setObjectDefinition(response);
        setStateFields(getStateFields(response));
        setIsLoading(false);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const response = await LiferayService.get(`/o/object-admin/v1.0/object-definitions`);
        response.items = response.items.filter((object) => {
          return object.objectFields.filter((field) => field.state).length > 0
        })
        setObjectDefinitions(response.items);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [objectDefinitionId, objectDefinitionERC]);

  return (
    <div>
      {isLoading &&
        <Loading size="md" />
      }
      {!isLoading && objectDefinitions && objectDefinitions.length > 0 &&
        <Select items={objectDefinitions} onChangeHandler={handleSelectChange} />
      }
      {!isLoading && objectIsNotEmpty(objectDefinition) &&
        <h1>{objectDefinition.name}</h1>
      }
      {!isLoading && objectIsNotEmpty(objectDefinition) &&
        stateFields.map((stateField, index) => {
          return (
            <Board
              key={index}
              objectDefinition={objectDefinition}
              objectStates={stateField.objectFieldSettings[0].value.objectStates}
              numberOfStateFields={stateFields.length}
              stateField={stateField}
            />
          )
        })
      }
    </div>
  );
}

export default App;
