import { useState } from "react";
import styled from "styled-components";

const employees_list = [1, 2, 3, 4, 5];
const boxes_list = [
  { id: 0, dayState: 1, disabled: false },
  { id: 2, dayState: 1, disabled: false },
  { id: 3, dayState: 1, disabled: false },
  { id: 4, dayState: 1, disabled: false },
  { id: 5, dayState: 1, disabled: false },
  { id: 6, dayState: 1, disabled: true },
  { id: 7, dayState: 1, disabled: true },
  { id: 8, dayState: 1, disabled: false },
  { id: 9, dayState: 1, disabled: false },
  { id: 10, dayState: 1, disabled: false },
  { id: 11, dayState: 1, disabled: false },
  { id: 12, dayState: 1, disabled: false },
  { id: 13, dayState: 1, disabled: true },
  { id: 14, dayState: 1, disabled: true },
  { id: 15, dayState: 1, disabled: false },
  { id: 16, dayState: 1, disabled: false },
  { id: 17, dayState: 1, disabled: false },
  { id: 18, dayState: 1, disabled: false },
  { id: 19, dayState: 1, disabled: false },
  { id: 20, dayState: 1, disabled: true },
  { id: 21, dayState: 1, disabled: true },
  { id: 22, dayState: 1, disabled: false },
  { id: 23, dayState: 1, disabled: false },
  { id: 24, dayState: 1, disabled: false },
  { id: 25, dayState: 1, disabled: false },
  { id: 26, dayState: 1, disabled: false },
  { id: 27, dayState: 1, disabled: true },
  { id: 28, dayState: 1, disabled: true },
  { id: 29, dayState: 1, disabled: false },
  { id: 30, dayState: 1, disabled: false },
  { id: 31, dayState: 1, disabled: false }
];
const Checkbox = (props) => <input type="checkbox" {...props} />;

export function Checkboxes() {
  const [checkState, setCheckState] = useState(boxes_list);

  const changeCheckState = (id, dayS) => {
    console.log(id, dayS);

    const oldArray = checkState.filter((v) => v.id !== id);
    setCheckState([...oldArray, { id: id, dayState: dayS + 1 }]);
  };

  return (
    <div>
      {employees_list
        .sort((a, b) => a - b)
        .map((empl) => (
          <Wrapper>
            {checkState
              .sort((a, b) => a.id - b.id)
              .map((item) => (
                <StyledCheckbox
                  onClick={() => changeCheckState(item.id, item.dayState)}
                  {...item}
                />
              ))}
          </Wrapper>
        ))}
    </div>
  );
}

const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledCheckbox = styled.div`
  margin-top: 2px;
  margin-left: 2px;
  display: flex;
  width: 36px;
  height: 36px;
  background: ${(props) => switchColor(props.dayState)};
  border-radius: 3px;
  transition: all 150ms;
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      opacity: 0.2;
      background: #2a3eb1;
    `}
`;

function switchColor(itemValue) {
  const switcher = itemValue % 3;
  switch (switcher) {
    case 0:
      return "#4caf50";
      break;
    case 1:
      return "#f5f5f5";
      break;
    case 2:
      return "#f50057";
      break;
    default:
      return "black";
  }
}
