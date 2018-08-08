import * as React from 'react';

// todo: Add copy to clipboard on click
export const AddressLabel = (props: { value: string; prefix?: string; style?: any; }) => {
  return (
    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', ...props.style }}>
        {props.prefix} <span style={{ color: 'black' }}>{props.value}</span>
    </div>
  );
};
