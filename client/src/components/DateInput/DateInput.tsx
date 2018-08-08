import * as React from "react";
import InputMask from "react-input-mask";

const formatChars = {
  n: "[0-1]",
  m: "[0-9]",
  e: "[0-3]",
  d: "[0-9]",
  z: "[1-2]",
  y: "[0-9]"
};

export const DateInput = (props: { onChange: (event: any) => any; value?: string; style?: any }) => {
  return (
    <InputMask
      style={props.style}
      onChange={props.onChange}
      formatChars={formatChars}
      value={props.value}
      mask="nm/ed/zyyy"
      maskChar={null}
      placeholder="mm/dd/yyyy"
    />
  );
};
