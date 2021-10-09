import { useState } from "react";
import styled from "styled-components";

const employees_list = [1, 2, 3, 4, 5];
const boxes_list = [
  { id: 1, dayState: 1, disabled: false },
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

function sumAvailability(calendar_list) {
  const activeDays = calendar_list.filter((v) => v.disabled === false);
  let availability = 0;
  let sumOfDays = 0;
  for (const day of activeDays) {
    sumOfDays += 1;
    if (day.dayState !== 1) {
      availability += 1;
    }
  }
  return Number((1 - availability / sumOfDays) * 100).toPrecision(3);
}

export function Checkboxes() {
  const [checkState, setCheckState] = useState(boxes_list);

  const changeCheckState = (id, dayS) => {
    const oldArray = checkState.filter((v) => v.id !== id);
    setCheckState([
      ...oldArray,
      { id: id, dayState: (dayS + 1) % 3, disabled: false }
    ]);
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
                  key={item.id}
                  onClick={() => changeCheckState(item.id, item.dayState)}
                  {...item}
                >
                  {item.id}
                </StyledCheckbox>
              ))}
            {`Availability: ${sumAvailability(checkState)} %`}
          </Wrapper>
        ))}
    </div>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledCheckbox = styled.div`
  margin-top: 2px;
  margin-left: 2px;
  display: flex;
  width: 40px;
  height: 40px;
  background: ${(props) => switchColor(props.dayState)};
  border-radius: 3px;
  transition: all 150ms;
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      opacity: 0.4;
      background: #000;
      color: #fff;
    `}
`;

function switchColor(itemValue) {
  switch (itemValue) {
    case 0:
      return "#ffc107";
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
