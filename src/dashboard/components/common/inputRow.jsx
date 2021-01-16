import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import './inputRow.scss';

export default function InputRow({ label, className, extra, ...rest }) {
  return (
    <div className={classnames('input-row', className)}>
      <div className="label">{label}</div>
      <div className="input">
        <input {...rest} />
        {extra}
      </div>
    </div>
  );
}
